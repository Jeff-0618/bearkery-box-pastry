"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * SITE THEME
 *
 * Two looks for the same shop:
 *  - "day"      the everyday warm-milk bakery
 *  - "festive"  the Mid-Autumn night: deep warm dark, moonlight, gold
 *
 * The festive theme is only offered while a festival is running (see
 * FESTIVE_WINDOW). Outside that window the toggle hides itself and the site
 * stays on day — so the theme can't be left switched on into December.
 *
 * Applied by setting data-theme on <html>; the CSS in globals.css does the
 * rest, so no component needs to know which theme is active.
 */

export type Theme = "day" | "festive";

const STORAGE_KEY = "bearkery-theme";

/**
 * Mid-Autumn 2026 falls on 25 September. The festive look runs for the
 * fortnight around it and then retires itself.
 */
const FESTIVE_WINDOW = { start: "2026-09-08", end: "2026-10-02" };

export function isFestiveSeason(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return today >= FESTIVE_WINDOW.start && today <= FESTIVE_WINDOW.end;
}

interface ThemeValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  /** Whether the festive option should be offered at all. */
  festiveAvailable: boolean;
}

const ThemeContext = createContext<ThemeValue>({
  theme: "day",
  setTheme: () => {},
  festiveAvailable: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Server and first client render must match, so start on "day" and settle
  // to the real value after mount.
  const [theme, setThemeState] = useState<Theme>("day");
  const [festiveAvailable, setFestiveAvailable] = useState(false);

  useEffect(() => {
    const available = isFestiveSeason();
    setFestiveAvailable(available);

    let next: Theme = available ? "festive" : "day";
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "day" || saved === "festive") next = saved;
    } catch {
      /* storage unavailable */
    }
    if (!available) next = "day";

    setThemeState(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, festiveAvailable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
