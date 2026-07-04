import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1100px] items-baseline justify-between px-5 pt-8 sm:px-6 md:px-10 md:pt-10">
      <Link
        href="/"
        className="font-mono text-xs tracking-[0.08em] text-ink transition-colors hover:text-rust"
      >
        eng<span className="text-stone">.sarwagya.wtf</span>
      </Link>
      <nav className="flex items-baseline gap-6">
        <Link href="/learnings" className="label transition-colors hover:text-rust">
          Learnings
        </Link>
        <a
          href="https://sarwagya.wtf"
          className="label transition-colors hover:text-rust"
        >
          sarwagya.wtf ↗
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
