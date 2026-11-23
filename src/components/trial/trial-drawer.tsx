"use client";

import {
  createContext,
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2, Clock, Globe2, Loader2, Sparkles, User, Users, X } from "lucide-react";
import { submitTrialBooking, type FormState } from "@/lib/actions";
import { courseTracks, globalTimezones } from "@/data/learning";

type TrialOptions = {
  goal?: string;
  ageGroup?: "Kid" | "Adult";
};

type TrialContextValue = {
  openTrial: (opts?: TrialOptions) => void;
};

const TrialContext = createContext<TrialContextValue | null>(null);

export function useTrialDrawer() {
  const ctx = useContext(TrialContext);
  if (!ctx) throw new Error("useTrialDrawer must be used inside TrialProvider");
  return ctx;
}

export function BookTrialButton({
  children,
  className = "btn btn-gold",
  goal,
  ageGroup,
}: {
  children: ReactNode;
  className?: string;
  goal?: string;
  ageGroup?: "Kid" | "Adult";
}) {
  const { openTrial } = useTrialDrawer();
  return (
    <button type="button" onClick={() => openTrial({ goal, ageGroup })} className={className}>
      {children}
    </button>
  );
}

export function TrialProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [seedGoal, setSeedGoal] = useState(courseTracks[0].goalValue);
  const [seedAge, setSeedAge] = useState<"Kid" | "Adult">("Kid");
  const [formKey, setFormKey] = useState(0);

  const openTrial = useCallback((opts?: TrialOptions) => {
    if (opts?.goal) setSeedGoal(opts.goal);
    if (opts?.ageGroup) setSeedAge(opts.ageGroup);
    setFormKey((k) => k + 1);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <TrialContext.Provider value={{ openTrial }}>
      {children}
      {open && (
        <TrialDrawerModal
          key={formKey}
          initialGoal={seedGoal}
          initialAge={seedAge}
          onClose={() => setOpen(false)}
        />
      )}
    </TrialContext.Provider>
  );
}

function TrialDrawerModal({
  initialGoal,
  initialAge,
  onClose,
}: {
  initialGoal: string;
  initialAge: "Kid" | "Adult";
  onClose: () => void;
}) {
  const [state, formAction, pending] = useActionState<Promise<FormState>, FormData>(submitTrialBooking, {
    success: false,
    errors: {},
  });

  const [fullName, setFullName] = useState("");
  const [ageGroup, setAgeGroup] = useState<"Kid" | "Adult">(initialAge);
  const [learningGoal, setLearningGoal] = useState(initialGoal);
  const [timezone, setTimezone] = useState(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return tz ? `Local (${tz})` : globalTimezones[1];
    } catch {
      return globalTimezones[1];
    }
  });
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");

  const err = (k: string) =>
    state.errors[k] ? <p className="mt-1 text-xs font-medium text-red-600">{state.errors[k]}</p> : null;

  return (
    <div
      className="fixed inset-0 z-[110] flex justify-end bg-pine-950/65 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book your free trial class"
    >
      <div
        className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-ivory-50 shadow-lift animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Luminous Banner */}
        <div className="relative overflow-hidden bg-pine-900 px-6 py-7 text-ivory-50 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-70" />
          <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-gold-400/20 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">
                <Sparkles className="h-3 w-3" /> Free 1-on-1 Trial Class
              </span>
              <h2 className="mt-3 text-3xl text-ivory-50 sm:text-4xl">Begin with a gentle conversation</h2>
              <p className="mt-1.5 text-sm text-ivory-100/75">
                30-minute live session · Zero payment details · Matched to your timezone
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-ivory-100 transition hover:bg-white/10"
              aria-label="Close trial booking drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 sm:p-8">
          {state.success ? (
            <div className="card p-8 text-center" aria-live="polite">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-pine-800">
                <CheckCircle2 className="h-9 w-9" />
              </span>
              <p lang="ar" dir="rtl" className="font-arabic mt-4 text-3xl text-gold-700">
                بَارَكَ اللَّهُ فِيكُمْ
              </p>
              <h3 className="mt-2 text-3xl">Your free trial is reserved</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Thank you, <strong>{fullName}</strong>. Our coordinator is matching a certified teacher for{" "}
                <strong>{learningGoal}</strong> ({ageGroup}) in <strong>{timezone}</strong> and will message{" "}
                <strong className="text-pine-950">{contact}</strong> within a few hours.
              </p>
              <p className="mt-4 inline-block rounded-full bg-ivory-100 px-4 py-1.5 font-mono text-xs font-bold text-gold-700">
                Reference: {state.reference}
              </p>
              <div className="mt-8">
                <button type="button" onClick={onClose} className="btn btn-primary w-full">
                  Return to As-Sabuur
                </button>
              </div>
            </div>
          ) : (
            <form action={formAction} noValidate className="space-y-5">
              {state.errors.form && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-xs text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {state.errors.form}
                </div>
              )}

              {/* Age Group Toggle */}
              <div>
                <span className="label">Who is learning?</span>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { val: "Kid", label: "For a Kid (5–14)", icon: Users, sub: "Playful & visual milestones" },
                      { val: "Adult", label: "For an Adult (15+)", icon: User, sub: "Calm & judgment-free" },
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

              {/* Full Name */}
              <div>
                <label htmlFor="trial-fullName" className="label">
                  {ageGroup === "Kid" ? "Parent or Child’s Name" : "Your Full Name"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="trial-fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`input ${state.errors.fullName ? "input-error" : ""}`}
                  placeholder={ageGroup === "Kid" ? "e.g. Amina & little Yusuf" : "e.g. Tariq Bennett"}
                  autoFocus
                />
                {err("fullName")}
              </div>

              {/* Learning Goal */}
              <div>
                <label htmlFor="trial-goal" className="label">
                  Preferred Learning Goal <span className="text-red-500">*</span>
                </label>
                <select
                  id="trial-goal"
                  name="learningGoal"
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className={`input ${state.errors.learningGoal ? "input-error" : ""}`}
                >
                  {courseTracks.map((c) => (
                    <option key={c.id} value={c.goalValue}>
                      {c.goalValue}
                    </option>
                  ))}
                  <option value="Not sure yet — guide me in the trial">Not sure yet — guide me in the trial</option>
                </select>
                {err("learningGoal")}
              </div>

              {/* Time Zone & Contact */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="trial-tz" className="label flex items-center gap-1.5">
                    <Globe2 className="h-3.5 w-3.5 text-pine-700" /> Time Zone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="trial-tz"
                    name="timezone"
                    list="global-tz-options"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className={`input ${state.errors.timezone ? "input-error" : ""}`}
                    placeholder="e.g. London GMT or EST"
                  />
                  <datalist id="global-tz-options">
                    {globalTimezones.map((tz) => (
                      <option key={tz} value={tz} />
                    ))}
                  </datalist>
                  {err("timezone")}
                </div>

                <div>
                  <label htmlFor="trial-contact" className="label">
                    WhatsApp or Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="trial-contact"
                    name="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className={`input ${state.errors.contact ? "input-error" : ""}`}
                    placeholder="+44 7700… or you@email.com"
                  />
                  {err("contact")}
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label htmlFor="trial-notes" className="label">
                  Preferred teacher gender or schedule note{" "}
                  <span className="font-normal text-stone-400">(optional)</span>
                </label>
                <textarea
                  id="trial-notes"
                  name="notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input resize-y"
                  placeholder="e.g. Prefer female tutor, evenings after 6pm…"
                />
              </div>

              <button type="submit" disabled={pending} className="btn btn-gold w-full !py-4 !text-base">
                {pending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Reserving your free class…
                  </>
                ) : (
                  <>
                    <Clock className="h-5 w-5" /> Confirm Free Trial Class
                  </>
                )}
              </button>

              <p className="text-center text-xs text-stone-500">
                100% free 30-minute trial · Male &amp; female certified tutors · Cancel anytime
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
