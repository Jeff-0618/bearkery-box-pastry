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

/**
 * BILINGUAL CONTENT
 *
 * Interface copy (buttons, headings, chrome) lives in the dictionary in
 * `lib/language.tsx`. Content that belongs to a *product* — its name, its
 * description, its ingredient list — lives here instead, beside the English
 * it translates.
 *
 * The split is deliberate. A dictionary key is a label for a thing the site
 * says; a product name is part of the product's own record, and keeping the
 * two languages adjacent is what stops a price change in one from silently
 * leaving the other describing the old recipe.
 *
 * Every `...Zh` field is optional, so a new product can ship English-first
 * and fall back cleanly instead of rendering a blank or a raw key.
 */
export interface Collection {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
  story: string;
  image: string;
  pickupNote?: string;

  nameZh?: string;
  taglineZh?: string;
  descriptionZh?: string;
  storyZh?: string;
  pickupNoteZh?: string;

  /** Hidden collections are never rendered or routed on the storefront. */
  isHidden?: boolean;
}

export interface ProductVariant {
  id: string;
  label: string; // e.g. "Vanilla", "6 inch"
  labelZh?: string;
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

  nameZh?: string;
  shortDescriptionZh?: string;
  descriptionZh?: string;
  ingredientsZh?: string[];
  allergensZh?: string[];
  pickupNoteZh?: string;

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
