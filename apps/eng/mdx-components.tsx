import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2
        className="mt-14 font-serif leading-[1.12]"
        style={{ fontSize: "clamp(24px, 2.2vw, 31px)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="mt-10 font-serif leading-[1.2]"
        style={{ fontSize: "clamp(20px, 1.7vw, 24px)" }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        className="font-body text-ink/85"
        style={{ fontSize: "clamp(17px, 1.25vw, 19px)", lineHeight: 1.65 }}
      >
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        className="flex list-disc flex-col gap-2 pl-5 font-body text-ink/85 marker:text-rust"
        style={{ fontSize: "clamp(17px, 1.25vw, 19px)", lineHeight: 1.65 }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className="flex list-decimal flex-col gap-2 pl-5 font-body text-ink/85 marker:font-mono marker:text-xs marker:text-stone"
        style={{ fontSize: "clamp(17px, 1.25vw, 19px)", lineHeight: 1.65 }}
      >
        {children}
      </ol>
    ),
    em: ({ children }) => <em className="italic text-ink/90">{children}</em>,
    strong: ({ children }) => (
      <strong className="font-medium text-ink">{children}</strong>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="border-b border-ink/25 pb-[1px] transition-colors hover:border-rust hover:text-rust"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-rust/50 pl-6 italic text-ink/70">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded-sm bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.82em] text-ink/90">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="overflow-x-auto rounded-sm border border-ink/10 bg-ink/[0.04] p-5 font-mono text-[13px] leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[13px]">
        {children}
      </pre>
    ),
    hr: () => <div className="hairline my-4" />,
    ...components,
  };
}
