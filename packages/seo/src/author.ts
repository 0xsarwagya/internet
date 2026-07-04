import type { PersonEntity } from "./types";

/**
 * The one person behind all of these sites. sarwagya.wtf is the canonical
 * identity root; the other sites and profiles hang off it via sameAs.
 */
export const SARWAGYA: PersonEntity = {
  name: "Sarwagya Singh",
  alternateName: ["Sarwagya", "0xsarwagya"],
  url: "https://sarwagya.wtf",
  email: "hello@sarwagya.wtf",
  jobTitle: "Software Engineer",
  sameAs: [
    "https://eng.sarwagya.wtf",
    "https://bakaiti.sarwagya.wtf",
    "https://github.com/0xsarwagya",
    "https://twitter.com/0xsarwagya",
  ],
};
