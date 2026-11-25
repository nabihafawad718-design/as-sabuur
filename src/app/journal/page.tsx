import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { essays } from "@/db/schema";
import { EssayCard } from "@/components/ui/cards";
import { CoverArt } from "@/components/art/cover-art";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/home/sections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Sabuur Journal",
  description: "Essays and contemplative reflections on Sabrun Jameel, inner stillness, sacred architecture, and tawakkul.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const rows = await db.select().from(essays).orderBy(desc(essays.publishedAt));
  const [lead, ...rest] = rows;

  return (
    <>
      <PageHeader
        eyebrow="The Sabuur Journal · الرَّسَائِل"
        title="Quiet essays on steadfastness and sacred presence"
        description="Written to be read slowly over morning tea, without haste or distraction."
        crumbs={[["Journal", "/journal"]]}
      />

      <section className="wrap py-14 lg:py-20">
        {lead && (
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Link
              href={`/journal/${lead.slug}`}
              className="group relative block aspect-[16/10] overflow-hidden rounded-[2rem] shadow-card"
            >
              <CoverArt
                seed={lead.slug}
                className="relative h-full w-full transition duration-700 group-hover:scale-[1.03]"
                label={`Cover for ${lead.title}`}
              />
            </Link>
            <div>
              <p lang="ar" dir="rtl" className="font-arabic text-2xl text-gold-700">
                {lead.arabicEpigraph}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-pine-700">
                Featured Essay · {lead.category}
              </p>
              <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
                <Link href={`/journal/${lead.slug}`} className="hover:text-pine-800">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-600">{lead.excerpt}</p>
              <p className="mt-4 text-sm text-stone-500">
                {lead.author} · {lead.readMinutes} min read
              </p>
              <Link href={`/journal/${lead.slug}`} className="btn btn-primary mt-6">
                Read essay
              </Link>
            </div>
          </div>
        )}

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {rest.map((essay) => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
