import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createPageMetadata } from "@repo/seo/metadata";

import { getProject, getProjects } from "../../../lib/projects";
import { SITE } from "../../../lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjects()
    .filter((p) => p.hasDemo)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.hasDemo) return { title: "Not found" };
  return createPageMetadata(SITE, {
    title: `${project.name} — Demo`,
    description: `An interactive demonstration of ${project.name}.`,
    path: `/${slug}/demo`,
  });
}

export default async function DemoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.hasDemo) notFound();

  const mod = (await import(`../../../content/projects/${slug}/demo/index`)) as {
    default: React.ComponentType;
  };
  const Demo = mod.default;

  return (
    <main className="mx-auto w-full max-w-[860px] px-5 sm:px-6 md:px-10">
      <nav className="flex items-baseline justify-between pt-10">
        <span className="label">
          <Link href="/" className="transition-colors hover:text-rust">
            OSS
          </Link>
          {" / "}
          <Link
            href={`/${slug}`}
            className="transition-colors hover:text-rust"
          >
            {project.name}
          </Link>
          {" / Demo"}
        </span>
        <Link
          href={`/${slug}/docs`}
          className="label transition-colors hover:text-rust"
        >
          Docs
        </Link>
      </nav>

      <header className="pb-12 pt-12 md:pt-20">
        <h1
          className="font-serif leading-[1.05] tracking-[-0.01em]"
          style={{ fontSize: "clamp(36px, 4.6vw, 60px)" }}
        >
          Demo.
        </h1>
        <p
          className="mt-4 max-w-2xl font-serif italic text-ink/70"
          style={{ fontSize: 18, lineHeight: 1.4 }}
        >
          Proof, not promises. The demo reports honestly when a runtime cannot
          do something.
        </p>
        <div className="hairline mt-8" />
      </header>

      <Demo />
    </main>
  );
}
