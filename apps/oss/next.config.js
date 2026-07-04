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
  },
});

export default withMDX(nextConfig);
