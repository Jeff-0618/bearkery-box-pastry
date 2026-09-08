"use client";

import { Order, OrderStatus } from "./types";

/**
 * LOCAL ORDER STORE — PRE-LAUNCH STAGE
 *
 * Orders are kept in this browser's localStorage. That is deliberate for now:
 * it exercises the whole order → records → reports pipeline with zero backend.
 *
 * LIMITATIONS you must know before going live:
 *  - Data lives in ONE browser. An order placed on a customer's phone is NOT
 *    recorded here; this only stores orders made in this browser.
 *  - Clearing site data wipes it. There is no backup.
 *
 * The record shape is intentionally flat and stable so it can be lifted into a
 * real database or a Python pipeline later without reshaping anything.
 */

const STORAGE_KEY = "bearkery-orders";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  if (typeof window === "undefined") return;
  const orders = loadOrders();
  orders.unshift(order);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  if (typeof window === "undefined") return;
  const orders = loadOrders().map((o) => (o.id === id ? { ...o, status } : o));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function deleteOrder(id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loadOrders().filter((o) => o.id !== id)));
}

export function clearAllOrders() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

// --------- Export formats: designed to be read directly by pandas ---------

export const ORDER_CSV_COLUMNS = [
  "order_id", "placed_at", "status", "channel", "is_demo",
  "customer_name", "customer_phone", "customer_email",
  "fulfillment", "pickup_or_delivery_date",
  "product_name", "variant", "quantity",
  "unit_price_myr", "line_total_myr",
  "order_subtotal_myr", "order_delivery_fee_myr", "order_total_myr",
] as const;

function csvEscape(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/**
 * One row per order LINE ITEM (not per order) — the shape that makes
 * product-level analysis straightforward. Order-level totals repeat across
 * that order's rows, so de-duplicate on `order_id` before summing them.
 */
export function ordersToCSV(orders: Order[]): string {
  const rows: string[] = [ORDER_CSV_COLUMNS.join(",")];
  for (const order of orders) {
    for (const item of order.items) {
      rows.push([
        order.id, order.placedAt, order.status, order.channel, order.isDemo,
        order.customer.fullName, order.customer.phone, order.customer.email,
        order.fulfillment, item.deliveryDate,
        item.name, item.variant.label, item.quantity,
        item.unitPrice.toFixed(2), (item.unitPrice * item.quantity).toFixed(2),
        order.subtotal.toFixed(2), order.deliveryFee.toFixed(2), order.total.toFixed(2),
      ].map(csvEscape).join(","));
    }
  }
  return rows.join("\n");
}

export function ordersToJSON(orders: Order[]): string {
  return JSON.stringify(orders, null, 2);
}

export function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
