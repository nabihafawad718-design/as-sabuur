import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, BookOpen, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "About As-Sabuur",
  description: "The story, architectural ethos, and resident scholars of As-Sabuur Sanctuary.",
};

const stewards = [
  { name: "Shaykh Tariq Al-Mansoor", role: "Resident Scholar · Tafsir & Spiritual Ethics", bio: "Trained in classical Tafsir and Islamic ethics, leading Surah Al-‘Asr and Names contemplation circles." },
  { name: "Ustadha Salma Al-Khatib", role: "Hafiza & Dawn Circle Guide", bio: "Guides the daily 05:30 dawn adhkar gathering and writes on building sacred rhythms inside busy households." },
  { name: "Dr. Nadia Benali", role: "Historian of Prophetic Tradition", bio: "Researches Prophetic patience (Sabrun Jameel) across classical biographies and delivers Sunday evening circles." },
  { name: "Master Layla Darwish", role: "Calligrapher & Geometer", bio: "Teaches traditional reed-pen Naskh, Thuluth, and eight-fold Islamic geometric contemplation." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About As-Sabuur · عَنِ الدَّارِ"
        title="Built around one Divine Name: As-Sabuur"
        description="In an age engineered for impatience and endless distraction, we wanted a house of faith that breathes at the pace of dawn and twilight."
        crumbs={[["About", "/about"]]}
      />

      <section className="wrap py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src="/images/sabuur-garden.jpg"
                alt="Courtyard garden and arches of As-Sabuur Sanctuary"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Our Ethos</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Threshold, silence, study, and companionship</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600">
              <p>
                As-Sabuur takes its name from the ninety-ninth Name of Allah — <strong>الصَّبُور</strong>, The Most
                Patient, The One who never rushes wisdom or loses composure.
              </p>
              <p>
                Whether you step into our physical courtyard or enter online at dawn, our commitment is unchanged:
                preserve authentic scholarship, cultivate unhurried remembrance, and make sure nobody carries a hard
                season alone.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/names" className="btn btn-primary">
                Explore the 99 Names
              </Link>
              <Link href="/programs" className="btn btn-outline">
                See Gatherings
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ivory-200 bg-ivory-100/60 bg-pattern-light">
        <div className="wrap py-16 lg:py-24">
          <SectionHeading
            eyebrow="Scholars & Guides"
            title="Meet the stewards of the house"
            description="Teachers, calligraphers, and community guides serving without haste."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {stewards.map((s) => (
              <div key={s.name} className="card p-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">{s.role}</p>
                <h3 className="mt-2 text-2xl">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Compass, title: "Unhurried Pace", text: "No algorithms, no popups, no urgency gimmicks." },
            { icon: BookOpen, title: "Rooted Scholarship", text: "Grounded in Qur’an, Sunnah, and classical ethics." },
            { icon: HeartHandshake, title: "Open Access", text: "Every circle and resource freely available to all." },
            { icon: ShieldCheck, title: "Careful Stewardship", text: "Moderation with adab and transparent waqf records." },
          ].map((v) => (
            <div key={v.title} className="card p-6">
              <v.icon className="h-6 w-6 text-gold-700" strokeWidth={1.6} />
              <h3 className="mt-4 text-xl">{v.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
