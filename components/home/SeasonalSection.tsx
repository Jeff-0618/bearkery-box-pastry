"use client";

import { MessageCircle } from "lucide-react";
import { CURRENT, seasonalCtaLink } from "@/lib/seasonal";
import Reveal from "@/components/shared/Reveal";
import { useLang } from "@/lib/language";

/**
 * The seasonal block. Content comes entirely from lib/seasonal.ts.
 *
 * The moon is a single soft disc with a warm halo — no lanterns, no rabbits,
 * no falling petals. The feeling should come from the light and the words,
 * which is also what keeps it from dating the site or looking like clip art.
 */
export default function SeasonalSection() {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  if (!CURRENT.active) return null;

  return (
    <section className="relative overflow-hidden bg-cocoa/[0.97] py-20 sm:py-28">
      {/* Warm night sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 18%, rgba(246,220,198,0.30) 0%, rgba(75,58,47,0) 55%)",
        }}
      />

      {CURRENT.moon && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-12 sm:right-[12%]"
        >
          {/* Halo */}
          <div className="absolute -inset-10 rounded-full bg-peach/20 blur-3xl" />
          {/* The moon itself — still, not animated. */}
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-b from-[#FBEFD9] to-[#EFD9B8] shadow-[0_0_60px_rgba(246,220,198,0.45)] sm:h-32 sm:w-32" />
        </div>
      )}

      <div className="container-bx relative">
        <Reveal className="max-w-xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-peach">
            {zh ? CURRENT.eyebrowZh : CURRENT.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl text-milk sm:text-4xl">
            {zh ? CURRENT.headingZh : CURRENT.heading}
          </h2>
          <p className="mt-5 text-[0.95rem] leading-[1.8] text-milk/75">
            {zh ? CURRENT.bodyZh : CURRENT.body}
          </p>

          <a
            href={seasonalCtaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-8 bg-peach text-cocoa hover:bg-milk"
          >
            <MessageCircle size={16} />
            {t("season.cta")}
          </a>

          {CURRENT.footnote && (
            <p className="mt-4 text-xs text-milk/50">{zh ? CURRENT.footnoteZh : CURRENT.footnote}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
