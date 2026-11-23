import type { MetadataRoute } from "next";
import { db } from "@/db";
import { essays, programs } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://as-sabuur.com";
  const [programRows, essayRows] = await Promise.all([db.select().from(programs), db.select().from(essays)]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/names`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/dhikr`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/programs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/journal`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/reflections`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/support`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  return [
    ...staticRoutes,
    ...programRows.map((p) => ({ url: `${base}/programs/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...essayRows.map((e) => ({ url: `${base}/journal/${e.slug}`, lastModified: e.publishedAt, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
