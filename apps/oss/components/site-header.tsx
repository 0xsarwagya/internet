import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1100px] items-baseline justify-between px-5 pt-8 sm:px-6 md:px-10 md:pt-10">
      <Link
        href="/"
        className="font-mono text-xs tracking-[0.08em] text-ink transition-colors hover:text-rust"
      >
        oss<span className="text-stone">.sarwagya.wtf</span>
      </Link>
      <nav className="flex items-baseline gap-6">
        <Link href="/" className="label transition-colors hover:text-rust">
          Projects
        </Link>
        <a
          href="https://sarwagya.wtf"
          className="label transition-colors hover:text-rust"
        >
          sarwagya.wtf ↗
        </a>
      </nav>
    </header>
  );
}
