import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className="font-serif leading-[1.05] tracking-[-0.01em]"
        style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="mt-16 font-serif leading-[1.1]"
        style={{ fontSize: "clamp(26px, 2.4vw, 34px)" }}
      >
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p
        className="font-serif text-ink/85"
        style={{ fontSize: "clamp(18px, 1.35vw, 21px)", lineHeight: 1.55 }}
      >
        {children}
      </p>
    ),
    em: ({ children }) => <em className="italic text-ink/90">{children}</em>,
    strong: ({ children }) => (
      <strong className="font-serif text-ink">{children}</strong>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="border-b border-ink/25 pb-[1px] transition-colors hover:text-rust hover:border-rust"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-ink/20 pl-6 italic text-ink/70">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
