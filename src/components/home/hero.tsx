"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Globe2, Heart, Play, ShieldCheck, Sparkles, Star } from "lucide-react";
import { globalZones } from "@/data/learning";
import { useTrialDrawer } from "@/components/trial/trial-drawer";

export function Hero() {
  const { openTrial } = useTrialDrawer();
  const [zoneIdx, setZoneIdx] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setZoneIdx((i) => (i + 1) % globalZones.length);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrollY(Math.min(180, window.scrollY));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const currentZone = globalZones[zoneIdx];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory-50 via-sage-50/45 to-ivory-50">
      {/* Drifting Ambient Light Orbs */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-gold-200/45 blur-3xl animate-orb-a"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 top-24 h-[32rem] w-[32rem] rounded-full bg-sage-200/55 blur-3xl animate-orb-b"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-pine-200/30 blur-3xl animate-orb-a"
        aria-hidden="true"
      />

      {/* Gently Rotating Subtle Geometric Motifs */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-28 -top-24 h-[30rem] w-[30rem] text-pine-700/[0.06] animate-motif-spin"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="85" y="85" width="230" height="230" />
          <rect x="85" y="85" width="230" height="230" transform="rotate(45 200 200)" />
          <circle cx="200" cy="200" r="165" strokeDasharray="6 8" />
          <circle cx="200" cy="200" r="92" />
        </g>
      </svg>

      <svg
        viewBox="0 0 320 320"
        className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 text-gold-600/[0.08] animate-motif-reverse"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="65" y="65" width="190" height="190" />
          <rect x="65" y="65" width="190" height="190" transform="rotate(45 160 160)" />
          <circle cx="160" cy="160" r="136" />
        </g>
      </svg>

      <div className="wrap relative grid items-center gap-12 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:py-22">
        {/* Left: Kinetic Typography & Bold Free-Trial Invitation */}
        <div>
          <div className="kinetic-line inline-flex items-center gap-3 rounded-full border border-gold-300/80 bg-white/85 px-4 py-1.5 shadow-soft backdrop-blur-sm">
            <span lang="ar" dir="rtl" className="font-arabic text-lg text-pine-900">
              ٱلصَّبُورُ
            </span>
            <span className="h-3.5 w-px bg-ivory-300" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">
              Global 1-on-1 Online Quran Sanctuary
            </span>
          </div>

          <h1 className="mt-6 text-5xl leading-[0.98] sm:text-6xl lg:text-[4.55rem]">
            <span className="kinetic-line block [animation-delay:80ms]">
              Learn the Qur’an with{" "}
              <em className="font-medium italic text-pine-700">patient</em> hearts,
            </span>
            <span className="kinetic-line mt-1 block [animation-delay:200ms]">
              from anywhere on earth.
            </span>
          </h1>

          <p className="kinetic-line mt-6 max-w-xl text-lg leading-relaxed text-stone-600 [animation-delay:320ms]">
            Named after <strong>As-Sabuur</strong> — <em>The Most Patient &amp; Steadfast</em> — our sanctuary pairs
            children and adults worldwide with certified, deeply caring 1-on-1 teachers in Qaida, Tajweed, Hifz, and
            Quranic Arabic.
          </p>

          <div className="kinetic-line mt-8 flex flex-wrap items-center gap-4 [animation-delay:420ms]">
            <button type="button" onClick={() => openTrial()} className="btn btn-gold !px-7 !py-4 !text-base">
              <Sparkles className="h-4 w-4" />
              Book a Free Trial Class
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="#experience" className="btn btn-outline !px-6 !py-4">
              <Play className="h-4 w-4 fill-pine-800 text-pine-800" />
              Feel the Learning Experience
            </Link>
          </div>

          <div className="kinetic-line mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-600 [animation-delay:520ms]">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-pine-700" />
              Free 30-min trial · No card needed
            </span>
            <span className="inline-flex items-center gap-2">
              <Heart className="h-4 w-4 text-gold-600" />
              Male &amp; female certified tutors
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-pine-700" />
              35+ countries · All time zones
            </span>
          </div>

          {/* Subtle Social Proof Strip */}
          <div className="kinetic-line mt-9 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-ivory-200 bg-white/85 px-5 py-3.5 shadow-card backdrop-blur-sm [animation-delay:620ms]">
            <div className="flex items-center gap-1 text-gold-500">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <p className="text-xs font-medium text-stone-600">
              <strong className="text-pine-950">4.95 / 5</strong> rating from families in London, Toronto, Houston,
              Dubai &amp; Sydney
            </p>
          </div>
        </div>

        {/* Right: Parallax Floating Visual Cards Showing Real-World Global Learning Moments */}
        <div
          className="relative mx-auto w-full max-w-lg lg:min-h-[540px]"
          style={{ transform: `translate3d(0, ${-scrollY * 0.08}px, 0)` }}
        >
          {/* Central Luminous Arch Frame — Child Smiling During 1-on-1 Session */}
          <div className="relative mx-auto w-[86%] sm:w-[82%] animate-fade-up [animation-delay:160ms]">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-gold-300/45 via-sage-200/45 to-pine-200/35 blur-2xl" />
            <div className="arch relative aspect-[4/4.6] overflow-hidden bg-pine-950 shadow-lift ring-1 ring-gold-300/80">
              <Image
                src="/images/learn-kid-laptop.jpg"
                alt="Young child smiling happily during a live 1-on-1 online Quran session"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 85vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/15 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-gold-300/30 bg-pine-950/82 p-4 text-ivory-50 backdrop-blur-md">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    1-on-1 Kids Session
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-ivory-100">London · 16:30</span>
                </div>
                <p className="mt-1.5 font-display text-xl leading-snug text-ivory-50">
                  “Look Mama, I read the whole line myself!”
                </p>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Adult Practicing Tajweed Peacefully */}
          <div
            className="mt-5 animate-float-delayed rounded-2xl border border-ivory-200 bg-white/95 p-3 shadow-lift backdrop-blur-md sm:absolute sm:-left-6 sm:top-8 sm:mt-0 sm:w-60"
            style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/images/learn-adult-tajweed.jpg"
                  alt="Adult learner practicing Quran Tajweed peacefully at home"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="inline-block rounded-full bg-sage-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pine-800">
                  Adults · Calm Pace
                </span>
                <p className="mt-1 truncate text-xs font-bold text-pine-950">Tajweed &amp; Tarteel</p>
                <p className="truncate text-[11px] text-stone-500">Toronto · Private 1-on-1</p>
              </div>
            </div>
          </div>

          {/* Floating Card 3: Live Time-Zone Harmony Across Continents */}
          <div
            className="mt-4 animate-float rounded-2xl border border-gold-300/45 bg-pine-900 p-4 text-ivory-50 shadow-lift sm:absolute sm:-right-4 sm:bottom-24 sm:mt-0 sm:w-64"
            style={{ transform: `translate3d(0, ${-scrollY * 0.04}px, 0)` }}
          >
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-gold-300">
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5" /> Live Time-Zone Harmony
              </span>
              <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            </div>
            <div key={currentZone.city} className="mt-2.5 animate-fade-up">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-2xl text-ivory-50">{currentZone.city}</p>
                <p className="font-mono text-xs text-gold-300">
                  {currentZone.time} {currentZone.zone}
                </p>
              </div>
              <p className="mt-0.5 text-xs text-ivory-100/75">{currentZone.session}</p>
            </div>
            <div className="mt-3 flex gap-1">
              {globalZones.map((z, idx) => (
                <span
                  key={z.city}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    idx === zoneIdx ? "bg-gold-400" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
