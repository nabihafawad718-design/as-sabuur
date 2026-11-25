import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock3, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CourseArt } from "@/components/art/course-art";
import { ArchGallery } from "@/components/art/arch";
import { CtaBand } from "@/components/home/sections";
import { BookTrialButton } from "@/components/trial/trial-drawer";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { COURSES, planFor } from "@/data/courses";
import { perLesson } from "@/data/pricing";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Courses — Qaida, Tajweed, Hifz & Quranic Arabic",
  description:
    "Compare As-Sabuur's five online Quran courses: Noorani Qaida, Quran reading, Tajweed, Hifz and Quranic Arabic. Who each is for, what students learn, lesson structure and pricing.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "Courses & Programs · As-Sabuur",
    description:
      "Five one-to-one online Quran courses for children and adults, taught by an established Quran teaching academy.",
    url: `${SITE.url}/courses`,
  },
};

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE.url}/courses` },
  ],
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Online Quran courses",
  itemListElement: COURSES.map((course, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: course.name,
      description: course.tagline,
      url: `${SITE.url}/courses#${course.slug}`,
      inLanguage: "en",
      provider: {
        "@type": "EducationalOrganization",
        name: SITE.legalName,
        url: SITE.url,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
      },
    },
  })),
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Courses & programs"
        title={
          <>
            Five courses. <span className="italic text-pine-700">One steady method.</span>
          </>
        }
        description="Which course you start with matters less than starting in the right place. Below is exactly who each course is for, what it covers, and how the lessons run — so you can choose honestly, or let the trial lesson decide for you."
        crumbs={[["Courses", "/courses"]]}
      />

      <div className="overflow-hidden border-b border-ivory-200">
        <ArchGallery className="block h-[180px] w-full sm:h-[240px]" />
      </div>

      {/* Quick chooser */}
      <section className="wrap py-14 lg:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Starting from the very beginning",
              text: "Cannot yet read Arabic letters, or wants to start again properly.",
              href: "#noorani-qaida",
              link: "Begin with Noorani Qaida",
            },
            {
              title: "Already reads, wants to read well",
              text: "Can read words but hesitates, or wants correct Tajweed.",
              href: "#tajweed",
              link: "Look at Tajweed",
            },
            {
              title: "Ready to memorise, or to understand",
              text: "Reads fluently and wants Hifz or the meaning of the words.",
              href: "#hifz",
              link: "See Hifz and Arabic",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-ivory-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">Where to begin</p>
              <h2 className="mt-2 text-2xl leading-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pine-800">
                {item.link} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Course sections */}
      <div className="space-y-0">
        {COURSES.map((course, index) => {
          const plan = planFor(course);
          const dark = index % 2 === 1;
          return (
            <section
              key={course.id}
              id={course.slug}
              className={`scroll-mt-28 border-t border-ivory-200 ${dark ? "bg-ivory-100/50" : "bg-ivory-50"}`}
            >
              <div className="wrap py-16 lg:py-20">
                <Reveal>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="numeral text-sm text-gold-600">0{index + 1}</span>
                        <span className="h-px w-10 bg-gold-400/50" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">
                          {course.level} · {course.ages}
                        </span>
                      </div>
                      <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">{course.name}</h2>
                    </div>
                    <span lang="ar" dir="rtl" className="font-arabic text-3xl text-pine-700/80">
                      {course.arabic}
                    </span>
                  </div>
                </Reveal>

                <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                  <Reveal>
                    <div className="overflow-hidden rounded-[1.4rem] border border-ivory-200 shadow-card">
                      <CourseArt
                        variant={course.art}
                        className="block h-full w-full"
                        label={`Illustrated plate for the ${course.name} course`}
                      />
                    </div>
                    <div className="mt-4 grid gap-2.5 rounded-2xl border border-ivory-200 bg-white/70 p-5">
                      <p className="flex items-start gap-2 text-sm text-stone-700">
                        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-pine-700" />
                        <span>
                          <span className="font-semibold text-pine-950">Typical pace: </span>
                          {course.typicalPace}
                        </span>
                      </p>
                      <p className="text-xs leading-relaxed text-stone-500">
                        Pace is an observation from teaching, not a guarantee. Students progress at different rates,
                        and the monthly review adjusts the plan accordingly.
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={80}>
                    <p className="text-lg leading-relaxed text-stone-600">{course.tagline}</p>

                    <div className="mt-7 grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="text-xl">Who it is for</h3>
                        <ul className="mt-3 space-y-2">
                          {course.whoFor.map((w) => (
                            <li key={w} className="flex items-start gap-2 text-sm text-stone-700">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl">What students learn</h3>
                        <ul className="mt-3 space-y-2">
                          {course.learn.map((l) => (
                            <li key={l} className="flex items-start gap-2 text-sm text-stone-700">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pine-600" strokeWidth={3} />
                              {l}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-7">
                      <h3 className="text-xl">What a student should be able to do</h3>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {course.outcomes.map((o) => (
                          <li key={o} className="rounded-xl border border-ivory-200 bg-white/80 px-3.5 py-2.5 text-sm text-stone-700">
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>

                <div className="mt-10 grid gap-6 rounded-[1.4rem] border border-ivory-200 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
                  <div>
                    <h3 className="text-xl">How the lessons run</h3>
                    <ul className="mt-3 space-y-1.5">
                      {course.format.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pine-600" strokeWidth={3} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl">Inside one lesson</h3>
                    <ul className="mt-3 space-y-2">
                      {course.structure.map((s) => (
                        <li key={s.step} className="flex gap-3 text-sm">
                          <span className="w-12 shrink-0 font-mono text-[11px] font-semibold text-gold-700">{s.minutes}</span>
                          <span className="text-stone-600">{s.step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-pine-950 p-5 text-ivory-50 lg:w-56">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-300">Recommended plan</p>
                    <p className="mt-1 font-display text-2xl">{plan.name}</p>
                    <p className="mt-1 text-xs text-ivory-100/70">
                      {plan.lessonsPerMonth} lessons/month · {perLesson(plan)} each
                    </p>
                    <p className="mt-2 font-display text-3xl text-ivory-50">${plan.monthly}<span className="text-sm text-ivory-100/60">/mo</span></p>
                    <BookTrialButton className="btn btn-gold mt-4 w-full !py-2.5 !text-xs" goal={course.name}>
                      Try this course free
                    </BookTrialButton>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Comparison */}
      <section className="wrap py-16 lg:py-20">
        <SectionHeading
          eyebrow="At a glance"
          title="Compare the five courses"
          description="A quick reference. The trial lesson is the reliable way to choose — a teacher who has heard the student read knows more than a table."
        />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-ivory-200 bg-white shadow-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-ivory-200 bg-ivory-100/70 text-xs uppercase tracking-wider text-stone-500">
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Ages</th>
                <th className="px-4 py-3 font-semibold">Typical pace</th>
                <th className="px-4 py-3 font-semibold">Plan</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((c) => {
                const plan = planFor(c);
                return (
                  <tr key={c.id} className="border-b border-ivory-200 last:border-0">
                    <td className="px-4 py-3 font-semibold text-pine-950">
                      <a href={`#${c.slug}`} className="hover:text-pine-700">
                        {c.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{c.level}</td>
                    <td className="px-4 py-3 text-stone-600">{c.ages}</td>
                    <td className="px-4 py-3 text-stone-600">{c.typicalPace}</td>
                    <td className="px-4 py-3 text-stone-600">
                      {plan.name} · ${plan.monthly}/mo
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-stone-500">
          Prices are per learner in USD. See{" "}
          <Link href="/pricing" className="link-quiet">
            full pricing
          </Link>{" "}
          for family and prepayment discounts.
        </p>
      </section>

      <TestimonialsSection />

      <section className="wrap pb-16">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold-300/50 bg-gold-100/40 p-8 text-center">
          <Sparkles className="h-5 w-5 text-gold-700" />
          <h2 className="text-3xl">Not sure which course fits?</h2>
          <p className="max-w-xl text-sm leading-relaxed text-stone-600">
            Book the free trial and say so. The teacher will listen to the student read, then recommend the right
            starting point in writing — including if the answer is &ldquo;none of these yet&rdquo;.
          </p>
          <BookTrialButton className="btn btn-primary !px-6 !py-3.5">Book the free trial</BookTrialButton>
        </div>
      </section>

      <CtaBand />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
    </>
  );
}
