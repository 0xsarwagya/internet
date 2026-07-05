"use client";

import { useEffect, useMemo, useState } from "react";

import {
  createHandoff,
  isHandoffError,
  type HandoffOffer,
  type HandoffState,
} from "@0xsarwagya/handoff";
import { renderSVG } from "uqr";

const RECEIVE_URL = "/handoff/demo";
const GRID = 8;

const ACCENTS = ["#c9705a", "#5a8ac9", "#7ac95a", "#c9b45a", "#9a5ac9"];

type SketchState = {
  type: "handoff-demo";
  version: 1;
  note: string;
  accent: string;
  pixels: number[];
};

function emptyPixels(): number[] {
  return Array.from({ length: GRID * GRID }, () => 0);
}

function isSketchState(value: HandoffState): value is SketchState & HandoffState {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    value.type === "handoff-demo" &&
    value.version === 1 &&
    typeof value.note === "string" &&
    typeof value.accent === "string" &&
    Array.isArray(value.pixels) &&
    value.pixels.length === GRID * GRID
  );
}

/**
 * The demo is the product: compose something on this device, scan the QR
 * (or open the link) on another, and the exact state appears there. The
 * honesty panel shows what moved and what never touched a server.
 */
export default function Demo() {
  const [handoff] = useState(() => createHandoff({ receiveUrl: RECEIVE_URL }));
  const [received, setReceived] = useState<SketchState | null>(null);
  const [receiveError, setReceiveError] = useState<string | null>(null);
  const [checkedLocation, setCheckedLocation] = useState(false);

  useEffect(() => {
    (async () => {
      if (handoff.peek()) {
        try {
          const state = await handoff.receive();
          if (isSketchState(state)) {
            setReceived(state);
          } else {
            setReceiveError(
              "the handoff decoded, but it is not this demo's state shape",
            );
          }
        } catch (error) {
          setReceiveError(
            isHandoffError(error)
              ? `${error.code}: ${error.message}`
              : String(error),
          );
        }
      }
      setCheckedLocation(true);
    })();
  }, [handoff]);

  if (!checkedLocation) {
    return <p className="font-mono text-xs text-stone">checking for a handoff…</p>;
  }

  return (
    <div className="flex flex-col gap-16">
      {received !== null ? <ReceivedSection state={received} /> : null}
      {receiveError !== null ? (
        <p className="max-w-2xl border-l-2 border-rust/60 pl-4 font-mono text-[12px] text-ink/80">
          This page was opened with a handoff that could not be received —{" "}
          {receiveError}. A truncated scan or a mangled link does this; the
          failure is typed, never mysterious.
        </p>
      ) : null}
      <ComposeSection handoff={handoff} seed={received} />
    </div>
  );
}

function ReceivedSection({ state }: { state: SketchState }) {
  return (
    <section>
      <h2 className="label">Received — this device just became the other one</h2>
      <p
        className="mt-3 max-w-2xl font-body text-graphite"
        style={{ fontSize: 15, lineHeight: 1.55 }}
      >
        The note, the accent, and the sketch below arrived inside the URL you
        just opened. No account was created and no server stored this state —
        it travelled in the fragment, which browsers never even send in the
        HTTP request.
      </p>
      <div className="mt-6 flex flex-wrap items-start gap-8">
        <PixelGrid pixels={state.pixels} accent={state.accent} readOnly />
        <div className="max-w-sm">
          <p className="font-body text-[15px] text-ink/90">{state.note || "(empty note)"}</p>
          <p className="mt-2 font-mono text-[11px] text-stone">
            accent <span style={{ color: state.accent }}>{state.accent}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function ComposeSection({
  handoff,
  seed,
}: {
  handoff: ReturnType<typeof createHandoff>;
  seed: SketchState | null;
}) {
  const [note, setNote] = useState(seed?.note ?? "");
  const [accent, setAccent] = useState(seed?.accent ?? ACCENTS[0] ?? "#c9705a");
  const [pixels, setPixels] = useState<number[]>(seed?.pixels ?? emptyPixels());
  const [offer, setOffer] = useState<HandoffOffer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const qrSvg = useMemo(
    () => (offer !== null && offer.qrFriendly ? renderSVG(offer.url) : null),
    [offer],
  );

  const create = async () => {
    setError(null);
    setCopied(false);
    try {
      const state: SketchState = {
        type: "handoff-demo",
        version: 1,
        note,
        accent,
        pixels,
      };
      setOffer(await handoff.create(state));
    } catch (err) {
      setOffer(null);
      setError(isHandoffError(err) ? `${err.code}: ${err.message}` : String(err));
    }
  };

  const copy = async () => {
    if (offer === null) return;
    await navigator.clipboard.writeText(offer.url);
    setCopied(true);
  };

  return (
    <section>
      <h2 className="label">
        {seed !== null ? "Continue editing — or hand it off again" : "Compose something worth moving"}
      </h2>
      <p
        className="mt-3 max-w-2xl font-body text-graphite"
        style={{ fontSize: 15, lineHeight: 1.55 }}
      >
        Sketch a few pixels, write a line, pick an accent. Then hand it off:
        scan the QR with another device — or open the link in another browser
        — and this exact state appears there.
      </p>

      <div className="mt-6 flex flex-wrap items-start gap-8">
        <PixelGrid
          pixels={pixels}
          accent={accent}
          onToggle={(index) =>
            setPixels((prev) => prev.map((p, i) => (i === index ? 1 - (p ?? 0) : p)))
          }
        />
        <div className="flex min-w-[240px] max-w-sm flex-col gap-4">
          <input
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="a note travelling with the sketch…"
            className="border border-ink/25 bg-transparent px-4 py-2 font-mono text-xs text-ink outline-none focus:border-rust"
          />
          <div className="flex gap-2">
            {ACCENTS.map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`accent ${value}`}
                onClick={() => setAccent(value)}
                className="h-6 w-6 border"
                style={{
                  background: value,
                  borderColor: value === accent ? "var(--color-ink)" : "transparent",
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <DemoButton onClick={() => void create()} label="Hand off" />
            <DemoButton
              onClick={() => {
                setPixels(emptyPixels());
                setNote("");
                setOffer(null);
              }}
              label="Clear"
            />
          </div>
        </div>
      </div>

      {error !== null ? (
        <p className="mt-4 font-mono text-[11px] text-rust">{error}</p>
      ) : null}

      {offer !== null ? (
        <div className="mt-8 flex flex-wrap items-start gap-8">
          {qrSvg !== null ? (
            <div
              className="w-[240px] border border-ink/10 bg-white p-3"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          ) : (
            <p className="max-w-xs border-l-2 border-rust/60 pl-4 font-mono text-[11px] text-stone">
              This state is past the reliable QR size — cameras give up before
              specifications do. The link below still carries it fine.
            </p>
          )}
          <div className="max-w-sm">
            <p className="label">The honest panel</p>
            <ul className="mt-3 flex flex-col gap-1 font-mono text-[12px] text-ink/80">
              <li>{(offer.size / 1024).toFixed(2)} KB of state</li>
              <li>inline transfer — the state is inside the link</li>
              <li>no Handoff server exists; nothing was uploaded</li>
              <li>{offer.qrFriendly ? "QR-friendly size" : "link-only size"}</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <DemoButton onClick={() => void copy()} label={copied ? "Copied" : "Copy link"} />
            </div>
            <p className="mt-4 break-all font-mono text-[10px] text-stone">
              {offer.url.slice(0, 120)}…
            </p>
            <p className="mt-3 font-mono text-[11px] text-stone">
              Anyone with this complete link can receive the state — the
              artifact is the capability. That is the security model, stated
              plainly.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function PixelGrid({
  pixels,
  accent,
  onToggle,
  readOnly,
}: {
  pixels: number[];
  accent: string;
  onToggle?: (index: number) => void;
  readOnly?: boolean;
}) {
  return (
    <div
      className="grid gap-[2px] border border-ink/10 p-2"
      style={{ gridTemplateColumns: `repeat(${GRID}, 22px)` }}
    >
      {pixels.map((on, index) => (
        <button
          key={index}
          type="button"
          disabled={readOnly}
          aria-label={`pixel ${index}`}
          onClick={() => onToggle?.(index)}
          className="h-[22px] w-[22px] border border-ink/10 transition-colors"
          style={{ background: on ? accent : "transparent" }}
        />
      ))}
    </div>
  );
}

function DemoButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-ink/25 px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-rust hover:text-rust"
    >
      {label}
    </button>
  );
}
