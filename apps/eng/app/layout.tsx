import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Newsreader } from "next/font/google";

import "./globals.css";

import { JsonLd } from "../components/json-ld";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author, url: SITE.mainSiteUrl }],
  creator: SITE.author,
  publisher: SITE.author,
  keywords: [
    "Sarwagya Singh",
    "0xsarwagya",
    "software engineer",
    "security engineering",
    "systems engineering",
    "engineering blog",
    "long-form engineering writing",
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
  url: SITE.mainSiteUrl,
  email: SITE.email,
  sameAs: [SITE.twitterUrl, SITE.githubUrl, SITE.mainSiteUrl],
  jobTitle: "Software Engineer",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  author: { "@type": "Person", name: SITE.author, url: SITE.mainSiteUrl },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${newsreader.variable} ${geistMono.variable}`}
    >
      <body>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
