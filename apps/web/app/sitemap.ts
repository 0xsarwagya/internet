import type { MetadataRoute } from "next";

import { getAllNotes } from "../lib/margins";
import { SITE, absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes();
  const latest = notes[0] ? new Date(notes[0].date) : new Date();

  return [
    {
      url: SITE.url,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/margins"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/map"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...notes.map((note) => ({
      url: absoluteUrl(`/margins/${note.slug}`),
      lastModified: new Date(note.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: absoluteUrl("/llms.txt"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];
}
