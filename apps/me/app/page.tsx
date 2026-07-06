import type { Metadata } from "next";

import { canonicalAlternates } from "@repo/seo/canonical";

import { SITE } from "../lib/site";

export const metadata: Metadata = {
  alternates: canonicalAlternates(SITE, "/"),
};

type Doorway = {
  label: string;
  subtitle: string;
  href: string;
  hint: string;
};

type Section = {
  title: string;
  eyebrow: string;
  doorways: Doorway[];
};

const SECTIONS: Section[] = [
  {
    title: "Writing",
    eyebrow: "01 · in words",
    doorways: [
      {
        label: "sarwagya.wtf",
        subtitle: "the main page — notes, coordinates, cassette",
        href: "https://sarwagya.wtf",
        hint: "home",
      },
      {
        label: "eng.sarwagya.wtf",
        subtitle: "engineering, written down",
        href: "https://eng.sarwagya.wtf",
        hint: "long form",
      },
      {
        label: "bakaiti.sarwagya.wtf",
        subtitle: "opinions, loosely researched",
        href: "https://bakaiti.sarwagya.wtf",
        hint: "postmortems",
      },
    ],
  },
  {
    title: "Shipping",
    eyebrow: "02 · in code",
    doorways: [
      {
        label: "oss.sarwagya.wtf",
        subtitle: "the workshop — packages I actually use",
        href: "https://oss.sarwagya.wtf",
        hint: "open source",
      },
      {
        label: "local.sarwagya.wtf",
        subtitle: "webrtc chat, no signup, no server-side identity",
        href: "https://local.sarwagya.wtf",
        hint: "demo",
      },
      {
        label: "github.com/0xsarwagya",
        subtitle: "everything that exists as commits",
        href: "https://github.com/0xsarwagya",
        hint: "source",
      },
      {
        label: "npmjs.com/~0xsarwagya",
        subtitle: "the packages, installable",
        href: "https://www.npmjs.com/~0xsarwagya",
        hint: "packages",
      },
    ],
  },
  {
    title: "Building",
    eyebrow: "03 · in company",
    doorways: [
      {
        label: "vestcodes.com",
        subtitle: "small software studio, co-founded",
        href: "https://www.vestcodes.com",
        hint: "studio",
      },
    ],
  },
  {
    title: "Elsewhere",
    eyebrow: "04 · in public",
    doorways: [
      {
        label: "linkedin.com/in/0xsarwagya",
        subtitle: "the professional face — CV lives here",
        href: "https://www.linkedin.com/in/0xsarwagya",
        hint: "linkedin",
      },
      {
        label: "news.ycombinator.com/user?id=0xsarwagya",
        subtitle: "occasional submissions, quieter comments",
        href: "https://news.ycombinator.com/user?id=0xsarwagya",
        hint: "hn",
      },
      {
        label: "instagram.com/0xsarwagya",
        subtitle: "frames, occasional",
        href: "https://instagram.com/0xsarwagya",
        hint: "photos",
      },
      {
        label: "twitter.com/0xsarwagya",
        subtitle: "small thoughts, mostly deleted",
        href: "https://twitter.com/0xsarwagya",
        hint: "posts",
      },
      {
        label: "hello@sarwagya.wtf",
        subtitle: "the actual inbox — replies come back",
        href: "mailto:hello@sarwagya.wtf",
        hint: "email",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="relative z-10 min-h-dvh px-6 pt-20 pb-28 sm:px-10 md:pt-32">
      <div className="mx-auto flex w-full max-w-[38rem] flex-col gap-16">
        <header className="flex flex-col gap-4">
          <span className="label">me.sarwagya.wtf · one page</span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.02em]">
            <a
              href="https://me.sarwagya.wtf"
              rel="me"
              className="hover:text-[color:var(--color-rust)] transition-colors"
            >
              Sarwagya Singh.
            </a>
            <span
              className="italic block text-[color:var(--color-graphite)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              A few doorways.
            </span>
          </h1>
          <p
            className="max-w-[32ch] text-[color:var(--color-graphite)] text-[15px] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Software engineer and writer from Bihar, living in Germany.
            Everything I make eventually shows up on one of these.
          </p>
        </header>

        <div className="hairline" aria-hidden />

        {SECTIONS.map((section, sectionIndex) => (
          <section key={section.title} className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-2xl">{section.title}</h2>
              <span className="label">{section.eyebrow}</span>
            </div>
            <ul className="flex flex-col">
              {section.doorways.map((doorway, index) => (
                <li key={doorway.href}>
                  {index > 0 ? (
                    <div className="hairline opacity-60" aria-hidden />
                  ) : null}
                  <a
                    href={doorway.href}
                    className="group grid grid-cols-[1.5rem_1fr_auto] items-baseline gap-4 py-4 transition-colors"
                    rel={
                      doorway.href.startsWith("http")
                        ? "me noopener"
                        : undefined
                    }
                  >
                    <span
                      className="font-mono text-[color:var(--color-stone)] text-xs transition-transform group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-mono text-[13px] tracking-[0.02em] group-hover:text-[color:var(--color-rust)] transition-colors">
                        {doorway.label}
                      </span>
                      <span
                        className="text-[color:var(--color-graphite)] text-[14px] leading-snug"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {doorway.subtitle}
                      </span>
                    </span>
                    <span className="label whitespace-nowrap self-start pt-1">
                      {doorway.hint}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {sectionIndex < SECTIONS.length - 1 ? (
              <div className="hairline" aria-hidden />
            ) : null}
          </section>
        ))}

        <footer className="flex flex-col gap-2 pt-12">
          <div className="hairline" aria-hidden />
          <div className="flex items-baseline justify-between pt-4">
            <span className="label">{new Date().getFullYear()} · Muzaffarpur → Ludwigsburg</span>
            <a
              href="https://sarwagya.wtf"
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-graphite)] hover:text-[color:var(--color-rust)]"
            >
              back to root
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
