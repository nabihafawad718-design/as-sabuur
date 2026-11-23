"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useTrialDrawer } from "@/components/trial/trial-drawer";
import type { verses } from "@/db/schema";

export function VerseBand({ verse }: { verse: typeof verses.$inferSelect | null }) {
  if (!verse) return null;
  return (
    <section className="relative overflow-hidden bg-pine-900 text-ivory-50">
      <div className="pointer-events-none absolute inset-0 bg-pattern-dark" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="wrap relative py-16 lg:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-300">Daily Ayah of Steadfastness</p>
          <p dir="rtl" lang="ar" className="font-arabic mt-7 text-3xl leading-[1.9] text-ivory-50 sm:text-5xl">
            {verse.arabic}
          </p>
          <p className="mt-6 font-display text-2xl italic leading-relaxed text-ivory-100/90 sm:text-3xl">
            “{verse.translation}”
          </p>
          <p className="mt-3 text-sm font-semibold text-gold-300">
            Surah {verse.surah}, Ayah {verse.ayah}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ivory-100/70">{verse.reflection}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/dhikr" className="btn btn-gold !px-6 !py-3">
              Enter Tasbih Sanctuary
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/names" className="btn btn-light !px-6 !py-3">
              Explore 99 Names
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Your first 30-minute class is our gift to you",
  text = "Meet your teacher, experience the calm pace of As-Sabuur, and walk away with a clear learning plan — zero card required.",
}: {
  title?: string;
  text?: string;
}) {
  const { openTrial } = useTrialDrawer();
  return (
    <section className="wrap py-12">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-pine-900 px-6 py-16 text-center shadow-lift sm:px-16">
        <div className="pointer-events-none absolute inset-0 bg-pattern-dark" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl animate-orb-a" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sage-300/20 blur-3xl animate-orb-b" />

        <svg
          viewBox="0 0 220 220"
          className="pointer-events-none mx-auto mb-4 h-16 w-16 text-gold-300/80 animate-motif-spin"
          aria-hidden="true"
        >
          <rect x="45" y="45" width="130" height="130" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect
            x="45"
            y="45"
            width="130"
            height="130"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            transform="rotate(45 110 110)"
          />
          <circle cx="110" cy="110" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        <div className="relative mx-auto max-w-2xl">
          <p lang="ar" dir="rtl" className="font-arabic text-3xl text-gold-300">
            وَبَشِّرِ الصَّابِرِينَ
          </p>
          <h2 className="mt-4 text-4xl text-ivory-50 sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-ivory-100/80">{text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button type="button" onClick={() => openTrial()} className="btn btn-gold !px-7 !py-4 !text-base">
              <Sparkles className="h-4 w-4" />
              Book Your Free Trial Class
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="/programs" className="btn btn-light !px-6 !py-4">
              Browse Study Circles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
