import { absoluteUrl } from "./canonical";
import type { SiteIdentity } from "./types";

export type FeedItem = {
  title: string;
  /** Site-relative path. */
  path: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  description: string;
  categories?: string[];
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Build an RSS 2.0 document for a site's articles. */
export function buildRssFeed(
  site: SiteIdentity,
  options: { title: string; description: string; items: FeedItem[] },
): string {
  const items = options.items
    .map((item) => {
      const url = absoluteUrl(site, item.path);
      const categories = (item.categories ?? [])
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join("\n");
      return [
        "    <item>",
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${new Date(item.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(item.description)}</description>`,
        `      <author>${escapeXml(`${site.person.email} (${site.person.name})`)}</author>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const lastBuildDate = options.items[0]
    ? new Date(options.items[0].date).toUTCString()
    : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(options.title)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(options.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(absoluteUrl(site, site.feedPath ?? "/feed.xml"))}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
