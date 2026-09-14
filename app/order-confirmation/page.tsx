"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Package, MessageCircle, AlertTriangle } from "lucide-react";
import { Order } from "@/lib/types";
import { formatPrice, formatReadableDate } from "@/lib/utils";
import { BUSINESS, ADDRESS_ONE_LINE, WHATSAPP_GENERAL } from "@/lib/business";
import LayeredBear from "@/components/shared/LayeredBear";
import Stamp from "@/components/shared/Stamp";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("order");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const raw = window.sessionStorage.getItem("bearkery-last-order");
    if (raw) {
      const parsed: Order = JSON.parse(raw);
      if (!orderId || parsed.id === orderId) setOrder(parsed);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container-bx py-24 text-center">
        <h1 className="text-2xl font-medium">We couldn't find that order</h1>
        <p className="mt-2 text-taupe">
          It may already be complete, or the link has expired.
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container-bx py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mx-auto mb-4 w-32">
          <LayeredBear mood="happy" priority look={false} />
        </div>
        {/* The order is "sealed" with the shop's own stamp. */}
        <div className="mx-auto -mt-4 mb-2 w-24">
          <Stamp animate className="w-24 text-lg" />
        </div>

        {order.isDemo ? (
          <>
            <h1 className="text-3xl font-medium sm:text-4xl">Demo order recorded</h1>
            <div className="mx-auto mt-4 flex max-w-md gap-3 rounded-xl border border-amber-300/60 bg-amber-50/60 p-4 text-left text-sm text-cocoa">
              <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-600" />
              <p>
                This was a test — <strong>no order was sent to the bakery</strong> and
                nothing has been paid. It's saved to the records page so you can try
                the reports.
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-medium sm:text-4xl">
              Thank you, {order.customer.fullName.split(" ")[0] || "friend"}.
            </h1>
            <p className="mt-3 text-taupe">
              Your order details have been opened in WhatsApp. Please send the message
              so we receive it — we'll reply to confirm availability and the final total.
            </p>
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-soft mt-5 inline-flex gap-2"
            >
              <MessageCircle size={16} />
              Didn't open? Message us
            </a>
          </>
        )}

        <p className="tag mt-6 inline-flex">Order ref {order.id}</p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
        <div className="paper p-6">
          <div className="mb-3 flex items-center gap-2">
            <Package size={16} className="text-teddy" />
            <h2 className="font-display text-base font-medium">Collection</h2>
          </div>
          <p className="text-sm capitalize text-taupe">{order.fulfillment}</p>
          {order.items[0] && (
            <p className="mt-1 text-sm text-taupe">
              Date: {formatReadableDate(order.items[0].deliveryDate)}
            </p>
          )}
          {order.fulfillment === "pickup" ? (
            <p className="mt-1 text-sm text-taupe">
              {ADDRESS_ONE_LINE} · {BUSINESS.phoneDisplay}
            </p>
          ) : (
            order.customer.address && (
              <p className="mt-1 text-sm text-taupe">
                {order.customer.address}, {order.customer.city} {order.customer.postalCode}
              </p>
            )
          )}
        </div>

        <div className="paper p-6">
          <h2 className="mb-3 font-display text-base font-medium">Order total</h2>
          <div className="flex justify-between text-sm text-taupe">
            <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-dashed border-line pt-2 text-sm font-semibold text-cocoa">
            <span>Total</span><span>{formatPrice(order.total)}</span>
          </div>
          <p className="mt-2 text-xs text-taupe">
            Final total is confirmed by us before payment.
          </p>
        </div>
      </div>

      <div className="paper mx-auto mt-8 max-w-3xl p-6">
        <h2 className="mb-4 font-display text-base font-medium">Items</h2>
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span>{item.name} ({item.variant.label}) × {item.quantity}</span>
              <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/collections" className="btn-primary">Continue Browsing</Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="container-bx py-24 text-center text-taupe">Loading…</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
