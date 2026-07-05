import type { Graph3DLayout, Graph3DNode } from "./types";

const LAYER_GAP = 2.2;
const RING_BASE_RADIUS = 2.4;
const RING_PER_NODE = 0.4;

type Vec3 = [number, number, number];

export function resolvePositions(
  nodes: Graph3DNode[],
  layout: Graph3DLayout,
): Map<string, Vec3> {
  const positions = new Map<string, Vec3>();

  if (layout === "manual") {
    for (const node of nodes) {
      positions.set(node.id, node.position ?? [0, 0, 0]);
    }
    return positions;
  }

  if (layout === "ring") {
    return ring(nodes, 0);
  }

  return layers(nodes);
}

function ring(nodes: Graph3DNode[], y: number): Map<string, Vec3> {
  const positions = new Map<string, Vec3>();
  const count = nodes.length;
  if (count === 0) return positions;
  const radius = RING_BASE_RADIUS + RING_PER_NODE * Math.max(0, count - 2);

  const withAngle: { node: Graph3DNode; angle: number }[] = [];
  const withoutAngle: Graph3DNode[] = [];
  for (const node of nodes) {
    if (typeof node.angle === "number") {
      withAngle.push({ node, angle: (node.angle % 1) * Math.PI * 2 });
    } else {
      withoutAngle.push(node);
    }
  }

  const claimed = withAngle.map((entry) => entry.angle);
  const step = (Math.PI * 2) / count;
  let cursor = 0;
  for (const node of withoutAngle) {
    while (
      claimed.some((c) => Math.abs(((c - cursor) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) < step * 0.4)
    ) {
      cursor += step * 0.5;
    }
    withAngle.push({ node, angle: cursor });
    claimed.push(cursor);
    cursor += step;
  }

  for (const { node, angle } of withAngle) {
    if (node.position) {
      positions.set(node.id, node.position);
      continue;
    }
    positions.set(node.id, [
      radius * Math.sin(angle),
      y,
      radius * Math.cos(angle),
    ]);
  }
  return positions;
}

function layers(nodes: Graph3DNode[]): Map<string, Vec3> {
  const positions = new Map<string, Vec3>();
  const buckets = new Map<number, Graph3DNode[]>();
  for (const node of nodes) {
    if (node.position) {
      positions.set(node.id, node.position);
      continue;
    }
    const layer = node.layer ?? 0;
    const list = buckets.get(layer) ?? [];
    list.push(node);
    buckets.set(layer, list);
  }

  const layerIndexes = [...buckets.keys()].sort((a, b) => a - b);
  if (layerIndexes.length === 0) return positions;
  const topLayer = layerIndexes[0]!;
  const bottomLayer = layerIndexes[layerIndexes.length - 1]!;
  const midLayer = (topLayer + bottomLayer) / 2;

  for (const layer of layerIndexes) {
    const y = (midLayer - layer) * LAYER_GAP;
    const layerNodes = buckets.get(layer) ?? [];
    if (layerNodes.length === 1) {
      const node = layerNodes[0]!;
      const angle =
        typeof node.angle === "number" ? (node.angle % 1) * Math.PI * 2 : 0;
      const radius = angle === 0 ? 0 : RING_BASE_RADIUS;
      positions.set(node.id, [
        radius * Math.sin(angle),
        y,
        radius * Math.cos(angle),
      ]);
      continue;
    }
    const ringed = ring(layerNodes, y);
    for (const [id, pos] of ringed) {
      positions.set(id, pos);
    }
  }
  return positions;
}
