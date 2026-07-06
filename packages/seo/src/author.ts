import type { PersonEntity } from "./types";

/**
 * The one person behind all of these sites. me.sarwagya.wtf is the canonical
 * identity hub; the other sites, profiles, and historical presences hang off
 * it via sameAs. Search engines and Mastodon-style verifiers use this list to
 * consolidate identity across the whole constellation.
 */
export const SARWAGYA: PersonEntity = {
  name: "Sarwagya Singh",
  alternateName: ["Sarwagya", "0xsarwagya"],
  url: "https://sarwagya.wtf",
  email: "hello@sarwagya.wtf",
  jobTitle: "Software Engineer",
  sameAs: [
    "https://www.wikidata.org/wiki/Q140451622",
    "https://me.sarwagya.wtf",
    "https://eng.sarwagya.wtf",
    "https://bakaiti.sarwagya.wtf",
    "https://oss.sarwagya.wtf",
    "https://local.sarwagya.wtf",
    "https://www.vestcodes.com",
    "https://github.com/0xsarwagya",
    "https://www.npmjs.com/~0xsarwagya",
    "https://news.ycombinator.com/user?id=0xsarwagya",
    "https://www.linkedin.com/in/0xsarwagya",
    "https://twitter.com/0xsarwagya",
    "https://instagram.com/0xsarwagya",
    "https://0xsarwagya.medium.com",
    "https://huggingface.co/0xsarwagya",
    "https://www.producthunt.com/@0xsarwagya",
    "https://www.researchgate.net/profile/Sarwagya-Singh",
    "https://www.imdb.com/name/nm16137305",
  ],
};
