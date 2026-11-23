import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type EssayBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; source?: string }
  | { type: "list"; items: string[] };

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  arabicTitle: text("arabic_title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "Gathering" | "Study Circle" | "Retreat" | "Youth"
  format: text("format").notNull(), // "In Sanctuary & Live Stream" | "Online Sanctuary" | "Dawn Gathering"
  schedule: text("schedule").notNull(),
  duration: text("duration").notNull(),
  guideName: text("guide_name").notNull(),
  guideRole: text("guide_role").notNull(),
  capacity: integer("capacity").notNull().default(40),
  image: text("image").notNull(),
  highlights: jsonb("highlights").$type<string[]>().notNull(),
  syllabus: jsonb("syllabus").$type<{ session: string; focus: string }[]>().notNull(),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const programRsvps = pgTable(
  "program_rsvps",
  {
    id: serial("id").primaryKey(),
    programId: integer("program_id")
      .notNull()
      .references(() => programs.id, { onDelete: "cascade" }),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    attendanceMode: text("attendance_mode").notNull().default("online"), // "sanctuary" | "online"
    guests: integer("guests").notNull().default(1),
    intentionNote: text("intention_note").notNull().default(""),
    status: text("status").notNull().default("confirmed"), // "confirmed" | "cancelled"
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("program_rsvps_program_idx").on(t.programId)],
);

export const essays = pgTable("essays", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  arabicEpigraph: text("arabic_epigraph").notNull(),
  excerpt: text("excerpt").notNull(),
  author: text("author").notNull(),
  authorRole: text("author_role").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  readMinutes: integer("read_minutes").notNull(),
  publishedAt: text("published_at").notNull(),
  blocks: jsonb("blocks").$type<EssayBlock[]>().notNull(),
});

export const reflections = pgTable("reflections", {
  id: serial("id").primaryKey(),
  authorName: text("author_name").notNull(),
  city: text("city").notNull().default(""),
  theme: text("theme").notNull(), // "Sabr" | "Dua" | "Shukr" | "Tawakkul"
  body: text("body").notNull(),
  ameenCount: integer("ameen_count").notNull().default(1),
  approved: boolean("approved").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const pledges = pgTable("pledges", {
  id: serial("id").primaryKey(),
  donorName: text("donor_name").notNull(),
  email: text("email").notNull(),
  tier: text("tier").notNull(), // "Olive Tree" | "Lantern" | "Archway" | "Custom"
  amountUsd: integer("amount_usd").notNull(),
  frequency: text("frequency").notNull(), // "monthly" | "one-time"
  dedication: text("dedication").notNull().default(""),
  status: text("status").notNull().default("pledged"), // "pledged" | "fulfilled"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const trialBookings = pgTable("trial_bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  ageGroup: text("age_group").notNull(), // "Kid" | "Adult"
  learningGoal: text("learning_goal").notNull(),
  timezone: text("timezone").notNull(),
  contact: text("contact").notNull(), // WhatsApp or Email
  notes: text("notes").notNull().default(""),
  status: text("status").notNull().default("new"), // "new" | "scheduled" | "completed"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // "new" | "read" | "replied"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const verses = pgTable("verses", {
  id: serial("id").primaryKey(),
  surah: text("surah").notNull(),
  ayah: integer("ayah").notNull(),
  arabic: text("arabic").notNull(),
  translation: text("translation").notNull(),
  reflection: text("reflection").notNull(),
});
