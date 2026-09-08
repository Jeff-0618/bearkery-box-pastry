"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils";

/**
 * THE LIVING BEAR
 *
 * The client's teddy illustrations are never redrawn or altered — this
 * component only changes how they are *presented*: it wraps the untouched
 * artwork in slow, organic motion so the character reads as alive rather
 * than pasted on.
 *
 * Behaviours (all transform/opacity only, so they stay GPU-cheap):
 *  - idle      : a ~5.5s breathing scale, like something quietly alive
 *  - entrance  : a slow soft reveal when it first scrolls into view
 *  - gaze      : on desktop, drifts a few pixels toward the cursor, heavily
 *                damped so it feels like noticing, not tracking
 *  - reaction  : a brief warm "pulse" the app can trigger on key actions
 *
 * Blinking is deliberately NOT implemented: it would require a second
 * closed-eye frame of the artwork, which we don't have and won't invent.
 */

export const BEAR_SLOTS = {
  welcome: { file: "welcome-bear.png", alt: "The Bearkery teddy, welcoming you in" },
  "holding-cake": { file: "holding-cake.png", alt: "The Bearkery teddy holding a cake" },
  "holding-sandwich": { file: "holding-sandwich.png", alt: "The Bearkery teddy with a sandwich" },
  "packing-gift": { file: "packing-gift.png", alt: "The Bearkery teddy tying a ribbon on a gift box" },
  "thank-you": { file: "thank-you-bear.png", alt: "The Bearkery teddy saying thank you" },
  waiting: { file: "waiting-bear.png", alt: "The Bearkery teddy waiting quietly" },
  sleeping: { file: "sleeping-bear.png", alt: "The Bearkery teddy asleep" },
  "reading-menu": { file: "reading-menu.png", alt: "The Bearkery teddy reading the menu" },
  baking: { file: "baking-bear.png", alt: "The Bearkery teddy baking" },
  "gift-box": { file: "gift-box-bear.png", alt: "The Bearkery teddy holding a gift box" },
} as const;

export type BearSlot = keyof typeof BEAR_SLOTS;

export default function Bear({
  slot,
  className,
  gaze = false,
  breathe = true,
  priority = false,
  reactKey,
}: {
  slot: BearSlot;
  className?: string;
  /** Desktop-only: drift slightly toward the cursor. */
  gaze?: boolean;
  breathe?: boolean;
  priority?: boolean;
  /** Change this value to trigger a brief, one-off happy reaction. */
  reactKey?: string | number;
}) {
  const { file, alt } = BEAR_SLOTS[slot];
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [missing, setMissing] = useState(false);
  const [reacting, setReacting] = useState(false);
  const firstReact = useRef(true);

  // --- brief reaction on key user actions ---
  useEffect(() => {
    if (reactKey === undefined) return;
    if (firstReact.current) {
      firstReact.current = false; // don't react on initial mount
      return;
    }
    setReacting(true);
    const t = setTimeout(() => setReacting(false), 650);
    return () => clearTimeout(t);
  }, [reactKey]);

  // --- gaze: damped drift toward the cursor (desktop, pointer devices only) ---
  useEffect(() => {
    if (!gaze) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      // Very small range: this is a glance, not a follow-cam.
      targetX = Math.max(-6, Math.min(6, dx / 45));
      targetY = Math.max(-4, Math.min(4, dy / 60));
    };

    const tick = () => {
      // Heavy damping = slow, soft reaction.
      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;
      const el = wrapRef.current;
      if (el) el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [gaze]);

  if (missing) {
    return (
      <div
        className={cx(
          "flex h-full w-full items-center justify-center rounded-soft border border-dashed border-teddy/30 bg-cream/40",
          className
        )}
      >
        <span className="px-3 text-center text-[11px] text-taupe/70">{file}</span>
      </div>
    );
  }

  return (
    // Outer layer: gaze translation (imperatively set, never re-renders).
    <div ref={wrapRef} className={cx("will-change-transform", className)}>
      {/* Middle layer: the brief reaction pulse. */}
      <div
        className={cx(
          "h-full w-full transition-transform duration-500 ease-gentle",
          reacting ? "scale-[1.06]" : "scale-100"
        )}
      >
        {/* Inner layer: the constant, slow breath. */}
        <div className={cx("relative h-full w-full", breathe && "animate-breathe")}>
          <Image
            src={`/illustrations/${file}`}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 40vw, 320px"
            onLoad={() => setLoaded(true)}
            onError={() => setMissing(true)}
            className={cx(
              "object-contain transition-all duration-[1200ms] ease-gentle",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
          />
        </div>
      </div>
    </div>
  );
}
