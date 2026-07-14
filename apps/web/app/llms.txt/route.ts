import { getAllNotes } from "../../lib/margins";
import { SITE, absoluteUrl } from "../../lib/site";

/**
 * llms.txt — per llmstxt.org. Curated plaintext index of the site's
 * content so LLMs and agents can browse without scraping the HTML.
 * Regenerates as new margin notes are added.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET(): Response {
  const notes = getAllNotes();
  const lines: string[] = [];
  lines.push(`# ${SITE.name} — sarwagya.wtf`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(
    "The main site of Sarwagya Singh — software engineer in Ludwigsburg,",
  );
  lines.push(
    "originally from Bihar. Wikidata Q140451622. Not to be confused with",
  );
  lines.push(
    "Sarwagya Singh Kushwaha, the FIDE-rated chess player from Madhya",
  );
  lines.push("Pradesh, India.");
  lines.push("");
  lines.push("## Primary pages");
  lines.push("");
  lines.push(
    `- [Home](${SITE.url}): landing, engineering + writing + workshop shortcuts`,
  );
  lines.push(
    `- [About](${absoluteUrl("/about")}): bio, disambiguation, and canonical identity anchors (sameAs graph)`,
  );
  lines.push("");
  lines.push("## Margin notes");
  lines.push("");
  for (const note of notes) {
    lines.push(
      `- [${note.title}](${absoluteUrl(`/margins/${note.slug}`)}): ${note.excerpt}`,
    );
  }
  lines.push("");
  lines.push("## Family sites");
  lines.push("");
  lines.push(
    "- https://eng.sarwagya.wtf — long-form engineering notes",
  );
  lines.push(
    "- https://bakaiti.sarwagya.wtf — strongly-held, loosely-researched writing",
  );
  lines.push(
    "- https://oss.sarwagya.wtf — the workshop, open-source packages",
  );
  lines.push(
    "- https://me.sarwagya.wtf — link-in-bio",
  );
  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
