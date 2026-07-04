import type { MDXComponents } from "mdx/types";

import { proseComponents } from "../prose";
import { Callout } from "./callout";
import { CompatibilityMatrix } from "./compatibility-matrix";
import { Install } from "./install";
import { ProjectHero } from "./project-hero";
import { ProjectLinks } from "./project-links";

export { Callout, CompatibilityMatrix, Install, ProjectHero, ProjectLinks };
export type { CompatibilityRow } from "./compatibility-matrix";

/** Styled native Markdown elements shared by every MDX surface. */
export const baseMdxComponents: MDXComponents = proseComponents;

/**
 * The semantic project vocabulary (mdxVersion 1) plus base Markdown.
 * Project repositories author these names; this registry gives them form.
 */
export const projectMdxComponents: MDXComponents = {
  ...baseMdxComponents,
  img: ({ src, alt }) => (
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="w-full border border-ink/10 bg-paper"
      loading="lazy"
    />
  ),
  ProjectHero,
  Install,
  Callout,
  CompatibilityMatrix,
  ProjectLinks,
};
