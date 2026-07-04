import type { MetadataRoute } from "next";

import { getAllLearnings } from "../lib/learnings";
import { SITE, absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const learnings = getAllLearnings();
  const latest = learnings[0] ? new Date(learnings[0].date) : new Date();

  return [
    {
      url: SITE.url,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/learnings"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...learnings.map((l) => ({
      url: absoluteUrl(`/learnings/${l.slug}`),
      lastModified: new Date(l.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
