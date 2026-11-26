# Deployment Guide — GitHub + Vercel

---

## 1. Prerequisites

- Node.js 20 or newer (the project was developed against Node 22).
- A PostgreSQL database. [Neon](https://neon.tech) and [Supabase](https://supabase.com) both work and have free tiers.
- A GitHub account and a Vercel account.

---

## 2. Run it locally first

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```
DATABASE_URL=postgresql://...        # from Neon/Supabase, include ?sslmode=require
ADMIN_PASSCODE=<long random passcode>
ADMIN_SECRET=<at least 32 random characters>
```

Generate the two secrets:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
```

Run it twice — once for the passcode, once for the secret.

Then create the tables. Only seed sample content if this is a brand-new empty database:

```bash
npx drizzle-kit push      # creates tables from src/db/schema.ts
npm run dev

# OPTIONAL, ONLY on a brand-new empty database:
# npx tsx src/db/seed.ts
```

Open http://localhost:3000 and check:

- [ ] Homepage renders
- [ ] `/courses`, `/pricing`, `/about`, `/contact` render
- [ ] The free trial form submits and returns a reference
- [ ] The message appears at `/admin` after signing in with your passcode
- [ ] `/sitemap.xml` and `/robots.txt` return content
- [ ] `/admin` redirects to `/admin/login` when signed out

---

**Important:** `src/db/seed.ts` deletes existing program, essay, reflection and verse rows before inserting sample content. Never run it against a database containing real academy data. The homepage and the Experience, Pricing, Class Details and Global Trust pages can be previewed without sample records; database-backed pages and forms require PostgreSQL.

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "As-Sabuur website: commercial rebuild, pricing, SEO"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

**Before you push, confirm `.env` is not being committed.** `.gitignore` excludes it; verify with `git status --short` that it does not appear.

---

## 4. Deploy on Vercel

1. **Add New → Project → Import** your GitHub repository.
2. Framework preset: **Next.js** (detected automatically). Build command `npm run build`, output handled by Vercel.
3. **Environment Variables** — add these for Production, Preview and Development:

   | Name | Value |
   | --- | --- |
   | `DATABASE_URL` | Your full Postgres connection string |
   | `ADMIN_PASSCODE` | The passcode you generated |
   | `ADMIN_SECRET` | The 32+ character secret |

4. Deploy.
5. If the database is new and empty, run the schema push from your machine against the production `DATABASE_URL`:

   ```bash
   DATABASE_URL="postgresql://…production…" npx drizzle-kit push
   DATABASE_URL="postgresql://…production…" npx tsx src/db/seed.ts   # optional
   ```

   If you use Neon, the "pooled" connection string is correct for the app; use the direct (non-pooled) string for `drizzle-kit push` if the pooler rejects DDL.

---

## 5. Domain

1. Vercel → Project → **Settings → Domains → Add** `as-sabuur.com` and `www.as-sabuur.com`.
2. At your registrar, point the domain at Vercel as instructed (A record `76.76.21.21`, or a CNAME to `cname.vercel-dns.com`).
3. Set `www` to redirect to the apex domain (or the reverse — pick one and be consistent, since the canonical URLs in the code use the apex `https://as-sabuur.com`).
4. Wait for the certificate to provision, then confirm `https://as-sabuur.com` loads.

**Important:** the site's canonical URLs, sitemap and structured data all assume `https://as-sabuur.com`. If you launch on a different domain, update `SITE.url` in `src/data/site.ts` and `metadataBase` in `src/app/layout.tsx` first.

---

## 6. After deployment

- [ ] Submit `https://as-sabuur.com/sitemap.xml` in Google Search Console.
- [ ] Add the site to Bing Webmaster Tools.
- [ ] Test the trial form on the live site from a phone, on mobile data, in a different time zone.
- [ ] Confirm the success message appears and the booking appears in `/admin`.
- [ ] Check `https://as-sabuur.com/og/as-sabuur-og.png` renders — paste the URL into a social preview debugger.
- [ ] Run Lighthouse on mobile for `/` and `/pricing`.
- [ ] Set up database backups (Neon and Supabase both offer point-in-time restore on paid tiers).
- [ ] Add analytics if you want to measure conversion — the site currently ships none.

---

## 7. Environment variables reference

| Variable | Required | Used by | Notes |
| --- | --- | --- | --- |
| `DATABASE_URL` | Yes (at runtime) | Drizzle / `pg` | Build succeeds without it; database pages fail at request time. |
| `ADMIN_PASSCODE` | Yes (for admin) | `src/lib/auth.ts` | No default. Portal fails closed if absent. |
| `ADMIN_SECRET` | Yes (for admin) | `src/lib/auth.ts` | Must be at least 16 characters; 32+ recommended. Rotating it signs everyone out. |

No other secrets are used. There are no API keys, no payment keys, no email provider keys.

---

## 8. Things that are deliberately not configured

- **Payments.** No Stripe, PayPal or subscription billing. The site says so plainly. Start with Stripe Payment Links if you want to accept money quickly without code.
- **Transactional email.** Form submissions are stored in the database and shown in `/admin`; no email is sent automatically. If you want an instant notification, connect Resend or Postmark and add a send inside the relevant server action in `src/lib/actions.ts`.
- **Analytics.** None. Add a privacy-respecting provider and update the privacy policy accordingly.
- **File uploads.** None — no student images, recordings or documents can be uploaded.

---

## 9. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Build fails with `DATABASE_URL is required` | You are on an older copy of `src/db/index.ts` | The current version uses a lazy pool and does not throw at import. Confirm the file matches this repo. |
| `/admin` says sign-in is not configured | `ADMIN_PASSCODE` missing in that environment | Add it in Vercel and redeploy. |
| Forms fail with "Could not save…" | Tables not created, or bad `DATABASE_URL` | Run `npx drizzle-kit push` against the production database and check Vercel logs. |
| Sitemap empty except static pages | Database unreachable | The sitemap catches the error and serves static routes. Check `DATABASE_URL`. |
| `next build` complains about `baseUrl` | You are using TypeScript 6+ | The project pins TypeScript 5.9.3. Run `npm install` so the local version is used. |
| Images show as blank rectangles | You restored the original JPGs | Those files were blank placeholders. Use the SVG art, or follow `PHOTOGRAPHY-BRIEF.md`. |
