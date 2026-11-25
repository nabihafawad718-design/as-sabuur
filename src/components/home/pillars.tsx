import { CalendarCheck, HeartHandshake, ShieldCheck, UserRound } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const PILLARS = [
  {
    icon: UserRound,
    title: "One teacher, every lesson",
    text: "Students are not passed around a pool of tutors. The person who assesses your child in the trial is the person who teaches them next month, and the month after.",
  },
  {
    icon: HeartHandshake,
    title: "Correction without harshness",
    text: "A mistake is information, not a failure. Teachers correct specifically and calmly, because a child who is afraid of being wrong stops reading aloud — and then stops improving.",
  },
  {
    icon: CalendarCheck,
    title: "A plan you can actually see",
    text: "After the trial you receive a written recommendation: the course, the weekly rhythm, and what the first month covers. Parents get a short note each month on progress.",
  },
  {
    icon: ShieldCheck,
    title: "Backed by a real teaching house",
    text: "As-Sabuur is not an online marketplace assembled last month. It is an established Quran teaching academy that already teaches in person, extending that work online.",
  },
];

export function TeachingPillars() {
  return (
    <section className="relative overflow-hidden">
      <div className="wrap py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="The teaching approach"
            title="What actually makes a Quran lesson work"
            description="Not software, not gamification, not a bigger library of videos. Four plain commitments that decide whether a student keeps going."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.6rem] border border-ivory-200 bg-ivory-200 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.title} className="group relative bg-ivory-50 p-7 transition-colors hover:bg-white sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pine-900 text-gold-300">
                  <pillar.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="numeral text-2xl text-gold-600/40">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl leading-tight">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
