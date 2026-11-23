export type LearningMode = "kids" | "adults";

export type ExperienceConfig = {
  id: LearningMode;
  label: string;
  ageTag: string;
  headline: string;
  summary: string;
  image: string;
  imageAlt: string;
  sessionFeel: string;
  paceBadge: string;
  milestones: { title: string; detail: string; status: string }[];
  highlights: string[];
};

export const learningExperiences: Record<LearningMode, ExperienceConfig> = {
  kids: {
    id: "kids",
    label: "For Kids (Ages 5–14)",
    ageTag: "Playful · Visual · Confidence-First",
    headline: "Lessons children genuinely ask for when the clock hits 5pm.",
    summary:
      "Warm, patient teachers turn Arabic letters and short surahs into joyful 30-minute milestones — with visual stars, gentle encouragement, and live parent progress snapshots.",
    image: "/images/learn-kid-tablet.jpg",
    imageAlt: "Child smiling with tablet during an interactive online Quran class",
    sessionFeel: "Warm, playful 1-on-1 encouragement",
    paceBadge: "30-min focused sessions",
    milestones: [
      { title: "Step 1 · Letter Friends", detail: "Recognize all 28 Arabic letters with joyful sound cues", status: "Week 1–4" },
      { title: "Step 2 · Joining & Vowels", detail: "Blend Fatha, Kasra & Damma into real words aloud", status: "Month 2" },
      { title: "Step 3 · First Surahs", detail: "Recite Al-Fatiha & Juz ‘Amma directly from the Mushaf", status: "Month 3–4" },
    ],
    highlights: [
      "Friendly female & male tutors trained specifically for young attention spans",
      "Visual star milestones & monthly parent WhatsApp progress notes",
      "Zero harsh correction — children build confidence speaking aloud",
    ],
  },
  adults: {
    id: "adults",
    label: "For Adults & Reverts",
    ageTag: "Calm · Structured · Judgment-Free",
    headline: "Start from letter one or refine every Tajweed rule — with quiet dignity.",
    summary:
      "Whether you are returning after decades, learning as a revert, or perfecting your articulation points (Makharij), our certified scholars adapt calmly to your work and family rhythm.",
    image: "/images/learn-adult-quran.jpg",
    imageAlt: "Adult reading the Qur'an peacefully in soft natural sunlight",
    sessionFeel: "Calm, scholarly 1-on-1 mentorship",
    paceBadge: "Flexible early dawn to late night",
    milestones: [
      { title: "Phase 1 · Diagnostic & Pace", detail: "Private assessment with zero embarrassment or classroom pressure", status: "Trial Day 1" },
      { title: "Phase 2 · Makharij & Rules", detail: "Master throat letters, Madd elongation, and Noon Sakinah", status: "Months 1–3" },
      { title: "Phase 3 · Fluent Tarteel", detail: "Recite complete Juz smoothly with reflective meaning", status: "Ongoing" },
    ],
    highlights: [
      "100% private 1-on-1 classes — never read nervously in front of a crowd",
      "Early-morning Fajr slots, lunch breaks, or quiet late-night sessions",
      "Optional voice-note feedback between classes for steady muscle memory",
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
    rule: "Qalqalah (Echoing Bounce)",
    arabicRule: "الْقَلْقَلَة",
    arabicSample: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    transliteration: "Qul Huwa-llaahu A-ha(d)",
    surahRef: "Al-Ikhlas · 112:1",
    makhraj: "Tip of tongue touching upper gum ridge (د)",
    phoneticBreakdown: [
      { part: "Qul", cue: "Deep back-tongue Qaf" },
      { part: "Huwa-llaahu", cue: "Heavy Lam of Majesty" },
      { part: "A-ha-d(e)", cue: "Crisp echoing bounce on final Dal" },
    ],
    tip: "Release the final ‘d’ cleanly with a gentle resonant pulse — never add an ‘uh’ vowel.",
    notesHz: [293.66, 329.63, 392.0, 440.0],
  },
  {
    id: "ghunnah",
    rule: "Ghunnah (Nasal Resonance)",
    arabicRule: "الْغُنَّة",
    arabicSample: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    transliteration: "In-na ma‘al-‘usri yusraa",
    surahRef: "Ash-Sharh · 94:6",
    makhraj: "Nasal passage (Al-Khayshoom) · 2 counts",
    phoneticBreakdown: [
      { part: "In-nnn-a", cue: "Hold gentle nasal hum for 2 beats" },
      { part: "ma‘al-‘usri", cue: "Deep throat ‘Ayn" },
      { part: "yus-raa", cue: "2-beat soft Madd elongation" },
    ],
    tip: "Let the doubled Noon hum warmly through the nose for two calm heartbeats before releasing.",
    notesHz: [261.63, 329.63, 392.0, 349.23],
  },
  {
    id: "madd",
    rule: "Madd Waajib (Measured Elongation)",
    arabicRule: "الْمَدُّ الْوَاجِب",
    arabicSample: "وَالسَّمَاءِ وَالطَّارِقِ",
    transliteration: "Was-sa-maaa-’i wat-taariq",
    surahRef: "At-Tariq · 86:1",
    makhraj: "Open vocal cavity (Al-Jawf) · 4–5 counts",
    phoneticBreakdown: [
      { part: "Was-sa", cue: "Merge into crisp Seen" },
      { part: "maaaa-’i", cue: "Stretch Alif smoothly 4–5 beats" },
      { part: "wat-taa-riq", cue: "Heavy Taa + Qalqalah on Qaf" },
    ],
    tip: "Keep your breath steady and unhurried across the long ‘aaaa’ before meeting the Hamzah.",
    notesHz: [293.66, 349.23, 440.0, 523.25],
  },
  {
    id: "tafkheem",
    rule: "Tafkheem (Full-Mouth Gravity)",
    arabicRule: "التَّفْخِيم",
    arabicSample: "وَاصْبِرْ صَبْرًا جَمِيلًا",
    transliteration: "Was-bir sabran jameelaa",
    surahRef: "Al-Ma‘arij · 70:5",
    makhraj: "Raised back tongue for Saad (ص)",
    phoneticBreakdown: [
      { part: "Was-bir", cue: "Full-mouth Saad into light Raa" },
      { part: "sab-ran", cue: "Qalqalah bounce on Baa" },
      { part: "ja-mee-laa", cue: "Soft 2-beat Madd at stop" },
    ],
    tip: "Elevate the back of your tongue gently to give Saad its warm, resonant richness.",
    notesHz: [246.94, 293.66, 369.99, 440.0],
  },
];

export type CourseTrack = {
  id: string;
  goalValue: string;
  arabicTitle: string;
  title: string;
  audience: string;
  duration: string;
  tagline: string;
  outcomes: string[];
  accent: "emerald" | "gold" | "sage";
};

export const courseTracks: CourseTrack[] = [
  {
    id: "qaida",
    goalValue: "Noorani Qaida & Foundational Reading",
    arabicTitle: "الْقَاعِدَةُ النُّورَانِيَّة",
    title: "Noorani Qaida & Foundational Reading",
    audience: "Kids 5+ & Adult Beginners",
    duration: "2–4 Months",
    tagline: "From recognizing your very first Arabic letter to reading short surahs fluently from the Mushaf.",
    outcomes: [
      "Master all 28 letters in isolated & joined forms",
      "Read effortlessly with Harakat, Tanween & Sukun",
      "Graduate directly into Surah recitation",
    ],
    accent: "emerald",
  },
  {
    id: "tajweed",
    goalValue: "Tajweed & Fluent Recitation",
    arabicTitle: "التَّجْوِيدُ وَالتَّرْتِيل",
    title: "Tajweed & Fluent Recitation",
    audience: "Kids 8+ & Adults",
    duration: "4–9 Months",
    tagline: "Recite with beauty, precision, and unhurried Tarteel under Ijazah-certified teachers.",
    outcomes: [
      "Perfect throat & tongue Makharij articulation",
      "Apply Noon/Meem Sakinah, Madd & Qalqalah naturally",
      "Develop calm, rhythmic breath control",
    ],
    accent: "gold",
  },
  {
    id: "hifz",
    goalValue: "Hifz / Memorization",
    arabicTitle: "حِفْظُ الْقُرْآن",
    title: "Hifz / Memorization",
    audience: "Selected Surahs to Full Qur’an",
    duration: "Flexible Pacing",
    tagline: "Retention-first memorization combining Sabaq, Sabqi, and Manzil so what you learn stays for life.",
    outcomes: [
      "Personalized daily & weekly retention plan",
      "Visual Surah & Juz milestone tracker",
      "Ijazah pathway for dedicated students",
    ],
    accent: "sage",
  },
  {
    id: "arabic",
    goalValue: "Quranic Arabic & Meaning",
    arabicTitle: "لُغَةُ الْقُرْآن",
    title: "Quranic Arabic & Meaning",
    audience: "Teens & Adults",
    duration: "6–9 Months",
    tagline: "Unlock the vocabulary and root patterns of the Qur’an so your salah feels deeply personal.",
    outcomes: [
      "Learn the 500 highest-frequency Qur’anic words",
      "Understand essential Nahw & Sarf root patterns",
      "Translate Juz ‘Amma & daily prayers directly",
    ],
    accent: "emerald",
  },
];

export const globalZones = [
  { city: "London", zone: "GMT", time: "16:30", session: "After-School Qaida · Age 7" },
  { city: "New York", zone: "EST", time: "11:30", session: "Adult Tajweed Break" },
  { city: "Dubai", zone: "GST", time: "20:30", session: "Evening Hifz Revision" },
  { city: "Kuala Lumpur", zone: "MYT", time: "00:30", session: "Fajr-Prep Circle" },
  { city: "Toronto", zone: "EST", time: "11:30", session: "Beginner Arabic Track" },
];

export const studentStories = [
  {
    quote:
      "My 7-year-old used to hide whenever it was time to read. Within three weeks with Ustadh Bilal, she started setting up her iPad ten minutes early with a giant smile.",
    name: "Amina & Layla",
    location: "London, UK",
    track: "Noorani Qaida · Kids",
    badge: "4 months to first Juz reading",
  },
  {
    quote:
      "As a revert in my 30s, I was terrified of mispronouncing letters. My teacher never rushed me once — every session feels like a peaceful refuge in the middle of my workweek.",
    name: "Tariq Bennett",
    location: "Toronto, Canada",
    track: "Tajweed & Fluent Recitation · Adult",
    badge: "From zero Arabic to Surah Yasin",
  },
  {
    quote:
      "Having our kids in Houston matched with teachers who fit around school and sports — plus monthly progress notes — changed our whole household atmosphere.",
    name: "Dr. Samira & Omar",
    location: "Houston, USA",
    track: "Family Hifz & Qaida",
    badge: "3 siblings learning weekly",
  },
  {
    quote:
      "Connecting my early-morning Fajr slot in Sydney with an Azhar-certified Qari gave me the steadiness I was missing for years.",
    name: "Nadia Rahman",
    location: "Sydney, Australia",
    track: "Quranic Arabic & Tajweed",
    badge: "Consistent for 14 months",
  },
];

export const globalTimezones = [
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
];
