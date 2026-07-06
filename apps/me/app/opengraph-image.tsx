import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

export const alt = "Sarwagya Singh — one page of doorways";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "me.sarwagya.wtf",
    title: "One page of doorways.",
    footer: "Sarwagya Singh",
    titleSize: 130,
  });
}
