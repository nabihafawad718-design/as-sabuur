import { z } from "zod";

export const rsvpSchema = z.object({
  programId: z.number().int().positive("Please choose a gathering"),
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  attendanceMode: z.enum(["sanctuary", "online"]),
  guests: z.number().int().min(1).max(6),
  intentionNote: z.string().trim().max(500).optional(),
});

export const reflectionSchema = z.object({
  authorName: z.string().trim().min(2, "Enter your name or initials").max(60),
  city: z.string().trim().max(60).optional(),
  theme: z.enum(["Sabr", "Dua", "Shukr", "Tawakkul"]),
  body: z
    .string()
    .trim()
    .min(12, "Share a few words (at least 12 characters)")
    .max(500, "Keep your reflection under 500 characters"),
});

export const pledgeSchema = z.object({
  donorName: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  tier: z.string().trim().min(2),
  amountUsd: z.number().int().min(5, "Minimum pledge is $5").max(50000),
  frequency: z.enum(["monthly", "one-time"]),
  dedication: z.string().trim().max(300).optional(),
});

export const trialBookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter the student’s or parent’s name").max(80),
  ageGroup: z.enum(["Kid", "Adult"], "Choose Kid or Adult"),
  learningGoal: z.string().trim().min(2, "Please select a learning goal").max(120),
  timezone: z.string().trim().min(2, "Please choose or enter your time zone").max(80),
  contact: z.string().trim().min(5, "Enter a valid WhatsApp number or email").max(120),
  notes: z.string().trim().max(500).optional(),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(2, "Please choose a subject"),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
});
