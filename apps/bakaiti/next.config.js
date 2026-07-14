import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@0xsarwagya/ui", "@repo/seo"],
  async rewrites() {
    return [{ source: "/:path*.md", destination: "/api/raw/:path*" }];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter"], ["remark-gfm"]],
  },
});

export default withMDX(nextConfig);
