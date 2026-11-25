import type { ReactNode } from "react";

/**
 * Small, original ornamental components. All are decorative and marked
 * aria-hidden; they never carry meaning that is not also in the text.
 */

export function Ornament({ className = "text-gold-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 18" className={`h-4 w-32 ${className}`} aria-hidden="true">
      <line x1="0" y1="9" x2="52" y2="9" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.45" />
      <g transform="translate(70 9)" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="-5.5" y="-5.5" width="11" height="11" transform="rotate(45)" />
        <rect x="-5.5" y="-5.5" width="11" height="11" />
        <circle r="1.6" fill="currentColor" stroke="none" />
      </g>
      <line x1="88" y1="9" x2="140" y2="9" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.45" />
    </svg>
  );
}

export function Rosette({
  className = "h-16 w-16",
  petals = 12,
}: {
  className?: string;
  petals?: number;
}) {
  const angles = Array.from({ length: petals }, (_, i) => (i * 360) / petals);
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.9">
        {angles.map((a) => (
          <ellipse key={a} cx="60" cy="36" rx="8" ry="24" transform={`rotate(${a} 60 60)`} strokeOpacity="0.45" />
        ))}
        <circle cx="60" cy="60" r="47" strokeOpacity="0.5" />
        <circle cx="60" cy="60" r="32" strokeOpacity="0.35" />
        <rect x="38" y="38" width="44" height="44" strokeOpacity="0.5" />
        <rect x="38" y="38" width="44" height="44" transform="rotate(45 60 60)" strokeOpacity="0.5" />
        <circle cx="60" cy="60" r="6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** A row of blind arches — used as a section divider. */
export function ArchRow({
  count = 9,
  className = "text-pine-700/25",
}: {
  count?: number;
  className?: string;
}) {
  const cols = Array.from({ length: count }, (_, i) => i * 64);
  return (
    <svg viewBox={`0 0 ${count * 64} 96`} className={className} aria-hidden="true" preserveAspectRatio="none">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {cols.map((x) => (
          <path key={x} d={`M${x + 8} 96 L${x + 8} 48 Q${x + 8} 18 ${x + 32} 8 Q${x + 56} 18 ${x + 56} 48 L${x + 56} 96`} />
        ))}
        <line x1="0" y1="95" x2={count * 64} y2="95" />
      </g>
    </svg>
  );
}

/** A soft field of concentric arches used behind headings. */
export function ArchField({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${80 + i * 30} 560 L${80 + i * 30} ${330 - i * 12} Q${80 + i * 30} ${180 + i * 18} 300 ${90 + i * 22} Q${520 - i * 30} ${180 + i * 18} ${520 - i * 30} ${330 - i * 12} L${520 - i * 30} 560`}
            strokeOpacity={0.5 - i * 0.08}
          />
        ))}
      </g>
    </svg>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-px w-full bg-gradient-to-r from-transparent via-gold-400/60 to-transparent ${className}`}
    />
  );
}

export function CornerMarks({ className = "text-gold-500/50" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 26V0h26" />
        <path d="M100 74v26H74" />
      </g>
    </svg>
  );
}

/** A framed panel with hairline gold corners, for editorial callouts. */
export function FramedPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-gold-400/30" />
      <CornerMarks className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gold-500/70" />
      <CornerMarks className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 rotate-180 text-gold-500/70" />
      {children}
    </div>
  );
}
