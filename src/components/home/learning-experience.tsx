"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play, Sparkles, User, Users, Volume2 } from "lucide-react";
import { learningExperiences, tajweedSamples, type LearningMode, type TajweedSample } from "@/data/learning";
import { useTrialDrawer } from "@/components/trial/trial-drawer";

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

    // Gentle synthesized harmonic chime cadence via Web Audio API so visitors hear rhythmic pacing safely
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        sample.notesHz.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.42);
          gain.gain.setValueAtTime(0.001, now + idx * 0.42);
          gain.gain.exponentialRampToValueAtTime(0.06, now + idx * 0.42 + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.42 + 0.38);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.42);
          osc.stop(now + idx * 0.42 + 0.4);
        });
      }
    } catch {
      // Visual soundwave animation still activates cleanly if audio context is restricted
    }

    audioTimerRef.current = setTimeout(() => {
      setPlayingId(null);
    }, 2600);
  };

  return (
    <section id="experience" className="relative overflow-hidden border-y border-ivory-200 bg-sage-50/60">
      <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-gold-200/35 blur-3xl animate-orb-b" />
      <div className="wrap relative py-20 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Feel the Learning Experience</p>
            <h2 className="mt-4 text-4xl leading-[1.06] sm:text-5xl">
              Designed around how <em>you</em> feel inside the lesson
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              Toggle between our joyful Kids journey and calm Adult mentorship — and click any Tajweed sample card
              below to explore live articulation cues.
            </p>
          </div>

          {/* Interactive Kids vs Adults Switcher */}
          <div
            className="inline-flex rounded-full border border-ivory-300 bg-white p-1.5 shadow-card"
            role="tablist"
            aria-label="Choose learner experience"
          >
            {(
              [
                { id: "kids", label: "Kids (5–14)", icon: Users },
                { id: "adults", label: "Adults & Reverts", icon: User },
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
                    active
                      ? "bg-pine-800 text-ivory-50 shadow-soft"
                      : "text-stone-600 hover:text-pine-950"
                  }`}
                >
                  <tab.icon className={`h-4 w-4 ${active ? "text-gold-300" : ""}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Mode Showcase Card */}
        <div
          key={exp.id}
          className="mt-10 grid items-center gap-8 rounded-[2rem] border border-ivory-200 bg-white p-6 shadow-lift animate-fade-up sm:p-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip bg-gold-100 text-gold-700">{exp.ageTag}</span>
              <span className="chip">{exp.paceBadge}</span>
            </div>
            <h3 className="mt-5 text-3xl leading-tight sm:text-4xl">{exp.headline}</h3>
            <p className="mt-4 text-base leading-relaxed text-stone-600">{exp.summary}</p>

            {/* Visual Milestones */}
            <div className="mt-7 space-y-3">
              {exp.milestones.map((m, idx) => (
                <div
                  key={m.title}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-ivory-200 bg-ivory-50/75 p-4 transition hover:border-sage-300"
                >
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
                Try a Free {mode === "kids" ? "Kids" : "Adult"} Class
              </button>
              <span className="text-xs font-medium text-stone-500">{exp.sessionFeel}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-pine-950 shadow-card">
              <Image
                src={exp.image}
                alt={exp.imageAlt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl bg-ivory-50/92 px-4 py-2.5 text-xs font-semibold text-pine-950 backdrop-blur-sm">
                <span>{exp.sessionFeel}</span>
                <span className="text-gold-700">Live 1-on-1</span>
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

        {/* Interactive Sample Tajweed & Recitation Pronunciation Cards */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                Interactive Tajweed Soundboard
              </p>
              <h3 className="mt-1.5 text-3xl sm:text-4xl">Click a card to hear rhythm &amp; see phonetics</h3>
            </div>
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
              <Volume2 className="h-4 w-4 text-pine-700" /> Interactive pacing &amp; Makhraj guide
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
                  className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-gold-400 bg-pine-900 text-ivory-50 shadow-lift -translate-y-1"
                      : "border-ivory-200 bg-white hover:border-pine-400 hover:-translate-y-0.5 hover:shadow-card"
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
                      className={`font-arabic mt-4 text-2xl leading-relaxed ${
                        isSelected ? "text-gold-300" : "text-pine-950"
                      }`}
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

                  {/* Animated Soundwave Bars */}
                  <div className="mt-5 flex h-7 items-end gap-1" aria-hidden="true">
                    {[0.4, 0.85, 0.6, 1, 0.5, 0.9, 0.45, 0.8, 0.55, 0.75, 0.35, 0.65].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1.5 flex-1 rounded-full transition-colors ${
                          isPlaying
                            ? "wave-bar bg-gold-400"
                            : isSelected
                              ? "bg-gold-300/45"
                              : "bg-sage-200 group-hover:bg-pine-400/60"
                        }`}
                        style={{
                          height: `${Math.round(h * 100)}%`,
                          animationDelay: isPlaying ? `${i * 70}ms` : "0ms",
                        }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Phonetic Breakdown & Makhraj Strip for Selected Sample */}
          <div className="mt-5 rounded-2xl border border-ivory-200 bg-white p-6 shadow-card">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span lang="ar" dir="rtl" className="font-arabic text-2xl text-gold-700">
                    {activeSample.arabicRule}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-pine-800">
                    Makhraj: {activeSample.makhraj}
                  </span>
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
