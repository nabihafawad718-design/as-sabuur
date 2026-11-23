import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { reflections } from "@/db/schema";
import { PageHeader } from "@/components/ui/page-header";
import { ReflectionsWall } from "@/components/reflections/reflections-wall";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wall of Steadfastness & Duas",
  description: "Share a dua request or reflection on Sabr, and say Ameen for fellow believers across the world.",
};

export default async function ReflectionsPage() {
  const rows = await db
    .select()
    .from(reflections)
    .where(eq(reflections.approved, true))
    .orderBy(desc(reflections.createdAt), desc(reflections.ameenCount));

  return (
    <>
      <PageHeader
        eyebrow="Wall of Steadfastness · جِدَارُ الدُّعَاء"
        title="No one carries a heavy season alone"
        description="The Prophet ﷺ taught that a Muslim’s dua for their absent sibling is answered while an angel whispers: ‘And for you the same.’"
        crumbs={[["Dua Wall", "/reflections"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <ReflectionsWall initial={rows} />
      </section>
    </>
  );
}
