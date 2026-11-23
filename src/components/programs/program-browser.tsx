"use client";

import { useState } from "react";
import { ProgramCard, type Program } from "@/components/ui/cards";

const categories = ["All", "Study Circle", "Gathering", "Retreat", "Youth"] as const;

export function ProgramBrowser({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const visible = active === "All" ? programs : programs.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gatherings by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active === c
                ? "border-pine-800 bg-pine-800 text-ivory-50 shadow-soft"
                : "border-ivory-300 bg-white text-stone-600 hover:border-pine-500"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-stone-500">
        Showing {visible.length} of {programs.length} gatherings
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>
    </div>
  );
}
