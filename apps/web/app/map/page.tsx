import type { Metadata } from "next";

import { InternetMap } from "../../components/internet-map";
import { getOssProjects } from "../../lib/oss-projects";

export const metadata: Metadata = {
  title: "Map",
  description:
    "A map of my corner of the internet — the sites, the routes, and the shared machinery underneath.",
  alternates: { canonical: "/map" },
};

export default function MapPage() {
  const projects = getOssProjects();

  return (
    <main className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-40 pt-40 md:px-12 md:pt-56">
      <header className="mb-12">
        <span className="label">0xsarwagya/internet</span>
        <h1
          className="mt-6 font-serif leading-[0.98] tracking-[-0.02em]"
          style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
        >
          My corner of it.
        </h1>
      </header>

      <InternetMap projects={projects} />
    </main>
  );
}
