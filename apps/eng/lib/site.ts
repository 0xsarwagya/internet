import { createSite } from "@0xsarwagya/ui/site";

export const SITE = createSite({
  url: "https://eng.sarwagya.wtf",
  name: "Sarwagya · Eng",
  title: "Sarwagya Singh — Engineering, written down",
  description:
    "Long-form engineering learnings from Sarwagya Singh — security, systems, and software built to be maintained. The technical counterpart to sarwagya.wtf.",
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
