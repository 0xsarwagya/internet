import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type LearningMeta = {
  slug: string;
  title: string;
  date: string;
  year: string;
  summary: string;
  topics: string[];
  readingMinutes: number;
  filepath: string;
};

const ROOT = path.join(process.cwd(), "content", "learnings");

function readingMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

let cache: LearningMeta[] | null = null;

export function getAllLearnings(): LearningMeta[] {
  if (cache) return cache;
  const files = readdirSync(ROOT).filter((f) => f.endsWith(".mdx"));
  const learnings: LearningMeta[] = files.map((file) => {
    const filepath = path.join(ROOT, file);
    const raw = readFileSync(filepath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data as {
      title?: unknown;
      date?: unknown;
      summary?: unknown;
      topics?: unknown;
    };
    const slug = path.basename(file, ".mdx");
    const date =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? "1970-01-01");
    return {
      slug,
      title: String(data.title ?? slug),
      date,
      year: date.slice(0, 4),
      summary: String(data.summary ?? ""),
      topics: Array.isArray(data.topics) ? data.topics.map(String) : [],
      readingMinutes: readingMinutes(parsed.content),
      filepath,
    };
  });
  learnings.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  cache = learnings;
  return learnings;
}

export function getLearningBySlug(slug: string): LearningMeta | undefined {
  return getAllLearnings().find((l) => l.slug === slug);
}
