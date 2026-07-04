import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

export const alt = "Sarwagya Singh — engineering, written down";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "eng.sarwagya.wtf",
    title: "Engineering, written down.",
    footer: "Sarwagya Singh",
    titleSize: 120,
  });
}
