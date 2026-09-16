"use client";

import Link from "next/link";
import { getProductsByCollection, getFromPrice } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import LazyImage from "@/components/shared/LazyImage";
import Reveal from "@/components/shared/Reveal";
import { useLang } from "@/lib/language";

/**
 * Hand-drawn cakes. The drawing is the product, so the photographs lead and
 * the copy stays out of the way. Three sizes, each priced by flavour.
 */
export default function HandDrawnSection() {
  const { t } = useLang();
  const sizes = getProductsByCollection("hand-drawn-cakes");
  if (!sizes.length) return null;

  return (
    <section className="section bg-cream">
      <div className="container-bx">
        <Reveal className="mx-auto mb-10 max-w-xl text-center">
          <p className="t-eyebrow">{t("hd.eyebrow")}</p>
          <h2 className="t-heading mt-4">{t("hd.heading")}</h2>
          <p className="t-body mx-auto mt-4 max-w-md">
            {t("hd.body")}
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {sizes.map((p, i) => {
            const from = getFromPrice(p);
            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link href={`/product/${p.slug}`} className="group block">
                  <LazyImage
                    src={p.images[0]}
                    alt={p.name}
                    className="aspect-square w-full rounded-soft shadow-paper transition-shadow duration-500 group-hover:shadow-lifted"
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base text-cocoa">
                      {p.name.replace("Hand-Drawn Cake — ", "")}
                    </h3>
                    {from !== null && (
                      <span className="t-price whitespace-nowrap text-base">
                        {t("hd.from")} {formatPrice(from)}
                      </span>
                    )}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
