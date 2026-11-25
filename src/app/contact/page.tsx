import type { Metadata } from "next";
import { Clock3, Globe2, Mail, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { TrialForm } from "@/components/forms/trial-form";
import { OpenDoor } from "@/components/art/arch";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE, whatsappHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Free Trial Booking",
  description:
    "Book a free 30-minute online Quran trial class, or send a question about courses, pricing or scheduling. One-to-one lessons for children and adults, in your time zone.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Free Trial · As-Sabuur",
    description:
      "Book a free 30-minute online Quran trial class with an established Quran teaching academy.",
    url: `${SITE.url}/contact`,
  },
};

const NEXT_STEPS = [
  {
    step: "1",
    title: "You send the request",
    text: "Name, age group, course of interest, preferred time of day and time zone. It takes about a minute.",
  },
  {
    step: "2",
    title: "We match a teacher and offer times",
    text: "We reply by email or WhatsApp with two or three times that work in your time zone, and the name of the teacher.",
  },
  {
    step: "3",
    title: "The free 30-minute class",
    text: "The teacher listens, teaches a short piece, and afterwards you receive a written recommendation — course, weekly rhythm, and what month one covers.",
  },
];

export default function ContactPage() {
  const wa = whatsappHref("Assalamu alaykum — I'd like to book a free trial Quran class.");

  return (
    <>
      <PageHeader
        eyebrow="Contact & free trial"
        title={
          <>
            Start with a <span className="italic text-pine-700">free 30-minute class</span>
          </>
        }
        description="No card details, no obligation. The teacher will listen to the student read, teach a short piece, and tell you honestly where to begin."
        crumbs={[["Contact", "/contact"]]}
      />

      <section className="wrap py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <div className="relative hidden overflow-hidden rounded-[1.4rem] border border-ivory-200 lg:block">
              <OpenDoor className="block h-auto w-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine-950/85 to-transparent p-5">
                <p className="font-display text-2xl text-ivory-50">The door is open.</p>
                <p className="mt-1 text-xs text-ivory-100/70">30 minutes, one-to-one, no card details.</p>
              </div>
            </div>

            <a href={`mailto:${SITE.email}`} className="card flex items-center gap-4 p-5 transition hover:border-pine-400">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-pine-50 text-pine-800">
                <Mail className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-semibold text-pine-950">Email</p>
                <p className="text-sm text-stone-700">{SITE.email}</p>
                <p className="text-xs text-stone-500">We aim to reply within two working days</p>
              </div>
            </a>

            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 p-5 transition hover:border-pine-400">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sage-100 text-pine-800">
                  <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-semibold text-pine-950">WhatsApp</p>
                  <p className="text-sm text-stone-700">{SITE.whatsappDisplay}</p>
                  <p className="text-xs text-stone-500">For quick scheduling questions</p>
                </div>
              </a>
            )}

            <div className="card flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ivory-100 text-pine-800">
                <Clock3 className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-semibold text-pine-950">Scheduling</p>
                <p className="text-sm text-stone-700">Lessons are arranged in your local time</p>
                <p className="text-xs text-stone-500">Early mornings, after school, or late evenings</p>
              </div>
            </div>

            <div className="card flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ivory-100 text-pine-800">
                <Globe2 className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-semibold text-pine-950">Where we teach</p>
                <p className="text-sm text-stone-700">Online, worldwide</p>
                <p className="text-xs text-stone-500">In-person classes continue locally</p>
              </div>
            </div>
          </div>

          <TrialForm />
        </div>
      </section>

      <section className="border-y border-ivory-200 bg-ivory-100/50">
        <div className="wrap py-14 lg:py-16">
          <SectionHeading
            eyebrow="What happens next"
            title="Three steps, no pressure"
            description="The trial is a real lesson, not a sales call. If As-Sabuur is not right for your family, the teacher will say so."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {NEXT_STEPS.map((s) => (
              <div key={s.step} className="rounded-2xl border border-ivory-200 bg-white p-6 shadow-card">
                <span className="numeral text-3xl text-gold-600/60">0{s.step}</span>
                <h3 className="mt-3 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ContactForm />
          <div className="space-y-5">
            <SectionHeading
              eyebrow="Before you write"
              title="A few things worth knowing"
              description="Most messages we receive are answered by one of these."
            />
            {[
              {
                q: "Can we have a female teacher?",
                a: "Yes — state it in the trial form. For children we ask for any preference up front so the trial is with the right teacher from the start.",
              },
              {
                q: "Do you teach in our time zone?",
                a: "Lessons are scheduled in your local time. Tell us your time zone and the times of day that work, and we will offer real slots rather than a generic booking calendar.",
              },
              {
                q: "We already study elsewhere.",
                a: "That is fine. Students sometimes come for a second opinion or to fill a specific gap. The trial is not conditional on enrolling.",
              },
              {
                q: "Is there a minimum age?",
                a: "Children usually begin at four or five, but readiness matters more than age. In the trial the teacher will tell you honestly whether the child is ready.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-ivory-200 bg-white p-5">
                <p className="font-semibold text-pine-950">{item.q}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact & Free Trial — As-Sabuur",
            url: `${SITE.url}/contact`,
            mainEntity: {
              "@type": "EducationalOrganization",
              name: SITE.legalName,
              email: SITE.email,
              url: SITE.url,
            },
          }),
        }}
      />
    </>
  );
}
