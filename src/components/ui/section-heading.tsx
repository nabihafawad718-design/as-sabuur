import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-6 ${centered ? "items-center text-center" : "items-start"} ${action ? "sm:flex-row sm:items-end sm:justify-between" : ""}`}>
      <div className={`max-w-2xl ${centered ? "text-center" : ""}`}>
        <p className={`eyebrow ${centered ? "justify-center [&::before]:hidden" : ""} ${light ? "text-gold-300" : ""}`}>
          {eyebrow}
        </p>
        <h2 className={`mt-4 text-4xl leading-[1.08] sm:text-5xl ${light ? "text-ivory-50" : ""}`}>{title}</h2>
        {description && (
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-ivory-100/75" : "text-stone-600"}`}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" className={`h-4 w-28 ${className}`} aria-hidden="true">
      <line x1="0" y1="8" x2="44" y2="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <g transform="translate(60 8)">
        <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(45)" />
        <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle r="1.6" fill="currentColor" />
      </g>
      <line x1="76" y1="8" x2="120" y2="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}
