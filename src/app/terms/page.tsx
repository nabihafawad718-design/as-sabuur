import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Terms of Sanctuary" };

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sanctuary Etiquette"
        title="Terms & Adab"
        description="Simple guidelines rooted in mutual respect, sincerity, and care for fellow visitors."
        crumbs={[["Terms", "/terms"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-8 text-[17px] leading-relaxed text-stone-700">
          <div>
            <h2 className="text-3xl">Etiquette of the Wall &amp; Circles</h2>
            <p className="mt-3">
              Posts on the Wall of Steadfastness and conversations in live circles must honour Islamic adab — free from
              harassment, polemics, or commercial solicitation.
            </p>
          </div>
          <div>
            <h2 className="text-3xl">Free &amp; Open Access</h2>
            <p className="mt-3">
              All essays, 99 Names reflections, and study gatherings remain free to attend. Stewardship pledges are
              voluntary contributions toward community continuity.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
