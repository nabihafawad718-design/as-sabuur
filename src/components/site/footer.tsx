import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { BookTrialButton } from "@/components/trial/trial-drawer";

const sanctuaryLinks = [
  ["Feel the Experience", "/#experience"],
  ["4 Learning Tracks", "/#courses"],
  ["99 Names Gallery", "/names"],
  ["Dhikr & Tasbih", "/dhikr"],
  ["Gatherings & Circles", "/programs"],
  ["The Sabuur Journal", "/journal"],
  ["Wall of Steadfastness", "/reflections"],
];

const houseLinks = [
  ["About As-Sabuur", "/about"],
  ["Support & Waqf", "/support"],
  ["WP Theme / Export", "/wp-theme"],
  ["Steward Desk", "/contact"],
  ["Steward Portal", "/admin"],
  ["Privacy & Adab", "/privacy"],
  ["Terms", "/terms"],
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-pine-950 text-ivory-100/75">
      <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-70" />
      <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="wrap relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-100/70">
              A digital and gathering sanctuary dedicated to <em>As-Sabuur</em> — cultivating unhurried faith, Prophetic
              patience, sacred study, and quiet companionship.
            </p>
            <p dir="rtl" lang="ar" className="font-arabic mt-6 text-2xl text-gold-300">
              إِنَّ اللَّهَ مَعَ الصَّابِرِينَ
            </p>
            <p className="mt-1 text-xs text-ivory-100/50">“Indeed, Allah is with the patient.” — Al-Baqarah 2:153</p>
          </div>

          <div>
            <h3 className="text-xl text-ivory-50">Navigate</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {sanctuaryLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl text-ivory-50">The House</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {houseLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl text-ivory-50">Sanctuary Desk</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <a href="mailto:salam@as-sabuur.com" className="hover:text-gold-300">
                  salam@as-sabuur.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span>
                  Dawn Circle · 05:30 daily
                  <br />
                  Courtyard open Fajr through Isha
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span>Sanctuary Courtyard &amp; Global Live Stream</span>
              </li>
            </ul>
            <BookTrialButton className="btn btn-gold mt-7 !px-5 !py-2.5 !text-sm">
              Book Free Trial Class
            </BookTrialButton>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-ivory-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} As-Sabuur.com · Sanctuary of Steadfastness &amp; Sacred Knowledge.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-gold-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold-300">
              Terms
            </Link>
            <Link href="/admin" className="hover:text-gold-300">
              Steward Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
