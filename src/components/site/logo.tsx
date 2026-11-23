import Link from "next/link";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <rect x="10" y="10" width="24" height="24" fill="none" stroke="#d4b054" strokeWidth="1.4" transform="rotate(45 22 22)" />
      <rect x="10" y="10" width="24" height="24" fill="#0b3024" stroke="#e3c87b" strokeWidth="1.4" />
      <circle cx="22" cy="22" r="5" fill="none" stroke="#e3c87b" strokeWidth="1.1" />
      <circle cx="22" cy="22" r="2.2" fill="#e3c87b" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="As-Sabuur.com — home">
      <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-45" />
      <div className="flex flex-col">
        <span
          className={`font-display text-[1.45rem] font-semibold leading-none tracking-tight ${
            light ? "text-ivory-50" : "text-pine-950"
          }`}
        >
          As-Sabuur<span className="text-gold-500">.com</span>
        </span>
        <span
          lang="ar"
          dir="rtl"
          className={`font-arabic text-[11px] leading-tight tracking-wide ${
            light ? "text-gold-300/80" : "text-pine-700/75"
          }`}
        >
          تَعَلُّمُ الْقُرْآنِ بِسَكِينَة
        </span>
      </div>
    </Link>
  );
}
