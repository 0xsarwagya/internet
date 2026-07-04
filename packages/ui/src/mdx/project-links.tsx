import { FooterLink } from "../footer-link";

export function ProjectLinks({
  docs,
  demo,
  repository,
}: {
  docs?: string;
  demo?: string;
  repository?: string;
}) {
  return (
    <nav
      aria-label="Project links"
      className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {docs ? <FooterLink label="Read" href={docs} value="Documentation" /> : null}
      {demo ? <FooterLink label="Try" href={demo} value="Demo" /> : null}
      {repository ? (
        <FooterLink label="Audit" href={repository} value="Source" />
      ) : null}
    </nav>
  );
}
