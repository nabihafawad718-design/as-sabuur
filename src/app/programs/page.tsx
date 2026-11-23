import type { Metadata } from "next";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { programs } from "@/db/schema";
import { PageHeader } from "@/components/ui/page-header";
import { ProgramBrowser } from "@/components/programs/program-browser";
import { CtaBand } from "@/components/home/sections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sacred Gatherings & Study Circles",
  description: "Reserve your seat for Tafsir circles, daily dawn adhkar, Prophetic patience lectures, and calligraphy workshops at As-Sabuur.",
};

export default async function ProgramsPage() {
  const rows = await db.select().from(programs).orderBy(asc(programs.sortOrder));

  return (
    <>
      <PageHeader
        eyebrow="Gatherings · الْمَجَالِس"
        title="Circles of remembrance, scripture, and stillness"
        description="Every gathering is offered freely in the courtyard and live online. Choose a circle below to read the syllabus and reserve your seat."
        crumbs={[["Gatherings", "/programs"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <ProgramBrowser programs={rows} />
      </section>
      <CtaBand />
    </>
  );
}
