import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarCheck, LogOut, Mail } from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { logout } from "@/lib/actions";
import { COOKIE_NAME, passcodeConfigured, verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const store = await cookies();
  if (!verifyToken(store.get(COOKIE_NAME)?.value)) redirect("/admin/login");

  return (
    <div className="-mt-px min-h-[70vh] bg-ivory-100/60">
      <div className="border-b border-ivory-200 bg-white">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2.5 font-display text-xl font-semibold text-pine-950">
            <LogoMark className="h-8 w-8" />
            As-Sabuur Stewards
          </Link>
          <nav className="flex items-center gap-1 text-sm font-semibold" aria-label="Steward navigation">
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-stone-600 transition hover:bg-ivory-100 hover:text-pine-900">
              <CalendarCheck className="h-4 w-4" /> Gatherings &amp; Wall
            </Link>
            <Link href="/admin/messages" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-stone-600 transition hover:bg-ivory-100 hover:text-pine-900">
              <Mail className="h-4 w-4" /> Messages
            </Link>
            <form action={logout}>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-stone-600 transition hover:bg-red-50 hover:text-red-700">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </form>
          </nav>
        </div>
      </div>
      {!passcodeConfigured && (
        <p className="bg-gold-100 px-4 py-2 text-center text-xs font-medium text-gold-700">
          Portal not configured — set <code className="font-mono">ADMIN_PASSCODE</code> and{" "}
          <code className="font-mono">ADMIN_SECRET</code> in your environment variables.
        </p>
      )}
      <main className="wrap py-10">{children}</main>
    </div>
  );
}
