import Link from "next/link";

import { docHref, getDocs, type DocEntry, type Project } from "../lib/projects";

/** One normalized docs tree drives the sidebar, breadcrumbs, and prev/next. */
export function DocsShell({
  project,
  current,
  children,
}: {
  project: Project;
  current: DocEntry;
  children: React.ReactNode;
}) {
  const docs = getDocs(project.slug);
  const index = docs.findIndex(
    (d) => d.segments.join("/") === current.segments.join("/"),
  );
  const previous = index > 0 ? docs[index - 1] : undefined;
  const next = index >= 0 && index < docs.length - 1 ? docs[index + 1] : undefined;

  const sections: { label: string; entries: DocEntry[] }[] = [];
  for (const doc of docs) {
    const last = sections[sections.length - 1];
    if (last && last.label === doc.sectionLabel) {
      last.entries.push(doc);
    } else {
      sections.push({ label: doc.sectionLabel, entries: [doc] });
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
      <nav className="flex items-baseline justify-between pt-10">
        <span className="label">
          <Link href="/" className="transition-colors hover:text-rust">
            OSS
          </Link>
          {" / "}
          <Link
            href={`/${project.slug}`}
            className="transition-colors hover:text-rust"
          >
            {project.name}
          </Link>
          {" / Docs"}
        </span>
        <span className="flex gap-5">
          {project.hasDemo ? (
            <Link
              href={`/${project.slug}/demo`}
              className="label transition-colors hover:text-rust"
            >
              Demo
            </Link>
          ) : null}
          {project.repository ? (
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              className="label transition-colors hover:text-rust"
            >
              Source ↗
            </a>
          ) : null}
        </span>
      </nav>

      <div className="mt-12 grid grid-cols-12 gap-8 md:gap-12">
        <aside className="col-span-12 md:col-span-3" aria-label="Documentation">
          {sections.map((section) => (
            <div key={section.label || "root"} className="mb-8">
              {section.label ? (
                <p className="label mb-3">{section.label}</p>
              ) : null}
              <ul className="flex flex-col gap-2">
                {section.entries.map((doc) => {
                  const active =
                    doc.segments.join("/") === current.segments.join("/");
                  return (
                    <li key={doc.segments.join("/") || "index"}>
                      <Link
                        href={docHref(project.slug, doc)}
                        className={`font-mono text-[12px] transition-colors hover:text-rust ${
                          active ? "text-rust" : "text-ink/70"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>

        <article className="col-span-12 min-w-0 md:col-span-9 lg:col-span-8">
          <h1
            className="font-serif leading-[1.08] tracking-[-0.01em]"
            style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}
          >
            {current.title}
          </h1>
          {current.description ? (
            <p
              className="mt-4 max-w-2xl font-serif italic text-ink/70"
              style={{ fontSize: 18, lineHeight: 1.4 }}
            >
              {current.description}
            </p>
          ) : null}
          <div className="hairline mt-8" />
          <div className="mt-10 flex flex-col gap-6">{children}</div>

          <div className="hairline mb-6 mt-16" />
          <div className="flex items-baseline justify-between gap-6">
            {previous ? (
              <Link
                href={docHref(project.slug, previous)}
                className="label transition-colors hover:text-rust"
              >
                ← {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={docHref(project.slug, next)}
                className="label text-right transition-colors hover:text-rust"
              >
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
