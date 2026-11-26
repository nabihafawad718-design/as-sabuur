import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/home/sections";
import { COURSES } from "@/data/courses";

export const metadata: Metadata = {
  title: "Class Details — One-to-One Online Quran Lessons",
  description: "How As-Sabuur Quran classes work, lesson format and available subjects.",
  alternates: { canonical: "/class-details" },
};

export default function ClassDetailsPage() {
  return <>
    <PageHeader eyebrow="Class details" title="A class shaped around the student" description="Explore the lesson format, learning subjects and practical details before booking a free trial." crumbs={[["Class Details", "/class-details"]]} />
    <section className="wrap py-16 lg:py-24">
      <div className="grid gap-5 md:grid-cols-2">
        <article className="card p-7"><h2 className="text-2xl">One-to-one online lessons</h2><p className="mt-3 text-sm leading-relaxed text-stone-600">Lessons take place live online, with one teacher focused on one student. The teacher listens, models pronunciation, corrects and sets practice for the next lesson.</p></article>
        <article className="card p-7"><h2 className="text-2xl">A plan that fits the learner</h2><p className="mt-3 text-sm leading-relaxed text-stone-600">The starting point and pace depend on the student's age, experience and goals. A free trial helps identify an appropriate next step.</p></article>
      </div>
      <div className="mt-14"><h2 className="text-3xl">Subjects available</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map(course => <article key={course.id} className="rounded-2xl border border-ivory-200 bg-white p-6 shadow-card"><p className="text-xs font-semibold uppercase tracking-wider text-gold-700">{course.level}</p><h3 className="mt-2 text-xl">{course.name}</h3><p className="mt-3 text-sm leading-relaxed text-stone-600">{course.tagline}</p><Link className="mt-5 inline-flex text-sm font-semibold text-pine-800 underline-offset-4 hover:underline" href={`/courses#${course.slug}`}>Explore course</Link></article>)}
      </div></div>
      <div className="mt-12 rounded-3xl bg-pine-950 p-8 text-ivory-50 lg:p-10"><h2 className="text-3xl text-ivory-50">Not sure where to begin?</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory-100/75">Tell us a little about the learner and what they hope to study. We can discuss a suitable starting point.</p><Link href="/contact" className="btn btn-gold mt-6 inline-flex">Ask about classes</Link></div>
    </section><CtaBand />
  </>;
}
