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
import { JsonLd } from "../components/json-ld";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author, url: SITE.url }],
  creator: SITE.author,
  publisher: SITE.author,
  keywords: [
    "Sarwagya",
    "Sarwagya Singh",
    "0xsarwagya",
    "software engineering",
    "security",
    "writing",
    "philosophy",
    "essays",
    "personal site",
  ],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.author,
  alternateName: ["Sarwagya", "0xsarwagya"],
  url: SITE.url,
  email: SITE.email,
  sameAs: [SITE.twitterUrl, SITE.githubUrl],
  jobTitle: "Software Engineer",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  author: { "@type": "Person", name: SITE.author, url: SITE.url },
  inLanguage: "en",
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
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
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
