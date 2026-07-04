export type MarginCategory =
  | "philosophy"
  | "tech"
  | "engineering"
  | "security"
  | "myth"
  | "books";

export const CATEGORY_LABELS: Record<MarginCategory, string> = {
  philosophy: "Philosophy",
  tech: "Tech",
  engineering: "Engineering",
  security: "Security",
  myth: "Myth",
  books: "Books",
};

export const CATEGORY_ORDER: readonly MarginCategory[] = [
  "philosophy",
  "engineering",
  "tech",
  "security",
  "myth",
  "books",
];
