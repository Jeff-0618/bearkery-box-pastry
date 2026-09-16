"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useLang } from "@/lib/language";
import { cx } from "@/lib/utils";

/**
 * Switches between the everyday look and the Mid-Autumn night.
 *
 * Only rendered during the festival window — outside it there's nothing to
 * switch to, and a permanent button would just be clutter.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, festiveAvailable } = useTheme();
  const { lang } = useLang();

  if (!festiveAvailable) return null;

  const festive = theme === "festive";
  const label = festive
    ? lang === "zh"
      ? "切换为日常版"
      : "Switch to everyday"
    : lang === "zh"
    ? "切换为中秋版"
    : "Switch to Mid-Autumn";

  return (
    <button
      type="button"
      onClick={() => setTheme(festive ? "day" : "festive")}
      title={label}
      aria-label={label}
      className={cx(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-cocoa transition-colors duration-300 hover:bg-peach sm:h-11 sm:w-11",
        className
      )}
    >
      {festive ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
    </button>
  );
}
