import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function PricingPreview() {
  return (
    <section className="relative overflow-hidden border-y border-ivory-200 bg-ivory-100/50">
      <div className="wrap py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Fees & arrangements"
            title="Know the arrangement before you begin"
            description="Ask us for current lesson fees and talk through the learner’s goals, lesson length and weekly schedule. We will explain the options before you decide."
            action={
              <Link href="/pricing" className="btn btn-outline hidden sm:inline-flex">
                Pricing information <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-4 rounded-2xl border border-ivory-200 bg-white p-6 shadow-card">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ivory-100 text-pine-800">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl text-pine-950">No unconfirmed prices</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-600">We share current fee information directly, so you can ask questions and understand the lesson arrangement before making a commitment.</p>
            </div>
          </div>
          <Link href="/contact" className="btn btn-primary inline-flex items-center justify-center gap-2">
            <MessageCircle className="h-4 w-4" /> Ask about fees
          </Link>
        </div>
      </div>
    </section>
  );
}
