"use client";

import Link from "next/link";
import { getProductsByCollection, getCollection, getFromPrice } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";
import { useLang } from "@/lib/language";

/**
 * Morning sandwiches. The bear is at the left edge and partially cropped by
 * the section — he's *in* the room preparing breakfast, not posed next to a
 * list. The menu sits on hairline rows, not in heavy cards, so prices read
 * cleanly.
 */
export default function EverydayFavouritesSection() {
  const { t } = useLang();
  const collection = getCollection("everyday-favourites");
  const products = getProductsByCollection("everyday-favourites");
  if (!collection) return null;

  return (
    <section className="section relative overflow-hidden bg-milk">
      <div className="container-bx grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal className="relative">
          <p className="t-eyebrow">{t("ef.eyebrow")}</p>
          <h2 className="t-heading mt-4 max-w-[14ch]">
            {t("ef.heading")}
          </h2>
          <p className="t-body mt-4 max-w-sm">
            {t("ef.body")}
          </p>
          {collection.pickupNote && (
            <p className="mt-5 inline-flex rounded-pill bg-peach px-4 py-2 text-xs font-semibold text-cocoa">
              {collection.pickupNote}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="paper divide-y divide-line overflow-hidden">
            {products.map((p) => {
              const price = getFromPrice(p);
              return (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-300 hover:bg-peach/40 sm:px-6 sm:py-5"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-base text-cocoa">
                        {p.name}
                      </span>
                      <span className="t-caption line-clamp-1">
                        {p.shortDescription}
                      </span>
                    </span>
                    {price !== null && (
                      <span className="t-price shrink-0">{formatPrice(price)}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
