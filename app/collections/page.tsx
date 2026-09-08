import type { Metadata } from "next";
import { VISIBLE_COLLECTIONS } from "@/lib/data";
import StoryCollectionCard from "@/components/product/StoryCollectionCard";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse Bearkery Box Pastry collections — Everyday Favourites, Bento Cake, Tiny Blessings, Double Happiness, Birthday Cakes, Cupcakes, Cake Rolls and Gift Boxes.",
};

export default function CollectionsPage() {
  return (
    <div className="container-bx py-14">
      <SectionHeading
        t-eyebrow="All collections"
        title="Find the bake for your moment"
        description="Every collection is baked to order, hand-finished, and carries its own little story."
        align="center"
        className="mx-auto"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VISIBLE_COLLECTIONS.map((c, i) => (
          <StoryCollectionCard key={c.slug} collection={c} index={i} />
        ))}
      </div>
    </div>
  );
}
