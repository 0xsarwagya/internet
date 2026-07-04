import type { MDXComponents } from "mdx/types";

import { proseComponents } from "@0xsarwagya/ui/prose";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...proseComponents,
    ...components,
  };
}
