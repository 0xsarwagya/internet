# internet

My corner of it.

A monorepo containing the websites I use to write, build, think, and occasionally talk nonsense on the internet.

```
sarwagya.wtf                  the person
sarwagya.wtf/margins          the margins
eng.sarwagya.wtf              the engineer
eng.sarwagya.wtf/learnings    the learnings
bakaiti.sarwagya.wtf          the unnecessary opinions
oss.sarwagya.wtf              the workshop
```

## The map

```
                         ┌──────────────────┐
                         │     INTERNET     │
                         │   0xsarwagya/    │
                         │     internet     │
                         └────────┬─────────┘
                                  │
        ┌───────────┬───────────┼───────────┬───────────┐
        ▼           ▼           ▼           ▼           ▼
 ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
 │ sarwagya │ │   eng.   │ │ bakaiti. │ │   oss.   │
 │   .wtf   │ │ sarwagya │ │ sarwagya │ │ sarwagya │
 │the person│ │ engineer │ │ opinions │ │ workshop │
 └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
      ▼            ▼            ▼            ▼
  /margins     /learnings     /takes    agnostic-web-ble
  what stays   what stuck  what slipped   the proof
      │            │            │            │
      └ · · · · · · ┼ · · · · · · ┼ · · · · · · ┘
                   ·            ·
              ui · seo · tokens · og
           @0xsarwagya/ui + @repo/seo
```

There is an interactive version at [sarwagya.wtf/map](https://sarwagya.wtf/map).

## What lives here

```
apps/
  web/        sarwagya.wtf      — the personal site and the margins
  eng/        eng.sarwagya.wtf  — engineering, written down
  bakaiti/    bakaiti.…         — long-form opinions, cheaper than therapy
  oss/        oss.sarwagya.wtf  — the workshop: project landings, docs, demos
packages/
  ui/                 @0xsarwagya/ui — shared components, content pipeline,
                      design tokens, OG cards, and the semantic project
                      MDX vocabulary
  seo/                @repo/seo — metadata, canonical URLs, structured data
  eslint-config/      shared lint rules
  typescript-config/  shared tsconfigs
```

Every site is Next.js with Tailwind and MDX. Content is plain `.mdx` files with
frontmatter, read by one shared content pipeline. The sites share a single
visual family — paper, ink, stone, rust; a display serif, a text serif, and a
mono — and diverge only in register: the personal site is a broadside, the
engineering site is a logbook, bakaiti is a red pen, and the workshop
renders open-source project content synchronized from each project's own
repository (see `scripts/oss-sync.mjs`).

## Philosophy

Built to outlive the excitement that created it. That means: boring toolchain,
plain files over databases, one shared package instead of three copies, small
atomic commits, and nothing in the stack that requires remembering how it works
after six months away.

## Running it

```sh
pnpm install
pnpm dev        # web :3000, eng :3001, bakaiti :3002, oss :3003
pnpm build      # build everything
pnpm lint       # lint everything
```

Deploys run per-app from GitHub Actions to Vercel when the app (or shared code)
changes. See `.github/workflows/deploy.yml`.

## License

The **code** is [MIT](./LICENSE). The **words, photographs, and the person**
are not — all site content (`apps/*/content/`, `apps/web/public/photography/`)
and the identity of the sites remain all rights reserved. See
[LICENSE-content.md](./LICENSE-content.md). Learn from the code, build your own
corner with it; don't republish mine.
