"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

const HOVER_DELAY_MS = 260;

type Props = {
  tooltip: string;
  children: ReactNode;
  className?: string;
  href?: string;
  underline?: boolean;
  subtle?: boolean;
};

export function MarginsLink({
  tooltip,
  children,
  className = "",
  href = "/margins",
  underline = false,
  subtle = false,
}: Props) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), HOVER_DELAY_MS);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const underlineClasses = underline
    ? "underline decoration-ink/25 decoration-dotted underline-offset-[6px] hover:decoration-rust focus:decoration-rust"
    : "";

  const colorClasses = subtle ? "" : "hover:text-rust focus:text-rust";

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <Link
        href={href}
        className={`transition-colors outline-none ${colorClasses} ${underlineClasses} ${className}`}
      >
        {children}
      </Link>

      <span
        role="tooltip"
        aria-hidden={!visible}
        className={`pointer-events-none absolute left-1/2 top-full z-50 mt-3 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[var(--tracking-mono)] text-paper/90 shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-all duration-200 md:flex ${
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-1 opacity-0"
        }`}
      >
        <span
          aria-hidden
          className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink"
        />
        {tooltip}
      </span>
    </span>
  );
}
