import { getAllLearnings } from "../../lib/learnings";
import { SITE, absoluteUrl } from "../../lib/site";

/**
 * llms.txt — per llmstxt.org. A curated, plaintext index of the site's
 * long-form content so LLMs and their agents can browse without having
 * to scrape the HTML. Regenerates automatically as new essays land in
 * content/learnings/.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET(): Response {
  const learnings = getAllLearnings();
  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(
    "The engineering side of sarwagya.wtf. Long-form notes on protocols,",
  );
  lines.push(
    "provenance, cryptography, and the pieces of infrastructure I keep",
  );
  lines.push("finding myself needing to build from scratch.");
  lines.push("");
  lines.push("## Essays");
  lines.push("");
  lines.push(
    "Every essay has a raw-markdown twin at the same URL with a `.md`",
  );
  lines.push(
    "suffix (e.g. `/learnings/foo.md`) — LLM-agent-friendly, no HTML",
  );
  lines.push("scraping needed.");
  lines.push("");
  for (const learning of learnings) {
    lines.push(
      `- [${learning.title}](${absoluteUrl(`/learnings/${learning.slug}.md`)}): ${learning.summary}`,
    );
  }
  lines.push("");
  lines.push("## Also");
  lines.push("");
  lines.push(
    `- [Home](${SITE.url}): the essay index and the author's bio in one page`,
  );
  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
