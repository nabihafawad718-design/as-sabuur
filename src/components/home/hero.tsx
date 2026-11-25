import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock3, Sparkles } from "lucide-react";
import { ArchWindow } from "@/components/art/arch";
import { Rosette } from "@/components/art/geometry";
import { BookTrialButton } from "@/components/trial/trial-drawer";
import { SITE } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory-50">
      <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-gold-200/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-40 h-[26rem] w-[26rem] rounded-full bg-sage-200/40 blur-3xl" aria-hidden="true" />

      <div className="wrap relative grid items-center gap-14 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-white/100 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Online Quran classes · children &amp; adults
            </span>
          </div>

          <h1 className="mt-6 text-[2.9rem] leading-[0.98] sm:text-6xl lg:text-[4.4rem]">
            Online Quran classes,
            <span className="mt-1 block font-medium italic text-pine-700">taught one student at a time.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
            As-Sabuur is an established Quran teaching house, now teaching live one-to-one online. The same teachers,
            the same patience, the same steady method — available to families anywhere in the world.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <BookTrialButton className="btn btn-gold !px-7 !py-4 !text-base">
              <Sparkles className="h-4 w-4" />
              Book a free 30-minute trial
            </BookTrialButton>
            <Link href="/courses" className="btn btn-outline !px-6 !py-4">
              <BookOpen className="h-4 w-4" />
              Explore the courses
            </Link>
          </div>

          <ul className="mt-9 grid gap-2.5 sm:grid-cols-2">
            {SITE.trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-stone-700">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pine-100 text-pine-800">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex items-center gap-4">
            <Rosette className="h-10 w-10 shrink-0 text-gold-600/70" petals={10} />
            <p className="max-w-sm text-xs leading-relaxed text-stone-500">
              Named for <span className="font-semibold text-pine-800">As-Sabuur</span>, the Most Patient — because
              learning the Qur&rsquo;an is built on steadiness, not speed.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem]">
          <div className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-gradient-to-b from-gold-200/50 via-sage-100/40 to-transparent blur-2xl" aria-hidden="true" />

          <div className="relative">
            <ArchWindow className="grain relative aspect-[640/860] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] shadow-lift ring-1 ring-gold-500/30" />

            {/* Trial seal */}
            <div className="absolute -left-3 top-8 rounded-2xl border border-ivory-200 bg-white/95 px-4 py-3 shadow-lift backdrop-blur-sm sm:-left-6">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-700">
                <Clock3 className="h-3 w-3" /> Free first class
              </p>
              <p className="mt-1 font-display text-2xl leading-none text-pine-950">30 minutes</p>
              <p className="mt-1 text-[11px] text-stone-500">No card · no obligation</p>
            </div>

            {/* Course plan card */}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-gold-300/30 bg-pine-950/88 p-4 text-ivory-50 shadow-lift backdrop-blur-md sm:inset-x-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300">A first course</p>
                  <p className="mt-0.5 font-display text-xl leading-tight">Noorani Qaida</p>
                </div>
                <span lang="ar" dir="rtl" className="font-arabic text-2xl text-gold-300">
                  القَاعِدَة
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-ivory-100/80">
                <span className="rounded-lg bg-white/10 px-2 py-1.5">Letters</span>
                <span className="rounded-lg bg-white/10 px-2 py-1.5">Joining</span>
                <span className="rounded-lg bg-white/10 px-2 py-1.5">First surahs</span>
              </div>
              <Link
                href="/courses#noorani-qaida"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:text-gold-200"
              >
                See the full course <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
