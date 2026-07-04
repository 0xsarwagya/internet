"use client";

import { useEffect, useRef } from "react";

const IDLE_TIMEOUT_MS = 900;
const FOLLOW_LAG = 0.18;

export function CursorHalo() {
  const haloRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const halo = haloRef.current;
    if (!halo) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let animationFrameId = 0;

    halo.style.opacity = "0";

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      halo.style.opacity = "1";
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        halo.style.opacity = "0";
      }, IDLE_TIMEOUT_MS);
    };

    const tick = () => {
      currentX += (targetX - currentX) * FOLLOW_LAG;
      currentY += (targetY - currentY) * FOLLOW_LAG;
      halo.style.transform = `translate3d(${currentX - 14}px, ${currentY - 14}px, 0)`;
      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animationFrameId);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return <div ref={haloRef} className="cursor-halo" aria-hidden />;
}
