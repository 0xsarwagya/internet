import { SARWAGYA } from "@repo/seo/author";
import { absoluteUrl as resolve } from "@repo/seo/canonical";
import type { SiteIdentity } from "@repo/seo/types";

export const SITE: SiteIdentity = {
  url: "https://oss.sarwagya.wtf",
  name: "Sarwagya · OSS",
  titleDefault: "Sarwagya Singh — Open Source",
  titleTemplate: "%s — Sarwagya Singh",
  description:
    "Open-source software by Sarwagya Singh — small libraries built slowly, documented properly, and maintained past the excitement that created them.",
  locale: "en_US",
  person: SARWAGYA,
  twitterHandle: "@0xsarwagya",
};

export function absoluteUrl(path: string): string {
  return resolve(SITE, path);
}
