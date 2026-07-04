import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CATEGORY_LABELS,
  getAllNotes,
  getNoteMetaBySlug,
} from "../../../lib/margins";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getNoteMetaBySlug(slug);
  if (!meta) return { title: "Not found" };
  return {
    title: meta.title,
    description: `${CATEGORY_LABELS[meta.category]} · Margins`,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const meta = getNoteMetaBySlug(slug);
  if (!meta) notFound();

  const year = meta.year;
  const mod = (await import(
    `../../../content/margins/${year}/${slug}.mdx`
  )) as { default: React.ComponentType };
  const Content = mod.default;

  return (
    <main className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-40 pt-40 md:px-12 md:pt-56">
      <header className="mb-16 flex items-baseline justify-between">
        <Link href="/margins" className="label hover:text-rust transition-colors">
          &larr; Margins
        </Link>
        <span className="label">{CATEGORY_LABELS[meta.category]}</span>
      </header>

      <article className="mx-auto max-w-2xl">
        <h1
          className="font-serif leading-[1.05] tracking-[-0.01em]"
          style={{ fontSize: "clamp(40px, 5.4vw, 76px)" }}
        >
          {meta.title}
        </h1>

        <div className="mt-16 flex flex-col gap-6">
          <Content />
        </div>

        <div className="hairline mt-24 mb-6" />
        <div className="flex items-baseline justify-between">
          <span className="label">
            {CATEGORY_LABELS[meta.category]} &middot; {meta.year}
          </span>
          <Link href="/margins" className="label hover:text-rust transition-colors">
            &larr; Margins
          </Link>
        </div>
      </article>
    </main>
  );
}
