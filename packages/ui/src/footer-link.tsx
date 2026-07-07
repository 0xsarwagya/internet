export function FooterLink({
  label,
  href,
  value,
  rel,
}: {
  label: string;
  href: string;
  value: string;
  rel?: string;
}) {
  const isExternal = href.startsWith("http");
  const relTokens = new Set<string>();
  if (isExternal) relTokens.add("noreferrer");
  if (rel) {
    for (const token of rel.split(/\s+/)) {
      if (token) relTokens.add(token);
    }
  }
  const relAttr = relTokens.size > 0 ? Array.from(relTokens).join(" ") : undefined;
  // Extra rel tokens the caller passed for external links (e.g. "me").
  const externalExtraRel = rel ? ` ${rel}` : "";

  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel={`noreferrer${externalExtraRel}`}
      className="group flex flex-col gap-1 border-t border-ink/10 pt-3 transition-colors hover:text-rust focus-visible:text-rust"
    >
      <span className="label">{label}</span>
      <span className="font-mono text-xs text-ink/70 transition-colors group-hover:text-rust">
        {value}
      </span>
    </a>
  ) : (
    <a
      href={href}
      rel={relAttr}
      className="group flex flex-col gap-1 border-t border-ink/10 pt-3 transition-colors hover:text-rust focus-visible:text-rust"
    >
      <span className="label">{label}</span>
      <span className="font-mono text-xs text-ink/70 transition-colors group-hover:text-rust">
        {value}
      </span>
    </a>
  );
}
