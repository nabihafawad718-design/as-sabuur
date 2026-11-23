"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { courseTracks } from "@/data/learning";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTrialDrawer } from "@/components/trial/trial-drawer";

export function CoursesShowcase() {
  const { openTrial } = useTrialDrawer();

  return (
    <section id="courses" className="wrap py-20 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Structured Pathways"
          title="Four courses crafted for lasting connection"
          description="Every student moves at a calm, unhurried pace — whether opening Arabic for the very first time or refining fluent Tajweed."
          action={
            <button type="button" onClick={() => openTrial()} className="btn btn-primary hidden sm:inline-flex">
              Book Free Assessment
              <ArrowRight className="h-4 w-4" />
            </button>
          }
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {courseTracks.map((track, idx) => {
          const isDark = track.accent === "gold";
          return (
            <Reveal key={track.id} delay={idx * 90}>
              <article
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.6rem] border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${
                  isDark
                    ? "border-gold-400/50 bg-pine-900 text-ivory-50"
                    : track.accent === "sage"
                      ? "border-sage-200 bg-sage-50/75 text-pine-950"
                      : "border-ivory-200 bg-white text-pine-950 shadow-card"
                }`}
              >
                {/* Gently rotating subtle geometric corner motif */}
                <svg
                  viewBox="0 0 120 120"
                  className={`pointer-events-none -right-8 -top-8 absolute h-36 w-36 transition-transform duration-700 group-hover:rotate-45 ${
                    isDark ? "text-gold-300/15" : "text-pine-700/[0.06]"
                  }`}
                  aria-hidden="true"
                >
                  <rect x="25" y="25" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect
                    x="25"
                    y="25"
                    width="70"
                    height="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    transform="rotate(45 60 60)"
                  />
                </svg>

                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        isDark ? "bg-gold-400/20 text-gold-300" : "bg-ivory-100 text-pine-800"
                      }`}
                    >
                      {track.audience} · {track.duration}
                    </span>
                    <span
                      lang="ar"
                      dir="rtl"
                      className={`font-arabic text-2xl ${isDark ? "text-gold-300" : "text-gold-700"}`}
                    >
                      {track.arabicTitle}
                    </span>
                  </div>

                  <h3 className={`mt-5 text-3xl sm:text-4xl ${isDark ? "text-ivory-50" : ""}`}>{track.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-ivory-100/80" : "text-stone-600"}`}>
                    {track.tagline}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {track.outcomes.map((o) => (
                      <li
                        key={o}
                        className={`flex items-start gap-2.5 text-sm ${
                          isDark ? "text-ivory-100/90" : "text-stone-700"
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            isDark ? "bg-gold-400 text-pine-950" : "bg-pine-100 text-pine-800"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`relative mt-8 flex items-center justify-between gap-4 border-t pt-6 ${
                    isDark ? "border-white/10" : "border-ivory-200"
                  }`}
                >
                  <span className={`text-xs font-medium ${isDark ? "text-gold-200" : "text-stone-500"}`}>
                    1-on-1 Live · Free 30-min trial included
                  </span>
                  <button
                    type="button"
                    onClick={() => openTrial({ goal: track.goalValue })}
                    className={`btn !px-5 !py-2.5 !text-sm ${isDark ? "btn-gold" : "btn-primary"}`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Try This Course
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
