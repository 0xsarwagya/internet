import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type ContentEntry = {
  slug: string;
  title: string;
  date: string;
  /** Set only when the frontmatter records an update. */
  updated?: string;
  year: string;
  category: string;
  summary: string;
  excerpt: string;
  topics: string[];
  readingMinutes: number;
  filepath: string;
};

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

function toExcerpt(markdown: string): string {
  const firstParagraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block.length > 0 && !block.startsWith("#"));
  if (!firstParagraph) return "";
  const plain = firstParagraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= 160) return plain;
  return `${plain.slice(0, 157).replace(/\s+\S*$/, "")}…`;
}

function readingMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Frontmatter dates must be real: fail the build rather than fall back. */
function parseIsoDate(value: unknown, filepath: string, field: string): string {
  const iso =
    value instanceof Date
      ? value.toISOString().slice(0, 10)
      : typeof value === "string"
        ? value.trim()
        : null;
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso) || Number.isNaN(Date.parse(iso))) {
    throw new Error(
      `Invalid or missing "${field}" frontmatter in ${filepath} — expected YYYY-MM-DD, got ${JSON.stringify(value)}`,
    );
  }
  return iso;
}

export type ContentSource = {
  all(): ContentEntry[];
  bySlug(slug: string): ContentEntry | undefined;
};

export function createContentSource(relativeDir: string): ContentSource {
  const root = path.join(process.cwd(), relativeDir);
  let cache: ContentEntry[] | null = null;

  const all = (): ContentEntry[] => {
    if (cache) return cache;
    const entries: ContentEntry[] = walk(root).map((filepath) => {
      const raw = readFileSync(filepath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data as {
        title?: unknown;
        date?: unknown;
        updated?: unknown;
        category?: unknown;
        summary?: unknown;
        topics?: unknown;
      };
      const slug = path.basename(filepath, ".mdx");
      const date = parseIsoDate(data.date, filepath, "date");
      const updated =
        data.updated == null
          ? undefined
          : parseIsoDate(data.updated, filepath, "updated");
      return {
        slug,
        title: String(data.title ?? slug),
        date,
        ...(updated ? { updated } : {}),
        year: date.slice(0, 4),
        category: String(data.category ?? ""),
        summary: String(data.summary ?? ""),
        excerpt: toExcerpt(parsed.content),
        topics: Array.isArray(data.topics) ? data.topics.map(String) : [],
        readingMinutes: readingMinutes(parsed.content),
        filepath,
      };
    });
    entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    cache = entries;
    return entries;
  };

  return {
    all,
    bySlug: (slug) => all().find((e) => e.slug === slug),
  };
}
