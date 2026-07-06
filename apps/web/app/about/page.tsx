import type { Metadata } from "next";

import { SARWAGYA } from "@repo/seo/author";
import { JsonLd, personJsonLd } from "@repo/seo/json-ld";
import { createPageMetadata } from "@repo/seo/metadata";
import { absoluteUrl, SITE } from "../../lib/site";

const TITLE = "Sarwagya Singh — Software Engineer";
const DESCRIPTION =
  "Sarwagya Singh is a software engineer at Actimi in Ludwigsburg, co-founder of Vestcodes, and the maintainer behind @0xsarwagya/ghost, /handoff, and /durable-local. Not the FIDE-rated chess player.";
const PATH = "/about";
const DISAMBIGUATION =
  "Not to be confused with Sarwagya Singh Kushwaha, the FIDE-rated chess player from Madhya Pradesh, India.";

export const metadata: Metadata = createPageMetadata(SITE, {
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const personLd = personJsonLd(SARWAGYA, {
  description: DESCRIPTION,
  disambiguatingDescription: DISAMBIGUATION,
  mainEntityOfPage: absoluteUrl(PATH),
});

type LinkItem = {
  label: string;
  href: string;
  hint?: string;
  rel?: string;
};

const OSS_PROJECTS: LinkItem[] = [
  {
    label: "@0xsarwagya/ghost",
    href: "https://oss.sarwagya.wtf/ghost/docs",
    hint: "MIT · content-addressed dead-drop protocol",
  },
  {
    label: "@0xsarwagya/handoff",
    href: "https://oss.sarwagya.wtf/handoff/docs",
    hint: "MIT · short-lived signed handoffs across surfaces",
  },
  {
    label: "@0xsarwagya/durable-local",
    href: "https://oss.sarwagya.wtf/durable-local/docs",
    hint: "MIT · a local-first store that survives the tab",
  },
  {
    label: "@0xsarwagya/agnostic-web-ble",
    href: "https://oss.sarwagya.wtf/agnostic-web-ble/docs",
    hint: "MIT · Web Bluetooth without the framework taxes",
  },
];

const WRITING: LinkItem[] = [
  {
    label: "eng.sarwagya.wtf",
    href: "https://eng.sarwagya.wtf",
    hint: "Engineering long-form",
  },
  {
    label: "bakaiti.sarwagya.wtf",
    href: "https://bakaiti.sarwagya.wtf",
    hint: "Opinions, unfiltered",
  },
  {
    label: "sarwagya.wtf/margins",
    href: "/margins",
    hint: "Half-thoughts, notes",
  },
];

const ELSEWHERE: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/0xsarwagya", rel: "me" },
  { label: "npm", href: "https://www.npmjs.com/~0xsarwagya", rel: "me" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/0xsarwagya", rel: "me" },
  { label: "HN", href: "https://news.ycombinator.com/user?id=0xsarwagya", rel: "me" },
  { label: "X", href: "https://twitter.com/0xsarwagya", rel: "me" },
  { label: "Instagram", href: "https://instagram.com/0xsarwagya", rel: "me" },
  { label: "HuggingFace", href: "https://huggingface.co/0xsarwagya", rel: "me" },
  { label: "Product Hunt", href: "https://www.producthunt.com/@0xsarwagya", rel: "me" },
  { label: "Medium", href: "https://0xsarwagya.medium.com", rel: "me" },
  { label: "Threads", href: "https://www.threads.net/@0xsarwagya", rel: "me" },
];

export default function AboutPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-40 pt-40 sm:px-6 md:px-12 md:pt-56">
      <JsonLd data={personLd} />

      <header className="mb-16 flex items-baseline justify-between">
        <span className="label">About</span>
        <span className="label">Sarwagya Singh</span>
      </header>

      <h1
        className="font-serif leading-[0.98] tracking-[-0.02em]"
        style={{ fontSize: "clamp(40px, 5.4vw, 76px)" }}
      >
        Sarwagya Singh <span className="italic text-ink/70">— Software Engineer</span>
      </h1>

      <p
        className="mt-10 max-w-3xl font-serif text-ink/85"
        style={{ fontSize: "clamp(20px, 1.9vw, 28px)", lineHeight: 1.4 }}
      >
        I&rsquo;m Sarwagya Singh. I&rsquo;m a software engineer at{" "}
        <a
          href="https://www.actimi.com"
          className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
        >
          Actimi
        </a>
        , based in Ludwigsburg.
      </p>

      <div className="hairline mt-24 mb-16" />

      <AboutBlock label="Work" index="I">
        <Prose>
          Software Engineer at{" "}
          <ExternalLink href="https://www.actimi.com">Actimi</ExternalLink>, where I
          build the software layer around continuous patient monitoring —
          devices, feeds, and the boring plumbing that keeps clinical data
          honest. Before that, and still on the side, I co-founded{" "}
          <ExternalLink href="https://www.vestcodes.com">Vestcodes</ExternalLink>,
          a small studio building tools for people who ship on the internet.
        </Prose>
        <Prose className="mt-6">
          I like small teams, small dependencies, and interfaces that stay
          legible after the third person has touched them.
        </Prose>
      </AboutBlock>

      <AboutBlock label="Open source" index="II">
        <Prose>
          Most of what I release lives under{" "}
          <ExternalLink href="https://oss.sarwagya.wtf">
            oss.sarwagya.wtf
          </ExternalLink>{" "}
          — MIT-licensed, kept intentionally small, and documented like someone
          else will maintain them (usually me, six months later).
        </Prose>
        <DefinitionList items={OSS_PROJECTS} />
        <Prose className="mt-10">
          Live experiments and browser-side demos run at{" "}
          <ExternalLink href="https://local.sarwagya.wtf">
            local.sarwagya.wtf
          </ExternalLink>{" "}
          — most recently a WebRTC demo built on top of{" "}
          <span className="italic">handoff</span> and{" "}
          <span className="italic">durable-local</span>.
        </Prose>
      </AboutBlock>

      <AboutBlock label="Writing" index="III">
        <Prose>
          I write in three rooms. Engineering long-form ships to{" "}
          <ExternalLink href="https://eng.sarwagya.wtf">
            eng.sarwagya.wtf
          </ExternalLink>{" "}
          when I&rsquo;ve actually shipped the thing it&rsquo;s about. Opinions
          — sharper, less careful — go up at{" "}
          <ExternalLink href="https://bakaiti.sarwagya.wtf">
            bakaiti.sarwagya.wtf
          </ExternalLink>
          . Everything else lives as notes in{" "}
          <ExternalLink href="/margins">sarwagya.wtf/margins</ExternalLink> —
          half-thoughts, unfinished on purpose.
        </Prose>
        <DefinitionList items={WRITING} />
      </AboutBlock>

      <AboutBlock label="Education" index="IV">
        <Prose>
          I studied at the{" "}
          <ExternalLink href="https://www.tum.de">
            Technical University of Munich
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink href="https://www.uni-saarland.de">
            Saarland University
          </ExternalLink>
          . A public trail of the research-adjacent work is on my{" "}
          <ExternalLink href="https://www.researchgate.net/profile/Sarwagya-Singh">
            ResearchGate profile
          </ExternalLink>
          .
        </Prose>
      </AboutBlock>

      <AboutBlock label="Film" index="V">
        <Prose>
          A previous life. I&rsquo;m credited as additional crew on{" "}
          <span className="italic">Panchayat</span> and{" "}
          <span className="italic">Bhakshak</span>. The full record is on{" "}
          <ExternalLink href="https://www.imdb.com/name/nm16137305">
            IMDb (nm16137305)
          </ExternalLink>
          .
        </Prose>
      </AboutBlock>

      <AboutBlock label="Elsewhere" index="VI">
        <Prose>
          The same person, in more places than is probably wise:
        </Prose>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-ink/75">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                rel={item.rel}
                className="underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </AboutBlock>

      <AboutBlock label="Not the chess player" index="VII">
        <Prose>
          If you searched my name and landed on a rated player: that&rsquo;s a
          different person.{" "}
          <ExternalLink href="https://ratings.fide.com/profile/558059504">
            Sarwagya Singh Kushwaha
          </ExternalLink>{" "}
          is a FIDE-rated chess player from Madhya Pradesh, India. I&rsquo;m not
          him. I don&rsquo;t play rated chess, I don&rsquo;t live in Madhya
          Pradesh, and the only openings I care about are the ones in{" "}
          <span className="italic">main</span>.
        </Prose>
      </AboutBlock>

      <div className="hairline mt-24 mb-10" />

      <footer className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-xs text-ink/60">
        <span className="label">hello@sarwagya.wtf</span>
        <span>Ludwigsburg · Bihar · the internet</span>
      </footer>
    </main>
  );
}

function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-serif text-ink/85 ${className}`}
      style={{ fontSize: "clamp(17px, 1.35vw, 21px)", lineHeight: 1.55 }}
    >
      {children}
    </p>
  );
}

function AboutBlock({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-24 grid grid-cols-12 gap-6 md:mb-32">
      <header className="col-span-12 mb-6 flex items-baseline justify-between md:col-span-3 md:mb-0 md:flex-col md:items-start md:gap-2">
        <span className="label">{label}</span>
        <span className="label">{index}</span>
      </header>
      <div className="col-span-12 md:col-span-8 md:col-start-5">{children}</div>
    </section>
  );
}

function DefinitionList({ items }: { items: LinkItem[] }) {
  return (
    <dl className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
      {items.map((item) => (
        <div
          key={item.href}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
        >
          <dt>
            <ExternalLink href={item.href}>{item.label}</ExternalLink>
          </dt>
          {item.hint ? (
            <dd className="font-mono text-xs text-ink/60">{item.hint}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isInternal = href.startsWith("/");
  return (
    <a
      href={href}
      {...(isInternal ? {} : { rel: "noopener" })}
      className="underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
    >
      {children}
    </a>
  );
}
