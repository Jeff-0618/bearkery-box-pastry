import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function LoadingCollection() {
  return (
    <div className="container-bx py-14">
      <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
