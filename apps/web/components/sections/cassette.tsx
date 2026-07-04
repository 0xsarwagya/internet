"use client";

import { motion } from "framer-motion";

import { CASSETTE_A_SIDE } from "../../content/music";
import { Section } from "../section";

export function Cassette() {
  return (
    <Section id="cassette" label="On rotation" index="V" className="py-24 sm:py-32 md:py-56">
      <div className="grid grid-cols-12 gap-8 md:gap-10">
        <div className="col-span-12 md:col-span-5">
          <CassetteBody />
          <div className="mt-5 flex items-baseline justify-between md:mt-6">
            <span className="label">Side A</span>
            <span className="font-mono text-xs text-ink/60">C60 · Ferric</span>
          </div>
        </div>

        <ol className="col-span-12 md:col-span-6 md:col-start-7">
          {CASSETTE_A_SIDE.map((track, index) => {
            const number = (index + 1).toString().padStart(2, "0");
            return (
              <li
                key={track.artist}
                className="flex flex-col gap-1 border-t border-ink/10 py-4 last:border-b sm:grid sm:grid-cols-12 sm:items-baseline sm:gap-4 sm:py-5"
              >
                <span className="label sm:col-span-2">{number}</span>
                <span
                  className="font-serif text-ink sm:col-span-6"
                  style={{ fontSize: "clamp(18px, 1.8vw, 26px)", lineHeight: 1.2 }}
                >
                  {track.artist}
                </span>
                <span
                  className="font-serif italic text-ink/60 sm:col-span-4 sm:text-right"
                  style={{ fontSize: "clamp(13px, 1.05vw, 16px)", lineHeight: 1.35 }}
                >
                  {track.note}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

function CassetteBody() {
  return (
    <div className="relative aspect-[16/10] w-full border border-ink/15 bg-paper">
      <div className="absolute inset-3 border border-ink/10 bg-paper sm:inset-6" />

      <div className="absolute inset-x-5 top-4 flex items-center justify-between sm:inset-x-8 sm:top-8">
        <span className="label">Sarwagya · 2026</span>
        <span className="font-mono text-[10px] tracking-[var(--tracking-mono)] text-ink/45">
          A / 60
        </span>
      </div>

      <div
        className="absolute left-8 font-serif italic text-ink/85 sm:left-14"
        style={{
          top: "clamp(28%, 22%, 30%)",
          fontSize: "clamp(15px, 2.2vw, 30px)",
          lineHeight: 1.15,
        }}
      >
        On Rotation
      </div>
      <div
        className="absolute right-8 font-mono text-[9px] tracking-[var(--tracking-mono)] text-ink/45 sm:right-14 sm:text-[10px]"
        style={{ top: "clamp(28%, 22%, 30%)" }}
      >
        No Spotify. On purpose.
      </div>

      <div
        className="absolute inset-x-6 h-3 border border-ink/10 bg-ink/[0.03] sm:inset-x-14 sm:h-6"
        style={{ bottom: "38%" }}
      />

      <div className="absolute inset-x-3 bottom-4 flex items-center justify-between sm:inset-x-6 sm:bottom-6">
        <Spool />
        <div className="mx-3 h-4 flex-1 border-t border-dashed border-ink/15 sm:mx-6 sm:h-6" />
        <Spool />
      </div>
    </div>
  );
}

function Spool() {
  return (
    <motion.div
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      className="relative h-8 w-8 rounded-full border border-ink/15 sm:h-12 sm:w-12"
    >
      <div className="absolute inset-1.5 rounded-full border border-ink/10 sm:inset-2" />
      <div className="absolute inset-[46%] rounded-full bg-ink/40" />
      <div className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-ink/15 sm:h-8" />
      <div className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-ink/15 sm:w-8" />
    </motion.div>
  );
}
