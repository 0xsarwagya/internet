import type { Metadata } from "next";

import type { SiteIdentity } from "./types";

/** Resolve a site-relative path against the site origin. */
export function absoluteUrl(site: Pick<SiteIdentity, "url">, path: string): string {
  return new URL(path, site.url).toString();
}

/**
 * alternates for an indexable page: its canonical URL, plus feed discovery
 * when the site has one. Next.js replaces (not merges) `alternates`, so every
 * page-level canonical must re-state the feed link.
 */
export function canonicalAlternates(
  site: SiteIdentity,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    ...(site.feedPath
      ? {
          types: {
            "application/rss+xml": [{ url: site.feedPath, title: site.name }],
          },
        }
      : {}),
  };
}
