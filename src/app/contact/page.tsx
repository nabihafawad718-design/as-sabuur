import type { Metadata } from "next";
import { Clock3, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact & Steward Desk",
  description: "Reach the stewards of As-Sabuur Sanctuary for gatherings, spiritual counsel, hospitality, or stewardship inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Steward Desk · التَّوَاصُل"
        title="Our doors — and inbox — are open"
        description="Whether you wish to attend a circle, request private counsel, or volunteer at the courtyard, write to us below."
        crumbs={[["Contact", "/contact"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, title: "Email", line1: "salam@as-sabuur.com", line2: "Replies within one working day" },
              { icon: Clock3, title: "Courtyard Hours", line1: "Fajr through Isha daily", line2: "Dawn Circle at 05:30" },
              { icon: MapPin, title: "Gatherings", line1: "Sanctuary Courtyard & Global Audio", line2: "All are welcome" },
            ].map((c) => (
              <div key={c.title} className="card flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-pine-50 text-pine-800">
                  <c.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-semibold text-pine-950">{c.title}</p>
                  <p className="text-sm text-stone-700">{c.line1}</p>
                  <p className="text-xs text-stone-500">{c.line2}</p>
                </div>
              </div>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
