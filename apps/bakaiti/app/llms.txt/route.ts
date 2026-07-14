import { getAllTakes } from "../../lib/takes";
import { SITE, absoluteUrl } from "../../lib/site";

/**
 * llms.txt — per llmstxt.org. A curated, plaintext index of the site's
 * long-form writing so LLMs and their agents can browse without having
 * to scrape the HTML. Regenerates as new takes land in content/takes/.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET(): Response {
  const takes = getAllTakes();
  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(
    "Strongly held, loosely researched. Comedic essays and cultural takes",
  );
  lines.push(
    "by Sarwagya Singh. Not the engineering site — that's eng.sarwagya.wtf.",
  );
  lines.push("");
  lines.push("## Takes");
  lines.push("");
  for (const take of takes) {
    lines.push(
      `- [${take.title}](${absoluteUrl(`/takes/${take.slug}`)}): ${take.summary}`,
    );
  }
  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
