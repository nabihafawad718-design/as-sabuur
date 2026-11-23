import type { InferInsertModel } from "drizzle-orm";
import { essays, programs, reflections, verses } from "./schema";

type ProgramInsert = InferInsertModel<typeof programs>;
type EssayInsert = InferInsertModel<typeof essays>;
type ReflectionInsert = InferInsertModel<typeof reflections>;
type VerseInsert = InferInsertModel<typeof verses>;

export const programsData: ProgramInsert[] = [
  {
    slug: "tafakkur-surah-al-asr",
    title: "The Architecture of Surah Al-‘Asr",
    arabicTitle: "سُورَةُ الْعَصْرِ",
    subtitle: "Four anchors against hurried living: faith, righteous action, truth, and steadfastness",
    description:
      "A four-week contemplative study circle unpacking why Imam al-Shafi‘i remarked that this brief surah alone would suffice as guidance. We examine time (‘asr), spiritual loss, and why tawasaw bil-haqq and tawasaw bis-sabr stand side by side.",
    category: "Study Circle",
    format: "Sanctuary & Live Stream",
    schedule: "Thursdays · After Maghrib (19:00 GMT)",
    duration: "4 weeks · 75 min",
    guideName: "Shaykh Tariq Al-Mansoor",
    guideRole: "Resident Scholar · Tafsir & Spiritual Ethics",
    capacity: 60,
    image: "/images/sabuur-courtyard.jpg",
    highlights: [
      "Verse-by-verse linguistic reflection in Arabic & English",
      "Weekly journaling prompts on unhurried presence",
      "Live Q&A and small-circle companionship",
      "Audio archive & printed reflection booklet",
    ],
    syllabus: [
      { session: "Week I · The Oath by Time", focus: "Why Allah swears by the fleeting afternoon hour and what it awakens in us." },
      { session: "Week II · Anatomy of Loss", focus: "Understanding khusr — distraction, fragmentation, and spiritual drift." },
      { session: "Week III · Companions in Truth", focus: "Why steadfastness is never purely solitary — mutual counsel in mercy." },
      { session: "Week IV · Living Al-Sabuur", focus: "Carrying unhurried conviction back into work, family, and quiet worship." },
    ],
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "dawn-dhikr-stillness",
    title: "Fajr & The Sanctuary of Dawn",
    arabicTitle: "أَذْكَارُ الصَّبَاحِ",
    subtitle: "Quiet morning adhkar, Qur’anic recitation, and twenty minutes of unhurried reflection",
    description:
      "Before messages, deadlines, and noise begin, join the dawn gathering from our sunlit courtyard or via live audio. Twenty-five minutes of measured recitation, Prophetic morning supplications, and a single thought to carry into the day.",
    category: "Gathering",
    format: "Dawn Gathering · Live Audio",
    schedule: "Daily · 05:30 Local / Live Stream",
    duration: "Ongoing · 25 min",
    guideName: "Ustadha Salma Al-Khatib",
    guideRole: "Hafiza & Devotional Circle Guide",
    capacity: 150,
    image: "/images/sabuur-dawn.jpg",
    highlights: [
      "Complete morning adhkar with authentic Prophetic narrations",
      "Calm, measured Qur’anic recitation (tarteel)",
      "Zero pressure — listen quietly or recite along",
      "Printable pocket adhkar cards included",
    ],
    syllabus: [
      { session: "Opening Stillness", focus: "Ayat al-Kursi and the three Quls recited with calm breath." },
      { session: "Supplications of Reliance", focus: "HasbunAllahu and invocations of protection for the household." },
      { session: "One Ayat, One Day", focus: "Three minutes of practical reflection before parting in peace." },
    ],
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "prophetic-sabr-stories",
    title: "Patience of the Prophets",
    arabicTitle: "صَبْرُ الْأَنْبِيَاءِ",
    subtitle: "Walking alongside Yusuf, Ayyub, Musa, and Muhammad ﷺ through seasons of waiting",
    description:
      "Patience in the Qur’an is never passive resignation — it is active beauty under pressure (Sabrun Jameel). Across six evenings we study how the Prophets held dignity, tenderness, and hope during years of uncertainty.",
    category: "Study Circle",
    format: "Sanctuary & Live Stream",
    schedule: "Sundays · 18:00 GMT",
    duration: "6 weeks · 60 min",
    guideName: "Dr. Nadia Benali",
    guideRole: "Historian of Prophetic Tradition",
    capacity: 80,
    image: "/images/sabuur-manuscript.jpg",
    highlights: [
      "Deep reading of Surah Yusuf’s turning points",
      "How Prophet Ya‘qub held grief and hope simultaneously",
      "Prophet Ayyub’s etiquette in asking for relief",
      "Community discussion & takeaway notes",
    ],
    syllabus: [
      { session: "Part I · Sabrun Jameel", focus: "Ya‘qub and Yusuf: patience without bitterness or spectacle." },
      { session: "Part II · Waiting in Exile", focus: "Musa in Madyan: years of quiet preparation before mission." },
      { session: "Part III · Gratitude in Trial", focus: "Ayyub’s gentle dua and dignity before Allah." },
      { session: "Part IV · Mercy at Ta’if", focus: "The Prophet Muhammad ﷺ choosing compassion over anger." },
    ],
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "silent-night-retreat",
    title: "Layali As-Sabuur: Night Retreat",
    arabicTitle: "لَيَالِي الصَّبُورِ",
    subtitle: "A monthly twilight-to-Isha retreat of lantern-lit contemplation, Qiyam, and quiet tea",
    description:
      "Once every lunar month, when the crescent softens the sky, our courtyard gathers in near-silence. Phones rest at the door; lanterns glow along the arches; we share tea, hear a short discourse on the Names of Allah, and pray together.",
    category: "Retreat",
    format: "In Sanctuary · Limited Seats",
    schedule: "First Friday of each Hijri month · 19:30",
    duration: "Monthly · 2.5 hours",
    guideName: "Shaykh Tariq & Sanctuary Stewards",
    guideRole: "Sanctuary Circle",
    capacity: 35,
    image: "/images/sabuur-lantern.jpg",
    highlights: [
      "Device-free sanctuary evening lit by brass lanterns",
      "Contemplation on one Name from Al-Asma ul-Husna",
      "Congregational Isha and unhurried Qiyam",
      "Herbal mint tea & dates in the olive garden",
    ],
    syllabus: [
      { session: "19:30 · Arrival & Mint Tea", focus: "Leaving haste outside the courtyard gate." },
      { session: "20:00 · Discourse on the Name", focus: "Thirty minutes of reflection on As-Sabuur and Al-Haleem." },
      { session: "20:45 · Silent Dhikr & Prayer", focus: "Forty minutes of quiet personal prayer beneath the arches." },
    ],
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "young-anchors-circle",
    title: "Young Anchors: Teen Steadfastness",
    arabicTitle: "شَبَابُ الثَّبَاتِ",
    subtitle: "Honest conversations for ages 14–19 on identity, comparison, digital noise, and inner calm",
    description:
      "Growing up faithful in a hyper-accelerated world requires real anchors, not slogans. This bi-weekly circle gives teenagers a warm, judgment-free table to ask hard questions and build resilient spiritual habits.",
    category: "Youth",
    format: "Sanctuary & Interactive Zoom",
    schedule: "Alternating Saturdays · 16:00 GMT",
    duration: "8 sessions · 60 min",
    guideName: "Ustadh Kareem Haddad",
    guideRole: "Youth Mentor & Educator",
    capacity: 30,
    image: "/images/sabuur-garden.jpg",
    highlights: [
      "Open dialogue without lectures or embarrassment",
      "Practical habits for focus, prayer, and screen boundaries",
      "Mentorship from grounded university & community peers",
      "Outdoor sanctuary tea & service mornings",
    ],
    syllabus: [
      { session: "Session 1 · The Attention Economy vs. Khushu‘", focus: "Reclaiming your mind from endless scrolling." },
      { session: "Session 2 · When Prayers Feel Dry", focus: "Staying anchored even when motivation dips." },
      { session: "Session 3 · Courage & Kindness", focus: "Carrying prophetic character into school and friendships." },
    ],
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "calligraphy-contemplation",
    title: "Qalam & Stillness: Sacred Geometry",
    arabicTitle: "الْقَلَمُ وَالسَّكِينَةُ",
    subtitle: "Slow bamboo-reed calligraphy & eight-fold geometric drawing as an exercise in patience",
    description:
      "Classical calligraphers called penmanship ‘the geometry of the soul’. Every deliberate stroke of the reed pen slows the breath. Open to complete beginners — all tools provided.",
    category: "Retreat",
    format: "In Sanctuary Workshop",
    schedule: "Saturdays · 11:00 GMT",
    duration: "4 Saturdays · 90 min",
    guideName: "Master Layla Darwish",
    guideRole: "Traditional Calligrapher & Illuminator",
    capacity: 20,
    image: "/images/sabuur-arches.jpg",
    highlights: [
      "Hand-carved bamboo qalam & walnut ink provided",
      "Learn to write الصَّبُور (As-Sabuur) in Naskh & Thuluth",
      "Compass-and-straightedge 8-pointed star construction",
      "Take home your framed artwork on cotton paper",
    ],
    syllabus: [
      { session: "Week 1 · Preparing the Pen & Breath", focus: "Holding the qalam and drawing the first vertical Alif." },
      { session: "Week 2 · Rhythm & Proportion", focus: "Measuring letters with the diamond dot." },
      { session: "Week 3 · Eight-Fold Symmetry", focus: "Constructing the timeless courtyard rosette with compass." },
      { session: "Week 4 · Illuminated Composition", focus: "Combining calligraphy and gold-leaf border." },
    ],
    featured: false,
    sortOrder: 6,
  },
];

export const essaysData: EssayInsert[] = [
  {
    slug: "what-sabrun-jameel-actually-means",
    title: "What Sabrun Jameel Actually Means",
    arabicEpigraph: "فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ",
    excerpt:
      "When Prophet Ya‘qub said ‘Beautiful patience’, he was not suppressing tears. He was refusing to let grief fracture his trust in Allah.",
    author: "Shaykh Tariq Al-Mansoor",
    authorRole: "Resident Scholar",
    category: "Contemplation",
    image: "/images/sabuur-hero.jpg",
    readMinutes: 6,
    publishedAt: "2026-02-14",
    blocks: [
      {
        type: "p",
        text: "We often mistake patience for numbness — biting down on pain until nothing shows on the surface. Yet when the Qur’an names the highest form of endurance, it calls it Sabrun Jameel: a patience clothed in beauty, dignity, and quiet hope.",
      },
      { type: "h2", text: "Grief and trust can share the same room" },
      {
        type: "p",
        text: "Years after Yusuf disappeared, Ya‘qub’s eyes turned white with sorrow. The Qur’an records his tears honestly. Sabr never demanded that he pretend not to hurt. Instead, his beauty lay in who he turned toward with his ache: ‘I only complain of my suffering and my grief to Allah.’",
      },
      {
        type: "quote",
        text: "“Indeed, I complain of my anguish and my sorrow only to Allah, and I know from Allah that which you do not know.”",
        source: "Surah Yusuf, 12:86",
      },
      { type: "h2", text: "Why Allah is named As-Sabuur" },
      {
        type: "p",
        text: "Among the ninety-nine Names, As-Sabuur sits as the ninety-ninth — a seal of majestic composure. Allah is never rushed by provocation, never hurried by human impatience. When a servant calls upon Yaa Sabuur, they are asking for a share of that unshakeable steadiness in the face of delay.",
      },
      { type: "h2", text: "Three marks of beautiful patience today" },
      {
        type: "list",
        items: [
          "Refusing to pass bitterness forward to people who did not cause your wound.",
          "Continuing small, faithful daily worship even when answers feel slow in arriving.",
          "Speaking truthfully to Allah in sujood while keeping composure among His creation.",
        ],
      },
      {
        type: "p",
        text: "Nothing grown slowly in the shade of sincerity is wasted. The olive tree takes years before it yields oil, yet it outlives centuries of storms.",
      },
    ],
  },
  {
    slug: "architecture-of-inner-stillness",
    title: "The Architecture of Inner Stillness",
    arabicEpigraph: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    excerpt:
      "Why classical courtyards placed water, stone, and shade at the center — and how to build a sanctuary corner inside a crowded week.",
    author: "Ustadha Salma Al-Khatib",
    authorRole: "Devotional Guide",
    category: "Sacred Space",
    image: "/images/sabuur-courtyard.jpg",
    readMinutes: 5,
    publishedAt: "2026-01-28",
    blocks: [
      {
        type: "p",
        text: "Step inside an Andalusian or Ottoman courtyard from a bustling street and your shoulders drop within three paces. The builders knew something modern screens make us forget: space teaches the soul how fast to breathe.",
      },
      { type: "h2", text: "Threshold, water, light" },
      {
        type: "p",
        text: "Every traditional sanctuary separated the marketplace from the prayer hall by a threshold of water and shade. Ablution cools hurry; filtered light softens glare; the repeated geometry reminds the eye that harmony exists beneath surface chaos.",
      },
      {
        type: "quote",
        text: "“Unquestionably, by the remembrance of Allah do hearts find rest.”",
        source: "Surah Ar-Ra‘d, 13:28",
      },
      { type: "h2", text: "Building a quiet threshold at home" },
      {
        type: "list",
        items: [
          "Dedicate one clean mat and one chair away from notifications for dawn and twilight.",
          "Keep a single volume of the Qur’an open beside a lamp you only switch on for reflection.",
          "Let the first five minutes after waking belong to remembrance before any feed.",
        ],
      },
      {
        type: "p",
        text: "You do not need carved marble arches to live inside a sanctuary. Fifteen protected minutes at dawn turns an ordinary room into a courtyard of peace.",
      },
    ],
  },
  {
    slug: "tawakkul-when-the-road-is-foggy",
    title: "Tawakkul When the Road Ahead Is Foggy",
    arabicEpigraph: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    excerpt:
      "Reliance does not mean abandoning planning — it means loosening your grip on outcomes you were never meant to control.",
    author: "Dr. Nadia Benali",
    authorRole: "Historian & Essayist",
    category: "Steadfastness",
    image: "/images/sabuur-night.jpg",
    readMinutes: 7,
    publishedAt: "2026-01-09",
    blocks: [
      {
        type: "p",
        text: "Human beings suffer twice when uncertainty arrives: once from the genuine difficulty in front of them, and a second time from trying to live ten years ahead inside a single afternoon. Tawakkul is the cure for that second exhaustion.",
      },
      { type: "h2", text: "Tie the camel, then rest" },
      {
        type: "p",
        text: "The Prophetic instruction is disarmingly balanced: tie your camel, and place your trust in Allah. Preparation without trust breeds anxiety; trust without preparation breeds neglect. Together, they produce calm, diligent peace.",
      },
      { type: "h2", text: "What patience unlocks" },
      {
        type: "p",
        text: "When we stop demanding immediate certainty, we begin noticing quiet mercies already present — a friend’s timely call, health to stand in prayer, a verse that meets us at the exact sentence we needed.",
      },
    ],
  },
];

export const reflectionsData: ReflectionInsert[] = [
  {
    authorName: "Amina S.",
    city: "London",
    theme: "Dua",
    body: "Entering my seventh month awaiting clarity on my father’s recovery. Asking everyone who reads this to whisper a dua for complete shifa and calm hearts in our home.",
    ameenCount: 42,
    approved: true,
  },
  {
    authorName: "Yusuf K.",
    city: "Toronto",
    theme: "Sabr",
    body: "Six months ago a door I prayed for closed abruptly. Tonight I look back in awe at how gently Al-Lateef rerouted my entire family into peace. Hold steady — delay is never denial.",
    ameenCount: 68,
    approved: true,
  },
  {
    authorName: "Mariam & Bilal",
    city: "Kuala Lumpur",
    theme: "Shukr",
    body: "Praying Fajr together with the dawn audio circle every morning has healed the tone of our household. Alhamdulillah for small consistent anchors.",
    ameenCount: 31,
    approved: true,
  },
  {
    authorName: "Ibrahim H.",
    city: "Chicago",
    theme: "Tawakkul",
    body: "Starting over in a new city with uncertainty ahead. Leaning wholly on HasbunAllahu wa ni‘mal-Wakeel. May Allah grant every lonely traveller quiet companionship.",
    ameenCount: 54,
    approved: true,
  },
  {
    authorName: "Zainab R.",
    city: "Manchester",
    theme: "Dua",
    body: "May Allah soften every anxious heart tonight, pay off the hidden debts of those who sit silently in sujood, and bless our mothers with long ease.",
    ameenCount: 89,
    approved: true,
  },
  {
    authorName: "Hamza T.",
    city: "Cape Town",
    theme: "Sabr",
    body: "Learning that Sabr is not waiting passively — it is refusing to stop being kind while you wait.",
    ameenCount: 47,
    approved: true,
  },
];

export const versesData: VerseInsert[] = [
  {
    surah: "Al-Baqarah",
    ayah: 153,
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    reflection: "Not merely watching from afar — ‘Allah is with the patient’ in intimate companionship.",
  },
  {
    surah: "Az-Zumar",
    ayah: 10,
    arabic: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ",
    translation: "Indeed, the patient will be given their reward without account.",
    reflection: "Every other deed is weighed and measured; patience is poured out beyond calculation.",
  },
  {
    surah: "Ash-Sharh",
    ayah: 6,
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    reflection: "Ease is not merely waiting at the end of hardship — it walks right alongside it.",
  },
  {
    surah: "Yusuf",
    ayah: 86,
    arabic: "إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ",
    translation: "I only complain of my suffering and my grief to Allah.",
    reflection: "True strength is pouring your honest heart out in private prayer.",
  },
  {
    surah: "Al-‘Asr",
    ayah: 3,
    arabic: "وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
    translation: "And advise one another to truth and advise one another to patience.",
    reflection: "Steadfastness survives longest when carried in gentle community.",
  },
];
