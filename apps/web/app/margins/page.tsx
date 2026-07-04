import type { Metadata } from "next";

import { JsonLd, blogJsonLd } from "@repo/seo/json-ld";
import { createPageMetadata } from "@repo/seo/metadata";
import { MarginsList } from "../../components/margins/margins-list";
import { getAllNotes } from "../../lib/margins";
import { SITE } from "../../lib/site";

const DESCRIPTION =
  "Half-thoughts, undated in feel, kept as they were written. Philosophy, engineering, myth, books.";

export const metadata: Metadata = createPageMetadata(SITE, {
  title: "Margins",
  description: DESCRIPTION,
  path: "/margins",
});

const blogLd = blogJsonLd(SITE, {
  name: "Margins",
  path: "/margins",
  description: DESCRIPTION,
});

export default function MarginsPage() {
  const notes = getAllNotes().map((n) => ({
    slug: n.slug,
    title: n.title,
    year: n.year,
    category: n.category,
  }));

  return (
    <main className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-40 pt-40 md:px-12 md:pt-56">
      <JsonLd data={blogLd} />
      <header className="mb-16 flex items-baseline justify-between">
        <span className="label">Margins</span>
        <span className="label">{notes.length.toString().padStart(3, "0")}</span>
      </header>

      <h1
        className="font-serif leading-[0.94] tracking-[-0.02em]"
        style={{ fontSize: "clamp(72px, 14vw, 200px)" }}
      >
        Margins.
      </h1>

      <p
        className="mt-12 max-w-2xl font-serif italic text-ink/75"
        style={{ fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.3 }}
      >
        Notes kept in the margins of longer things. Some finished. Most half.
      </p>

      <div className="hairline mt-24 mb-16" />

      <MarginsList notes={notes} />
    </main>
  );
}
