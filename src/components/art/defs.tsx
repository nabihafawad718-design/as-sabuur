/**
 * Shared SVG definitions.
 *
 * Rendered once in the root layout. Every art component references these
 * gradients, patterns and clip paths by id, which keeps the markup small and
 * avoids duplicate-id collisions between instances.
 */

export function ArtDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        {/* Dawn sky: deep pine at the top, warm horizon, gold light */}
        <linearGradient id="asSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#041510" />
          <stop offset="34%" stopColor="#0b3024" />
          <stop offset="68%" stopColor="#17533f" />
          <stop offset="88%" stopColor="#4c7d63" />
          <stop offset="100%" stopColor="#be9432" />
        </linearGradient>

        <radialGradient id="asHorizon" cx="50%" cy="88%" r="62%">
          <stop offset="0%" stopColor="#f9f0d6" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#e3c87b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0b3024" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="asMoonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fcfaf4" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#e3c87b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#e3c87b" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="asGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9f0d6" />
          <stop offset="42%" stopColor="#e3c87b" />
          <stop offset="72%" stopColor="#d4b054" />
          <stop offset="100%" stopColor="#9a7421" />
        </linearGradient>

        <linearGradient id="asGoldSoft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e3c87b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9a7421" stopOpacity="0.55" />
        </linearGradient>

        <linearGradient id="asIvory" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcfaf4" />
          <stop offset="100%" stopColor="#eadfcb" />
        </linearGradient>

        <linearGradient id="asInk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#072219" />
          <stop offset="100%" stopColor="#104131" />
        </linearGradient>

        <linearGradient id="asSage" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1f6f3" />
          <stop offset="100%" stopColor="#bed6c8" />
        </linearGradient>

        {/* Girih-style lattice, drawn with hairlines */}
        <pattern id="asLattice" width="56" height="56" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#e3c87b" strokeOpacity="0.22" strokeWidth="0.8">
            <path d="M28 2 54 28 28 54 2 28Z" />
            <path d="M28 14 42 28 28 42 14 28Z" />
            <path d="M0 0 56 56M56 0 0 56" strokeOpacity="0.09" />
          </g>
        </pattern>

        <pattern id="asLatticeDark" width="56" height="56" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#104131" strokeOpacity="0.12" strokeWidth="0.8">
            <path d="M28 2 54 28 28 54 2 28Z" />
            <path d="M28 14 42 28 28 42 14 28Z" />
          </g>
        </pattern>

        {/* Pointed arch used as the clip for every arch panel */}
        <clipPath id="asArchClip">
          <path d="M90 800 L90 350 Q90 158 320 62 Q550 158 550 350 L550 800 Z" />
        </clipPath>

        <clipPath id="asArchClipInner">
          <path d="M150 800 L150 370 Q150 214 320 140 Q490 214 490 370 L490 800 Z" />
        </clipPath>

        <filter id="asGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
    </svg>
  );
}
