import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd, breadcrumbJsonLd } from "@repo/seo/json-ld";
import { createPageMetadata } from "@repo/seo/metadata";

import { DocsShell } from "../../../components/docs-shell";
import { getDoc, getProject, getProjects } from "../../../lib/projects";
import { SITE } from "../../../lib/site";

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
  const doc = getDoc(slug, []);
  if (!project || !doc) return { title: "Not found" };
  return createPageMetadata(SITE, {
    title: `${project.name} — ${doc.title}`,
    description: doc.description || project.description,
    path: `/${slug}/docs`,
  });
}

export default async function DocsIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const doc = getDoc(slug, []);
  if (!project || !doc) notFound();

  const mod = (await import(
    `../../../content/projects/${slug}/docs/index.mdx`
  )) as { default: React.ComponentType };
  const Content = mod.default;

  const breadcrumbLd = breadcrumbJsonLd(SITE, [
    { name: "OSS", path: "/" },
    { name: project.name, path: `/${slug}` },
    { name: "Docs", path: `/${slug}/docs` },
  ]);

  return (
    <DocsShell project={project} current={doc}>
      <JsonLd data={breadcrumbLd} />
      <Content />
    </DocsShell>
  );
}
