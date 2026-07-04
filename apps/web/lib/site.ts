export const SITE = {
  url: "https://sarwagya.wtf",
  name: "Sarwagya",
  title: "Sarwagya — Software, Writing, Systems",
  description:
    "Sarwagya's personal site. Essays and half-thoughts on software engineering, security, philosophy, myth, and books — building things that outlive the excitement that created them.",
  author: "Sarwagya Singh",
  email: "hello@sarwagya.wtf",
  twitterHandle: "@0xsarwagya",
  twitterUrl: "https://twitter.com/0xsarwagya",
  githubUrl: "https://github.com/0xsarwagya",
  locale: "en_US",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
