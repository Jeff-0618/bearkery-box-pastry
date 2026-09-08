"use client";

import { formatPrice } from "@/lib/utils";

export default function OrderSummary({
  subtotal,
  deliveryFee = 0,
  itemCount,
  ctaHref,
  ctaLabel,
  ctaIcon,
  onCta,
  disabled,
}: {
  subtotal: number;
  deliveryFee?: number;
  itemCount: number;
  ctaHref?: string;
  ctaLabel: string;
  ctaIcon?: React.ReactNode;
  onCta?: () => void;
  disabled?: boolean;
}) {
  const total = subtotal + deliveryFee;

  return (
    <div className="paper sticky top-28 p-6">
      <h2 className="mb-5 font-display text-lg font-medium">Order Summary</h2>

      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-taupe">Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-taupe">Delivery / Pickup</dt>
          <dd className="font-medium">
            {deliveryFee === 0 ? "Confirmed with you" : formatPrice(deliveryFee)}
          </dd>
        </div>
      </dl>

      <div className="my-5 border-t border-dashed border-line" />

      <div className="flex justify-between text-base">
        <span className="font-semibold">Estimated Total</span>
        <span className="font-display text-xl font-semibold text-teddy">
          {formatPrice(total)}
        </span>
      </div>

      {ctaHref ? (
        <a
          href={ctaHref}
          className="btn-primary mt-6 w-full gap-2"
          aria-disabled={disabled}
          onClick={(e) => disabled && e.preventDefault()}
        >
          {ctaIcon}
          {ctaLabel}
        </a>
      ) : (
        <button
          type="submit"
          onClick={onCta}
          disabled={disabled}
          className="btn-primary mt-6 w-full gap-2"
        >
          {ctaIcon}
          {ctaLabel}
        </button>
      )}

      <p className="mt-4 text-center text-xs text-taupe">
        Every box is packed with care — and a little blessing tucked inside.
      </p>
    </div>
  );
}
