"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink, BUSINESS } from "@/lib/business";
import Reveal from "@/components/shared/Reveal";
import { useLang } from "@/lib/i18n";

/**
 * Special orders.
 *
 * These are never sold through the cart — they're arranged one at a time in
 * conversation, which is the client's own working method and also the honest
 * way to sell something that has to be discussed before it can be quoted.
 *
 * The copy names the occasions plainly (a customer searching for 满月礼盒
 * needs to recognise themselves here), explains how it works so nobody has
 * to guess, and makes the first message easy to send.
 */
const OCCASIONS = [
  {
    titleKey: "special.fullmoon",
    bodyKey: "special.fullmoonBody",
    message: "Hi Bearkery Box Pastry! I'd like to ask about a full moon celebration gift box.",
  },
  {
    titleKey: "special.betrothal",
    bodyKey: "special.betrothalBody",
    message: "Hi Bearkery Box Pastry! I'd like to ask about a betrothal gift box.",
  },
  {
    titleKey: "special.corporate",
    bodyKey: "special.corporateBody",
    message: "Hi Bearkery Box Pastry! I'd like to ask about a corporate or bulk order.",
  },
  {
    titleKey: "special.custom",
    bodyKey: "special.customBody",
    message: "Hi Bearkery Box Pastry! I have a custom order in mind.",
  },
];

export default function SpecialOrders() {
  const { t } = useLang();
  return (
    <section className="section bg-milk">
      <div className="container-bx">
        <Reveal className="mx-auto mb-12 max-w-xl text-center">
          <p className="t-eyebrow">{t("special.eyebrow")}</p>
          <h2 className="t-heading mt-4">{t("special.heading")}</h2>
          <p className="t-body mx-auto mt-4">
            {t("special.body")}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {OCCASIONS.map((o, i) => (
            <Reveal key={t(o.titleKey)} delay={i * 0.07}>
              <a
                href={whatsappLink(o.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="paper group flex h-full flex-col p-6 transition-shadow duration-500 hover:shadow-lifted"
              >
                <h3 className="font-display text-lg text-cocoa">{t(o.titleKey)}</h3>
                <p className="t-caption mt-2 flex-1">{t(o.bodyKey)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-caramel">
                  <MessageCircle size={13} />
                  {t("special.start")}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="t-caption">
            {t("special.hours")}, {BUSINESS.hours.general} · {BUSINESS.phoneDisplay}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
