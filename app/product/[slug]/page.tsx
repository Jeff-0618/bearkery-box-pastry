import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VISIBLE_PRODUCTS, getProduct, getRelatedProducts } from "@/lib/data";
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

  return <ProductDetailClient product={product} related={related} />;
}
