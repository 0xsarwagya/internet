import type { MDXComponents } from "mdx/types";

import { projectMdxComponents } from "@0xsarwagya/ui/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...projectMdxComponents,
    ...components,
  };
}
