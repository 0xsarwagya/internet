export function Install({ package: packageName }: { package: string }) {
  return (
    <figure className="border border-ink/10 bg-ink/[0.03]">
      <figcaption className="label border-b border-ink/10 px-5 py-3">
        Install
      </figcaption>
      <div className="flex flex-col gap-2 overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-ink/90">
        <code>pnpm add {packageName}</code>
        <code className="text-ink/50"># or: npm install {packageName}</code>
      </div>
    </figure>
  );
}
