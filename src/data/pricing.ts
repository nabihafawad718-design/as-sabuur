/**
 * Pricing model — single source of truth.
 *
 * All prices are USD per learner, for live one-to-one lessons with a
 * consistent teacher. They are recommendations pending final sign-off;
 * no payment provider is connected in this codebase and nothing here
 * charges a card. See docs/PRICING-STRATEGY.md for the reasoning and the
 * verified competitor prices these were compared against.
 */

export type Plan = {
  id: string;
  name: string;
  lessonsPerWeek: number;
  lessonsPerMonth: number;
  minutes: number;
  monthly: number;
  summary: string;
  bestFor: string;
  popular?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "foundations",
    name: "Foundations",
    lessonsPerWeek: 1,
    lessonsPerMonth: 4,
    minutes: 30,
    monthly: 32,
    summary: "One steady lesson a week — enough to begin without overwhelming a young learner.",
    bestFor: "First-time students and busy households",
  },
  {
    id: "steady",
    name: "Steady",
    lessonsPerWeek: 2,
    lessonsPerMonth: 8,
    minutes: 30,
    monthly: 52,
    summary: "The rhythm most families settle into: two lessons a week, real momentum, still gentle.",
    bestFor: "Children and adults building a habit",
    popular: true,
  },
  {
    id: "committed",
    name: "Committed",
    lessonsPerWeek: 3,
    lessonsPerMonth: 12,
    minutes: 30,
    monthly: 72,
    summary: "Three sessions a week for faster progress through Qaida, reading or Tajweed.",
    bestFor: "Learners with a clear near-term goal",
  },
  {
    id: "intensive",
    name: "Intensive",
    lessonsPerWeek: 4,
    lessonsPerMonth: 16,
    minutes: 30,
    monthly: 88,
    summary: "Four sessions a week for students who want to move quickly and retain well.",
    bestFor: "Serious Tajweed and revision work",
  },
  {
    id: "hifz",
    name: "Hifz",
    lessonsPerWeek: 5,
    lessonsPerMonth: 20,
    minutes: 30,
    monthly: 100,
    summary: "Five sessions a week — the daily rhythm memorisation actually requires.",
    bestFor: "Students committed to memorisation",
  },
];

export function perLesson(plan: Plan): string {
  return `$${(plan.monthly / plan.lessonsPerMonth).toFixed(2)}`;
}

/** Prepayment discounts applied to the monthly rate. */
export const PREPAY = [
  { id: "monthly", label: "Month to month", months: 1, discount: 0, note: "Cancel or pause with notice" },
  { id: "quarter", label: "3 months", months: 3, discount: 0.05, note: "5% off" },
  { id: "half", label: "6 months", months: 6, discount: 0.1, note: "10% off" },
  { id: "annual", label: "12 months", months: 12, discount: 0.15, note: "15% off" },
] as const;

export function prepayTotal(plan: Plan, months: number, discount: number): number {
  return Math.round(plan.monthly * months * (1 - discount));
}

/**
 * Extended lesson lengths, priced against the 30-minute Steady plan.
 * Rounded to whole dollars so the table stays readable.
 */
export const EXTENDED_LESSONS = [
  { length: "45 minutes", twiceWeekly: 70, fiveWeekly: 135, note: "Recommended for Hifz and Tajweed" },
  { length: "60 minutes", twiceWeekly: 88, fiveWeekly: 170, note: "For adults and advanced students" },
] as const;

export const FAMILY_DISCOUNT = [
  "Second learner in the same household: 10% off",
  "Third learner and beyond: 15% off",
  "One shared schedule and one monthly invoice",
] as const;

export const INCLUDED = [
  "A consistent one-to-one teacher, not a rotating pool",
  "A written learning plan after your free trial",
  "Monthly progress notes for parents and adult learners",
  "Make-up lessons for missed sessions with notice",
  "All learning materials shared digitally",
  "No registration fee and no long-term contract",
] as const;
