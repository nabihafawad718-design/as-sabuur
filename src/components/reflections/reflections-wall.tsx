"use client";

import { useActionState, useState } from "react";
import { AlertCircle, CheckCircle2, HeartHandshake, Loader2 } from "lucide-react";
import { submitReflection, type FormState } from "@/lib/actions";
import { reflectionThemes } from "@/lib/shared";
import { ReflectionCard, type Reflection } from "@/components/ui/cards";

export function ReflectionsWall({ initial }: { initial: Reflection[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [state, formAction, pending] = useActionState<Promise<FormState>, FormData>(submitReflection, {
    success: false,
    errors: {},
  });
  const [authorName, setAuthorName] = useState("");
  const [city, setCity] = useState("");
  const [theme, setTheme] = useState<string>("Dua");
  const [body, setBody] = useState("");

  const visible = filter === "All" ? initial : initial.filter((r) => r.theme === filter);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      {/* Submission Form */}
      <aside className="lg:sticky lg:top-28">
        {state.success ? (
          <div className="card p-8 text-center" aria-live="polite">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pine-100 text-pine-800">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h2 className="mt-4 text-2xl">Placed on the Wall</h2>
            <p className="mt-2 text-sm text-stone-600">
              May Allah accept your prayer and surround you with gentle ease. Reference{" "}
              <span className="font-mono font-semibold text-gold-700">{state.reference}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setBody("");
                window.location.reload();
              }}
              className="btn btn-outline mt-6"
            >
              View on wall
            </button>
          </div>
        ) : (
          <form action={formAction} noValidate className="card p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Share a Prayer or Reflection</p>
            <h2 className="mt-1 text-3xl">Leave a note of steadfastness</h2>
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              Your words appear immediately so others can whisper <em>Ameen</em> for you.
            </p>

            {state.errors.form && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {state.errors.form}
              </div>
            )}

            <div className="mt-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="ref-name" className="label">
                    Name or initials <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ref-name"
                    name="authorName"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className={`input ${state.errors.authorName ? "input-error" : ""}`}
                    placeholder="e.g. Omar K."
                  />
                  {state.errors.authorName && <p className="mt-1 text-xs text-red-600">{state.errors.authorName}</p>}
                </div>
                <div>
                  <label htmlFor="ref-city" className="label">
                    City <span className="font-normal text-stone-400">(optional)</span>
                  </label>
                  <input
                    id="ref-city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input"
                    placeholder="e.g. Bradford"
                  />
                </div>
              </div>

              <div>
                <span className="label">Theme</span>
                <div className="grid grid-cols-4 gap-2">
                  {reflectionThemes.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value={t}
                        checked={theme === t}
                        onChange={() => setTheme(t)}
                        className="sr-only"
                      />
                      <span
                        className={`block rounded-xl border py-2 text-center text-xs font-semibold transition ${
                          theme === t
                            ? "border-pine-800 bg-pine-800 text-ivory-50"
                            : "border-ivory-300 bg-white text-stone-600"
                        }`}
                      >
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="ref-body" className="label">
                  Prayer request or reflection <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="ref-body"
                  name="body"
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className={`input resize-y ${state.errors.body ? "input-error" : ""}`}
                  placeholder="Share a dua you are holding, or something Sabr has taught you…"
                />
                {state.errors.body && <p className="mt-1 text-xs text-red-600">{state.errors.body}</p>}
              </div>
            </div>

            <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sharing…
                </>
              ) : (
                <>
                  <HeartHandshake className="h-4 w-4" /> Place on the Wall
                </>
              )}
            </button>
          </form>
        )}
      </aside>

      {/* Wall Grid */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reflections">
            {["All", ...reflectionThemes].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  filter === t
                    ? "border-pine-800 bg-pine-800 text-ivory-50"
                    : "border-ivory-300 bg-white text-stone-600 hover:border-pine-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="text-xs text-stone-500">{visible.length} prayers &amp; notes</span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {visible.map((item) => (
            <ReflectionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
