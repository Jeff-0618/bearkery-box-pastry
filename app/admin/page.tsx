"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Trash2, AlertTriangle, RefreshCw } from "lucide-react";
import { Order, OrderStatus } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  loadOrders, updateOrderStatus, deleteOrder, clearAllOrders,
  ordersToCSV, ordersToJSON, downloadFile,
} from "@/lib/order-store";
import { buildReport, filterByDateRange, reportToCSV } from "@/lib/reporting";

const STATUSES: OrderStatus[] = ["new", "confirmed", "completed", "cancelled"];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loaded, setLoaded] = useState(false);

  const refresh = () => setOrders(loadOrders());
  useEffect(() => { refresh(); setLoaded(true); }, []);

  const filtered = useMemo(() => filterByDateRange(orders, from, to), [orders, from, to]);
  const report = useMemo(() => buildReport(filtered), [filtered]);

  const stamp = new Date().toISOString().split("T")[0];

  return (
    <div className="container-bx page">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="t-eyebrow mb-2">Internal</p>
          <h1 className="text-3xl font-medium">Orders &amp; Reports</h1>
        </div>
        <button onClick={refresh} className="btn-soft gap-2 text-xs">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Storage reality check — this must not be mistaken for a real backend. */}
      <div className="mb-8 flex gap-3 rounded-xl border border-amber-300/60 bg-amber-50/60 p-4 text-sm text-cocoa">
        <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-600" />
        <div>
          <p className="font-semibold text-cocoa">This page reads data stored in this browser only.</p>
          <p className="mt-1 leading-relaxed">
            Orders customers place on their own phones are <strong>not</strong> recorded here,
            and clearing your browser data erases everything. Export regularly, and move to a
            real database before relying on this for bookkeeping. Figures below are
            bookkeeping aids, not tax filings.
          </p>
        </div>
      </div>

      {/* Filters + exports */}
      <div className="paper mb-8 flex flex-wrap items-end gap-4 p-5">
        <div>
          <label htmlFor="from" className="label-bx">From</label>
          <input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="input-bx" />
        </div>
        <div>
          <label htmlFor="to" className="label-bx">To</label>
          <input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input-bx" />
        </div>
        {(from || to) && (
          <button onClick={() => { setFrom(""); setTo(""); }} className="btn-soft text-xs">Clear</button>
        )}
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            onClick={() => downloadFile(`bearkery-orders-${stamp}.csv`, ordersToCSV(filtered), "text/csv")}
            className="btn-soft gap-2 text-xs">
            <Download size={14} /> Orders CSV
          </button>
          <button
            onClick={() => downloadFile(`bearkery-summary-${stamp}.csv`, reportToCSV(report), "text/csv")}
            className="btn-soft gap-2 text-xs">
            <Download size={14} /> Summary CSV
          </button>
          <button
            onClick={() => downloadFile(`bearkery-orders-${stamp}.json`, ordersToJSON(filtered), "application/json")}
            className="btn-soft gap-2 text-xs">
            <Download size={14} /> JSON
          </button>
        </div>
      </div>

      {/* Summary tiles */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Orders" value={String(report.orderCount)} hint="excludes cancelled" />
        <Stat label="Items sold" value={String(report.itemCount)} />
        <Stat label="Gross revenue" value={formatPrice(report.grossRevenue)} />
        <Stat label="Average order" value={formatPrice(report.averageOrderValue)} />
      </div>

      {/* By product */}
      <section className="paper mb-8 overflow-hidden">
        <h2 className="border-b border-line px-6 py-4 font-display text-lg font-medium">By product</h2>
        {report.byProduct.length === 0 ? (
          <p className="px-6 py-8 text-sm text-taupe">No data in this range yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-milk/40 text-left text-xs uppercase tracking-wide text-taupe">
                <tr>
                  <th className="px-6 py-3 font-semibold">Product</th>
                  <th className="px-6 py-3 font-semibold">Flavour</th>
                  <th className="px-6 py-3 text-right font-semibold">Qty</th>
                  <th className="px-6 py-3 text-right font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {report.byProduct.map((p) => (
                  <tr key={p.name + p.variant} className="border-t border-line">
                    <td className="px-6 py-3">{p.name}</td>
                    <td className="px-6 py-3 text-taupe">{p.variant}</td>
                    <td className="px-6 py-3 text-right">{p.quantity}</td>
                    <td className="px-6 py-3 text-right font-medium">{formatPrice(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* By day */}
      {report.byDay.length > 0 && (
        <section className="paper mb-8 overflow-hidden">
          <h2 className="border-b border-line px-6 py-4 font-display text-lg font-medium">By day</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-milk/40 text-left text-xs uppercase tracking-wide text-taupe">
                <tr>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 text-right font-semibold">Orders</th>
                  <th className="px-6 py-3 text-right font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {report.byDay.map((d) => (
                  <tr key={d.date} className="border-t border-line">
                    <td className="px-6 py-3">{d.date}</td>
                    <td className="px-6 py-3 text-right">{d.orders}</td>
                    <td className="px-6 py-3 text-right font-medium">{formatPrice(d.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Order list */}
      <section className="paper overflow-hidden">
        <h2 className="border-b border-line px-6 py-4 font-display text-lg font-medium">
          All orders ({filtered.length})
        </h2>
        {!loaded ? (
          <p className="px-6 py-8 text-sm text-taupe">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-taupe">No orders recorded yet.</p>
            <Link href="/collections" className="btn-soft mt-4 inline-flex text-xs">
              Place a test order
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-3 px-6 py-4 text-sm">
                <div className="min-w-[10rem] flex-1">
                  <p className="font-medium">
                    {o.id}
                    {o.isDemo && (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                        Demo
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-taupe">
                    {new Date(o.placedAt).toLocaleString()} · {o.customer.fullName || "—"} · {o.customer.phone || "—"}
                  </p>
                  <p className="text-xs text-taupe">
                    {o.items.map((i) => `${i.name} (${i.variant.label}) ×${i.quantity}`).join(", ")}
                  </p>
                </div>
                <span className="font-display font-medium text-teddy">{formatPrice(o.total)}</span>
                <select
                  value={o.status}
                  onChange={(e) => { updateOrderStatus(o.id, e.target.value as OrderStatus); refresh(); }}
                  aria-label={`Status for ${o.id}`}
                  className="rounded-lg border border-line bg-surface px-2 py-1 text-xs capitalize"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button
                  onClick={() => { if (confirm(`Delete order ${o.id}? This cannot be undone.`)) { deleteOrder(o.id); refresh(); } }}
                  aria-label={`Delete ${o.id}`}
                  className="text-taupe transition hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {orders.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={() => { if (confirm("Delete ALL recorded orders? Export first — this cannot be undone.")) { clearAllOrders(); refresh(); } }}
            className="text-xs font-medium text-taupe transition hover:text-red-600"
          >
            Clear all records
          </button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="paper p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-taupe">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-cocoa">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-taupe">{hint}</p>}
    </div>
  );
}
