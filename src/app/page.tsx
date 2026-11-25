import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Moon, PenLine, Sparkles } from "lucide-react";
import { db } from "@/db";
import { verses } from "@/db/schema";
import { Hero } from "@/components/home/hero";
import { LearningExperienceShowcase } from "@/components/home/learning-experience";
import { CoursesShowcase } from "@/components/home/courses-showcase";
import { TeachingPillars } from "@/components/home/pillars";
import { StoryBand } from "@/components/home/story-band";
import { PricingPreview } from "@/components/home/pricing-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqBlock } from "@/components/home/faq-block";
import { CtaBand, VerseBand } from "@/components/home/sections";
import { HOME_FAQS } from "@/data/faq";
import { SITE } from "@/data/site";
import { dayOfYear } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Online Quran Classes for Kids & Adults",
  description:
    "One-to-one online Quran classes from an established Quran teaching academy. Noorani Qaida, reading, Tajweed, Hifz and Quranic Arabic. Free 30-minute trial, no card details.",
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

async function getVerse() {
  try {
    const rows = await db.select().from(verses);
    return rows.length ? rows[dayOfYear() % rows.length] : null;
  } catch {
    // The homepage should still render if the database is unavailable.
    return null;
  }
}

export default async function HomePage() {
  const verse = await getVerse();

  return (
    <>
      <Hero />
      <LearningExperienceShowcase />
      <CoursesShowcase />
      <VerseBand verse={verse} />
      <TeachingPillars />
      <StoryBand />
      <PricingPreview />
      <TestimonialsSection />
      <FaqBlock items={HOME_FAQS} />

      {/* Community: preserved routes, kept out of the main conversion path */}
      <section className="border-y border-ivory-200 bg-ivory-100/50">
        <div className="wrap grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/programs", icon: Sparkles, title: "Free gatherings", text: "Study circles and community evenings" },
            { href: "/names", icon: Moon, title: "The 99 Names", text: "Contemplate Al-Asma ul-Husna" },
            { href: "/dhikr", icon: BookOpen, title: "Dhikr & Tasbih", text: "A quiet daily remembrance counter" },
            { href: "/journal", icon: PenLine, title: "The Journal", text: "Essays on patience and learning" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 rounded-2xl border border-ivory-200 bg-white/70 p-4 transition hover:border-sage-300 hover:bg-white"
            >
              <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
              <span>
                <span className="block text-sm font-semibold text-pine-950 group-hover:text-pine-800">{item.title}</span>
                <span className="mt-0.5 block text-xs text-stone-500">{item.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />

      <p className="sr-only">
        As-Sabuur is an established Quran teaching academy offering online Quran classes for children and adults,
        including Noorani Qaida, Quran reading, Tajweed, Hifz and Quranic Arabic. Contact {SITE.email}.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
