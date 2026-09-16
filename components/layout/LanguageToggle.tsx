"use client";

import { useLang } from "@/lib/language";
import { cx } from "@/lib/utils";

/**
 * Language toggle.
 *
 * A two-state pill rather than a dropdown: with only two languages, showing
 * both at once means one tap instead of two, and the visitor can see their
 * language is available without opening anything.
 */
export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={cx(
        "flex shrink-0 items-center rounded-pill border border-line bg-surface p-0.5",
        className
      )}
      role="group"
      aria-label="Language / 语言"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cx(
          "rounded-pill px-2 py-1.5 text-[0.7rem] font-semibold transition-colors duration-300 sm:px-2.5 sm:text-xs",
          lang === "en" ? "bg-cocoa text-milk" : "text-taupe hover:text-cocoa"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("zh")}
        aria-pressed={lang === "zh"}
        className={cx(
          "rounded-pill px-2 py-1.5 text-[0.7rem] font-semibold transition-colors duration-300 sm:px-2.5 sm:text-xs",
          lang === "zh" ? "bg-cocoa text-milk" : "text-taupe hover:text-cocoa"
        )}
      >
        中文
      </button>
    </div>
  );
}
