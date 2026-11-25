import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Threshold } from "@/components/art/arch";
import { BookTrialButton } from "@/components/trial/trial-drawer";

export function StoryBand() {
  return (
    <section className="relative overflow-hidden bg-pine-950 text-ivory-100/80">
      <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-50" />
      <div className="wrap relative grid items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="order-2 lg:order-1">
          <p className="eyebrow text-gold-300">Before the website</p>
          <h2 className="mt-4 text-4xl leading-[1.05] text-ivory-50 sm:text-5xl">
            Our history is in a classroom, not a launch calendar.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ivory-100/75">
            <p>
              As-Sabuur did not begin as a website. It began as teaching: students sitting with a teacher, reading
              aloud, being corrected, coming back the next week. That work continues in person.
            </p>
            <p>
              The online programme is the same teaching, extended to families who are not within travelling distance.
              The method did not change when the classroom moved onto a screen — the teacher still listens, the student
              still reads aloud, and the correction still happens in the moment.
            </p>
            <p className="text-ivory-100/60">
              We describe this plainly because it is the honest difference between us and an academy assembled purely
              for the internet.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookTrialButton className="btn btn-gold !px-6 !py-3.5">
              Book a free trial class
            </BookTrialButton>
            <Link href="/about" className="btn btn-light !px-6 !py-3.5">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-gold-400/25">
            <Threshold className="block h-auto w-full" />
          </div>
          <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-ivory-100/40">
            Two thresholds · one house of teaching
          </p>
        </div>
      </div>
    </section>
  );
}
