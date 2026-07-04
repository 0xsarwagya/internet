import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Newsreader } from "next/font/google";

import "./globals.css";

import { SARWAGYA } from "@repo/seo/author";
import { JsonLd, personJsonLd, websiteJsonLd } from "@repo/seo/json-ld";
import { createSiteMetadata } from "@repo/seo/metadata";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
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

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = createSiteMetadata(SITE, {
  keywords: [
    "Sarwagya Singh",
    "0xsarwagya",
    "software engineer",
    "security engineering",
    "systems engineering",
    "software architecture",
    "engineering blog",
    "long-form engineering writing",
  ],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#14120f" },
  ],
};

const personLd = personJsonLd(SARWAGYA, {
  jobTitle: "Full Stack Engineer",
  worksFor: { "@type": "Organization", name: "ACTIMI" },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Technical University of Munich",
    },
    { "@type": "CollegeOrUniversity", name: "Universität des Saarlandes" },
  ],
});
const websiteLd = websiteJsonLd(SITE);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${newsreader.variable} ${geistMono.variable}`}
    >
      <body>
        <JsonLd data={personLd} />
        <JsonLd data={websiteLd} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
