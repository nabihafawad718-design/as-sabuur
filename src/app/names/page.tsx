import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { NamesGallery } from "@/components/names/names-gallery";
import { CtaBand } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "99 Names Gallery · Al-Asma ul-Husna",
  description: "Explore the Divine Names of Allah with Arabic calligraphy, meanings, and reflections on steadfastness, mercy, and peace.",
  alternates: { canonical: "/names" },
};

export default async function NamesPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Al-Asma ul-Husna"
        title={
          <>
            Know Him through <span className="font-arabic text-pine-700">ٱلْأَسْمَاءُ ٱلْحُسْنَىٰ</span> His Beautiful Names
          </>
        }
        description="Select any Name to pause in quiet reflection. Notice how As-Sabuur (#99) seals the Names with majestic forbearance and unshakeable steadiness."
        crumbs={[["99 Names", "/names"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <NamesGallery initialFocus={sp.focus} />
      </section>
      <CtaBand
        title="Turn contemplation into remembrance"
        text="Step into the interactive Tasbih & Duas sanctuary to recite Yaa Sabuur and Prophetic supplications at your own pace."
      />
    </>
  );
}
