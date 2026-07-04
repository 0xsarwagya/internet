"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let frame = 0;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, window.scrollY / total) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-ink/10"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-rust"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
