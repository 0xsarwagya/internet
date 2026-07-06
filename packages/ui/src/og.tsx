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
  graphic,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  titleSize: number;
  colors?: OgCardColors;
  graphic?: React.ReactNode;
}) {
  const font = await loadGoogleFont(
    "Instrument Serif",
    `${title}${eyebrow}${footer}`,
  );

  const card = graphic ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: colors.ink,
        color: colors.paper,
        fontFamily: font ? "Instrument Serif" : "serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: 680,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: colors.stone,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            letterSpacing: "-0.02em",
            lineHeight: 1.02,
            color: colors.paper,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: colors.stone,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 96,
              height: 4,
              background: colors.accent,
            }}
          />
          <div style={{ display: "flex" }}>{footer}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 520,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {graphic}
      </div>
    </div>
  ) : (
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
  );

  return new ImageResponse(card, {
    ...OG_SIZE,
    fonts: font
      ? [{ name: "Instrument Serif", data: font, style: "normal" as const }]
      : undefined,
  });
}
