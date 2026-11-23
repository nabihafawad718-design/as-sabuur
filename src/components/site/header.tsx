"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Compass, Menu, Moon, Search, Sparkles, X } from "lucide-react";
import { Logo } from "./logo";
import { SanctuaryCompass } from "./compass";
import { useTrialDrawer } from "@/components/trial/trial-drawer";

const nav = [
  { href: "/#experience", label: "Experience" },
  { href: "/#courses", label: "Courses" },
  { href: "/names", label: "99 Names" },
  { href: "/dhikr", label: "Dhikr" },
  { href: "/programs", label: "Gatherings" },
  { href: "/journal", label: "Journal" },
  { href: "/reflections", label: "Dua Wall" },
];

const exploreMenu = [
  { href: "/#experience", title: "Feel the Experience", desc: "Switch Kids vs Adults & try Tajweed audio cards", badge: "Interactive" },
  { href: "/#courses", title: "4 Learning Tracks", desc: "Qaida, Tajweed, Hifz & Quranic Arabic 1-on-1", badge: "Tracks" },
  { href: "/names", title: "99 Names Gallery", desc: "Contemplate Al-Asma ul-Husna & As-Sabuur", badge: "99" },
  { href: "/dhikr", title: "Tasbih & Adhkar", desc: "Interactive counter & Prophetic supplications", badge: "Live" },
  { href: "/programs", title: "Sacred Gatherings", desc: "Tafsir circles, dawn dhikr & calligraphy retreats", badge: "RSVP" },
  { href: "/reflections", title: "Wall of Steadfastness", desc: "Offer a prayer note & say Ameen together", badge: "Community" },
];

export function Header() {
  const pathname = usePathname();
  const { openTrial } = useTrialDrawer();
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 8);
  const [open, setOpen] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCompassOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="border-b border-pine-900/10 bg-pine-950 text-[11px] text-ivory-100/80">
        <div className="wrap flex h-9 items-center justify-between gap-4">
          <p className="flex items-center gap-2 truncate">
            <Moon className="h-3.5 w-3.5 shrink-0 text-gold-300" />
            <span className="font-arabic text-sm text-gold-300" lang="ar" dir="rtl">
              ٱلصَّبُور
            </span>
            <span className="hidden sm:inline">
              · Global 1-on-1 Online Quran Learning for Kids &amp; Adults Across Every Time Zone
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <Link href="/about" className="hidden hover:text-gold-300 md:inline">
              Our Scholars
            </Link>
            <Link href="/support" className="hover:text-gold-300">
              Waqf
            </Link>
            <Link href="/contact" className="hover:text-gold-300">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open
            ? "bg-ivory-50/92 shadow-[0_1px_0_0_#eadfcb] backdrop-blur-md"
            : "bg-ivory-50/80 backdrop-blur-sm"
        }`}
      >
        <div className="wrap flex h-18 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Main navigation">
            <div
              className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setExploreOpen((v) => !v)}
                aria-expanded={exploreOpen}
                className="inline-flex items-center gap-1 py-2 text-sm font-semibold text-pine-900 transition-colors hover:text-pine-700"
              >
                Explore
                <ChevronDown className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
              </button>
              {exploreOpen && (
                <div className="absolute left-0 top-full w-[540px] pt-2">
                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-ivory-200 bg-white p-3 shadow-lift">
                    {exploreMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setExploreOpen(false)}
                        className="group rounded-xl p-3 transition hover:bg-sage-50"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-pine-950 group-hover:text-pine-800">{item.title}</span>
                          <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold text-gold-700">
                            {item.badge}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-stone-500">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {nav.map((item) => {
              const active = item.href !== "/#experience" && item.href !== "/#courses" && (pathname === item.href || pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 text-sm font-medium transition-colors hover:text-pine-900 ${
                    active ? "font-semibold text-pine-800" : "text-stone-600"
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={() => setCompassOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-ivory-300 bg-white/85 px-3 py-2 text-xs font-semibold text-stone-600 transition hover:border-pine-500 hover:text-pine-900"
              aria-label="Open Sanctuary Compass navigator"
            >
              <Compass className="h-3.5 w-3.5 text-gold-600" />
              <span className="hidden xl:inline">Compass</span>
              <kbd className="rounded bg-ivory-100 px-1.5 py-0.5 font-mono text-[10px] text-stone-500">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => openTrial()}
              className="btn btn-primary !px-5 !py-2.5 !text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-300" />
              Book Free Trial
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setCompassOpen(true)}
              aria-label="Search and navigate"
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory-300 bg-white text-pine-900"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory-300 bg-white text-pine-900"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="fixed inset-x-0 bottom-0 top-[6.75rem] z-40 overflow-y-auto bg-ivory-50 lg:hidden">
            <nav className="wrap flex flex-col py-6" aria-label="Mobile navigation">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-ivory-200 py-4 font-display text-2xl text-pine-950"
              >
                Home
              </Link>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-ivory-200 py-4 font-display text-2xl text-pine-950"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-ivory-200 py-4 font-display text-2xl text-pine-950"
              >
                About &amp; Scholars
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-ivory-200 py-4 font-display text-2xl text-pine-950"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openTrial();
                }}
                className="btn btn-gold mt-6 w-full"
              >
                Book a Free Trial Class
              </button>
            </nav>
          </div>
        )}
      </header>

      <SanctuaryCompass open={compassOpen} onClose={() => setCompassOpen(false)} />
    </>
  );
}
