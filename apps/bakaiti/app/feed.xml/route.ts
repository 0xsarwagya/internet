import { buildRssFeed } from "@repo/seo/feed";

import { getAllTakes } from "../../lib/takes";
import { SITE } from "../../lib/site";

export const dynamic = "force-static";

export function GET() {
  const xml = buildRssFeed(SITE, {
    title: SITE.titleDefault,
    description: SITE.description,
    items: getAllTakes().map((t) => ({
      title: t.title,
      path: `/takes/${t.slug}`,
      date: t.date,
      description: t.summary || t.excerpt,
      categories: t.topics,
    })),
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
