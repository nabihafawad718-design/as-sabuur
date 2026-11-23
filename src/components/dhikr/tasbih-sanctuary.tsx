"use client";

import { useState } from "react";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import { dhikrLibrary, type DhikrPhrase } from "@/data/sacred";

export function TasbihSanctuary() {
  const [selected, setSelected] = useState<DhikrPhrase>(dhikrLibrary[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(dhikrLibrary[0].recommended);
  const [totalSession, setTotalSession] = useState(0);

  const selectPhrase = (p: DhikrPhrase) => {
    setSelected(p);
    setTarget(p.recommended);
    setCount(0);
  };

  const increment = () => {
    setCount((c) => c + 1);
    setTotalSession((t) => t + 1);
  };

  const reset = () => setCount(0);

  const progress = Math.min(1, count / Math.max(1, target));
  const circumference = 2 * Math.PI * 116;
  const dashOffset = circumference * (1 - progress);
  const reached = count >= target;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      {/* Phrase Selection */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Choose a Remembrance</p>
        <div className="mt-4 space-y-3">
          {dhikrLibrary.map((p) => {
            const active = selected.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPhrase(p)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  active
                    ? "border-gold-400 bg-pine-900 text-ivory-50 shadow-lift"
                    : "border-ivory-200 bg-white hover:border-pine-400"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        active ? "bg-gold-400/20 text-gold-300" : "bg-pine-50 text-pine-800"
                      }`}
                    >
                      {p.occasion} · {p.recommended}×
                    </span>
                    <p className={`mt-2 font-semibold ${active ? "text-ivory-50" : "text-pine-950"}`}>
                      {p.transliteration}
                    </p>
                    <p className={`mt-1 text-xs leading-relaxed ${active ? "text-ivory-100/75" : "text-stone-500"}`}>
                      {p.meaning}
                    </p>
                  </div>
                  <span
                    lang="ar"
                    dir="rtl"
                    className={`font-arabic shrink-0 text-2xl ${active ? "text-gold-300" : "text-pine-900"}`}
                  >
                    {p.arabic}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Radial Tasbih */}
      <div className="lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-pine-950 p-8 text-center text-ivory-50 shadow-lift ring-1 ring-gold-400/35 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-70" />
          <div className="relative">
            <div className="flex items-center justify-between text-xs text-ivory-100/70">
              <span className="inline-flex items-center gap-1.5 font-semibold text-gold-300">
                <Sparkles className="h-3.5 w-3.5" /> {selected.occasion}
              </span>
              <span>Session total: {totalSession}</span>
            </div>

            <p lang="ar" dir="rtl" className="font-arabic mt-7 text-4xl leading-relaxed text-gold-300 sm:text-5xl">
              {selected.arabic}
            </p>
            <p className="mt-2 font-display text-2xl text-ivory-50">{selected.transliteration}</p>
            <p className="mx-auto mt-1 max-w-md text-xs text-ivory-100/70">{selected.meaning}</p>

            {/* Tap Bead Ring */}
            <div className="relative mx-auto my-8 grid h-64 w-64 place-items-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 260 260" aria-hidden="true">
                <circle
                  cx="130"
                  cy="130"
                  r="116"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="130"
                  cy="130"
                  r="116"
                  fill="none"
                  stroke="#d4b054"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="transition-[stroke-dashoffset] duration-300 ease-out"
                />
              </svg>
              <button
                type="button"
                onClick={increment}
                className="group absolute inset-5 flex flex-col items-center justify-center rounded-full border border-gold-400/40 bg-pine-900/90 shadow-inner transition active:scale-95 hover:bg-pine-800"
                aria-label={`Count dhikr: ${selected.transliteration}`}
              >
                <span className="font-display text-6xl text-ivory-50">{count}</span>
                <span className="mt-1 text-xs uppercase tracking-[0.18em] text-gold-300">
                  {reached ? (
                    <span className="inline-flex items-center gap-1 text-gold-200">
                      <Check className="h-3.5 w-3.5" /> Target reached
                    </span>
                  ) : (
                    `of ${target}`
                  )}
                </span>
                <span className="mt-3 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-ivory-100/80 transition group-hover:bg-gold-400 group-hover:text-pine-950">
                  Tap to remember
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {[33, 99, 100].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTarget(t)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    target === t ? "bg-gold-400 text-pine-950" : "border border-white/20 text-ivory-100/75 hover:bg-white/10"
                  }`}
                >
                  Target {t}
                </button>
              ))}
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-ivory-100/75 transition hover:bg-white/10"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
