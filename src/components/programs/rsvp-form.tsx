"use client";

import { useActionState, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, CalendarCheck } from "lucide-react";
import { submitProgramRsvp, type FormState } from "@/lib/actions";

export function RsvpForm({ programId, programTitle }: { programId: number; programTitle: string }) {
  const [state, formAction, pending] = useActionState<Promise<FormState>, FormData>(submitProgramRsvp, {
    success: false,
    errors: {},
  });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"sanctuary" | "online">("online");
  const [guests, setGuests] = useState("1");
  const [note, setNote] = useState("");

  if (state.success) {
    return (
      <div className="card p-7 text-center" aria-live="polite">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pine-100 text-pine-800">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-2xl">Seat Confirmed</h3>
        <p className="mt-2 text-sm text-stone-600">
          We look forward to welcoming you to <strong>{programTitle}</strong>. Joining details have been prepared for{" "}
          <span className="font-semibold text-pine-950">{email}</span>.
        </p>
        <p className="mt-2 font-mono text-xs text-gold-700">Reference {state.reference}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="card p-7">
      <input type="hidden" name="programId" value={programId} />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Reserve Your Place</p>
      <h3 className="mt-1 text-2xl">Join this gathering</h3>
      <p className="mt-1 text-xs text-stone-500">All gatherings are free and open to sincere seekers.</p>

      {state.errors.form && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {state.errors.form}
        </div>
      )}

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="rsvp-name" className="label">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="rsvp-name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`input ${state.errors.fullName ? "input-error" : ""}`}
            placeholder="Your name"
          />
          {state.errors.fullName && <p className="mt-1 text-xs text-red-600">{state.errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="rsvp-email" className="label">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="rsvp-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input ${state.errors.email ? "input-error" : ""}`}
            placeholder="you@example.com"
          />
          {state.errors.email && <p className="mt-1 text-xs text-red-600">{state.errors.email}</p>}
        </div>

        <div>
          <span className="label">How will you attend?</span>
          <div className="grid grid-cols-2 gap-2.5">
            {(
              [
                ["online", "Live Stream"],
                ["sanctuary", "In Sanctuary"],
              ] as const
            ).map(([val, label]) => (
              <label key={val} className="cursor-pointer">
                <input
                  type="radio"
                  name="attendanceMode"
                  value={val}
                  checked={mode === val}
                  onChange={() => setMode(val)}
                  className="sr-only"
                />
                <span
                  className={`block rounded-xl border px-3 py-2.5 text-center text-xs font-semibold transition ${
                    mode === val
                      ? "border-pine-800 bg-pine-50 text-pine-950 shadow-soft"
                      : "border-ivory-300 bg-white text-stone-600"
                  }`}
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="rsvp-guests" className="label">
            Seats needed
          </label>
          <select id="rsvp-guests" name="guests" value={guests} onChange={(e) => setGuests(e.target.value)} className="input">
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "seat" : "seats"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rsvp-note" className="label">
            Intention or question <span className="font-normal text-stone-400">(optional)</span>
          </label>
          <textarea
            id="rsvp-note"
            name="intentionNote"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="input resize-y"
            placeholder="Anything you hope to reflect on during this circle…"
          />
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
          </>
        ) : (
          <>
            <CalendarCheck className="h-4 w-4" /> Confirm My Seat
          </>
        )}
      </button>
    </form>
  );
}
