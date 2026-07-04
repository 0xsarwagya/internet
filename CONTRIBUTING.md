# Contributing

This is a personal website monorepo, so contributions have a narrow but real
lane:

**Welcome:** bug fixes, accessibility improvements, performance fixes,
dependency/security patches, and corrections to anything factually broken
(dead links, rendering glitches, build failures).

**Not looking for:** new features, redesigns, content edits, or PRs to the
writing under `apps/*/content/`. The words are the point of the site; they're
not up for pull requests.

## Setup

```sh
pnpm install
pnpm dev     # web :3000, eng :3001, bakaiti :3002
```

Before opening a PR:

```sh
pnpm lint && pnpm check-types && pnpm build
```

Keep commits small and atomic, in the style of the existing history. If a
change touches `packages/ui`, check all three apps still build — the CI
workflow will verify, but it's faster to catch locally.
