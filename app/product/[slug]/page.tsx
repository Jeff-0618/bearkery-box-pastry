import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VISIBLE_PRODUCTS, getProduct, getRelatedProducts } from "@/lib/data";
import { BUSINESS } from "@/lib/business";
import { absoluteUrl } from "@/lib/site";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return VISIBLE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  // Product structured data (price range, preorder status) for search results.
  // Prices are the ones in lib/data.ts; "enquire only" variants are skipped.
  const prices = product.variants
    .map((v) => v.price)
    .filter((p): p is number => p !== null);
  // Absolute URLs are only included once the real domain is known.
  const imageUrls = product.images
    .map((src) => absoluteUrl(src))
    .filter((u): u is string => Boolean(u));
  const pageUrl = absoluteUrl(`/product/${product.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(imageUrls.length > 0 && { image: imageUrls }),
    brand: { "@type": "Brand", name: BUSINESS.name },
    ...(prices.length > 0 && {
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "MYR",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        offerCount: prices.length,
        availability: product.isPreorderOnly
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
        ...(pageUrl && { url: pageUrl }),
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so no string in the data can close the tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
