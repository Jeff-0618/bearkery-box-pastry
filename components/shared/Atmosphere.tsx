"use client";

import { cx } from "@/lib/utils";

/**
 * Environment atmosphere.
 *
 * Both pieces are deliberately at the edge of perception — the rule is that
 * if you *notice the animation*, it's too strong. Sunlight drifts over ~18s;
 * the sprig sways ~2 degrees over 7s. No particles, no petals, no weather.
 */

/** A slow, warm shaft of morning light. Purely decorative. */
export function Sunlight({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-sunlight animate-driftLight" />
    </div>
  );
}

/** A small sage sprig — the only green on the site. */
export function Sprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 90"
      aria-hidden="true"
      className={cx("origin-bottom animate-sway text-matcha", className)}
      fill="none"
    >
      <path d="M30 88 V22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {[0, 1, 2, 3].map((i) => {
        const y = 30 + i * 15;
        return (
          <g key={i}>
            <ellipse cx="20" cy={y} rx="10" ry="5" fill="currentColor" opacity="0.55"
              transform={`rotate(-24 20 ${y})`} />
            <ellipse cx="40" cy={y + 7} rx="10" ry="5" fill="currentColor" opacity="0.4"
              transform={`rotate(24 40 ${y + 7})`} />
          </g>
        );
      })}
    </svg>
  );
}
