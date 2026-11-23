import type { Metadata } from "next";
import { BookOpen, Coffee, Compass, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PledgeForm } from "@/components/support/pledge-form";

export const metadata: Metadata = {
  title: "Support & Waqf Stewardship",
  description: "Sustain As-Sabuur Sanctuary — keeping all study circles, dawn gatherings, and sacred resources freely open.",
};

const allocations = [
  { icon: BookOpen, title: "Scholar & Teacher Stipends", text: "Supports full-time resident teachers so every study circle remains free for all." },
  { icon: Compass, title: "Sanctuary Courtyard & Audio", text: "Maintains dawn audio streaming, archive recordings, and study booklets." },
  { icon: Coffee, title: "Hospitality & Retreats", text: "Covers tea, dates, calligraphy supplies, and monthly Layali As-Sabuur evenings." },
  { icon: ShieldCheck, title: "100% Transparent Endowment", text: "Zero corporate ads, zero paywalls, and annual community stewardship reports." },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Waqf & Stewardship · الْوَقْفُ"
        title="Sustain a sanctuary that never closes its doors"
        description="Every circle, dawn gathering, and study resource at As-Sabuur is kept free of charge through quiet community stewardship."
        crumbs={[["Support", "/support"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            {allocations.map((a) => (
              <div key={a.title} className="card flex gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-pine-50 text-pine-800">
                  <a.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h2 className="text-xl">{a.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
          <PledgeForm />
        </div>
      </section>
    </>
  );
}
