import { Order } from "./types";
import { saveOrder } from "./order-store";

/**
 * ORDER DESTINATION — where a completed order gets recorded.
 *
 * Today: saved in this browser (localStorage) so the whole flow and the
 * admin/reporting screens work with zero backend.
 *
 * Next (Google Sheet — free, good for the first months):
 *   1. Create a Google Sheet with a header row matching ORDER_CSV_COLUMNS
 *      in lib/order-store.ts.
 *   2. Extensions → Apps Script, paste a doPost(e) that appends
 *      JSON.parse(e.postData.contents) as a row, then Deploy → New deployment
 *      → Web app → Execute as "Me", Access "Anyone".
 *   3. Put the resulting /exec URL in NEXT_PUBLIC_ORDER_WEBHOOK and set
 *      ORDER_SINK to "webhook" below.
 *
 * Later (Hostinger or any host with a database): point the same webhook at
 * your own endpoint instead. Nothing else in the app has to change.
 */

export type OrderSink = "local" | "webhook";

export const ORDER_SINK: OrderSink = "local";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_ORDER_WEBHOOK ?? "";

export interface SubmitResult {
  ok: boolean;
  message: string;
}

export async function submitOrder(order: Order): Promise<SubmitResult> {
  // Always keep a local copy so the shop owner has a record even if the
  // network call fails.
  saveOrder(order);

  if (ORDER_SINK === "local" || !WEBHOOK_URL) {
    return { ok: true, message: "Order recorded locally." };
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      // Apps Script endpoints don't return CORS headers; no-cors lets the
      // write through even though we can't read the response.
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(order),
    });
    return { ok: true, message: "Order sent." };
  } catch {
    return {
      ok: false,
      message: "Saved locally, but couldn't reach the order sheet.",
    };
  }
}
