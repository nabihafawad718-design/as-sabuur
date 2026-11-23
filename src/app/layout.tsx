import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://as-sabuur.com"),
  title: {
    default: "As-Sabuur.com — Luminous Online Quran Learning for Kids & Adults Worldwide",
    template: "%s · As-Sabuur.com",
  },
  description:
    "A warm, patient global online Quran learning sanctuary for kids and adults. Learn Noorani Qaida, Tajweed, Hifz, and Quranic Arabic 1-on-1 across every time zone.",
  openGraph: {
    type: "website",
    siteName: "As-Sabuur.com",
    title: "As-Sabuur.com — Global Online Quran Learning Sanctuary",
    description:
      "One-on-one live Quran classes for kids and adults worldwide, paired with interactive Tajweed guides, the 99 Names, and daily remembrance.",
    images: [{ url: "/images/sabuur-hero.jpg", width: 1200, height: 800, alt: "As-Sabuur Online Quran Learning Sanctuary" }],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <TrialProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </TrialProvider>
      </body>
    </html>
  );
}
