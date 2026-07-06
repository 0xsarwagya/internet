/**
 * Fetches weekly npm download counts for a list of packages.
 *
 * Honest labeling: npm's download counter counts each install of each package,
 * including transitive dependencies. One user installing package A that depends
 * on package B produces 2 downloads. We surface this number as "package
 * downloads" — never "users", "developers", or "installations".
 */

export const ACTIVE_PACKAGES = [
  "@0xsarwagya/ghost",
  "@0xsarwagya/handoff",
  "@0xsarwagya/durable-local",
  "@0xsarwagya/agnostic-web-ble",
] as const;

export type WeeklyDownloads = {
  total: number;
  byPackage: Record<string, number>;
  window: { start: string; end: string };
};

type NpmPointResponse = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

async function fetchOne(
  name: string,
): Promise<NpmPointResponse | null> {
  const url = `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(name)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as Partial<NpmPointResponse> & {
      error?: string;
    };
    if (json.error || typeof json.downloads !== "number") return null;
    return json as NpmPointResponse;
  } catch {
    return null;
  }
}

export async function getWeeklyDownloads(
  packageNames: readonly string[],
): Promise<WeeklyDownloads | null> {
  const results = await Promise.all(packageNames.map((name) => fetchOne(name)));

  const byPackage: Record<string, number> = {};
  let total = 0;
  let start: string | undefined;
  let end: string | undefined;
  let anySuccess = false;

  for (let i = 0; i < results.length; i++) {
    const name = packageNames[i];
    const r = results[i];
    if (!r || !name) continue;
    anySuccess = true;
    byPackage[name] = r.downloads;
    total += r.downloads;
    // Windows should be identical across packages for the same range.
    if (!start) start = r.start;
    if (!end) end = r.end;
  }

  if (!anySuccess || !start || !end) return null;
  return { total, byPackage, window: { start, end } };
}

/**
 * Formats a download count:
 *   < 1000     → locale-grouped integer, e.g. "247"
 *   1000-9999  → "X.Xk" with one decimal, e.g. "1.2k"
 *   >= 10000   → integer + "k", e.g. "12k"
 */
export function formatDownloads(n: number): string {
  if (n < 1000) return n.toLocaleString("en-US");
  if (n < 10000) {
    const v = Math.floor(n / 100) / 10; // one decimal, truncated
    return `${v.toFixed(1)}k`;
  }
  return `${Math.floor(n / 1000)}k`;
}
