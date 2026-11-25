"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Compass, Menu, MessageCircle, Search, Sparkles, X } from "lucide-react";
import { Logo } from "./logo";
import { SanctuaryCompass } from "./compass";
import { useTrialDrawer } from "@/components/trial/trial-drawer";
import { EXPLORE_NAV, PRIMARY_NAV, SITE, whatsappHref } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const { openTrial } = useTrialDrawer();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const wa = whatsappHref("Assalamu alaykum — I'd like to ask about online Quran classes.");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
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

  useEffect(() => {
    setOpen(false);
    setExploreOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="border-b border-pine-900/10 bg-pine-950 text-[11px] text-ivory-100/80">
        <div className="wrap flex h-9 items-center justify-between gap-4">
          <p className="flex min-w-0 items-center gap-2 truncate">
            <span className="font-arabic shrink-0 text-sm text-gold-300" lang="ar" dir="rtl">
              ٱلصَّبُور
            </span>
            <span className="truncate">
              <span className="hidden sm:inline">An established Quran teaching house · </span>
              Now teaching online, worldwide
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-4">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 hover:text-gold-300 sm:inline-flex"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {SITE.whatsappDisplay}
              </a>
            )}
            <Link href="/contact" className="hover:text-gold-300">
              Free trial
            </Link>
            <Link href="/about" className="hidden hover:text-gold-300 md:inline">
              About
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

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm transition-colors hover:text-pine-900 ${
                  isActive(item.href) ? "font-semibold text-pine-900" : "font-medium text-stone-600"
                }`}
              >
                {item.label}
                {isActive(item.href) && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setExploreOpen((v) => !v)}
                aria-expanded={exploreOpen}
                className="inline-flex items-center gap-1 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-pine-900"
              >
                Explore
                <ChevronDown className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
              </button>
              {exploreOpen && (
                <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-ivory-200 bg-white p-3 shadow-lift">
                    {EXPLORE_NAV.map((item) => (
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
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={() => setCompassOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-ivory-300 bg-white/85 px-3 py-2 text-xs font-semibold text-stone-600 transition hover:border-pine-500 hover:text-pine-900"
              aria-label="Open site search"
            >
              <Compass className="h-3.5 w-3.5 text-gold-600" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="rounded bg-ivory-100 px-1.5 py-0.5 font-mono text-[10px] text-stone-500">⌘K</kbd>
            </button>
            <button type="button" onClick={() => openTrial()} className="btn btn-primary !px-5 !py-2.5 !text-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold-300" />
              Book free trial
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setCompassOpen(true)}
              aria-label="Search the site"
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
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-ivory-200 py-4 font-display text-2xl text-pine-950"
                >
                  {item.label}
                </Link>
              ))}
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Explore</p>
              {EXPLORE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-ivory-200 py-3.5 text-base text-pine-900"
                >
                  {item.title}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openTrial();
                }}
                className="btn btn-gold mt-6 w-full"
              >
                Book a free 30-minute trial
              </button>
              <a href={`mailto:${SITE.email}`} className="mt-4 text-center text-sm text-stone-500">
                {SITE.email}
              </a>
            </nav>
          </div>
        )}
      </header>

      <SanctuaryCompass open={compassOpen} onClose={() => setCompassOpen(false)} />
    </>
  );
}
