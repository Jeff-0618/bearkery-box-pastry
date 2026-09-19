"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { getFromPrice } from "@/lib/data";
import { productText } from "@/lib/localize";
import { useLang } from "@/lib/language";
import { Badge } from "@/components/ui/Badge";
import LazyImage from "@/components/shared/LazyImage";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t, lang } = useLang();
  const text = productText(product, lang);
  const fromPrice = getFromPrice(product);

  /*
    "From RM6.00" in English becomes "RM6.00 起" in Chinese — the word moves
    to the other side of the number. So the whole phrase is one dictionary
    string with a slot for the price, not a translated word stuck onto a
    formatted number. (The old hand-drawn section did the latter and read
    "起 RM28.00" in Chinese.)
  */
  const priceLabel =
    fromPrice === null
      ? t("product.priceOnRequest")
      : t("product.fromPrice").replace("{price}", formatPrice(fromPrice));

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group block"
        aria-label={`${text.name}, ${priceLabel}`}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-paper transition-shadow duration-300 group-hover:shadow-paper">
          <LazyImage
            src={product.images[0]}
            alt={text.name}
            /*
              This card sits in a 2 / 3 / 4 column grid. Without a matching
              `sizes` every card asked for a half-viewport image — roughly four
              times the pixels it can show on a desktop grid, downloaded on a
              phone connection.
            */
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isSignature && <Badge tone="cocoa">{t("product.signature")}</Badge>}
            {product.isPreorderOnly && <Badge>{t("product.preorderOnly")}</Badge>}
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-base font-medium leading-snug text-cocoa">
              {text.name}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-cocoa/55">
              {text.shortDescription}
            </p>
          </div>
          <span className="whitespace-nowrap pt-1 font-display text-base font-medium text-teddy">
            {priceLabel}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
