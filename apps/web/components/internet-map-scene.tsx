"use client";

/* eslint-disable react/no-unknown-property -- react-three-fiber maps three.js props onto JSX elements. */

import { Html, Line, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";

type NodeKind = "hub" | "site" | "route" | "project" | "packages";

export type MapNode = {
  id: string;
  title: string;
  sub: string;
  desc: string;
  href: string;
  position: [number, number, number];
  kind: NodeKind;
};

export type MapEdge = {
  from: string;
  to: string;
  dashed?: boolean;
};

export type OssProjectSummary = {
  slug: string;
  name: string;
  packageName?: string;
  description: string;
};

const PAPER = "#f6f4ef";
const INK = "#0d0d0d";
const STONE = "#9b8c73";
const RUST = "#a34a3a";

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

function buildProjectPositions(
  count: number,
): [number, number, number][] {
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

export function buildGraph(projects: OssProjectSummary[]): {
  nodes: MapNode[];
  edges: MapEdge[];
} {
  const nodes: MapNode[] = [
    {
      id: "internet",
      title: "internet",
      sub: "0xsarwagya/internet",
      desc: "The monorepo. All of this lives in one place.",
      href: "https://github.com/0xsarwagya/internet",
      position: HUB_POS,
      kind: "hub",
    },
    {
      id: "web",
      title: "sarwagya.wtf",
      sub: "the person",
      desc: "Making, in slow layers — thoughts, software, and the sentences between.",
      href: "https://sarwagya.wtf",
      position: SITE_POSITIONS.web!,
      kind: "site",
    },
    {
      id: "eng",
      title: "eng.sarwagya.wtf",
      sub: "the engineer",
      desc: "Long-form engineering learnings, written to be useful.",
      href: "https://eng.sarwagya.wtf",
      position: SITE_POSITIONS.eng!,
      kind: "site",
    },
    {
      id: "bakaiti",
      title: "bakaiti.sarwagya.wtf",
      sub: "the opinions",
      desc: "Strongly held, loosely researched. Cheaper than therapy.",
      href: "https://bakaiti.sarwagya.wtf",
      position: SITE_POSITIONS.bakaiti!,
      kind: "site",
    },
    {
      id: "oss",
      title: "oss.sarwagya.wtf",
      sub: "the workshop",
      desc: "Open-source libraries, documented properly and maintained honestly.",
      href: "https://oss.sarwagya.wtf",
      position: SITE_POSITIONS.oss!,
      kind: "site",
    },
    {
      id: "margins",
      title: "/margins",
      sub: "what stays",
      desc: "Half-thoughts, kept as they were written.",
      href: "https://sarwagya.wtf/margins",
      position: ROUTE_POSITIONS.margins!,
      kind: "route",
    },
    {
      id: "learnings",
      title: "/learnings",
      sub: "what stuck",
      desc: "Things learned the slow way.",
      href: "https://eng.sarwagya.wtf/learnings",
      position: ROUTE_POSITIONS.learnings!,
      kind: "route",
    },
    {
      id: "takes",
      title: "/takes",
      sub: "what slipped out",
      desc: "Long-form takes, delivered with unearned confidence.",
      href: "https://bakaiti.sarwagya.wtf/takes",
      position: ROUTE_POSITIONS.takes!,
      kind: "route",
    },
    {
      id: "packages",
      title: "ui · seo · tokens · og",
      sub: "@0xsarwagya/ui + @repo/seo",
      desc: "The shared machinery. Same paper and ink beneath all four sites.",
      href: "https://github.com/0xsarwagya/internet/tree/main/packages",
      position: PACKAGES_POS,
      kind: "packages",
    },
  ];

  const projectPositions = buildProjectPositions(projects.length);
  projects.forEach((project, i) => {
    nodes.push({
      id: `project:${project.slug}`,
      title: project.name,
      sub: project.packageName ?? "the proof",
      desc: project.description,
      href: `https://oss.sarwagya.wtf/${project.slug}`,
      position: projectPositions[i]!,
      kind: "project",
    });
  });

  const edges: MapEdge[] = [
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

const KIND_SIZE: Record<NodeKind, number> = {
  hub: 0.34,
  site: 0.22,
  route: 0.16,
  project: 0.18,
  packages: 0.13,
};

function Node({
  node,
  active,
  hovered,
  onEnter,
  onLeave,
  onSelect,
}: {
  node: MapNode;
  active: boolean;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const size = KIND_SIZE[node.kind];
  const isPackages = node.kind === "packages";
  const highlight = active || hovered;
  const color = highlight ? RUST : isPackages ? STONE : INK;

  return (
    <group position={node.position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onEnter();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onLeave();
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={PAPER}
          emissive={highlight ? RUST : "#000"}
          emissiveIntensity={highlight ? 0.15 : 0}
          roughness={0.72}
          metalness={0.02}
        />
      </mesh>
      <mesh scale={1.01}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={isPackages ? 0.18 : highlight ? 0.55 : 0.28}
        />
      </mesh>
      <Html
        center
        distanceFactor={10}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          style={{
            transform: `translate(0, calc(${size * 44}px))`,
            textAlign: "center",
            whiteSpace: "nowrap",
            color: highlight ? RUST : isPackages ? STONE : INK,
            transition: "color 200ms",
          }}
        >
          <div
            className={
              node.kind === "packages" || node.kind === "route"
                ? "font-mono"
                : "font-serif"
            }
            style={{
              fontSize:
                node.kind === "hub"
                  ? 22
                  : node.kind === "site"
                    ? 16
                    : node.kind === "packages"
                      ? 12
                      : 15,
              lineHeight: 1.1,
              letterSpacing: node.kind === "packages" ? "0.02em" : "-0.01em",
            }}
          >
            {node.title}
          </div>
          <div
            className="font-mono"
            style={{
              marginTop: 4,
              fontSize: 8.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: highlight ? RUST : STONE,
            }}
          >
            {node.sub}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Edges({
  nodes,
  edges,
  activeId,
}: {
  nodes: MapNode[];
  edges: MapEdge[];
  activeId: string | null;
}) {
  const byId = useMemo(() => {
    const map = new Map<string, MapNode>();
    for (const node of nodes) map.set(node.id, node);
    return map;
  }, [nodes]);

  return (
    <>
      {edges.map((edge) => {
        const from = byId.get(edge.from);
        const to = byId.get(edge.to);
        if (!from || !to) return null;
        const touched = activeId === edge.from || activeId === edge.to;
        const baseOpacity = edge.dashed ? 0.14 : 0.32;
        const opacity = touched ? 0.85 : baseOpacity;
        const color = touched ? RUST : INK;
        return (
          <Line
            key={`${edge.from}-${edge.to}`}
            points={[
              new THREE.Vector3(...from.position),
              new THREE.Vector3(...to.position),
            ]}
            color={color}
            lineWidth={touched ? 1.4 : 1}
            transparent
            opacity={opacity}
            dashed={edge.dashed}
            dashSize={0.18}
            gapSize={0.14}
          />
        );
      })}
    </>
  );
}

export function InternetMapScene({
  projects,
}: {
  projects: OssProjectSummary[];
}) {
  const { nodes, edges } = useMemo(() => buildGraph(projects), [projects]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const activeId = hoveredId ?? pinnedId;
  const active = activeId ? nodes.find((n) => n.id === activeId) : null;

  return (
    <div className="relative">
      <p
        className="label min-h-[2.5em] max-w-xl"
        aria-live="polite"
        style={{ letterSpacing: "0.14em" }}
      >
        {active
          ? active.desc
          : "Drag to rotate. Hover a node. Click to visit."}
      </p>

      <div
        className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-sm"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-ink) 3%, transparent) 0%, transparent 70%)",
        }}
      >
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          onPointerMissed={() => {
            setHoveredId(null);
            setPinnedId(null);
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 1.8, 14]} fov={38} />
          <ambientLight intensity={0.85} />
          <directionalLight position={[6, 8, 4]} intensity={0.35} />
          <directionalLight position={[-4, -2, -6]} intensity={0.15} />
          <fog attach="fog" args={[PAPER, 12, 26]} />

          <Edges nodes={nodes} edges={edges} activeId={activeId} />

          {nodes.map((node) => (
            <Node
              key={node.id}
              node={node}
              active={pinnedId === node.id}
              hovered={hoveredId === node.id}
              onEnter={() => setHoveredId(node.id)}
              onLeave={() =>
                setHoveredId((current) =>
                  current === node.id ? null : current,
                )
              }
              onSelect={() => {
                setPinnedId(node.id);
                window.open(node.href, node.href.startsWith("http") ? "_blank" : "_self");
              }}
            />
          ))}

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            autoRotate
            autoRotateSpeed={0.35}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default InternetMapScene;
