import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PLANS, perLesson } from "@/data/pricing";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookTrialButton } from "@/components/trial/trial-drawer";

const PREVIEW_IDS = ["foundations", "steady", "committed"];

export function PricingPreview() {
  const plans = PLANS.filter((p) => PREVIEW_IDS.includes(p.id));

  return (
    <section className="relative border-y border-ivory-200 bg-ivory-100/50">
      <div className="wrap py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Priced per learner, per month"
            description="Thirty-minute one-to-one lessons. No registration fee, no long-term contract, and the free trial costs nothing. The per-lesson rate falls as the weekly rhythm increases."
            action={
              <Link href="/pricing" className="btn btn-outline hidden sm:inline-flex">
                All plans &amp; discounts <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 80}>
              <div
                className={`relative flex h-full flex-col rounded-[1.5rem] border p-7 ${
                  plan.popular
                    ? "border-gold-400/60 bg-pine-950 text-ivory-50 shadow-lift"
                    : "border-ivory-200 bg-white text-pine-950 shadow-card"
                }`}
              >
                {plan.popular && (
                  <span className="absolute right-6 top-6 rounded-full bg-gold-400/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-300">
                    Most families
                  </span>
                )}
                <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${plan.popular ? "text-gold-300" : "text-gold-700"}`}>
                  {plan.name}
                </p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-5xl leading-none">${plan.monthly}</span>
                  <span className={`text-sm ${plan.popular ? "text-ivory-100/60" : "text-stone-500"}`}>/month</span>
                </div>
                <p className={`mt-1 text-xs ${plan.popular ? "text-ivory-100/60" : "text-stone-500"}`}>
                  {plan.lessonsPerMonth} lessons · {perLesson(plan)} per 30-minute lesson
                </p>

                <p className={`mt-5 text-sm leading-relaxed ${plan.popular ? "text-ivory-100/80" : "text-stone-600"}`}>
                  {plan.summary}
                </p>

                <ul className="mt-6 space-y-2">
                  {[
                    `${plan.lessonsPerWeek} lesson${plan.lessonsPerWeek > 1 ? "s" : ""} each week`,
                    "Same teacher every lesson",
                    "Monthly progress note",
                    "No contract",
                  ].map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? "text-ivory-100/85" : "text-stone-700"}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.popular ? "text-gold-300" : "text-pine-600"}`} strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <BookTrialButton
                    className={`btn w-full !py-3.5 ${plan.popular ? "btn-gold" : "btn-primary"}`}
                  >
                    Start with a free trial
                  </BookTrialButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-stone-500">
          Sibling discounts: 10% for a second learner, 15% for a third. Prepayment saves up to 15%.{" "}
          <Link href="/pricing" className="link-quiet">
            See the full pricing details
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
