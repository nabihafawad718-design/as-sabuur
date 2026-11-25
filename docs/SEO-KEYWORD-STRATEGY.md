# SEO & Keyword Strategy

**Prepared:** 25 November 2026

---

## What is verified and what is not

This document maps **search intent and competition qualitatively**. It does **not** contain search-volume figures, because no keyword tool (Ahrefs, Semrush, Google Keyword Planner, Search Console) was available in this environment. Inventing volumes would be worse than omitting them.

**Before publishing an SEO roadmap, run these eight terms through a keyword tool** and record volume, difficulty and CPC:

`online quran classes` · `online quran classes for kids` · `quran classes for adults` · `online tajweed classes` · `learn quran online` · `online quran academy` · `noorani qaida online` · `online hifz classes`

Add country filters for the US, UK, Canada, Australia, UAE and Saudi Arabia — the same term behaves very differently by market.

---

## Keyword map

| Cluster | Representative queries | Intent | Competition | Target page |
| --- | --- | --- | --- | --- |
| **Head commercial** | online quran classes; online quran academy; learn quran online | Commercial investigation | Very high — dominated by long-established academies | `/` |
| **Parent-specific** | online quran classes for kids; quran classes for children; quran for kids online | High-intent commercial | High | `/` (children section) → `/courses#noorani-qaida` |
| **Adult learner** | quran classes for adults; learn quran as an adult; quran for beginners adults | High-intent, underserved | Medium | `/courses` (adult framing) → `/contact` |
| **Course-specific** | noorani qaida online; online tajweed classes; online hifz classes; quranic arabic course | High-intent, lower competition | Medium | `/courses` with anchor sections |
| **Pricing** | online quran classes price; quran classes cost per month; quran academy fees | Commercial, late-stage | Medium | `/pricing` |
| **Trial** | free quran trial class; free online quran lesson | Transactional | Medium | `/contact` |
| **Local / regional** | online quran classes UK; quran classes USA; quran academy Canada | Commercial + geo | High | `/` + regional content (see below) |
| **Informational** | how long to learn quran; what is tajweed; how to memorise quran | Top of funnel | Medium | Journal articles (not yet written) |

### Priority order

1. **`online quran classes for kids`** — the highest commercial value in the category. Parents are the dominant buyer and the query is unambiguous.
2. **Course-specific terms** — `noorani qaida online`, `online tajweed classes`, `online hifz classes`. Lower volume, far lower competition, and the searcher already knows what they want. The `/courses` page now has a dedicated, anchor-linked section for each.
3. **`online quran classes`** — the head term. Realistically a 12–24 month project; do not expect early rankings. Target it through the homepage, but build authority through the two clusters above first.
4. **Pricing terms** — small volume, extremely high intent, and almost no competitor publishes clear prices. `/pricing` is well placed to win this.
5. **Adult learner terms** — genuinely underserved. Most academies write for parents only. A dedicated adult-focused article is the single best content opportunity.

---

## What has been implemented

### Per-page metadata

Every page now has a unique title, a unique meta description, a canonical URL and Open Graph tags. Titles follow `Primary keyword — qualifier · As-Sabuur`.

| Page | Title |
| --- | --- |
| `/` | Online Quran Classes for Kids & Adults · As-Sabuur |
| `/courses` | Courses & Programs — Qaida, Reading, Tajweed, Hifz, Arabic |
| `/pricing` | Pricing — Online Quran Classes from $32/month |
| `/about` | About As-Sabuur — An Established Quran Teaching House |
| `/contact` | Contact & Free Trial Booking |

### Heading hierarchy

One `<h1>` per page, containing the page's primary phrase. Section headings are `<h2>`; sub-sections inside course panels are `<h3>`. No heading is used for visual effect without semantic meaning.

### Structured data (JSON-LD)

- `EducationalOrganization` — name, URL, logo, email, area served, languages. **No address, founding date, rating or review markup**, because those facts are not verified.
- `FAQPage` — the seven homepage FAQs, matching the visible content exactly.
- `Course` + `ItemList` — the five courses, marked as online. **No `offers`/`price` markup**, because payment is not taken through the site.
- `BreadcrumbList` — on `/courses`, `/pricing`, `/about`.
- `ContactPage` — on `/contact`.

Deliberately **not** included: `Review`, `AggregateRating`, `LocalBusiness` with an invented address, or `Offer` prices. Marking up reviews that do not exist is both a Google policy violation and a misrepresentation.

### Crawl and indexing

- `sitemap.ts` — all commercial pages with sensible priorities, plus programs and journal entries. Wrapped in a try/catch so a database outage cannot break the sitemap.
- `robots.ts` — allows everything except `/admin`, `/api/` and `/wp-theme`.
- `/admin` carries `robots: noindex`.
- `/wp-theme` now redirects to `/`.

### Internal linking

The header exposes Courses, Pricing, About and Contact on every page. The footer links every course anchor, every commercial page, and the preserved community routes. Course cards link to their own page section. Pricing appears on the homepage, on every course, and in the footer — so the money page is never more than one click away.

### Performance and accessibility

- No bitmap images are loaded — all visuals are inline SVG/CSS. This removes the largest typical source of LCP weight.
- Fonts are self-hosted via `@fontsource` (no third-party font request, no layout shift from a blocked stylesheet).
- `prefers-reduced-motion` disables all animation.
- Focus-visible outlines, a skip-to-content link, labelled form controls, `aria-pressed` on the Tajweed toggles, and semantic `<details>` for FAQs.

---

## Regional targeting: what to do and what not to do

**Do not** create thin "Online Quran Classes in [City]" pages for cities the academy does not serve. Doorway pages are a Google spam policy violation and they undermine trust with the families who land on them.

**Do** one of the following, honestly:

1. **If the academy has a physical location**, create a Google Business Profile for it and add `LocalBusiness` schema with the real address. This is the strongest local signal available and it is free.
2. **If it teaches across time zones**, keep the global page and add a short, genuinely useful section on scheduling by region (already present in the contact page's time-zone field and copy).
3. **Later**, if enquiry data shows concentration in one country, write one substantial page for that market — local pricing, local school terms, local time slots, real teacher availability. One good page beats twenty thin ones.

The `<html lang="en">` is correct. If Arabic-language content is added later, it needs its own `lang="ar"` routes with `hreflang`, not machine-translated duplicates.

---

## Content plan (next 6 months)

The commercial pages are built to convert traffic. They will not generate much traffic on their own, because commercial pages rarely rank without supporting content. Four articles would do more for organic acquisition than any further page optimisation:

1. **"Online Quran classes for adults: a beginner's honest guide"** — targets the underserved adult cluster, answers the shame objection directly, links to `/courses` and `/contact`.
2. **"How long does it take to learn to read the Quran?"** — informational, high volume, naturally links to Noorani Qaida.
3. **"What is Tajweed, and do beginners need it?"** — technical credibility, links to the Tajweed course and the interactive soundboard.
4. **"Choosing an online Quran teacher: 9 questions to ask"** — positions As-Sabuur as the honest option without naming competitors, and collects email enquiries.

Each should be 1,200–1,800 words, written by a person who teaches, with a real author byline once a teacher is willing to be named. Do not publish AI-generated filler; the category is already full of it and Google's helpful-content systems are tuned against it.

---

## Measurement

Set up before launch:

- **Google Search Console** — verify the domain, submit `/sitemap.xml`, watch the Queries report for the first 90 days.
- **Bing Webmaster Tools** — cheap to add, occasionally meaningful volume.
- **Privacy-respecting analytics** (Plausible, Fathom, or Vercel Analytics) — the site currently ships no analytics at all, which means conversion cannot be measured. This is the most important gap to close before spending on anything else.
- **Conversion events**: trial form submitted, contact form submitted, pricing page viewed, course anchor clicked.

Do not add Google Analytics or advertising pixels without updating the privacy policy — it currently states, accurately, that no tracking advertising is used.
