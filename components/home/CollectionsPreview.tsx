"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VISIBLE_COLLECTIONS } from "@/lib/data";
import { collectionText } from "@/lib/localize";
import { useLang } from "@/lib/language";
import LazyImage from "@/components/shared/LazyImage";
import Reveal from "@/components/shared/Reveal";

/**
 * The three collections, as three doors.
 *
 * This replaces the three sections that used to sit here — the signature
 * cake with its price table, the sandwich menu with a price on every row,
 * and the hand-drawn sizes with "from RM…" under each one. Putting the full
 * price list on the front page asks a visitor to compare before they have
 * any reason to want the thing, and it made the homepage read as a menu
 * rather than as a shop.
 *
 * So: a photograph, a name, and the one line that says what the collection
 * is for. Price belongs on the page where someone can actually choose a
 * flavour and a date — one click away, not here.
 *
 * The card art is 4:3 because one of the three covers is the printed menu
 * sheet, which is 4:3; a taller frame would crop its edges off.
 */
export default function CollectionsPreview() {
  const { t, lang } = useLang();
  if (!VISIBLE_COLLECTIONS.length) return null;

  return (
    <section className="section bg-cream">
      <div className="container-bx">
        <Reveal className="mb-10 text-center">
          <p className="t-eyebrow">{t("nav.shopByCollection")}</p>
        </Reveal>

        <div className="grid gap-7 md:grid-cols-3">
          {VISIBLE_COLLECTIONS.map((collection, i) => {
            const text = collectionText(collection, lang);
            return (
              <Reveal key={collection.slug} delay={i * 0.08}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block"
                  aria-label={text.name}
                >
                  <LazyImage
                    src={collection.image}
                    alt={text.name}
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="aspect-[4/3] w-full rounded-soft shadow-paper transition-shadow duration-500 group-hover:shadow-lifted"
                  />
                  <h3 className="mt-5 font-display text-xl font-medium text-cocoa">
                    {text.name}
                  </h3>
                  <p className="mt-1.5 font-display text-sm italic text-teddy">
                    {text.story}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-cocoa transition-colors duration-300 group-hover:text-teddy">
                    {t("common.explore")}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
