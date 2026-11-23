"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Download, FileArchive, FolderTree, Globe2, Loader2, Sparkles, Upload } from "lucide-react";

export function WpPackagerClient() {
  const [themeName, setThemeName] = useState("As-Sabuur Custom");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "warn" | "err"; title: string; body: string } | null>(null);

  const handleWrap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus({ kind: "err", title: "No ZIP selected", body: "Choose a .zip file first." });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("themeName", themeName);
      const res = await fetch("/api/wp-theme/wrap", { method: "POST", body: fd });
      const contentType = res.headers.get("content-type") ?? "";
      if (res.ok && contentType.includes("application/zip")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${themeName.toLowerCase().replace(/[^a-z0-9-]+/g, "-") || "as-sabuur-custom"}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setStatus({
          kind: "ok",
          title: "Wrapped & Downloaded!",
          body: "Your static ZIP now contains style.css (with WordPress Theme Name header), index.php, functions.php, and rewritten theme asset URLs. Upload it directly in WordPress → Appearance → Themes → Add New → Upload Theme.",
        });
      } else {
        const json = (await res.json()) as { reason?: string; details?: string };
        setStatus({
          kind: json.reason === "nextjs_source" ? "warn" : "err",
          title:
            json.reason === "nextjs_source"
              ? "Detected Next.js + PostgreSQL Source ZIP"
              : "Could not wrap archive",
          body: json.details ?? "Please verify the ZIP file.",
        });
      }
    } catch {
      setStatus({ kind: "err", title: "Upload failed", body: "Something went wrong reading that archive." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Ready-to-Download Options */}
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="card relative overflow-hidden border-gold-400/50 bg-pine-900 p-8 text-ivory-50 shadow-lift">
          <div className="pointer-events-none absolute inset-0 bg-pattern-dark opacity-70" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-300">
              <Sparkles className="h-3.5 w-3.5" /> WordPress Ready · Zero Error
            </span>
            <h2 className="mt-4 text-3xl text-ivory-50">Download Valid WordPress Theme ZIP</h2>
            <p className="mt-2 text-sm leading-relaxed text-ivory-100/80">
              Includes the full As-Sabuur landing page wrapped properly inside{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gold-200">as-sabuur-theme/</code> with{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gold-200">style.css</code>,{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gold-200">index.php</code>,{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gold-200">functions.php</code>,{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gold-200">screenshot.png</code>, and all
              images.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-xs text-ivory-100/85">
              <p className="flex items-center gap-2 font-semibold text-gold-300">
                <FolderTree className="h-4 w-4" /> as-sabuur-wp-theme.zip
              </p>
              <p className="mt-2">└── as-sabuur-theme/</p>
              <p className="pl-4">├── style.css (Theme Name header + CSS)</p>
              <p className="pl-4">├── index.php (wp_head / wp_footer + UI)</p>
              <p className="pl-4">├── functions.php (enqueue + trial AJAX)</p>
              <p className="pl-4">├── screenshot.png (1200×900 preview)</p>
              <p className="pl-4">└── assets/images/*.jpg</p>
            </div>
            <a href="/api/wp-theme?mode=wp" download="as-sabuur-wp-theme.zip" className="btn btn-gold mt-6 w-full">
              <Download className="h-4 w-4" />
              Download as-sabuur-wp-theme.zip
            </a>
          </div>
        </article>

        <article className="card p-8">
          <span className="chip bg-sage-100 text-pine-800">
            <Globe2 className="h-3.5 w-3.5" /> Direct Static Host · No WordPress Needed
          </span>
          <h2 className="mt-4 text-3xl">Download Direct Static Bundle</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Prefer to host directly on <strong>as-sabuur.com</strong> via cPanel <code className="rounded bg-ivory-100 px-1.5 py-0.5 text-xs">public_html/</code>, Hostinger File Manager, Cloudflare Pages, or Netlify Drop? Download this clean static HTML/CSS/JS bundle.
          </p>
          <div className="mt-5 rounded-2xl border border-ivory-200 bg-ivory-50 p-4 font-mono text-xs text-stone-600">
            <p className="flex items-center gap-2 font-semibold text-pine-900">
              <FileArchive className="h-4 w-4 text-gold-700" /> as-sabuur-static-site.zip
            </p>
            <p className="mt-2">├── index.html</p>
            <p className="pl-0">├── style.css</p>
            <p className="pl-0">├── README.txt</p>
            <p className="pl-0">└── assets/images/*.jpg</p>
          </div>
          <a href="/api/wp-theme?mode=static" download="as-sabuur-static-site.zip" className="btn btn-primary mt-6 w-full">
            <Download className="h-4 w-4" />
            Download as-sabuur-static-site.zip
          </a>
        </article>
      </div>

      {/* Custom ZIP Inspector & Wrapper */}
      <form onSubmit={handleWrap} className="card p-8">
        <p className="eyebrow">Custom ZIP Wrapper</p>
        <h2 className="mt-3 text-3xl">Check or wrap your existing ZIP archive</h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Drop your <code className="rounded bg-ivory-100 px-1.5 py-0.5 text-xs">website-for-quranteachingnet (1).zip</code> or any static HTML zip below. If it contains <code className="rounded bg-ivory-100 px-1.5 py-0.5 text-xs">index.html</code>, we will automatically wrap it with <code className="rounded bg-ivory-100 px-1.5 py-0.5 text-xs">style.css</code> + <code className="rounded bg-ivory-100 px-1.5 py-0.5 text-xs">index.php</code> into a WordPress-installable theme ZIP.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="wp-theme-name" className="label">Theme Folder / Name</label>
            <input
              id="wp-theme-name"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="input"
              placeholder="e.g. As-Sabuur Custom"
            />
          </div>
          <div>
            <label htmlFor="wp-zip-file" className="label">Select .zip archive</label>
            <input
              id="wp-zip-file"
              type="file"
              accept=".zip"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="input !py-2.5"
            />
          </div>
        </div>

        <button type="submit" disabled={busy} className="btn btn-outline mt-5">
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Inspecting &amp; Wrapping…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" /> Inspect &amp; Wrap ZIP as WordPress Theme
            </>
          )}
        </button>

        {status && (
          <div
            className={`mt-5 flex items-start gap-3 rounded-2xl border p-4 text-sm ${
              status.kind === "ok"
                ? "border-pine-300 bg-sage-50 text-pine-950"
                : status.kind === "warn"
                  ? "border-gold-300 bg-gold-100/70 text-pine-950"
                  : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {status.kind === "ok" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-pine-700" />
            ) : (
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
            )}
            <div>
              <p className="font-semibold">{status.title}</p>
              <p className="mt-1 text-xs leading-relaxed opacity-90">{status.body}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
