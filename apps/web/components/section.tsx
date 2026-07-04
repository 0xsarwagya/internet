"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const RISE: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

type Props = {
  id?: string;
  label?: string;
  index?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, label, index, children, className }: Props) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={RISE}
      className={`relative mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-12 ${className ?? ""}`}
    >
      {label ? (
        <header className="mb-10 flex items-baseline justify-between md:mb-16">
          <span className="label">{label}</span>
          {index ? <span className="label">{index}</span> : null}
        </header>
      ) : null}
      {children}
    </motion.section>
  );
}
