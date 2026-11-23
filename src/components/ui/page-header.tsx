import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: [string, string][];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ivory-200 bg-pattern-light">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl" />
      <div className="wrap relative py-14 lg:py-20">
        {crumbs && (
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-stone-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-pine-700">
              Home
            </Link>
            {crumbs.map(([label, href]) => (
              <span key={href} className="inline-flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                <Link href={href} className="hover:text-pine-700">
                  {label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-5xl leading-[1.02] sm:text-6xl">{title}</h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-stone-600">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
