"use client";

import { useActionState, useState } from "react";
import { AlertCircle, CheckCircle2, HeartHandshake, Loader2 } from "lucide-react";
import { submitPledge, type FormState } from "@/lib/actions";
import { pledgeTiers } from "@/lib/shared";

export function PledgeForm() {
  const [state, formAction, pending] = useActionState<Promise<FormState>, FormData>(submitPledge, {
    success: false,
    errors: {},
  });
  const [selectedTier, setSelectedTier] = useState<string>(pledgeTiers[1].id);
  const [amount, setAmount] = useState<string>(String(pledgeTiers[1].amount));
  const [frequency, setFrequency] = useState<"monthly" | "one-time">("monthly");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [dedication, setDedication] = useState("");

  const pickTier = (id: string, defaultAmount: number) => {
    setSelectedTier(id);
    setAmount(String(defaultAmount));
  };

  if (state.success) {
    return (
      <div className="card p-8 text-center sm:p-10" aria-live="polite">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pine-100 text-pine-800">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-3xl">JazakAllahu Khayran</h3>
        <p className="mt-3 text-sm text-stone-600">
          Your {frequency} stewardship pledge of <strong>${amount}</strong> ({selectedTier}) has been recorded under{" "}
          <span className="font-mono font-semibold text-gold-700">{state.reference}</span>. Our steward desk will send
          your endowment confirmation to <span className="font-semibold text-pine-950">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="card p-7 sm:p-9">
      <input type="hidden" name="tier" value={selectedTier} />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Waqf &amp; Stewardship</p>
      <h2 className="mt-1 text-3xl">Keep every circle open &amp; free</h2>
      <p className="mt-2 text-sm text-stone-600">
        As-Sabuur charges zero fees for gatherings or classes. Choose a stewardship tier below.
      </p>

      {state.errors.form && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {state.errors.form}
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {pledgeTiers.map((t) => {
          const active = selectedTier === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => pickTier(t.id, t.amount)}
              className={`rounded-2xl border p-4 text-left transition ${
                active ? "border-gold-400 bg-pine-900 text-ivory-50 shadow-lift" : "border-ivory-300 bg-white hover:border-pine-500"
              }`}
            >
              <span lang="ar" dir="rtl" className={`font-arabic text-base ${active ? "text-gold-300" : "text-gold-700"}`}>
                {t.arabic}
              </span>
              <p className={`mt-1 text-sm font-semibold ${active ? "text-ivory-50" : "text-pine-950"}`}>{t.name}</p>
              <p className={`mt-2 font-display text-3xl ${active ? "text-gold-300" : "text-pine-900"}`}>${t.amount}</p>
              <p className={`mt-1 text-[11px] leading-snug ${active ? "text-ivory-100/70" : "text-stone-500"}`}>{t.note}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pledge-amount" className="label">
            Amount (USD) <span className="text-red-500">*</span>
          </label>
          <input
            id="pledge-amount"
            name="amountUsd"
            type="number"
            min={5}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setSelectedTier("Custom");
            }}
            className={`input ${state.errors.amountUsd ? "input-error" : ""}`}
          />
          {state.errors.amountUsd && <p className="mt-1 text-xs text-red-600">{state.errors.amountUsd}</p>}
        </div>
        <div>
          <span className="label">Cadence</span>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["monthly", "Monthly"],
                ["one-time", "One-time"],
              ] as const
            ).map(([val, label]) => (
              <label key={val} className="cursor-pointer">
                <input
                  type="radio"
                  name="frequency"
                  value={val}
                  checked={frequency === val}
                  onChange={() => setFrequency(val)}
                  className="sr-only"
                />
                <span
                  className={`block rounded-xl border py-2.5 text-center text-sm font-semibold transition ${
                    frequency === val ? "border-pine-800 bg-pine-50 text-pine-950" : "border-ivory-300 bg-white text-stone-600"
                  }`}
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="donor-name" className="label">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            id="donor-name"
            name="donorName"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className={`input ${state.errors.donorName ? "input-error" : ""}`}
            placeholder="Full name"
          />
          {state.errors.donorName && <p className="mt-1 text-xs text-red-600">{state.errors.donorName}</p>}
        </div>
        <div>
          <label htmlFor="donor-email" className="label">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="donor-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input ${state.errors.email ? "input-error" : ""}`}
            placeholder="you@example.com"
          />
          {state.errors.email && <p className="mt-1 text-xs text-red-600">{state.errors.email}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="pledge-dedication" className="label">
          Sadaqah Jariyah dedication <span className="font-normal text-stone-400">(optional)</span>
        </label>
        <input
          id="pledge-dedication"
          name="dedication"
          value={dedication}
          onChange={(e) => setDedication(e.target.value)}
          className="input"
          placeholder="In honour or memory of a loved one…"
        />
      </div>

      <button type="submit" disabled={pending} className="btn btn-gold mt-6 w-full !py-3.5">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Recording Pledge…
          </>
        ) : (
          <>
            <HeartHandshake className="h-4 w-4" /> Record Stewardship Pledge
          </>
        )}
      </button>
    </form>
  );
}
