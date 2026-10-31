import { Order } from "./types";
import { saveOrder } from "./order-store";

/**
 * ORDER DESTINATION — where a completed order gets recorded.
 *
 * Every order is always kept in this browser (localStorage) first. If
 * NEXT_PUBLIC_ORDER_WEBHOOK is set, it is ALSO sent to that URL, which is how
 * orders placed on customers' own phones reach the owner.
 *
 * Google Sheet setup (free, good for the first months) — full steps in
 * google-apps-script/README.md:
 *   1. Create a Google Sheet, then Extensions → Apps Script and paste in
 *      google-apps-script/Code.gs from this project.
 *   2. Deploy → New deployment → Web app → Execute as "Me", Access "Anyone".
 *   3. Copy the /exec URL into NEXT_PUBLIC_ORDER_WEBHOOK (see .env.example)
 *      and redeploy the site.
 *
 * Later (Hostinger or any host with a database): point the same variable at
 * your own endpoint instead. Nothing else in the app has to change.
 */

const WEBHOOK_URL = (process.env.NEXT_PUBLIC_ORDER_WEBHOOK ?? "").trim();

export type OrderSink = "local" | "webhook";

export const ORDER_SINK: OrderSink = WEBHOOK_URL ? "webhook" : "local";

export interface SubmitResult {
  ok: boolean;
  message: string;
}

export async function submitOrder(order: Order): Promise<SubmitResult> {
  // Always keep a local copy so the shop owner has a record even if the
  // network call fails.
  try {
    saveOrder(order);
  } catch {
    // Storage full or blocked (private mode). The order still goes out over
    // WhatsApp, and the webhook below may still succeed.
  }

  if (ORDER_SINK === "local") {
    return { ok: true, message: "Order recorded locally." };
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      // Apps Script endpoints don't return CORS headers; no-cors lets the
      // write through even though we can't read the response. A text/plain
      // body keeps this a "simple" request, so there is no preflight.
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(order),
      // Lets the request finish even if the page navigates straight away.
      keepalive: true,
    });
    return { ok: true, message: "Order sent." };
  } catch {
    return {
      ok: false,
      message: "Saved locally, but couldn't reach the order sheet.",
    };
  }
}
