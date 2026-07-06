import { FooterLink } from "../footer-link";

export function ProjectLinks({
  docs,
  demo,
  repository,
  npm,
}: {
  docs?: string;
  demo?: string;
  repository?: string;
  npm?: string;
}) {
  const count =
    (docs ? 1 : 0) + (demo ? 1 : 0) + (repository ? 1 : 0) + (npm ? 1 : 0);
  const smCols = count >= 4 ? "sm:grid-cols-4" : count === 3 ? "sm:grid-cols-3" : count === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1";
  return (
    <nav
      aria-label="Project links"
      className={`mt-4 grid grid-cols-1 gap-4 ${smCols}`}
    >
      {docs ? <FooterLink label="Read" href={docs} value="Documentation" /> : null}
      {demo ? <FooterLink label="Try" href={demo} value="Demo" /> : null}
      {repository ? (
        <FooterLink label="Audit" href={repository} value="Source" />
      ) : null}
      {npm ? <FooterLink label="Install" href={npm} value="npm" /> : null}
    </nav>
  );
}
