"use client";

import { motion } from "framer-motion";

import { MarginsLink } from "../margins/margins-link";

const TAGS = ["Software", "Writing", "Systems", "Ideas"];

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between px-5 pb-6 pt-24 sm:px-6 sm:pb-8 sm:pt-28 md:px-12 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif leading-[0.86] tracking-[-0.03em]"
          style={{ fontSize: "clamp(56px, 16vw, 300px)" }}
        >
          <MarginsLink
            subtle
            tooltip="Margins · what I keep writing between everything else"
          >
            Sarwagya.
          </MarginsLink>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-2xl font-serif italic text-ink/85 md:mt-16"
          style={{ fontSize: "clamp(19px, 2.4vw, 34px)", lineHeight: 1.25 }}
        >
          Making, in slow layers —
          <br />
          <MarginsLink underline tooltip="Half-thoughts, kept in the margins">
            thoughts
          </MarginsLink>
          , software,
          <br />
          and{" "}
          <MarginsLink underline tooltip="Sentences · in progress">
            the sentences between
          </MarginsLink>
          .
        </motion.p>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.0 }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 border-t border-ink/10 pt-6 md:flex-row md:items-end md:justify-between"
      >
        <div className="flex flex-col gap-3">
          <span className="label">Living</span>
          <span className="font-mono text-xs text-ink/70">Bihar → Ludwigsburg</span>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li className="label text-ink/70">
            <MarginsLink tooltip="Notes I keep · in the margins">
              Thoughts
            </MarginsLink>
          </li>
          {TAGS.map((tag) => (
            <li key={tag} className="label text-ink/70">
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-end gap-2">
          <span className="label">Scroll slowly.</span>
          <ScrollGlyph />
        </div>
      </motion.footer>
    </section>
  );
}

function ScrollGlyph() {
  return (
    <motion.svg
      width="18"
      height="30"
      viewBox="0 0 18 30"
      fill="none"
      aria-hidden
      animate={{ y: [0, 4, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="0.5" y="0.5" width="17" height="29" rx="8.5" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" fillOpacity="0.55" />
    </motion.svg>
  );
}
