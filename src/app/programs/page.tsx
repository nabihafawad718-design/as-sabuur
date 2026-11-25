import type { Metadata } from "next";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { programs } from "@/db/schema";
import { PageHeader } from "@/components/ui/page-header";
import { ProgramBrowser } from "@/components/programs/program-browser";
import { CtaBand } from "@/components/home/sections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gatherings & Study Circles",
  description:
    "Study circles and community evenings at As-Sabuur. Read the syllabus for each gathering and reserve a seat; we confirm the details by email.",
  alternates: { canonical: "/programs" },
};

export default async function ProgramsPage() {
  const rows = await db.select().from(programs).orderBy(asc(programs.sortOrder));

  return (
    <>
      <PageHeader
        eyebrow="Gatherings · الْمَجَالِس"
        title="Circles of remembrance, scripture, and stillness"
        description="Choose a circle below to read its syllabus and reserve a seat. Each listing shows the schedule, format and who is teaching; we confirm the details with you by email before the first session."
        crumbs={[["Gatherings", "/programs"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <ProgramBrowser programs={rows} />
      </section>
      <CtaBand />
    </>
  );
}
