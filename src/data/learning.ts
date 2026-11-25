export type LearningMode = "kids" | "adults";

export type ExperienceConfig = {
  id: LearningMode;
  label: string;
  ageTag: string;
  headline: string;
  summary: string;
  sessionFeel: string;
  paceBadge: string;
  milestones: { title: string; detail: string; status: string }[];
  highlights: string[];
};

/**
 * Copy describes how lessons are run. It deliberately avoids claims about
 * qualifications, certifications or numbers of students.
 */
export const learningExperiences: Record<LearningMode, ExperienceConfig> = {
  kids: {
    id: "kids",
    label: "For children",
    ageTag: "Short · visual · confidence first",
    headline: "Lessons a child can sit through without dread.",
    summary:
      "Thirty-minute sessions built for a child's attention span: one new thing at a time, plenty of repetition, and correction that never makes a child feel foolish. Parents receive a short note each month describing exactly what was covered.",
    sessionFeel: "Warm, patient, one-to-one",
    paceBadge: "30-minute sessions",
    milestones: [
      { title: "First letters", detail: "Recognise and say all 28 Arabic letters", status: "Weeks 1–4" },
      { title: "Joining and vowels", detail: "Blend letters with fatha, kasra and damma", status: "Month 2" },
      { title: "First surahs", detail: "Read Al-Fatiha and short surahs from the mushaf", status: "Months 3–4" },
    ],
    highlights: [
      "Children from four, taught at the pace they can actually hold",
      "A parent welcome to sit in at any point, especially for younger children",
      "No shouting, no shaming — correction is calm and specific",
      "One teacher throughout, so expectations stay consistent",
    ],
  },
  adults: {
    id: "adults",
    label: "For adults",
    ageTag: "Private · structured · judgement-free",
    headline: "Start from the first letter, or finally fix what you were never taught.",
    summary:
      "Many adults arrive embarrassed about what they do not know. Lessons are private, unhurried, and built around your actual week — early mornings before work, a lunch break, or a quiet hour after the children are asleep.",
    sessionFeel: "Calm, private, one-to-one",
    paceBadge: "Flexible scheduling",
    milestones: [
      { title: "An honest starting point", detail: "A private assessment with no classroom audience", status: "Trial lesson" },
      { title: "Pronunciation and rules", detail: "Makharij, madd, noon and meem sakinah", status: "Months 1–3" },
      { title: "Fluent, measured recitation", detail: "Read a juz with steady tarteel", status: "Ongoing" },
    ],
    highlights: [
      "Entirely one-to-one — nobody else is listening",
      "Reverts and returning learners are genuinely welcome",
      "Choose a male or female teacher when you book",
      "Voice notes between lessons if you want extra feedback",
    ],
  },
};

export type TajweedSample = {
  id: string;
  rule: string;
  arabicRule: string;
  arabicSample: string;
  transliteration: string;
  surahRef: string;
  makhraj: string;
  phoneticBreakdown: { part: string; cue: string }[];
  tip: string;
  notesHz: number[];
};

export const tajweedSamples: TajweedSample[] = [
  {
    id: "qalqalah",
    rule: "Qalqalah (echoing bounce)",
    arabicRule: "الْقَلْقَلَة",
    arabicSample: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    transliteration: "Qul huwa-llaahu a-had",
    surahRef: "Al-Ikhlas 112:1",
    makhraj: "Tip of the tongue against the upper gum ridge (د)",
    phoneticBreakdown: [
      { part: "Qul", cue: "Deep back-tongue qaf" },
      { part: "huwa-llaahu", cue: "Heavy lam of majesty" },
      { part: "a-had", cue: "Crisp bounce on the final dal" },
    ],
    tip: "Release the final d cleanly with a small resonant pulse — do not add an extra vowel after it.",
    notesHz: [293.66, 329.63, 392.0, 440.0],
  },
  {
    id: "ghunnah",
    rule: "Ghunnah (nasal resonance)",
    arabicRule: "الْغُنَّة",
    arabicSample: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    transliteration: "Inna ma‘al-‘usri yusraa",
    surahRef: "Ash-Sharh 94:6",
    makhraj: "Nasal passage (al-khayshoom), held for two counts",
    phoneticBreakdown: [
      { part: "In-na", cue: "Hold a gentle nasal hum for two beats" },
      { part: "ma‘al-‘usri", cue: "Deep throat ‘ayn" },
      { part: "yus-raa", cue: "Soft two-count madd at the end" },
    ],
    tip: "Let the doubled noon hum through the nose for two calm beats before releasing it.",
    notesHz: [261.63, 329.63, 392.0, 349.23],
  },
  {
    id: "madd",
    rule: "Madd (measured elongation)",
    arabicRule: "الْمَدّ",
    arabicSample: "وَالسَّمَاءِ وَالطَّارِقِ",
    transliteration: "Was-samaaa’i wat-taariq",
    surahRef: "At-Tariq 86:1",
    makhraj: "Open vocal cavity (al-jawf), four to five counts",
    phoneticBreakdown: [
      { part: "Was-sa", cue: "Merge into a crisp seen" },
      { part: "maaaa-’i", cue: "Stretch the alif smoothly for four or five beats" },
      { part: "wat-taa-riq", cue: "Heavy taa, then qalqalah on the qaf" },
    ],
    tip: "Keep the breath steady across the long aa before meeting the hamzah.",
    notesHz: [293.66, 349.23, 440.0, 523.25],
  },
  {
    id: "tafkheem",
    rule: "Tafkheem (full-mouth weight)",
    arabicRule: "التَّفْخِيم",
    arabicSample: "وَاصْبِرْ صَبْرًا جَمِيلًا",
    transliteration: "Wasbir sabran jameelaa",
    surahRef: "Al-Ma‘arij 70:5",
    makhraj: "Raised back of the tongue for saad (ص)",
    phoneticBreakdown: [
      { part: "Was-bir", cue: "Full-mouth saad into a light raa" },
      { part: "sab-ran", cue: "Small bounce on the baa" },
      { part: "ja-mee-laa", cue: "Soft two-count madd at the stop" },
    ],
    tip: "Lift the back of the tongue gently so the saad carries its warm, full weight.",
    notesHz: [246.94, 293.66, 369.99, 440.0],
  },
];
