"use client";

/* eslint-disable react/no-unknown-property -- react-three-fiber maps three.js props onto JSX elements. */

import { Html, Line, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";

import { resolvePositions } from "./layout";
import {
  INK,
  KIND_LABEL_FAMILY,
  KIND_LABEL_SIZE,
  KIND_SIZE,
  KIND_WIRE_COLOR,
  KIND_WIRE_OPACITY,
  PAPER,
  RUST,
  STONE,
} from "./tokens";
import type { Graph3DNode, Graph3DNodeKind, Graph3DProps } from "./types";

type ResolvedNode = Graph3DNode & {
  kind: Graph3DNodeKind;
  position: [number, number, number];
};

function Node({
  node,
  hovered,
  onEnter,
  onLeave,
  onSelect,
}: {
  node: ResolvedNode;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const size = KIND_SIZE[node.kind];
  const wireColor = hovered ? RUST : KIND_WIRE_COLOR[node.kind];
  const wireOpacity = hovered ? 0.6 : KIND_WIRE_OPACITY[node.kind];
  const labelColor = hovered
    ? RUST
    : node.kind === "faint"
      ? STONE
      : node.kind === "accent"
        ? RUST
        : INK;

  return (
    <group position={node.position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onEnter();
          if (typeof document !== "undefined") {
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          onLeave();
          if (typeof document !== "undefined") {
            document.body.style.cursor = "auto";
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={PAPER}
          emissive={hovered ? RUST : "#000"}
          emissiveIntensity={hovered ? 0.15 : 0}
          roughness={0.72}
          metalness={0.02}
        />
      </mesh>
      <mesh scale={1.01}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={wireOpacity}
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
            color: labelColor,
            transition: "color 200ms",
          }}
        >
          <div
            className={KIND_LABEL_FAMILY[node.kind]}
            style={{
              fontSize: KIND_LABEL_SIZE[node.kind],
              lineHeight: 1.1,
              letterSpacing:
                node.kind === "faint" ? "0.02em" : "-0.01em",
            }}
          >
            {node.label}
          </div>
          {node.sub ? (
            <div
              className="font-mono"
              style={{
                marginTop: 4,
                fontSize: 8.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: hovered ? RUST : STONE,
              }}
            >
              {node.sub}
            </div>
          ) : null}
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
  nodes: Map<string, ResolvedNode>;
  edges: NonNullable<Graph3DProps["edges"]>;
  activeId: string | null;
}) {
  return (
    <>
      {edges.map((edge) => {
        const from = nodes.get(edge.from);
        const to = nodes.get(edge.to);
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
            dashSize={0.2}
            gapSize={0.15}
          />
        );
      })}
    </>
  );
}

export function Graph3DScene({
  nodes: rawNodes,
  edges = [],
  layout = "layers",
  height = 520,
  autoRotate = true,
  caption,
}: Graph3DProps) {
  const resolved = useMemo<ResolvedNode[]>(() => {
    const positions = resolvePositions(rawNodes, layout);
    return rawNodes.map((node) => ({
      ...node,
      kind: node.kind ?? "secondary",
      position: positions.get(node.id) ?? [0, 0, 0],
    }));
  }, [rawNodes, layout]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, ResolvedNode>();
    for (const node of resolved) map.set(node.id, node);
    return map;
  }, [resolved]);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const active = hoveredId ? nodeMap.get(hoveredId) ?? null : null;
  const displayText = active?.desc ?? caption ?? "Drag to rotate. Hover a node.";

  const onSelect = (node: ResolvedNode) => {
    if (!node.href || typeof window === "undefined") return;
    const external = /^https?:\/\//.test(node.href);
    window.open(node.href, external ? "_blank" : "_self");
  };

  return (
    <div className="relative">
      <p
        className="label min-h-[2.5em] max-w-xl"
        aria-live="polite"
        style={{ letterSpacing: "0.14em" }}
      >
        {displayText}
      </p>

      <div
        className="mt-6 w-full overflow-hidden rounded-sm"
        style={{
          height,
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-ink) 3%, transparent) 0%, transparent 70%)",
        }}
      >
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          onPointerMissed={() => setHoveredId(null)}
        >
          <PerspectiveCamera makeDefault position={[0, 1.8, 14]} fov={38} />
          <ambientLight intensity={0.85} />
          <directionalLight position={[6, 8, 4]} intensity={0.35} />
          <directionalLight position={[-4, -2, -6]} intensity={0.15} />
          <fog attach="fog" args={[PAPER, 12, 26]} />

          <Edges nodes={nodeMap} edges={edges} activeId={hoveredId} />

          {resolved.map((node) => (
            <Node
              key={node.id}
              node={node}
              hovered={hoveredId === node.id}
              onEnter={() => setHoveredId(node.id)}
              onLeave={() =>
                setHoveredId((current) =>
                  current === node.id ? null : current,
                )
              }
              onSelect={() => onSelect(node)}
            />
          ))}

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            autoRotate={autoRotate}
            autoRotateSpeed={0.35}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Canvas>
      </div>
    </div>
  );
}
