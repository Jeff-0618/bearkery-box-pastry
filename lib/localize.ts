import type { CartItem, Collection, Product, ProductVariant } from "./types";
import type { Lang } from "./language";
import { getProduct } from "./data";

/**
 * Reads the right language out of a product or collection record.
 *
 * One rule, applied in one place: use the Chinese field when Chinese is
 * selected *and* that field has been written; otherwise fall back to English.
 * Falling back to real English beats showing a blank, and it means a product
 * added in a hurry still renders correctly in both languages.
 *
 * Components call these instead of reading `.name` directly, so no component
 * has to know the fallback rule and none of them can get it subtly wrong.
 */
function pick(zhValue: string | undefined, enValue: string, zh: boolean): string {
  return zh && zhValue ? zhValue : enValue;
}

function pickOptional(
  zhValue: string | undefined,
  enValue: string | undefined,
  zh: boolean
): string | undefined {
  return zh && zhValue ? zhValue : enValue;
}

function pickList(
  zhValue: string[] | undefined,
  enValue: string[] | undefined,
  zh: boolean
): string[] {
  if (zh && zhValue && zhValue.length) return zhValue;
  return enValue ?? [];
}

export function collectionText(collection: Collection, lang: Lang) {
  const zh = lang === "zh";
  return {
    name: pick(collection.nameZh, collection.name, zh),
    tagline: pick(collection.taglineZh, collection.tagline, zh),
    description: pick(collection.descriptionZh, collection.description, zh),
    story: pick(collection.storyZh, collection.story, zh),
    pickupNote: pickOptional(collection.pickupNoteZh, collection.pickupNote, zh),
  };
}

export function productText(product: Product, lang: Lang) {
  const zh = lang === "zh";
  return {
    name: pick(product.nameZh, product.name, zh),
    shortDescription: pick(product.shortDescriptionZh, product.shortDescription, zh),
    description: pick(product.descriptionZh, product.description, zh),
    ingredients: pickList(product.ingredientsZh, product.ingredients, zh),
    allergens: pickList(product.allergensZh, product.allergens, zh),
    pickupNote: pickOptional(product.pickupNoteZh, product.pickupNote, zh),
  };
}

export function variantLabel(variant: ProductVariant, lang: Lang): string {
  return pick(variant.labelZh, variant.label, lang === "zh");
}

/**
 * Name and flavour for a line that is already in the basket or an order.
 *
 * A cart line stores the English name and variant — that is what goes into the
 * WhatsApp message and the order record, so the bakery reads the same words
 * whichever language the customer browsed in. On screen it is looked up again
 * from the live catalogue by slug / variant id, so a line added before a
 * translation existed still shows in Chinese. If the product has since been
 * removed from the catalogue it falls back to what was stored.
 */
export function cartLineText(item: CartItem, lang: Lang) {
  const product = getProduct(item.slug);
  const variant = product?.variants.find((v) => v.id === item.variant.id) ?? item.variant;
  return {
    name: product ? productText(product, lang).name : item.name,
    variant: variantLabel(variant, lang),
  };
}
