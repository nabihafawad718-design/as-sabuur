# Pricing Strategy

**Status:** recommendation, pending sign-off. The prices below are implemented as the site's published pricing. No payment provider is connected — see "What is and is not built" at the end.

---

## The short version

| Plan | Lessons | Per month | Per lesson |
| --- | --- | --- | --- |
| Foundations | 1/week (4) | **$32** | $8.00 |
| **Steady** | 2/week (8) | **$52** | $6.50 |
| Committed | 3/week (12) | **$72** | $6.00 |
| Intensive | 4/week (16) | **$88** | $5.50 |
| Hifz | 5/week (20) | **$100** | $5.00 |

30-minute one-to-one lessons. Sibling discount 10% / 15%. Prepayment 5% / 10% / 15% for 3 / 6 / 12 months. Free 30-minute trial, no card details.

---

## Why this shape

### 1. Anchor slightly above the modal price, well below the premium

The market's most common price is **$40 per month for eight 30-minute lessons** (Riwaq, Elbayan, Quran Web Academy, Unique Quran Institute all sit there or within $5). The premium anchor is **Studio Arabiya at $55** for an unspecified number of lessons.

Steady at **$52 for eight lessons** sits deliberately:
- **30% above the $40 modal price** — enough to signal that this is not a budget academy, and to fund a teacher who stays with a student.
- **5% below Studio Arabiya's entry price** — so a family comparing the two does not see As-Sabuur as the more expensive option.
- **$6.50 per lesson** — comfortably mid-market on a per-lesson basis ($5 at mainstream, $8–11 at premium).

Under-pricing was rejected. At $35–$40, the academy competes directly with high-volume academies that pay teachers far less, and invites a price war it cannot win. The in-person heritage and continuity of teacher justify a modest premium — but only a modest one, because the online brand has no reviews yet.

### 2. Ladder by frequency, not by lesson length

Every competitor surveyed prices by lessons per week. It is the metric families already understand, and it aligns price with the amount of teaching delivered.

Per-lesson price falls as frequency rises ($8.00 → $5.00). This is deliberate: it rewards commitment, which is exactly what produces retention and results. A student on one lesson a week progresses slowly, gets discouraged, and leaves. A student on two or three does not.

**Foundations at $32 is also a customer-acquisition product.** It is the lowest-risk entry point for a hesitant parent, and it upgrades naturally within a month or two.

### 3. Hifz is its own plan, at its own rhythm

Hifz requires daily contact. Five lessons a week at $100/month is $5 per lesson — the lowest per-lesson rate on the ladder — because the family is committing to twenty lessons a month. It is still the highest revenue per learner. Hifz families are also the most likely to stay for years, so the low per-lesson rate is an investment in a long relationship.

Extended lessons: 45 minutes at $70 (2×/week) and $135 (5×/week); 60 minutes at $88 (2×/week) and $170 (5×/week). These are set at roughly 1.35× and 1.7× the 30-minute rate, rounded to whole dollars.

### 4. Discounts that reward the right behaviour

| Discount | Size | Why |
| --- | --- | --- |
| Second sibling | 10% | Siblings are the cheapest customer to acquire and the most likely to stay |
| Third sibling and beyond | 15% | Marginal cost of the third learner is low; the household is already committed |
| 3 months prepaid | 5% | Modest; covers cash-flow without locking families in |
| 6 months prepaid | 10% | The sweet spot — roughly one term of real progress |
| 12 months prepaid | 15% | Highest discount, but only offered to families who already know they are staying |

Prepayment discounts are intentionally smaller than the market's upper end (some competitors advertise 20%). Deep prepayment discounts attract price-sensitive families who churn at renewal, and create refund complexity. The monthly option is the default and is presented as such.

### 5. Currency

**USD is the primary currency**, displayed with a `$`. This matches the majority of international academies and makes comparison shopping straightforward. The pricing page states plainly that payment is arranged directly with the academy and that local currencies may be accepted — which is true, and avoids implying a checkout that does not exist.

If a large share of enquiries come from the UK, a GBP display can be added later as a secondary line. It is not worth the complexity at launch.

---

## How this compares, at a glance

| | As-Sabuur Steady | Market modal | Studio Arabiya |
| --- | --- | --- | --- |
| Monthly | $52 | ~$40 | from $55 |
| Lessons | 8 × 30 min | 8 × 30 min | not published |
| Per lesson | $6.50 | $5.00 | unknown |
| Trial | 30 min + written plan | free class | free class |
| Contract | none | none | billed every 4 weeks (per third-party comparison) |

---

## Conversion design decisions

**The trial is the offer, not a discount.** The homepage, every course section and every plan card leads to a free 30-minute class. No card details are requested. This is the single highest-leverage conversion decision in the category, because the perceived risk of trying is zero.

**The trial promises a written recommendation.** After the lesson the family receives: the recommended course, the weekly rhythm, and what month one covers. This turns a free sample into a professional assessment, and it is something almost no competitor describes.

**Pricing is visible.** Many academies hide fees behind a form. Publishing them filters out unqualified enquiries and builds trust with the families who can afford the service.

**The pricing page answers the awkward questions.** Hidden fees, sibling sharing, missed lessons, prepayment — each is answered in plain language rather than buried in the terms.

---

## What is and is not built

**Built:** the pricing data model (`src/data/pricing.ts`), the pricing page, the preview on the homepage, plan recommendations inside each course, the billing FAQ, and the price shown on the admin-side trial record (as the course of interest, not an amount).

**Not built:** any payment gateway, subscription billing, invoicing, refunds or currency conversion. The site states clearly that payment is arranged directly with the academy. Do not add a "Buy now" button until Stripe (or equivalent) is genuinely configured and tested end to end.

**Recommended next step:** take payments through Stripe Payment Links first — no code, no PCI scope, and it can be live in an afternoon. Move to a proper subscription integration once monthly volume justifies it.

---

## Risks to watch

- **$52 may be above what a cold visitor will pay without social proof.** The mitigating factor is the free trial. If conversion from trial to paid is below roughly 40%, the first lever to test is not the price but the trial experience.
- **Currency friction.** A UK family seeing "$52" has to do mental arithmetic. Adding a GBP approximation on the pricing page is a cheap test.
- **Discount stacking.** The implementation describes sibling and prepayment discounts separately. Decide explicitly whether they stack, and state it in the enrolment terms before the first invoice.
- **Competitor prices move.** Re-verify the comparison table quarterly.
