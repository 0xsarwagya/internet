import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
} from "@repo/seo/json-ld";
import { createArticleMetadata } from "@repo/seo/metadata";
import type { ArticleMeta } from "@repo/seo/types";
import { ReadingProgress } from "@0xsarwagya/ui/reading-progress";
import {
  getAllLearnings,
  getLearningBySlug,
  type LearningMeta,
} from "../../../lib/learnings";
import { SITE } from "../../../lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllLearnings().map((l) => ({ slug: l.slug }));
}

function toArticleMeta(meta: LearningMeta): ArticleMeta {
  return {
    title: meta.title,
    description: meta.summary || meta.excerpt,
    path: `/learnings/${meta.slug}`,
    datePublished: meta.date,
    ...(meta.updated ? { dateModified: meta.updated } : {}),
    tags: meta.topics,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getLearningBySlug(slug);
  if (!meta) return { title: "Not found" };
  return createArticleMetadata(SITE, toArticleMeta(meta));
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

  const article = toArticleMeta(meta);
  const articleLd = articleJsonLd(SITE, article, {
    blog: { name: "Learnings", path: "/learnings" },
    timeRequired: `PT${meta.readingMinutes}M`,
  });
  const breadcrumbLd = breadcrumbJsonLd(SITE, [
    { name: "Eng", path: "/" },
    { name: "Learnings", path: "/learnings" },
    { name: meta.title, path: article.path },
  ]);

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      <ReadingProgress />

      <article className="mx-auto max-w-[680px] pt-20 md:pt-28">
        <header>
          <Link
            href="/learnings"
            className="label transition-colors hover:text-rust"
          >
            ← Learnings
          </Link>
          <p className="mt-8 font-mono text-[11px] text-stone">
            By{" "}
            <a
              href="https://me.sarwagya.wtf"
              target="_blank"
              rel="author me noreferrer"
              className="text-ink transition-colors hover:text-rust"
            >
              Sarwagya Singh
            </a>
          </p>
          <h1
            className="mt-3 font-serif leading-[1.05] tracking-[-0.01em]"
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
