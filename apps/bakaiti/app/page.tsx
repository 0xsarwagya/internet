import type { Metadata } from "next";

import { canonicalAlternates } from "@repo/seo/canonical";
import Link from "next/link";

import { getAllTakes } from "../lib/takes";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  alternates: canonicalAlternates(SITE, "/"),
};

const HOUSE_RULES = [
  "Everything here is strongly held and loosely researched.",
  "Corrections will be considered, then ignored.",
  "If a take ages badly, it becomes satire retroactively.",
  "No newsletter. You will simply have to remember this site exists.",
];

export default function Home() {
  const latest = getAllTakes().slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <section className="pt-24 md:pt-36">
        <p className="label rise">Opinions · Unsolicited</p>
        <h1
          className="rise rise-1 mt-6 font-serif leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "clamp(56px, 11vw, 160px)" }}
        >
          Bakaiti.
        </h1>
        <p
          className="rise rise-2 mt-8 max-w-xl font-serif italic text-ink/80"
          style={{ fontSize: "clamp(19px, 2vw, 26px)", lineHeight: 1.3 }}
        >
          I have opinions. This was{" "}
          <span className="redline">a good idea</span> apparently cheaper than
          therapy.
        </p>
      </section>

      <section className="rise rise-3 mt-20 md:mt-28" aria-label="House rules">
        <div className="hairline" />
        {HOUSE_RULES.map((rule, i) => (
          <div
            key={rule}
            className="grid grid-cols-12 items-baseline gap-2 border-b border-ink/10 py-4 md:gap-8"
          >
            <span className="label col-span-12 md:col-span-3">
              House rule {String(i + 1).padStart(2, "0")}
            </span>
            <span className="col-span-12 font-mono text-[13px] text-graphite md:col-span-9">
              {rule}
            </span>
          </div>
        ))}
      </section>

      <section className="mt-24 md:mt-36" aria-label="Latest takes">
        <div className="flex items-baseline justify-between">
          <h2 className="label">Latest takes</h2>
          <Link href="/takes" className="label transition-colors hover:text-rust">
            All →
          </Link>
        </div>
        <div className="mt-6 flex flex-col">
          {latest.map((t) => (
            <Link
              key={t.slug}
              href={`/takes/${t.slug}`}
              className="group grid grid-cols-12 gap-2 border-t border-ink/10 py-7 transition-colors first:border-t-0 md:gap-8"
            >
              <span className="col-span-12 font-mono text-[11px] text-stone md:col-span-3">
                {t.date} · {t.readingMinutes} min of your life
              </span>
              <span className="col-span-12 md:col-span-9">
                <span
                  className="font-serif leading-[1.15] transition-colors group-hover:text-rust"
                  style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
                >
                  {t.title}
                </span>
                {t.summary ? (
                  <span
                    className="mt-3 block max-w-2xl font-body text-graphite"
                    style={{ fontSize: 16, lineHeight: 1.55 }}
                  >
                    {t.summary}
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
