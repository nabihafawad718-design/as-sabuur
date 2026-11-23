"use client";

import { useState } from "react";
import { Award, ChartNoAxesColumn, Globe2, HeartHandshake, Quote, Sparkles, Users } from "lucide-react";
import { studentStories } from "@/data/learning";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTrialDrawer } from "@/components/trial/trial-drawer";

const trustPillars = [
  {
    icon: Award,
    title: "Patient, Ijazah-Certified Teachers",
    text: "Hand-selected male & female scholars trained not only in Tajweed & Qira’at, but in gentle pedagogy for kids and adult beginners.",
  },
  {
    icon: Globe2,
    title: "Seamless Across Every Time Zone",
    text: "Fajr classes in Sydney, after-school sessions in London, or quiet evenings in Toronto — zero awkward conversions.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Visual Milestones & Progress Reports",
    text: "Parents and adult learners receive calm monthly summaries tracking Surah mastery, Tajweed habits, and revision consistency.",
  },
  {
    icon: HeartHandshake,
    title: "Safe, Private & Zero-Judgment",
    text: "One-to-one classrooms mean no performance anxiety. Parents are welcome beside young learners at every moment.",
  },
];

export function TrustAndWarmthSection() {
  const { openTrial } = useTrialDrawer();
  const [storyIdx, setStoryIdx] = useState(0);
  const activeStory = studentStories[storyIdx];

  return (
    <section className="relative overflow-hidden border-y border-ivory-200 bg-ivory-100/55 bg-pattern-light">
      <div className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-sage-200/50 blur-3xl animate-orb-a" />
      <div className="wrap relative py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Global Trust & Human Warmth"
            title="Built on patience — felt in every single lesson"
            description="What keeps families staying with As-Sabuur year after year is not technology alone. It is the warmth of a teacher who truly knows your name."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 90}>
              <div className="group h-full rounded-card border border-ivory-200 bg-white/90 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-100 text-pine-800 transition-colors group-hover:bg-pine-800 group-hover:text-gold-300">
                  <pillar.icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-2xl leading-tight">{pillar.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-600">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Genuine Parent & Student Stories Showcase */}
        <Reveal delay={140}>
          <div className="mt-14 grid gap-8 overflow-hidden rounded-[2rem] bg-pine-900 p-8 text-ivory-50 shadow-lift sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div key={activeStory.name} className="animate-fade-up">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
                <Quote className="h-4 w-4" /> Genuine Voices Around the World
              </div>
              <blockquote className="mt-5 font-display text-2xl italic leading-snug text-ivory-50 sm:text-3xl">
                “{activeStory.quote}”
              </blockquote>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="text-base font-semibold text-ivory-50">{activeStory.name}</p>
                  <p className="text-xs text-ivory-100/70">
                    {activeStory.location} · {activeStory.track}
                  </p>
                </div>
                <span className="rounded-full bg-gold-400/20 px-3.5 py-1.5 text-xs font-semibold text-gold-200">
                  {activeStory.badge}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-gold-300">
                Select a Family or Learner Story
              </p>
              {studentStories.map((story, i) => {
                const active = i === storyIdx;
                return (
                  <button
                    key={story.name}
                    type="button"
                    onClick={() => setStoryIdx(i)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-gold-400 bg-white/12 text-ivory-50"
                        : "border-white/10 bg-white/5 text-ivory-100/70 hover:bg-white/10"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{story.name}</p>
                      <p className="text-xs opacity-75">
                        {story.location} · {story.track}
                      </p>
                    </div>
                    <Users className={`h-4 w-4 shrink-0 ${active ? "text-gold-300" : "opacity-50"}`} />
                  </button>
                );
              })}

              <button type="button" onClick={() => openTrial()} className="btn btn-gold mt-4 w-full">
                <Sparkles className="h-4 w-4" />
                Start Your Family’s Free Trial
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
