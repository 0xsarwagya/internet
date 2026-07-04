import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export async function loadInstrumentSerif(
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Instrument+Serif&text=${encodeURIComponent(text)}`,
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

export async function renderOgCard({
  eyebrow,
  title,
  footer,
  titleSize,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  titleSize: number;
}) {
  const font = await loadInstrumentSerif(`${title}${eyebrow}${footer}`);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#9b8c73",
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
            background: "#a34a3a",
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
