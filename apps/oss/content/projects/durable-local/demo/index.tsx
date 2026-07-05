"use client";

import { useCallback, useEffect, useState } from "react";

import {
  createDurable,
  isDurableError,
  type DurabilityStatus,
  type Slot,
} from "@0xsarwagya/durable-local";

type Workspace = {
  title: string;
  cards: { id: string; text: string; accent: "paper" | "rust" | "stone" }[];
  preferences: { showRevision: boolean };
};

const INITIAL: Workspace = {
  title: "Untitled workspace",
  cards: [],
  preferences: { showRevision: true },
};

const durable = createDurable({ namespace: "demo" });

export default function DurableLocalDemo() {
  const [slot, setSlot] = useState<Slot<Workspace> | null>(null);
  const [value, setValue] = useState<Workspace>(INITIAL);
  const [revision, setRevision] = useState<number>(0);
  const [source, setSource] = useState<string>("initial");
  const [status, setStatus] = useState<DurabilityStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      try {
        const opened = await durable.open<Workspace>("workspace", {
          initial: INITIAL,
        });
        setSlot(opened);
        setValue(opened.value);
        setRevision(opened.revision);
        setSource("open");
        cleanup = opened.subscribe((next, event) => {
          setValue(next);
          setRevision(event.revision);
          setSource(event.source);
        });
        setStatus(await durable.storage());
      } catch (err) {
        setError(isDurableError(err) ? `${err.code}: ${err.message}` : String(err));
      }
    })();
    return () => cleanup?.();
  }, []);

  const rename = useCallback(async () => {
    if (!slot) return;
    try {
      await slot.update((current) => ({
        ...current,
        title:
          current.title === "Untitled workspace"
            ? "A named workspace"
            : `${current.title} (edited)`,
      }));
    } catch (err) {
      setError(isDurableError(err) ? `${err.code}: ${err.message}` : String(err));
    }
  }, [slot]);

  const addCard = useCallback(async () => {
    if (!slot) return;
    try {
      await slot.update((current) => ({
        ...current,
        cards: [
          ...current.cards,
          {
            id: `c${current.cards.length + 1}`,
            text: `Card ${current.cards.length + 1}`,
            accent:
              current.cards.length % 3 === 0
                ? "rust"
                : current.cards.length % 3 === 1
                  ? "stone"
                  : "paper",
          },
        ],
      }));
    } catch (err) {
      setError(isDurableError(err) ? `${err.code}: ${err.message}` : String(err));
    }
  }, [slot]);

  const reset = useCallback(async () => {
    if (!slot) return;
    try {
      await slot.reset();
    } catch (err) {
      setError(isDurableError(err) ? `${err.code}: ${err.message}` : String(err));
    }
  }, [slot]);

  const destroy = useCallback(async () => {
    if (!slot) return;
    try {
      await slot.destroy();
      setValue(INITIAL);
      setRevision(0);
      setSource("destroyed");
    } catch (err) {
      setError(isDurableError(err) ? `${err.code}: ${err.message}` : String(err));
    }
  }, [slot]);

  const requestPersist = useCallback(async () => {
    try {
      const granted = await durable.requestPersistence();
      setStatus(await durable.storage());
      if (!granted) setError("Browser did not grant persistent storage.");
    } catch (err) {
      setError(isDurableError(err) ? `${err.code}: ${err.message}` : String(err));
    }
  }, []);

  const accentClass: Record<Workspace["cards"][number]["accent"], string> = {
    paper: "bg-paper",
    rust: "bg-rust/20",
    stone: "bg-stone/20",
  };

  return (
    <div className="not-prose flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="label">Durable workspace</p>
        <h2
          className="font-serif italic text-ink"
          style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1 }}
        >
          {value.title}
        </h2>
        <p className="text-[13px] text-stone">
          Committed locally · revision {revision} · via {source}
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={rename}
          className="border border-ink/20 px-3 py-1 text-[12px] hover:border-rust hover:text-rust"
        >
          Rename
        </button>
        <button
          type="button"
          onClick={addCard}
          className="border border-ink/20 px-3 py-1 text-[12px] hover:border-rust hover:text-rust"
        >
          Add a card
        </button>
        <button
          type="button"
          onClick={reset}
          className="border border-ink/20 px-3 py-1 text-[12px] hover:border-rust hover:text-rust"
        >
          Reset to initial
        </button>
        <button
          type="button"
          onClick={destroy}
          className="border border-ink/20 px-3 py-1 text-[12px] hover:border-rust hover:text-rust"
        >
          Destroy this slot
        </button>
      </div>

      {value.cards.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {value.cards.map((card) => (
            <li
              key={card.id}
              className={`aspect-square border border-ink/10 p-3 text-[12px] ${
                accentClass[card.accent]
              }`}
            >
              <span className="label">{card.id}</span>
              <p className="mt-2 font-serif text-[14px]">{card.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border border-dashed border-ink/20 p-6 text-center font-serif italic text-ink/70">
          Add a card, then refresh the page. It stays.
        </p>
      )}

      <section className="border-t border-ink/10 pt-6">
        <p className="label">Durability</p>
        {status ? (
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-ink/80 sm:grid-cols-4">
            <dt className="font-mono uppercase text-stone">engine</dt>
            <dd>{status.engine}</dd>
            <dt className="font-mono uppercase text-stone">persistent</dt>
            <dd>{String(status.persistent)}</dd>
            <dt className="font-mono uppercase text-stone">risk</dt>
            <dd>{status.evictionRisk}</dd>
            <dt className="font-mono uppercase text-stone">private</dt>
            <dd>{status.privateMode}</dd>
            <dt className="font-mono uppercase text-stone">quota</dt>
            <dd>
              {status.quotaBytes === null
                ? "unknown"
                : `${Math.round(status.quotaBytes / 1024 / 1024).toLocaleString()} MB${status.quotaRounded ? " (rounded)" : ""}`}
            </dd>
            <dt className="font-mono uppercase text-stone">usage</dt>
            <dd>
              {status.usageBytes === null
                ? "unknown"
                : `${(status.usageBytes / 1024).toFixed(1)} KB`}
            </dd>
          </dl>
        ) : (
          <p className="mt-3 text-[13px] text-stone">Probing storage…</p>
        )}
        {status && status.evictionRisk === "ios-capped" ? (
          <p className="mt-3 border-l-2 border-rust pl-3 text-[12px] text-rust">
            Safari&apos;s ITP still evicts this tab after 7 days without
            interaction. Install as a Home Screen web app to keep the
            workspace.
          </p>
        ) : null}
        {status && !status.persistent ? (
          <button
            type="button"
            onClick={requestPersist}
            className="mt-4 border border-ink/20 px-3 py-1 text-[12px] hover:border-rust hover:text-rust"
          >
            Request persistent storage
          </button>
        ) : null}
      </section>

      <section className="border-t border-ink/10 pt-6">
        <p className="label">Cross-tab</p>
        <p className="mt-2 text-[13px] text-ink/80">
          Open this page in a second tab and change the workspace there.
          This tab updates. Storage is truth; the notification channel
          just says &ldquo;look again&rdquo;.
        </p>
      </section>

      {error ? (
        <p className="border-l-2 border-rust pl-3 text-[12px] text-rust">
          {error}
        </p>
      ) : null}
    </div>
  );
}
