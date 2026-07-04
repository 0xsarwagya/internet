import type { MetadataRoute } from "next";

import { docHref, getDocs, getProjects } from "../lib/projects";
import { SITE, absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projects = getProjects();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects.flatMap((project) => [
      {
        url: absoluteUrl(`/${project.slug}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      ...getDocs(project.slug).map((doc) => ({
        url: absoluteUrl(docHref(project.slug, doc)),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: doc.segments.length === 0 ? 0.8 : 0.7,
      })),
    ]),
  ];
}
