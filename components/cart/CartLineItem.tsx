"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types";
import { formatPrice, formatReadableDate } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import QuantitySelector from "@/components/product/QuantitySelector";
import LazyImage from "@/components/shared/LazyImage";
import { Badge } from "@/components/ui/Badge";

export default function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 border-b border-line py-6 first:pt-0 last:border-none"
    >
      <LazyImage src={item.image} alt={item.name} className="h-24 w-24 shrink-0 rounded-soft" />

      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-medium">{item.name}</h3>
            <p className="text-sm text-taupe">{item.variant.label}</p>
          </div>
          <span className="font-display text-base font-medium text-teddy">
            {formatPrice(item.unitPrice * item.quantity)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Badge tone="default">
            {item.fulfillment === "delivery" ? "Delivery" : "Pickup"} · {formatReadableDate(item.deliveryDate)}
          </Badge>
          {item.gift.recipientName && <Badge>For {item.gift.recipientName}</Badge>}
          {item.gift.isGift && <Badge tone="gold">Gift card added</Badge>}
        </div>

        {item.gift.cakeMessage && (
          <p className="text-xs italic text-taupe">“{item.gift.cakeMessage}”</p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => updateQuantity(item.id, q)}
          />
          <button
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-1.5 text-xs font-medium text-taupe transition hover:text-red-600"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}
