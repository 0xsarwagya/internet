import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "../../components/json-ld";
import { getAllLearnings } from "../../lib/learnings";
import { SITE, absoluteUrl } from "../../lib/site";

const DESCRIPTION =
  "Long-form notes on things learned the slow way — security, systems, and the craft of software that has to be maintained.";

export const metadata: Metadata = {
  title: "Learnings",
  description: DESCRIPTION,
  alternates: { canonical: "/learnings" },
  openGraph: {
    title: "Learnings",
    description: DESCRIPTION,
    url: absoluteUrl("/learnings"),
    siteName: SITE.name,
    type: "website",
  },
};

export default function LearningsPage() {
  const learnings = getAllLearnings();
  const years = [...new Set(learnings.map((l) => l.year))];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Learnings",
    url: absoluteUrl("/learnings"),
    description: DESCRIPTION,
    author: { "@type": "Person", name: SITE.author, url: SITE.mainSiteUrl },
    inLanguage: "en",
  };

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <JsonLd data={blogJsonLd} />

      <section className="pt-24 md:pt-36">
        <div className="flex items-baseline justify-between">
          <p className="label rise">Learnings</p>
          <p className="label rise">
            {learnings.length.toString().padStart(3, "0")}
          </p>
        </div>
        <h1
          className="rise rise-1 mt-6 font-serif leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "clamp(52px, 9vw, 128px)" }}
        >
          Learnings.
        </h1>
        <p
          className="rise rise-2 mt-8 max-w-xl font-serif italic text-ink/80"
          style={{ fontSize: "clamp(19px, 2vw, 26px)", lineHeight: 1.3 }}
        >
          Notes on things learned the slow way. Written to be useful, kept to
          be honest.
        </p>
      </section>

      <section className="rise rise-3 mt-20 md:mt-28">
        {years.map((year) => (
          <div key={year} className="grid grid-cols-12 gap-2 border-t border-ink/10 py-10 md:gap-8">
            <span className="label col-span-12 md:col-span-3">{year}</span>
            <div className="col-span-12 flex flex-col gap-10 md:col-span-9">
              {learnings
                .filter((l) => l.year === year)
                .map((l) => (
                  <Link
                    key={l.slug}
                    href={`/learnings/${l.slug}`}
                    className="group flex flex-col"
                  >
                    <span className="font-mono text-[11px] text-stone">
                      {l.date} · {l.readingMinutes} min
                      {l.topics.length > 0 ? ` · ${l.topics.join(", ")}` : ""}
                    </span>
                    <span
                      className="mt-2 font-serif leading-[1.15] transition-colors group-hover:text-rust"
                      style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
                    >
                      {l.title}
                    </span>
                    {l.summary ? (
                      <span
                        className="mt-3 max-w-2xl font-body text-graphite"
                        style={{ fontSize: 16, lineHeight: 1.55 }}
                      >
                        {l.summary}
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
