import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { BookTrialButton } from "@/components/trial/trial-drawer";
import { SITE, whatsappHref } from "@/data/site";

const learnLinks = [
  ["All courses", "/courses"],
  ["Noorani Qaida", "/courses#noorani-qaida"],
  ["Quran reading", "/courses#quran-reading"],
  ["Tajweed", "/courses#tajweed"],
  ["Hifz", "/courses#hifz"],
  ["Quranic Arabic", "/courses#quranic-arabic"],
];

const academyLinks = [
  ["Pricing", "/pricing"],
  ["About As-Sabuur", "/about"],
  ["Contact & free trial", "/contact"],
  ["Gatherings", "/programs"],
  ["Support the academy", "/support"],
  ["The Journal", "/journal"],
];

const communityLinks = [
  ["The 99 Names", "/names"],
  ["Dhikr & Tasbih", "/dhikr"],
  ["Dua Wall", "/reflections"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Academy portal", "/admin"],
];

export function Footer() {
  const wa = whatsappHref("Assalamu alaykum — I'd like to ask about online Quran classes.");

  return (
    <footer className="relative mt-24 overflow-hidden bg-pine-950 text-ivory-100/75">
      <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-70" />
      <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="wrap relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_0.85fr_0.85fr_0.85fr_1.1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory-100/70">
              An established Quran teaching house, now teaching one-to-one online. Named for{" "}
              <em>As-Sabuur</em> — the Most Patient — because learning the Qur&rsquo;an is built on steadiness,
              not speed.
            </p>
            <p dir="rtl" lang="ar" className="font-arabic mt-6 text-2xl text-gold-300">
              وَبَشِّرِ الصَّابِرِينَ
            </p>
            <p className="mt-1 text-xs text-ivory-100/50">&ldquo;And give good tidings to the patient.&rdquo; — Al-Baqarah 2:155</p>
          </div>

          <div>
            <h2 className="text-lg text-ivory-50">Learn</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {learnLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-ivory-50">Academy</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {academyLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-ivory-50">Community</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {communityLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-ivory-50">Talk to us</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold-300">
                  {SITE.email}
                </a>
              </li>
              {wa && (
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
                    {SITE.whatsappDisplay}
                  </a>
                </li>
              )}
              <li className="text-ivory-100/60">
                In-person teaching continues locally.
                <br />
                Online lessons are available worldwide.
              </li>
            </ul>
            <BookTrialButton className="btn btn-gold mt-7 !px-5 !py-2.5 !text-sm">
              Book free trial
            </BookTrialButton>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-ivory-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
              Privacy
            </Link>
            <Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
              Terms
            </Link>
            <a href={`mailto:${SITE.email}`} className="hover:text-gold-300">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
