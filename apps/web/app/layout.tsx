import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";

import "./globals.css";

import { SARWAGYA } from "@repo/seo/author";
import { JsonLd, personJsonLd, websiteJsonLd } from "@repo/seo/json-ld";
import { createSiteMetadata } from "@repo/seo/metadata";
import { SmoothScroll } from "../components/chrome/smooth-scroll";
import { Grain } from "../components/chrome/grain";
import { CursorHalo } from "../components/chrome/cursor-halo";
import { AmbientDust } from "../components/chrome/ambient-dust";
import { ShootingStar } from "../components/chrome/shooting-star";
import { ChromeIndex } from "../components/chrome/chrome-index";
import { KonamiListener } from "../components/chrome/konami-listener";
import { getAllNotes } from "../lib/margins";
import { SITE } from "../lib/site";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = createSiteMetadata(SITE, {
  keywords: [
    "Sarwagya",
    "Sarwagya Singh",
    "0xsarwagya",
    "software engineer",
    "writer",
    "software engineering",
    "security",
    "writing",
    "essays",
    "personal site",
  ],
});

const personLd = personJsonLd(SARWAGYA, {
  description:
    "Software engineer and writer from Bihar, living in Germany. Builds software, writes about engineering, and keeps notes in the margins.",
});
const websiteLd = websiteJsonLd(SITE);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const notesCount = getAllNotes().length;

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body>
        <JsonLd data={personLd} />
        <JsonLd data={websiteLd} />
        <SmoothScroll>
          <AmbientDust />
          <ShootingStar />
          <ChromeIndex notesCount={notesCount} />
          <KonamiListener />
          {children}
        </SmoothScroll>
        <Grain />
        <CursorHalo />
      </body>
    </html>
  );
}
