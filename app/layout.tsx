import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { H1_PALETTE } from "@/data/h1";
import {
  PARENT_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "athlete strength and conditioning",
    "remote strength training",
    "online athletic training program",
    "speed and power training",
    "baseball strength training",
    "youth athlete training program",
    "custom workout programming",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: PARENT_NAME,
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  // The image comes from app/opengraph-image.tsx, which Next attaches here and
  // to the Twitter card automatically.
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: H1_PALETTE.ink,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

/**
 * The palette as custom properties, on `<html>` so that every rule in
 * globals.css — the `.h1c-*` readout, the hover vocabulary, the header and
 * footer links, `::selection` — reads the same source as the components.
 * Nothing in the stylesheet holds a palette hex of its own.
 */
const paletteVars = {
  "--h1c-ink": H1_PALETTE.ink,
  "--h1c-steel": H1_PALETTE.steel,
  "--h1c-chalk": H1_PALETTE.chalk,
  "--h1c-gold": H1_PALETTE.gold,
  "--h1c-gold-deep": H1_PALETTE.goldDeep,
  "--h1c-line": H1_PALETTE.line,
  "--h1c-muted": H1_PALETTE.muted,
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={paletteVars}>
      <body className={`${geistSans.className} antialiased`}>
        {/* Skip link: the first focusable thing on the page, off-screen until
            focused, so a keyboard or screen-reader user can jump past the fixed
            header straight to the content. Targets the `<main id="main-content">`
            each route renders. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold focus:outline-none focus:ring-2"
          style={{
            backgroundColor: H1_PALETTE.gold,
            color: H1_PALETTE.ink,
          }}
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
