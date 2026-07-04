import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd, breadcrumbJsonLd } from "@repo/seo/json-ld";
import { createPageMetadata } from "@repo/seo/metadata";

import { DocsShell } from "../../../../components/docs-shell";
import {
  getDoc,
  getDocs,
  getProject,
  getProjects,
} from "../../../../lib/projects";
import { SITE } from "../../../../lib/site";

type Params = { slug: string; path: string[] };

export function generateStaticParams(): Params[] {
  return getProjects().flatMap((project) =>
    getDocs(project.slug)
      .filter((doc) => doc.segments.length > 0)
      .map((doc) => ({ slug: project.slug, path: doc.segments })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, path } = await params;
  const project = getProject(slug);
  const doc = getDoc(slug, path);
  if (!project || !doc) return { title: "Not found" };
  return createPageMetadata(SITE, {
    title: `${doc.title} — ${project.name}`,
    description: doc.description || project.description,
    path: `/${slug}/docs/${path.join("/")}`,
  });
}

export default async function DocPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, path } = await params;
  const project = getProject(slug);
  const doc = getDoc(slug, path);
  if (!project || !doc) notFound();

  const mod = (await import(
    `../../../../content/projects/${slug}/docs/${path.join("/")}.mdx`
  )) as { default: React.ComponentType };
  const Content = mod.default;

  const breadcrumbLd = breadcrumbJsonLd(SITE, [
    { name: "OSS", path: "/" },
    { name: project.name, path: `/${slug}` },
    { name: "Docs", path: `/${slug}/docs` },
    { name: doc.title, path: `/${slug}/docs/${path.join("/")}` },
  ]);

  return (
    <DocsShell project={project} current={doc}>
      <JsonLd data={breadcrumbLd} />
      <Content />
    </DocsShell>
  );
}
