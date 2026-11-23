"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { messages, pledges, programRsvps, reflections, trialBookings } from "@/db/schema";
import { COOKIE_NAME, createToken, PASSCODE } from "@/lib/auth";
import {
  contactMessageSchema,
  pledgeSchema,
  reflectionSchema,
  rsvpSchema,
  trialBookingSchema,
} from "@/lib/validation";

export type FormState = {
  success: boolean;
  errors: Record<string, string>;
  reference?: string;
};

type ZodIssues = { issues: { path: PropertyKey[]; message: string }[] };

function safeRevalidate(path: string) {
  try {
    revalidatePath(path);
  } catch {
    // No Next.js request store outside server runtime (e.g. CLI test scripts)
  }
}

function toErrors(error: ZodIssues): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export async function submitTrialBooking(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    ageGroup: String(formData.get("ageGroup") ?? "Kid"),
    learningGoal: String(formData.get("learningGoal") ?? ""),
    timezone: String(formData.get("timezone") ?? ""),
    contact: String(formData.get("contact") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  };

  const parsed = trialBookingSchema.safeParse(raw);
  if (!parsed.success) return { success: false, errors: toErrors(parsed.error) };

  try {
    const [row] = await db
      .insert(trialBookings)
      .values({
        fullName: parsed.data.fullName,
        ageGroup: parsed.data.ageGroup,
        learningGoal: parsed.data.learningGoal,
        timezone: parsed.data.timezone,
        contact: parsed.data.contact,
        notes: parsed.data.notes ?? "",
        status: "new",
      })
      .returning({ id: trialBookings.id });

    safeRevalidate("/admin");
    return { success: true, errors: {}, reference: `TRIAL-${String(row.id).padStart(4, "0")}` };
  } catch {
    return { success: false, errors: { form: "Could not save your free trial request. Please try again." } };
  }
}

export async function setTrialBookingStatus(id: number, status: "new" | "scheduled" | "completed") {
  await db.update(trialBookings).set({ status }).where(eq(trialBookings.id, id));
  safeRevalidate("/admin");
}

export async function deleteTrialBooking(id: number) {
  await db.delete(trialBookings).where(eq(trialBookings.id, id));
  safeRevalidate("/admin");
}

export async function submitProgramRsvp(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    programId: Number(formData.get("programId") ?? 0),
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    attendanceMode: String(formData.get("attendanceMode") ?? "online"),
    guests: Number(formData.get("guests") ?? 1),
    intentionNote: String(formData.get("intentionNote") ?? ""),
  };

  const parsed = rsvpSchema.safeParse(raw);
  if (!parsed.success) return { success: false, errors: toErrors(parsed.error) };

  try {
    const [row] = await db
      .insert(programRsvps)
      .values({
        programId: parsed.data.programId,
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        attendanceMode: parsed.data.attendanceMode,
        guests: parsed.data.guests,
        intentionNote: parsed.data.intentionNote ?? "",
        status: "confirmed",
      })
      .returning({ id: programRsvps.id });

    safeRevalidate("/programs");
    safeRevalidate("/admin");
    return { success: true, errors: {}, reference: `SBR-${String(row.id).padStart(4, "0")}` };
  } catch {
    return { success: false, errors: { form: "Could not confirm your seat right now. Please try again." } };
  }
}

export async function submitReflection(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    authorName: String(formData.get("authorName") ?? ""),
    city: String(formData.get("city") ?? ""),
    theme: String(formData.get("theme") ?? "Sabr"),
    body: String(formData.get("body") ?? ""),
  };

  const parsed = reflectionSchema.safeParse(raw);
  if (!parsed.success) return { success: false, errors: toErrors(parsed.error) };

  try {
    const [row] = await db
      .insert(reflections)
      .values({
        authorName: parsed.data.authorName,
        city: parsed.data.city ?? "",
        theme: parsed.data.theme,
        body: parsed.data.body,
        ameenCount: 1,
        approved: true,
      })
      .returning({ id: reflections.id });

    safeRevalidate("/reflections");
    safeRevalidate("/");
    safeRevalidate("/admin");
    return { success: true, errors: {}, reference: `DUA-${String(row.id).padStart(4, "0")}` };
  } catch {
    return { success: false, errors: { form: "Could not post your reflection. Please try again." } };
  }
}

export async function incrementAmeen(id: number): Promise<number | null> {
  try {
    const [updated] = await db
      .update(reflections)
      .set({ ameenCount: sql`${reflections.ameenCount} + 1` })
      .where(eq(reflections.id, id))
      .returning({ ameenCount: reflections.ameenCount });
    safeRevalidate("/reflections");
    safeRevalidate("/");
    return updated?.ameenCount ?? null;
  } catch {
    return null;
  }
}

export async function submitPledge(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    donorName: String(formData.get("donorName") ?? ""),
    email: String(formData.get("email") ?? ""),
    tier: String(formData.get("tier") ?? "Olive Tree"),
    amountUsd: Number(formData.get("amountUsd") ?? 0),
    frequency: String(formData.get("frequency") ?? "monthly"),
    dedication: String(formData.get("dedication") ?? ""),
  };

  const parsed = pledgeSchema.safeParse(raw);
  if (!parsed.success) return { success: false, errors: toErrors(parsed.error) };

  try {
    const [row] = await db
      .insert(pledges)
      .values({
        donorName: parsed.data.donorName,
        email: parsed.data.email,
        tier: parsed.data.tier,
        amountUsd: parsed.data.amountUsd,
        frequency: parsed.data.frequency,
        dedication: parsed.data.dedication ?? "",
        status: "pledged",
      })
      .returning({ id: pledges.id });

    safeRevalidate("/admin");
    return { success: true, errors: {}, reference: `WAQF-${String(row.id).padStart(4, "0")}` };
  } catch {
    return { success: false, errors: { form: "Could not save your stewardship pledge. Please try again." } };
  }
}

export async function submitMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = contactMessageSchema.safeParse(raw);
  if (!parsed.success) return { success: false, errors: toErrors(parsed.error) };

  try {
    const [row] = await db
      .insert(messages)
      .values({ ...parsed.data, status: "new" })
      .returning({ id: messages.id });
    safeRevalidate("/admin/messages");
    return { success: true, errors: {}, reference: `MSG-${String(row.id).padStart(4, "0")}` };
  } catch {
    return { success: false, errors: { form: "Something went wrong. Please try again." } };
  }
}

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const passcode = String(formData.get("passcode") ?? "");
  if (passcode !== PASSCODE) return { error: "Incorrect steward passcode." };
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/admin/login");
}

export async function setRsvpStatus(id: number, status: "confirmed" | "cancelled") {
  await db.update(programRsvps).set({ status }).where(eq(programRsvps.id, id));
  revalidatePath("/admin");
}

export async function deleteRsvp(id: number) {
  await db.delete(programRsvps).where(eq(programRsvps.id, id));
  revalidatePath("/admin");
}

export async function deleteReflection(id: number) {
  await db.delete(reflections).where(eq(reflections.id, id));
  revalidatePath("/admin");
  revalidatePath("/reflections");
}

export async function setMessageStatus(id: number, status: "new" | "read" | "replied") {
  await db.update(messages).set({ status }).where(eq(messages.id, id));
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: number) {
  await db.delete(messages).where(eq(messages.id, id));
  revalidatePath("/admin/messages");
}
