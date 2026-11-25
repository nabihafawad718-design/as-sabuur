import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal data As-Sabuur collects, why, how long it is kept, and how parents and adult learners can ask for it to be corrected or deleted.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "25 November 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="Privacy Policy"
        description="Plain language, no tracking advertising, and no selling of personal data. This page explains exactly what the website collects and why."
        crumbs={[["Privacy", "/privacy"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-9 text-[17px] leading-relaxed text-stone-700">
          <p className="text-sm text-stone-500">Last updated: {LAST_UPDATED}</p>

          <div>
            <h2 className="text-3xl">Who is responsible</h2>
            <p className="mt-3">
              {SITE.legalName} is responsible for the personal data described here. Questions, corrections and deletion
              requests can be sent to{" "}
              <a href={`mailto:${SITE.email}`} className="link-quiet">
                {SITE.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-3xl">What the website collects</h2>
            <p className="mt-3">Only what you type into a form, plus the technical minimum needed to serve the page:</p>
            <ul className="mt-3 space-y-2">
              {[
                "Free trial request: the name you give, whether the learner is a child or adult, the course of interest, preferred time of day, time zone, and the WhatsApp number or email you provide, plus any notes you add.",
                "Contact message: your name, email address, the topic you choose and your message.",
                "Gathering reservation: your name, email address, attendance mode, number of guests and any note you add.",
                "Dua Wall submission: the name or initials, optional city, theme and text you choose to publish.",
                "Pledge: your name, email address, pledge tier, amount, frequency and any dedication.",
                "Admin sign-in: a single session cookie so that staff do not have to re-enter a passcode on every page.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              The website does not use advertising trackers, third-party analytics pixels, or social media tracking.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Why we hold it</h2>
            <p className="mt-3">
              To arrange the lesson or gathering you asked for, to reply to your message, to keep a record of enrolments
              and safeguarding decisions, and to publish a Dua Wall entry only where you have chosen to submit one for
              publication.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Children</h2>
            <p className="mt-3">
              Trial requests for a child should be made by a parent or guardian. We do not knowingly collect personal
              data directly from a child, and we do not publish a child&rsquo;s name, image or work without written
              permission from a parent or guardian. Lessons are private and parents may sit in at any time.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">How long it is kept</h2>
            <p className="mt-3">
              Enquiry and trial records are kept while the enquiry is live and for a reasonable period afterwards so
              that we can answer follow-up questions. Financial and enrolment records are kept for as long as the law
              requires. Dua Wall entries remain until you ask for removal.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Who can see it</h2>
            <p className="mt-3">
              Submitted forms are stored in the academy&rsquo;s database and visible only to authorised staff through the
              admin console. The site is hosted on infrastructure providers who process data on our behalf. We do not
              sell or rent personal data, and we do not share it for marketing.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Your choices</h2>
            <p className="mt-3">
              You can ask for a copy of the data we hold about you, ask for it to be corrected, or ask for it to be
              deleted. Write to{" "}
              <a href={`mailto:${SITE.email}`} className="link-quiet">
                {SITE.email}
              </a>{" "}
              and we will respond within a reasonable period. Deleting an enquiry may mean we can no longer arrange the
              lesson it related to.
            </p>
          </div>

          <div>
            <h2 className="text-3xl">Cookies</h2>
            <p className="mt-3">
              The public site sets no tracking cookies. The only cookie used is the staff session cookie for the admin
              console, which is required for that console to function.
            </p>
          </div>

          <p className="rounded-xl border border-ivory-200 bg-ivory-100/70 p-4 text-sm text-stone-600">
            This policy is written to be accurate for the site as built. It is not legal advice, and it should be
            reviewed against the data-protection law that applies to the academy&rsquo;s registered location before
            launch.
          </p>
        </div>
      </section>
    </>
  );
}
