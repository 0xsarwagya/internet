"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { BOOKS, type Book } from "../../content/books";
import { Section } from "../section";

export function Bookshelf() {
  return (
    <Section id="reading" label="Reading" index="III" className="py-24 sm:py-32 md:py-56">
      <ul className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
        {BOOKS.map((book) => (
          <BookRow key={book.title} book={book} />
        ))}
      </ul>
    </Section>
  );
}

function BookRow({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      className="flex flex-col gap-2 py-6 outline-none focus-visible:bg-ink/[0.02] md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-8"
    >
      <h3
        className="font-serif text-ink md:col-span-6"
        style={{ fontSize: "clamp(20px, 2.2vw, 32px)", lineHeight: 1.2 }}
      >
        {book.title}
      </h3>
      <span className="font-mono text-xs text-ink/60 md:col-span-3">
        {book.author}
      </span>
      <p
        className="font-serif italic text-ink/70 md:col-span-3"
        style={{ fontSize: "clamp(14px, 1.1vw, 17px)", lineHeight: 1.4 }}
      >
        <span className="md:hidden">{book.thought}</span>
        <motion.span
          className="hidden md:inline"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {book.thought}
        </motion.span>
      </p>
    </li>
  );
}
