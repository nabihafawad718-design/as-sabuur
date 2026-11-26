"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, Compass, HeartHandshake, Moon, Search, Sparkles, Users, X } from "lucide-react";
import { divineNames } from "@/data/sacred";

type CompassItem = {
  title: string;
  subtitle: string;
  href: string;
  arabic?: string;
  group: "Destinations" | "Divine Names" | "Practices";
};

const staticItems: CompassItem[] = [
  { title: "Home", subtitle: "Courses, teaching approach and the free trial", href: "/", arabic: "الرئيسية", group: "Destinations" },
  { title: "Courses & Programs", subtitle: "Qaida, reading, Tajweed, Hifz and Quranic Arabic", href: "/courses", arabic: "الدورات", group: "Destinations" },
  { title: "Pricing", subtitle: "Request current lesson fees and discuss arrangements", href: "/pricing", arabic: "الأسعار", group: "Destinations" },
  { title: "About As-Sabuur", subtitle: "Our story, teaching philosophy and standards", href: "/about", arabic: "عن الدار", group: "Destinations" },
  { title: "Contact & Free Trial", subtitle: "Book a free 30-minute class or send a question", href: "/contact", arabic: "تواصل", group: "Destinations" },
  { title: "99 Names Gallery", subtitle: "Explore Al-Asma ul-Husna and the name As-Sabuur", href: "/names", arabic: "الأسماء الحسنى", group: "Destinations" },
  { title: "Gatherings & Circles", subtitle: "Reserve a seat at a free study circle", href: "/programs", arabic: "المجالس", group: "Destinations" },
  { title: "The Journal", subtitle: "Essays on patience, learning and sacred study", href: "/journal", arabic: "الرسائل", group: "Destinations" },
  { title: "Dhikr & Tasbih", subtitle: "An interactive counter for daily remembrance", href: "/dhikr", arabic: "الذكر والدعاء", group: "Practices" },
  { title: "Dua Wall", subtitle: "Share a dua request and say Ameen for others", href: "/reflections", arabic: "جدار الدعاء", group: "Practices" },
  { title: "Support the Academy", subtitle: "Help keep community circles free to attend", href: "/support", arabic: "الوقف والعطاء", group: "Destinations" },
];

export function SanctuaryCompass({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const nameItems: CompassItem[] = divineNames.map((n) => ({
      title: `${n.number}. ${n.transliteration} — ${n.meaning}`,
      subtitle: n.contemplation,
      href: `/names?focus=${encodeURIComponent(n.transliteration)}`,
      arabic: n.arabic,
      group: "Divine Names",
    }));
    const all = [...staticItems, ...nameItems];
    if (!q) return [...staticItems.slice(0, 7), nameItems[nameItems.length - 1]];
    return all
      .filter((i) => `${i.title} ${i.subtitle} ${i.arabic ?? ""}`.toLowerCase().includes(q))
      .slice(0, 10);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-pine-950/70 px-4 pt-16 backdrop-blur-md sm:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Sanctuary Compass Navigator"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-gold-300/30 bg-ivory-50 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ivory-200 bg-white px-5 py-4">
          <Compass className="h-5 w-5 shrink-0 text-gold-600" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Navigate anywhere — e.g. ‘As-Sabuur’, ‘Dhikr’, ‘Dawn’, ‘Dua’…"
            className="w-full bg-transparent text-sm text-pine-950 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:bg-ivory-100 hover:text-pine-900"
            aria-label="Close navigator"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {items.length === 0 ? (
            <div className="py-12 text-center text-sm text-stone-500">
              <Search className="mx-auto mb-2 h-5 w-5 text-stone-400" />
              No paths match “{query}”. Try “Sabuur”, “Journal”, or “Gatherings”.
            </div>
          ) : (
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={`${item.group}-${item.title}`}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition hover:bg-pine-50"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                          {item.group}
                        </span>
                        <span className="truncate font-semibold text-pine-950">{item.title}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-stone-500">{item.subtitle}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {item.arabic && (
                        <span lang="ar" dir="rtl" className="font-arabic text-xl text-pine-800">
                          {item.arabic}
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-pine-800" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ivory-200 bg-ivory-100/70 px-5 py-3 text-[11px] text-stone-500">
          <span className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><Sparkles className="h-3 w-3 text-gold-600" /> 99 Names</span>
            <span className="inline-flex items-center gap-1"><Moon className="h-3 w-3 text-pine-700" /> Tasbih</span>
            <span className="inline-flex items-center gap-1"><Users className="h-3 w-3 text-pine-700" /> Gatherings</span>
            <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3 text-pine-700" /> Journal</span>
            <span className="inline-flex items-center gap-1"><HeartHandshake className="h-3 w-3 text-pine-700" /> Dua Wall</span>
          </span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
