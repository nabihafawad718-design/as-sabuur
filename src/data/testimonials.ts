/**
 * Genuine testimonials only.
 *
 * This array is intentionally empty. Do not add invented quotes, names,
 * ratings or student counts. When real feedback is collected (with the
 * family's clear permission to publish it), add an entry here and the
 * testimonial sections will appear automatically on the home and courses pages.
 *
 * Required fields: a real quote, how the person wishes to be identified,
 * and the course they actually studied. `permissionConfirmed` must be true.
 */

export type Testimonial = {
  id: string;
  quote: string;
  /** e.g. "Amina R." or "A parent in Toronto" — exactly as the family agreed. */
  attribution: string;
  course: string;
  /** Month and year the feedback was given, e.g. "March 2027". */
  date: string;
  permissionConfirmed: boolean;
};

export const TESTIMONIALS: Testimonial[] = [];

export function publishedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.permissionConfirmed);
}
