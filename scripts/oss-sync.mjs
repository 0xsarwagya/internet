#!/usr/bin/env node
/**
 * Synchronize a project repository's public content into the OSS snapshot
 * directory. Used locally for authoring and by each project's publish
 * workflow in CI.
 *
 * Usage:
 *   node scripts/oss-sync.mjs <path-to-project-repo>
 *     [--repo owner/name] [--commit sha] [--out apps/oss/content/projects]
 *
 * The script validates before it copies, and only ever touches the snapshot
 * directory belonging to the project's own slug.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const SUPPORTED_SCHEMA = 1;
const SUPPORTED_MDX = 1;
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

/** The semantic MDX vocabulary implemented by @0xsarwagya/ui (mdxVersion 1). */
const SEMANTIC_VOCABULARY = new Set([
  "ProjectHero",
  "DemoVideo",
  "Install",
  "Callout",
  "CompatibilityMatrix",
  "RuntimeMap",
  "ProjectLinks",
  "Steps",
  "Tabs",
  "Graph3D",
]);
/** Vocabulary names that are allowed but not yet implemented by the renderer. */
const IMPLEMENTED_VOCABULARY = new Set([
  "ProjectHero",
  "Install",
  "Callout",
  "CompatibilityMatrix",
  "ProjectLinks",
  "Graph3D",
]);

function fail(message) {
  console.error(`\noss-sync failed:\n\n${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = { out: "apps/oss/content/projects" };
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--repo") args.repo = argv[++i];
    else if (arg === "--commit") args.commit = argv[++i];
    else if (arg === "--out") args.out = argv[++i];
    else positional.push(arg);
  }
  if (positional.length !== 1) {
    fail("Expected exactly one argument: the path to the project repository.");
  }
  args.projectPath = path.resolve(positional[0]);
  return args;
}

function frontmatterOf(source) {
  const match = /^---\n([\s\S]*?)\n---/.exec(source);
  return match ? match[1] : null;
}

function validateMdx(filePath, { requireTitle }) {
  const source = readFileSync(filePath, "utf8");
  const frontmatter = frontmatterOf(source);
  if (requireTitle && (!frontmatter || !/^title:/m.test(frontmatter))) {
    fail(`Missing frontmatter "title" in ${filePath}`);
  }
  // Custom (capitalized) JSX components must be part of the vocabulary.
  const body = frontmatter ? source.slice(source.indexOf("---", 3) + 3) : source;
  const withoutCode = body.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
  for (const match of withoutCode.matchAll(/<([A-Z][A-Za-z0-9]*)/g)) {
    const name = match[1];
    if (!SEMANTIC_VOCABULARY.has(name)) {
      fail(
        `Unknown semantic MDX component:\n\n  <${name} />\n\nFile:\n  ${filePath}\n\nSupported mdxVersion: ${SUPPORTED_MDX}\nSupported components: ${[...SEMANTIC_VOCABULARY].join(", ")}`,
      );
    }
    if (!IMPLEMENTED_VOCABULARY.has(name)) {
      fail(
        `Semantic component <${name} /> is in the vocabulary but not yet implemented by the renderer.\n\nFile:\n  ${filePath}\n\nImplement it in packages/ui/src/mdx before publishing content that uses it.`,
      );
    }
  }
  // Project-relative asset references must exist.
  for (const match of withoutCode.matchAll(/["(](\.\/assets\/[^")\s]+)[")]/g)) {
    const assetRelative = match[1].replace(/^\.\//, "");
    return assetRelative; // collected by caller
  }
  return null;
}

/** Stable digest of every snapshot file except .provenance.json. */
function snapshotDigest(dir) {
  const hash = createHash("sha256");
  const walk = (current) => {
    for (const entry of readdirSync(current).sort()) {
      const full = path.join(current, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (path.relative(dir, full) !== ".provenance.json") {
        hash.update(path.relative(dir, full));
        hash.update("\0");
        hash.update(readFileSync(full));
        hash.update("\0");
      }
    }
  };
  walk(dir);
  return hash.digest("hex");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { projectPath } = args;

  const manifestPath = path.join(projectPath, "site", "manifest.json");
  if (!existsSync(manifestPath)) {
    fail(`Missing manifest: ${manifestPath}`);
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (manifest.schemaVersion !== SUPPORTED_SCHEMA) {
    fail(`Unsupported manifest schemaVersion: ${manifest.schemaVersion}`);
  }
  if (manifest.mdxVersion !== SUPPORTED_MDX) {
    fail(`Unsupported mdxVersion: ${manifest.mdxVersion}`);
  }
  for (const field of ["slug", "name", "description", "status", "landing", "docs"]) {
    if (typeof manifest[field] !== "string" || manifest[field].length === 0) {
      fail(`Manifest field "${field}" is required.`);
    }
  }
  if (!SLUG_PATTERN.test(manifest.slug)) {
    fail(`Manifest slug "${manifest.slug}" must match ${SLUG_PATTERN}.`);
  }

  const landingPath = path.join(projectPath, manifest.landing);
  const docsPath = path.join(projectPath, manifest.docs);
  const assetsPath = manifest.assets ? path.join(projectPath, manifest.assets) : null;
  const demoPath = manifest.demo ? path.join(projectPath, manifest.demo) : null;
  for (const [label, p] of [["landing", landingPath], ["docs", docsPath]]) {
    if (!existsSync(p)) fail(`Declared ${label} path does not exist: ${p}`);
  }
  if (assetsPath && !existsSync(assetsPath)) fail(`Declared assets path does not exist: ${assetsPath}`);
  if (demoPath && !existsSync(path.join(demoPath, "index.tsx"))) {
    fail(`Declared demo is missing its entry point: ${path.join(demoPath, "index.tsx")}`);
  }

  // Validate MDX + collect referenced assets.
  const referencedAssets = new Set();
  const collect = (file, requireTitle) => {
    const source = readFileSync(file, "utf8");
    validateMdx(file, { requireTitle });
    for (const match of source.matchAll(/["(](\.\/assets\/[^")\s]+)[")]/g)) {
      referencedAssets.add(match[1].replace(/^\.\/assets\//, ""));
    }
  };
  collect(landingPath, true);
  const docFiles = [];
  const walkDocs = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) walkDocs(full);
      else if (entry.endsWith(".mdx")) docFiles.push(full);
    }
  };
  walkDocs(docsPath);
  if (docFiles.length === 0) fail(`No documentation pages found in ${docsPath}`);
  for (const file of docFiles) collect(file, true);
  if (!existsSync(path.join(docsPath, "index.mdx"))) {
    fail(`Documentation must include an index.mdx entrance: ${docsPath}`);
  }
  for (const asset of referencedAssets) {
    if (!assetsPath || !existsSync(path.join(assetsPath, asset))) {
      fail(`Referenced asset does not exist: ./assets/${asset}`);
    }
  }

  // Build the snapshot — scoped strictly to this project's own slug.
  const outRoot = path.resolve(args.out);
  const snapshotDir = path.join(outRoot, manifest.slug);
  const previousDigest = existsSync(snapshotDir) ? snapshotDigest(snapshotDir) : null;
  let previousProvenance = null;
  try {
    previousProvenance = JSON.parse(
      readFileSync(path.join(snapshotDir, ".provenance.json"), "utf8"),
    );
  } catch {
    previousProvenance = null;
  }
  rmSync(snapshotDir, { recursive: true, force: true });
  mkdirSync(snapshotDir, { recursive: true });

  writeFileSync(
    path.join(snapshotDir, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  cpSync(landingPath, path.join(snapshotDir, "landing.mdx"));
  cpSync(docsPath, path.join(snapshotDir, "docs"), { recursive: true });
  if (assetsPath) cpSync(assetsPath, path.join(snapshotDir, "assets"), { recursive: true });
  if (demoPath) cpSync(demoPath, path.join(snapshotDir, "demo"), { recursive: true });

  let sourceCommit = args.commit;
  if (!sourceCommit) {
    try {
      sourceCommit = execSync("git rev-parse HEAD", { cwd: projectPath }).toString().trim();
    } catch {
      sourceCommit = "unknown";
    }
  }
  const packageJsonPath = path.join(projectPath, "package.json");
  const version = existsSync(packageJsonPath)
    ? JSON.parse(readFileSync(packageJsonPath, "utf8")).version
    : undefined;

  const provenance = {
    sourceRepository: args.repo ?? "local",
    sourceCommit,
    ...(version ? { version } : {}),
    publishedAt: new Date().toISOString(),
    manifestSchemaVersion: manifest.schemaVersion,
  };
  // A re-sync that changes nothing keeps its original timestamp, so the
  // publish workflow's "no content changes" guard actually fires instead
  // of opening timestamp-only PRs.
  const unchanged =
    previousDigest !== null &&
    previousProvenance !== null &&
    snapshotDigest(snapshotDir) === previousDigest &&
    previousProvenance.sourceRepository === provenance.sourceRepository &&
    previousProvenance.sourceCommit === provenance.sourceCommit &&
    previousProvenance.version === provenance.version &&
    previousProvenance.manifestSchemaVersion === provenance.manifestSchemaVersion;
  if (unchanged) {
    provenance.publishedAt = previousProvenance.publishedAt;
  }

  writeFileSync(
    path.join(snapshotDir, ".provenance.json"),
    JSON.stringify(provenance, null, 2) + "\n",
  );

  console.log(`Synchronized ${manifest.slug} → ${snapshotDir}`);
  console.log(`  source: ${args.repo ?? "local"}@${sourceCommit.slice(0, 7)}`);
  console.log(`  docs:   ${docFiles.length} pages`);
  console.log(`  assets: ${referencedAssets.size} referenced, all present`);
}

main();
