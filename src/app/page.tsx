import Link from "next/link";
import { asc, desc, eq } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import { db } from "@/db";
import { essays, programs, reflections, verses } from "@/db/schema";
import { Hero } from "@/components/home/hero";
import { LearningExperienceShowcase } from "@/components/home/learning-experience";
import { CoursesShowcase } from "@/components/home/courses-showcase";
import { TrustAndWarmthSection } from "@/components/home/trust-warmth";
import { CtaBand, VerseBand } from "@/components/home/sections";
import { EssayCard, ProgramCard, ReflectionCard } from "@/components/ui/cards";
import { Reveal } from "@/components/ui/reveal";
import { Ornament, SectionHeading } from "@/components/ui/section-heading";
import { dayOfYear } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [programRows, essayRows, reflectionRows, verseRows] = await Promise.all([
    db.select().from(programs).where(eq(programs.featured, true)).orderBy(asc(programs.sortOrder)).limit(3),
    db.select().from(essays).orderBy(desc(essays.publishedAt)).limit(3),
    db.select().from(reflections).where(eq(reflections.approved, true)).orderBy(desc(reflections.ameenCount)).limit(3),
    db.select().from(verses),
  ]);

  const verse = verseRows.length ? verseRows[dayOfYear() % verseRows.length] : null;

  return (
    <>
      {/* 1. Luminous Hero with Kinetic Text, Floating Global Learning Cards & Bold Trial CTA */}
      <Hero />

      {/* 2. Interactive "Feel the Learning Experience" (Kids vs Adults + Live Tajweed Pronunciation Cards) */}
      <LearningExperienceShowcase />

      {/* 3. Motion-Driven Signature Quran Course Cards */}
      <CoursesShowcase />

      {/* Daily Ayah Anchor */}
      <VerseBand verse={verse} />

      {/* 4. Global Trust & Human Warmth + Genuine Stories */}
      <TrustAndWarmthSection />

      {/* Live Community Circles & Journal */}
      <section className="wrap py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Community Gatherings"
            title="Complimentary live circles open to every household"
            description="Beyond 1-on-1 lessons, step into our global dawn dhikr, Tafsir circles, and Prophetic patience evenings."
            action={
              <Link href="/programs" className="btn btn-outline hidden sm:inline-flex">
                All gatherings <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programRows.map((program, i) => (
            <Reveal key={program.id} delay={i * 90}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative border-y border-ivory-200 bg-sage-50/50">
        <div className="wrap py-20 lg:py-24">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Wall of Steadfastness"
              title="Say Ameen for a brother or sister today"
              description="Our global community shares prayers, milestones, and gratitude notes across every continent."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {reflectionRows.map((item, i) => (
              <Reveal key={item.id} delay={i * 90}>
                <ReflectionCard item={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center">
            <Link href="/reflections" className="btn btn-outline">
              Visit the Dua Wall
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Ornament className="mt-8 text-gold-600" />
          </div>
        </div>
      </section>

      <section className="wrap py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="The Sabuur Journal"
            title="Essays for quiet mornings"
            description="Reflections from our resident teachers on Sabrun Jameel, stillness, and Prophetic poise."
            action={
              <Link href="/journal" className="btn btn-outline hidden sm:inline-flex">
                Read the journal <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {essayRows.map((essay, i) => (
            <Reveal key={essay.id} delay={i * 90}>
              <EssayCard essay={essay} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. Closing Luminous Free Trial Invitation */}
      <CtaBand />
    </>
  );
}
