import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { COURSES } from "@/data/courses";
import { CourseArt } from "@/components/art/course-art";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookTrialButton } from "@/components/trial/trial-drawer";

export function CoursesShowcase() {
  return (
    <section id="courses" className="wrap py-20 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Courses & programs"
          title="Five courses, one steady method"
          description="Every course is taught one-to-one and paced to the student. Most learners begin with Qaida or reading; the rest are chosen once the teacher has heard them read."
          action={
            <Link href="/courses" className="btn btn-outline hidden sm:inline-flex">
              Compare all courses <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-6">
        {COURSES.map((course, idx) => {
          const large = idx < 2;
          return (
            <Reveal
              key={course.id}
              delay={idx * 70}
              className={large ? "md:col-span-3" : "md:col-span-2"}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-ivory-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                  <CourseArt
                    variant={course.art}
                    className="h-full w-full"
                    label={`Illustrated plate for the ${course.name} course`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-700">
                        {course.level}
                      </p>
                      <h3 className={`mt-1.5 leading-tight ${large ? "text-3xl" : "text-2xl"}`}>{course.name}</h3>
                    </div>
                    <span lang="ar" dir="rtl" className="font-arabic shrink-0 text-xl text-pine-700/80">
                      {course.arabic}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{course.tagline}</p>

                  <ul className="mt-4 space-y-1.5">
                    {course.outcomes.slice(0, large ? 3 : 2).map((o) => (
                      <li key={o} className="flex items-start gap-2 text-[13px] text-stone-700">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pine-600" strokeWidth={3} />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <Link
                      href={`/courses#${course.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-pine-800 hover:text-pine-950"
                    >
                      Course details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <BookTrialButton
                      className="text-xs font-semibold text-gold-700 underline decoration-gold-400/50 underline-offset-4 hover:text-gold-800"
                      goal={course.name}
                    >
                      Try it free
                    </BookTrialButton>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/courses" className="btn btn-outline w-full">
          Compare all courses <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
