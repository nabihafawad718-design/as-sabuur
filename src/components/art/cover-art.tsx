/**
 * Generative cover for journal essays and gathering cards.
 *
 * The database still stores an `image` path for compatibility, but the site no
 * longer renders bitmap images: there are none in the repository, and inventing
 * photographic covers would misrepresent the academy. These covers are derived
 * deterministically from the slug, so a given entry always looks the same.
 */

export function coverVariant(key: string): number {
  let sum = 0;
  for (let i = 0; i < key.length; i += 1) sum += key.charCodeAt(i);
  return sum % 4;
}

export function CoverArt({
  seed,
  className = "",
  label,
}: {
  seed: string;
  className?: string;
  label?: string;
}) {
  const variant = coverVariant(seed);
  return (
    <svg viewBox="0 0 640 400" className={className} role="img" aria-label={label ?? "Decorative cover"}>
      <rect width="640" height="400" fill="url(#asInk)" />
      <rect width="640" height="400" fill="url(#asLattice)" opacity="0.5" />
      <ellipse cx="320" cy="400" rx="420" ry="210" fill="url(#asHorizon)" opacity="0.35" />

      {variant === 0 && (
        <g>
          <path d="M170 400 L170 236 Q170 132 320 70 Q470 132 470 236 L470 400 Z" fill="#041510" stroke="url(#asGold)" strokeWidth="1.4" />
          <path d="M212 400 L212 250 Q212 164 320 116 Q428 164 428 250 L428 400" fill="none" stroke="#e3c87b" strokeOpacity="0.35" />
          <circle cx="320" cy="70" r="5" fill="#e3c87b" />
          <g fill="#fcfaf4">
            <circle cx="250" cy="180" r="1.4" opacity="0.6" />
            <circle cx="390" cy="210" r="1.2" opacity="0.5" />
            <circle cx="330" cy="150" r="1" opacity="0.45" />
          </g>
        </g>
      )}

      {variant === 1 && (
        <g fill="none" stroke="#e3c87b">
          <circle cx="320" cy="200" r="120" strokeOpacity="0.5" />
          <circle cx="320" cy="200" r="86" strokeOpacity="0.35" />
          <rect x="262" y="142" width="116" height="116" strokeOpacity="0.55" />
          <rect x="262" y="142" width="116" height="116" transform="rotate(45 320 200)" strokeOpacity="0.55" />
          <circle cx="320" cy="200" r="7" fill="#e3c87b" stroke="none" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={i}
              x1="320"
              y1="200"
              x2={320 + Math.cos((i * 45 * Math.PI) / 180) * 120}
              y2={200 + Math.sin((i * 45 * Math.PI) / 180) * 120}
              strokeOpacity="0.18"
            />
          ))}
        </g>
      )}

      {variant === 2 && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${90 + i * 40} 400 L${90 + i * 40} ${250 - i * 10} Q${90 + i * 40} ${150 + i * 14} 320 ${96 + i * 18} Q${550 - i * 40} ${150 + i * 14} ${550 - i * 40} ${250 - i * 10} L${550 - i * 40} 400`}
              fill="none"
              stroke="#e3c87b"
              strokeOpacity={0.5 - i * 0.08}
              strokeWidth="1.1"
            />
          ))}
          <rect x="90" y="398" width="460" height="2" fill="#e3c87b" fillOpacity="0.4" />
        </g>
      )}

      {variant === 3 && (
        <g>
          <rect x="120" y="120" width="400" height="220" fill="#041510" stroke="#e3c87b" strokeOpacity="0.5" />
          <rect x="136" y="136" width="368" height="188" fill="none" stroke="#e3c87b" strokeOpacity="0.25" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1="176" y1={180 + i * 24} x2="464" y2={180 + i * 24} stroke="#e3c87b" strokeOpacity="0.22" />
          ))}
          <text x="320" y="300" textAnchor="middle" className="font-arabic" fontFamily="serif" fontSize="34" fill="#e3c87b" fillOpacity="0.75" direction="rtl">
            ۝
          </text>
          <text x="320" y="106" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="12" letterSpacing="5" fill="#e3c87b" fillOpacity="0.6">
            AS-SABUUR
          </text>
        </g>
      )}
    </svg>
  );
}
