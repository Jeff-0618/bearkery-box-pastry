import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VISIBLE_COLLECTIONS, getCollection, getProductsByCollection } from "@/lib/data";
import CollectionDetailClient from "./CollectionDetailClient";

export function generateStaticParams() {
  return VISIBLE_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = getCollection(params.slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  const products = getProductsByCollection(params.slug);

  return <CollectionDetailClient collection={collection} products={products} />;
}
