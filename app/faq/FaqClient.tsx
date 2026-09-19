"use client";

import FaqAccordion from "./FaqAccordion";
import { BUSINESS, ADDRESS_ONE_LINE } from "@/lib/business";
import { useLang } from "@/lib/language";

/**
 * The answers carry live business details — opening hours, the address, the
 * phone number — and those sit in different places in an English sentence
 * than in a Chinese one. So the dictionary string holds a named slot and
 * this fills it, instead of gluing a translated fragment onto a value and
 * hoping the word order survives.
 *
 * The values themselves still come from lib/business.ts, so changing the
 * pickup hours in one place still updates both languages.
 */
const FACTS: Record<string, string> = {
  "{sandwichHours}": BUSINESS.hours.sandwiches,
  "{generalHours}": BUSINESS.hours.general,
  "{address}": ADDRESS_ONE_LINE,
  "{phone}": BUSINESS.phoneDisplay,
};

function fill(text: string) {
  return Object.entries(FACTS).reduce(
    (out, [slot, value]) => out.split(slot).join(value),
    text
  );
}

export default function FaqClient() {
  const { t } = useLang();

  const items = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    q: t(`faq.q${n}`),
    a: fill(t(`faq.a${n}`)),
  }));

  return (
    <div className="container-bx page">
      <div className="mb-10 max-w-xl">
        <p className="t-eyebrow">{t("faq.eyebrow")}</p>
        <h1 className="t-heading mt-4">{t("faq.title")}</h1>
        <p className="t-body mt-4">{t("faq.description")}</p>
      </div>
      <FaqAccordion items={items} />
    </div>
  );
}
