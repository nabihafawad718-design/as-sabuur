import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/data/faq";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/data/site";

export function FaqBlock({
  items,
  eyebrow = "Questions",
  title = "Things families ask before starting",
  description = "If your question is not here, write to us — a person answers, not a template.",
  groupName = "home-faq",
}: {
  items: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
  groupName?: string;
}) {
  return (
    <section className="wrap py-20 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-7 rounded-2xl border border-ivory-200 bg-white/70 p-5">
            <p className="text-sm font-semibold text-pine-950">Still unsure?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
              Ask us directly at{" "}
              <a href={`mailto:${SITE.email}`} className="link-quiet">
                {SITE.email}
              </a>{" "}
              — or simply book the free trial and let the teacher advise you.
            </p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pine-800">
              Contact the academy <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <FaqList items={items} groupName={groupName} />
        </Reveal>
      </div>
    </section>
  );
}
