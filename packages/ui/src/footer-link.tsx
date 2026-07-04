export function FooterLink({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex flex-col gap-1 border-t border-ink/10 pt-3 transition-colors hover:text-rust focus-visible:text-rust"
    >
      <span className="label">{label}</span>
      <span className="font-mono text-xs text-ink/70 transition-colors group-hover:text-rust">
        {value}
      </span>
    </a>
  );
}
