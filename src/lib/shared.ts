export const reflectionThemes = ["Sabr", "Dua", "Shukr", "Tawakkul"] as const;
export type ReflectionTheme = (typeof reflectionThemes)[number];

export const pledgeTiers = [
  {
    id: "Olive Tree",
    name: "Olive Tree Steward",
    arabic: "شَجَرَةُ الزَّيْتُونِ",
    amount: 18,
    note: "Sustains weekly study notes & dawn audio access for seekers worldwide.",
  },
  {
    id: "Lantern",
    name: "Lantern Keeper",
    arabic: "حَامِلُ السِّرَاجِ",
    amount: 45,
    note: "Sponsors monthly sanctuary retreats, tea hospitality, and youth circles.",
  },
  {
    id: "Archway",
    name: "Archway Patron",
    arabic: "بَابُ السَّكِينَةِ",
    amount: 120,
    note: "Underwrites full scholar stipends & open scholarships for every program.",
  },
] as const;

export const rsvpStatuses = ["confirmed", "cancelled"] as const;
export type RsvpStatus = (typeof rsvpStatuses)[number];
