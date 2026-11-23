import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { WpPackagerClient } from "@/components/wp/wp-packager-client";

export const metadata: Metadata = {
  title: "WordPress Theme & Direct Hosting Packager",
  description:
    "Download a valid WordPress theme ZIP with style.css and index.php for as-sabuur.com, download a direct static HTML bundle, or wrap an existing ZIP.",
};

export default function WpThemePage() {
  return (
    <>
      <PageHeader
        eyebrow="Deployment & WordPress Packager"
        title="WordPress Theme & Direct Hosting for as-sabuur.com"
        description="WordPress requires a top-level theme folder containing style.css (with a Theme Name header) and index.php. Download a ready-to-upload theme ZIP or direct static site package below."
        crumbs={[["WordPress Packager", "/wp-theme"]]}
      />
      <section className="wrap py-14 lg:py-20">
        <WpPackagerClient />
      </section>
    </>
  );
}
