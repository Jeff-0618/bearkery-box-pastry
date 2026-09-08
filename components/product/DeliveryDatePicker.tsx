"use client";

import { CalendarDays } from "lucide-react";
import { addDays, toISODate, formatReadableDate } from "@/lib/utils";

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
  const today = new Date();
  const minDate = toISODate(addDays(today, preorderDays));
  const maxDate = toISODate(addDays(today, 90));

  return (
    <div>
      <label htmlFor="delivery-date" className="label-bx">
        {fulfillment === "delivery" ? "Delivery date" : "Pickup date"}
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
      <p className="mt-1.5 text-xs text-taupe">
        This bake needs at least {preorderDays} day{preorderDays === 1 ? "" : "s"} notice —
        earliest {fulfillment === "delivery" ? "delivery" : "pickup"} is{" "}
        {formatReadableDate(minDate)}.
      </p>
    </div>
  );
}
