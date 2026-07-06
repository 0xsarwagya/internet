import type { Metadata } from "next";
import Link from "next/link";

import { canonicalAlternates } from "@repo/seo/canonical";

import {
  ACTIVE_PACKAGES,
  formatDownloads,
  getWeeklyDownloads,
} from "../lib/npm-downloads";
import { getProjects } from "../lib/projects";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  alternates: canonicalAlternates(SITE, "/"),
};

export default async function Home() {
  const projects = getProjects();
  const downloads = await getWeeklyDownloads(ACTIVE_PACKAGES);
  const activeCount = ACTIVE_PACKAGES.length;

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <section className="pt-24 md:pt-36">
        <p className="label rise">Open source · Sarwagya Singh</p>
        <h1
          className="rise rise-1 mt-6 font-serif leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "clamp(52px, 9vw, 128px)" }}
        >
          The workshop.
        </h1>
        <p
          className="rise rise-2 mt-8 max-w-xl font-serif italic text-ink/80"
          style={{ fontSize: "clamp(19px, 2vw, 26px)", lineHeight: 1.3 }}
        >
          Problems I solved for myself. Apparently a few other people had them
          too.
        </p>
        <p className="rise rise-2 mt-4 font-mono text-[11px] text-stone">
          — Comrade Sarwagya
        </p>
        {downloads ? (
          <p
            className="rise rise-2 mt-6 font-mono text-[11px] text-stone"
            title={`Window: ${downloads.window.start} → ${downloads.window.end}. npm counts each install of each package, including transitive dependencies.`}
          >
            {formatDownloads(downloads.total)} package downloads this week ·{" "}
            {activeCount} packages
          </p>
        ) : null}
      </section>

      <section className="rise rise-3 mt-20 md:mt-28" aria-label="Projects">
        <h2 className="label">Projects</h2>
        <div className="mt-6 flex flex-col">
          {projects.map((project) => {
            const perPackage =
              project.packageName && downloads
                ? downloads.byPackage[project.packageName]
                : undefined;
            return (
              <Link
                key={project.slug}
                href={`/${project.slug}`}
                className="group grid grid-cols-12 gap-2 border-t border-ink/10 py-7 transition-colors first:border-t-0 md:gap-8"
              >
                <span className="col-span-12 font-mono text-[11px] text-stone md:col-span-3">
                  {project.status}
                  {project.license ? ` · ${project.license}` : ""}
                </span>
                <span className="col-span-12 md:col-span-9">
                  <span
                    className="font-serif leading-[1.15] transition-colors group-hover:text-rust"
                    style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
                  >
                    {project.name}
                  </span>
                  {project.packageName ? (
                    <span className="mt-1 flex flex-wrap items-baseline gap-x-3 font-mono text-[11px] text-stone">
                      <span>{project.packageName}</span>
                      {perPackage && perPackage > 0 ? (
                        <span>
                          {formatDownloads(perPackage)} downloads / week
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  <span
                    className="mt-3 block max-w-2xl font-body text-graphite"
                    style={{ fontSize: 16, lineHeight: 1.55 }}
                  >
                    {project.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
