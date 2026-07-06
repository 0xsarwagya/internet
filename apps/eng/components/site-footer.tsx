import { FooterLink } from "@0xsarwagya/ui/footer-link";

import { SITE } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1100px] px-5 pb-14 pt-24 sm:px-6 md:px-10 md:pt-32">
      <div className="hairline" />
      <div className="mt-10 grid grid-cols-12 gap-8 md:mt-14">
        <p
          className="col-span-12 font-serif italic text-ink/85 md:col-span-7"
          style={{ fontSize: "clamp(22px, 2.6vw, 36px)", lineHeight: 1.25 }}
        >
          Written to be useful. Kept to be honest.
        </p>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-4 md:col-start-9">
          <FooterLink label="Write" href={`mailto:${SITE.email}`} value={SITE.email} />
          <FooterLink label="Read" href={SITE.twitterUrl} value="@0xsarwagya" />
          <FooterLink label="Ship" href={SITE.githubUrl} value="github/0xsarwagya" />
          <a
            href="https://me.sarwagya.wtf"
            target="_blank"
            rel="me noreferrer"
            className="group flex flex-col gap-1 border-t border-ink/10 pt-3 transition-colors hover:text-rust focus-visible:text-rust"
          >
            <span className="label">Me</span>
            <span className="font-mono text-xs text-ink/70 transition-colors group-hover:text-rust">
              me.sarwagya.wtf
            </span>
          </a>
        </div>
      </div>
      <div className="mt-14 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-baseline sm:gap-6 md:mt-20">
        <span className="label">The engineering side of sarwagya.wtf</span>
        <span className="label">© {new Date().getFullYear()} · Sarwagya Singh</span>
      </div>
    </footer>
  );
}
