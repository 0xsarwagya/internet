import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { MarginCategory } from "./margins-shared";

export type { MarginCategory } from "./margins-shared";
export { CATEGORY_LABELS, CATEGORY_ORDER } from "./margins-shared";

export type MarginMeta = {
  slug: string;
  title: string;
  date: string;
  year: string;
  category: MarginCategory;
  filepath: string;
};

const ROOT = path.join(process.cwd(), "content", "margins");

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
}

let cache: MarginMeta[] | null = null;

export function getAllNotes(): MarginMeta[] {
  if (cache) return cache;
  const files = walk(ROOT);
  const notes: MarginMeta[] = files.map((filepath) => {
    const raw = readFileSync(filepath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data as {
      title?: unknown;
      date?: unknown;
      category?: unknown;
    };
    const slug = path.basename(filepath, ".mdx");
    const title = String(data.title ?? slug);
    const date =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? "1970-01-01");
    const category = String(data.category ?? "philosophy") as MarginCategory;
    return {
      slug,
      title,
      date,
      year: date.slice(0, 4),
      category,
      filepath,
    };
  });
  notes.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  cache = notes;
  return notes;
}

export function getNoteMetaBySlug(slug: string): MarginMeta | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}
