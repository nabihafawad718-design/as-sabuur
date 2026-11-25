"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Sparkles, X } from "lucide-react";
import { TrialForm } from "@/components/forms/trial-form";

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
  const [seedGoal, setSeedGoal] = useState<string | undefined>(undefined);
  const [seedAge, setSeedAge] = useState<"Kid" | "Adult">("Kid");
  const [formKey, setFormKey] = useState(0);

  const openTrial = useCallback((opts?: TrialOptions) => {
    setSeedGoal(opts?.goal);
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
        <div
          className="fixed inset-0 z-[110] flex justify-end bg-pine-950/65 backdrop-blur-md"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book your free trial class"
        >
          <div
            className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-ivory-50 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-pine-900 px-6 py-7 text-ivory-50 sm:px-8">
              <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-70" />
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-gold-400/20 blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">
                    <Sparkles className="h-3 w-3" /> Free 30-minute trial
                  </span>
                  <h2 className="mt-3 text-3xl text-ivory-50 sm:text-4xl">Begin with a conversation</h2>
                  <p className="mt-1.5 text-sm text-ivory-100/75">
                    One-to-one · No card details · Matched to your time zone
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-ivory-100 transition hover:bg-white/10"
                  aria-label="Close trial booking"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 sm:p-8">
              <TrialForm key={formKey} variant="drawer" initialGoal={seedGoal} initialAge={seedAge} />
            </div>
          </div>
        </div>
      )}
    </TrialContext.Provider>
  );
}
