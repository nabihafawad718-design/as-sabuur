import type { Metadata } from "next";
import { BookOpen, Coffee, Compass, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PledgeForm } from "@/components/support/pledge-form";

export const metadata: Metadata = {
  title: "Support the Academy",
  description:
    "Support As-Sabuur's free community circles and assisted places. Lessons are paid for; the academy's community teaching is funded by voluntary pledges.",
  alternates: { canonical: "/support" },
};

const allocations = [
  {
    icon: BookOpen,
    title: "Assisted places",
    text: "Contributes towards lessons for families who genuinely cannot afford the full monthly fee.",
  },
  {
    icon: Compass,
    title: "Free community circles",
    text: "Covers the running costs of the gatherings and study circles that remain open to everyone at no charge.",
  },
  {
    icon: Coffee,
    title: "Teacher time",
    text: "Funds preparation time, materials and the additional teaching hours that community classes require.",
  },
  {
    icon: ShieldCheck,
    title: "Plain records",
    text: "Every pledge is recorded with a reference. Ask at any time for a summary of what was received and where it went.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support · الْوَقْف"
        title="Keep the community teaching open"
        description="As-Sabuur's one-to-one lessons are paid for by the families who take them. Its free circles and assisted places are not — those are funded by voluntary pledges."
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
            <p className="rounded-xl border border-ivory-200 bg-ivory-100/60 p-4 text-xs leading-relaxed text-stone-600">
              A pledge recorded here is an intention, not a payment. The academy will contact you to arrange it. No
              card details are collected on this website.
            </p>
          </div>
          <PledgeForm />
        </div>
      </section>
    </>
  );
}
