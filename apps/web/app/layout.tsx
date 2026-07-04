import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";

import "./globals.css";

import { SmoothScroll } from "../components/chrome/smooth-scroll";
import { Grain } from "../components/chrome/grain";
import { CursorHalo } from "../components/chrome/cursor-halo";
import { AmbientDust } from "../components/chrome/ambient-dust";
import { ShootingStar } from "../components/chrome/shooting-star";
import { ChromeIndex } from "../components/chrome/chrome-index";
import { KonamiListener } from "../components/chrome/konami-listener";
import { getAllNotes } from "../lib/margins";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://sarwagya.wtf"),
  title: {
    default: "Sarwagya",
    template: "%s — Sarwagya",
  },
  description:
    "Building things that outlive the excitement that created them.",
  openGraph: {
    title: "Sarwagya",
    description:
      "Building things that outlive the excitement that created them.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

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
