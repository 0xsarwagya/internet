import { ImageResponse } from "next/og";

import { OG_SIZE, loadGoogleFont } from "@0xsarwagya/ui/og";

import { SITE } from "../lib/site";

export const alt = `${SITE.name} — software, writing, systems`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  const wordmark = "Sarwagya.";
  const tagline = "Making, in slow layers — thoughts, software, and the sentences between.";
  const font = await loadGoogleFont(
    "Instrument Serif",
    `${wordmark}${tagline}sarwagya.wtf`,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4ef",
          color: "#0d0d0d",
          padding: "72px 80px",
          fontFamily: font ? "Instrument Serif" : "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#9b8c73" }}>
          sarwagya.wtf
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", fontSize: 168, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {wordmark}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 38,
              fontStyle: "italic",
              color: "rgba(13, 13, 13, 0.75)",
              maxWidth: 900,
              lineHeight: 1.25,
            }}
          >
            {tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 4,
            background: "#a34a3a",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Instrument Serif", data: font, style: "normal" as const }]
        : undefined,
    },
  );
}
