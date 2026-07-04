"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MIN_INTERVAL_MS = 90_000;
const MAX_INTERVAL_MS = 180_000;
const CROSS_DURATION_MS = 2_600;

export function ShootingStar() {
  const [visible, setVisible] = useState(false);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const nextInterval = () =>
      MIN_INTERVAL_MS + Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS);

    const cycle = () => {
      showTimer = setTimeout(() => {
        setSeed((current) => current + 1);
        setVisible(true);
        hideTimer = setTimeout(() => {
          setVisible(false);
          cycle();
        }, CROSS_DURATION_MS);
      }, nextInterval());
    };

    cycle();

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const topPercent = 6 + ((seed * 37) % 40);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={seed}
          aria-hidden
          className="pointer-events-none fixed z-[8]"
          style={{ top: `${topPercent}%`, left: "-10%" }}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: "120vw", opacity: [0, 1, 1, 0] }}
          transition={{ duration: CROSS_DURATION_MS / 1000, ease: "easeOut" }}
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-ink/40 to-transparent" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
