"use client";

import { useEffect, useState } from "react";

import { Section } from "../section";

type Line =
  | { kind: "prompt"; command: string }
  | { kind: "output"; text: string }
  | { kind: "gap" };

const SCRIPT: readonly Line[] = [
  { kind: "prompt", command: "whoami" },
  { kind: "output", text: "builder" },
  { kind: "output", text: "student" },
  { kind: "output", text: "immigrant" },
  { kind: "output", text: "optimist" },
  { kind: "output", text: "unfinished" },
  { kind: "gap" },
  { kind: "prompt", command: "today" },
  { kind: "output", text: "Learning." },
  { kind: "output", text: "Building." },
  { kind: "output", text: "Trying again." },
  { kind: "gap" },
  { kind: "prompt", command: "future" },
  { kind: "output", text: "Unknown." },
  { kind: "output", text: "Thankfully." },
];

const TYPING_DELAY_MS = 55;
const OUTPUT_DELAY_MS = 340;
const RESTART_DELAY_MS = 6_800;

export function Terminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");

  useEffect(() => {
    if (lineIndex >= SCRIPT.length) {
      const restart = setTimeout(() => {
        setLineIndex(0);
        setTypedPrompt("");
      }, RESTART_DELAY_MS);
      return () => clearTimeout(restart);
    }

    const current = SCRIPT[lineIndex];
    if (!current) return;

    if (current.kind === "prompt") {
      if (typedPrompt.length < current.command.length) {
        const typing = setTimeout(
          () => setTypedPrompt(current.command.slice(0, typedPrompt.length + 1)),
          TYPING_DELAY_MS,
        );
        return () => clearTimeout(typing);
      }
      const advance = setTimeout(() => {
        setLineIndex((current) => current + 1);
        setTypedPrompt("");
      }, OUTPUT_DELAY_MS);
      return () => clearTimeout(advance);
    }

    const advance = setTimeout(
      () => setLineIndex((current) => current + 1),
      OUTPUT_DELAY_MS,
    );
    return () => clearTimeout(advance);
  }, [lineIndex, typedPrompt]);

  return (
    <Section id="terminal" label="Terminal" index="VI" className="py-24 sm:py-32 md:py-56">
      <div className="grid grid-cols-12 gap-8 md:gap-10">
        <div className="col-span-12 md:col-span-4">
          <p
            className="max-w-sm font-serif italic text-ink/70"
            style={{ fontSize: "clamp(16px, 1.6vw, 22px)", lineHeight: 1.4 }}
          >
            Ask what you&apos;d ask a stranger at a train station. It usually
            gets further than a résumé.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="border border-ink/12 bg-ink/[0.02] p-4 sm:p-6 md:p-10">
            <div className="mb-5 flex items-center justify-between md:mb-6">
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-ink/25" />
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-ink/10" />
              </div>
              <span className="font-mono text-[10px] tracking-[var(--tracking-mono)] text-ink/45">
                ~/sarwagya — zsh
              </span>
            </div>

            <pre className="min-h-[260px] whitespace-pre-wrap font-mono text-[13px] leading-[1.7] text-ink/80 sm:min-h-[320px] sm:text-sm sm:leading-7">
              {renderScript(lineIndex, typedPrompt)}
              <Caret />
            </pre>
          </div>
        </div>
      </div>
    </Section>
  );
}

function renderScript(lineIndex: number, typedPrompt: string) {
  const rendered: string[] = [];
  for (let index = 0; index < lineIndex; index += 1) {
    const line = SCRIPT[index];
    if (!line) continue;
    rendered.push(formatLine(line));
  }
  const current = SCRIPT[lineIndex];
  if (current?.kind === "prompt") {
    rendered.push(`→ ${typedPrompt}`);
  }
  return rendered.join("\n");
}

function formatLine(line: Line): string {
  if (line.kind === "prompt") return `→ ${line.command}`;
  if (line.kind === "output") return `  ${line.text}`;
  return "";
}

function Caret() {
  return <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[3px] animate-pulse bg-ink/60 align-baseline" />;
}
