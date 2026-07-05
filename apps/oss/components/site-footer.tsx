import { FooterLink } from "@0xsarwagya/ui/footer-link";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1100px] px-5 pb-14 pt-24 sm:px-6 md:px-10 md:pt-32">
      <div className="hairline" />
      <div className="mt-10 grid grid-cols-12 gap-8 md:mt-14">
        <p
          className="col-span-12 font-serif italic text-ink/85 md:col-span-7"
          style={{ fontSize: "clamp(22px, 2.6vw, 36px)", lineHeight: 1.25 }}
        >
          Built to be maintained.
        </p>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-4 md:col-start-9">
          <FooterLink
            label="Write"
            href="mailto:hello@sarwagya.wtf"
            value="hello@sarwagya.wtf"
          />
          <FooterLink
            label="Ship"
            href="https://github.com/0xsarwagya"
            value="github/0xsarwagya"
          />
          <FooterLink
            label="Return"
            href="https://sarwagya.wtf"
            value="sarwagya.wtf"
          />
        </div>
      </div>
      <div className="mt-14 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-baseline sm:gap-6 md:mt-20">
        <span className="label">A workshop of sarwagya.wtf</span>
        <span className="label">© {new Date().getFullYear()} · Sarwagya Singh</span>
      </div>
    </footer>
  );
}
