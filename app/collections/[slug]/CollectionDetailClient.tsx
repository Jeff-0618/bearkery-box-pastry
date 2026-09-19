"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Collection, Product } from "@/lib/types";
import { collectionText } from "@/lib/localize";
import { useLang } from "@/lib/language";
import ProductCard from "@/components/product/ProductCard";
import LazyImage from "@/components/shared/LazyImage";

export default function CollectionDetailClient({
  collection,
  products,
}: {
  collection: Collection;
  products: Product[];
}) {
  const { t, lang } = useLang();
  const text = collectionText(collection, lang);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="container-bx pt-6 text-xs text-taupe">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-teddy">{t("common.home")}</Link></li>
          <ChevronRight size={12} />
          <li>
            <Link href="/collections" className="hover:text-teddy">
              {t("nav.collections")}
            </Link>
          </li>
          <ChevronRight size={12} />
          <li aria-current="page" className="text-cocoa">{text.name}</li>
        </ol>
      </nav>

      <section className="container-bx grid gap-8 py-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        <LazyImage
          src={collection.image}
          alt={text.name}
          sizes="(max-width: 767px) 100vw, 45vw"
          className="aspect-[4/3] w-full rounded-soft shadow-paper"
          priority
        />
        <div className="min-w-0">
          <p className="tag mb-4">{text.tagline}</p>
          <h1 className="text-4xl font-medium sm:text-5xl">{text.name}</h1>
          <p className="mt-4 font-display text-lg italic text-teddy">{text.story}</p>
          <p className="mt-3 max-w-lg text-taupe">{text.description}</p>
        </div>
      </section>

      <section className="container-bx pb-20">
        <p className="mb-6 text-sm text-taupe">
          {t("collections.count").replace("{n}", String(products.length))}
        </p>
        {products.length === 0 ? (
          <div className="paper flex flex-col items-center gap-2 px-8 py-16 text-center">
            <p className="font-display text-lg font-medium">{t("collections.emptyTitle")}</p>
            <p className="text-sm text-taupe">{t("collections.emptyBody")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
