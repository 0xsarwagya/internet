import { getAllTakes, getTakeBySlug } from "../../../lib/takes";
import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

export const alt = "Takes — bakaiti.sarwagya.wtf";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllTakes().map((t) => ({ slug: t.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getTakeBySlug(slug);
  const title = meta?.title ?? "Takes";
  return renderOgCard({
    eyebrow: "bakaiti.sarwagya.wtf/takes",
    title,
    footer: meta ? `${meta.date} · ${meta.readingMinutes} min` : "Sarwagya Singh",
    titleSize: title.length > 45 ? 72 : 92,
  });
}
