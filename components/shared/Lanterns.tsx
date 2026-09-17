"use client";

import { useTheme } from "@/lib/theme";

/**
 * Hanging Mid-Autumn lanterns.
 *
 * Drawn as SVG rather than loaded as images: they scale cleanly, weigh
 * nothing, and can take their colour from the theme. Each hangs from the top
 * edge and sways on its own slow rhythm, so the row never moves in unison
 * (which is what makes a decoration look like a loop rather than a breeze).
 *
 * Festive theme only — on the everyday site they'd be clutter.
 */

const LANTERNS = [
  { left: "8%",  size: 62, delay: 0,    duration: 7.5, drop: 0 },
  { left: "26%", size: 44, delay: 1.2,  duration: 9,   drop: 34 },
  { left: "63%", size: 50, delay: 0.6,  duration: 8.2, drop: 18 },
  { left: "84%", size: 68, delay: 2.0,  duration: 7,   drop: 6 },
  { left: "45%", size: 38, delay: 1.7,  duration: 9.6, drop: 52 },
];

function Lantern({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 60 90"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_0_18px_rgba(240,201,138,0.35)]"
    >
      {/* cord */}
      <line x1="30" y1="0" x2="30" y2="14" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* top cap */}
      <rect x="20" y="13" width="20" height="5" rx="2" fill="currentColor" opacity="0.75" />
      {/* body */}
      <ellipse cx="30" cy="42" rx="24" ry="25" fill="url(#lanternGlow)" />
      <ellipse cx="30" cy="42" rx="24" ry="25" fill="currentColor" opacity="0.30" />
      {/* ribs */}
      <path d="M14 42a16 25 0 0 1 32 0 16 25 0 0 1-32 0" stroke="currentColor" strokeWidth="0.8" opacity="0.35" fill="none" />
      <line x1="30" y1="17" x2="30" y2="67" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      {/* bottom cap */}
      <rect x="20" y="65" width="20" height="5" rx="2" fill="currentColor" opacity="0.75" />
      {/* tassel */}
      <line x1="30" y1="70" x2="30" y2="84" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <circle cx="30" cy="86" r="2.4" fill="currentColor" opacity="0.6" />
      <defs>
        <radialGradient id="lanternGlow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#FFE6B8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#E08A4A" stopOpacity="0.55" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function Lanterns() {
  const { theme } = useTheme();
  if (theme !== "festive") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56 overflow-hidden"
    >
      {LANTERNS.map((l, i) => (
        <div
          key={i}
          className="absolute top-0 origin-top text-caramel motion-safe:animate-lanternSway"
          style={{
            left: l.left,
            marginTop: `-${l.drop}px`,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
          }}
        >
          <Lantern size={l.size} />
        </div>
      ))}
    </div>
  );
}
