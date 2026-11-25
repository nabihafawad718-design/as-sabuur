import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/amiri/400.css";
import "./globals.css";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { TrialProvider } from "@/components/trial/trial-drawer";
import { ArtDefs } from "@/components/art/defs";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Online Quran Classes for Kids & Adults · As-Sabuur",
    template: "%s · As-Sabuur",
  },
  description:
    "One-to-one online Quran classes from an established Quran teaching academy. Noorani Qaida, reading, Tajweed, Hifz and Quranic Arabic for children and adults. Free 30-minute trial, no card details.",
  keywords: [
    "online Quran classes",
    "online Quran classes for kids",
    "Quran classes for adults",
    "online Tajweed classes",
    "learn Quran online",
    "online Quran academy",
    "Noorani Qaida online",
    "online Hifz classes",
  ],
  openGraph: {
    type: "website",
    siteName: "As-Sabuur",
    locale: "en_GB",
    url: SITE.url,
    title: "Online Quran Classes for Kids & Adults · As-Sabuur",
    description:
      "One-to-one online Quran classes taught by an established Quran teaching academy. Free 30-minute trial with a written learning plan.",
    images: [
      {
        url: "/og/as-sabuur-og.png",
        width: 1200,
        height: 630,
        alt: "As-Sabuur — online Quran classes for children and adults",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Quran Classes for Kids & Adults · As-Sabuur",
    description: "One-to-one online Quran classes from an established teaching academy. Free 30-minute trial.",
    images: ["/og/as-sabuur-og.png"],
  },
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#041510",
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/og/as-sabuur-og.png`,
  description: SITE.shortDescription,
  email: SITE.email,
  areaServed: "Worldwide",
  knowsLanguage: ["en", "ar"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-pine-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ivory-50"
        >
          Skip to content
        </a>
        <TrialProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </TrialProvider>
        <ArtDefs />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </body>
    </html>
  );
}
