import { desc } from "drizzle-orm";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { formatDateTime, reference } from "@/lib/format";
import { AdminDeleteButton, EmptyState, MessageStatusSelect } from "@/components/admin/request-actions";

export const dynamic = "force-dynamic";

export const metadata = { title: "Steward Messages · As-Sabuur", robots: { index: false } };

export default async function AdminMessagesPage() {
  const rows = await db.select().from(messages).orderBy(desc(messages.createdAt)).limit(200);
  const unread = rows.filter((r) => r.status === "new").length;

  return (
    <div>
      <div>
        <h1 className="text-4xl">Messages</h1>
        <p className="mt-1 text-sm text-stone-600">
          {rows.length} total · {unread} unread
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="mt-8">
          <EmptyState href="/contact" label="Open Steward Desk" text="No messages yet." />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {rows.map((m) => (
            <article key={m.id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-pine-950">{m.name}</span>
                    <span className="font-mono text-xs text-stone-400">{reference(m.id, "MSG")}</span>
                  </div>
                  <p className="mt-1 text-xs text-stone-500">
                    {m.email} · {m.subject} · {formatDateTime(m.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MessageStatusSelect id={m.id} status={m.status} />
                  <AdminDeleteButton id={m.id} kind="message" />
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{m.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
