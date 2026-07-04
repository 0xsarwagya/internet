import { createContentSource } from "@0xsarwagya/ui/content";

import type { MarginCategory } from "./margins-shared";

export type { MarginCategory } from "./margins-shared";
export { CATEGORY_LABELS, CATEGORY_ORDER } from "./margins-shared";

export type MarginMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  year: string;
  category: MarginCategory;
  excerpt: string;
  filepath: string;
};

const source = createContentSource("content/margins");

let cache: MarginMeta[] | null = null;

export function getAllNotes(): MarginMeta[] {
  if (cache) return cache;
  cache = source.all().map((e) => ({
    slug: e.slug,
    title: e.title,
    date: e.date,
    ...(e.updated ? { updated: e.updated } : {}),
    year: e.year,
    category: (e.category || "philosophy") as MarginCategory,
    excerpt: e.excerpt,
    filepath: e.filepath,
  }));
  return cache;
}

export function getNoteMetaBySlug(slug: string): MarginMeta | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}
