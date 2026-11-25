# Content Verification Checklist

Every factual claim on the website should be true, and provable if a customer asks. This document lists each claim, where it appears, and what is required before launch.

**Legend:** ✅ supplied by the client · ⚠️ policy to confirm · ❌ needs real data · 🔒 legal review

---

## 1. Claims about the academy

| Claim | Where | Status | Action |
| --- | --- | --- | --- |
| "An established Quran teaching house" / "taught in person long before we taught online" | Header, hero, About, footer | ✅ | Based on your statement that the academy teaches many students in person. **No years are claimed anywhere** — do not add "since 20XX" unless it is accurate. |
| "In-person teaching continues locally. Online lessons are available worldwide." | Footer, Contact | ⚠️ | Confirm in-person classes are still running at the time of launch. |
| "The same teachers, the same patience, the same steady method" | Hero | ⚠️ | Confirm the online teachers are drawn from the existing teaching team, not newly recruited. If some are new, soften to "the same method". |
| "One teacher per student, every lesson" | Hero trust points, pillars | ⚠️ | Confirm no rotating-pool model is used. |
| "New teachers are observed before taking their own students, and continue to be observed" | About, teacher standards | ⚠️ | This is written as policy. Confirm the academy actually operates this way, or remove the line. |
| Teacher standards list (accurate recitation, explains clearly, corrects without harshness, prepares lessons, safeguarding) | About | ⚠️ | Confirm each line is a standard the academy actually holds and can enforce. |
| "Parents may sit in at any time" | About, Contact, FAQ | ⚠️ | Confirm this is operationally true for every teacher. |
| "We do not publish a student's name, photograph or work without written permission" | About, Privacy | ⚠️ | Confirm, and put it in the enrolment agreement. |

---

## 2. Claims about the service

| Claim | Where | Status | Action |
| --- | --- | --- | --- |
| "Free 30-minute trial, no card details" | Sitewide | ✅ | Implemented: the trial form collects no payment information. |
| "A written learning plan after the trial" | Hero, FAQ, Pricing, CTA | ⚠️ | The trial form does **not** automate this. Someone must actually send it. Decide who, and within what timeframe. |
| "Monthly progress notes" | Pricing, About, FAQ, learning experience | ⚠️ | Same: a human process. If teachers will not reliably write these, remove the claim rather than disappoint families. |
| "Make-up lessons for missed sessions with notice" | Pricing, Terms | ⚠️ | Confirm the policy and the notice period (currently unspecified — specify it in Terms). |
| "No registration fee and no long-term contract" | Pricing, FAQ | ✅ | Matches the published pricing model. |
| "We aim to reply within two working days" | Contact, form success | ⚠️ | Confirm this is achievable. Change to "within one working day" only if it genuinely is. |
| Course durations ("typically 2–4 months…") | Courses | ⚠️ | Written as observations, explicitly labelled "not a guarantee". Confirm they reflect real experience. |
| Sibling discounts 10% / 15%, prepayment 5% / 10% / 15% | Pricing | ⚠️ | These are recommendations. Confirm before quoting them to a customer. |
| Prices $32–$100/month | Pricing, Courses, Home | ⚠️ | Recommended, not yet approved. See `PRICING-STRATEGY.md`. |

---

## 3. Things intentionally left empty

| Item | Where | Why | How to fill |
| --- | --- | --- | --- |
| **Testimonials** | `src/data/testimonials.ts` | Inventing reviews is misrepresentation and a Google policy violation | Collect real feedback with written permission. Add entries with `permissionConfirmed: true`; sections appear automatically on `/` and `/courses`. |
| **Star rating / review count** | nowhere | The original site showed "4.95/5" with no source. Removed. | Only add if you have a real, verifiable rating source. |
| **WhatsApp number** | `SITE.whatsapp` in `src/data/site.ts` | No verified number was supplied | Set `whatsapp` to E.164 format and `whatsappDisplay` to the readable version. Every WhatsApp surface then appears automatically. |
| **Teacher names, photos, credentials** | nowhere | The original site invented four scholars with names, roles and biographies. All removed. | Add real profiles when teachers consent to being named publicly. |
| **Student counts, "35+ countries", "Ijazah-certified", "Azhar-certified"** | nowhere | Unverifiable and, in the original site, invented. All removed. | Add only with evidence you are willing to show a customer. |
| **Physical address** | nowhere | Not supplied | Add to the footer, Contact page and `LocalBusiness` schema if the academy has a public teaching address. |

---

## 4. Seeded content that needs editorial review

These pages are functional but contain placeholder editorial content:

- **Gatherings** (`/programs`) — six programmes with schedules, capacities and syllabi. Attribution is now generic ("As-Sabuur teaching team"). **Confirm or replace the schedule before promoting these pages.** Advertising a circle that does not run will damage trust more than an empty page.
- **Journal** (`/journal`) — three essays attributed to "As-Sabuur editorial". Read them; keep what you are happy to stand behind, delete the rest.
- **Dua Wall** (`/reflections`) — seeded with **zero** entries. The original seed contained five invented prayers with invented "Ameen" counts. They were removed because fabricated community activity is exactly the kind of thing customers eventually discover.

---

## 5. Religious content accuracy

- **The 99 Names dataset** (`src/data/sacred.ts`) was carried over from the original project and was **not** independently verified in this build. Have a knowledgeable person review the Arabic, transliteration and meanings before the page is promoted. An error here is more serious than a typo.
- **Qur'anic quotations** used in typography (Al-Baqarah 2:153, 2:155; Ash-Sharh 94:6; Al-Ikhlas 112:1; At-Tariq 86:1; Al-Ma'arij 70:5) should be checked against a printed mushaf, including diacritics.
- **Tajweed soundboard descriptions** are simplified teaching cues, not a substitute for a teacher. They are labelled as a "synthesized pacing guide, not a recitation recording" — keep that label.
- The audio produced by the soundboard is a **sine-wave cadence**, not a human recitation. It must never be described as a recitation sample.

---

## 6. Legal review required 🔒

The Privacy Policy and Terms of Service were rewritten to describe what the site actually does. They are **not legal advice** and must be reviewed by a qualified adviser in the academy's jurisdiction before launch, particularly:

- the lawful basis for processing children's data;
- data retention periods;
- the government/regulatory references in the Privacy Policy;
- the governing-law clause in the Terms (currently states that the jurisdiction will be confirmed in the enrolment agreement);
- consumer cancellation rights, which vary by country and may override the "non-refundable prepayment" line.

---

## 7. Before you announce the site

- [ ] Every ⚠️ above has been confirmed or the claim removed.
- [ ] A real WhatsApp number is set, or the academy is comfortable with no WhatsApp contact.
- [ ] At least one real testimonial is published, or the academy accepts launching without social proof.
- [ ] The trial process has an owner: who reads the submission, who replies, who writes the plan, by when.
- [ ] Someone has submitted the trial form, the contact form and an RSVP on the production site and confirmed they appear in `/admin`.
- [ ] Legal review complete.
