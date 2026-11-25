"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play, Sparkles, User, Users, Volume2 } from "lucide-react";
import { learningExperiences, tajweedSamples, type LearningMode, type TajweedSample } from "@/data/learning";
import { Rosette } from "@/components/art/geometry";
import { useTrialDrawer } from "@/components/trial/trial-drawer";

const LESSON_SHAPE = [
  { minutes: "5 min", step: "Revisit the last lesson", detail: "Warm up with what is already familiar" },
  { minutes: "10 min", step: "One new thing", detail: "A letter, a rule, or a passage — modelled by the teacher" },
  { minutes: "10 min", step: "Read aloud, corrected", detail: "The student does the work; the teacher listens closely" },
  { minutes: "5 min", step: "Homework, practised once", detail: "Set together so it is understood before the lesson ends" },
];

export function LearningExperienceShowcase() {
  const { openTrial } = useTrialDrawer();
  const [mode, setMode] = useState<LearningMode>("kids");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeRuleId, setActiveRuleId] = useState<string>(tajweedSamples[0].id);
  const audioTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const exp = learningExperiences[mode];
  const activeSample = tajweedSamples.find((s) => s.id === activeRuleId) ?? tajweedSamples[0];

  useEffect(() => {
    return () => {
      if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    };
  }, []);

  const playCadence = (sample: TajweedSample) => {
    setActiveRuleId(sample.id);
    if (playingId === sample.id) {
      setPlayingId(null);
      if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
      return;
    }

    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    setPlayingId(sample.id);

    // A gentle synthesized cadence that marks the rhythm of the rule.
    // It is not a recitation recording and is labelled as a pacing guide.
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        sample.notesHz.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.42);
          gain.gain.setValueAtTime(0.001, now + idx * 0.42);
          gain.gain.exponentialRampToValueAtTime(0.05, now + idx * 0.42 + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.42 + 0.38);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.42);
          osc.stop(now + idx * 0.42 + 0.4);
        });
      }
    } catch {
      // The visual cadence still works if audio is blocked by the browser
    }

    audioTimerRef.current = setTimeout(() => setPlayingId(null), 2600);
  };

  return (
    <section id="experience" className="relative overflow-hidden border-y border-ivory-200 bg-sage-50/60">
      <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-gold-200/30 blur-3xl" />
      <div className="wrap relative py-20 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Who we teach</p>
            <h2 className="mt-4 text-4xl leading-[1.06] sm:text-5xl">
              Two learners, two very different lessons
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              A seven-year-old and a forty-year-old need different pacing, different encouragement and a different
              kind of teacher. Choose a learner below to see how the lesson changes.
            </p>
          </div>

          <div className="inline-flex rounded-full border border-ivory-300 bg-white p-1.5 shadow-card" role="tablist" aria-label="Choose learner">
            {(
              [
                { id: "kids", label: "Children", icon: Users },
                { id: "adults", label: "Adults", icon: User },
              ] as const
            ).map((tab) => {
              const active = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    active ? "bg-pine-800 text-ivory-50 shadow-soft" : "text-stone-600 hover:text-pine-950"
                  }`}
                >
                  <tab.icon className={`h-4 w-4 ${active ? "text-gold-300" : ""}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div key={exp.id} className="mt-10 grid gap-10 rounded-[2rem] border border-ivory-200 bg-white p-6 shadow-lift animate-fade-up sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip bg-gold-100 text-gold-700">{exp.ageTag}</span>
              <span className="chip">{exp.paceBadge}</span>
            </div>
            <h3 className="mt-5 text-3xl leading-tight sm:text-4xl">{exp.headline}</h3>
            <p className="mt-4 text-base leading-relaxed text-stone-600">{exp.summary}</p>

            <div className="mt-7 space-y-3">
              {exp.milestones.map((m, idx) => (
                <div key={m.title} className="flex items-start justify-between gap-4 rounded-2xl border border-ivory-200 bg-ivory-50/75 p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pine-800 text-xs font-bold text-gold-300">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-pine-950">{m.title}</p>
                      <p className="mt-0.5 text-xs text-stone-600">{m.detail}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-pine-800 shadow-xs">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openTrial({ ageGroup: mode === "kids" ? "Kid" : "Adult" })}
                className="btn btn-primary"
              >
                <Sparkles className="h-4 w-4 text-gold-300" />
                Try a free {mode === "kids" ? "children's" : "adult"} lesson
              </button>
              <span className="text-xs font-medium text-stone-500">{exp.sessionFeel}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-pine-950 p-6 text-ivory-50 shadow-card">
              <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-60" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300">
                      The shape of a lesson
                    </p>
                    <h4 className="mt-1 font-display text-2xl text-ivory-50">30 minutes, used deliberately</h4>
                  </div>
                  <Rosette className="h-12 w-12 shrink-0 text-gold-300/60" petals={12} />
                </div>
                <ol className="mt-6 space-y-4">
                  {LESSON_SHAPE.map((item, i) => (
                    <li key={item.step} className="flex gap-3.5">
                      <div className="flex flex-col items-center">
                        <span className="grid h-7 w-7 place-items-center rounded-full border border-gold-400/40 font-mono text-[10px] text-gold-300">
                          {item.minutes.replace(" min", "")}
                        </span>
                        {i < LESSON_SHAPE.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-gold-400/20" />}
                      </div>
                      <div className="pb-1">
                        <p className="text-sm font-semibold text-ivory-50">{item.step}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-ivory-100/60">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <ul className="space-y-2.5 rounded-2xl border border-ivory-200 bg-sage-50/65 p-5">
              {exp.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-pine-950">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pine-800 text-gold-300">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Tajweed, made audible</p>
              <h3 className="mt-1.5 text-3xl sm:text-4xl">Try a rule — hear the rhythm, read the cue</h3>
            </div>
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
              <Volume2 className="h-4 w-4 text-pine-700" /> A synthesized pacing guide, not a recitation recording
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tajweedSamples.map((sample) => {
              const isPlaying = playingId === sample.id;
              const isSelected = activeRuleId === sample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => playCadence(sample)}
                  aria-pressed={isPlaying}
                  className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "-translate-y-1 border-gold-400 bg-pine-900 text-ivory-50 shadow-lift"
                      : "border-ivory-200 bg-white hover:-translate-y-0.5 hover:border-pine-400 hover:shadow-card"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? "bg-gold-400/20 text-gold-300" : "bg-sage-100 text-pine-800"
                        }`}
                      >
                        {sample.surahRef}
                      </span>
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-full transition ${
                          isSelected
                            ? "bg-gold-400 text-pine-950"
                            : "bg-pine-50 text-pine-800 group-hover:bg-pine-800 group-hover:text-ivory-50"
                        }`}
                      >
                        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      </span>
                    </div>

                    <p
                      lang="ar"
                      dir="rtl"
                      className={`font-arabic mt-4 text-2xl leading-relaxed ${isSelected ? "text-gold-300" : "text-pine-950"}`}
                    >
                      {sample.arabicSample}
                    </p>
                    <p className={`mt-2 text-sm font-semibold ${isSelected ? "text-ivory-50" : "text-pine-950"}`}>
                      {sample.rule}
                    </p>
                    <p className={`mt-0.5 text-xs ${isSelected ? "text-ivory-100/75" : "text-stone-500"}`}>
                      {sample.transliteration}
                    </p>
                  </div>

                  <div className="mt-5 flex h-7 items-end gap-1" aria-hidden="true">
                    {[0.4, 0.85, 0.6, 1, 0.5, 0.9, 0.45, 0.8, 0.55, 0.75, 0.35, 0.65].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1.5 flex-1 rounded-full transition-colors ${
                          isPlaying ? "wave-bar bg-gold-400" : isSelected ? "bg-gold-300/45" : "bg-sage-200 group-hover:bg-pine-400/60"
                        }`}
                        style={{ height: `${Math.round(h * 100)}%`, animationDelay: isPlaying ? `${i * 70}ms` : "0ms" }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-ivory-200 bg-white p-6 shadow-card">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span lang="ar" dir="rtl" className="font-arabic text-2xl text-gold-700">
                    {activeSample.arabicRule}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-pine-800">{activeSample.makhraj}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{activeSample.tip}</p>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {activeSample.phoneticBreakdown.map((item) => (
                  <div key={item.part} className="rounded-xl bg-ivory-100/75 p-3">
                    <p className="font-mono text-xs font-bold text-pine-900">{item.part}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-stone-600">{item.cue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
