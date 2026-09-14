"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Info } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, generateOrderId, formatReadableDate } from "@/lib/utils";
import { buildOrderWhatsappLink } from "@/lib/whatsapp-order";
import { submitOrder } from "@/lib/order-sink";
import { createPayment, IS_DEMO } from "@/lib/payment";
import { BUSINESS, ADDRESS_ONE_LINE } from "@/lib/business";
import { Order } from "@/lib/types";
import OrderSummary from "@/components/cart/OrderSummary";
import LayeredBear from "@/components/shared/LayeredBear";
import { Badge } from "@/components/ui/Badge";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "", city: "", postalCode: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const primaryFulfillment = items[0]?.fulfillment ?? "pickup";
  const deliveryFee = 0; // quoted individually — never invented here
  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const canSubmit = form.fullName.trim() !== "" && form.phone.trim() !== "";

  async function recordOrder(channel: "whatsapp" | "demo"): Promise<Order> {
    const order: Order = {
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
    await submitOrder(order);
    window.sessionStorage.setItem("bearkery-last-order", JSON.stringify(order));
    return order;
  }

  const handleWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || items.length === 0) return;
    setSubmitting(true);
    const order = await recordOrder("whatsapp");
    const link = buildOrderWhatsappLink({
      orderId: order.id, items, customer: form,
      fulfillment: primaryFulfillment, subtotal,
    });
    window.open(link, "_blank", "noopener,noreferrer");
    clearCart();
    router.push(`/order-confirmation?order=${order.id}`);
  };

  const handleDemo = async () => {
    if (!canSubmit || items.length === 0) return;
    setSubmitting(true);
    const order = await recordOrder("demo");
    // Runs the pluggable payment layer. In demo mode this simply simulates
    // the round-trip; when a live gateway is configured it will redirect.
    const payment = await createPayment(order);
    if (payment.redirectUrl) {
      window.location.href = payment.redirectUrl;
      return;
    }
    clearCart();
    router.push(`/order-confirmation?order=${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="container-bx py-24 text-center">
        <h1 className="text-2xl font-medium">Nothing to check out yet</h1>
        <p className="mt-2 text-taupe">Add something to your basket before checking out.</p>
        <Link href="/collections" className="btn-primary mt-6 inline-flex">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div className="container-bx py-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-16 w-16 shrink-0">
          <LayeredBear look={false} />
        </div>
        <h1 className="text-3xl font-medium">Checkout</h1>
      </div>

      {/* Honesty notice: no online payment exists yet. */}
      <div className="mb-8 flex gap-3 rounded-xl border border-teddy/30 bg-blush/40 p-4 text-sm text-cocoa">
        <Info size={17} className="mt-0.5 shrink-0 text-teddy" />
        <p>
          We don't take online payment yet. Send your order through WhatsApp and we'll
          confirm availability, the final total, and payment with you directly.
        </p>
      </div>

      <form onSubmit={handleWhatsapp} className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-8">
          <fieldset className="paper p-6">
            <legend className="mb-4 px-1 font-display text-lg font-medium">
              Your details
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" id="fullName" required>
                <input id="fullName" required className="input-bx"
                  value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} />
              </Field>
              <Field label="Phone number" id="phone" required>
                <input id="phone" required type="tel" className="input-bx"
                  value={form.phone} onChange={(e) => update({ phone: e.target.value })} />
              </Field>
              <Field label="Email (optional)" id="email" className="sm:col-span-2">
                <input id="email" type="email" className="input-bx"
                  value={form.email} onChange={(e) => update({ email: e.target.value })} />
              </Field>

              {primaryFulfillment === "delivery" ? (
                <>
                  <Field label="Where should our little bear deliver your blessing?" id="address" required className="sm:col-span-2">
                    <input id="address" required className="input-bx"
                      value={form.address} onChange={(e) => update({ address: e.target.value })} />
                  </Field>
                  <Field label="City" id="city" required>
                    <input id="city" required className="input-bx"
                      value={form.city} onChange={(e) => update({ city: e.target.value })} />
                  </Field>
                  <Field label="Postal code" id="postalCode" required>
                    <input id="postalCode" required className="input-bx"
                      value={form.postalCode} onChange={(e) => update({ postalCode: e.target.value })} />
                  </Field>
                </>
              ) : (
                <div className="rounded-xl border border-line bg-milk/40 p-4 text-sm text-taupe sm:col-span-2">
                  <p className="font-semibold text-cocoa">Pickup at</p>
                  <p>{ADDRESS_ONE_LINE}</p>
                  <p className="mt-1">Pickup hours: {BUSINESS.hours.general} · {BUSINESS.phoneDisplay}</p>
                </div>
              )}

              <Field label="Order notes (optional)" id="notes" className="sm:col-span-2">
                <textarea id="notes" rows={3} className="input-bx resize-none"
                  value={form.notes} onChange={(e) => update({ notes: e.target.value })} />
              </Field>
            </div>
          </fieldset>

          <fieldset className="paper p-6">
            <legend className="mb-4 px-1 font-display text-lg font-medium">Review items</legend>
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 border-b border-line pb-4 text-sm last:border-none last:pb-0">
                  <div>
                    <p className="font-medium">{item.name} <span className="text-taupe">× {item.quantity}</span></p>
                    <p className="text-xs text-taupe">{item.variant.label}</p>
                    <div className="mt-1"><Badge>{formatReadableDate(item.deliveryDate)}</Badge></div>
                  </div>
                  <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>

        <div className="flex flex-col gap-4">
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            itemCount={items.reduce((s, i) => s + i.quantity, 0)}
            ctaLabel={submitting ? "Opening WhatsApp…" : "Send Order via WhatsApp"}
            ctaIcon={<MessageCircle size={16} />}
            disabled={!canSubmit || submitting}
          />

          {!canSubmit && (
            <p className="text-center text-xs text-taupe">
              Add your name and phone number to continue.
            </p>
          )}

          {/* Clearly separated demo path — for testing the flow only. */}
          <div className="rounded-xl border border-dashed border-line p-4 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-taupe">
              Testing only
            </p>
            <p className="mb-3 text-xs leading-relaxed text-cocoa/55">
              Records a simulated order so you can try the reports. No order is sent
              to the bakery.
            </p>
            <button type="button" onClick={handleDemo} disabled={!canSubmit}
              className="btn-soft w-full text-xs disabled:opacity-40 disabled:pointer-events-none">
              Record a demo order
            </button>
          </div>
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
        {label} {required && <span className="text-teddy">*</span>}
      </label>
      {children}
    </div>
  );
}
