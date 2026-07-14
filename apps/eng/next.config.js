import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@0xsarwagya/ui", "@repo/seo"],
  // Marc-Lou-style .md endpoints: every content route gains a .md twin
  // that returns raw MDX. Rewrite `/foo/bar.md` → `/api/raw/foo/bar`
  // so a single handler at app/api/raw/[[...path]]/route.ts serves
  // every content file. See docs/fhir/integration-guide.md pattern.
  async rewrites() {
    return [{ source: "/:path*.md", destination: "/api/raw/:path*" }];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter"]],
  },
});

export default withMDX(nextConfig);
