export type DivineName = {
  number: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  facet: "Mercy" | "Strength" | "Wisdom" | "Forbearance" | "Nearness";
  contemplation: string;
};

export const divineNames: DivineName[] = [
  { number: 1, arabic: "ٱلرَّحْمَـٰنُ", transliteration: "Ar-Rahmaan", meaning: "The Entirely Merciful", facet: "Mercy", contemplation: "Before every breath of endurance, His mercy encompasses all things." },
  { number: 2, arabic: "ٱلرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "The Especially Merciful", facet: "Mercy", contemplation: "Gentle, continuous care tailored to the quietest ache in the heart." },
  { number: 3, arabic: "ٱلْمَلِكُ", transliteration: "Al-Malik", meaning: "The Sovereign", facet: "Strength", contemplation: "Nothing shifts in creation without His permission; stillness comes from knowing who reigns." },
  { number: 4, arabic: "ٱلْقُدُّوسُ", transliteration: "Al-Quddoos", meaning: "The Pure & Sacred", facet: "Wisdom", contemplation: "Above flaw, haste, or imperfection — purifying the soul through seasons of waiting." },
  { number: 5, arabic: "ٱلسَّلَامُ", transliteration: "As-Salaam", meaning: "The Source of Peace", facet: "Nearness", contemplation: "True peace is not the absence of storms, but shelter inside His remembrance." },
  { number: 6, arabic: "ٱلْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Granter of Security", facet: "Nearness", contemplation: "He anchors the trembling heart when outcomes remain unseen." },
  { number: 7, arabic: "ٱلْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "The Guardian", facet: "Strength", contemplation: "Every unseen hour of your perseverance is watched and guarded." },
  { number: 8, arabic: "ٱلْعَزِيزُ", transliteration: "Al-'Azeez", meaning: "The Almighty", facet: "Strength", contemplation: "Dignity belongs to the one who leans on the Unbreakable." },
  { number: 9, arabic: "ٱلْحَكِيمُ", transliteration: "Al-Hakeem", meaning: "The All-Wise", facet: "Wisdom", contemplation: "Delay in His wisdom is often protection disguised as waiting." },
  { number: 10, arabic: "ٱلْغَفَّارُ", transliteration: "Al-Ghaffaar", meaning: "The Ever-Forgiving", facet: "Mercy", contemplation: "No stumble disqualifies you from beginning again with grace." },
  { number: 11, arabic: "ٱلْوَدُودُ", transliteration: "Al-Wadood", meaning: "The Most Loving", facet: "Mercy", contemplation: "A steadfast love that draws near to those who turn back with patience." },
  { number: 12, arabic: "ٱلْوَكِيلُ", transliteration: "Al-Wakeel", meaning: "The Disposer of Affairs", facet: "Nearness", contemplation: "Entrust the outcome to Him, and walk calmly through the present step." },
  { number: 13, arabic: "ٱللَّطِيفُ", transliteration: "Al-Lateef", meaning: "The Subtle & Kind", facet: "Wisdom", contemplation: "He arranges relief through paths too delicate for the human eye to trace." },
  { number: 14, arabic: "ٱلْخَبِيرُ", transliteration: "Al-Khabeer", meaning: "The All-Aware", facet: "Wisdom", contemplation: "He knows the unspoken weight behind every silent prayer." },
  { number: 15, arabic: "ٱلْحَلِيمُ", transliteration: "Al-Haleem", meaning: "The Most Forbearing", facet: "Forbearance", contemplation: "Never provoked to haste; teaching the heart measured composure." },
  { number: 16, arabic: "ٱلْكَرِيمُ", transliteration: "Al-Kareem", meaning: "The Most Generous", facet: "Mercy", contemplation: "Giving beyond merit, and honouring patience with abundance." },
  { number: 17, arabic: "ٱلْمُجِيبُ", transliteration: "Al-Mujeeb", meaning: "The Responsive", facet: "Nearness", contemplation: "Every sincere whisper ascends and is answered in its finest hour." },
  { number: 18, arabic: "ٱلْقَوِيُّ", transliteration: "Al-Qawiyy", meaning: "The All-Strong", facet: "Strength", contemplation: "When human resolve thins, His strength carries the believer across." },
  { number: 19, arabic: "ٱلْمَتِينُ", transliteration: "Al-Mateen", meaning: "The Firm & Steadfast", facet: "Strength", contemplation: "Unshakeable constancy in promise, mercy, and decree." },
  { number: 20, arabic: "ٱلْوَلِيُّ", transliteration: "Al-Waliyy", meaning: "The Protecting Friend", facet: "Nearness", contemplation: "He walks beside the lonely seeker and turns darkness into guidance." },
  { number: 21, arabic: "ٱلْفَتَّاحُ", transliteration: "Al-Fattaah", meaning: "The Opener", facet: "Wisdom", contemplation: "When every earthly door seems sealed, one word from Him opens horizons." },
  { number: 22, arabic: "ٱلشَّكُورُ", transliteration: "Ash-Shakoor", meaning: "The Appreciative", facet: "Mercy", contemplation: "He multiplies the smallest seed of steadfastness into eternal reward." },
  { number: 23, arabic: "ٱلنُّورُ", transliteration: "An-Noor", meaning: "The Light", facet: "Nearness", contemplation: "Illumination that turns endurance into clarity and inner dawn." },
  { number: 24, arabic: "ٱلْهَادِي", transliteration: "Al-Haadee", meaning: "The Guide", facet: "Wisdom", contemplation: "Gentle direction one step at a time, never abandoning the traveller." },
  { number: 25, arabic: "ٱلرَّؤُوفُ", transliteration: "Ar-Ra'oof", meaning: "The Most Compassionate", facet: "Forbearance", contemplation: "Tender forbearance that lightens burdens before we even feel them." },
  { number: 26, arabic: "ٱلْعَفُوُّ", transliteration: "Al-'Afuww", meaning: "The Pardoner", facet: "Forbearance", contemplation: "Erasing faults completely so the soul stands unburdened and free." },
  { number: 27, arabic: "ٱلرَّشِيدُ", transliteration: "Ar-Rasheed", meaning: "The Guide to the Right Path", facet: "Wisdom", contemplation: "Leading events in quiet harmony toward what is best for the soul." },
  { number: 28, arabic: "ٱلْبَاقِي", transliteration: "Al-Baaqee", meaning: "The Everlasting", facet: "Strength", contemplation: "All passing grief fades before the One who eternally remains." },
  { number: 99, arabic: "ٱلصَّبُورُ", transliteration: "As-Sabuur", meaning: "The Patient, The Timeless Steadfast One", facet: "Forbearance", contemplation: "He does not hasten retribution or rush unfolding wisdom; in His stillness we learn beautiful patience (Sabrun Jameel)." },
];

export type DhikrPhrase = {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  recommended: number;
  occasion: string;
};

export const dhikrLibrary: DhikrPhrase[] = [
  {
    id: "ya-sabuur",
    arabic: "يَا صَبُورُ",
    transliteration: "Yaa Sabuur",
    meaning: "O Most Patient and Steadfast — anchor my heart in calm endurance.",
    recommended: 99,
    occasion: "Steadfastness in waiting",
  },
  {
    id: "subhanallah",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "SubhaanAllahi wa bihamdihi",
    meaning: "Glory be to Allah and praise Him.",
    recommended: 100,
    occasion: "Morning & evening lightness",
  },
  {
    id: "hasbunallah",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "HasbunAllahu wa ni‘mal-Wakeel",
    meaning: "Allah is sufficient for us, and He is the best Disposer of affairs.",
    recommended: 33,
    occasion: "Relief from anxiety",
  },
  {
    id: "la-hawla",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Laa hawla wa laa quwwata illaa billaah",
    meaning: "There is no power and no strength except through Allah.",
    recommended: 33,
    occasion: "When strength feels thin",
  },
  {
    id: "rabbi-ishrah",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    transliteration: "Rabbi-shrah lee sadree wa yassir lee amree",
    meaning: "My Lord, expand my chest for me and ease my task for me.",
    recommended: 33,
    occasion: "Clarity & ease",
  },
  {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaahal-‘Adheem wa atoobu ilayh",
    meaning: "I seek forgiveness from Allah the Almighty and turn to Him in repentance.",
    recommended: 99,
    occasion: "Renewal of the heart",
  },
];

export const prayerTimesSample = [
  { name: "Fajr", arabic: "الفجر", time: "05:14", note: "Dawn stillness" },
  { name: "Dhuhr", arabic: "الظهر", time: "12:28", note: "Midday pause" },
  { name: "Asr", arabic: "العصر", time: "15:46", note: "Afternoon reflection" },
  { name: "Maghrib", arabic: "المغرب", time: "18:22", note: "Sunset gratitude" },
  { name: "Isha", arabic: "العشاء", time: "19:49", note: "Night tranquility" },
];
