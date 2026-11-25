import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Ear, HeartHandshake, Repeat, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Threshold } from "@/components/art/arch";
import { Rosette } from "@/components/art/geometry";
import { CtaBand } from "@/components/home/sections";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About — An Established Quran Teaching House",
  description:
    "As-Sabuur is an established Quran teaching academy that taught in person before it taught online. Our story, teaching philosophy, teacher standards and commitment to children and adults.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About As-Sabuur",
    description:
      "An established Quran teaching house, now teaching one-to-one online. Our story, method and standards.",
    url: `${SITE.url}/about`,
  },
};

const PHILOSOPHY = [
  {
    icon: Ear,
    title: "Listening before correcting",
    text: "A teacher learns more in the first lesson by listening than by talking. We hear where the student actually is — which letters slip, where the breath stops, what they have been taught incorrectly — before deciding what to teach.",
  },
  {
    icon: Repeat,
    title: "Consistency over intensity",
    text: "Two short lessons every week, sustained for months, will always beat a burst of enthusiasm that ends in March. The plan is built to be kept on an ordinary, busy week.",
  },
  {
    icon: HeartHandshake,
    title: "Kindness is not softness",
    text: "High expectations and gentleness are not opposites. A student can be corrected precisely, held to a real standard, and still leave the lesson feeling encouraged rather than embarrassed.",
  },
  {
    icon: BookOpen,
    title: "Understanding the words",
    text: "Reading correctly is the beginning, not the end. Where a student is ready, we open the meaning — because a Qur'an that is understood is a Qur'an that is returned to.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About As-Sabuur · عَنِ الدَّار"
        title={
          <>
            Built around one Divine Name: <span className="font-arabic text-pine-700">ٱلصَّبُور</span>
          </>
        }
        description="As-Sabuur takes its name from the Most Patient — the One who does not rush, and does not abandon. It is a fitting name for a house of teaching, because learning the Qur'an is slow work done patiently."
        crumbs={[["About", "/about"]]}
      />

      <section className="wrap py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-gold-400/25">
              <Threshold className="block h-auto w-full" />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Rosette className="h-9 w-9 text-gold-600/70" petals={8} />
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                A house with two thresholds — the classroom and the screen
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">
              The teaching came first. The website came later.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600">
              <p>
                As-Sabuur is an established Quran teaching academy. Its work began, and continues, in person: students
                sitting with a teacher, reading aloud, being corrected, returning the following week.
              </p>
              <p>
                What you are looking at is the digital expansion of that existing teaching — not a new academy with a
                familiar name. The teachers are the academy&rsquo;s teachers. The method is the method already used in
                the classroom. What changes online is only the distance between the teacher and the student.
              </p>
              <p>
                We say this plainly because the distinction matters. Many websites in this field are storefronts that
                connect you to an unknown tutor. As-Sabuur is a teaching house that has chosen to make its teaching
                reachable beyond its own city.
              </p>
            </div>
            <div className="mt-7 rounded-2xl border border-gold-300/50 bg-gold-100/30 p-5">
              <p className="text-sm leading-relaxed text-stone-700">
                <span className="font-semibold text-pine-950">In person and online are not the same thing.</span>{" "}
                Our in-person students attend the academy&rsquo;s own classes. Our online students learn one-to-one over
                video, in their own time zone. We do not describe one group as though it were the other.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ivory-200 bg-ivory-100/60">
        <div className="wrap grid gap-6 py-14 sm:grid-cols-2 lg:py-16">
          <div className="rounded-[1.4rem] border border-ivory-200 bg-white p-7 shadow-card">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Mission</p>
            <h2 className="mt-3 text-3xl">Teach the Qur&rsquo;an properly, to anyone willing to learn.</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Properly means correct pronunciation, real understanding of the rules, and a relationship with the Book
              that outlives the lessons. Anyone means children beginning at four, adults beginning at forty, and
              reverts beginning again.
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-ivory-200 bg-pine-950 p-7 text-ivory-50 shadow-card">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">Vision</p>
            <h2 className="mt-3 text-3xl text-ivory-50">A teaching house known for patience, not marketing.</h2>
            <p className="mt-3 text-sm leading-relaxed text-ivory-100/75">
              We would rather be the academy a family recommends quietly to another family than the one with the
              loudest claims. Trust is built lesson by lesson, and it cannot be bought with a homepage.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-16 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Teaching philosophy"
            title="Four convictions that shape every lesson"
            description="These are not slogans. They decide how a teacher spends thirty minutes and how a student is spoken to."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PHILOSOPHY.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="flex h-full gap-5 rounded-[1.4rem] border border-ivory-200 bg-white p-6 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sage-100 text-pine-800">
                  <item.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-ivory-200 bg-sage-50/60">
        <div className="wrap py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Teacher standards"
                title="What we require of a teacher"
                description="We do not publish invented biographies or unverifiable credentials. We do hold every teacher to the same standards, and we describe those standards honestly."
              />
            </div>
            <ul className="space-y-4">
              {[
                "Recite accurately, with Tajweed applied rather than merely described.",
                "Explain a rule so that a seven-year-old and a seventy-year-old can both follow it.",
                "Correct without harshness. A teacher who makes a child feel small does not teach here.",
                "Prepare each lesson. The student should never be the only person who has done work between sessions.",
                "Be observed before taking their own students, and continue to be observed afterwards.",
                "Hold to the academy's safeguarding practice for teaching children online.",
              ].map((standard, i) => (
                <li key={standard} className="flex items-start gap-4 rounded-2xl border border-ivory-200 bg-white p-4">
                  <span className="numeral mt-0.5 text-sm text-gold-600">0{i + 1}</span>
                  <span className="text-sm leading-relaxed text-stone-700">{standard}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="The learning environment" title="Private, safe and observable" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone-600">
              <p>
                Every lesson is one-to-one. There is no classroom to be embarrassed in, no other student to compare
                yourself to, and no performance in front of a group.
              </p>
              <p>
                Parents are welcome to sit beside a child at any point — and for younger children we recommend it for
                the first few lessons. A parent should never have to wonder what happens in a lesson.
              </p>
              <p>
                We do not publish a student&rsquo;s name, photograph or work without written permission from a parent
                or guardian. Families share their own stories; we do not share them for them.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/courses" className="btn btn-primary">
                Explore the courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Speak to us
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "For children",
                text: "Short lessons, gentle correction, parent visibility, and a teacher matched to the child's temperament.",
              },
              {
                icon: HeartHandshake,
                title: "For adults",
                text: "Privacy, no judgement about what you do not know, and a schedule built around work and family.",
              },
              {
                icon: Ear,
                title: "For reverts",
                text: "Starting from the beginning is normal here. You will not be the first adult to learn the letters.",
              },
              {
                icon: BookOpen,
                title: "For Hifz students",
                text: "A realistic daily portion, structured revision, and honest monthly reviews rather than vague encouragement.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-ivory-200 bg-white p-5 shadow-card">
                <item.icon className="h-5 w-5 text-gold-700" strokeWidth={1.6} />
                <h3 className="mt-3 text-xl">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <CtaBand
        title="Come and see how it feels"
        text="The free trial exists so that you can judge the teaching for yourself, rather than take our word for it."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "About", item: `${SITE.url}/about` },
            ],
          }),
        }}
      />
    </>
  );
}
