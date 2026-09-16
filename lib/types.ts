export type CollectionSlug =
  | "pudding-burnt-cake"
  | "everyday-favourites"
  | "hand-drawn-cakes"
  // Retained so the components stay wired up; hidden from the storefront
  // via `isHidden` below. No fictional data is ever shown for these.
  | "tiny-blessings"
  | "double-happiness"
  | "birthday-cakes"
  | "cupcakes"
  | "cake-rolls"
  | "gift-boxes";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
  story: string;
  image: string;
  pickupNote?: string;
  /** Hidden collections are never rendered or routed on the storefront. */
  isHidden?: boolean;
}

export interface ProductVariant {
  id: string;
  label: string; // e.g. "Vanilla", "6 inch"
  /** Absolute price in MYR. `null` means not yet priced — enquire only. */
  price: number | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: CollectionSlug;
  shortDescription: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  preorderDays: number; // minimum days ahead required
  ingredients?: string[];
  allergens: string[];
  isPreorderOnly: boolean;
  isSignature?: boolean;
  pickupNote?: string;
  /** Hidden products are never rendered or routed on the storefront. */
  isHidden?: boolean;
}

export type FulfillmentMethod = "delivery" | "pickup";

export interface GiftDetails {
  recipientName: string;
  cakeMessage: string;
  isGift: boolean;
  giftCardMessage: string;
  specialRequest: string;
}

export interface CartItem {
  id: string; // unique cart line id
  productId: string;
  slug: string;
  name: string;
  image: string;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
  fulfillment: FulfillmentMethod;
  deliveryDate: string; // ISO date
  gift: GiftDetails;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

/**
 * How an order reached us.
 *  - "whatsapp": customer was handed off to WhatsApp with a prefilled order.
 *  - "demo": simulated checkout for testing only. NEVER a real sale.
 */
export type OrderChannel = "whatsapp" | "demo";

export type OrderStatus = "new" | "confirmed" | "completed" | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerDetails;
  fulfillment: FulfillmentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  placedAt: string;
  channel: OrderChannel;
  status: OrderStatus;
  /** True for orders created through the demo checkout — not real sales. */
  isDemo: boolean;
}
