import { SARWAGYA } from "@repo/seo/author";
import { absoluteUrl as resolve } from "@repo/seo/canonical";
import type { SiteIdentity } from "@repo/seo/types";

export const SITE: SiteIdentity = {
  url: "https://sarwagya.wtf",
  name: "Sarwagya",
  titleDefault: "Sarwagya Singh — Engineer, Writer & Builder",
  titleTemplate: "%s — Sarwagya Singh",
  description:
    "Sarwagya Singh is a software engineer and writer from Bihar, living in Germany. He builds software, writes about engineering, and keeps notes in the margins.",
  locale: "en_US",
  person: SARWAGYA,
  twitterHandle: "@0xsarwagya",
};

export function absoluteUrl(path: string): string {
  return resolve(SITE, path);
}
