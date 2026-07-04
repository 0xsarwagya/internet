import { createSite } from "@0xsarwagya/ui/site";

export const SITE = createSite({
  url: "https://bakaiti.sarwagya.wtf",
  name: "Sarwagya · Bakaiti",
  title: "Bakaiti — I have opinions",
  description:
    "Long-form opinions from Sarwagya Singh, held strongly and researched loosely. This was apparently cheaper than therapy.",
  author: "Sarwagya Singh",
  email: "hello@sarwagya.wtf",
  twitterHandle: "@0xsarwagya",
  twitterUrl: "https://twitter.com/0xsarwagya",
  githubUrl: "https://github.com/0xsarwagya",
  mainSiteUrl: "https://sarwagya.wtf",
  locale: "en_US",
});

export function absoluteUrl(path: string): string {
  return SITE.absoluteUrl(path);
}
