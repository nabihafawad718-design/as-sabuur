import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Privacy & Adab" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust & Adab"
        title="Privacy Policy"
        description="As-Sabuur collects only what is needed to welcome you into gatherings, share reflections with consent, and respond to your messages."
        crumbs={[["Privacy", "/privacy"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-8 text-[17px] leading-relaxed text-stone-700">
          <div>
            <h2 className="text-3xl">Minimal Data &amp; Zero Tracking Ads</h2>
            <p className="mt-3">
              We never sell personal information, run third-party ad trackers, or share attendee details outside the
              sanctuary steward desk.
            </p>
          </div>
          <div>
            <h2 className="text-3xl">Community Wall &amp; Stewardship</h2>
            <p className="mt-3">
              Reflections posted to the Wall of Steadfastness display only the name/initials and optional city you enter.
              You may ask our stewards to remove any entry at <span className="font-semibold">salam@as-sabuur.com</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
