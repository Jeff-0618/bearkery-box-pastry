"use client";

import { ProductVariant } from "@/lib/types";
import { cx, formatPrice } from "@/lib/utils";
import { variantLabel } from "@/lib/localize";
import { useLang } from "@/lib/language";

export default function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { t, lang } = useLang();

  return (
    <fieldset>
      <legend className="label-bx">{t("product.chooseFlavour")}</legend>
      <div className="flex flex-wrap gap-2.5" role="radiogroup">
        {variants.map((v) => {
          const active = v.id === selectedId;
          return (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(v.id)}
              className={cx(
                "rounded-xl border px-4 py-2.5 text-left text-sm transition-all duration-200",
                active
                  ? "border-cocoa bg-cocoa text-milk shadow-paper"
                  : "border-line bg-surface text-cocoa hover:border-teddy"
              )}
            >
              <span className="block font-medium">{variantLabel(v, lang)}</span>
              <span className={cx("block text-xs", active ? "text-milk/70" : "text-taupe")}>
                {v.price === null ? t("product.priceOnRequest") : formatPrice(v.price)}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
