"use client";

import { motion } from "framer-motion";

import { FRAGMENTS } from "../../content/fragments";
import { Section } from "../section";
import { MarginsLink } from "../margins/margins-link";

const RISE = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function Fragments() {
  return (
    <Section id="fragments" label="Fragments" index="II" className="py-24 sm:py-32 md:py-56">
      <ul className="grid grid-cols-1 gap-x-16 gap-y-14 sm:gap-y-20 md:grid-cols-2 md:gap-y-24">
        {FRAGMENTS.map((fragment, index) => (
          <motion.li
            key={fragment.lines.join(" ")}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={RISE}
            className="font-serif italic text-ink/90"
            style={{ fontSize: "clamp(24px, 3vw, 44px)", lineHeight: 1.24 }}
          >
            {fragment.lines.map((line, lineIndex) => (
              <span key={line} className="block">
                {lineIndex === fragment.lines.length - 1 ? (
                  <span className="not-italic text-ink">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="mt-20 flex items-baseline gap-4 text-ink/60 md:mt-24"
      >
        <span className="h-px w-8 bg-ink/25" aria-hidden />
        <MarginsLink tooltip="Half-thoughts, kept in the margins">
          <span className="label">More, at the margins →</span>
        </MarginsLink>
      </motion.div>
    </Section>
  );
}
