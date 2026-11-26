import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Globe2, HeartHandshake, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/home/sections";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Global Trust — Learning with As-Sabuur",
  description: "Learn about As-Sabuur's teaching approach, online availability and commitments to clear communication.",
  alternates: { canonical: "/global-trust" },
};

const icons = [BookOpen, HeartHandshake, ShieldCheck, Globe2];
export default function GlobalTrustPage() {
  return <>
    <PageHeader eyebrow="Global trust" title="Clarity, care and a steady approach" description="Families should be able to understand who they are learning with, how classes work and what to expect." crumbs={[["Global Trust", "/global-trust"]]} />
    <section className="wrap py-16 lg:py-24">
      <div className="grid gap-5 sm:grid-cols-2">
        {SITE.trustPoints.map((point, i) => { const Icon = icons[i] ?? ShieldCheck; return <article key={point} className="flex gap-4 rounded-2xl border border-ivory-200 bg-white p-6 shadow-card"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ivory-100 text-pine-800"><Icon className="h-5 w-5" /></span><p className="text-base leading-relaxed text-stone-700">{point}</p></article>; })}
      </div>
      <div className="mt-12 max-w-3xl"><h2 className="text-3xl">Teaching online, worldwide</h2><p className="mt-4 leading-relaxed text-stone-600">As-Sabuur offers online lessons to learners in different locations. Scheduling is discussed with each family, with lesson times considered in the learner’s local time zone. In-person teaching continues locally.</p><p className="mt-4 leading-relaxed text-stone-600">We do not publish invented student counts, ratings or testimonials. If you have a question about classes, fees or arrangements, please contact the academy directly.</p><Link href="/contact" className="btn btn-primary mt-7 inline-flex">Contact the academy</Link></div>
    </section><CtaBand />
  </>;
}
