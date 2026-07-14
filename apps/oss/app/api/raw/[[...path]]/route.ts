import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Raw-markdown endpoint for oss. Rewritten from `/foo/bar.md` in
 * next.config.js. Serves the underlying MDX so LLM agents can consume
 * the source without HTML scraping, per llmstxt.org / Marc Lou.
 *
 * The URL segments map to the on-disk content this way:
 *
 *   /{project}.md                → content/projects/{project}/landing.mdx  (or site/landing.mdx)
 *   /{project}/docs.md           → content/projects/{project}/docs/index.mdx
 *   /{project}/docs/{...page}.md → content/projects/{project}/docs/{...page}.mdx
 *
 * Anything else 404s.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

const PROJECTS_ROOT = path.resolve(process.cwd(), "content", "projects");

const NOT_FOUND = new Response("Not found\n", {
  status: 404,
  headers: { "content-type": "text/plain; charset=utf-8" },
});

interface RouteContext {
  params: Promise<{ path?: string[] }>;
}

function resolveMdxPath(segments: string[]): string | null {
  if (segments.some((s) => s.includes("/") || s === ".." || s === ".")) {
    return null;
  }
  if (segments.length === 0) return null;

  const [slug, ...rest] = segments;
  if (slug === undefined) return null;
  const projectDir = path.resolve(PROJECTS_ROOT, slug);
  // Reject any resolved path that escapes PROJECTS_ROOT.
  if (!projectDir.startsWith(`${PROJECTS_ROOT}${path.sep}`)) return null;

  // Project landing — synced projects put their landing at `landing.mdx`
  // directly under content/projects/<slug>/.
  if (rest.length === 0) {
    return path.join(projectDir, "landing.mdx");
  }
  // Docs subtree.
  if (rest[0] === "docs") {
    const docSegments = rest.slice(1);
    if (docSegments.length === 0) {
      return path.join(projectDir, "docs", "index.mdx");
    }
    return path.join(projectDir, "docs", `${docSegments.join("/")}.mdx`);
  }
  return null;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const params = await context.params;
  const segments = params.path ?? [];
  const target = resolveMdxPath(segments);
  if (target === null) return NOT_FOUND;
  const resolved = path.resolve(target);
  if (!resolved.startsWith(`${PROJECTS_ROOT}${path.sep}`)) return NOT_FOUND;
  let content: string;
  try {
    content = readFileSync(resolved, "utf8");
  } catch {
    return NOT_FOUND;
  }
  return new Response(content, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
