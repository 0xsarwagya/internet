import { SARWAGYA } from "@repo/seo/author";
import { absoluteUrl as resolve } from "@repo/seo/canonical";
import type { SiteIdentity } from "@repo/seo/types";

export const SITE: SiteIdentity = {
  url: "https://me.sarwagya.wtf",
  name: "Sarwagya · Me",
  titleDefault: "Sarwagya Singh — one page of doorways",
  titleTemplate: "%s — Sarwagya Singh",
  description:
    "One page of doorways into everything Sarwagya Singh writes, ships, and posts.",
  locale: "en_US",
  person: SARWAGYA,
  twitterHandle: "@0xsarwagya",
};

export function absoluteUrl(path: string): string {
  return resolve(SITE, path);
}
