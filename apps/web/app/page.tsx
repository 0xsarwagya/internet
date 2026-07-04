import type { Metadata } from "next";

import { Hero } from "../components/sections/hero";
import { Coordinates } from "../components/sections/coordinates";
import { Fragments } from "../components/sections/fragments";
import { Bookshelf } from "../components/sections/bookshelf";
import { Photography } from "../components/sections/photography";
import { Cassette } from "../components/sections/cassette";
import { Terminal } from "../components/sections/terminal";
import { Epilogue } from "../components/sections/epilogue";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <Coordinates />
      <Fragments />
      <Bookshelf />
      <Photography />
      <Cassette />
      <Terminal />
      <Epilogue />
    </main>
  );
}
