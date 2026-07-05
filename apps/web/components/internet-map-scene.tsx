"use client";

import { Graph3D } from "@0xsarwagya/ui/graph3d";
import type { Graph3DEdge, Graph3DNode } from "@0xsarwagya/ui/graph3d";
import { useMemo } from "react";

export type OssProjectSummary = {
  slug: string;
  name: string;
  packageName?: string;
  description: string;
};

type MapKind = "hub" | "site" | "route" | "project" | "packages";

const HUB_POS: [number, number, number] = [0, 3.6, 0];
const SITE_POSITIONS: Record<string, [number, number, number]> = {
  web: [-6, 0.4, 1.6],
  eng: [-2, 0.4, -1.6],
  bakaiti: [2, 0.4, 1.6],
  oss: [6, 0.4, -1.6],
};
const ROUTE_POSITIONS: Record<string, [number, number, number]> = {
  margins: [-6, -2.8, 2.6],
  learnings: [-2, -2.8, -0.6],
  takes: [2, -2.8, 2.6],
};
const PACKAGES_POS: [number, number, number] = [0, -4.4, 0];

const KIND_TO_GRAPH: Record<MapKind, Graph3DNode["kind"]> = {
  hub: "primary",
  site: "secondary",
  route: "faint",
  project: "secondary",
  packages: "faint",
};

function buildProjectPositions(count: number): [number, number, number][] {
  if (count <= 0) return [];
  const base = SITE_POSITIONS.oss ?? [6, 0.4, -1.6];
  const radius = 2.6;
  const results: [number, number, number][] = [];
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1);
    const angle = -Math.PI * 0.35 + t * Math.PI * 0.7;
    results.push([
      base[0] + radius * Math.sin(angle),
      -3.2,
      base[2] - 0.4 + radius * Math.cos(angle) * 0.6,
    ]);
  }
  return results;
}

function buildGraph(projects: OssProjectSummary[]): {
  nodes: Graph3DNode[];
  edges: Graph3DEdge[];
} {
  const nodes: Graph3DNode[] = [
    {
      id: "internet",
      label: "internet",
      sub: "0xsarwagya/internet",
      desc: "The monorepo. All of this lives in one place.",
      href: "https://github.com/0xsarwagya/internet",
      position: HUB_POS,
      kind: KIND_TO_GRAPH.hub,
    },
    {
      id: "web",
      label: "sarwagya.wtf",
      sub: "the person",
      desc: "Making, in slow layers — thoughts, software, and the sentences between.",
      href: "https://sarwagya.wtf",
      position: SITE_POSITIONS.web!,
      kind: KIND_TO_GRAPH.site,
    },
    {
      id: "eng",
      label: "eng.sarwagya.wtf",
      sub: "the engineer",
      desc: "Long-form engineering learnings, written to be useful.",
      href: "https://eng.sarwagya.wtf",
      position: SITE_POSITIONS.eng!,
      kind: KIND_TO_GRAPH.site,
    },
    {
      id: "bakaiti",
      label: "bakaiti.sarwagya.wtf",
      sub: "the opinions",
      desc: "Strongly held, loosely researched. Cheaper than therapy.",
      href: "https://bakaiti.sarwagya.wtf",
      position: SITE_POSITIONS.bakaiti!,
      kind: KIND_TO_GRAPH.site,
    },
    {
      id: "oss",
      label: "oss.sarwagya.wtf",
      sub: "the workshop",
      desc: "Open-source libraries, documented properly and maintained honestly.",
      href: "https://oss.sarwagya.wtf",
      position: SITE_POSITIONS.oss!,
      kind: KIND_TO_GRAPH.site,
    },
    {
      id: "margins",
      label: "/margins",
      sub: "what stays",
      desc: "Half-thoughts, kept as they were written.",
      href: "https://sarwagya.wtf/margins",
      position: ROUTE_POSITIONS.margins!,
      kind: KIND_TO_GRAPH.route,
    },
    {
      id: "learnings",
      label: "/learnings",
      sub: "what stuck",
      desc: "Things learned the slow way.",
      href: "https://eng.sarwagya.wtf/learnings",
      position: ROUTE_POSITIONS.learnings!,
      kind: KIND_TO_GRAPH.route,
    },
    {
      id: "takes",
      label: "/takes",
      sub: "what slipped out",
      desc: "Long-form takes, delivered with unearned confidence.",
      href: "https://bakaiti.sarwagya.wtf/takes",
      position: ROUTE_POSITIONS.takes!,
      kind: KIND_TO_GRAPH.route,
    },
    {
      id: "packages",
      label: "ui · seo · tokens · og",
      sub: "@0xsarwagya/ui + @repo/seo",
      desc: "The shared machinery. Same paper and ink beneath all four sites.",
      href: "https://github.com/0xsarwagya/internet/tree/main/packages",
      position: PACKAGES_POS,
      kind: KIND_TO_GRAPH.packages,
    },
  ];

  const projectPositions = buildProjectPositions(projects.length);
  projects.forEach((project, i) => {
    nodes.push({
      id: `project:${project.slug}`,
      label: project.name,
      sub: project.packageName ?? "the proof",
      desc: project.description,
      href: `https://oss.sarwagya.wtf/${project.slug}`,
      position: projectPositions[i]!,
      kind: KIND_TO_GRAPH.project,
    });
  });

  const edges: Graph3DEdge[] = [
    { from: "internet", to: "web" },
    { from: "internet", to: "eng" },
    { from: "internet", to: "bakaiti" },
    { from: "internet", to: "oss" },
    { from: "web", to: "margins" },
    { from: "eng", to: "learnings" },
    { from: "bakaiti", to: "takes" },
    { from: "web", to: "packages", dashed: true },
    { from: "eng", to: "packages", dashed: true },
    { from: "bakaiti", to: "packages", dashed: true },
    { from: "oss", to: "packages", dashed: true },
  ];
  for (const project of projects) {
    edges.push({ from: "oss", to: `project:${project.slug}` });
  }

  return { nodes, edges };
}

export function InternetMapScene({
  projects,
}: {
  projects: OssProjectSummary[];
}) {
  const { nodes, edges } = useMemo(() => buildGraph(projects), [projects]);

  return (
    <Graph3D
      nodes={nodes}
      edges={edges}
      layout="manual"
      caption="Drag to rotate. Hover a node. Click to visit."
    />
  );
}

export default InternetMapScene;
