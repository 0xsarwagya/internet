import { getProjects } from "../../lib/projects";
import { SITE, absoluteUrl } from "../../lib/site";

/**
 * llms.txt — per llmstxt.org. A curated, plaintext index of the
 * workshop's projects (and each project's docs) so LLMs and agents can
 * browse without scraping the HTML. Regenerates as new projects and
 * docs land in content/projects/.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET(): Response {
  const projects = getProjects();
  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(
    "Problems Sarwagya Singh solved for himself. Apparently a few other",
  );
  lines.push("people had them too.");
  lines.push("");
  lines.push("## Projects");
  lines.push("");
  for (const project of projects) {
    const parts = [
      project.status,
      project.license,
      project.packageName,
    ].filter(Boolean);
    const meta = parts.length > 0 ? ` (${parts.join(" · ")})` : "";
    lines.push(
      `- [${project.name}](${absoluteUrl(`/${project.slug}`)}): ${project.description}${meta}`,
    );
  }
  lines.push("");
  lines.push("## Documentation");
  lines.push("");
  lines.push(
    "Each project ships its own docs tree; typical entry points are:",
  );
  for (const project of projects) {
    lines.push(`- ${absoluteUrl(`/${project.slug}/docs`)}`);
  }
  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
