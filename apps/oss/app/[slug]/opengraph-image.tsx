import { OG_SIZE, renderOgCard } from "@0xsarwagya/ui/og";

import { getProject, getProjects } from "../../lib/projects";

export const alt = "Open source software by Sarwagya Singh";
export const size = OG_SIZE;
export const contentType = "image/png";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjects().map((p) => ({ slug: p.slug }));
}

type ProjectSlug = "ghost" | "handoff" | "durable-local" | "agnostic-web-ble";

const TAGLINES: Record<ProjectSlug, string> = {
  ghost: "persistent browser identity",
  handoff: "cross-device state transfer",
  "durable-local": "one durable JSON value",
  "agnostic-web-ble": "browser-agnostic Web Bluetooth",
};

function GhostGraphic() {
  return (
    <div
      style={{
        display: "flex",
        width: "520px",
        height: "520px",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="520"
        height="520"
        viewBox="0 0 520 520"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <title>Ghost — sealed orbit</title>
        <g opacity="0.28">
          <line x1="300" y1="300" x2="300" y2="440" stroke="#9b8c73" strokeWidth="1" />
          <line x1="330" y1="290" x2="330" y2="450" stroke="#9b8c73" strokeWidth="1" />
          <line x1="360" y1="280" x2="360" y2="460" stroke="#9b8c73" strokeWidth="1" />
          <line x1="390" y1="290" x2="390" y2="450" stroke="#9b8c73" strokeWidth="1" />
          <line x1="420" y1="300" x2="420" y2="440" stroke="#9b8c73" strokeWidth="1" />
          <line x1="450" y1="310" x2="450" y2="430" stroke="#9b8c73" strokeWidth="1" />
        </g>
        <ellipse
          cx="260"
          cy="260"
          rx="240"
          ry="130"
          stroke="#9b8c73"
          strokeWidth="2.5"
          fill="none"
          opacity="0.55"
          transform="rotate(-22 260 260)"
        />
        <ellipse
          cx="260"
          cy="260"
          rx="190"
          ry="90"
          stroke="#a34a3a"
          strokeWidth="2.5"
          fill="none"
          transform="rotate(18 260 260)"
        />
        <g transform="rotate(18 260 260)">
          <circle cx="450" cy="260" r="5" fill="#f6f4ef" />
          <circle cx="70" cy="260" r="5" fill="#f6f4ef" />
          <circle cx="260" cy="170" r="5" fill="#f6f4ef" />
          <circle cx="380" cy="215" r="7" fill="#a34a3a" />
          <line
            x1="380"
            y1="215"
            x2="420"
            y2="185"
            stroke="#f6f4ef"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
        <circle cx="260" cy="260" r="74" fill="#f6f4ef" />
        <circle cx="260" cy="260" r="74" fill="none" stroke="#a34a3a" strokeWidth="2" />
        <rect x="252" y="253" width="16" height="14" rx="2" fill="#0d0d0d" />
      </svg>
    </div>
  );
}

function HandoffGraphic() {
  const rows = [
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1],
  ];
  return (
    <div
      style={{
        display: "flex",
        width: "520px",
        height: "630px",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d0d0d",
      }}
    >
      {/* transmission axis */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "40px",
          right: "40px",
          top: "311px",
          height: "2px",
          backgroundColor: "#a34a3a",
          opacity: 0.55,
        }}
      />

      {/* left device */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "48px",
          top: "210px",
          width: "108px",
          height: "200px",
          border: "3px solid #f6f4ef",
          borderRadius: "14px",
          backgroundColor: "#0d0d0d",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "38px",
            height: "4px",
            backgroundColor: "#9b8c73",
            borderRadius: "2px",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            display: "flex",
            width: "82px",
            height: "150px",
            marginTop: "10px",
            backgroundColor: "#9b8c73",
            opacity: 0.14,
            borderRadius: "4px",
          }}
        />
      </div>

      {/* right device */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "48px",
          top: "210px",
          width: "108px",
          height: "200px",
          border: "3px solid #f6f4ef",
          borderRadius: "14px",
          backgroundColor: "#0d0d0d",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "38px",
            height: "4px",
            backgroundColor: "#9b8c73",
            borderRadius: "2px",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            display: "flex",
            width: "82px",
            height: "150px",
            marginTop: "10px",
            backgroundColor: "#a34a3a",
            opacity: 0.22,
            borderRadius: "4px",
          }}
        />
      </div>

      {/* compression echoes */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "182px",
          top: "271px",
          width: "80px",
          height: "80px",
          backgroundColor: "#f6f4ef",
          opacity: 0.08,
          borderRadius: "2px",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "196px",
          top: "278px",
          width: "66px",
          height: "66px",
          backgroundColor: "#f6f4ef",
          opacity: 0.14,
          borderRadius: "2px",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "208px",
          top: "284px",
          width: "54px",
          height: "54px",
          backgroundColor: "#f6f4ef",
          opacity: 0.22,
          borderRadius: "2px",
        }}
      />

      {/* QR packet 7x7 */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "224px",
          top: "245px",
          width: "140px",
          height: "140px",
          backgroundColor: "#f6f4ef",
          padding: "10px",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "3px",
        }}
      >
        {rows.map((row, r) => (
          <div
            key={r}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              height: "14px",
            }}
          >
            {row.map((cell, c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  width: "14px",
                  height: "14px",
                  backgroundColor: cell ? "#0d0d0d" : "#f6f4ef",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* cadence dots */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "162px",
          top: "308px",
          width: "6px",
          height: "6px",
          backgroundColor: "#f6f4ef",
          opacity: 0.7,
          borderRadius: "3px",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "148px",
          top: "308px",
          width: "6px",
          height: "6px",
          backgroundColor: "#f6f4ef",
          opacity: 0.45,
          borderRadius: "3px",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "162px",
          top: "308px",
          width: "6px",
          height: "6px",
          backgroundColor: "#f6f4ef",
          opacity: 0.7,
          borderRadius: "3px",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "148px",
          top: "308px",
          width: "6px",
          height: "6px",
          backgroundColor: "#f6f4ef",
          opacity: 0.45,
          borderRadius: "3px",
        }}
      />
    </div>
  );
}

function DurableLocalGraphic() {
  return (
    <div
      style={{
        position: "relative",
        width: 520,
        height: 630,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* halo rings */}
      <div
        style={{
          position: "absolute",
          width: 460,
          height: 460,
          borderRadius: 230,
          border: "2px solid #56534b",
          opacity: 0.28,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: 170,
          border: "2px solid #56534b",
          opacity: 0.18,
          display: "flex",
        }}
      />

      {/* plinth shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 168,
          width: 400,
          height: 18,
          background: "#000000",
          opacity: 0.5,
          borderRadius: 9,
          display: "flex",
        }}
      />

      {/* plinth */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          width: 380,
          height: 42,
          background: "#9b8c73",
          borderRadius: 6,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 180,
          width: 380,
          height: 12,
          background: "#f6f4ef",
          opacity: 0.18,
          borderRadius: 6,
          display: "flex",
        }}
      />

      {/* jar body */}
      <div
        style={{
          position: "absolute",
          bottom: 192,
          width: 260,
          height: 300,
          background: "#f6f4ef",
          borderRadius: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ width: 260, height: 78, background: "#e8e2d4", display: "flex" }} />
        <div
          style={{
            width: 260,
            height: 3,
            background: "#9b8c73",
            opacity: 0.55,
            display: "flex",
          }}
        />
        <div style={{ width: 260, height: 219, background: "#f6f4ef", display: "flex" }} />
      </div>

      {/* inner rim shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 466,
          width: 260,
          height: 26,
          background: "#0d0d0d",
          opacity: 0.12,
          display: "flex",
        }}
      />

      {/* wax seal */}
      <div
        style={{
          position: "absolute",
          bottom: 452,
          width: 108,
          height: 108,
          borderRadius: 54,
          background: "#a34a3a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            border: "3px solid #f6f4ef",
            opacity: 0.55,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#f6f4ef",
              opacity: 0.7,
              display: "flex",
            }}
          />
        </div>
      </div>

      {/* wax drip */}
      <div
        style={{
          position: "absolute",
          bottom: 432,
          right: 208,
          width: 22,
          height: 30,
          background: "#a34a3a",
          borderRadius: 11,
          display: "flex",
        }}
      />
    </div>
  );
}

function AgnosticWebBleGraphic() {
  return (
    <div
      style={{
        display: "flex",
        width: "520px",
        height: "630px",
        backgroundColor: "#0d0d0d",
        position: "relative",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      <svg
        width="520"
        height="630"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <title>Agnostic Web BLE — concentric air</title>
        <circle
          cx="140"
          cy="315"
          r="520"
          fill="none"
          stroke="#9b8c73"
          strokeOpacity="0.12"
          strokeWidth="3"
        />
        <circle
          cx="140"
          cy="315"
          r="410"
          fill="none"
          stroke="#9b8c73"
          strokeOpacity="0.22"
          strokeWidth="3"
        />
        <circle
          cx="140"
          cy="315"
          r="310"
          fill="none"
          stroke="#9b8c73"
          strokeOpacity="0.35"
          strokeWidth="4"
        />
        <circle
          cx="140"
          cy="315"
          r="220"
          fill="none"
          stroke="#9b8c73"
          strokeOpacity="0.5"
          strokeWidth="4"
        />
        <circle
          cx="140"
          cy="315"
          r="140"
          fill="none"
          stroke="#9b8c73"
          strokeOpacity="0.7"
          strokeWidth="5"
        />
        <circle
          cx="140"
          cy="315"
          r="70"
          fill="none"
          stroke="#f6f4ef"
          strokeOpacity="0.85"
          strokeWidth="6"
        />
        <circle cx="140" cy="315" r="11" fill="#a34a3a" />
        <rect x="184" y="313" width="44" height="4" fill="#a34a3a" />
      </svg>
    </div>
  );
}

function graphicFor(slug: string) {
  switch (slug) {
    case "ghost":
      return <GhostGraphic />;
    case "handoff":
      return <HandoffGraphic />;
    case "durable-local":
      return <DurableLocalGraphic />;
    case "agnostic-web-ble":
      return <AgnosticWebBleGraphic />;
    default:
      return null;
  }
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const tagline =
    (TAGLINES as Record<string, string | undefined>)[slug] ??
    project?.description ??
    "";
  const graphic = graphicFor(slug);

  return renderOgCard({
    eyebrow: `oss.sarwagya.wtf/${slug}`,
    title: tagline,
    footer: `@0xsarwagya/${slug}`,
    titleSize: 96,
    graphic,
  });
}
