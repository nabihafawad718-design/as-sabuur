import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to As-Sabuur lessons, trial classes, fees, cancellation, safeguarding and use of this website.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "25 November 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terms"
        title="Terms of Service"
        description="The practical terms that apply when you book a trial, take lessons, or use this website. Written to be read, not to be hidden behind."
        crumbs={[["Terms", "/terms"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-9 text-[17px] leading-relaxed text-stone-700">
          <p className="text-sm text-stone-500">Last updated: {LAST_UPDATED}</p>

          <div>
            <h2 className="text-3xl">The service</h2>
            <p className="mt-3">
              {SITE.legalName} provides live, one-to-one Quran lessons online, together with free community gatherings
              and the resources published on this website. Lessons are taught by the academy&rsquo;s teachers in
              thirty-minute sessions unless another length is agreed in writing.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Trial classes</h2>
            <p className="mt-3">
              The first thirty-minute trial is free and carries no obligation. No card details are collected for it. A
              trial is offered once per learner unless the academy agrees otherwise.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Fees and payment</h2>
            <p className="mt-3">
Current fees and lesson arrangements are shared directly by the academy when a family enquires. The{" "}
              <Link href="/pricing" className="link-quiet">
                pricing page
              </Link>{" "}
              explains how to request this information. No payment is taken through this website; enrolment and any
              payment arrangements are discussed directly with the academy.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Cancellation and missed lessons</h2>
            <p className="mt-3">
              Monthly plans may be stopped or paused at the end of a month with notice. Lessons cancelled with notice
              are made up within the same month where a slot is available; lessons missed without notice are not carried
              over. Prepaid terms are non-refundable except where the law requires otherwise.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Teachers and scheduling</h2>
            <p className="mt-3">
              We aim to keep each student with the same teacher. Where a teacher is unavailable for an extended period,
              we will tell you and offer either a temporary teacher or a pause — not a silent substitution.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Children and safeguarding</h2>
            <p className="mt-3">
              A parent or guardian must make the booking for a learner under eighteen. Parents may sit in on any lesson
              and are encouraged to do so for younger children. Teachers follow the academy&rsquo;s safeguarding
              practice, and concerns can be raised directly at{" "}
              <a href={`mailto:${SITE.email}`} className="link-quiet">
                {SITE.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Community spaces</h2>
            <p className="mt-3">
              Posts on the Dua Wall and contributions to gatherings must be respectful and free from harassment,
              sectarian polemics or commercial solicitation. We may remove content that breaches this, and may decline
              or end a booking where behaviour makes teaching impossible.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Website content</h2>
            <p className="mt-3">
              The text, illustrations, design and code of this website belong to the academy unless stated otherwise.
              You may read, print and share pages for personal or educational use; you may not republish them
              commercially without permission. Qur&rsquo;anic text is not claimed as our own.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Limits</h2>
            <p className="mt-3">
              We teach to a high standard, but we do not promise a particular result, grade, completion date or
              certificate. Progress depends on attendance, practice and the student&rsquo;s starting point. Nothing in
              these terms limits liability that cannot lawfully be limited.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Which law applies</h2>
            <p className="mt-3">
              These terms are governed by the law of the country in which the academy is registered. The specific
              jurisdiction will be stated in the enrolment confirmation. If any part of these terms is unenforceable,
              the rest continues to apply.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Contact</h2>
            <p className="mt-3">
              Questions about these terms:{" "}
              <a href={`mailto:${SITE.email}`} className="link-quiet">
                {SITE.email}
              </a>
              .
            </p>
          </div>

          <p className="rounded-xl border border-ivory-200 bg-ivory-100/70 p-4 text-sm text-stone-600">
            These terms describe how the academy intends to operate and match the website as built. They are not legal
            advice and should be reviewed by a qualified adviser in the academy&rsquo;s jurisdiction before launch.
          </p>
        </div>
      </section>
    </>
  );
}
