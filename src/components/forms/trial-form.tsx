"use client";

import { useActionState, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, Globe2, Loader2, Sparkles, User, Users } from "lucide-react";
import { submitTrialBooking, type FormState } from "@/lib/actions";
import { COURSE_GOALS } from "@/data/courses";
import { SCHEDULE_PREFERENCES, TIMEZONES } from "@/data/site";

const emptyState: FormState = { success: false, errors: {} };

export function TrialForm({
  initialGoal,
  initialAge = "Kid",
  variant = "page",
}: {
  initialGoal?: string;
  initialAge?: "Kid" | "Adult";
  variant?: "page" | "drawer";
}) {
  const [state, formAction, pending] = useActionState<Promise<FormState>, FormData>(submitTrialBooking, emptyState);

  const [fullName, setFullName] = useState("");
  const [ageGroup, setAgeGroup] = useState<"Kid" | "Adult">(initialAge);
  const [learningGoal, setLearningGoal] = useState(initialGoal ?? COURSE_GOALS[0].value);
  const [schedule, setSchedule] = useState<string>(SCHEDULE_PREFERENCES[2]);
  // Start from a stable value so server and client render identically, then
  // fill in the detected zone after hydration.
  const [timezone, setTimezone] = useState<string>(TIMEZONES[0]);
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setTimezone(`Local (${tz})`);
    } catch {
      // Keep the "Auto-detect" option
    }
  }, []);

  const err = (key: string) =>
    state.errors[key] ? <p className="mt-1.5 text-xs font-medium text-red-600">{state.errors[key]}</p> : null;
  const cls = (key: string) => `input ${state.errors[key] ? "input-error" : ""}`;

  if (state.success) {
    return (
      <div className="card p-8 text-center" aria-live="polite">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-pine-800">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <p lang="ar" dir="rtl" className="font-arabic mt-4 text-3xl text-gold-700">
          بَارَكَ اللَّهُ فِيكُمْ
        </p>
        <h2 className="mt-2 text-3xl">Your trial request is in</h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Thank you, <strong>{fullName || "friend"}</strong>. We have your request for{" "}
          <strong>{learningGoal}</strong> ({ageGroup}), in <strong>{timezone}</strong>, preferring{" "}
          <strong>{schedule.toLowerCase()}</strong>. We will contact you at{" "}
          <strong className="text-pine-950">{contact}</strong> to agree a time for the free 30-minute class.
        </p>
        <p className="mt-4 inline-block rounded-full bg-ivory-100 px-4 py-1.5 font-mono text-xs font-bold text-gold-700">
          Reference: {state.reference}
        </p>
        <p className="mt-5 text-xs text-stone-500">
          If you do not hear from us within two working days, please email{" "}
          <a href="mailto:salam@as-sabuur.com" className="link-quiet">
            salam@as-sabuur.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className={variant === "page" ? "card p-7 sm:p-9" : "space-y-5"}>
      {variant === "page" && (
        <>
          <h2 className="text-3xl">Book your free 30-minute trial</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            One-to-one with the teacher who would actually teach you. No card details, no obligation — at the end you
            receive a written recommendation for the right course and pace.
          </p>
        </>
      )}

      {state.errors.form && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {state.errors.form}
        </div>
      )}

      <div className="mt-7 space-y-5">
        <div>
          <span className="label">Who is learning?</span>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { val: "Kid", label: "A child", sub: "Under 15", icon: Users },
                { val: "Adult", label: "An adult", sub: "15 and over", icon: User },
              ] as const
            ).map((opt) => {
              const active = ageGroup === opt.val;
              return (
                <label key={opt.val} className="cursor-pointer">
                  <input
                    type="radio"
                    name="ageGroup"
                    value={opt.val}
                    checked={active}
                    onChange={() => setAgeGroup(opt.val)}
                    className="sr-only"
                  />
                  <span
                    className={`flex flex-col rounded-2xl border p-3.5 transition ${
                      active
                        ? "border-pine-800 bg-pine-900 text-ivory-50 shadow-soft"
                        : "border-ivory-300 bg-white text-pine-950 hover:border-pine-400"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <opt.icon className={`h-4 w-4 ${active ? "text-gold-300" : "text-pine-700"}`} />
                      {opt.label}
                    </span>
                    <span className={`mt-1 text-[11px] ${active ? "text-ivory-100/70" : "text-stone-500"}`}>
                      {opt.sub}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          {err("ageGroup")}
        </div>

        <div>
          <label htmlFor="trial-name" className="label">
            {ageGroup === "Kid" ? "Parent or child's name" : "Your full name"} <span className="text-red-500">*</span>
          </label>
          <input
            id="trial-name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={cls("fullName")}
            placeholder={ageGroup === "Kid" ? "e.g. Amina Rahman" : "e.g. Tariq Bennett"}
            autoComplete="name"
          />
          {err("fullName")}
        </div>

        <div>
          <label htmlFor="trial-goal" className="label">
            Course of interest <span className="text-red-500">*</span>
          </label>
          <select
            id="trial-goal"
            name="learningGoal"
            value={learningGoal}
            onChange={(e) => setLearningGoal(e.target.value)}
            className={cls("learningGoal")}
          >
            {COURSE_GOALS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {err("learningGoal")}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="trial-schedule" className="label">
              Preferred time of day <span className="text-red-500">*</span>
            </label>
            <select
              id="trial-schedule"
              name="preferredSchedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className={cls("preferredSchedule")}
            >
              {SCHEDULE_PREFERENCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {err("preferredSchedule")}
          </div>
          <div>
            <label htmlFor="trial-tz" className="label flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5 text-pine-700" /> Time zone <span className="text-red-500">*</span>
            </label>
            <input
              id="trial-tz"
              name="timezone"
              list="trial-tz-options"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={cls("timezone")}
              placeholder="e.g. London GMT"
            />
            <datalist id="trial-tz-options">
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz} />
              ))}
            </datalist>
            {err("timezone")}
          </div>
        </div>

        <div>
          <label htmlFor="trial-contact" className="label">
            WhatsApp number or email <span className="text-red-500">*</span>
          </label>
          <input
            id="trial-contact"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={cls("contact")}
            placeholder="+44 7700 900123 or you@example.com"
          />
          {err("contact")}
        </div>

        <div>
          <label htmlFor="trial-notes" className="label">
            Anything we should know?{" "}
            <span className="font-normal text-stone-400">(optional)</span>
          </label>
          <textarea
            id="trial-notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`${cls("notes")} resize-y`}
            placeholder="Preferred teacher gender, the student's current level, a learning difficulty we should accommodate…"
          />
          {err("notes")}
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn btn-gold mt-6 w-full !py-4 !text-base">
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending your request…
          </>
        ) : (
          <>
            <Clock className="h-5 w-5" /> Request my free trial
          </>
        )}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-stone-500">
        <Sparkles className="h-3.5 w-3.5 text-gold-600" />
        Free 30-minute class · No card details · No obligation
      </p>
    </form>
  );
}
