import { Collection, Product } from "./types";

/**
 * DATA ACCURACY POLICY
 * Everything visible below is real client-supplied data — real products,
 * real prices, real ingredients, real photography. Nothing is invented.
 *
 * Collections/products marked `isHidden: true` are earlier demo placeholders,
 * kept only so their components stay wired for future re-activation. They
 * carry no prices and are never rendered, routed, or listed.
 */

export const COLLECTIONS: Collection[] = [
  {
    slug: "pudding-burnt-cake",
    name: "Pudding Burnt Cake",
    tagline: "Our signature",
    description:
      "Our signature bake — a caramel-topped burnt layer over silky pudding and soft cake, finished with a pour of caramel.",
    story: "Our little favourite, baked fresh for your sweetest moments.",
    image: "/products/pudding-burnt-cake.jpg",
  },
  {
    slug: "everyday-favourites",
    name: "Everyday Favourites",
    tagline: "Fresh sandwiches, every morning",
    description:
      "Hand-packed sandwiches made fresh each morning — simple, honest, and ready before you head out the door.",
    story: "Fresh little favourites for your everyday mornings.",
    image: "/products/sandwich-scene.jpg",
    pickupNote: "Pickup 7:00 AM – 11:00 AM",
  },
  {
    slug: "bento-cake",
    name: "Bento Cakes",
    tagline: "Little cakes, big moments",
    description:
      "Personal-size 4 inch cakes, packed in a neat bento box — just enough for one quiet celebration.",
    story: "Little cakes, big moments.",
    image: "/products/pudding-burnt-cake.jpg",
  },

  // ---- Hidden: retained for future use, never shown ----
  { slug: "tiny-blessings", name: "Tiny Blessings", tagline: "", description: "", story: "", image: "", isHidden: true },
  { slug: "double-happiness", name: "Double Happiness", tagline: "", description: "", story: "", image: "", isHidden: true },
  { slug: "birthday-cakes", name: "Birthday Cakes", tagline: "", description: "", story: "", image: "", isHidden: true },
  { slug: "cupcakes", name: "Cupcakes", tagline: "", description: "", story: "", image: "", isHidden: true },
  { slug: "cake-rolls", name: "Cake Rolls", tagline: "", description: "", story: "", image: "", isHidden: true },
  { slug: "gift-boxes", name: "Gift Boxes", tagline: "", description: "", story: "", image: "", isHidden: true },
];

export const PRODUCTS: Product[] = [
  // ================= SIGNATURE: PUDDING BURNT CAKE =================
  {
    id: "pbc-single",
    slug: "pudding-burnt-cake",
    name: "Pudding Burnt Cake",
    collection: "pudding-burnt-cake",
    shortDescription: "Our signature — burnt caramel top, silky pudding, soft cake base.",
    description:
      "Our signature bake. A deep caramelised top gives way to silky pudding and a soft cake base, finished with a pour of caramel. Baked fresh to order.",
    images: ["/products/pudding-burnt-cake.jpg"],
    variants: [
      { id: "vanilla", label: "Vanilla", price: 7 },
      { id: "chocolate", label: "Chocolate", price: 7 },
      { id: "vanilla-chocolate", label: "Vanilla Chocolate", price: 7 },
      { id: "matcha", label: "Matcha", price: 8.5 },
      { id: "matcha-earl-grey", label: "Matcha Earl Grey", price: 8.5 },
      { id: "cream-vanilla", label: "Cream Vanilla Pudding Cake", price: null },
      { id: "cream-oreo-chocolate", label: "Cream Oreo Chocolate Pudding Cake", price: null },
    ],
    preorderDays: 2,
    allergens: ["Egg", "Dairy", "Gluten"],
    isPreorderOnly: true,
    isSignature: true,
  },
  {
    id: "pbc-6inch",
    slug: "pudding-burnt-cake-6-inch",
    name: "Pudding Burnt Cake — 6 Inch",
    collection: "pudding-burnt-cake",
    shortDescription: "Our signature bake, sized to share.",
    description:
      "The same signature burnt caramel top, silky pudding and soft cake base — baked at 6 inch, sized for sharing.",
    images: ["/products/pudding-burnt-cake.jpg"],
    variants: [
      { id: "vanilla-6", label: "Vanilla", price: 55 },
      { id: "chocolate-6", label: "Chocolate", price: 55 },
      { id: "vanilla-chocolate-6", label: "Vanilla Chocolate", price: 55 },
      { id: "matcha-6", label: "Matcha", price: 58 },
      { id: "matcha-earl-grey-6", label: "Matcha Earl Grey", price: 58 },
    ],
    preorderDays: 3,
    allergens: ["Egg", "Dairy", "Gluten"],
    isPreorderOnly: true,
  },

  // ================= EVERYDAY FAVOURITES =================
  {
    id: "sw-signature",
    slug: "signature-sandwich",
    name: "Signature Sandwich",
    collection: "everyday-favourites",
    shortDescription: "Our fullest sandwich — ham, burger meat, egg mayo and more.",
    description:
      "Our fullest sandwich, hand-packed fresh every morning. Ready for pickup between 7:00 AM and 11:00 AM, while supplies last.",
    images: ["/products/signature-sandwich.jpg"],
    variants: [{ id: "reg", label: "Regular", price: 6 }],
    preorderDays: 1,
    ingredients: ["Ham", "Burger Meat", "Egg Mayo", "Salad", "Tomato", "Mayonnaise"],
    allergens: ["Egg", "Gluten"],
    isPreorderOnly: true,
    pickupNote: "Pickup 7:00 AM – 11:00 AM",
  },
  {
    id: "sw-sausage",
    slug: "sausage-sandwich",
    name: "Sausage Sandwich",
    collection: "everyday-favourites",
    shortDescription: "Sausage, egg mayo, chicken floss and crispy youtiao crisps.",
    description:
      "A hearty sandwich with sausage, chicken floss and crispy youtiao crisps, hand-packed fresh every morning. Ready for pickup between 7:00 AM and 11:00 AM, while supplies last.",
    images: ["/products/sausage-sandwich.jpg"],
    variants: [{ id: "reg", label: "Regular", price: 6 }],
    preorderDays: 1,
    ingredients: ["Sausage", "Egg Mayo", "Tomato", "Salad", "Chicken Floss", "Crispy Youtiao Crisps"],
    allergens: ["Egg", "Gluten"],
    isPreorderOnly: true,
    pickupNote: "Pickup 7:00 AM – 11:00 AM",
  },
  {
    id: "sw-egg-ham",
    slug: "egg-ham-sandwich",
    name: "Egg & Ham Sandwich",
    collection: "everyday-favourites",
    shortDescription: "Simple and classic — ham with egg mayo.",
    description:
      "A simple classic: ham layered with egg mayo, hand-packed fresh every morning. Ready for pickup between 7:00 AM and 11:00 AM, while supplies last.",
    images: ["/products/egg-ham-sandwich.jpg"],
    variants: [{ id: "reg", label: "Regular", price: 5 }],
    preorderDays: 1,
    ingredients: ["Ham", "Egg Mayo"],
    allergens: ["Egg", "Gluten"],
    isPreorderOnly: true,
    pickupNote: "Pickup 7:00 AM – 11:00 AM",
  },
  {
    id: "sw-vege",
    slug: "vege-sandwich",
    name: "Vege Sandwich",
    collection: "everyday-favourites",
    shortDescription: "Salad, tomato and egg mayo.",
    description:
      "A lighter option with salad, tomato and egg mayo, hand-packed fresh every morning. Ready for pickup between 7:00 AM and 11:00 AM, while supplies last.",
    images: ["/products/vege-sandwich.jpg"],
    variants: [{ id: "reg", label: "Regular", price: 4.5 }],
    preorderDays: 1,
    ingredients: ["Salad", "Tomato", "Egg Mayo"],
    allergens: ["Egg", "Gluten"],
    isPreorderOnly: true,
    pickupNote: "Pickup 7:00 AM – 11:00 AM",
  },

  // ================= BENTO CAKES =================
  {
    id: "bento-4inch",
    slug: "bento-cake",
    name: "Bento Cake — 4 Inch",
    collection: "bento-cake",
    shortDescription: "A personal-size cake, packed in a neat bento box.",
    description:
      "A personal-size 4 inch cake packed in a neat bento box — just enough for one quiet celebration. Choose your flavour below.",
    images: ["/products/pudding-burnt-cake.jpg"],
    variants: [
      { id: "vanilla-pudding", label: "Vanilla Pudding", price: null },
      { id: "chocolate-pudding", label: "Chocolate Pudding", price: null },
      { id: "matcha-pudding", label: "Matcha Pudding", price: null },
      { id: "chocolate-oreo", label: "Chocolate Oreo", price: null },
      { id: "vanilla-pudding-strawberry", label: "Vanilla Pudding Strawberry", price: null },
    ],
    preorderDays: 2,
    allergens: ["Egg", "Dairy", "Gluten"],
    isPreorderOnly: true,
  },
];

// ---------- Storefront-safe accessors (hidden items never leak) ----------

export const VISIBLE_COLLECTIONS = COLLECTIONS.filter((c) => !c.isHidden);
export const VISIBLE_PRODUCTS = PRODUCTS.filter((p) => !p.isHidden);

export function getCollection(slug: string) {
  return VISIBLE_COLLECTIONS.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return VISIBLE_PRODUCTS.filter((p) => p.collection === slug);
}

export function getProduct(slug: string) {
  return VISIBLE_PRODUCTS.find((p) => p.slug === slug);
}

export function getSignatureProduct() {
  return VISIBLE_PRODUCTS.find((p) => p.isSignature);
}

export function getRelatedProducts(product: Product, count = 4) {
  return VISIBLE_PRODUCTS.filter(
    (p) => p.collection === product.collection && p.id !== product.id
  ).slice(0, count);
}

/** Lowest listed price across a product's variants, ignoring "enquire" ones. */
export function getFromPrice(product: Product): number | null {
  const priced = product.variants
    .map((v) => v.price)
    .filter((p): p is number => p !== null);
  return priced.length ? Math.min(...priced) : null;
}
