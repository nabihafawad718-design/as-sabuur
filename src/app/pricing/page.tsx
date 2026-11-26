import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MessageCircle, UserRound } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/home/sections";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Pricing & Lesson Fees — As-Sabuur Quran Academy",
  description:
    "Ask As-Sabuur about current fees for one-to-one online Quran lessons. Discuss lesson frequency, duration and the learner's goals before deciding.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing & Lesson Fees · As-Sabuur",
    description: "Understand how lesson arrangements are discussed and request current fee information.",
    url: `${SITE.url}/pricing`,
  },
};

const considerations = [
  {
    icon: Clock3,
    title: "Lesson length",
    text: "Tell us whether you are looking for a shorter session or more time for focused reading, Tajweed or memorisation.",
  },
  {
    icon: CalendarDays,
    title: "Weekly frequency",
    text: "Discuss how often the learner hopes to meet. We can talk through a realistic routine around school, work and family life.",
  },
  {
    icon: UserRound,
    title: "The learner’s goals",
    text: "A beginner learning Qaida may need a different lesson plan from an adult improving recitation or a student working on Hifz.",
  },
];

const included = [
  "A one-to-one conversation about the learner’s starting point",
  "Guidance on a suitable course and learning rhythm",
  "A chance to ask questions before making a decision",
  "No pressure to continue after the introductory trial",
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fees & arrangements"
        title={<>A clear conversation <span className="italic text-pine-700">before you decide.</span></>}
        description="We want families to understand the lesson arrangement before committing. Contact the academy for current fees and discuss a schedule that makes sense for the learner."
        crumbs={[["Pricing", "/pricing"]]}
      />

      <section className="wrap py-14 lg:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="eyebrow">How fees are discussed</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight text-pine-950 sm:text-4xl">
              The right lesson plan starts with the right questions.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-stone-600">
              Lesson fees depend on the arrangement discussed with the academy. Rather than showing unconfirmed package prices, we will share the current fee information directly when you enquire.
            </p>
            <div className="mt-8 space-y-4">
              {considerations.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="flex gap-4 rounded-2xl border border-ivory-200 bg-white p-5 shadow-card">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ivory-100 text-pine-800">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gold-700">0{index + 1}</p>
                    <h3 className="mt-1 font-display text-xl text-pine-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[1.75rem] bg-pine-950 p-7 text-ivory-50 shadow-lift sm:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Your next step</p>
              <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">Ask for the current fees.</h2>
              <p className="mt-4 text-sm leading-7 text-ivory-100/75">
                Tell us which course you are considering, who the lessons are for and how often you would like to study. We can explain the available arrangements and answer your questions.
              </p>
              <ul className="mt-7 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-ivory-100/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-gold mt-8 inline-flex w-full items-center justify-center gap-2 sm:w-auto">
                Contact the academy <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`mailto:${SITE.email}`} className="mt-5 flex items-center gap-2 text-sm text-ivory-100/70 transition hover:text-gold-300">
                <MessageCircle className="h-4 w-4" /> {SITE.email}
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-14 grid gap-5 border-t border-ivory-200 pt-10 md:grid-cols-3">
          <div><p className="eyebrow">01 · Explore</p><h3 className="mt-2 font-display text-2xl text-pine-950">Choose a course</h3><p className="mt-2 text-sm leading-6 text-stone-600">See the subjects available for children and adults.</p><Link href="/courses" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pine-800 hover:text-gold-700">View courses <ArrowRight className="h-4 w-4" /></Link></div>
          <div><p className="eyebrow">02 · Understand</p><h3 className="mt-2 font-display text-2xl text-pine-950">Review class details</h3><p className="mt-2 text-sm leading-6 text-stone-600">Learn how one-to-one online lessons are arranged.</p><Link href="/class-details" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pine-800 hover:text-gold-700">Class details <ArrowRight className="h-4 w-4" /></Link></div>
          <div><p className="eyebrow">03 · Begin</p><h3 className="mt-2 font-display text-2xl text-pine-950">Book a free trial</h3><p className="mt-2 text-sm leading-6 text-stone-600">Talk through the learner’s needs before choosing a plan.</p><Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pine-800 hover:text-gold-700">Book a trial <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
