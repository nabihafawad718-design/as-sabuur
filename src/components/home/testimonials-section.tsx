import { Quote } from "lucide-react";
import { publishedTestimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Renders nothing until real, permissioned feedback exists in
 * `src/data/testimonials.ts`. It is deliberately not replaced with invented
 * reviews, star ratings or student counts.
 */
export function TestimonialsSection() {
  const items = publishedTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="wrap py-20 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="In their words"
          title="What families say"
          description="Published with permission, in the words they chose."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 70}>
            <figure className="card flex h-full flex-col p-6">
              <Quote className="h-6 w-6 text-gold-500" />
              <blockquote className="mt-4 font-display text-xl leading-snug text-pine-950">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-5 text-xs text-stone-500">
                <span className="font-semibold text-pine-900">{item.attribution}</span>
                <span className="mx-1.5">·</span>
                {item.course}
                <span className="mx-1.5">·</span>
                {item.date}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
