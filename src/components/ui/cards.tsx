import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import type { essays, programs, reflections } from "@/db/schema";
import { formatDate } from "@/lib/format";
import { CoverArt } from "@/components/art/cover-art";
import { AmeenButton } from "./ameen-button";

export type Program = typeof programs.$inferSelect;
export type Essay = typeof essays.$inferSelect;
export type Reflection = typeof reflections.$inferSelect;

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-pine-900">
        <CoverArt seed={program.slug} className="h-full w-full" label={`Cover for ${program.title}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-pine-950/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-ivory-50/95 px-3 py-1 text-xs font-semibold text-pine-900">
          {program.category}
        </span>
        <span
          lang="ar"
          dir="rtl"
          className="font-arabic absolute bottom-3 right-4 text-2xl text-gold-200 drop-shadow"
        >
          {program.arabicTitle}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold-600">
          <MapPin className="h-3.5 w-3.5" /> {program.format}
        </p>
        <h3 className="mt-2 text-2xl leading-tight">{program.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{program.subtitle}</p>
        <div className="mt-5 flex items-center justify-between border-t border-ivory-200 pt-4 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-pine-700" />
            {program.schedule.split("·")[0].trim()}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-pine-800 group-hover:text-pine-950">
            Reserve seat <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function EssayCard({ essay }: { essay: Essay }) {
  return (
    <Link
      href={`/journal/${essay.slug}`}
      className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-pine-900">
        <CoverArt seed={essay.slug} className="h-full w-full" label={`Cover for ${essay.title}`} />
        <span className="absolute left-4 top-4 rounded-full bg-ivory-50/95 px-3 py-1 text-xs font-semibold text-pine-900">
          {essay.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-3 text-xs text-stone-500">
          <span>{formatDate(essay.publishedAt)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" /> {essay.readMinutes} min read
          </span>
        </p>
        <h3 className="mt-2.5 text-2xl leading-tight">{essay.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{essay.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-pine-800 group-hover:text-pine-950">
          Read reflection
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ReflectionCard({ item }: { item: Reflection }) {
  return (
    <article className="card flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="chip bg-gold-100 text-gold-700">{item.theme}</span>
          {item.city && <span className="text-xs text-stone-400">{item.city}</span>}
        </div>
        <p className="mt-4 font-display text-xl leading-snug text-pine-950">“{item.body}”</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-ivory-200 pt-4">
        <span className="text-xs font-semibold text-stone-600">— {item.authorName}</span>
        <AmeenButton id={item.id} initialCount={item.ameenCount} />
      </div>
    </article>
  );
}
