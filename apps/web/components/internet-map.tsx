"use client";

import { useState } from "react";

type MapNode = {
  id: string;
  title: string;
  sub: string;
  desc: string;
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
  faint?: boolean;
};

const NODES: MapNode[] = [
  {
    id: "internet",
    title: "internet",
    sub: "0xsarwagya/internet",
    desc: "The monorepo. All of this lives in one place.",
    href: "https://github.com/0xsarwagya/internet",
    x: 500,
    y: 70,
    w: 210,
    h: 68,
  },
  {
    id: "web",
    title: "sarwagya.wtf",
    sub: "the person",
    desc: "Making, in slow layers — thoughts, software, and the sentences between.",
    href: "https://sarwagya.wtf",
    x: 125,
    y: 260,
    w: 195,
    h: 72,
  },
  {
    id: "eng",
    title: "eng.sarwagya.wtf",
    sub: "the engineer",
    desc: "Long-form engineering learnings, written to be useful.",
    href: "https://eng.sarwagya.wtf",
    x: 375,
    y: 260,
    w: 195,
    h: 72,
  },
  {
    id: "bakaiti",
    title: "bakaiti.sarwagya.wtf",
    sub: "the opinions",
    desc: "Strongly held, loosely researched. Cheaper than therapy.",
    href: "https://bakaiti.sarwagya.wtf",
    x: 625,
    y: 260,
    w: 195,
    h: 72,
  },
  {
    id: "oss",
    title: "oss.sarwagya.wtf",
    sub: "the workshop",
    desc: "Open-source libraries, documented properly and maintained honestly.",
    href: "https://oss.sarwagya.wtf",
    x: 875,
    y: 260,
    w: 195,
    h: 72,
  },
  {
    id: "margins",
    title: "/margins",
    sub: "what stays",
    desc: "Half-thoughts, kept as they were written.",
    href: "https://sarwagya.wtf/margins",
    x: 125,
    y: 430,
    w: 155,
    h: 60,
  },
  {
    id: "learnings",
    title: "/learnings",
    sub: "what stuck",
    desc: "Things learned the slow way.",
    href: "https://eng.sarwagya.wtf/learnings",
    x: 375,
    y: 430,
    w: 155,
    h: 60,
  },
  {
    id: "takes",
    title: "/takes",
    sub: "what slipped out",
    desc: "Long-form takes, delivered with unearned confidence.",
    href: "https://bakaiti.sarwagya.wtf/takes",
    x: 625,
    y: 430,
    w: 155,
    h: 60,
  },
  {
    id: "ble",
    title: "agnostic-web-ble",
    sub: "the proof",
    desc: "Bluetooth Low Energy for the web, whatever your browser might be.",
    href: "https://oss.sarwagya.wtf/agnostic-web-ble",
    x: 875,
    y: 430,
    w: 175,
    h: 60,
  },
  {
    id: "packages",
    title: "ui · seo · tokens · og",
    sub: "@0xsarwagya/ui + @repo/seo",
    desc: "The shared machinery. Same paper and ink beneath all four sites.",
    href: "https://github.com/0xsarwagya/internet/tree/main/packages",
    x: 500,
    y: 590,
    w: 320,
    h: 48,
    faint: true,
  },
];

const EDGES: { from: string; to: string; dashed?: boolean }[] = [
  { from: "internet", to: "web" },
  { from: "internet", to: "eng" },
  { from: "internet", to: "bakaiti" },
  { from: "internet", to: "oss" },
  { from: "web", to: "margins" },
  { from: "eng", to: "learnings" },
  { from: "bakaiti", to: "takes" },
  { from: "oss", to: "ble" },
  { from: "web", to: "packages", dashed: true },
  { from: "eng", to: "packages", dashed: true },
  { from: "bakaiti", to: "packages", dashed: true },
  { from: "oss", to: "packages", dashed: true },
];

function byId(id: string): MapNode {
  const node = NODES.find((n) => n.id === id);
  if (!node) throw new Error(`unknown node: ${id}`);
  return node;
}

export function InternetMap() {
  const [active, setActive] = useState<MapNode | null>(null);

  return (
    <div>
      <p className="label min-h-[2.5em] max-w-xl" aria-live="polite">
        {active ? active.desc : "Hover a node. Click to visit."}
      </p>

      <svg
        viewBox="0 0 1000 650"
        className="mt-6 w-full"
        role="img"
        aria-label="A map of the sites, routes, projects, and packages in this corner of the internet"
      >
        {EDGES.map((edge) => {
          const from = byId(edge.from);
          const to = byId(edge.to);
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y + from.h / 2}
              x2={to.x}
              y2={to.y - to.h / 2}
              className={edge.dashed ? "stroke-ink/10" : "stroke-ink/20"}
              strokeWidth="1"
              strokeDasharray={edge.dashed ? "3 5" : undefined}
            />
          );
        })}

        {NODES.map((node) => {
          const isActive = active?.id === node.id;
          return (
            <a
              key={node.id}
              href={node.href}
              aria-label={`${node.title} — ${node.sub}`}
              onMouseEnter={() => setActive(node)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(node)}
              onBlur={() => setActive(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={node.x - node.w / 2}
                y={node.y - node.h / 2}
                width={node.w}
                height={node.h}
                className={
                  isActive
                    ? "fill-paper stroke-rust"
                    : node.faint
                      ? "fill-paper stroke-ink/15"
                      : "fill-paper stroke-ink/30"
                }
                strokeWidth="1"
                strokeDasharray={node.faint ? "3 5" : undefined}
              />
              <text
                x={node.x}
                y={node.faint ? node.y - 2 : node.y - 4}
                textAnchor="middle"
                className={
                  node.faint
                    ? `font-mono ${isActive ? "fill-rust" : "fill-ink/55"}`
                    : `font-serif ${isActive ? "fill-rust" : "fill-ink"}`
                }
                style={{ fontSize: node.faint ? 12 : node.id === "internet" ? 22 : 16 }}
              >
                {node.title}
              </text>
              <text
                x={node.x}
                y={node.y + (node.faint ? 16 : 18)}
                textAnchor="middle"
                className={`font-mono uppercase ${isActive ? "fill-rust" : "fill-stone"}`}
                style={{ fontSize: 8.5, letterSpacing: "0.14em" }}
              >
                {node.sub}
              </text>
            </a>
          );
        })}
      </svg>
    </div>
  );
}
