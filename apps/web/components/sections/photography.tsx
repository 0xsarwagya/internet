import Image from "next/image";

import { PHOTOGRAPHS, type Photograph } from "../../content/photography";
import { Section } from "../section";

const ASPECT_H_OVER_W = 5 / 4;

export function Photography() {
  return (
    <Section id="frames" label="Frames" index="IV" className="py-24 sm:py-32 md:py-56">
      <p
        className="mb-10 max-w-xl font-serif italic text-ink/70 md:mb-16"
        style={{ fontSize: "clamp(16px, 1.6vw, 22px)", lineHeight: 1.4 }}
      >
        Not portraits. Just places I stopped walking for a moment.
      </p>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-x-8 md:gap-y-14 lg:grid-cols-3">
        {PHOTOGRAPHS.map((photograph, index) => (
          <PhotographCard
            key={photograph.file}
            photograph={photograph}
            index={index}
          />
        ))}
      </ul>
    </Section>
  );
}

function PhotographCard({
  photograph,
  index,
}: {
  photograph: Photograph;
  index: number;
}) {
  const frameNumber = (index + 1).toString().padStart(2, "0");
  return (
    <li className="block">
      <figure
        className="relative block w-full overflow-hidden border border-ink/10 bg-ink/[0.04]"
        style={{
          paddingBottom: `${ASPECT_H_OVER_W * 100}%`,
          minHeight: "260px",
        }}
      >
        <Image
          src={`/photography/${photograph.file}`}
          alt={`${photograph.subject} — ${photograph.place}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </figure>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="label">Frame {frameNumber}</span>
        <span className="font-mono text-[10px] tracking-[var(--tracking-mono)] text-ink/55">
          {photograph.meta}
        </span>
      </div>

      <p
        className="mt-3 font-serif italic text-ink/85"
        style={{ fontSize: "clamp(17px, 1.3vw, 19px)", lineHeight: 1.3 }}
      >
        {photograph.subject}
      </p>
      <span className="mt-1 block font-mono text-xs text-ink/60">
        {photograph.place}
      </span>
    </li>
  );
}
