# Changes — Full File Manifest

Comparison of the uploaded `as-sabuur-main` project against the delivered version.

---

## Audit findings that drove the work

1. **Every image was a blank green rectangle.** All five JPGs were 12,451-byte solid `#0b3024` fills, referenced with alt text describing children reading. Seven further image paths referenced in the code (`sabuur-garden.jpg`, `sabuur-arches.jpg`, `sabuur-courtyard.jpg`, `sabuur-dawn.jpg`, `sabuur-lantern.jpg`, `sabuur-manuscript.jpg`, `sabuur-night.jpg`) did not exist at all.
2. **Fabricated social proof.** Four named testimonials with quotes, locations and outcomes; a "4.95/5" rating with five stars; four invented scholars with names, roles and biographies; "Ijazah-certified", "Azhar-certified", "35+ countries".
3. **A hard-coded admin passcode** (`sabuur123`) with the signing secret derived from it.
4. **Seven fake community prayers** seeded into the Dua Wall with invented "Ameen" counts.
5. **A second, divergent copy of the site** inside `src/lib/wp-packager.ts` (994 lines) with the same false claims, importing `sharp` which was not declared as a dependency, reading images that did not exist.
6. **Missing deployment files.** `README-DEPLOY.txt` told the user to copy `.gitignore` and `.env.example` that were not in the archive.
7. **No pricing anywhere.** No dedicated courses page. No free-trial page. The site was a retreat-centre brochure, not a commercial academy.

---

## Added — pages

| File | Purpose |
| --- | --- |
| `src/app/courses/page.tsx` | Five courses with audience, syllabus, outcomes, lesson structure, recommended plan, comparison table, Course JSON-LD |
| `src/app/pricing/page.tsx` | Five plans, prepayment table, extended lessons, family discounts, billing FAQ |

## Added — data (single source of truth)

| File | Purpose |
| --- | --- |
| `src/data/site.ts` | Business constants; WhatsApp/email; nav; time zones; schedule options |
| `src/data/pricing.ts` | Plans, prepayment maths, family discounts, inclusions |
| `src/data/courses.ts` | Five courses, full detail, plan mapping |
| `src/data/faq.ts` | Homepage and pricing FAQs (also used for FAQ schema) |
| `src/data/testimonials.ts` | Empty, permission-gated testimonial store with documentation |

## Added — art system (replaces all bitmap imagery)

| File | Purpose |
| --- | --- |
| `src/components/art/defs.tsx` | Shared gradients, lattice patterns, arch clip paths, glow filter — rendered once in the layout |
| `src/components/art/arch.tsx` | `ArchWindow` (hero), `ArchGallery` (courses), `Threshold` (about), `OpenDoor` (contact), `DawnBand` |
| `src/components/art/course-art.tsx` | Five engraved course plates: letter grid, open mushaf, makhraj arcs, 30-part hifz ring, Arabic root diagram |
| `src/components/art/cover-art.tsx` | Deterministic covers for journal and gathering cards, replacing missing images |
| `src/components/art/geometry.tsx` | Ornament, rosette, arch rows, framed panel, corner marks |

## Added — components

| File | Purpose |
| --- | --- |
| `src/components/forms/trial-form.tsx` | Shared trial form (drawer + contact page) with full fields and validation |
| `src/components/home/pillars.tsx` | Four honest teaching commitments |
| `src/components/home/story-band.tsx` | "Our history is in a classroom" — the in-person → online story |
| `src/components/home/pricing-preview.tsx` | Three headline plans |
| `src/components/home/faq-block.tsx` | Reusable FAQ section |
| `src/components/home/testimonials-section.tsx` | Renders only when real testimonials exist |

## Added — project files

`.env.example` · `.gitignore` · `README.md` · `public/og/as-sabuur-og.png` (1200×630, generated, original artwork)

## Added — documentation

`docs/MARKET-RESEARCH.md` · `docs/PRICING-STRATEGY.md` · `docs/SEO-KEYWORD-STRATEGY.md` · `docs/PHOTOGRAPHY-BRIEF.md` · `docs/CONTENT-VERIFICATION.md` · `docs/DEPLOYMENT.md` · `docs/CHANGES.md`

---

## Modified

### Commercial pages

| File | Change |
| --- | --- |
| `src/app/page.tsx` | Rebuilt around the customer journey. Removed fabricated stories, rating, community-first layout. Added pillars, story band, pricing preview, FAQ. Database reads wrapped in try/catch so the homepage renders if Postgres is down. |
| `src/app/about/page.tsx` | Completely rewritten. Removed four invented scholars. Added mission, vision, four-part philosophy, teacher standards, child/adult/revert/Hifz commitments. |
| `src/app/contact/page.tsx` | Rebuilt as the conversion page: full trial form, contact form, next steps, honest FAQ. Removed invented "courtyard hours" and location. |

### Layout and navigation

| File | Change |
| --- | --- |
| `src/app/layout.tsx` | New metadata (title template, keywords, OG, Twitter, canonical), viewport/theme colour, skip link, `ArtDefs`, `EducationalOrganization` JSON-LD, OG image path corrected |
| `src/components/site/header.tsx` | Primary nav now Courses / Pricing / About / Contact; Explore dropdown; WhatsApp rendered only when configured; active-state fix |
| `src/components/site/footer.tsx` | Rebuilt: Learn / Academy / Community / Contact columns; removed fake address and "Dawn Circle 05:30" hours |
| `src/components/site/compass.tsx` | Search index updated with the new pages; "resident scholars" removed |

### Homepage components

| File | Change |
| --- | --- |
| `src/components/home/hero.tsx` | Replaced photo collage with the `ArchWindow` composition, trial seal and course-plan card. Removed "4.95/5", "35+ countries", "certified tutors". Now a server component. |
| `src/components/home/learning-experience.tsx` | Removed photographs; added the "shape of a lesson" panel and a rosette. Removed certified/qualified claims. Kept the interactive Tajweed soundboard, now labelled as a synthesized pacing guide. |
| `src/components/home/courses-showcase.tsx` | Five courses from `src/data/courses.ts`, illustrated plates, links to `/courses#slug` |
| `src/components/home/sections.tsx` | CTA copy aligned to the trial offer; secondary link now points to `/pricing` |
| `src/components/home/trust-warmth.tsx` | **Deleted** — contained the fabricated testimonials |

### Forms and backend

| File | Change |
| --- | --- |
| `src/components/forms/contact-form.tsx` | New subjects, honest success copy, explicit email fallback |
| `src/components/trial/trial-drawer.tsx` | Now renders the shared `TrialForm`; removed the certified-teacher and "Cancel anytime" claims |
| `src/lib/validation.ts` | `preferredSchedule` added to the trial schema; notes limited to 320 characters |
| `src/lib/actions.ts` | Trial booking composes schedule + notes into the existing `notes` column (no migration needed); login fails closed when unconfigured; session cookie is `secure` in production |
| `src/lib/auth.ts` | **Security fix.** Removed the `sabuur123` fallback and the secret derived from it. Both `ADMIN_PASSCODE` and `ADMIN_SECRET` are required; `verifyToken` returns false otherwise. |
| `src/db/index.ts` | Lazy pool; no throw at import, so `next build` does not require `DATABASE_URL` |
| `src/db/seed-data.ts` | Invented scholars replaced with "As-Sabuur teaching team"; invented essay authors replaced with "As-Sabuur editorial"; seven fabricated Dua Wall entries removed; all image paths cleared |

### Preserved pages (metadata and copy fixes)

`src/app/names/page.tsx` · `src/app/dhikr/page.tsx` · `src/app/journal/page.tsx` · `src/app/journal/[slug]/page.tsx` · `src/app/reflections/page.tsx` · `src/app/programs/page.tsx` · `src/app/programs/[slug]/page.tsx` · `src/app/support/page.tsx` — canonicals added; image rendering replaced with `CoverArt`; support page rewritten so it no longer claims lessons are free or that the academy is "zero paywall".

`src/app/privacy/page.tsx` and `src/app/terms/page.tsx` — rewritten from 35-line stubs into policies that describe what the site actually collects and how the service actually works. Flagged for legal review.

### SEO and technical

`src/app/sitemap.ts` — new routes, priorities, resilient to database failure · `src/app/robots.ts` — disallows `/admin`, `/api/`, `/wp-theme` · `src/app/admin/(dashboard)/layout.tsx` — banner reflects fail-closed auth · `src/app/wp-theme/page.tsx` — redirects to `/` · `src/components/ui/cards.tsx` — `CoverArt` replaces `next/image` · `src/data/learning.ts` — rewritten (kept Tajweed samples, removed fabricated stories, global live-session cards and stale course tracks) · `src/app/globals.css` — grain, hairlines, numerals, FAQ chevron, vertical Arabic label · `package.json` — removed unused `jszip`.

---

## Removed

| File / folder | Reason |
| --- | --- |
| `public/images/*.jpg` (5) and `assets/images/*` (5) | Blank green placeholders, duplicated between two folders |
| `src/components/home/trust-warmth.tsx` | Fabricated testimonials and "Ijazah-certified" claims |
| `src/lib/wp-packager.ts`, `src/app/api/wp-theme/`, `src/components/wp/` | Generated a divergent duplicate website with the same false claims; imported undeclared `sharp`; read images that no longer exist |
| `index.html`, `style.css` (project root) | Leftover static prototype containing "certified" ×5 and "35+ countries"; not part of the Next.js app |
| `drizzle.config.json` | Duplicate config with a hard-coded local database URL; superseded by `drizzle.config.ts` (as the original README itself instructed) |

---

## Deliberately not changed

- The database schema. The new trial form's schedule field is folded into the existing `notes` column so that `drizzle-kit push` is not required for existing deployments.
- All admin console functionality (trial bookings, RSVPs, reflections, pledges, messages) and its status/delete actions.
- The 99 Names, Tasbih, Dua Wall, Journal, Gatherings and Pledge features, including their components and server actions.
- The `programs`, `essays`, `reflections`, `verses` tables and their relation to `/programs`, `/journal` and `/reflections`.
- Authentication mechanism (HMAC-signed cookie) — only its configuration is now safe.
- The visual palette, typography stack and motion system, which were already strong.
