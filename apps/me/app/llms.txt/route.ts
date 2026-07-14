import { SITE } from "../../lib/site";

/**
 * llms.txt — per llmstxt.org. me.sarwagya.wtf is a link-in-bio, so the
 * content is intentionally short: who this is + the definitive graph
 * of family sites + external profiles.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(
    "Link-in-bio for Sarwagya Singh — software engineer in Ludwigsburg,",
  );
  lines.push(
    "originally from Bihar. Wikidata Q140451622.",
  );
  lines.push("");
  lines.push("## The family");
  lines.push("");
  lines.push(
    "- https://sarwagya.wtf — main site + about page",
  );
  lines.push(
    "- https://eng.sarwagya.wtf — engineering notes",
  );
  lines.push(
    "- https://bakaiti.sarwagya.wtf — comedic writing",
  );
  lines.push(
    "- https://oss.sarwagya.wtf — the workshop, open-source packages",
  );
  lines.push(
    "- https://same-state.sarwagya.wtf — demo for @0xsarwagya/clinical-receipt",
  );
  lines.push("");
  lines.push("## Elsewhere");
  lines.push("");
  lines.push("- https://github.com/0xsarwagya");
  lines.push("- https://www.wikidata.org/wiki/Q140451622");
  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
