"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Info, AlertCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, formatReadableDate, generateOrderId } from "@/lib/utils";
import { buildOrderWhatsappLink } from "@/lib/whatsapp-order";
import { submitOrder } from "@/lib/order-sink";
import { createPayment } from "@/lib/payment";
import { BUSINESS, ADDRESS_ONE_LINE } from "@/lib/business";
import { useLang } from "@/lib/language";
import { cartLineText } from "@/lib/localize";
import { Order } from "@/lib/types";
import OrderSummary from "@/components/cart/OrderSummary";
import { Badge } from "@/components/ui/Badge";

/** Loose on purpose: local numbers come with spaces, dashes and +60 prefixes. */
function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^[+()\-\s\d]+$/.test(value.trim()) && digits.length >= 8 && digits.length <= 15;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const { t, lang } = useLang();
  const showDate = (iso: string) => formatReadableDate(iso, lang === "zh" ? "zh-CN" : "en-US");

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "", city: "", postalCode: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showDemoTool, setShowDemoTool] = useState(false);

  useEffect(() => {
    setShowDemoTool(new URLSearchParams(window.location.search).has("demo"));
  }, []);

  const primaryFulfillment = items[0]?.fulfillment ?? "pickup";
  const deliveryFee = 0; // quoted individually — never invented here
  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const phoneOk = isValidPhone(form.phone);
  const phoneTouched = form.phone.trim() !== "";
  const canSubmit = form.fullName.trim() !== "" && phoneOk;

  function buildOrder(channel: "whatsapp" | "demo"): Order {
    return {
      id: generateOrderId(),
      items,
      customer: form,
      fulfillment: primaryFulfillment,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      placedAt: new Date().toISOString(),
      channel,
      status: "new",
      isDemo: channel === "demo",
    };
  }

  const handleWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || items.length === 0 || submitting) return;
    setSubmitting(true);
    setFailed(false);

    try {
      const order = buildOrder("whatsapp");
      const link = buildOrderWhatsappLink({
        orderId: order.id, items, customer: form,
        fulfillment: primaryFulfillment, subtotal,
      });

      // Everything up to window.open must stay synchronous: browsers only
      // allow a new tab inside the click that asked for it, and awaiting a
      // network call first gets WhatsApp blocked as a pop-up. Recording the
      // order is best-effort — WhatsApp is the real order path — so it is
      // started here and never waited on.
      window.sessionStorage.setItem("bearkery-last-order", JSON.stringify(order));
      void submitOrder(order).catch(() => undefined);
      window.open(link, "_blank", "noopener,noreferrer");

      clearCart();
      router.push(`/order-confirmation?order=${order.id}`);
    } catch {
      setSubmitting(false);
      setFailed(true);
    }
  };

  const handleDemo = async () => {
    if (!canSubmit || items.length === 0 || submitting) return;
    setSubmitting(true);
    setFailed(false);
    try {
      const order = buildOrder("demo");
      await submitOrder(order);
      window.sessionStorage.setItem("bearkery-last-order", JSON.stringify(order));
      // Runs the pluggable payment layer. In demo mode this simply simulates
      // the round-trip; when a live gateway is configured it will redirect.
      const payment = await createPayment(order);
      if (payment.redirectUrl) {
        window.location.href = payment.redirectUrl;
        return;
      }
      clearCart();
      router.push(`/order-confirmation?order=${order.id}`);
    } catch {
      setSubmitting(false);
      setFailed(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-bx page-center">
        <h1 className="text-2xl font-medium">{t("co.emptyTitle")}</h1>
        <p className="mt-2 text-taupe">{t("co.emptyBody")}</p>
        <Link href="/collections" className="btn-primary mt-6 inline-flex">{t("co.browse")}</Link>
      </div>
    );
  }

  return (
    <div className="container-bx page">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-3xl font-medium">{t("co.title")}</h1>
      </div>

      {/* Honesty notice: no online payment exists yet. */}
      <div className="mb-8 flex gap-3 rounded-xl border border-teddy/30 bg-blush/40 p-4 text-sm text-cocoa">
        <Info size={17} className="mt-0.5 shrink-0 text-teddy" aria-hidden="true" />
        <p>{t("co.notice")}</p>
      </div>

      <form onSubmit={handleWhatsapp} className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-8">
          <fieldset className="paper p-6">
            <legend className="mb-4 px-1 font-display text-lg font-medium">
              {t("co.details")}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("co.fullName")} id="fullName" required>
                <input id="fullName" required autoComplete="name" className="input-bx"
                  value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} />
              </Field>
              <Field label={t("co.phone")} id="phone" required>
                <input id="phone" required type="tel" inputMode="tel" autoComplete="tel"
                  className="input-bx"
                  aria-invalid={phoneTouched && !phoneOk}
                  aria-describedby={phoneTouched && !phoneOk ? "phone-error" : undefined}
                  value={form.phone} onChange={(e) => update({ phone: e.target.value })} />
                {phoneTouched && !phoneOk && (
                  <p id="phone-error" className="mt-1 text-xs text-red-600">
                    {t("co.phoneInvalid")}
                  </p>
                )}
              </Field>
              <Field label={t("co.email")} id="email" className="sm:col-span-2">
                <input id="email" type="email" autoComplete="email" className="input-bx"
                  value={form.email} onChange={(e) => update({ email: e.target.value })} />
              </Field>

              {primaryFulfillment === "delivery" ? (
                <>
                  <Field label={t("co.address")} id="address" required className="sm:col-span-2">
                    <input id="address" required autoComplete="street-address" className="input-bx"
                      value={form.address} onChange={(e) => update({ address: e.target.value })} />
                  </Field>
                  <Field label={t("co.city")} id="city" required>
                    <input id="city" required autoComplete="address-level2" className="input-bx"
                      value={form.city} onChange={(e) => update({ city: e.target.value })} />
                  </Field>
                  <Field label={t("co.postal")} id="postalCode" required>
                    <input id="postalCode" required inputMode="numeric" autoComplete="postal-code"
                      className="input-bx"
                      value={form.postalCode} onChange={(e) => update({ postalCode: e.target.value })} />
                  </Field>
                </>
              ) : (
                <div className="rounded-xl border border-line bg-milk/40 p-4 text-sm text-taupe sm:col-span-2">
                  <p className="font-semibold text-cocoa">{t("co.pickupAt")}</p>
                  <p>{ADDRESS_ONE_LINE}</p>
                  <p className="mt-1">
                    {t("co.pickupHours", { hours: BUSINESS.hours.general, phone: BUSINESS.phoneDisplay })}
                  </p>
                </div>
              )}

              <Field label={t("co.notes")} id="notes" className="sm:col-span-2">
                <textarea id="notes" rows={3} className="input-bx resize-none"
                  value={form.notes} onChange={(e) => update({ notes: e.target.value })} />
              </Field>
            </div>
          </fieldset>

          <fieldset className="paper p-6">
            <legend className="mb-4 px-1 font-display text-lg font-medium">{t("co.review")}</legend>
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const line = cartLineText(item, lang);
                return (
                  <li key={item.id} className="flex items-center justify-between gap-3 border-b border-line pb-4 text-sm last:border-none last:pb-0">
                    <div>
                      <p className="font-medium">{line.name} <span className="text-taupe">× {item.quantity}</span></p>
                      <p className="text-xs text-taupe">{line.variant}</p>
                      <div className="mt-1"><Badge>{showDate(item.deliveryDate)}</Badge></div>
                    </div>
                    <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </div>

        <div className="flex flex-col gap-4">
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            itemCount={items.reduce((s, i) => s + i.quantity, 0)}
            ctaLabel={submitting ? t("co.sending") : t("co.send")}
            ctaIcon={<MessageCircle size={16} aria-hidden="true" />}
            disabled={!canSubmit || submitting}
          />

          {failed && (
            <p className="flex items-start gap-2 text-sm text-red-600" role="alert">
              <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              {t("co.error")}
            </p>
          )}

          {!canSubmit && (
            <p className="text-center text-xs text-taupe">{t("co.needDetails")}</p>
          )}

          {/* Test tool. Hidden unless ?demo=1 is in the URL — a customer must
              never be able to tap this and believe they've ordered. */}
          {showDemoTool && (
          <div className="rounded-xl border border-dashed border-line p-4 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-taupe">
              Testing only
            </p>
            <p className="mb-3 text-xs leading-relaxed text-cocoa/55">
              Records a simulated order so you can try the reports. No order is sent
              to the bakery.
            </p>
            <button type="button" onClick={handleDemo} disabled={!canSubmit || submitting}
              className="btn-soft w-full text-xs disabled:opacity-40 disabled:pointer-events-none">
              Record a demo order
            </button>
          </div>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, id, children, required, className = "" }: {
  label: string; id: string; children: React.ReactNode; required?: boolean; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label-bx">
        {label} {required && <span className="text-teddy" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}
