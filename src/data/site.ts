/**
 * Single source of truth for business facts that appear across the site.
 *
 * IMPORTANT: only put claims here that are true and can be supported.
 * The `whatsapp` value is intentionally empty: leave it empty until a
 * verified business number is supplied. Every WhatsApp surface on the site
 * checks `whatsappHref()` and renders nothing when it returns null, so the
 * site never publishes a fake or placeholder phone number.
 */

export const SITE = {
  name: "As-Sabuur",
  legalName: "As-Sabuur Quran Academy",
  domain: "as-sabuur.com",
  url: "https://as-sabuur.com",
  email: "salam@as-sabuur.com",
  /** E.164 format, digits only with country code, e.g. "+447700900123". Leave "" until verified. */
  whatsapp: "",
  /** Human-readable version of the WhatsApp number. Leave "" until verified. */
  whatsappDisplay: "",
  tagline: "An established Quran teaching house — now online, worldwide.",
  shortDescription:
    "One-to-one online Quran classes for children and adults, taught by an established Quran teaching academy. Noorani Qaida, reading, Tajweed, Hifz and Quranic Arabic.",
  /**
   * These are honest, checkable statements about how the academy operates,
   * not statistics. Do not add student counts, ratings or reviews here unless
   * they are real and verifiable.
   */
  trustPoints: [
    "Taught in person long before we taught online",
    "One teacher per student, every lesson",
    "Free 30-minute trial with a written learning plan",
    "No long-term contract required",
  ],
} as const;

export function whatsappHref(message?: string): string | null {
  const number = SITE.whatsapp.replace(/[^\d+]/g, "");
  if (!number) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number.replace(/^\+/, "")}${text}`;
}

export const TIMEZONES = [
  "Auto-detect my local time",
  "London (GMT / BST)",
  "New York / Toronto (ET)",
  "Chicago / Houston (CT)",
  "Los Angeles (PT)",
  "Paris / Berlin (CET)",
  "Dubai / Riyadh (GST / AST)",
  "Karachi (PKT)",
  "Kuala Lumpur / Singapore (MYT / SGT)",
  "Sydney / Melbourne (AET)",
  "Cairo / Johannesburg (EET / SAST)",
] as const;

export const SCHEDULE_PREFERENCES = [
  "Weekday mornings",
  "Weekday afternoons (after school)",
  "Weekday evenings",
  "Weekend mornings",
  "Weekend afternoons",
  "I'm flexible — suggest a time",
] as const;

export const PRIMARY_NAV = [
  { href: "/experience", label: "Experience" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/class-details", label: "Class Details" },
  { href: "/contact", label: "Contact" },
  { href: "/global-trust", label: "Global Trust" },
] as const;

export const EXPLORE_NAV = [
  { href: "/names", title: "The 99 Names", desc: "Contemplate Al-Asma ul-Husna and the name As-Sabuur", badge: "99" },
  { href: "/dhikr", title: "Dhikr & Tasbih", desc: "A quiet, interactive counter for daily remembrance", badge: "Practice" },
  { href: "/programs", title: "Gatherings", desc: "Free study circles and community evenings", badge: "Community" },
  { href: "/journal", title: "The Journal", desc: "Essays on patience, learning and sacred study", badge: "Read" },
  { href: "/reflections", title: "Dua Wall", desc: "Share a prayer and say Ameen for others", badge: "Community" },
] as const;
