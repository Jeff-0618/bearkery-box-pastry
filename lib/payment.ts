import { Order } from "./types";

/**
 * PAYMENT LAYER — deliberately pluggable.
 *
 * Right now this runs in "demo" mode: no money moves, and the UI says so
 * plainly. When the real merchant account is approved, you only change
 * PAYMENT_MODE and implement the provider call below — no page or component
 * needs to be rewritten.
 *
 * ── How to go live (Malaysia) ────────────────────────────────────────────
 * 1. Apply for a merchant account. Common local options that support FPX
 *    online banking: Billplz, SenangPay, iPay88. (Stripe works too but has
 *    less local FPX coverage.) Approval typically takes days to weeks, so
 *    start the application before you need it.
 * 2. You will receive an API key / collection ID.
 * 3. NEVER put that key in this file or anywhere under app/ or components/ —
 *    anything shipped to the browser is publicly readable. Put it in an
 *    environment variable on the host (e.g. BILLPLZ_SECRET_KEY) and call the
 *    provider from a server route (app/api/...), not from the client.
 * 4. Set PAYMENT_MODE to "live" and implement `createPayment` to POST to your
 *    server route, which then talks to the provider and returns a bill URL.
 */

export type PaymentMode = "demo" | "live";

export const PAYMENT_MODE: PaymentMode = "demo";

export interface PaymentResult {
  ok: boolean;
  /** Where to send the customer next (a hosted payment page when live). */
  redirectUrl?: string;
  reference: string;
  message: string;
}

export async function createPayment(order: Order): Promise<PaymentResult> {
  if (PAYMENT_MODE === "demo") {
    // Simulate the round-trip so the flow can be tested end to end.
    await new Promise((r) => setTimeout(r, 700));
    return {
      ok: true,
      reference: order.id,
      message:
        "Demo mode — no payment was taken and no money moved. This is a test order only.",
    };
  }

  // ---- LIVE (to implement when the merchant account is ready) ----
  //
  // const res = await fetch("/api/payment/create", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ orderId: order.id, amount: order.total, ... }),
  // });
  // const data = await res.json();
  // return { ok: res.ok, redirectUrl: data.paymentUrl, reference: data.billId, message: "" };

  throw new Error(
    "Live payment is not configured yet. See lib/payment.ts for the steps."
  );
}

export const IS_DEMO = PAYMENT_MODE === "demo";
