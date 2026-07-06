"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

const LOGO_SECRET_THRESHOLD = 7;
const SECRET_VISIBLE_MS = 3_600;

type Props = {
  notesCount?: number;
};

export function ChromeIndex({ notesCount }: Props) {
  const safeCount = typeof notesCount === "number" ? notesCount : 0;
  const pathname = usePathname();
  const isMargins = pathname?.startsWith("/margins") ?? false;

  const [, setHoverCount] = useState(0);
  const [secretVisible, setSecretVisible] = useState(false);

  const onLogoEnter = () => {
    setHoverCount((count) => {
      const next = count + 1;
      if (next >= LOGO_SECRET_THRESHOLD) {
        setSecretVisible(true);
        window.setTimeout(() => setSecretVisible(false), SECRET_VISIBLE_MS);
        return 0;
      }
      return next;
    });
  };

  const paddedCount = safeCount.toString().padStart(3, "0");
  const showCount = safeCount > 0;

  return (
    <div
      aria-hidden={false}
      className="pointer-events-none fixed inset-x-0 top-4 z-40 flex items-start justify-between px-5 sm:top-6 sm:px-6 md:px-10"
    >
      <a
        href="https://me.sarwagya.wtf"
        rel="me"
        onMouseEnter={onLogoEnter}
        onFocus={onLogoEnter}
        className="pointer-events-auto label tracking-[var(--tracking-mono)] text-ink/80 outline-none hover:text-rust focus:text-rust"
      >
        Sarwagya
      </a>

      <div className="pointer-events-auto flex flex-col items-end gap-1.5">
        <Link
          href="/margins"
          aria-current={isMargins ? "page" : undefined}
          className={`group inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[var(--tracking-mono)] outline-none transition-colors sm:text-[12px] ${
            isMargins
              ? "text-rust"
              : "text-ink hover:text-rust focus:text-rust"
          }`}
        >
          <span
            aria-hidden
            className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${
              isMargins ? "bg-rust" : "bg-ink/30 group-hover:bg-rust"
            }`}
          />
          <span>Margins</span>
          {showCount ? (
            <span
              aria-hidden
              className="text-ink/40 group-hover:text-rust group-focus:text-rust"
            >
              · {paddedCount}
            </span>
          ) : null}
          <span
            aria-hidden
            className="translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5 group-focus:translate-x-0.5"
          >
            →
          </span>
        </Link>

        <nav
          aria-label="Family sites"
          className="flex items-baseline gap-x-3 font-mono text-[10px] uppercase tracking-[var(--tracking-mono)] text-ink/55 sm:text-[11px]"
        >
          <FamilyLink href="https://eng.sarwagya.wtf">eng</FamilyLink>
          <span aria-hidden className="text-ink/20">·</span>
          <FamilyLink href="https://bakaiti.sarwagya.wtf">bakaiti</FamilyLink>
          <span aria-hidden className="text-ink/20">·</span>
          <FamilyLink href="https://oss.sarwagya.wtf">oss</FamilyLink>
        </nav>

        {secretVisible ? (
          <span className="label pointer-events-none text-rust">
            You found nothing. Exactly.
          </span>
        ) : null}
      </div>
    </div>
  );
}

function FamilyLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-baseline gap-1 outline-none transition-colors hover:text-rust focus:text-rust"
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="text-ink/30 transition-colors group-hover:text-rust group-focus:text-rust"
      >
        ↗
      </span>
    </a>
  );
}
