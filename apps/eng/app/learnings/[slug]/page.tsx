import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@0xsarwagya/ui/json-ld";
import { ReadingProgress } from "@0xsarwagya/ui/reading-progress";
import { getAllLearnings, getLearningBySlug } from "../../../lib/learnings";
import { SITE, absoluteUrl } from "../../../lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllLearnings().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getLearningBySlug(slug);
  if (!meta) return { title: "Not found" };
  const url = absoluteUrl(`/learnings/${meta.slug}`);
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/learnings/${meta.slug}` },
    openGraph: {
      title: meta.title,
      description: meta.summary,
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
      description: meta.summary,
    },
  };
}

export default async function LearningPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const meta = getLearningBySlug(slug);
  if (!meta) notFound();

  const mod = (await import(`../../../content/learnings/${slug}.mdx`)) as {
    default: React.ComponentType;
  };
  const Content = mod.default;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    url: absoluteUrl(`/learnings/${meta.slug}`),
    datePublished: meta.date,
    keywords: meta.topics.join(", "),
    timeRequired: `PT${meta.readingMinutes}M`,
    inLanguage: "en",
    author: { "@type": "Person", name: SITE.author, url: SITE.mainSiteUrl },
    isPartOf: {
      "@type": "Blog",
      name: "Learnings",
      url: absoluteUrl("/learnings"),
    },
    mainEntityOfPage: absoluteUrl(`/learnings/${meta.slug}`),
  };

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <JsonLd data={articleJsonLd} />
      <ReadingProgress />

      <article className="mx-auto max-w-[680px] pt-20 md:pt-28">
        <header>
          <Link
            href="/learnings"
            className="label transition-colors hover:text-rust"
          >
            ← Learnings
          </Link>
          <h1
            className="mt-8 font-serif leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(36px, 4.6vw, 60px)" }}
          >
            {meta.title}
          </h1>
          <p className="mt-6 font-mono text-[11px] text-stone">
            {meta.date} · {meta.readingMinutes} min read
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
            <span className="font-mono text-[11px] text-stone">
              {meta.date}
            </span>
            <Link
              href="/learnings"
              className="label transition-colors hover:text-rust"
            >
              ← All learnings
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
