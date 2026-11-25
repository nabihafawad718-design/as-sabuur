import type { ReactNode } from "react";

const STARS: [number, number, number, number][] = [
  [132, 168, 1.6, 0.8], [206, 112, 1.1, 0.55], [262, 196, 1.4, 0.7], [388, 128, 1.2, 0.6],
  [444, 206, 1.7, 0.8], [492, 152, 1.0, 0.5], [176, 268, 1.2, 0.55], [356, 262, 1.3, 0.6],
  [418, 322, 1.0, 0.45], [150, 358, 1.1, 0.5], [486, 372, 1.2, 0.5], [292, 96, 1.0, 0.45],
  [230, 330, 0.9, 0.4], [404, 244, 0.9, 0.4],
];

/**
 * A tall pointed-arch window at dawn, with a hanging lantern.
 * This is the signature image of the site: an original SVG composition,
 * not a photograph and not a stock illustration.
 */
export function ArchWindow({
  children,
  className = "",
  showLantern = true,
  warm = true,
}: {
  children?: ReactNode;
  className?: string;
  showLantern?: boolean;
  warm?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 640 860" className="h-full w-full" role="img" aria-label="An arched window at dawn with a hanging lantern">
        {/* Outer stone frame */}
        <path d="M70 830 L70 344 Q70 146 320 44 Q570 146 570 344 L570 830 Z" fill="url(#asInk)" />
        <path
          d="M70 830 L70 344 Q70 146 320 44 Q570 146 570 344 L570 830 Z"
          fill="none"
          stroke="url(#asGold)"
          strokeWidth="1.6"
          strokeOpacity="0.9"
        />

        {/* Sky inside the arch */}
        <g clipPath="url(#asArchClip)">
          <rect x="0" y="0" width="640" height="860" fill="url(#asSky)" />
          <ellipse cx="320" cy="742" rx="300" ry="150" fill="url(#asHorizon)" opacity={warm ? 1 : 0.45} />

          {/* stars */}
          {STARS.map(([x, y, r, o], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#fcfaf4" opacity={o} />
          ))}

          {/* crescent light */}
          <circle cx="430" cy="212" r="86" fill="url(#asMoonGlow)" opacity="0.7" />
          <circle cx="430" cy="212" r="20" fill="#fcfaf4" opacity="0.9" />
          <circle cx="422" cy="206" r="19" fill="#0b3024" opacity="0.75" />

          {/* far skyline of arches, low opacity */}
          <g fill="#041510" opacity="0.55">
            <path d="M70 800 L70 640 Q70 600 104 580 Q138 600 138 640 L138 800 Z" />
            <path d="M150 800 L150 664 Q150 628 180 610 Q210 628 210 664 L210 800 Z" />
            <path d="M430 800 L430 656 Q430 620 462 600 Q494 620 494 656 L494 800 Z" />
            <path d="M506 800 L506 682 Q506 650 536 634 Q566 650 566 682 L566 800 Z" />
            <path d="M230 800 L230 700 Q230 674 252 660 Q274 674 274 700 L274 800 Z" />
            <path d="M366 800 L366 700 Q366 674 388 660 Q410 674 410 700 L410 800 Z" />
          </g>

          {/* lattice glow */}
          <rect x="70" y="300" width="500" height="540" fill="url(#asLattice)" opacity="0.55" />

          {/* lantern */}
          {showLantern && (
            <g>
              <line x1="320" y1="44" x2="320" y2="176" stroke="#e3c87b" strokeWidth="1.2" strokeOpacity="0.6" />
              <circle cx="320" cy="214" r="54" fill="url(#asMoonGlow)" opacity="0.75" />
              <path d="M296 186 h48 l10 22 -34 52 -34 -52 Z" fill="url(#asGold)" opacity="0.9" />
              <path d="M296 186 h48 l10 22 -34 52 -34 -52 Z" fill="none" stroke="#745516" strokeWidth="1" strokeOpacity="0.7" />
              <rect x="310" y="172" width="20" height="10" rx="2" fill="#9a7421" />
              <circle cx="320" cy="214" r="7" fill="#fcfaf4" opacity="0.95" />
            </g>
          )}

          {/* floor */}
          <rect x="70" y="792" width="500" height="68" fill="#041510" opacity="0.9" />
          <line x1="70" y1="792" x2="570" y2="792" stroke="#e3c87b" strokeWidth="1" strokeOpacity="0.55" />
          <path d="M214 800 h212 l-18 30 h-176 Z" fill="#0b3024" opacity="0.9" />
        </g>

        {/* inner arch lines */}
        <path
          d="M150 800 L150 370 Q150 214 320 140 Q490 214 490 370 L490 800"
          fill="none"
          stroke="#e3c87b"
          strokeOpacity="0.42"
          strokeWidth="1"
        />
        <path
          d="M196 800 L196 386 Q196 250 320 190 Q444 250 444 386 L444 800"
          fill="none"
          stroke="#e3c87b"
          strokeOpacity="0.2"
          strokeWidth="1"
        />

        {/* keystone */}
        <g transform="translate(320 52)" fill="none" stroke="#e3c87b" strokeWidth="1.1">
          <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" fill="#9a7421" fillOpacity="0.35" />
        </g>
      </svg>
      {children}
    </div>
  );
}

/**
 * A colonnade of five pointed arches — used as the Courses page identity.
 * Each arch carries a Roman numeral engraved above it.
 */
export function ArchGallery({ className = "" }: { className?: string }) {
  const slots = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 900 420" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-label="A gallery of five arched niches, one for each course">
      <rect x="0" y="0" width="900" height="420" fill="url(#asInk)" />
      <rect x="0" y="0" width="900" height="420" fill="url(#asLattice)" opacity="0.5" />
      <g>
        {slots.map((i) => {
          const x = 34 + i * 168;
          const isGold = i === 2;
          return (
            <g key={i}>
              <path
                d={`M${x} 400 L${x} 236 Q${x} 150 ${x + 68} 106 Q${x + 136} 150 ${x + 136} 236 L${x + 136} 400 Z`}
                fill={isGold ? "url(#asGold)" : "#041510"}
                fillOpacity={isGold ? 0.22 : 0.85}
                stroke={isGold ? "url(#asGold)" : "#e3c87b"}
                strokeOpacity={isGold ? 1 : 0.4}
                strokeWidth="1.2"
              />
              <path
                d={`M${x + 22} 400 L${x + 22} 244 Q${x + 22} 172 ${x + 68} 136 Q${x + 114} 172 ${x + 114} 244 L${x + 114} 400`}
                fill="none"
                stroke={isGold ? "#104131" : "#e3c87b"}
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <text
                x={x + 68}
                y="80"
                textAnchor="middle"
                fill="#e3c87b"
                fillOpacity={isGold ? 0.95 : 0.45}
                fontSize="18"
                className="font-display" fontFamily="serif"
                letterSpacing="3"
              >
                {["I", "II", "III", "IV", "V"][i]}
              </text>
            </g>
          );
        })}
      </g>
      <line x1="0" y1="400" x2="900" y2="400" stroke="#e3c87b" strokeOpacity="0.5" />
    </svg>
  );
}

/**
 * Two facing arches with light between them — the About page identity.
 */
export function Threshold({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 460" className={className} role="img" aria-label="Two facing arches with light passing between them">
      <rect x="0" y="0" width="900" height="460" fill="url(#asInk)" />
      <rect x="0" y="0" width="900" height="460" fill="url(#asLattice)" opacity="0.45" />
      <g>
        <path d="M0 440 L0 250 Q0 150 150 92 Q300 150 300 250 L300 440 Z" fill="#041510" stroke="#e3c87b" strokeOpacity="0.45" />
        <path d="M600 440 L600 250 Q600 150 750 92 Q900 150 900 250 L900 440 Z" fill="#041510" stroke="#e3c87b" strokeOpacity="0.45" />
        <path d="M330 440 L330 270 Q330 196 450 150 Q570 196 570 270 L570 440 Z" fill="url(#asSky)" stroke="url(#asGold)" strokeWidth="1.4" />
        <ellipse cx="450" cy="400" rx="150" ry="90" fill="url(#asHorizon)" opacity="0.9" />
        <rect x="330" y="270" width="240" height="170" fill="url(#asLattice)" opacity="0.5" />
        <line x1="0" y1="440" x2="900" y2="440" stroke="#e3c87b" strokeOpacity="0.45" />
        <g fill="#fcfaf4">
          <circle cx="392" cy="236" r="1.4" opacity="0.7" />
          <circle cx="470" cy="212" r="1.2" opacity="0.6" />
          <circle cx="512" cy="252" r="1.4" opacity="0.7" />
        </g>
      </g>
    </svg>
  );
}

/**
 * A single open doorway with light spilling out — the Contact page identity.
 */
export function OpenDoor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 620" className={className} role="img" aria-label="An open arched doorway with warm light beyond it">
      <rect x="0" y="0" width="640" height="620" fill="url(#asInk)" />
      <rect x="0" y="0" width="640" height="620" fill="url(#asLattice)" opacity="0.4" />
      <path d="M90 600 L90 360 Q90 176 320 96 Q550 176 550 360 L550 600 Z" fill="url(#asSky)" />
      <ellipse cx="320" cy="580" rx="260" ry="130" fill="url(#asHorizon)" opacity="0.9" />
      <rect x="90" y="300" width="460" height="300" fill="url(#asLattice)" opacity="0.45" />
      <path d="M90 600 L90 360 Q90 176 320 96 Q550 176 550 360 L550 600 Z" fill="none" stroke="url(#asGold)" strokeWidth="1.6" />
      <path d="M150 600 L150 380 Q150 232 320 166 Q490 232 490 380 L490 600" fill="none" stroke="#e3c87b" strokeOpacity="0.35" />
      <rect x="90" y="588" width="460" height="14" fill="#041510" />
      <path d="M250 600 L250 430 Q250 360 320 320 Q390 360 390 430 L390 600 Z" fill="#f9f0d6" opacity="0.16" />
      <line x1="320" y1="320" x2="320" y2="600" stroke="#e3c87b" strokeOpacity="0.25" />
    </svg>
  );
}

/** Wide, quiet band of arches for page section breaks. */
export function DawnBand({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 220" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect x="0" y="0" width="1200" height="220" fill="url(#asInk)" />
      <rect x="0" y="0" width="1200" height="220" fill="url(#asLattice)" opacity="0.35" />
      <ellipse cx="600" cy="220" rx="620" ry="150" fill="url(#asHorizon)" opacity="0.55" />
      <g fill="#041510" fillOpacity="0.7" stroke="#e3c87b" strokeOpacity="0.2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const x = i * 100 + 18;
          return <path key={i} d={`M${x} 220 L${x} 120 Q${x} 62 ${x + 32} 40 Q${x + 64} 62 ${x + 64} 120 L${x + 64} 220 Z`} />;
        })}
      </g>
      <line x1="0" y1="219" x2="1200" y2="219" stroke="#e3c87b" strokeOpacity="0.4" />
    </svg>
  );
}
