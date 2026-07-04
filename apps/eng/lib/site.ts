import { SARWAGYA } from "@repo/seo/author";
import { absoluteUrl as resolve } from "@repo/seo/canonical";
import type { SiteIdentity } from "@repo/seo/types";

export const SITE: SiteIdentity & {
  email: string;
  twitterUrl: string;
  githubUrl: string;
  mainSiteUrl: string;
} = {
  url: "https://eng.sarwagya.wtf",
  name: "Sarwagya · Eng",
  titleDefault: "Sarwagya Singh — Engineering, written down",
  titleTemplate: "%s — Sarwagya Singh",
  description:
    "Long-form writing on security, systems engineering, software architecture, and building software that lasts.",
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
