# As-Sabuur — Online Quran Academy

A commercial website for an established Quran teaching academy expanding from in-person teaching to live, one-to-one online lessons.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · PostgreSQL · Drizzle ORM

---

## Quick start

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL, ADMIN_PASSCODE, ADMIN_SECRET
npx drizzle-kit push        # create tables
npx tsx src/db/seed.ts      # optional: seed gatherings and journal essays
npm run dev
```

Open http://localhost:3000. The admin console is at `/admin` and requires the passcode from `.env`.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next core web vitals) |

---

## Pages

**Commercial journey**

| Route | Purpose |
| --- | --- |
| `/` | Homepage: positioning, learner types, courses, approach, pricing preview, FAQ |
| `/courses` | Five courses with audience, syllabus, outcomes, lesson structure and plan |
| `/pricing` | Plans, prepayment table, family discounts, billing FAQ |
| `/about` | Brand story, mission, teaching philosophy, teacher standards |
| `/contact` | Free trial form, contact form, next steps |

**Preserved features**

`/names` (99 Names) · `/dhikr` (Tasbih) · `/programs` + `/programs/[slug]` (gatherings with RSVP) · `/journal` + `/journal/[slug]` · `/reflections` (Dua Wall) · `/support` (pledges) · `/privacy` · `/terms` · `/admin` (trial bookings, RSVPs, reflections, pledges, messages)

`/wp-theme` now redirects to `/` — see `docs/CHANGES.md` for why the WordPress packager was removed.

---

## Content that must be supplied before launch

The site is built to avoid unverifiable claims, which means a few things are intentionally empty or generic:

1. **Testimonials** — `src/data/testimonials.ts` is empty. Add only real, permissioned quotes; the sections then appear automatically on `/` and `/courses`.
2. **WhatsApp number** — `SITE.whatsapp` in `src/data/site.ts` is empty, so no WhatsApp link is rendered anywhere. Set it to an E.164 number (e.g. `+447700900123`) and `whatsappDisplay` to the readable form.
3. **Teacher names and photographs** — not invented anywhere. Add real profiles when ready.
4. **Gatherings and journal content** — seeded content is editorial placeholder with generic attribution ("As-Sabuur teaching team"). Replace with the real schedule and authors before promoting those pages.

See `docs/CONTENT-VERIFICATION.md` for the full checklist.

---

## Documentation

- `docs/MARKET-RESEARCH.md` — competitor and market research with dates and sources
- `docs/PRICING-STRATEGY.md` — recommended pricing and the reasoning behind it
- `docs/SEO-KEYWORD-STRATEGY.md` — keyword map, page targeting, technical SEO
- `docs/PHOTOGRAPHY-BRIEF.md` — shot list, dimensions, placement for future photography
- `docs/CONTENT-VERIFICATION.md` — every claim that needs sign-off
- `docs/DEPLOYMENT.md` — GitHub and Vercel instructions
- `docs/CHANGES.md` — full list of modified, added and removed files

---

## Technical notes

- **No bitmap imagery ships with the site.** The five JPGs in the original upload were identical blank green rectangles and seven referenced image paths did not exist. All visuals are original SVG/CSS art in `src/components/art/`.
- **Admin auth fails closed.** `ADMIN_PASSCODE` and `ADMIN_SECRET` are both required; there is no default passcode.
- **The database is optional at build time.** `src/db/index.ts` creates a lazy pool, so `next build` does not require `DATABASE_URL`. Pages that query the database surface configuration errors at request time.
- **No payment provider is connected.** Pricing is displayed; enrolment and payment are arranged directly with the academy.
