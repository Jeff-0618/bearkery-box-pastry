"use client";

import { useEffect, useState } from "react";

/**
 * The shop knows what time it is.
 *
 * The site's light, greeting and lead product shift across the day, matching
 * the bakery's real rhythm: sandwiches are collected 7–11am, so mornings lead
 * with them; afternoons lead with the signature cake; evenings wind down.
 *
 * This is the detail that makes the site feel like a place rather than a
 * brochure — and it's genuinely useful, not decoration.
 */
export type DayPart = "morning" | "afternoon" | "evening";

export interface TimeOfDay {
  part: DayPart;
  greeting: string;
  line: string;
  /** Tailwind background utility for the ambient light. */
  light: string;
  /** True while sandwiches can still be collected today. */
  sandwichWindowOpen: boolean;
}

function resolve(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 11) {
    return {
      part: "morning",
      greeting: "Good morning",
      line: "The sandwiches are out of the kitchen. Collection until 11am.",
      light: "bg-sunlight",
      sandwichWindowOpen: true,
    };
  }
  if (hour >= 11 && hour < 18) {
    return {
      part: "afternoon",
      greeting: "Good afternoon",
      line: "A quiet afternoon slice, freshly baked to order.",
      light: "bg-dusk",
      sandwichWindowOpen: false,
    };
  }
  return {
    part: "evening",
    greeting: "Good evening",
    line: "The oven's cooling down. Order ahead and we'll bake it fresh tomorrow.",
    light: "bg-night",
    sandwichWindowOpen: false,
  };
}

export function useTimeOfDay(): TimeOfDay {
  // Start on a stable value so server and client markup match, then settle to
  // the real local time after mount.
  const [state, setState] = useState<TimeOfDay>(() => resolve(9));

  useEffect(() => {
    setState(resolve(new Date().getHours()));
    const id = setInterval(() => setState(resolve(new Date().getHours())), 60_000);
    return () => clearInterval(id);
  }, []);

  return state;
}
