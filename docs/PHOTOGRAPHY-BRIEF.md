# Photography Brief

The site currently ships **no photographs**. Every visual is original SVG/CSS artwork, because:

- the five JPGs in the original upload were identical blank green rectangles, not photos;
- seven referenced image paths did not exist;
- no image-generation tool was available during this build.

That is a defensible art direction, not a placeholder. But real photography of real students and teachers would strengthen trust considerably — **if it is genuine**. This brief tells a photographer (or the academy) exactly what to shoot, at what size, and where it goes.

---

## Non-negotiables

1. **Real people, real consent.** No stock photographs of children, and no AI-generated faces. Every identifiable person needs a signed release; for anyone under 18, a parent or guardian must sign.
2. **No identifiable child without explicit, specific permission.** A release for "website use" is not enough; specify where the image will appear.
3. **No Qur'anic text in photographs.** Open mushaf pages, Arabic calligraphy and screen content produce distorted or unreadable text at web sizes. Keep Arabic as typography, not photography.
4. **No staged "stock-photo" emotion.** No child pointing at a laptop in exaggerated delight. Quiet concentration is more credible and more premium.
5. **Warm, natural light.** Window light, late afternoon, or soft lamp light. Avoid overhead fluorescents and blue-toned screens.
6. **Palette.** Cream, ivory, warm wood, deep green, muted sage, and small touches of brass or gold. Avoid saturated primary colours, which will clash with the site.

---

## Shot list

| # | Placement | Subject | Aspect ratio | Export size | File |
| --- | --- | --- | --- | --- | --- |
| 1 | Homepage hero — inside the pointed-arch frame | A child at a table with a tablet or laptop, seen from a slight distance, concentrating. Warm side light. Space at the bottom for an overlay card. | **3:4 portrait** (the arch crops to ~640:860 = 0.74) | 1200 × 1600 | `hero-student.jpg` |
| 2 | Learning experience section (optional) | An adult at a desk with headphones, reading from a screen, calm and unposed. | **4:3 landscape** | 1600 × 1200 | `adult-lesson.jpg` |
| 3 | About page — replacing the two-arch illustration (optional) | A teacher and student in the in-person classroom, hands and books in frame, faces not required. | **3:2 landscape** | 1800 × 1200 | `classroom.jpg` |
| 4 | Contact page — replacing the doorway illustration (optional) | A doorway, window or courtyard of the teaching space, empty of people, warm light. | **4:3 landscape** | 1200 × 900 | `threshold.jpg` |
| 5 | Journal and gathering covers (optional, per entry) | Abstract detail: a stack of books, a page edge, a brass lamp, a prayer mat corner. No faces, no Arabic text. | **16:10 landscape** | 1600 × 1000 | `cover-<slug>.jpg` |
| 6 | Open Graph / social card | — | 1200 × 630 | already generated | `public/og/as-sabuur-og.png` |

**Priority if budget is limited:** shot 1 only. The hero is the single image that changes how the site feels, and one excellent photograph is worth more than six mediocre ones.

---

## Technical specification

- **Format:** shoot RAW or high-quality JPEG; deliver masters at the sizes above.
- **Delivery format for the web:** WebP (primary) and AVIF (optional). If only JPEG is available, quality 78–82, progressive, sRGB.
- **Colour profile:** sRGB. Do not deliver Adobe RGB or CMYK.
- **Weight:** aim for under 180 KB per image at the sizes above. Run through Squoosh, ImageOptim, or `sharp` before committing.
- **Naming:** lowercase, hyphenated, descriptive — `hero-student-reading.jpg`, not `IMG_4821.jpg`.
- **Alt text:** describe what is happening, not the file name. Example: "A child reading from a tablet during an online Quran lesson at a kitchen table." Never "online quran class image".

---

## How to add a photograph once it exists

The art components are intentionally swappable. For the hero:

1. Put the file in `public/images/hero-student.jpg`.
2. In `src/components/home/hero.tsx`, replace the `<ArchWindow … />` element with a `next/image` inside the same arch-shaped container:

```tsx
import Image from "next/image";

<div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] shadow-lift ring-1 ring-gold-500/30">
  <Image
    src="/images/hero-student.jpg"
    alt="A child reading from a tablet during an online Quran lesson"
    fill
    priority
    sizes="(min-width: 1024px) 480px, 90vw"
    className="object-cover"
  />
</div>
```

3. Keep the trial seal and course-plan cards that overlay the image; they sit at `absolute` positions and will continue to work.

For the journal and gathering covers, replace `<CoverArt seed={…} />` with `<Image>` in `src/components/ui/cards.tsx`, and restore the `image` field in `src/db/seed-data.ts` to the real path.

**Do not** replace the course plates in `src/components/art/course-art.tsx`. They are designed illustrations that explain the course content; photographs would be less informative and would make the five courses look less distinct.

---

## What to avoid

- Children looking directly at the camera and smiling on cue.
- Laptops showing a video call with a visible stranger's face.
- Mosque interiors used as a generic background.
- Hands holding a phone with a Quran app — screen glare makes it unreadable.
- Any image where Western and Gulf families would both find the setting implausible.
- Heavy filters, vignettes, or teal-and-orange grading.

---

## Budget note

A half-day local shoot with one child, one adult and one teacher, in an ordinary room with window light, is enough to cover the entire brief. The most expensive part is the consent paperwork, and it is also the most important.
