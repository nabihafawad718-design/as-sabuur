"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { submitMessage, type FormState } from "@/lib/actions";

const subjects = [
  "Gathering & RSVP inquiry",
  "Private spiritual counsel",
  "Waqf & Stewardship",
  "Volunteering & Hospitality",
  "Media & Collaboration",
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState<Promise<FormState>, FormData>(submitMessage, {
    success: false,
    errors: {},
  });
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const set =
    (k: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  if (state.success) {
    return (
      <div className="card p-8 text-center sm:p-12" aria-live="polite">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pine-100 text-pine-800">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-6 text-3xl">Message received with care</h2>
        <p className="mt-3 text-stone-600">
          As-salamu alaykum {values.name.split(" ")[0]}. Our stewards will reply to{" "}
          <span className="font-semibold text-pine-950">{values.email}</span> shortly.
        </p>
        <p className="mt-2 font-mono text-xs text-gold-700">Reference {state.reference}</p>
        <Link href="/" className="btn btn-outline mt-7">
          Return to Sanctuary
        </Link>
      </div>
    );
  }

  const err = (k: string) =>
    state.errors[k] ? <p className="mt-1.5 text-xs font-medium text-red-600">{state.errors[k]}</p> : null;
  const cls = (k: string) => `input ${state.errors[k] ? "input-error" : ""}`;

  return (
    <form action={formAction} noValidate className="card p-7 sm:p-9">
      <h2 className="text-3xl">Write to the Steward Desk</h2>
      <p className="mt-2 text-sm text-stone-600">Every note is read personally by a sanctuary coordinator.</p>
      {state.errors.form && (
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          {state.errors.form}
        </div>
      )}
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Your name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" value={values.name} onChange={set("name")} className={cls("name")} placeholder="Full name" />
          {err("name")}
        </div>
        <div>
          <label htmlFor="cemail" className="label">
            Email <span className="text-red-500">*</span>
          </label>
          <input id="cemail" name="email" type="email" value={values.email} onChange={set("email")} className={cls("email")} placeholder="you@example.com" />
          {err("email")}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="subject" className="label">
          Topic <span className="text-red-500">*</span>
        </label>
        <select id="subject" name="subject" value={values.subject} onChange={set("subject")} className={cls("subject")}>
          <option value="">Choose a topic…</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {err("subject")}
      </div>
      <div className="mt-4">
        <label htmlFor="cmessage" className="label">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea id="cmessage" name="message" rows={5} value={values.message} onChange={set("message")} className={`${cls("message")} resize-y`} placeholder="How can our stewards serve you?" />
        {err("message")}
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full !py-4 !text-base">
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
