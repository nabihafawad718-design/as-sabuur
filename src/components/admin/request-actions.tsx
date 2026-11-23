"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteMessage,
  deleteReflection,
  deleteRsvp,
  deleteTrialBooking,
  setMessageStatus,
  setRsvpStatus,
  setTrialBookingStatus,
} from "@/lib/actions";

export function TrialStatusSelect({ id, status }: { id: number; status: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(() => setTrialBookingStatus(id, e.target.value as "new" | "scheduled" | "completed"))}
      className="input !w-auto !py-1.5 !pr-8 text-xs font-semibold"
      aria-label="Update trial booking status"
    >
      <option value="new">New</option>
      <option value="scheduled">Scheduled</option>
      <option value="completed">Completed</option>
    </select>
  );
}

export function RsvpStatusSelect({ id, status }: { id: number; status: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(() => setRsvpStatus(id, e.target.value as "confirmed" | "cancelled"))}
      className="input !w-auto !py-1.5 !pr-8 text-xs font-semibold"
      aria-label="Update RSVP status"
    >
      <option value="confirmed">Confirmed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}

export function MessageStatusSelect({ id, status }: { id: number; status: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(() => setMessageStatus(id, e.target.value as "new" | "read" | "replied"))}
      className="input !w-auto !py-1.5 !pr-8 text-xs font-semibold"
      aria-label="Update message status"
    >
      <option value="new">New</option>
      <option value="read">Read</option>
      <option value="replied">Replied</option>
    </select>
  );
}

export function AdminDeleteButton({
  id,
  kind,
}: {
  id: number;
  kind: "rsvp" | "reflection" | "message" | "trial";
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm("Remove this entry permanently?")) {
          startTransition(() => {
            if (kind === "trial") return deleteTrialBooking(id);
            if (kind === "rsvp") return deleteRsvp(id);
            if (kind === "reflection") return deleteReflection(id);
            return deleteMessage(id);
          });
        }
      }}
      className="rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
      aria-label="Delete entry"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function EmptyState({ href, label, text }: { href: string; label: string; text: string }) {
  return (
    <div className="card p-12 text-center">
      <p className="font-display text-2xl">{text}</p>
      <Link href={href} className="btn btn-primary mt-5">
        {label}
      </Link>
    </div>
  );
}
