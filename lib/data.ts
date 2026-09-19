import { Collection, Product } from "./types";

/**
 * DATA ACCURACY POLICY
 * Everything visible below is real client-supplied data — real products,
 * real prices, real ingredients, real photography. Nothing is invented.
 *
 * The Chinese fields are translations of that same real data, written to
 * match the client's own menu wording. They are translations, never new
 * claims: no ingredient, size or price appears in Chinese that is not
 * already true in English.
 *
 * Collections/products marked `isHidden: true` are earlier demo placeholders,
 * kept only so their components stay wired for future re-activation. They
 * carry no prices and are never rendered, routed, or listed.
 *
 * PHOTO ORDER
 * `images[0]` does double duty: it is the card cover in every grid AND the
 * first frame of the product gallery. For the sandwiches that first slot is
 * the menu card — it carries the name, the price and the ingredient line, so
 * a visitor who only ever sees the thumbnail has already been told what the
 * thing is. The plated photograph follows immediately after.
 */

export const COLLECTIONS: Collection[] = [
  {
    slug: "pudding-burnt-cake",
    name: "Pudding Burnt Cake",
    tagline: "Our signature",
    description:
      "Our signature bake — a caramel-topped burnt layer over silky pudding and soft cake, finished with a pour of caramel.",
    story: "Our little favourite, baked fresh for your sweetest moments.",
    image: "/products/pbc-hero.jpg",
    nameZh: "布丁烧蛋糕",
    taglineZh: "招牌产品",
    descriptionZh:
      "我们的招牌 — 表层焦糖烤得微焦微脆，底下是丝滑布丁与松软蛋糕，最后淋上焦糖。",
    storyZh: "我们的小小心头好，为你最甜的时刻新鲜烘焙。",
  },
  {
    slug: "everyday-favourites",
    name: "Everyday Favourites",
    tagline: "Fresh sandwiches, every morning",
    description:
      "Hand-packed sandwiches made fresh each morning — simple, honest, and ready before you head out the door.",
    story: "Fresh little favourites for your everyday mornings.",
    image: "/products/menu-sandwiches-all.jpg",
    pickupNote: "Pickup 7:00 AM – 11:00 AM",
    nameZh: "每日心头好",
    taglineZh: "每天早晨，新鲜现做",
    descriptionZh:
      "每天开店前手工现做现包的三文治 — 简单、实在，出门前带着就走。",
    storyZh: "为你每一个平常早晨准备的小小心头好。",
    pickupNoteZh: "取货时间 上午 7:00 – 11:00",
  },
  {
    slug: "hand-drawn-cakes",
    name: "Hand-Drawn Cakes",
    tagline: "Drawn by hand, just for you",
    description:
      "Soft cream cakes with your own picture piped on top by hand — a family portrait, a private joke, a name and a number.",
    story: "A little cake for your special moments.",
    image: "/products/handdrawn-birthday.jpg",
    nameZh: "手绘蛋糕",
    taglineZh: "一笔一笔，为你而画",
    descriptionZh:
      "柔软的鲜奶油蛋糕，上面是我们手工一笔一笔画上去的图 — 一家人的合照、只有你们懂的梗、一个名字加一个数字。",
    storyZh: "为你的特别时刻，画一个小蛋糕。",
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
    shortDescription: "Our signature — burnt caramel top over silky pudding and soft cake.",
    description:
      "Our signature bake. A deep caramelised top gives way to silky pudding and a soft cake base. Baked fresh to order.",
    nameZh: "布丁烧蛋糕",
    shortDescriptionZh: "我们的招牌 — 焦糖脆口，内层布丁丝滑、蛋糕松软。",
    descriptionZh:
      "我们的招牌。深焦糖化的表层下，是丝滑的布丁与柔软的蛋糕底。接单现烤。",
    allergensZh: ["蛋", "奶制品", "麸质"],
    images: [
      "/products/pbc-hero.jpg",
      "/products/pbc-group.jpg",
      "/products/pbc-flavours.jpg",
      "/products/pbc-cut-4.jpg",
      "/products/pbc-cut-van-choc.jpg",
      "/products/pbc-cut-matcha.jpg",
      "/products/pbc-vanilla.jpg",
      "/products/pbc-chocolate.jpg",
      "/products/pbc-matcha.jpg",
    ],
    variants: [
      { id: "vanilla", label: "Vanilla", labelZh: "香草", price: 7 },
      { id: "chocolate", label: "Chocolate", labelZh: "巧克力", price: 7 },
      { id: "vanilla-chocolate", label: "Vanilla Chocolate", labelZh: "香草巧克力", price: 7 },
      { id: "matcha", label: "Matcha", labelZh: "抹茶", price: 8.5 },
      { id: "matcha-earl-grey", label: "Matcha Earl Grey", labelZh: "抹茶伯爵", price: 8.5 },
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
      "The same burnt caramel top, silky pudding and soft cake base — baked at 6 inch, sized for sharing.",
    nameZh: "布丁烧蛋糕 — 6 寸",
    shortDescriptionZh: "同样的招牌，做成适合分享的尺寸。",
    descriptionZh:
      "同样的焦糖脆口表层、丝滑布丁与松软蛋糕底 — 做成 6 寸，适合一起分享。",
    allergensZh: ["蛋", "奶制品", "麸质"],
    images: ["/products/pbc-group.jpg", "/products/pbc-hero.jpg", "/products/pbc-stack.jpg", "/products/pbc-cut-plain.jpg"],
    variants: [
      { id: "vanilla-6", label: "Vanilla", labelZh: "香草", price: 55 },
      { id: "chocolate-6", label: "Chocolate", labelZh: "巧克力", price: 55 },
      { id: "vanilla-chocolate-6", label: "Vanilla Chocolate", labelZh: "香草巧克力", price: 55 },
      { id: "matcha-6", label: "Matcha", labelZh: "抹茶", price: 58 },
      { id: "matcha-earl-grey-6", label: "Matcha Earl Grey", labelZh: "抹茶伯爵", price: 58 },
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
    nameZh: "招牌三文治",
    shortDescriptionZh: "我们料最足的一款 — 火腿、汉堡肉、蛋沙拉等。",
    descriptionZh:
      "我们料最足的三文治，每天早上手工现做现包。取货时间上午 7 点至 11 点，售完即止。",
    ingredientsZh: ["火腿", "汉堡肉", "蛋沙拉", "生菜", "番茄", "美乃滋"],
    allergensZh: ["蛋", "麸质"],
    pickupNoteZh: "取货时间 上午 7:00 – 11:00",
    images: ["/products/menu-signature.jpg", "/products/signature-sandwich.jpg"],
    variants: [{ id: "reg", label: "Regular", labelZh: "单份", price: 6 }],
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
    nameZh: "香肠三文治",
    shortDescriptionZh: "香肠、蛋沙拉、鸡肉松与香脆油条碎。",
    descriptionZh:
      "扎实的一份，有香肠、鸡肉松与香脆油条碎，每天早上手工现做现包。取货时间上午 7 点至 11 点，售完即止。",
    ingredientsZh: ["香肠", "蛋沙拉", "番茄", "生菜", "鸡肉松", "香脆油条碎"],
    allergensZh: ["蛋", "麸质"],
    pickupNoteZh: "取货时间 上午 7:00 – 11:00",
    images: ["/products/menu-sausage.jpg", "/products/sausage-sandwich.jpg"],
    variants: [{ id: "reg", label: "Regular", labelZh: "单份", price: 6 }],
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
    nameZh: "蛋火腿三文治",
    shortDescriptionZh: "简单的经典 — 火腿配蛋沙拉。",
    descriptionZh:
      "简单的经典：火腿夹上蛋沙拉，每天早上手工现做现包。取货时间上午 7 点至 11 点，售完即止。",
    ingredientsZh: ["火腿", "蛋沙拉"],
    allergensZh: ["蛋", "麸质"],
    pickupNoteZh: "取货时间 上午 7:00 – 11:00",
    images: ["/products/menu-egg-ham.jpg", "/products/egg-ham-sandwich.jpg"],
    variants: [{ id: "reg", label: "Regular", labelZh: "单份", price: 5 }],
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
    nameZh: "蔬菜三文治",
    shortDescriptionZh: "生菜、番茄与蛋沙拉。",
    descriptionZh:
      "清爽一点的选择，有生菜、番茄与蛋沙拉，每天早上手工现做现包。取货时间上午 7 点至 11 点，售完即止。",
    ingredientsZh: ["生菜", "番茄", "蛋沙拉"],
    allergensZh: ["蛋", "麸质"],
    pickupNoteZh: "取货时间 上午 7:00 – 11:00",
    images: ["/products/menu-vege.jpg", "/products/vege-sandwich.jpg"],
    variants: [{ id: "reg", label: "Regular", labelZh: "单份", price: 4.5 }],
    preorderDays: 1,
    ingredients: ["Salad", "Tomato", "Egg Mayo"],
    allergens: ["Egg", "Gluten"],
    isPreorderOnly: true,
    pickupNote: "Pickup 7:00 AM – 11:00 AM",
  },

  // ================= BENTO CAKES =================
  {
    id: "hd-4inch",
    slug: "hand-drawn-cake-4-inch",
    name: "Hand-Drawn Cake — 4 Inch",
    collection: "hand-drawn-cakes",
    shortDescription: "A personal-size cake with your picture drawn on top.",
    description:
      "A 4 inch cake in a bento box, finished with a drawing piped by hand. Layers of honey cake, pudding and light whipped cream. Tell us what to draw when you order.",
    nameZh: "手绘蛋糕 — 4 寸",
    shortDescriptionZh: "一人份的尺寸，上面画上你要的图。",
    descriptionZh:
      "4 寸蛋糕，装在便当盒里，上面是手工一笔一笔画上去的图。蜂蜜蛋糕、布丁与轻盈鲜奶油层层叠起。下单时告诉我们要画什么。",
    allergensZh: ["蛋", "奶制品", "麸质"],
    images: [
      "/products/handdrawn-bento.jpg",
      "/products/handdrawn-layers-bento.jpg",
    ],
    variants: [
      { id: "vanilla-pudding-4", label: "Vanilla Pudding", labelZh: "香草布丁", price: 28 },
      { id: "chocolate-pudding-4", label: "Chocolate Pudding", labelZh: "巧克力布丁", price: 32 },
      { id: "matcha-pudding-4", label: "Matcha Pudding", labelZh: "抹茶布丁", price: 35 },
    ],
    preorderDays: 3,
    allergens: ["Egg", "Dairy", "Gluten"],
    isPreorderOnly: true,
  },
  {
    id: "hd-6inch",
    slug: "hand-drawn-cake-6-inch",
    name: "Hand-Drawn Cake — 6 Inch",
    collection: "hand-drawn-cakes",
    shortDescription: "Enough to share, with your own drawing on top.",
    description:
      "A 6 inch cake finished with a drawing piped by hand — a family portrait, a private joke, a name and a number. Layers of soft sponge, pudding and light cream.",
    nameZh: "手绘蛋糕 — 6 寸",
    shortDescriptionZh: "够大家一起分，上面画上你要的图。",
    descriptionZh:
      "6 寸蛋糕，上面是手工一笔一笔画上去的图 — 一家人的合照、只有你们懂的梗、一个名字加一个数字。松软海绵蛋糕、布丁与轻盈鲜奶油层层叠起。",
    allergensZh: ["蛋", "奶制品", "麸质"],
    images: [
      "/products/handdrawn-birthday.jpg",
      "/products/handdrawn-layers-1.jpg",
      "/products/handdrawn-family.jpg",
      "/products/handdrawn-couple.jpg",
      "/products/handdrawn-singing.jpg",
    ],
    variants: [
      { id: "vanilla-6", label: "Vanilla", labelZh: "香草", price: 65 },
      { id: "chocolate-6", label: "Chocolate", labelZh: "巧克力", price: 69 },
      { id: "matcha-oreo-6", label: "Matcha Oreo", labelZh: "抹茶奥利奥", price: 72 },
    ],
    preorderDays: 4,
    allergens: ["Egg", "Dairy", "Gluten"],
    isPreorderOnly: true,
  },
  {
    id: "hd-8inch",
    slug: "hand-drawn-cake-8-inch",
    name: "Hand-Drawn Cake — 8 Inch",
    collection: "hand-drawn-cakes",
    shortDescription: "Our largest hand-drawn cake, for a full table.",
    description:
      "An 8 inch cake finished with a drawing piped by hand, sized for a bigger gathering. Layers of soft sponge, pudding and light cream.",
    nameZh: "手绘蛋糕 — 8 寸",
    shortDescriptionZh: "我们最大的手绘蛋糕，够摆满一整桌。",
    descriptionZh:
      "8 寸蛋糕，上面是手工一笔一笔画上去的图，适合人多的聚会。松软海绵蛋糕、布丁与轻盈鲜奶油层层叠起。",
    allergensZh: ["蛋", "奶制品", "麸质"],
    images: [
      "/products/handdrawn-singing.jpg",
      "/products/handdrawn-layers-2.jpg",
    ],
    variants: [
      { id: "vanilla-8", label: "Vanilla", labelZh: "香草", price: 120 },
      { id: "chocolate-8", label: "Chocolate", labelZh: "巧克力", price: 130 },
      { id: "matcha-8", label: "Matcha", labelZh: "抹茶", price: 140 },
    ],
    preorderDays: 5,
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
