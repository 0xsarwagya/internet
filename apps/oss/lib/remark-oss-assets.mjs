/**
 * Rewrites project-relative asset references in synchronized project MDX
 * ("./assets/x.svg") to the public asset route ("/oss-assets/<slug>/x.svg").
 *
 * Canonical project content must never contain final public URLs — this is
 * the apps/oss boundary where they are resolved.
 */

const ASSET_PREFIX = /^\.?\/?assets\//;
const URL_ATTRIBUTES = new Set(["src", "poster", "href", "url"]);

function slugFromPath(filePath) {
  const match = /content\/projects\/([^/]+)\//.exec(filePath ?? "");
  return match ? match[1] : null;
}

function rewrite(value, slug) {
  if (typeof value !== "string" || !ASSET_PREFIX.test(value)) return value;
  return `/oss-assets/${slug}/${value.replace(ASSET_PREFIX, "")}`;
}

function walk(node, slug) {
  if (!node || typeof node !== "object") return;
  if (node.type === "image" || node.type === "link") {
    node.url = rewrite(node.url, slug);
  }
  if (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    Array.isArray(node.attributes)
  ) {
    for (const attribute of node.attributes) {
      if (
        attribute.type === "mdxJsxAttribute" &&
        URL_ATTRIBUTES.has(attribute.name)
      ) {
        attribute.value = rewrite(attribute.value, slug);
      }
    }
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, slug);
  }
}

export default function remarkOssAssets() {
  return (tree, file) => {
    const slug = slugFromPath(file?.path ?? file?.history?.[0]);
    if (!slug) return;
    walk(tree, slug);
  };
}
