export function ProjectHero({
  package: packageName,
  status,
  children,
}: {
  package?: string;
  status?: string;
  children: React.ReactNode;
}) {
  return (
    <header className="pb-6 pt-8 md:pt-16">
      <p className="label flex flex-wrap gap-x-5 gap-y-1">
        {status ? <span className="text-rust">{status}</span> : null}
        {packageName ? <span>{packageName}</span> : null}
      </p>
      <div
        className="mt-6 max-w-3xl font-serif leading-[1.02] tracking-[-0.02em] [&_p]:!m-0"
        style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
      >
        {children}
      </div>
    </header>
  );
}
