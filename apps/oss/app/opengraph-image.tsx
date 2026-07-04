import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

export const alt = "Open source software by Sarwagya Singh";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "oss.sarwagya.wtf",
    title: "The workshop.",
    footer: "Sarwagya Singh",
    titleSize: 130,
  });
}
