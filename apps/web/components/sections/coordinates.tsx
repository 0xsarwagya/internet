import { Section } from "../section";
import { MarginsLink } from "../margins/margins-link";

export function Coordinates() {
  return (
    <Section id="coordinates" label="Coordinates" index="I" className="py-24 sm:py-32 md:py-56">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <p
            className="font-serif text-ink/90"
            style={{ fontSize: "clamp(24px, 3.6vw, 56px)", lineHeight: 1.2 }}
          >
            Born in Bihar. Making a life somewhere between
            <span className="italic"> thoughts</span>,
            <span className="italic"> software</span>, and
            <span className="italic"> what still needs to be written</span>.
          </p>
        </div>

        <aside className="col-span-12 mt-10 space-y-6 md:col-span-4 md:col-start-9 md:mt-2 md:space-y-8">
          <MetaRow label="48°N" value="Ludwigsburg, most weeks" />
          <MetaRow label="26°N" value="Muzaffarpur, when it matters" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-ink/10 pt-3">
            <span className="label">Making</span>
            <span className="font-mono text-xs text-ink/75">
              Thoughts. Software.{" "}
              <MarginsLink tooltip="Sentences · in progress" underline>
                Sentences.
              </MarginsLink>
            </span>
          </div>
          <MetaRow label="Status" value="Second draft of everything" />
        </aside>
      </div>
    </Section>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-ink/10 pt-3">
      <span className="label">{label}</span>
      <span className="font-mono text-xs text-ink/75">{value}</span>
    </div>
  );
}
