import type { Metadata } from "next";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { DawnBand } from "@/components/art/arch";
import { CtaBand } from "@/components/home/sections";
import { FaqBlock } from "@/components/home/faq-block";
import { BookTrialButton } from "@/components/trial/trial-drawer";
import { EXTENDED_LESSONS, FAMILY_DISCOUNT, INCLUDED, PLANS, PREPAY, perLesson, prepayTotal } from "@/data/pricing";
import { PRICING_FAQS } from "@/data/faq";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Pricing — Online Quran Classes from $32/month",
  description:
    "Transparent monthly pricing for one-to-one online Quran classes: $32–$100 per month depending on weekly frequency. Family discounts, prepayment savings, free 30-minute trial.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing · As-Sabuur",
    description:
      "Monthly one-to-one online Quran classes from $32. No registration fee, no long-term contract, free trial.",
    url: `${SITE.url}/pricing`,
  },
};

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE.url}/pricing` },
  ],
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing · الْأُجُور"
        title={
          <>
            Clear monthly pricing. <span className="italic text-pine-700">No surprises.</span>
          </>
        }
        description="Thirty-minute one-to-one lessons, billed per learner per month. No registration fee, no materials fee, no long-term contract — and the first trial class is free."
        crumbs={[["Pricing", "/pricing"]]}
      />

      <div className="overflow-hidden border-b border-ivory-200">
        <DawnBand className="block h-[130px] w-full sm:h-[160px]" />
      </div>

      <section className="wrap py-14 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 60}>
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
                  {plan.lessonsPerMonth} lessons · {perLesson(plan)} per lesson
                </p>
                <p className={`mt-5 text-sm leading-relaxed ${plan.popular ? "text-ivory-100/80" : "text-stone-600"}`}>
                  {plan.summary}
                </p>
                <p className={`mt-4 text-xs ${plan.popular ? "text-ivory-100/55" : "text-stone-500"}`}>
                  <span className="font-semibold">Best for:</span> {plan.bestFor}
                </p>
                <div className="mt-auto pt-6">
                  <BookTrialButton className={`btn w-full !py-3.5 ${plan.popular ? "btn-gold" : "btn-primary"}`}>
                    Try it free first
                  </BookTrialButton>
                </div>
              </div>
            </Reveal>
          ))}

          <div className="flex h-full flex-col justify-center rounded-[1.5rem] border border-dashed border-gold-400/50 bg-gold-100/30 p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">Extended lessons</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Some students need longer sessions — usually Hifz revision or advanced Tajweed. Forty-five and
              sixty-minute lessons are available on request.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-stone-700">
              {EXTENDED_LESSONS.map((e) => (
                <li key={e.length} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  {e.length}: ${e.twiceWeekly}/mo twice weekly · ${e.fiveWeekly}/mo five times weekly
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-pine-800 underline decoration-gold-400/50 underline-offset-4">
              Ask about extended lessons
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-2.5 rounded-2xl border border-ivory-200 bg-white/70 p-4 text-xs leading-relaxed text-stone-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-pine-700" />
          <p>
            Prices are in US dollars per learner. Payment is not taken through this website: once you and the teacher
            agree a plan, enrolment and payment are arranged directly with the academy. Local currencies may be
            accepted — ask when you book.
          </p>
        </div>
      </section>

      <section className="border-y border-ivory-200 bg-ivory-100/50">
        <div className="wrap py-16 lg:py-20">
          <SectionHeading
            eyebrow="Prepayment"
            title="Save by paying for a longer term"
            description="Optional, not required. Monthly is the default; prepayment simply reduces the rate for families who already know they are staying."
          />

          <div className="mt-8 overflow-x-auto rounded-2xl border border-ivory-200 bg-white shadow-card">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-ivory-200 bg-ivory-100/70 text-xs uppercase tracking-wider text-stone-500">
                  <th className="px-4 py-3 font-semibold">Plan</th>
                  {PREPAY.map((p) => (
                    <th key={p.id} className="px-4 py-3 font-semibold">
                      {p.label}
                      {p.discount > 0 && (
                        <span className="ml-1.5 rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold text-gold-700">
                          {p.note}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLANS.map((plan) => (
                  <tr key={plan.id} className="border-b border-ivory-200 last:border-0">
                    <td className="px-4 py-3 font-semibold text-pine-950">
                      {plan.name}
                      <span className="ml-2 text-xs font-normal text-stone-500">{plan.lessonsPerMonth} lessons</span>
                    </td>
                    {PREPAY.map((p) => (
                      <td key={p.id} className="px-4 py-3 text-stone-700">
                        ${prepayTotal(plan, p.months, p.discount)}
                        <span className="ml-1 text-xs text-stone-400">
                          {p.months > 1 ? `for ${p.months} months` : "/mo"}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-stone-500">
            Totals are rounded to the nearest dollar. Prepaid terms are non-refundable except where required by law;
            the monthly option exists precisely so you do not have to commit before you are sure.
          </p>
        </div>
      </section>

      <section className="wrap py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Included" title="Every plan includes" />
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-stone-700">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pine-900 text-gold-300">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-ivory-200 bg-white p-7 shadow-card">
            <h2 className="text-3xl">Families</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Siblings usually learn best in separate lessons, at their own level. The discount applies to the second
              and third learner in the same household.
            </p>
            <ul className="mt-5 space-y-3">
              {FAMILY_DISCOUNT.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-stone-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-ivory-100/80 p-4 text-xs leading-relaxed text-stone-600">
              Example: two children on Steady ($52 each) would pay $52 + $46.80 = $98.80 per month.
            </p>
          </div>
        </div>
      </section>

      <FaqBlock
        items={PRICING_FAQS}
        eyebrow="Billing questions"
        title="Before you pay anything"
        description="The trial is free. These are the questions that usually come next."
        groupName="pricing-faq"
      />

      <CtaBand
        title="Start with the free class, decide afterwards"
        text="No card details are taken for the trial. If it is not right for your family, say so — there is nothing to cancel."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </>
  );
}
