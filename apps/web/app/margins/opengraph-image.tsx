import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

export const alt = "Margins — notes kept in the margins of longer things";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "sarwagya.wtf/margins",
    title: "Margins.",
    footer: "Sarwagya Singh",
    titleSize: 130,
  });
}
