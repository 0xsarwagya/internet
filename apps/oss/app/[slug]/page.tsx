import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd, breadcrumbJsonLd } from "@repo/seo/json-ld";
import { createPageMetadata } from "@repo/seo/metadata";

import { getLandingFrontmatter, getProject, getProjects } from "../../lib/projects";
import { SITE, absoluteUrl } from "../../lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  const frontmatter = getLandingFrontmatter(slug);
  return createPageMetadata(SITE, {
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/${slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const mod = (await import(`../../content/projects/${slug}/landing.mdx`)) as {
    default: React.ComponentType;
  };
  const Landing = mod.default;

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: absoluteUrl(`/${slug}`),
    ...(project.repository ? { codeRepository: project.repository } : {}),
    programmingLanguage: "TypeScript",
    ...(project.license === "MIT"
      ? { license: "https://opensource.org/licenses/MIT" }
      : {}),
    author: {
      "@type": "Person",
      "@id": `${SITE.person.url}/#person`,
      name: SITE.person.name,
      url: SITE.person.url,
    },
  };
  const breadcrumbLd = breadcrumbJsonLd(SITE, [
    { name: "OSS", path: "/" },
    { name: project.name, path: `/${slug}` },
  ]);

  return (
    <main className="mx-auto w-full max-w-[860px] px-5 sm:px-6 md:px-10">
      <JsonLd data={softwareLd} />
      <JsonLd data={breadcrumbLd} />

      <nav className="flex items-baseline justify-between pt-10">
        <Link href="/" className="label transition-colors hover:text-rust">
          ← Projects
        </Link>
        <span className="flex gap-5">
          <Link
            href={`/${slug}/docs`}
            className="label transition-colors hover:text-rust"
          >
            Docs
          </Link>
          {project.hasDemo ? (
            <Link
              href={`/${slug}/demo`}
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

      <article className="mt-8 flex flex-col gap-6 pb-8">
        <Landing />
      </article>
    </main>
  );
}
