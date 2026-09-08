import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { VISIBLE_COLLECTIONS, getCollection, getProductsByCollection } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import LazyImage from "@/components/shared/LazyImage";

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

  return (
    <div>
      <nav aria-label="Breadcrumb" className="container-bx pt-6 text-xs text-taupe">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-teddy">Home</Link></li>
          <ChevronRight size={12} />
          <li><Link href="/collections" className="hover:text-teddy">Collections</Link></li>
          <ChevronRight size={12} />
          <li aria-current="page" className="text-cocoa">{collection.name}</li>
        </ol>
      </nav>

      <section className="container-bx grid gap-8 py-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        <LazyImage
          src={collection.image}
          alt={collection.name}
          className="aspect-[4/3] w-full rounded-soft shadow-paper"
          priority
        />
        <div>
          <p className="tag mb-4">{collection.tagline}</p>
          <h1 className="text-4xl font-medium sm:text-5xl">{collection.name}</h1>
          <p className="mt-4 font-display text-lg italic text-teddy">{collection.story}</p>
          <p className="mt-3 max-w-lg text-taupe">{collection.description}</p>
        </div>
      </section>

      <section className="container-bx pb-20">
        <p className="mb-6 text-sm text-taupe">{products.length} bakes</p>
        {products.length === 0 ? (
          <EmptyState />
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

function EmptyState() {
  return (
    <div className="paper flex flex-col items-center gap-2 px-8 py-16 text-center">
      <p className="font-display text-lg font-medium">Fresh bakes coming soon</p>
      <p className="text-sm text-taupe">
        We're preparing new additions for this collection. Check back shortly.
      </p>
      <Link href="/collections" className="btn-soft mt-4">
        Browse other collections
      </Link>
    </div>
  );
}
