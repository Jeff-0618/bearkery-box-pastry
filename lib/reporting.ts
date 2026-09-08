import { Order } from "./types";

/**
 * Bookkeeping aids — NOT tax filings.
 * These summarise revenue and volume from order records. They do not compute
 * SST, income tax, or any statutory figure. The output is meant to hand to an
 * accountant to cut their prep time, not to replace professional advice.
 *
 * Cancelled orders are excluded from every revenue figure.
 */

export interface ProductSummary { name: string; variant: string; quantity: number; revenue: number; }
export interface DailySummary { date: string; orders: number; revenue: number; }

export interface ReportSummary {
  orderCount: number;
  itemCount: number;
  grossRevenue: number;
  averageOrderValue: number;
  byProduct: ProductSummary[];
  byDay: DailySummary[];
  byStatus: Record<string, number>;
  byFulfillment: Record<string, number>;
}

export function buildReport(orders: Order[]): ReportSummary {
  const live = orders.filter((o) => o.status !== "cancelled");
  const grossRevenue = live.reduce((s, o) => s + o.total, 0);
  const itemCount = live.reduce((s, o) => s + o.items.reduce((t, i) => t + i.quantity, 0), 0);

  const productMap = new Map<string, ProductSummary>();
  for (const order of live) {
    for (const item of order.items) {
      const key = `${item.name}||${item.variant.label}`;
      const revenue = item.unitPrice * item.quantity;
      const found = productMap.get(key);
      if (found) { found.quantity += item.quantity; found.revenue += revenue; }
      else productMap.set(key, { name: item.name, variant: item.variant.label, quantity: item.quantity, revenue });
    }
  }

  const dayMap = new Map<string, DailySummary>();
  for (const order of live) {
    const date = order.placedAt.split("T")[0];
    const found = dayMap.get(date);
    if (found) { found.orders += 1; found.revenue += order.total; }
    else dayMap.set(date, { date, orders: 1, revenue: order.total });
  }

  const byStatus: Record<string, number> = {};
  for (const o of orders) byStatus[o.status] = (byStatus[o.status] ?? 0) + 1;

  const byFulfillment: Record<string, number> = {};
  for (const o of live) byFulfillment[o.fulfillment] = (byFulfillment[o.fulfillment] ?? 0) + 1;

  return {
    orderCount: live.length,
    itemCount,
    grossRevenue,
    averageOrderValue: live.length ? grossRevenue / live.length : 0,
    byProduct: [...productMap.values()].sort((a, b) => b.revenue - a.revenue),
    byDay: [...dayMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
    byStatus,
    byFulfillment,
  };
}

export function filterByDateRange(orders: Order[], from: string, to: string) {
  return orders.filter((o) => {
    const d = o.placedAt.split("T")[0];
    return (!from || d >= from) && (!to || d <= to);
  });
}

export function reportToCSV(report: ReportSummary): string {
  const esc = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  const rows = ["product,variant,quantity_sold,revenue_myr"];
  for (const p of report.byProduct) {
    rows.push([esc(p.name), esc(p.variant), p.quantity, p.revenue.toFixed(2)].join(","));
  }
  return rows.join("\n");
}
