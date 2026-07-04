import { getAllLearnings, getLearningBySlug } from "../../../lib/learnings";
import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

export const alt = "Learnings — eng.sarwagya.wtf";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllLearnings().map((l) => ({ slug: l.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getLearningBySlug(slug);
  const title = meta?.title ?? "Learnings";
  return renderOgCard({
    eyebrow: "eng.sarwagya.wtf/learnings",
    title,
    footer: meta ? `${meta.date} · ${meta.readingMinutes} min` : "Sarwagya Singh",
    titleSize: title.length > 45 ? 72 : 92,
  });
}
