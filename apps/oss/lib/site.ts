import { SARWAGYA } from "@repo/seo/author";
import { absoluteUrl as resolve } from "@repo/seo/canonical";
import type { SiteIdentity } from "@repo/seo/types";

export const SITE: SiteIdentity = {
  url: "https://oss.sarwagya.wtf",
  name: "Sarwagya · OSS",
  titleDefault: "Sarwagya Singh — Open Source",
  titleTemplate: "%s — Sarwagya Singh",
  description:
    "Open-source software by Sarwagya Singh — problems I solved for myself. Apparently a few other people had them too.",
  locale: "en_US",
  person: SARWAGYA,
  twitterHandle: "@0xsarwagya",
};

export function absoluteUrl(path: string): string {
  return resolve(SITE, path);
}
