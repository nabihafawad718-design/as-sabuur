import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * The pool is created lazily by `pg`: no connection is opened until the first
 * query. This means `next build` can type-check and render pages that do not
 * touch the database even when DATABASE_URL is not present in the build
 * environment. Pages that do query the database fail at request time, which is
 * the correct place to surface a misconfiguration — the admin console shows
 * the error instead of the whole build failing.
 */
const databaseUrl = process.env.DATABASE_URL ?? "";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
