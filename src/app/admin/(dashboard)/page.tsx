import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { pledges, programRsvps, programs, reflections, trialBookings } from "@/db/schema";
import { formatDateTime, reference } from "@/lib/format";
import {
  AdminDeleteButton,
  EmptyState,
  RsvpStatusSelect,
  TrialStatusSelect,
} from "@/components/admin/request-actions";

export const dynamic = "force-dynamic";

export const metadata = { title: "Steward Console · As-Sabuur", robots: { index: false } };

export default async function AdminConsolePage() {
  const [trialRows, rsvpRows, reflectionRows, pledgeRows] = await Promise.all([
    db.select().from(trialBookings).orderBy(desc(trialBookings.createdAt)).limit(100),
    db
      .select({
        id: programRsvps.id,
        fullName: programRsvps.fullName,
        email: programRsvps.email,
        attendanceMode: programRsvps.attendanceMode,
        guests: programRsvps.guests,
        intentionNote: programRsvps.intentionNote,
        status: programRsvps.status,
        createdAt: programRsvps.createdAt,
        programTitle: programs.title,
      })
      .from(programRsvps)
      .leftJoin(programs, eq(programRsvps.programId, programs.id))
      .orderBy(desc(programRsvps.createdAt))
      .limit(100),
    db.select().from(reflections).orderBy(desc(reflections.createdAt)).limit(50),
    db.select().from(pledges).orderBy(desc(pledges.createdAt)).limit(50),
  ]);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl">Sanctuary Stewardship</h1>
        <p className="mt-1 text-sm text-stone-600">
          {trialRows.length} free trial bookings · {rsvpRows.length} gathering RSVPs · {reflectionRows.length} community
          prayers · {pledgeRows.length} waqf pledges
        </p>
      </div>

      {/* Free Trial Class Bookings */}
      <section>
        <h2 className="text-2xl">Free Trial Class Bookings</h2>
        {trialRows.length === 0 ? (
          <div className="mt-4">
            <EmptyState href="/" label="Open Landing Page" text="No free trial bookings yet." />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-card border border-ivory-200 bg-white shadow-card">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-ivory-200 bg-ivory-100/70 text-xs uppercase tracking-wider text-stone-500">
                  <th className="px-4 py-3 font-semibold">Ref</th>
                  <th className="px-4 py-3 font-semibold">Learner</th>
                  <th className="px-4 py-3 font-semibold">Goal</th>
                  <th className="px-4 py-3 font-semibold">Time Zone &amp; Contact</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {trialRows.map((t) => (
                  <tr key={t.id} className="border-b border-ivory-200 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-pine-800">
                      {reference(t.id, "TRIAL")}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-pine-950">{t.fullName}</p>
                      <span className="mt-0.5 inline-block rounded-full bg-sage-100 px-2 py-0.5 text-[10px] font-bold uppercase text-pine-800">
                        {t.ageGroup}
                      </span>
                      {t.notes && <p className="mt-1 text-xs italic text-stone-500">{t.notes}</p>}
                    </td>
                    <td className="px-4 py-3 text-stone-700">{t.learningGoal}</td>
                    <td className="px-4 py-3 text-xs text-stone-600">
                      <p className="font-semibold text-pine-950">{t.contact}</p>
                      <p>{t.timezone}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">{formatDateTime(t.createdAt)}</td>
                    <td className="px-4 py-3">
                      <TrialStatusSelect id={t.id} status={t.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AdminDeleteButton id={t.id} kind="trial" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Gathering RSVPs */}
      <section>
        <h2 className="text-2xl">Gathering Reservations</h2>
        {rsvpRows.length === 0 ? (
          <div className="mt-4">
            <EmptyState href="/programs" label="View gatherings" text="No seat reservations yet." />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-card border border-ivory-200 bg-white shadow-card">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead>
                <tr className="border-b border-ivory-200 bg-ivory-100/70 text-xs uppercase tracking-wider text-stone-500">
                  <th className="px-4 py-3 font-semibold">Ref</th>
                  <th className="px-4 py-3 font-semibold">Guest</th>
                  <th className="px-4 py-3 font-semibold">Gathering</th>
                  <th className="px-4 py-3 font-semibold">Mode &amp; Seats</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rsvpRows.map((r) => (
                  <tr key={r.id} className="border-b border-ivory-200 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-pine-800">{reference(r.id, "SBR")}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-pine-950">{r.fullName}</p>
                      <p className="text-xs text-stone-500">{r.email}</p>
                      {r.intentionNote && <p className="mt-1 text-xs italic text-stone-500">{r.intentionNote}</p>}
                    </td>
                    <td className="px-4 py-3 text-stone-700">{r.programTitle ?? "Gathering"}</td>
                    <td className="px-4 py-3 text-xs text-stone-600">
                      {r.attendanceMode} · {r.guests} {r.guests === 1 ? "seat" : "seats"}
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">{formatDateTime(r.createdAt)}</td>
                    <td className="px-4 py-3">
                      <RsvpStatusSelect id={r.id} status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AdminDeleteButton id={r.id} kind="rsvp" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Wall of Steadfastness Moderation */}
      <section>
        <h2 className="text-2xl">Wall of Steadfastness Notes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {reflectionRows.map((ref) => (
            <div key={ref.id} className="card flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  {ref.theme} · {ref.ameenCount} Ameens
                </p>
                <p className="mt-2 text-sm text-pine-950">“{ref.body}”</p>
                <p className="mt-2 text-xs text-stone-500">
                  — {ref.authorName} {ref.city ? `(${ref.city})` : ""}
                </p>
              </div>
              <AdminDeleteButton id={ref.id} kind="reflection" />
            </div>
          ))}
        </div>
      </section>

      {/* Waqf Pledges */}
      {pledgeRows.length > 0 && (
        <section>
          <h2 className="text-2xl">Waqf Pledges</h2>
          <div className="mt-4 overflow-x-auto rounded-card border border-ivory-200 bg-white shadow-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-ivory-200 bg-ivory-100/70 text-xs uppercase tracking-wider text-stone-500">
                  <th className="px-4 py-3">Donor</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Dedication</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {pledgeRows.map((p) => (
                  <tr key={p.id} className="border-b border-ivory-200 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-pine-950">{p.donorName}</p>
                      <p className="text-xs text-stone-500">{p.email}</p>
                    </td>
                    <td className="px-4 py-3">{p.tier}</td>
                    <td className="px-4 py-3 font-semibold text-pine-900">
                      ${p.amountUsd} ({p.frequency})
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">{p.dedication || "—"}</td>
                    <td className="px-4 py-3 text-xs text-stone-500">{formatDateTime(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
