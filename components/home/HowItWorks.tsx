"use client";

import { Search, Sparkles, CalendarHeart, Gift } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { useLang } from "@/lib/i18n";

/**
 * How to order. No bear: this is instructional content, and the mascot here
 * would be pure decoration — the exact pattern we're removing. Numbers and a
 * hairline connect the steps instead.
 */
const STEPS = [
  { icon: Search, titleKey: "how.step1", bodyKey: "how.step1body" },
  { icon: Sparkles, titleKey: "how.step2", bodyKey: "how.step2body" },
  { icon: CalendarHeart, titleKey: "how.step3", bodyKey: "how.step3body" },
  { icon: Gift, titleKey: "how.step4", bodyKey: "how.step4body" },
];

export default function HowItWorks() {
  const { t } = useLang();
  return (
    <section className="section bg-milk">
      <div className="container-bx">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="t-eyebrow">{t("how.eyebrow")}</p>
          <h2 className="t-heading mt-4">{t("how.heading")}</h2>
        </Reveal>

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* One continuous hairline behind the steps on wide screens. */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block"
          />
          {STEPS.map((step, i) => (
            <Reveal key={t(step.titleKey)} delay={i * 0.08} className="relative text-center">
              <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-surface text-teddy shadow-paper">
                <step.icon size={20} strokeWidth={1.5} />
              </span>
              <span className="mt-5 block font-display text-lg text-cocoa">
                {t(step.titleKey)}
              </span>
              <p className="t-caption mx-auto mt-2 max-w-[190px]">{t(step.bodyKey)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
