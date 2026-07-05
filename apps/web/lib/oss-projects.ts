import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export type OssProject = {
  slug: string;
  name: string;
  packageName?: string;
  description: string;
  status: string;
};

const OSS_CONTENT_ROOT = path.join(
  process.cwd(),
  "..",
  "oss",
  "content",
  "projects",
);

let cache: OssProject[] | null = null;

export function getOssProjects(): OssProject[] {
  if (cache) return cache;
  if (!existsSync(OSS_CONTENT_ROOT)) return (cache = []);

  const projects: OssProject[] = [];
  for (const entry of readdirSync(OSS_CONTENT_ROOT)) {
    if (entry.startsWith(".")) continue;
    const dir = path.join(OSS_CONTENT_ROOT, entry);
    if (!statSync(dir).isDirectory()) continue;
    const manifestPath = path.join(dir, "manifest.json");
    if (!existsSync(manifestPath)) continue;
    const raw = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<
      string,
      unknown
    >;
    if (
      typeof raw.slug !== "string" ||
      typeof raw.name !== "string" ||
      typeof raw.description !== "string" ||
      typeof raw.status !== "string"
    ) {
      continue;
    }
    projects.push({
      slug: raw.slug,
      name: raw.name,
      description: raw.description,
      status: raw.status,
      ...(typeof raw.packageName === "string"
        ? { packageName: raw.packageName }
        : {}),
    });
  }
  projects.sort((a, b) => a.name.localeCompare(b.name));
  return (cache = projects);
}
