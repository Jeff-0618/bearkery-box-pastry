"use client";

import { CalendarDays } from "lucide-react";
import { addDays, toISODate, formatReadableDate } from "@/lib/utils";
import { useLang } from "@/lib/language";

/**
 * Formats the earliest available date in the reader's own convention.
 *
 * "Tue, Sep 22, 2026" is not a date to a Chinese reader — the order is wrong
 * and the month abbreviation means nothing. `toLocaleDateString` already
 * knows both conventions, so the only work here is handing it the right one.
 *
 * The date is split and rebuilt rather than passed to `new Date(iso)`,
 * because an ISO date string is parsed as UTC midnight: in Malaysia that
 * lands on the previous evening and the reader is told the wrong day.
 */
function readableDate(iso: string, zh: boolean) {
  if (!zh) return formatReadableDate(iso);
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

export default function DeliveryDatePicker({
  value,
  onChange,
  preorderDays,
  fulfillment,
}: {
  value: string;
  onChange: (val: string) => void;
  preorderDays: number;
  fulfillment: "delivery" | "pickup";
}) {
  const { t, lang } = useLang();
  const today = new Date();
  const minDate = toISODate(addDays(today, preorderDays));
  const maxDate = toISODate(addDays(today, 90));
  const isDelivery = fulfillment === "delivery";

  // "3 days" / "1 day" / "3 天" — English changes the word, Chinese doesn't,
  // so the unit is a key rather than an "s" appended in the component.
  const notice = `${preorderDays} ${
    preorderDays === 1 ? t("fulfillment.dayUnit") : t("fulfillment.daysUnit")
  }`;

  const note = t(isDelivery ? "fulfillment.noticeDelivery" : "fulfillment.noticePickup")
    .replace("{notice}", notice)
    .replace("{date}", readableDate(minDate, lang === "zh"));

  return (
    <div>
      <label htmlFor="delivery-date" className="label-bx">
        {t(isDelivery ? "fulfillment.deliveryDate" : "fulfillment.pickupDate")}
      </label>
      <div className="relative">
        <CalendarDays
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teddy"
        />
        <input
          id="delivery-date"
          type="date"
          required
          min={minDate}
          max={maxDate}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-bx pl-11"
        />
      </div>
      <p className="mt-1.5 text-xs text-taupe">{note}</p>
    </div>
  );
}
