"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import CartLineItem from "@/components/cart/CartLineItem";
import OrderSummary from "@/components/cart/OrderSummary";
import Bear from "@/components/shared/Bear";

export default function CartPage() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-bx page-center flex flex-col items-center gap-4">
        <div className="w-36">
          <Bear priority />
        </div>
        <h1 className="text-2xl font-medium">Your gift basket is waiting to be filled</h1>
        <p className="max-w-sm text-taupe">
          Nothing in here yet. Have a look at what we&apos;re baking today.
        </p>
        <Link href="/collections" className="btn-primary mt-2">
          Shop Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="container-bx page">
      <h1 className="mb-8 text-3xl font-medium">Your Gift Basket</h1>
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="paper px-6">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
        <div>
          <OrderSummary
            subtotal={subtotal}
            itemCount={items.reduce((s, i) => s + i.quantity, 0)}
            ctaHref="/checkout"
            ctaLabel="Prepare My Gift Box"
          />
        </div>
      </div>
    </div>
  );
}
