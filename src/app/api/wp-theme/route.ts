import { NextRequest } from "next/server";
import { buildStaticSiteZip, buildWordPressThemeZip } from "@/lib/wp-packager";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode");
  if (mode === "static") {
    const buf = await buildStaticSiteZip();
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="as-sabuur-static-site.zip"',
        "Cache-Control": "no-store",
      },
    });
  }

  const buf = await buildWordPressThemeZip();
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="as-sabuur-wp-theme.zip"',
      "Cache-Control": "no-store",
    },
  });
}
