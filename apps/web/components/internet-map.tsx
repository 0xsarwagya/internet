"use client";

import dynamic from "next/dynamic";

import type { OssProjectSummary } from "./internet-map-scene";

const InternetMapScene = dynamic(
  () => import("./internet-map-scene").then((m) => m.InternetMapScene),
  {
    ssr: false,
    loading: () => (
      <div>
        <p className="label min-h-[2.5em] max-w-xl">Composing the map…</p>
        <div className="mt-6 aspect-[16/10] w-full animate-pulse rounded-sm bg-ink/[0.03]" />
      </div>
    ),
  },
);

export function InternetMap({
  projects,
}: {
  projects: OssProjectSummary[];
}) {
  return (
    <div>
      <InternetMapScene projects={projects} />
      <MapDirectory projects={projects} />
    </div>
  );
}

function MapDirectory({ projects }: { projects: OssProjectSummary[] }) {
  const routes: { title: string; sub: string; href: string }[] = [
    { title: "sarwagya.wtf", sub: "the person", href: "https://sarwagya.wtf" },
    { title: "/margins", sub: "what stays", href: "https://sarwagya.wtf/margins" },
    { title: "eng.sarwagya.wtf", sub: "the engineer", href: "https://eng.sarwagya.wtf" },
    { title: "/learnings", sub: "what stuck", href: "https://eng.sarwagya.wtf/learnings" },
    { title: "bakaiti.sarwagya.wtf", sub: "the opinions", href: "https://bakaiti.sarwagya.wtf" },
    { title: "/takes", sub: "what slipped out", href: "https://bakaiti.sarwagya.wtf/takes" },
    { title: "oss.sarwagya.wtf", sub: "the workshop", href: "https://oss.sarwagya.wtf" },
    ...projects.map((project) => ({
      title: project.name,
      sub: project.packageName ?? "the proof",
      href: `https://oss.sarwagya.wtf/${project.slug}`,
    })),
    {
      title: "ui · seo · tokens · og",
      sub: "shared machinery",
      href: "https://github.com/0xsarwagya/internet/tree/main/packages",
    },
  ];

  return (
    <nav className="mt-14" aria-label="Directory">
      <p className="label">The same, in words</p>
      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {routes.map((route) => (
          <li key={`${route.title}-${route.href}`}>
            <a
              href={route.href}
              className="group flex items-baseline gap-3 py-1 transition-colors"
            >
              <span className="font-serif text-ink group-hover:text-rust">
                {route.title}
              </span>
              <span className="label">{route.sub}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
