import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Raw-markdown endpoint. Rewritten from `/foo/bar.md` in next.config.js.
 * Serves the underlying MDX file so LLM agents can consume the source
 * without HTML scraping, per llmstxt.org / Marc Lou.
 *
 * The path segments after `/api/raw` map 1:1 to the site's HTML
 * routes:
 *   /learnings/foo.md  →  /api/raw/learnings/foo
 *                     →  content/learnings/foo.mdx
 *
 * Anything that doesn't resolve to a real .mdx file 404s.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

const CONTENT_ROOT = path.resolve(process.cwd(), "content");

const NOT_FOUND = new Response("Not found\n", {
  status: 404,
  headers: { "content-type": "text/plain; charset=utf-8" },
});

interface RouteContext {
  params: Promise<{ path?: string[] }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const params = await context.params;
  const segments = params.path ?? [];
  if (segments.length === 0) return NOT_FOUND;
  // Reject any segment that would let a caller escape CONTENT_ROOT.
  if (segments.some((s) => s.includes("/") || s === ".." || s === ".")) {
    return NOT_FOUND;
  }
  const relative = segments.join("/");
  const target = path.join(CONTENT_ROOT, `${relative}.mdx`);
  const resolved = path.resolve(target);
  if (!resolved.startsWith(`${CONTENT_ROOT}${path.sep}`)) return NOT_FOUND;
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
