"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils";

/**
 * THE LIVING BEAR — layered edition.
 *
 * The client's teddy is never redrawn. These are the client's own photographs,
 * separated into parts so each can move independently. Every pixel is theirs;
 * only the arrangement is code.
 *
 * Parts share one canvas (860×1133) and keep their original positions, so they
 * stack back into the exact original character with no offset maths.
 *
 * Motion vocabulary — slow and organic, never cartoonish:
 *   breathe : whole body scales ~1.5% over 5s
 *   look    : head + ears drift a few px toward the cursor, heavily damped
 *   tilt    : head rotates a degree or two with the drift
 *   ears    : lag behind the head slightly, so they feel soft and attached
 *   wave    : one arm rotates gently — used sparingly, on greeting/success
 *   react   : a brief, small lift when the user does something meaningful
 */

const CANVAS = { w: 860, h: 1133 };

/** Rotation origins, as % of canvas — set so limbs pivot at the shoulder/neck. */
const ORIGIN = {
  head: "50% 42%",
  armLeft: "72% 12%",
  armRight: "28% 12%",
};

export type BearMood = "idle" | "greet" | "happy" | "resting";

export default function LayeredBear({
  className,
  mood = "idle",
  look = true,
  priority = false,
  reactKey,
}: {
  className?: string;
  /** greet = slow wave; happy = brief celebration; resting = eyes-down calm. */
  mood?: BearMood;
  /** Follow the cursor on pointer devices. */
  look?: boolean;
  priority?: boolean;
  /** Change to trigger a one-off happy reaction. */
  reactKey?: string | number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const earLRef = useRef<HTMLDivElement>(null);
  const earRRef = useRef<HTMLDivElement>(null);
  const [reacting, setReacting] = useState(false);
  const firstRun = useRef(true);

  // --- brief reaction ---
  useEffect(() => {
    if (reactKey === undefined) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setReacting(true);
    const t = setTimeout(() => setReacting(false), 900);
    return () => clearTimeout(t);
  }, [reactKey]);

  // --- gaze: head and ears drift toward the cursor ---
  useEffect(() => {
    if (!look) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    let raf = 0;
    let tx = 0, ty = 0;   // target
    let cx_ = 0, cy_ = 0; // current (head)
    let ex = 0, ey = 0;   // current (ears, lagging)

    const onMove = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.35);
      // Small range — a glance, not head-tracking.
      tx = Math.max(-14, Math.min(14, dx / 22));
      ty = Math.max(-8, Math.min(8, dy / 34));
    };

    const tick = () => {
      cx_ += (tx - cx_) * 0.06;
      cy_ += (ty - cy_) * 0.06;
      // Ears follow the head a beat later — reads as soft, stuffed weight.
      ex += (cx_ - ex) * 0.10;
      ey += (cy_ - ey) * 0.10;

      const tilt = cx_ * 0.16; // slight rotation with the drift
      if (headRef.current)
        headRef.current.style.transform = `translate3d(${cx_}px, ${cy_}px, 0) rotate(${tilt}deg)`;
      if (earLRef.current)
        earLRef.current.style.transform = `translate3d(${ex}px, ${ey}px, 0) rotate(${tilt}deg)`;
      if (earRRef.current)
        earRRef.current.style.transform = `translate3d(${ex}px, ${ey}px, 0) rotate(${tilt}deg)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [look]);

  const layer = (
    name: string,
    ref?: React.RefObject<HTMLDivElement>,
    extra?: string,
    style?: React.CSSProperties
  ) => (
    <div
      ref={ref}
      className={cx("absolute inset-0 will-change-transform", extra)}
      style={style}
    >
      <Image
        src={`/bear/${name}.png`}
        alt=""
        fill
        sizes="(max-width: 768px) 60vw, 420px"
        priority={priority}
        className="object-contain"
      />
    </div>
  );

  const waving = mood === "greet";
  const happy = mood === "happy" || reacting;

  return (
    <div
      ref={rootRef}
      className={cx("relative select-none", className)}
      style={{ aspectRatio: `${CANVAS.w} / ${CANVAS.h}` }}
      role="img"
      aria-label="Bearkery's teddy bear"
    >
      {/* Whole figure breathes, and lifts slightly when happy. */}
      <div
        className={cx(
          "absolute inset-0 motion-safe:animate-breathe transition-transform duration-700 ease-gentle",
          happy && "-translate-y-2"
        )}
      >
        {/* Back-to-front stacking order */}
        {layer("ear-left", earLRef, undefined, { transformOrigin: ORIGIN.head })}
        {layer("ear-right", earRRef, undefined, { transformOrigin: ORIGIN.head })}
        {layer("leg-left")}
        {layer("leg-right")}

        {/* Left arm waves on greeting */}
        {layer(
          "arm-left",
          undefined,
          waving ? "motion-safe:animate-wave" : undefined,
          { transformOrigin: ORIGIN.armLeft }
        )}
        {layer("arm-right", undefined, undefined, { transformOrigin: ORIGIN.armRight })}

        {layer("body")}
        {layer("head", headRef, undefined, { transformOrigin: ORIGIN.head })}
      </div>
    </div>
  );
}
