import type { Collection, Product, ProductVariant } from "./types";
import type { Lang } from "./language";

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
