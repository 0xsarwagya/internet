import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd, blogJsonLd } from "@repo/seo/json-ld";
import { createPageMetadata } from "@repo/seo/metadata";
import { getAllTakes } from "../../lib/takes";
import { SITE } from "../../lib/site";

const DESCRIPTION =
  "Long-form opinions, delivered with the confidence of someone who has been wrong before and will be again.";

export const metadata: Metadata = createPageMetadata(SITE, {
  title: "Takes",
  description: DESCRIPTION,
  path: "/takes",
});

const blogLd = blogJsonLd(SITE, {
  name: "Takes",
  path: "/takes",
  description: DESCRIPTION,
});

export default function TakesPage() {
  const takes = getAllTakes();
  const years = [...new Set(takes.map((t) => t.year))];


  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <JsonLd data={blogLd} />

      <section className="pt-24 md:pt-36">
        <div className="flex items-baseline justify-between">
          <p className="label rise">Takes</p>
          <p className="label rise">
            {takes.length.toString().padStart(3, "0")} and counting
          </p>
        </div>
        <h1
          className="rise rise-1 mt-6 font-serif leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "clamp(52px, 9vw, 128px)" }}
        >
          Takes.
        </h1>
        <p
          className="rise rise-2 mt-8 max-w-xl font-serif italic text-ink/80"
          style={{ fontSize: "clamp(19px, 2vw, 26px)", lineHeight: 1.3 }}
        >
          {DESCRIPTION}
        </p>
      </section>

      <section className="rise rise-3 mt-20 md:mt-28">
        {years.map((year) => (
          <div
            key={year}
            className="grid grid-cols-12 gap-2 border-t border-ink/10 py-10 md:gap-8"
          >
            <span className="label col-span-12 md:col-span-3">{year}</span>
            <div className="col-span-12 flex flex-col gap-10 md:col-span-9">
              {takes
                .filter((t) => t.year === year)
                .map((t) => (
                  <Link
                    key={t.slug}
                    href={`/takes/${t.slug}`}
                    className="group flex flex-col"
                  >
                    <span className="font-mono text-[11px] text-stone">
                      {t.date} · {t.readingMinutes} min of your life
                      {t.topics.length > 0 ? ` · ${t.topics.join(", ")}` : ""}
                    </span>
                    <span
                      className="mt-2 font-serif leading-[1.15] transition-colors group-hover:text-rust"
                      style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
                    >
                      {t.title}
                    </span>
                    {t.summary ? (
                      <span
                        className="mt-3 max-w-2xl font-body text-graphite"
                        style={{ fontSize: 16, lineHeight: 1.55 }}
                      >
                        {t.summary}
                      </span>
                    ) : null}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
