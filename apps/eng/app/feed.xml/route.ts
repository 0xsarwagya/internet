import { buildRssFeed } from "@repo/seo/feed";

import { getAllLearnings } from "../../lib/learnings";
import { SITE } from "../../lib/site";

export const dynamic = "force-static";

export function GET() {
  const xml = buildRssFeed(SITE, {
    title: SITE.titleDefault,
    description: SITE.description,
    items: getAllLearnings().map((l) => ({
      title: l.title,
      path: `/learnings/${l.slug}`,
      date: l.date,
      description: l.summary || l.excerpt,
      categories: l.topics,
    })),
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
