import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

import {
  CATEGORY_LABELS,
  getAllNotes,
  getNoteMetaBySlug,
} from "../../../lib/margins";

export const alt = "Margins — sarwagya.wtf";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getNoteMetaBySlug(slug);
  const title = meta?.title ?? "Margins";
  return renderOgCard({
    eyebrow: "sarwagya.wtf/margins",
    title,
    footer: meta ? CATEGORY_LABELS[meta.category] : "Sarwagya Singh",
    titleSize: title.length > 45 ? 72 : 92,
  });
}
