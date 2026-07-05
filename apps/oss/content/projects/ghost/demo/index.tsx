"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  capabilities,
  createGhost,
  isGhostError,
  type Ghost,
  type GhostCapabilities,
  type GhostProof,
} from "@0xsarwagya/ghost";
import {
  createChallenge,
  InMemoryChallengeStore,
  verifyGhostProof,
} from "@0xsarwagya/ghost/server";

const AUDIENCE = "https://oss.sarwagya.wtf";
const NOTES_KEY = "ghost-demo-notes";

type Note = { text: string; ghostId: string; at: string };
type Log = { at: string; line: string };

function useLog() {
  const [entries, setEntries] = useState<Log[]>([]);
  const log = useCallback((line: string) => {
    setEntries((prev) => [
      ...prev.slice(-30),
      { at: new Date().toISOString().slice(11, 19), line },
    ]);
  }, []);
  return { entries, log };
}

function describeFailure(error: unknown): string {
  if (isGhostError(error)) {
    return `${error.code} during ${error.operation}: ${error.message}`;
  }
  return error instanceof Error ? error.message : "unknown failure";
}

/**
 * The demo proves continuity, not spectacle: refresh the page and the same
 * identity comes back. The verifier is the real server package running in
 * this tab — the crypto and the replay protection are not faked, only the
 * network hop is elided.
 */
export default function Demo() {
  const [caps, setCaps] = useState<GhostCapabilities | null>(null);
  const [ghost, setGhost] = useState<Ghost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const detected = await capabilities();
        if (cancelled) return;
        setCaps(detected);
        if (detected.supported) {
          const g = await createGhost();
          if (!cancelled) setGhost(g);
        }
      } catch (err) {
        if (!cancelled) setError(describeFailure(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (caps !== null && !caps.supported) {
    return (
      <p
        className="max-w-2xl border-l-2 border-rust/60 pl-4 font-body text-ink/80"
        style={{ fontSize: 15, lineHeight: 1.55 }}
      >
        This runtime cannot run Ghost — it is missing{" "}
        {[
          !caps.webCrypto && "Web Crypto",
          !caps.ed25519 && "Ed25519 key generation",
          !caps.indexedDB && "IndexedDB",
        ]
          .filter(Boolean)
          .join(", ")}
        . In a current Chromium, Firefox, or WebKit browser this page creates
        a persistent identity with no account.
      </p>
    );
  }

  if (error !== null) {
    return (
      <p
        className="max-w-2xl border-l-2 border-rust/60 pl-4 font-body text-ink/80"
        style={{ fontSize: 15, lineHeight: 1.55 }}
      >
        {error}
      </p>
    );
  }

  if (ghost === null) {
    return (
      <p className="font-mono text-xs text-stone">loading identity…</p>
    );
  }

  return (
    <div className="flex flex-col gap-16">
      <IdentitySection ghost={ghost} onReset={setGhost} />
      <ProofSection ghost={ghost} />
      <NotesSection ghost={ghost} />
    </div>
  );
}

function IdentitySection({
  ghost,
  onReset,
}: {
  ghost: Ghost;
  onReset: (ghost: Ghost) => void;
}) {
  const [busy, setBusy] = useState(false);

  const destroy = async () => {
    setBusy(true);
    try {
      await ghost.reset();
      onReset(await createGhost());
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <h2 className="label">This browser&apos;s identity</h2>
      <p
        className="mt-3 max-w-2xl font-body text-graphite"
        style={{ fontSize: 15, lineHeight: 1.55 }}
      >
        Generated locally on your first visit, loaded from IndexedDB on every
        return. Refresh the page — it survives. Open this page in another
        browser or profile and you will see a different ghost. Nobody created
        an account.
      </p>
      <p className="mt-5 break-all font-mono text-sm text-rust">{ghost.id}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <DemoButton
          onClick={destroy}
          disabled={busy}
          label="Destroy this identity"
        />
      </div>
      <p className="mt-3 max-w-2xl font-mono text-[11px] text-stone">
        Not a logout. The key is deleted; the old identity is gone for good
        and everything it owned becomes someone else&apos;s lost property.
      </p>
    </section>
  );
}

function ProofSection({ ghost }: { ghost: Ghost }) {
  const { entries, log } = useLog();
  const storeRef = useRef(new InMemoryChallengeStore());
  const lastProofRef = useRef<GhostProof | null>(null);
  const [busy, setBusy] = useState(false);

  const prove = async () => {
    setBusy(true);
    try {
      const challenge = createChallenge({ audience: AUDIENCE, action: "login" });
      log(`challenge issued: nonce ${challenge.nonce.slice(0, 12)}… action "login"`);
      const proof = await ghost.sign(challenge);
      lastProofRef.current = proof;
      log(`signed by ${proof.ghostId.slice(0, 20)}…`);
      const result = await verifyGhostProof(proof, {
        expectedAudience: AUDIENCE,
        expectedAction: "login",
        challengeStore: storeRef.current,
      });
      log(
        result.ok
          ? `verified: possession proven for ${result.ghostId.slice(0, 20)}…`
          : `rejected: ${result.code}`,
      );
    } catch (error) {
      log(describeFailure(error));
    } finally {
      setBusy(false);
    }
  };

  const replay = async () => {
    const proof = lastProofRef.current;
    if (proof === null) {
      log("nothing to replay — prove possession first");
      return;
    }
    const result = await verifyGhostProof(proof, {
      expectedAudience: AUDIENCE,
      expectedAction: "login",
      challengeStore: storeRef.current,
    });
    log(
      result.ok
        ? "replay verified — this should never happen"
        : `replay rejected: ${result.code}`,
    );
  };

  return (
    <section>
      <h2 className="label">Prove possession</h2>
      <p
        className="mt-3 max-w-2xl font-body text-graphite"
        style={{ fontSize: 15, lineHeight: 1.55 }}
      >
        A one-time challenge is issued, signed with the non-extractable key,
        and verified. Try replaying the same proof — the nonce only spends
        once.
      </p>
      <p className="mt-3 max-w-2xl border-l-2 border-ink/20 pl-4 font-mono text-[11px] text-stone">
        The verifier here is the real @0xsarwagya/ghost/server package
        running in your tab so you can watch it work. In production it runs
        on your server — nothing about the crypto or replay protection is
        faked, only the network hop is elided.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <DemoButton onClick={prove} disabled={busy} label="Prove possession" />
        <DemoButton onClick={replay} label="Replay the last proof" />
      </div>
      <LogView entries={entries} />
    </section>
  );
}

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw === null ? [] : (JSON.parse(raw) as Note[]);
  } catch {
    return [];
  }
}

function NotesSection({ ghost }: { ghost: Ghost }) {
  const storeRef = useRef(new InMemoryChallengeStore());
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const add = async () => {
    const text = draft.trim();
    if (text.length === 0) return;
    // Ownership is asserted with a real proof, not with local trust.
    const challenge = createChallenge({
      audience: AUDIENCE,
      action: "create-note",
      ghostId: ghost.id,
    });
    const proof = await ghost.sign(challenge);
    const result = await verifyGhostProof(proof, {
      expectedAudience: AUDIENCE,
      expectedAction: "create-note",
      expectedGhostId: ghost.id,
      challengeStore: storeRef.current,
    });
    if (!result.ok) {
      setStatus(`rejected: ${result.code}`);
      return;
    }
    const next = [
      ...notes,
      { text, ghostId: result.ghostId, at: new Date().toISOString() },
    ];
    setNotes(next);
    setDraft("");
    setStatus(null);
    localStorage.setItem(NOTES_KEY, JSON.stringify(next));
  };

  return (
    <section>
      <h2 className="label">Notes owned by this browser</h2>
      <p
        className="mt-3 max-w-2xl font-body text-graphite"
        style={{ fontSize: 15, lineHeight: 1.55 }}
      >
        Each note is stamped with the ghost that proved possession when it
        was written. Come back tomorrow: still yours. Destroy the identity
        above: the notes remain, but no key on earth can claim them again.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void add();
          }}
          placeholder="write a note…"
          className="min-w-[240px] border border-ink/25 bg-transparent px-4 py-2 font-mono text-xs text-ink outline-none focus:border-rust"
        />
        <DemoButton onClick={() => void add()} label="Prove & save" />
      </div>
      {status ? (
        <p className="mt-3 font-mono text-[11px] text-rust">{status}</p>
      ) : null}
      {notes.length > 0 ? (
        <ul className="mt-6 flex flex-col">
          {notes.map((note, index) => {
            const mine = note.ghostId === ghost.id;
            return (
              <li
                key={`${note.at}-${index}`}
                className="border-t border-ink/10 py-3 first:border-t-0"
              >
                <p className="font-body text-[15px] text-ink/90">{note.text}</p>
                <p className="mt-1 font-mono text-[11px] text-stone">
                  {note.ghostId.slice(0, 24)}… ·{" "}
                  {mine ? (
                    <span className="text-rust">yours — possession proven</span>
                  ) : (
                    "another ghost"
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}

function DemoButton({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border border-ink/25 px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-rust hover:text-rust disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function LogView({ entries }: { entries: Log[] }) {
  if (entries.length === 0) return null;
  return (
    <pre className="mt-6 max-h-64 overflow-auto border border-ink/10 bg-ink/[0.04] p-4 font-mono text-[12px] leading-relaxed">
      {entries.map((e) => `${e.at}  ${e.line}`).join("\n")}
    </pre>
  );
}
