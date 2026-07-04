import { SARWAGYA } from "@repo/seo/author";
import { absoluteUrl as resolve } from "@repo/seo/canonical";
import type { SiteIdentity } from "@repo/seo/types";

export const SITE: SiteIdentity & {
  email: string;
  twitterUrl: string;
  githubUrl: string;
  mainSiteUrl: string;
} = {
  url: "https://bakaiti.sarwagya.wtf",
  name: "Bakaiti",
  titleDefault: "Bakaiti — Opinions by Sarwagya Singh",
  titleTemplate: "%s — Bakaiti",
  description:
    "Strongly held, loosely researched opinions on technology, politics, family, India, and whatever else required a postmortem.",
  locale: "en_US",
  person: SARWAGYA,
  twitterHandle: "@0xsarwagya",
  feedPath: "/feed.xml",
  email: SARWAGYA.email,
  twitterUrl: "https://twitter.com/0xsarwagya",
  githubUrl: "https://github.com/0xsarwagya",
  mainSiteUrl: "https://sarwagya.wtf",
};

export function absoluteUrl(path: string): string {
  return resolve(SITE, path);
}
