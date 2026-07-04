import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@0xsarwagya/ui/json-ld";
import { ReadingProgress } from "@0xsarwagya/ui/reading-progress";
import { getAllTakes, getTakeBySlug } from "../../../lib/takes";
import { SITE, absoluteUrl } from "../../../lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllTakes().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getTakeBySlug(slug);
  if (!meta) return { title: "Not found" };
  const description = meta.summary || meta.excerpt;
  const url = absoluteUrl(`/takes/${meta.slug}`);
  return {
    title: meta.title,
    description,
    alternates: { canonical: `/takes/${meta.slug}` },
    openGraph: {
      title: meta.title,
      description,
      url,
      siteName: SITE.name,
      type: "article",
      publishedTime: meta.date,
      authors: [SITE.author],
      tags: meta.topics,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description,
    },
  };
}

export default async function TakePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const meta = getTakeBySlug(slug);
  if (!meta) notFound();

  const mod = (await import(`../../../content/takes/${slug}.mdx`)) as {
    default: React.ComponentType;
  };
  const Content = mod.default;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary || meta.excerpt,
    url: absoluteUrl(`/takes/${meta.slug}`),
    datePublished: meta.date,
    keywords: meta.topics.join(", "),
    timeRequired: `PT${meta.readingMinutes}M`,
    inLanguage: "en",
    author: { "@type": "Person", name: SITE.author, url: SITE.mainSiteUrl },
    isPartOf: {
      "@type": "Blog",
      name: "Takes",
      url: absoluteUrl("/takes"),
    },
    mainEntityOfPage: absoluteUrl(`/takes/${meta.slug}`),
  };

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <JsonLd data={articleJsonLd} />
      <ReadingProgress />

      <article className="mx-auto max-w-[680px] pt-20 md:pt-28">
        <header>
          <Link
            href="/takes"
            className="label transition-colors hover:text-rust"
          >
            ← Takes
          </Link>
          <h1
            className="mt-8 font-serif leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(36px, 4.6vw, 60px)" }}
          >
            {meta.title}
          </h1>
          <p className="mt-6 font-mono text-[11px] text-stone">
            {meta.date} · {meta.readingMinutes} min of your life
            {meta.topics.length > 0 ? ` · ${meta.topics.join(", ")}` : ""}
          </p>
          <div className="hairline mt-8" />
        </header>

        <div className="mt-12 flex flex-col gap-6">
          <Content />
        </div>

        <footer className="mt-20">
          <div className="hairline mb-6" />
          <div className="flex items-baseline justify-between">
            <span className="label">Still here? Bold choice.</span>
            <Link
              href="/takes"
              className="label transition-colors hover:text-rust"
            >
              ← All takes
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
