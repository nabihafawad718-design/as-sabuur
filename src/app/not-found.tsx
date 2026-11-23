import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex flex-col items-center py-28 text-center">
      <p lang="ar" dir="rtl" className="font-arabic text-7xl leading-none text-pine-800">
        ٱلصَّبُورُ
      </p>
      <h1 className="mt-6 text-5xl">Pathway not found</h1>
      <p className="mt-4 max-w-md text-stone-600">
        This courtyard doorway does not lead anywhere yet. Return to the main threshold or open the Sanctuary Compass.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Return to Sanctuary
        </Link>
        <Link href="/names" className="btn btn-outline">
          Explore 99 Names
        </Link>
      </div>
    </section>
  );
}
