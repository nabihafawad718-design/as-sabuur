import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/home/sections";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "The As-Sabuur Learning Experience",
  description: "Discover the patient, one-to-one Quran learning experience at As-Sabuur.",
  alternates: { canonical: "/experience" },
};

const steps = [
  ["Begin with listening", "We start by understanding the learner's current reading, experience and goals."],
  ["Learn one-to-one", "Lessons are taught live online, with the teacher giving focused attention and correction."],
  ["Build steady progress", "A manageable learning plan and practice between lessons help make learning consistent."],
];

export default function ExperiencePage() {
  return <>
    <PageHeader eyebrow="The learning experience" title="A thoughtful way to learn the Qur’an" description="A calm, personal learning experience built around patience, clear guidance and steady practice." crumbs={[["Experience", "/experience"]]} />
    <section className="wrap py-16 lg:py-24">
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map(([title, text], i) => <article key={title} className="rounded-2xl border border-ivory-200 bg-white p-7 shadow-card">
          <p className="numeral text-3xl text-gold-600/70">0{i + 1}</p><h2 className="mt-4 text-2xl">{title}</h2><p className="mt-3 text-sm leading-relaxed text-stone-600">{text}</p>
        </article>)}
      </div>
      <div className="mt-12 rounded-3xl bg-ivory-100/70 p-8 lg:p-12">
        <p className="eyebrow">Our approach</p><h2 className="mt-3 text-3xl">Individual attention, at the learner’s pace</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-stone-600">As-Sabuur offers one-to-one online Quran learning for children and adults. The teacher listens to the student, identifies what needs attention and guides the next steps without rushing.</p>
        <Link className="btn btn-primary mt-7 inline-flex" href="/about">Read about As-Sabuur</Link>
      </div>
    </section><CtaBand />
  </>;
}
