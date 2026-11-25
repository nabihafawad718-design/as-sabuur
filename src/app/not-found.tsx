import Link from "next/link";
import { Rosette } from "@/components/art/geometry";

export default function NotFound() {
  return (
    <section className="wrap flex flex-col items-center py-24 text-center lg:py-32">
      <Rosette className="h-16 w-16 text-gold-600/60" petals={10} />
      <p lang="ar" dir="rtl" className="font-arabic mt-6 text-5xl leading-none text-pine-800">
        ٱلصَّبُورُ
      </p>
      <h1 className="mt-6 text-5xl">This page has moved on</h1>
      <p className="mt-4 max-w-md text-stone-600">
        The link may be old, or the page may have been renamed. The courses and the free trial are the best places to
        start again.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/courses" className="btn btn-primary">
          Explore the courses
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Book a free trial
        </Link>
      </div>
      <p className="mt-6 text-xs text-stone-500">
        Or return to the{" "}
        <Link href="/" className="link-quiet">
          homepage
        </Link>
        .
      </p>
    </section>
  );
}
