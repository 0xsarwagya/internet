import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@0xsarwagya/ui", "@repo/seo"],
  outputFileTracingIncludes: {
    "/oss-assets/[slug]/[...path]": ["./content/projects/**/assets/**"],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ["remark-frontmatter"],
      ["remark-gfm"],
      [path.join(__dirname, "lib/remark-oss-assets.mjs")],
    ],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          // Both themes are emitted as CSS variables per token; globals.css
          // picks one following the same system-preference + data-theme
          // mechanism as the rest of the site.
          theme: { light: "min-light", dark: "min-dark" },
          defaultColor: false,
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
