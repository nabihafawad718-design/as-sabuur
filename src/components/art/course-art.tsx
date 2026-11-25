import type { ReactElement, ReactNode } from "react";
import type { CourseArtVariant } from "@/data/courses";

/**
 * Original engraved plates for each course. Built from simple shapes and
 * Arabic letterforms — no photographs, no stock illustration, no fake screenshots.
 */


function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <rect x="0" y="0" width="480" height="360" fill="url(#asIvory)" />
      <rect x="0" y="0" width="480" height="360" fill="url(#asLatticeDark)" opacity="0.5" />
      <rect x="14" y="14" width="452" height="332" fill="none" stroke="#9a7421" strokeOpacity="0.35" />
      <g stroke="#9a7421" strokeOpacity="0.6" strokeWidth="1.1" fill="none">
        <path d="M14 40V14h26" />
        <path d="M466 320v26h-26" />
      </g>
      {children}
    </>
  );
}

function Qaida() {
  const letters = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س"];
  return (
    <Frame>
      <g>
        {letters.map((letter, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const x = 92 + col * 96;
          const y = 118 + row * 82;
          const highlight = i === 5;
          return (
            <g key={letter}>
              {highlight && <circle cx={x} cy={y - 14} r="30" fill="#e3c87b" fillOpacity="0.22" stroke="#9a7421" strokeOpacity="0.6" />}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                className="font-arabic" fontFamily="serif"
                fontSize="40"
                fill={highlight ? "#745516" : "#0b3024"}
                direction="rtl"
              >
                {letter}
              </text>
            </g>
          );
        })}
        <line x1="56" y1="66" x2="424" y2="66" stroke="#9a7421" strokeOpacity="0.35" />
        <text x="240" y="52" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="13" letterSpacing="4" fill="#745516">
          THE FIRST LETTERS
        </text>
        <text x="56" y="318" className="font-display" fontFamily="serif" fontSize="12" letterSpacing="2" fill="#4c7d63">
          ا ب ت ث · joined and isolated forms
        </text>
      </g>
    </Frame>
  );
}

function Reading() {
  return (
    <Frame>
      <g>
        {/* open mushaf */}
        <path d="M240 268 C196 240 140 236 76 246 L76 104 C140 94 196 100 240 128 Z" fill="#fcfaf4" stroke="#9a7421" strokeOpacity="0.55" />
        <path d="M240 268 C284 240 340 236 404 246 L404 104 C340 94 284 100 240 128 Z" fill="#fcfaf4" stroke="#9a7421" strokeOpacity="0.55" />
        <line x1="240" y1="128" x2="240" y2="268" stroke="#9a7421" strokeOpacity="0.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} stroke="#104131" strokeOpacity="0.28" strokeWidth="2">
            <line x1="98" y1={130 + i * 24} x2="220" y2={126 + i * 24} />
            <line x1="260" y1={126 + i * 24} x2="382" y2={130 + i * 24} />
          </g>
        ))}
        <text x="300" y="204" textAnchor="middle" className="font-arabic" fontFamily="serif" fontSize="22" fill="#17533f" direction="rtl">
          ۝
        </text>
        <text x="240" y="52" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="13" letterSpacing="4" fill="#745516">
          FROM WORD TO PAGE
        </text>
        <path d="M404 246 L404 300 Q404 316 388 316 L92 316 Q76 316 76 300 L76 246" fill="none" stroke="#9a7421" strokeOpacity="0.4" />
      </g>
    </Frame>
  );
}

function Tajweed() {
  return (
    <Frame>
      <g>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${128 - i * 18} 292 Q${128 - i * 18} ${196 - i * 30} 240 ${132 - i * 16} Q${352 + i * 18} ${196 - i * 30} ${352 + i * 18} 292`}
            fill="none"
            stroke="#9a7421"
            strokeOpacity={0.42 - i * 0.08}
            strokeWidth="1.2"
          />
        ))}
        <text x="240" y="252" textAnchor="middle" className="font-arabic" fontFamily="serif" fontSize="96" fill="#0b3024" direction="rtl">
          ق
        </text>
        <circle cx="240" cy="196" r="4" fill="#be9432" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect
            key={i}
            x={150 + i * 20}
            y={306 - (i % 3 === 0 ? 18 : i % 3 === 1 ? 8 : 26)}
            width="4"
            height={i % 3 === 0 ? 18 : i % 3 === 1 ? 8 : 26}
            rx="2"
            fill="#4c7d63"
            opacity="0.55"
          />
        ))}
        <text x="240" y="52" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="13" letterSpacing="4" fill="#745516">
          MAKHRAJ · SIFAT · TARTEEL
        </text>
      </g>
    </Frame>
  );
}

function Hifz() {
  const ticks = Array.from({ length: 30 }, (_, i) => i);
  return (
    <Frame>
      <g>
        <circle cx="240" cy="196" r="112" fill="none" stroke="#9a7421" strokeOpacity="0.4" />
        <circle cx="240" cy="196" r="86" fill="none" stroke="#9a7421" strokeOpacity="0.25" />
        {ticks.map((i) => {
          const angle = (i * 360) / 30 - 90;
          const rad = (angle * Math.PI) / 180;
          const x1 = 240 + Math.cos(rad) * 96;
          const y1 = 196 + Math.sin(rad) * 96;
          const x2 = 240 + Math.cos(rad) * 112;
          const y2 = 196 + Math.sin(rad) * 112;
          const memorised = i < 9;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={memorised ? "#be9432" : "#104131"}
              strokeOpacity={memorised ? 0.95 : 0.22}
              strokeWidth={memorised ? 3 : 1.6}
            />
          );
        })}
        <text x="240" y="212" textAnchor="middle" className="font-arabic" fontFamily="serif" fontSize="66" fill="#0b3024" direction="rtl">
          حِفْظ
        </text>
        <text x="240" y="52" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="13" letterSpacing="4" fill="#745516">
          SABAQ · SABQI · MANZIL
        </text>
        <text x="240" y="330" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="11" letterSpacing="2" fill="#4c7d63">
          A 30-part ring, learned one steady portion at a time
        </text>
      </g>
    </Frame>
  );
}

function Arabic() {
  const words = [
    { arabic: "كَتَبَ", gloss: "he wrote", x: 104 },
    { arabic: "كِتَاب", gloss: "book", x: 240 },
    { arabic: "مَكْتَب", gloss: "office / desk", x: 376 },
  ];
  return (
    <Frame>
      <g>
        <text x="240" y="52" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="13" letterSpacing="4" fill="#745516">
          ONE ROOT, MANY WORDS
        </text>
        <g className="font-arabic" fontFamily="serif" fill="#0b3024">
          <text x="150" y="128" textAnchor="middle" fontSize="46" direction="rtl">ك</text>
          <text x="240" y="128" textAnchor="middle" fontSize="46" direction="rtl">ت</text>
          <text x="330" y="128" textAnchor="middle" fontSize="46" direction="rtl">ب</text>
        </g>
        <g stroke="#9a7421" strokeOpacity="0.55" fill="none">
          <path d="M240 146 L240 176" />
          <path d="M240 176 L104 214" />
          <path d="M240 176 L240 214" />
          <path d="M240 176 L376 214" />
        </g>
        {words.map((w) => (
          <g key={w.arabic}>
            <rect x={w.x - 64} y="214" width="128" height="82" rx="8" fill="#fcfaf4" stroke="#9a7421" strokeOpacity="0.4" />
            <text x={w.x} y="258" textAnchor="middle" className="font-arabic" fontFamily="serif" fontSize="28" fill="#104131" direction="rtl">
              {w.arabic}
            </text>
            <text x={w.x} y="282" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="11" letterSpacing="1.5" fill="#4c7d63">
              {w.gloss}
            </text>
          </g>
        ))}
        <text x="240" y="330" textAnchor="middle" className="font-display" fontFamily="serif" fontSize="11" letterSpacing="2" fill="#745516">
          ك ت ب — the root behind writing
        </text>
      </g>
    </Frame>
  );
}

const PLATES: Record<CourseArtVariant, () => ReactElement> = {
  qaida: Qaida,
  reading: Reading,
  tajweed: Tajweed,
  hifz: Hifz,
  arabic: Arabic,
};

export function CourseArt({
  variant,
  className = "",
  label,
}: {
  variant: CourseArtVariant;
  className?: string;
  label?: string;
}) {
  const Plate = PLATES[variant];
  return (
    <svg viewBox="0 0 480 360" className={className} role="img" aria-label={label ?? "Course illustration"}>
      <Plate />
    </svg>
  );
}
