"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { login, type LoginState } from "@/lib/actions";
import { LogoMark } from "@/components/site/logo";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<Promise<LoginState>, FormData>(login, {});

  return (
    <section className="wrap py-20 lg:py-28">
      <form action={formAction} className="card mx-auto max-w-md p-8 sm:p-10">
        <LogoMark className="h-12 w-12" />
        <h1 className="mt-5 text-3xl">Steward Portal</h1>
        <p className="mt-2 text-sm text-stone-600">Enter the steward passcode to manage gatherings, Dua Wall notes, and messages.</p>
        {state.error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {state.error}
          </p>
        )}
        <label htmlFor="passcode" className="label mt-6">
          Passcode
        </label>
        <input id="passcode" name="passcode" type="password" className="input" autoComplete="current-password" required autoFocus />
        <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full">
          {pending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Entering…
            </>
          ) : (
            "Enter Console"
          )}
        </button>
        <Link href="/" className="mt-4 block text-center text-sm text-stone-500 hover:text-pine-800">
          Return to Sanctuary
        </Link>
      </form>
    </section>
  );
}
