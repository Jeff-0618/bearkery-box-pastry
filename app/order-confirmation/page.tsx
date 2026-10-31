"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Package, MessageCircle, AlertTriangle } from "lucide-react";
import { Order } from "@/lib/types";
import { formatPrice, formatReadableDate } from "@/lib/utils";
import { BUSINESS, ADDRESS_ONE_LINE, WHATSAPP_GENERAL } from "@/lib/business";
import { useLang } from "@/lib/language";
import { cartLineText } from "@/lib/localize";
import Bear from "@/components/shared/Bear";
import Stamp from "@/components/shared/Stamp";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("order");
  const [order, setOrder] = useState<Order | null>(null);
  const { t, lang } = useLang();
  const showDate = (iso: string) => formatReadableDate(iso, lang === "zh" ? "zh-CN" : "en-US");

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("bearkery-last-order");
      if (raw) {
        const parsed: Order = JSON.parse(raw);
        if (!orderId || parsed.id === orderId) setOrder(parsed);
      }
    } catch {
      // Unreadable or unavailable storage: fall through to "couldn't find".
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container-bx page-center">
        <h1 className="text-2xl font-medium">{t("oc.notFoundTitle")}</h1>
        <p className="mt-2 text-taupe">{t("oc.notFoundBody")}</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">{t("common.backHome")}</Link>
      </div>
    );
  }

  return (
    <div className="container-bx page">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mx-auto mb-4 w-36">
          <Bear priority breathe={false} />
        </div>
        {/* The order is "sealed" with the shop's own stamp. */}
        <div className="mx-auto -mt-4 mb-2 w-24">
          <Stamp animate className="w-24 text-lg" />
        </div>

        {order.isDemo ? (
          <>
            <h1 className="text-3xl font-medium sm:text-4xl">Demo order recorded</h1>
            <div className="mx-auto mt-4 flex max-w-md gap-3 rounded-xl border border-amber-300/60 bg-amber-50/60 p-4 text-left text-sm text-cocoa">
              <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
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
              {t("oc.thanks", { name: order.customer.fullName.split(" ")[0] || t("oc.friend") })}
            </h1>
            <p className="mt-3 text-taupe">{t("oc.opened")}</p>
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-soft mt-5 inline-flex gap-2"
            >
              <MessageCircle size={16} aria-hidden="true" />
              {t("oc.didntOpen")}
            </a>
          </>
        )}

        <p className="tag mt-6 inline-flex">{t("oc.ref", { id: order.id })}</p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
        <div className="paper p-6">
          <div className="mb-3 flex items-center gap-2">
            <Package size={16} className="text-teddy" aria-hidden="true" />
            <h2 className="font-display text-base font-medium">{t("oc.collection")}</h2>
          </div>
          <p className="text-sm text-taupe">
            {order.fulfillment === "delivery" ? t("fulfillment.delivery") : t("fulfillment.pickup")}
          </p>
          {order.items[0] && (
            <p className="mt-1 text-sm text-taupe">
              {t("oc.date", { date: showDate(order.items[0].deliveryDate) })}
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
          <h2 className="mb-3 font-display text-base font-medium">{t("oc.total")}</h2>
          <div className="flex justify-between text-sm text-taupe">
            <span>{t("cart.subtotal")}</span><span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-dashed border-line pt-2 text-sm font-semibold text-cocoa">
            <span>{t("cart.total")}</span><span>{formatPrice(order.total)}</span>
          </div>
          <p className="mt-2 text-xs text-taupe">{t("oc.finalNote")}</p>
        </div>
      </div>

      <div className="paper mx-auto mt-8 max-w-3xl p-6">
        <h2 className="mb-4 font-display text-base font-medium">{t("oc.items")}</h2>
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => {
            const line = cartLineText(item, lang);
            return (
              <li key={item.id} className="flex justify-between gap-3 text-sm">
                <span>{line.name} ({line.variant}) × {item.quantity}</span>
                <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/collections" className="btn-primary">{t("oc.continue")}</Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmationContent />
    </Suspense>
  );
}

function LoadingFallback() {
  const { t } = useLang();
  return <div className="container-bx page-center text-taupe">{t("common.loading")}</div>;
}
