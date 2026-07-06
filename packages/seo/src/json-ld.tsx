import { absoluteUrl } from "./canonical";
import type { ArticleMeta, PersonEntity, SiteIdentity } from "./types";

type JsonLdData = Record<string, unknown>;

/**
 * Render a JSON-LD block. `<` is escaped so content can never terminate the
 * script element, whatever ends up in titles or descriptions.
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * The Person's canonical @id. Wikidata Q-items are the strongest identifier
 * search engines and knowledge graphs consolidate on, so if sameAs contains a
 * wikidata.org URL we use it; otherwise fall back to the person's own site.
 */
function personId(person: PersonEntity): string {
  const wikidata = person.sameAs.find((url) =>
    url.startsWith("https://www.wikidata.org/wiki/Q"),
  );
  return wikidata ?? `${person.url}/#person`;
}

function personRef(person: PersonEntity): JsonLdData {
  return {
    "@type": "Person",
    "@id": personId(person),
    name: person.name,
    url: person.url,
  };
}

/** Person node. The same @id on every site ties the three identities together. */
export function personJsonLd(
  person: PersonEntity,
  extras: JsonLdData = {},
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(person),
    name: person.name,
    alternateName: person.alternateName,
    url: person.url,
    email: person.email,
    jobTitle: person.jobTitle,
    sameAs: person.sameAs,
    ...extras,
  };
}

export function websiteJsonLd(site: SiteIdentity): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    author: personRef(site.person),
    inLanguage: "en",
  };
}

export function blogJsonLd(
  site: SiteIdentity,
  blog: { name: string; path: string; description: string },
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl(site, blog.path)}#blog`,
    name: blog.name,
    url: absoluteUrl(site, blog.path),
    description: blog.description,
    author: personRef(site.person),
    inLanguage: "en",
  };
}

export function articleJsonLd(
  site: SiteIdentity,
  article: ArticleMeta,
  options: {
    blog?: { name: string; path: string };
    /** ISO 8601 duration, e.g. "PT5M". */
    timeRequired?: string;
  } = {},
): JsonLdData {
  const url = absoluteUrl(site, article.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url,
    datePublished: article.datePublished,
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    ...(article.tags?.length ? { keywords: article.tags.join(", ") } : {}),
    ...(article.section ? { articleSection: article.section } : {}),
    ...(options.timeRequired ? { timeRequired: options.timeRequired } : {}),
    inLanguage: "en",
    author: personRef(site.person),
    ...(options.blog
      ? {
          isPartOf: {
            "@type": "Blog",
            "@id": `${absoluteUrl(site, options.blog.path)}#blog`,
            name: options.blog.name,
            url: absoluteUrl(site, options.blog.path),
          },
        }
      : {}),
    mainEntityOfPage: url,
  };
}

export function breadcrumbJsonLd(
  site: SiteIdentity,
  items: { name: string; path: string }[],
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(site, item.path),
    })),
  };
}
