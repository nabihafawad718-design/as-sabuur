import type { Plan } from "./pricing";
import { PLANS } from "./pricing";

export type CourseArtVariant = "qaida" | "reading" | "tajweed" | "hifz" | "arabic";

export type Course = {
  id: string;
  slug: string;
  name: string;
  arabic: string;
  level: string;
  ages: string;
  typicalPace: string;
  tagline: string;
  /** Who this course is genuinely for. */
  whoFor: string[];
  /** What students actually study. */
  learn: string[];
  /** What a student can expect to be able to do — no guarantees, no certificates. */
  outcomes: string[];
  /** How the lessons run. */
  format: string[];
  /** The shape of a single lesson. */
  structure: { minutes: string; step: string }[];
  planId: string;
  art: CourseArtVariant;
  accent: "emerald" | "gold" | "sage";
};

export const COURSES: Course[] = [
  {
    id: "qaida",
    slug: "noorani-qaida",
    name: "Noorani Qaida",
    arabic: "القَاعِدَةُ النُّورَانِيَّة",
    level: "Absolute beginner",
    ages: "Children from 4, and adults starting from zero",
    typicalPace: "Typically 2–4 months at two lessons a week",
    tagline:
      "The first doorway: from not recognising a single Arabic letter to reading short words aloud with confidence.",
    whoFor: [
      "A child who has never studied Arabic before",
      "An adult or revert who wants to start properly, from the very first letter",
      "A parent who wants their child to read the Qur'an independently rather than memorise by sound",
    ],
    learn: [
      "All 28 letters in isolated and joined forms",
      "Harakat, tanween and sukun",
      "Madd (elongation) and the first rules of stopping",
      "Reading real words and short ayahs from the mushaf",
    ],
    outcomes: [
      "Recognise and pronounce every Arabic letter correctly",
      "Read voweled Arabic words without transliteration",
      "Move into short surahs with the teacher's support",
      "Be ready to begin Quran reading proper",
    ],
    format: [
      "Live one-to-one lessons, online",
      "A single teacher throughout, so pronunciation is corrected consistently",
      "Digital Qaida pages shared on screen; no printing required",
      "Parents welcome to sit in with younger children",
    ],
    structure: [
      { minutes: "5 min", step: "Warm-up: revisit yesterday's letters and sounds" },
      { minutes: "10 min", step: "New letters or rule, modelled by the teacher" },
      { minutes: "10 min", step: "Guided reading with immediate correction" },
      { minutes: "5 min", step: "Homework set and practised once together" },
    ],
    planId: "steady",
    art: "qaida",
    accent: "emerald",
  },
  {
    id: "reading",
    slug: "quran-reading",
    name: "Quran Reading",
    arabic: "تِلَاوَةُ الْقُرْآن",
    level: "Beginner to intermediate",
    ages: "Children and adults",
    typicalPace: "Typically 4–8 months at two lessons a week",
    tagline:
      "From reading words to reading the mushaf — steadily, with the basic rules of Tajweed built in from the start.",
    whoFor: [
      "Students who finished Qaida and are ready for full pages",
      "Adults returning to reading after a long gap",
      "Anyone who can read but still sounds hesitant or stops often",
    ],
    learn: [
      "Fluent reading of the mushaf, page by page",
      "Applied Tajweed basics: ghunnah, qalqalah, madd",
      "Correct pauses and starts (waqf and ibtida)",
      "A daily reading habit sized to the student's life",
    ],
    outcomes: [
      "Read a full page with reasonable fluency",
      "Apply the core Tajweed rules while reading, not only in theory",
      "Read short surahs independently in salah",
      "Build a sustainable daily reading routine",
    ],
    format: [
      "Live one-to-one lessons, online",
      "Student reads aloud for most of the lesson; the teacher listens and corrects",
      "A shared mushaf page on screen, with the student's own copy alongside",
      "Short recorded passages between lessons for practice",
    ],
    structure: [
      { minutes: "5 min", step: "Recite the previous homework from memory of the page" },
      { minutes: "15 min", step: "New passage read aloud with correction" },
      { minutes: "5 min", step: "One Tajweed rule explained from the passage just read" },
      { minutes: "5 min", step: "Set the next passage and practise the hardest line" },
    ],
    planId: "steady",
    art: "reading",
    accent: "sage",
  },
  {
    id: "tajweed",
    slug: "tajweed",
    name: "Tajweed & Recitation",
    arabic: "التَّجْوِيدُ وَالتَّرْتِيل",
    level: "Intermediate",
    ages: "Children from 8, and adults",
    typicalPace: "Typically 6–12 months, depending on starting point",
    tagline:
      "Recite beautifully and correctly: articulation points, the rules in practice, and an unhurried, steady voice.",
    whoFor: [
      "Students who read but want to refine pronunciation",
      "Adults who feel self-conscious about how they sound",
      "Anyone preparing to lead prayers at home or in the community",
    ],
    learn: [
      "Makharij: where each letter is articulated",
      "Sifat: the qualities of letters, heavy and light",
      "Noon and meem sakinah, idgham, ikhfa and iqlab",
      "Madd, qalqalah and the rules of stopping",
      "Tarteel: pace, breath control and beauty of recitation",
    ],
    outcomes: [
      "Pronounce letters from their correct articulation points",
      "Apply the major Tajweed rules without stopping to think",
      "Recite a juz with consistent, measured tarteel",
      "Self-correct using the rules rather than imitation alone",
    ],
    format: [
      "Live one-to-one lessons, online",
      "Close listening and repetition — the teacher models, the student mirrors",
      "A written rule sheet after each new topic",
      "Optional voice notes between lessons for feedback",
    ],
    structure: [
      { minutes: "5 min", step: "Recite the practice passage set last lesson" },
      { minutes: "10 min", step: "One rule taught with examples from the Qur'an" },
      { minutes: "10 min", step: "Drill the rule in short, repeated phrases" },
      { minutes: "5 min", step: "Apply it to a full ayah and record a practice note" },
    ],
    planId: "committed",
    art: "tajweed",
    accent: "gold",
  },
  {
    id: "hifz",
    slug: "hifz",
    name: "Hifz & Memorisation",
    arabic: "حِفْظُ الْقُرْآن",
    level: "Intermediate to advanced",
    ages: "Children from 7, and adults",
    typicalPace: "A personal plan; pace depends on the student, not a fixed timetable",
    tagline:
      "Memorisation built on retention, not speed: a daily sabaq, a weekly sabqi, and a manzil that keeps old surahs alive.",
    whoFor: [
      "Students who read fluently and want to memorise",
      "Adults returning to memorisation they began years ago",
      "Families who want a realistic, sustainable Hifz routine",
    ],
    learn: [
      "A daily sabaq sized to the student's capacity",
      "Sabqi: recent revision, every lesson",
      "Manzil: rotating revision of older portions",
      "A simple retention tracker the student and parent can both see",
    ],
    outcomes: [
      "Memorise new portions with correct Tajweed from the first day",
      "Retain what has been memorised through structured revision",
      "Build a daily habit that survives busy weeks",
      "Know exactly where they stand at any point",
    ],
    format: [
      "Live one-to-one lessons, online, ideally five days a week",
      "Memorisation is heard, corrected and consolidated in the same session",
      "A written plan agreed with the student and family before starting",
      "No promise of a fixed completion date — progress is reviewed monthly",
    ],
    structure: [
      { minutes: "10 min", step: "New sabaq: recite and correct the day's portion" },
      { minutes: "10 min", step: "Sabqi: recent revision with the teacher" },
      { minutes: "10 min", step: "Manzil: older revision, rotating by juz" },
    ],
    planId: "hifz",
    art: "hifz",
    accent: "emerald",
  },
  {
    id: "arabic",
    slug: "quranic-arabic",
    name: "Quranic Arabic",
    arabic: "لُغَةُ الْقُرْآن",
    level: "Beginner to intermediate",
    ages: "Teenagers and adults",
    typicalPace: "Typically 6–12 months at two lessons a week",
    tagline:
      "Understand what you recite: the words, roots and grammar that carry the Qur'an's meaning.",
    whoFor: [
      "Adults who recite but do not understand",
      "Students preparing for deeper study of tafsir",
      "Parents who want to answer their children's questions about the Qur'an",
    ],
    learn: [
      "The most frequent Qur'anic vocabulary",
      "Root patterns and how words are built",
      "Core nahw (grammar) and sarf (morphology)",
      "Reading and translating short surahs and daily duas",
    ],
    outcomes: [
      "Recognise a large share of words on a typical Qur'an page",
      "Understand the grammar behind familiar ayahs",
      "Translate short surahs with a dictionary",
      "Follow the meaning of salah more closely",
    ],
    format: [
      "Live one-to-one lessons, online",
      "Grammar taught through Qur'anic examples, not abstract drills",
      "Weekly vocabulary set with spaced review",
      "Translation exercises marked together in the lesson",
    ],
    structure: [
      { minutes: "5 min", step: "Review the week's vocabulary" },
      { minutes: "10 min", step: "One grammar point, explained through an ayah" },
      { minutes: "10 min", step: "Translate a short passage together" },
      { minutes: "5 min", step: "Set reading and a small translation task" },
    ],
    planId: "steady",
    art: "arabic",
    accent: "sage",
  },
];

export function planFor(course: Course): Plan {
  return PLANS.find((p) => p.id === course.planId) ?? PLANS[1];
}

export const COURSE_GOALS = [
  ...COURSES.map((c) => ({ value: c.name, label: `${c.name} — ${c.level}` })),
  { value: "Not sure yet — help me choose", label: "Not sure yet — help me choose" },
] as const;
