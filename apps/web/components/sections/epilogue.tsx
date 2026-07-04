"use client";

import { useEffect, useState } from "react";

import { FooterLink } from "@0xsarwagya/ui/footer-link";

import { KONAMI_EVENT_NAME } from "../chrome/konami-listener";
import { KONAMI_MESSAGE } from "../../content/fragments";

const DEFAULT_LINES = ["Everything here is temporary.", "Including this website."];

export function Epilogue() {
  const [lines, setLines] = useState<readonly string[]>(DEFAULT_LINES);

  useEffect(() => {
    const onKonami = () => {
      setLines([KONAMI_MESSAGE]);
    };
    window.addEventListener(KONAMI_EVENT_NAME, onKonami);
    return () => window.removeEventListener(KONAMI_EVENT_NAME, onKonami);
  }, []);

  return (
    <footer className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-40 md:px-12 md:pt-56">
      <div className="hairline" />
      <div className="mt-12 grid grid-cols-12 gap-8 md:mt-16 md:gap-10">
        <div className="col-span-12 md:col-span-8">
          {lines.map((line) => (
            <p
              key={line}
              className="font-serif italic text-ink/85"
              style={{ fontSize: "clamp(24px, 3.4vw, 52px)", lineHeight: 1.22 }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="col-span-12 flex flex-col gap-4 md:col-span-3 md:col-start-10">
          <FooterLink label="Write" href="mailto:hello@sarwagya.wtf" value="hello@sarwagya.wtf" />
          <FooterLink label="Read" href="https://twitter.com/0xsarwagya" value="@0xsarwagya" />
          <FooterLink label="Ship" href="https://github.com/0xsarwagya" value="github/0xsarwagya" />
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-baseline sm:gap-6 md:mt-24">
        <span className="label">Made slowly, in Ludwigsburg</span>
        <span className="label">© {new Date().getFullYear()} · Sarwagya</span>
      </div>
    </footer>
  );
}
