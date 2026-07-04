import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

export const alt = "Bakaiti — I have opinions";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "bakaiti.sarwagya.wtf",
    title: "I have opinions.",
    footer: "Cheaper than therapy",
    titleSize: 130,
  });
}
