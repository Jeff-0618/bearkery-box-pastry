import Link from "next/link";
import { getProduct } from "@/lib/data";
import LazyImage from "@/components/shared/LazyImage";
import Reveal from "@/components/shared/Reveal";

/**
 * Bento cakes. No bear here — restraint. Two mascot appearances already sit
 * above this section, and a third in a row would turn presence into wallpaper.
 */
export default function BentoSection() {
  const product = getProduct("bento-cake");
  if (!product) return null;

  return (
    <section className="section bg-cream">
      <div className="container-bx grid items-center gap-14 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <p className="t-eyebrow">Bento Cakes</p>
          <h2 className="t-heading mt-4">Little cakes, big moments</h2>
          <p className="t-body mt-4 max-w-md">{product.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <li
                key={v.id}
                className="rounded-pill border border-line bg-surface px-3.5 py-1.5 text-xs text-cocoa"
              >
                {v.label}
              </li>
            ))}
          </ul>

          <Link href={`/product/${product.slug}`} className="btn-soft mt-8">
            See Bento Cakes
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="order-1 md:order-2">
          <LazyImage
            src={product.images[0]}
            alt={product.name}
            className="aspect-[4/3] w-full rounded-soft shadow-paper"
          />
        </Reveal>
      </div>
    </section>
  );
}
