import { NextRequest } from "next/server";
import { wrapUploadedZipAsWpTheme } from "@/lib/wp-packager";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const themeName = String(formData.get("themeName") ?? "As-Sabuur Custom Theme");

    if (!(file instanceof File)) {
      return Response.json({ ok: false, details: "Please upload a .zip file." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const result = await wrapUploadedZipAsWpTheme(Buffer.from(arrayBuffer), themeName);

    if (!result.ok) {
      return Response.json(result, { status: 422 });
    }

    return new Response(new Uint8Array(result.zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${result.filename}"`,
        "X-Wrapped-Files": String(result.wrappedCount),
      },
    });
  } catch {
    return Response.json(
      { ok: false, details: "Could not read that ZIP file. Make sure it is a valid .zip archive." },
      { status: 400 },
    );
  }
}
