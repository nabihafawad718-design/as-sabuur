"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { divineNames, type DivineName } from "@/data/sacred";

const facets = ["All", "Forbearance", "Mercy", "Strength", "Wisdom", "Nearness"] as const;

export function NamesGallery({ initialFocus }: { initialFocus?: string }) {
  const [query, setQuery] = useState("");
  const [facet, setFacet] = useState<(typeof facets)[number]>("All");
  const initialSelected =
    divineNames.find((n) => initialFocus && n.transliteration.toLowerCase() === initialFocus.toLowerCase()) ??
    divineNames[divineNames.length - 1]; // Default to #99 As-Sabuur!
  const [selected, setSelected] = useState<DivineName>(initialSelected);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return divineNames.filter((n) => {
      const matchFacet = facet === "All" || n.facet === facet;
      const matchQuery =
        !q ||
        `${n.number} ${n.transliteration} ${n.meaning} ${n.contemplation} ${n.arabic}`.toLowerCase().includes(q);
      return matchFacet && matchQuery;
    });
  }, [query, facet]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, meaning, or number (e.g. ‘Sabuur’, ‘Peace’, ‘Lateef’)…"
              className="input !pl-11 !pr-11"
              aria-label="Search the Divine Names"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-stone-400 hover:bg-ivory-100"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by attribute facet">
            {facets.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFacet(f)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  facet === f
                    ? "border-pine-800 bg-pine-800 text-ivory-50"
                    : "border-ivory-300 bg-white text-stone-600 hover:border-pine-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {visible.map((n) => {
            const active = selected.number === n.number;
            const isCrown = n.number === 99;
            return (
              <button
                key={n.number}
                type="button"
                onClick={() => setSelected(n)}
                className={`group flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-gold-400 bg-pine-900 text-ivory-50 shadow-lift"
                    : isCrown
                      ? "border-gold-300 bg-gold-100/60 hover:border-gold-400"
                      : "border-ivory-200 bg-white hover:border-pine-400 hover:bg-pine-50/40"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        active ? "text-gold-300" : "text-gold-700"
                      }`}
                    >
                      #{n.number}
                    </span>
                    <span className={`truncate font-semibold ${active ? "text-ivory-50" : "text-pine-950"}`}>
                      {n.transliteration}
                    </span>
                  </div>
                  <p className={`mt-0.5 truncate text-xs ${active ? "text-ivory-100/75" : "text-stone-500"}`}>
                    {n.meaning}
                  </p>
                </div>
                <span
                  lang="ar"
                  dir="rtl"
                  className={`font-arabic shrink-0 text-3xl ${active ? "text-gold-300" : "text-pine-900"}`}
                >
                  {n.arabic}
                </span>
              </button>
            );
          })}
        </div>

        {visible.length === 0 && (
          <div className="card mt-6 p-10 text-center">
            <p className="font-display text-2xl">No Names match that search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFacet("All");
              }}
              className="btn btn-outline mt-4"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Focused Contemplation Panel */}
      <aside className="lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-pine-900 p-8 text-ivory-50 shadow-lift ring-1 ring-gold-400/30">
          <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-75" />
          <div className="relative">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-300">
                <Sparkles className="h-3.5 w-3.5" /> Name #{selected.number} · {selected.facet}
              </span>
            </div>

            <p lang="ar" dir="rtl" className="font-arabic mt-8 text-center text-7xl leading-none text-gold-300">
              {selected.arabic}
            </p>
            <h2 className="mt-6 text-center text-4xl text-ivory-50">{selected.transliteration}</h2>
            <p className="mt-1 text-center text-sm font-medium text-gold-200">{selected.meaning}</p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">Contemplation</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory-100/85">{selected.contemplation}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/dhikr" className="btn btn-gold flex-1 !text-sm">
                Invoke in Tasbih
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/reflections" className="btn btn-light flex-1 !text-sm">
                Offer a Dua
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
