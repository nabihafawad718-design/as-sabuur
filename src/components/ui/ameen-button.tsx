"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { incrementAmeen } from "@/lib/actions";

export function AmeenButton({ id, initialCount }: { id: number; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [said, setSaid] = useState(false);
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    if (said || pending) return;
    setSaid(true);
    setCount((c) => c + 1);
    startTransition(async () => {
      const serverCount = await incrementAmeen(id);
      if (typeof serverCount === "number") setCount(serverCount);
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
        said
          ? "border-gold-400 bg-gold-100 text-gold-700"
          : "border-ivory-300 bg-ivory-50 text-pine-800 hover:border-pine-500 hover:bg-pine-50"
      }`}
      aria-pressed={said}
    >
      <Heart className={`h-3.5 w-3.5 ${said ? "fill-gold-500 text-gold-600" : "text-pine-700"}`} />
      <span>{said ? "Ameen said" : "Say Ameen"}</span>
      <span className="font-mono text-[11px] opacity-80">· {count}</span>
    </button>
  );
}
