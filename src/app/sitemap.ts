import type { MetadataRoute } from "next";
import { db } from "@/db";
import { essays, programs } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://as-sabuur.com";
  const now = new Date();

  // Dynamic content must never break the sitemap if the database is unreachable.
  let programRows: { slug: string }[] = [];
  let essayRows: { slug: string; publishedAt: string }[] = [];
  try {
    const [p, e] = await Promise.all([
      db.select({ slug: programs.slug }).from(programs),
      db.select({ slug: essays.slug, publishedAt: essays.publishedAt }).from(essays),
    ]);
    programRows = p;
    essayRows = e;
  } catch {
    // Fall through with the static routes only.
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/programs`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/names`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/dhikr`, lastModified: now, changeFrequency: "monthly", priority: 0.42 },
    { url: `${base}/reflections`, lastModified: now, changeFrequency: "daily", priority: 0.4 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.35 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...staticRoutes,
    ...programRows.map((p) => ({
      url: `${base}/programs/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    ...essayRows.map((e) => ({
      url: `${base}/journal/${e.slug}`,
      lastModified: e.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.45,
    })),
  ];
}
