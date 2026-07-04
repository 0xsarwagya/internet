"use client";

import { useEffect } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const KONAMI_EVENT = "sarwagya:konami";

export function KonamiListener() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let progress = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      const expected = KONAMI_SEQUENCE[progress];
      if (!expected) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === expected) {
        progress += 1;
        if (progress === KONAMI_SEQUENCE.length) {
          window.dispatchEvent(new CustomEvent(KONAMI_EVENT));
          progress = 0;
        }
      } else {
        progress = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}

export const KONAMI_EVENT_NAME = KONAMI_EVENT;
