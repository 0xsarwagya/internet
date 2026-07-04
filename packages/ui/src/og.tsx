import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export async function loadGoogleFont(
  family: string,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, "+")}&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const match = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
    );
    if (!match?.[1]) return null;
    const res = await fetch(match[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export type OgCardColors = {
  paper: string;
  ink: string;
  stone: string;
  accent: string;
};

const DEFAULT_COLORS: OgCardColors = {
  paper: "#f6f4ef",
  ink: "#0d0d0d",
  stone: "#9b8c73",
  accent: "#a34a3a",
};

export async function renderOgCard({
  eyebrow,
  title,
  footer,
  titleSize,
  colors = DEFAULT_COLORS,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  titleSize: number;
  colors?: OgCardColors;
}) {
  const font = await loadGoogleFont(
    "Instrument Serif",
    `${title}${eyebrow}${footer}`,
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
          background: colors.paper,
          color: colors.ink,
          padding: "72px 80px",
          fontFamily: font ? "Instrument Serif" : "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: colors.stone,
          }}
        >
          <div style={{ display: "flex" }}>{eyebrow}</div>
          <div style={{ display: "flex" }}>{footer}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            letterSpacing: "-0.02em",
            lineHeight: 1.02,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 4,
            background: colors.accent,
          }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font
        ? [{ name: "Instrument Serif", data: font, style: "normal" as const }]
        : undefined,
    },
  );
}
