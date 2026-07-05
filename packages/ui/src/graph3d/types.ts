export type Graph3DNodeKind = "primary" | "secondary" | "faint" | "accent";

export type Graph3DLayout = "manual" | "layers" | "ring";

export type Graph3DNode = {
  id: string;
  label: string;
  sub?: string;
  desc?: string;
  href?: string;
  kind?: Graph3DNodeKind;
  position?: [number, number, number];
  layer?: number;
  angle?: number;
};

export type Graph3DEdge = {
  from: string;
  to: string;
  dashed?: boolean;
};

export type Graph3DProps = {
  nodes: Graph3DNode[];
  edges?: Graph3DEdge[];
  layout?: Graph3DLayout;
  height?: number;
  autoRotate?: boolean;
  caption?: string;
};
