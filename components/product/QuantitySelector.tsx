"use client";

import { Minus, Plus } from "lucide-react";
import { useLang } from "@/lib/language";

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
}: {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}) {
  const { t } = useLang();

  return (
    <div>
      <p className="label-bx" id="qty-label">{t("product.quantity")}</p>
      <div
        className="inline-flex items-center rounded-full border border-line bg-surface"
        role="group"
        aria-labelledby="qty-label"
      >
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={t("product.decreaseQty")}
          className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa transition hover:bg-cream disabled:opacity-30"
        >
          <Minus size={15} />
        </button>
        <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={t("product.increaseQty")}
          className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa transition hover:bg-cream disabled:opacity-30"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}
