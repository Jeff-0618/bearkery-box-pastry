"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, addDays, toISODate } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import LazyImage from "@/components/shared/LazyImage";
import VariantSelector from "@/components/product/VariantSelector";
import QuantitySelector from "@/components/product/QuantitySelector";
import FulfillmentToggle from "@/components/product/FulfillmentToggle";
import DeliveryDatePicker from "@/components/product/DeliveryDatePicker";
import GiftDetailsForm from "@/components/product/GiftDetailsForm";
import ProductCard from "@/components/product/ProductCard";
import LayeredBear from "@/components/shared/LayeredBear";
import { useFlyToCart } from "@/components/shared/FlyToCart";
import { Badge } from "@/components/ui/Badge";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("pickup");
  const [deliveryDate, setDeliveryDate] = useState(
    toISODate(addDays(new Date(), product.preorderDays))
  );
  const [gift, setGift] = useState({
    recipientName: "",
    cakeMessage: "",
    isGift: false,
    giftCardMessage: "",
    specialRequest: "",
  });
  const [added, setAdded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { fly } = useFlyToCart();

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product.variants, variantId]
  );
  const priceKnown = variant.price !== null;
  const unitPrice = variant.price ?? 0;

  const handleAddToCart = () => {
    if (!priceKnown) return;
    addItem({
      id: `${product.id}-${variant.id}-${Date.now()}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      variant,
      quantity,
      unitPrice,
      fulfillment,
      deliveryDate,
      gift,
    });
    const rect = galleryRef.current?.getBoundingClientRect();
    if (rect) fly(product.images[0], rect);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div>
      <nav aria-label="Breadcrumb" className="container-bx pt-6 text-xs text-taupe">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-teddy">Home</Link></li>
          <ChevronRight size={12} />
          <li>
            <Link href={`/collections/${product.collection}`} className="hover:text-teddy capitalize">
              {product.collection.replace(/-/g, " ")}
            </Link>
          </li>
          <ChevronRight size={12} />
          <li aria-current="page" className="text-cocoa">{product.name}</li>
        </ol>
      </nav>

      <section className="container-bx grid gap-10 py-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="relative" ref={galleryRef}>
          <LazyImage
            src={product.images[activeImage]}
            alt={product.name}
            className="aspect-square w-full rounded-soft shadow-lifted"
            priority
          />
          <div className="absolute -bottom-6 -right-6 h-24 w-24 drop-shadow-xl sm:h-28 sm:w-28">
            <LayeredBear reactKey={added ? "added" : "idle"} />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2.5">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition ${
                    activeImage === i ? "border-teddy" : "border-transparent opacity-70"
                  }`}
                >
                  <LazyImage src={img} alt="" className="h-full w-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details / configurator */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {product.isSignature && <Badge tone="cocoa">Signature</Badge>}
            {product.isPreorderOnly && <Badge>Preorder</Badge>}
          </div>
          <h1 className="text-3xl font-medium sm:text-4xl">{product.name}</h1>

          {product.pickupNote && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-taupe">
              <Clock size={14} className="text-teddy" />
              {product.pickupNote}
            </p>
          )}

          <p className="mt-4 font-display text-2xl font-semibold text-teddy">
            {priceKnown ? formatPrice(unitPrice) : "Price on request"}
          </p>
          <p className="mt-4 leading-relaxed text-taupe">{product.description}</p>

          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-4">
              <p className="label-bx">Ingredients</p>
              <p className="text-sm text-taupe">{product.ingredients.join(", ")}</p>
            </div>
          )}

          <div className="mt-7 flex flex-col gap-6">
            <VariantSelector
              variants={product.variants}
              selectedId={variantId}
              onSelect={setVariantId}
            />

            <QuantitySelector value={quantity} onChange={setQuantity} />

            <FulfillmentToggle value={fulfillment} onChange={setFulfillment} />

            <DeliveryDatePicker
              value={deliveryDate}
              onChange={setDeliveryDate}
              preorderDays={product.preorderDays}
              fulfillment={fulfillment}
            />

            <GiftDetailsForm value={gift} onChange={setGift} />

            {product.allergens.length > 0 && (
              <p className="flex items-start gap-2 text-xs text-taupe">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-teddy" />
                Contains: {product.allergens.join(", ")}. Baked in a kitchen that handles
                common allergens.
              </p>
            )}

            {priceKnown ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="btn-primary flex-1"
                >
                  {added ? "Wrapped ✓" : `Wrap This Gift — ${formatPrice(unitPrice * quantity)}`}
                </motion.button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    router.push("/cart");
                  }}
                  className="btn-soft flex-1"
                >
                  Send It Now
                </button>
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-teddy/30 bg-blush/30 p-4 text-sm text-taupe">
                This flavour is priced on request — please contact us for the current price
                before ordering.
              </p>
            )}

            <p className="flex items-center gap-2 text-xs text-taupe">
              <Sparkles size={14} className="text-teddy" />
              Freshly baked to order — no two boxes are ever quite the same.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-bx py-16">
          <h2 className="mb-6 text-2xl font-medium">You may also love</h2>
          <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
