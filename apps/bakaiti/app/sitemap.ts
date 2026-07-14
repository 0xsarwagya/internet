import type { MetadataRoute } from "next";

import { getAllTakes } from "../lib/takes";
import { SITE, absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const takes = getAllTakes();
  const latest = takes[0] ? new Date(takes[0].date) : new Date();

  return [
    {
      url: SITE.url,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/takes"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...takes.map((t) => ({
      url: absoluteUrl(`/takes/${t.slug}`),
      lastModified: new Date(t.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/llms.txt"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];
}
