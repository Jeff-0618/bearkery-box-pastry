import Link from "next/link";
import { getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import LazyImage from "@/components/shared/LazyImage";
import LayeredBear from "@/components/shared/LayeredBear";
import Reveal from "@/components/shared/Reveal";

/**
 * The signature product. The bear stands slightly behind and below the
 * photograph, looking toward it — he is presenting the cake, which pulls the
 * eye to the product rather than to himself.
 */
export default function SignatureProduct() {
  const product = getProduct("pudding-burnt-cake");
  if (!product) return null;

  const priced = product.variants.filter((v) => v.price !== null);

  return (
    <section className="section bg-cream">
      <div className="container-bx grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          {/* Real product photography, given room and no heavy treatment. */}
          <LazyImage
            src={product.images[0]}
            alt={product.name}
            className="aspect-[4/5] w-full rounded-soft shadow-lifted"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-4 left-1/2 h-6 w-1/2 -translate-x-1/2 rounded-[50%] bg-cocoa/[0.08] blur-xl"
          />
          {/* Behind-and-below: he belongs to the same space as the photo. */}
          <LayeredBear className="absolute -bottom-8 -left-6 -z-10 w-32 sm:-left-14 sm:w-44" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="t-eyebrow">Our Signature</p>
          <h2 className="t-heading mt-4">{product.name}</h2>
          <p className="t-body mt-4 max-w-md">
            Our little favourite, baked fresh for your sweetest moments.
          </p>

          <ul className="mt-8 flex flex-col">
            {priced.map((v) => (
              <li
                key={v.id}
                className="flex items-baseline justify-between border-b border-line py-3 last:border-none"
              >
                <span className="text-sm text-cocoa">{v.label}</span>
                <span className="t-price">{formatPrice(v.price as number)}</span>
              </li>
            ))}
          </ul>

          <Link href={`/product/${product.slug}`} className="btn-primary mt-8">
            Explore Pudding Cakes
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
