import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { desc, eq, ne } from "drizzle-orm";
import { ArrowLeft, Clock3 } from "lucide-react";
import { db } from "@/db";
import { essays, type EssayBlock } from "@/db/schema";
import { EssayCard } from "@/components/ui/cards";
import { CtaBand } from "@/components/home/sections";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getEssay(slug: string) {
  const rows = await db.select().from(essays).where(eq(essays.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) return { title: "Essay not found" };
  return {
    title: essay.title,
    description: essay.excerpt,
    openGraph: { type: "article", images: [{ url: essay.image, width: 1200, height: 800, alt: essay.title }] },
  };
}

function Block({ block }: { block: EssayBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 text-3xl sm:text-4xl">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="mt-8 border-l-4 border-gold-400 bg-ivory-100/80 px-6 py-5">
          <p className="font-display text-2xl italic leading-snug text-pine-950">{block.text}</p>
          {block.source && <p className="mt-2 text-xs font-semibold text-gold-700">{block.source}</p>}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-stone-700">
              <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-5 text-[17px] leading-[1.8] text-stone-700">{block.text}</p>;
  }
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) notFound();

  const related = await db.select().from(essays).where(ne(essays.id, essay.id)).orderBy(desc(essays.publishedAt)).limit(2);

  return (
    <>
      <article className="wrap py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/journal" className="inline-flex items-center gap-1.5 text-sm font-semibold text-pine-800 hover:text-pine-950">
            <ArrowLeft className="h-4 w-4" /> All essays
          </Link>
          <p lang="ar" dir="rtl" className="font-arabic mt-7 text-3xl text-gold-700">
            {essay.arabicEpigraph}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-pine-700">{essay.category}</p>
          <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">{essay.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
            <span className="font-semibold text-pine-950">
              {essay.author} · {essay.authorRole}
            </span>
            <span>{formatDate(essay.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" /> {essay.readMinutes} min read
            </span>
          </p>
        </div>

        <div className="relative mx-auto mt-10 aspect-[16/8] max-w-5xl overflow-hidden rounded-[2rem] shadow-card">
          <Image src={essay.image} alt={essay.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {essay.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ivory-200 bg-ivory-100/60">
          <div className="wrap py-16">
            <h2 className="text-3xl sm:text-4xl">Continue reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((e) => (
                <EssayCard key={e.id} essay={e} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
