import Link from "next/link";
import { getProductsByCollection, getCollection, getFromPrice } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Bear from "@/components/shared/Bear";
import Reveal from "@/components/shared/Reveal";

/**
 * Morning sandwiches. The bear is at the left edge and partially cropped by
 * the section — he's *in* the room preparing breakfast, not posed next to a
 * list. The menu sits on hairline rows, not in heavy cards, so prices read
 * cleanly.
 */
export default function EverydayFavouritesSection() {
  const collection = getCollection("everyday-favourites");
  const products = getProductsByCollection("everyday-favourites");
  if (!collection) return null;

  return (
    <section className="section relative overflow-hidden bg-milk">
      <div className="container-bx grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal className="relative">
          <p className="t-eyebrow">Everyday Favourites</p>
          <h2 className="t-heading mt-4 max-w-[14ch]">
            Something for every morning
          </h2>
          <p className="t-body mt-4 max-w-sm">
            Fresh little favourites for your everyday mornings, hand-packed
            before the day begins.
          </p>
          {collection.pickupNote && (
            <p className="mt-5 inline-flex rounded-pill bg-peach px-4 py-2 text-xs font-semibold text-cocoa">
              {collection.pickupNote}
            </p>
          )}

          {/* Cropped at the edge: the room continues past the frame. */}
          <Bear
            slot="holding-sandwich"
            className="pointer-events-none absolute -left-24 -bottom-28 hidden h-48 w-48 opacity-95 lg:block"
          />
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
