import type { Graph3DNodeKind } from "./types";

export const PAPER = "#f6f4ef";
export const INK = "#0d0d0d";
export const STONE = "#9b8c73";
export const RUST = "#a34a3a";

export const KIND_SIZE: Record<Graph3DNodeKind, number> = {
  primary: 0.32,
  secondary: 0.2,
  faint: 0.14,
  accent: 0.22,
};

export const KIND_WIRE_COLOR: Record<Graph3DNodeKind, string> = {
  primary: INK,
  secondary: INK,
  faint: STONE,
  accent: RUST,
};

export const KIND_WIRE_OPACITY: Record<Graph3DNodeKind, number> = {
  primary: 0.34,
  secondary: 0.28,
  faint: 0.2,
  accent: 0.45,
};

export const KIND_LABEL_FAMILY: Record<Graph3DNodeKind, "font-serif" | "font-mono"> = {
  primary: "font-serif",
  secondary: "font-serif",
  faint: "font-mono",
  accent: "font-serif",
};

export const KIND_LABEL_SIZE: Record<Graph3DNodeKind, number> = {
  primary: 22,
  secondary: 16,
  faint: 12,
  accent: 17,
};
