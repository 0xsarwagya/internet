import type { Metadata } from "next";

import { absoluteUrl, canonicalAlternates } from "./canonical";
import type { ArticleMeta, SiteIdentity } from "./types";

/**
 * Root-layout metadata for a site. Sets identity-wide defaults; pages add
 * their own canonical (and page-specific fields) on top.
 */
export function createSiteMetadata(
  site: SiteIdentity,
  options: { keywords?: string[] } = {},
): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.titleDefault,
      template: site.titleTemplate,
    },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.person.name, url: site.person.url }],
    creator: site.person.name,
    publisher: site.person.name,
    ...(options.keywords ? { keywords: options.keywords } : {}),
    openGraph: {
      title: site.titleDefault,
      description: site.description,
      url: site.url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitterHandle,
      creator: site.twitterHandle,
      title: site.titleDefault,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(site.feedPath
      ? {
          alternates: {
            types: {
              "application/rss+xml": [{ url: site.feedPath, title: site.name }],
            },
          },
        }
      : {}),
  };
}

/** Metadata for a non-article indexable page (an index, a home page, a map). */
export function createPageMetadata(
  site: SiteIdentity,
  page: { title?: string; description?: string; path: string },
): Metadata {
  const description = page.description ?? site.description;
  return {
    ...(page.title ? { title: page.title } : {}),
    description,
    alternates: canonicalAlternates(site, page.path),
    openGraph: {
      title: page.title ?? site.titleDefault,
      description,
      url: absoluteUrl(site, page.path),
      siteName: site.name,
      type: "website",
    },
  };
}

/** Metadata for an article page, generated from its frontmatter-derived meta. */
export function createArticleMetadata(
  site: SiteIdentity,
  article: ArticleMeta,
): Metadata {
  return {
    title: article.title,
    description: article.description,
    ...(article.tags?.length ? { keywords: article.tags } : {}),
    alternates: canonicalAlternates(site, article.path),
    openGraph: {
      title: article.title,
      description: article.description,
      url: absoluteUrl(site, article.path),
      siteName: site.name,
      type: "article",
      publishedTime: article.datePublished,
      ...(article.dateModified ? { modifiedTime: article.dateModified } : {}),
      authors: [site.person.name],
      ...(article.section ? { section: article.section } : {}),
      ...(article.tags?.length ? { tags: article.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}
