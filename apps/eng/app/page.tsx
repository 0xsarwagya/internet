import type { Metadata } from "next";
import Link from "next/link";

import { getAllLearnings } from "../lib/learnings";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const DATASHEET: { key: string; value: React.ReactNode }[] = [
  { key: "Name", value: "Sarwagya Singh" },
  { key: "Focus", value: "Security & systems engineering" },
  { key: "Location", value: "Ludwigsburg, Germany" },
  {
    key: "Writing",
    value: (
      <Link href="/learnings" className="transition-colors hover:text-rust">
        Learnings — long-form, occasionally ↗
      </Link>
    ),
  },
  {
    key: "Elsewhere",
    value: (
      <span className="flex flex-wrap gap-x-5 gap-y-1">
        <a href={SITE.githubUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-rust">
          github ↗
        </a>
        <a href={SITE.twitterUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-rust">
          twitter ↗
        </a>
        <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-rust">
          {SITE.email}
        </a>
        <a href={SITE.mainSiteUrl} className="transition-colors hover:text-rust">
          sarwagya.wtf ↗
        </a>
      </span>
    ),
  },
];

export default function Home() {
  const latest = getAllLearnings().slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <section className="pt-24 md:pt-36">
        <p className="label rise">Engineering · Sarwagya Singh</p>
        <h1
          className="rise rise-1 mt-6 font-serif leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "clamp(52px, 9vw, 128px)" }}
        >
          Engineering,
          <br />
          written down.
        </h1>
        <p
          className="rise rise-2 mt-8 max-w-xl font-serif italic text-ink/80"
          style={{ fontSize: "clamp(19px, 2vw, 26px)", lineHeight: 1.3 }}
        >
          Long-form learnings from building software that has to outlive the
          excitement that created it.
        </p>
      </section>

      <section className="rise rise-3 mt-20 md:mt-28" aria-label="Datasheet">
        <div className="hairline" />
        {DATASHEET.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-12 items-baseline gap-2 border-b border-ink/10 py-4 md:gap-8"
          >
            <span className="label col-span-12 md:col-span-3">{row.key}</span>
            <span className="col-span-12 font-mono text-[13px] text-graphite md:col-span-9">
              {row.value}
            </span>
          </div>
        ))}
      </section>

      <section className="mt-24 md:mt-36" aria-label="Latest learnings">
        <div className="flex items-baseline justify-between">
          <h2 className="label">Latest learnings</h2>
          <Link href="/learnings" className="label transition-colors hover:text-rust">
            All →
          </Link>
        </div>
        <div className="mt-6 flex flex-col">
          {latest.map((l) => (
            <Link
              key={l.slug}
              href={`/learnings/${l.slug}`}
              className="group grid grid-cols-12 gap-2 border-t border-ink/10 py-7 transition-colors first:border-t-0 md:gap-8"
            >
              <span className="col-span-12 font-mono text-[11px] text-stone md:col-span-3">
                {l.date} · {l.readingMinutes} min
              </span>
              <span className="col-span-12 md:col-span-9">
                <span
                  className="font-serif leading-[1.15] transition-colors group-hover:text-rust"
                  style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
                >
                  {l.title}
                </span>
                {l.summary ? (
                  <span
                    className="mt-3 block max-w-2xl font-body text-graphite"
                    style={{ fontSize: 16, lineHeight: 1.55 }}
                  >
                    {l.summary}
                  </span>
                ) : null}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
