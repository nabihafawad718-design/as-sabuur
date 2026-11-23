import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, count, eq, ne } from "drizzle-orm";
import { ArrowRight, CalendarDays, Check, Clock3, MapPin, UserRound, Users } from "lucide-react";
import { db } from "@/db";
import { programRsvps, programs } from "@/db/schema";
import { PageHeader } from "@/components/ui/page-header";
import { RsvpForm } from "@/components/programs/rsvp-form";
import { ProgramCard } from "@/components/ui/cards";

export const dynamic = "force-dynamic";

async function getProgram(slug: string) {
  const rows = await db.select().from(programs).where(eq(programs.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return { title: "Gathering not found" };
  return {
    title: program.title,
    description: program.subtitle,
    openGraph: { images: [{ url: program.image, width: 1200, height: 800, alt: program.title }] },
  };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();

  const [[rsvpRow], related] = await Promise.all([
    db.select({ total: count() }).from(programRsvps).where(eq(programRsvps.programId, program.id)),
    db.select().from(programs).where(ne(programs.id, program.id)).orderBy(asc(programs.sortOrder)).limit(3),
  ]);

  const reserved = Number(rsvpRow?.total ?? 0);

  return (
    <>
      <PageHeader
        eyebrow={`${program.category} · ${program.format}`}
        title={
          <>
            {program.title} <span lang="ar" dir="rtl" className="font-arabic block text-3xl text-pine-700 mt-2">{program.arabicTitle}</span>
          </>
        }
        description={program.subtitle}
        crumbs={[["Gatherings", "/programs"], [program.title, `/programs/${program.slug}`]]}
      />

      <section className="wrap py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card shadow-card">
              <Image
                src={program.image}
                alt={program.title}
                fill
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8 grid gap-4 rounded-2xl border border-ivory-200 bg-white p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-2.5">
                <CalendarDays className="mt-0.5 h-4 w-4 text-gold-700" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-stone-400">Schedule</p>
                  <p className="text-xs font-semibold text-pine-950">{program.schedule}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 text-gold-700" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-stone-400">Duration</p>
                  <p className="text-xs font-semibold text-pine-950">{program.duration}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <UserRound className="mt-0.5 h-4 w-4 text-gold-700" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-stone-400">Guide</p>
                  <p className="text-xs font-semibold text-pine-950">{program.guideName}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="mt-0.5 h-4 w-4 text-gold-700" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-stone-400">Sanctuary Seats</p>
                  <p className="text-xs font-semibold text-pine-950">
                    {reserved} reserved · {program.capacity} max
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-3xl sm:text-4xl">About this circle</h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-600">{program.description}</p>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl">What to expect</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl border border-ivory-200 bg-white p-4 text-sm text-stone-700">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pine-100 text-pine-800">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl">Journey &amp; Sessions</h3>
              <div className="mt-4 space-y-3">
                {program.syllabus.map((s, i) => (
                  <div key={s.session} className="flex items-start gap-4 rounded-2xl border border-ivory-200 bg-white p-5 shadow-card">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-pine-900 font-display text-lg text-gold-300">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-pine-950">{s.session}</p>
                      <p className="mt-1 text-sm text-stone-600">{s.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <RsvpForm programId={program.id} programTitle={program.title} />
            <div className="card p-6 text-sm text-stone-600">
              <p className="flex items-center gap-2 font-semibold text-pine-950">
                <MapPin className="h-4 w-4 text-gold-700" /> {program.guideName}
              </p>
              <p className="mt-1 text-xs text-stone-500">{program.guideRole}</p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ivory-200 bg-ivory-100/60">
          <div className="wrap py-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl">Other gatherings</h2>
              <Link href="/programs" className="inline-flex items-center gap-1 text-sm font-semibold text-pine-800">
                All gatherings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <ProgramCard key={p.id} program={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
