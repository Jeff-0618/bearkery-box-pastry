"use client";

import { Truck, Store } from "lucide-react";
import { FulfillmentMethod } from "@/lib/types";
import { cx } from "@/lib/utils";

export default function FulfillmentToggle({
  value,
  onChange,
}: {
  value: FulfillmentMethod;
  onChange: (val: FulfillmentMethod) => void;
}) {
  const options: { id: FulfillmentMethod; label: string; hint: string; icon: React.ReactNode }[] = [
    { id: "delivery", label: "Delivery", hint: "To your door", icon: <Truck size={16} /> },
    { id: "pickup", label: "Pickup", hint: "From our kitchen", icon: <Store size={16} /> },
  ];

  return (
    <div>
      <p className="label-bx">Fulfillment</p>
      <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Fulfillment method">
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.id)}
              className={cx(
                "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition-all duration-200",
                active
                  ? "border-cocoa bg-cocoa text-milk shadow-paper"
                  : "border-line bg-surface text-cocoa hover:border-teddy"
              )}
            >
              <span className={active ? "text-teddy" : "text-teddy"}>{opt.icon}</span>
              <span>
                <span className="block text-sm font-semibold">{opt.label}</span>
                <span className={cx("block text-xs", active ? "text-milk/70" : "text-taupe")}>
                  {opt.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
