"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/utils";

/**
 * THE BEAR
 *
 * One photograph of the client's own teddy, holding the signature Pudding
 * Burnt Cake. It appears once, prominently, and is otherwise left alone.
 *
 * Deliberately almost still. The bear is a photograph, not an illustration —
 * animating a real object reads as uncanny rather than charming, so the only
 * motion is an optional, barely perceptible breath. Warmth here comes from
 * light, space and colour, not from making the mascot perform.
 */
export default function Bear({
  className,
  breathe = true,
  priority = false,
}: {
  className?: string;
  breathe?: boolean;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        className={cx(
          "flex items-center justify-center rounded-soft border border-dashed border-caramel/40 bg-cream/50 p-4 text-center",
          className
        )}
      >
        <span className="text-[11px] leading-snug text-taupe">
          /public/bear/hero-bear.png not found
        </span>
      </div>
    );
  }

  return (
    <div className={cx("relative", className)}>
      <Image
        src="/bear/hero-bear.png"
        alt="Bearkery's teddy bear holding a pudding burnt cake"
        width={680}
        height={910}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => setMissing(true)}
        className={cx(
          "h-auto w-full object-contain transition-all duration-1000 ease-gentle",
          breathe && "motion-safe:animate-breathe",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      />
    </div>
  );
}
