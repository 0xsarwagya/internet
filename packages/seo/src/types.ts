/** A person entity shared across sites. Rendered into Person JSON-LD and metadata author fields. */
export type PersonEntity = {
  name: string;
  alternateName: string[];
  /** Canonical identity URL for the person (their root site). */
  url: string;
  email: string;
  jobTitle: string;
  /** Other profiles and sites belonging to the same person. */
  sameAs: string[];
};

/**
 * The SEO identity of one site. Each app owns its own instance —
 * this package only defines the shape and consumes it.
 */
export type SiteIdentity = {
  /** Origin with no trailing slash, e.g. "https://eng.sarwagya.wtf". */
  url: string;
  /** Publication name, used as og:site_name. */
  name: string;
  titleDefault: string;
  /** Next.js title template, e.g. "%s — Sarwagya Singh". */
  titleTemplate: string;
  description: string;
  locale: string;
  person: PersonEntity;
  twitterHandle: string;
  /** Path of the site's RSS feed (e.g. "/feed.xml"), if it has one. */
  feedPath?: string;
};

export type ArticleMeta = {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/learnings/some-slug". */
  path: string;
  /** ISO date (YYYY-MM-DD). */
  datePublished: string;
  /** ISO date; only emitted when the content records an update. */
  dateModified?: string;
  tags?: string[];
  section?: string;
};
