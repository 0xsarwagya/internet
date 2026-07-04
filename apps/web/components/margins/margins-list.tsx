"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type MarginCategory,
} from "../../lib/margins-shared";

type Note = {
  slug: string;
  title: string;
  year: string;
  category: MarginCategory;
};

type Filter = "all" | MarginCategory;

export function MarginsList({ notes }: { notes: readonly Note[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return notes;
    return notes.filter((n) => n.category === filter);
  }, [filter, notes]);

  return (
    <>
      <div className="mb-16 flex flex-wrap items-center gap-x-4 gap-y-3">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </Chip>
        {CATEGORY_ORDER.map((cat) => (
          <Chip
            key={cat}
            active={filter === cat}
            onClick={() => setFilter(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </Chip>
        ))}
      </div>

      <ul className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
        {filtered.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/margins/${note.slug}`}
              className="group grid grid-cols-12 items-baseline gap-6 py-6 outline-none transition-colors hover:bg-ink/[0.02] focus-visible:bg-ink/[0.03]"
            >
              <h3
                className="col-span-9 font-serif text-ink group-hover:text-rust transition-colors md:col-span-10"
                style={{ fontSize: "clamp(20px, 1.7vw, 26px)", lineHeight: 1.2 }}
              >
                {note.title}
              </h3>
              <span className="col-span-3 justify-self-end label md:col-span-2">
                {CATEGORY_LABELS[note.category]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-12 font-serif italic text-ink/60">
          Nothing under that heading. Try another.
        </p>
      ) : null}
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label border-b pb-[3px] transition-colors outline-none ${
        active
          ? "border-rust text-rust"
          : "border-transparent text-ink/60 hover:text-ink focus-visible:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
