import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { TasbihSanctuary } from "@/components/dhikr/tasbih-sanctuary";
import { CtaBand } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Dhikr & Tasbih Sanctuary",
  description: "An interactive Tasbih counter and Prophetic adhkar sanctuary for stillness, gratitude, and patience.",
};

export default function DhikrPage() {
  return (
    <>
      <PageHeader
        eyebrow="Remembrance · الذِّكْر"
        title="An unhurried Tasbih for quiet minutes"
        description="Choose a Prophetic remembrance below, set your target (33, 99, or 100), and breathe slowly with each tap."
        crumbs={[["Dhikr & Duas", "/dhikr"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <TasbihSanctuary />
      </section>
      <CtaBand
        title="Remember together at dawn"
        text="Join our daily 25-minute dawn adhkar gathering or leave a personal prayer request on the Wall of Steadfastness."
      />
    </>
  );
}
