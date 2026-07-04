import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type ProjectStatus = "stable" | "beta" | "experimental" | "archived";

export type ProjectManifest = {
  schemaVersion: number;
  mdxVersion: number;
  slug: string;
  name: string;
  packageName?: string;
  description: string;
  status: ProjectStatus;
  license?: string;
  repository?: string;
  demo?: string;
  links?: Record<string, string>;
};

export type Project = ProjectManifest & {
  hasDemo: boolean;
  sourceCommit?: string;
};

export type DocEntry = {
  /** Route segments below /docs, e.g. ["guides", "notifications"]. Empty = index. */
  segments: string[];
  section: string;
  sectionLabel: string;
  title: string;
  description: string;
  order: number;
  filepath: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "projects");
const SUPPORTED_SCHEMA = 1;
const SUPPORTED_MDX = 1;
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
const SECTION_ORDER = ["", "getting-started", "concepts", "guides", "reference"];

function fail(manifestPath: string, message: string): never {
  throw new Error(`Invalid OSS project manifest: ${manifestPath}\n\n${message}`);
}

function loadManifest(dir: string): ProjectManifest {
  const manifestPath = path.join(dir, "manifest.json");
  if (!existsSync(manifestPath)) {
    fail(manifestPath, "manifest.json is missing.");
  }
  const raw = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<
    string,
    unknown
  >;
  if (raw.schemaVersion !== SUPPORTED_SCHEMA) {
    fail(
      manifestPath,
      `Unsupported schemaVersion ${JSON.stringify(raw.schemaVersion)} (supported: ${SUPPORTED_SCHEMA}).`,
    );
  }
  if (raw.mdxVersion !== SUPPORTED_MDX) {
    fail(
      manifestPath,
      `Unsupported mdxVersion ${JSON.stringify(raw.mdxVersion)} (supported: ${SUPPORTED_MDX}).`,
    );
  }
  for (const field of ["slug", "name", "description", "status"] as const) {
    if (typeof raw[field] !== "string" || raw[field].length === 0) {
      fail(manifestPath, `Field "${field}" is required.`);
    }
  }
  const slug = raw.slug as string;
  if (!SLUG_PATTERN.test(slug)) {
    fail(manifestPath, `Field "slug" must match ${SLUG_PATTERN}.`);
  }
  if (slug !== path.basename(dir)) {
    fail(
      manifestPath,
      `Manifest slug "${slug}" does not match its directory "${path.basename(dir)}".`,
    );
  }
  if (!existsSync(path.join(dir, "landing.mdx"))) {
    fail(manifestPath, "Declared landing content landing.mdx is missing.");
  }
  return raw as unknown as ProjectManifest;
}

let projectsCache: Project[] | null = null;

export function getProjects(): Project[] {
  if (projectsCache) return projectsCache;
  if (!existsSync(CONTENT_ROOT)) return [];
  const projects = readdirSync(CONTENT_ROOT)
    .filter(
      (entry) =>
        !entry.startsWith(".") &&
        statSync(path.join(CONTENT_ROOT, entry)).isDirectory(),
    )
    .map((entry) => {
      const dir = path.join(CONTENT_ROOT, entry);
      const manifest = loadManifest(dir);
      const provenancePath = path.join(dir, ".provenance.json");
      const provenance = existsSync(provenancePath)
        ? (JSON.parse(readFileSync(provenancePath, "utf8")) as {
            sourceCommit?: string;
          })
        : {};
      return {
        ...manifest,
        hasDemo: existsSync(path.join(dir, "demo", "index.tsx")),
        ...(provenance.sourceCommit
          ? { sourceCommit: provenance.sourceCommit }
          : {}),
      };
    });
  projects.sort((a, b) => a.name.localeCompare(b.name));
  projectsCache = projects;
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getLandingFrontmatter(slug: string): {
  title: string;
  description: string;
} {
  const raw = readFileSync(
    path.join(CONTENT_ROOT, slug, "landing.mdx"),
    "utf8",
  );
  const data = matter(raw).data as { title?: string; description?: string };
  const project = getProject(slug);
  return {
    title: data.title ?? project?.name ?? slug,
    description: data.description ?? project?.description ?? "",
  };
}

function sectionLabel(section: string): string {
  if (section === "") return "";
  return section
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const docsCache = new Map<string, DocEntry[]>();

/** Docs in reading order: index first, then sections, ordered by frontmatter. */
export function getDocs(slug: string): DocEntry[] {
  const cached = docsCache.get(slug);
  if (cached) return cached;
  const docsRoot = path.join(CONTENT_ROOT, slug, "docs");
  if (!existsSync(docsRoot)) return [];

  const entries: DocEntry[] = [];
  const walk = (dir: string, segments: string[]) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full, [...segments, entry]);
      } else if (entry.endsWith(".mdx")) {
        const name = path.basename(entry, ".mdx");
        const docSegments =
          name === "index" && segments.length === 0
            ? []
            : [...segments, name];
        const data = matter(readFileSync(full, "utf8")).data as {
          title?: string;
          description?: string;
          order?: number;
        };
        if (!data.title) {
          throw new Error(
            `Documentation page is missing a "title" in its frontmatter: ${full}`,
          );
        }
        const section = docSegments.length > 1 ? (docSegments[0] ?? "") : "";
        entries.push({
          segments: docSegments,
          section,
          sectionLabel: sectionLabel(section),
          title: data.title,
          description: data.description ?? "",
          order: data.order ?? 999,
          filepath: full,
        });
      }
    }
  };
  walk(docsRoot, []);

  entries.sort((a, b) => {
    const sa = SECTION_ORDER.indexOf(a.section);
    const sb = SECTION_ORDER.indexOf(b.section);
    const ra = sa === -1 ? SECTION_ORDER.length : sa;
    const rb = sb === -1 ? SECTION_ORDER.length : sb;
    if (ra !== rb) return ra - rb;
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  docsCache.set(slug, entries);
  return entries;
}

export function getDoc(slug: string, segments: string[]): DocEntry | undefined {
  return getDocs(slug).find(
    (d) => d.segments.join("/") === segments.join("/"),
  );
}

export function docHref(slug: string, doc: DocEntry): string {
  return doc.segments.length === 0
    ? `/${slug}/docs`
    : `/${slug}/docs/${doc.segments.join("/")}`;
}
