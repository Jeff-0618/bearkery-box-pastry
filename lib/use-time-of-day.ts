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
  /** False until the real local time has been read on the client. */
  ready?: boolean;
  part: DayPart;
  greeting: string;
  line: string;
  /** Tailwind background utility for the ambient light. */
  light: string;
  /** True while sandwiches can still be collected today. */
  sandwichWindowOpen: boolean;
}

function resolve(hour: number): TimeOfDay {
  // Shop hours are 7:00–18:00; sandwiches are collected 7:00–11:00.
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
  // 18:00 onwards — the shop has closed for the day.
  return {
    part: "evening",
    greeting: "Good evening",
    line: "We've closed for the night. Order ahead and we'll bake it fresh in the morning.",
    light: "bg-night",
    sandwichWindowOpen: false,
  };
}

export function useTimeOfDay(): TimeOfDay {
  // Start on a stable value so server and client markup match, then settle to
  // the real local time after mount.
  const [state, setState] = useState<TimeOfDay>(() => ({
    ...resolve(9),
    ready: false,
  }));

  useEffect(() => {
    const read = () => setState({ ...resolve(new Date().getHours()), ready: true });
    read();
    const id = setInterval(read, 60_000);
    return () => clearInterval(id);
  }, []);

  return state;
}
