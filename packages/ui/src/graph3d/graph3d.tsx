"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { Graph3DProps } from "./types";

export type {
  Graph3DEdge,
  Graph3DLayout,
  Graph3DNode,
  Graph3DNodeKind,
  Graph3DProps,
} from "./types";

const Graph3DScene: ComponentType<Graph3DProps> = dynamic(
  () => import("./graph3d-scene").then((m) => m.Graph3DScene),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        style={{ height: 520 }}
        className="mt-6 w-full animate-pulse rounded-sm bg-ink/[0.03]"
      />
    ),
  },
);

export function Graph3D(props: Graph3DProps) {
  return <Graph3DScene {...props} />;
}
