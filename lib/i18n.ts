/**
 * BILINGUAL COPY
 *
 * Every customer-facing string lives here in both languages. To change
 * wording, edit it here once and both the component and the other language
 * stay in sync — nothing is hardcoded in the components.
 *
 * Chinese copy is written for a Malaysian Chinese reader: simplified
 * characters, warm but not flowery, and never a literal translation where a
 * natural phrasing exists.
 */

export type Lang = "en" | "zh";

export const DICT = {
  // ---------- navigation ----------
  "nav.collections": { en: "Collections", zh: "全部商品" },
  "nav.story": { en: "Our Story", zh: "品牌故事" },
  "nav.faq": { en: "FAQ", zh: "常见问题" },
  "nav.contact": { en: "Contact", zh: "联络我们" },
  "nav.cart": { en: "Gift basket", zh: "购物篮" },
  "nav.menu": { en: "Menu", zh: "选单" },
  "nav.shopBy": { en: "Shop by collection", zh: "浏览系列" },

  // ---------- banner ----------
  "banner.text": {
    en: "Orders are confirmed over WhatsApp — no payment is taken on this site.",
    zh: "订单透过 WhatsApp 确认 — 本网站不收取任何付款。",
  },

  // ---------- hero ----------
  "hero.greeting.morning": { en: "Good morning", zh: "早安" },
  "hero.greeting.afternoon": { en: "Good afternoon", zh: "午安" },
  "hero.greeting.evening": { en: "Good evening", zh: "晚安" },
  "hero.location": { en: "Seri Kembangan", zh: "史里肯邦安" },
  "hero.title1": { en: "Baked for", zh: "为每个" },
  "hero.title2": { en: "little moments.", zh: "小小时刻而烘焙" },
  "hero.line.morning": {
    en: "The sandwiches are out of the kitchen. Collection until 11am.",
    zh: "三明治刚出炉,自取至上午 11 点。",
  },
  "hero.line.afternoon": {
    en: "A quiet afternoon slice, freshly baked to order.",
    zh: "午后的一块甜点,接单后新鲜现烤。",
  },
  "hero.line.evening": {
    en: "We've closed for the night. Order ahead and we'll bake it fresh in the morning.",
    zh: "今天已打烊。先预订,明早为你新鲜出炉。",
  },
  "hero.cta.sandwiches": { en: "Today's Sandwiches", zh: "今日三明治" },
  "hero.cta.cake": { en: "Our Pudding Burnt Cake", zh: "招牌布丁烧蛋糕" },
  "hero.cta.story": { en: "Our Story", zh: "品牌故事" },
  "hero.pickupWindow": { en: "Collection 7:00 – 11:00 AM", zh: "自取时间 早上 7:00 – 11:00" },

  // ---------- signature ----------
  "sig.eyebrow": { en: "Our Signature", zh: "招牌商品" },
  "sig.tagline": {
    en: "Our little favourite, baked fresh for your sweetest moments.",
    zh: "我们的心头好,为你最甜的时刻新鲜烘焙。",
  },
  "sig.cta": { en: "Explore Pudding Cakes", zh: "查看布丁烧蛋糕" },

  // ---------- everyday favourites ----------
  "ef.eyebrow": { en: "Everyday Favourites", zh: "日常早餐" },
  "ef.heading": { en: "Something for every morning", zh: "每个早晨的小确幸" },
  "ef.body": {
    en: "Fresh little favourites for your everyday mornings, hand-packed before the day begins.",
    zh: "每天清晨手工现做,为你的一天开个好头。",
  },
  "ef.pickup": { en: "Pickup 7:00 AM – 11:00 AM", zh: "自取时间 早上 7:00 – 11:00" },

  // ---------- hand-drawn ----------
  "hd.eyebrow": { en: "Hand-Drawn Cakes", zh: "手绘蛋糕" },
  "hd.heading": { en: "Drawn by hand, just for you", zh: "一笔一画,只为你而画" },
  "hd.body": {
    en: "Tell us what to draw — a family portrait, a private joke, a name and a number — and we pipe it on by hand.",
    zh: "告诉我们想画什么 — 一家人的模样、只有你们懂的梗、一个名字和数字 — 我们为你手绘上去。",
  },
  "hd.from": { en: "from", zh: "起" },

  // ---------- how it works ----------
  "how.eyebrow": { en: "How to order", zh: "如何订购" },
  "how.heading": { en: "From our kitchen to your table", zh: "从我们的厨房,到你的餐桌" },
  "how.step1": { en: "Choose", zh: "选择" },
  "how.step1b": { en: "Browse the menu and pick your favourites.", zh: "浏览菜单,挑选你喜欢的。" },
  "how.step2": { en: "Personalise", zh: "客制" },
  "how.step2b": { en: "Add a cake message, a name, a little note.", zh: "加上蛋糕字句、名字,或一段小留言。" },
  "how.step3": { en: "Schedule", zh: "预约" },
  "how.step3b": { en: "Pick a preorder date, delivery or pickup.", zh: "选择预订日期、外送或自取。" },
  "how.step4": { en: "Receive", zh: "取货" },
  "how.step4b": { en: "Your order arrives, ready to carry home.", zh: "打包妥当,等你带回家。" },

  // ---------- quiet words ----------
  "quiet.quote": {
    en: "It arrived still a little warm, and we ate it standing in the kitchen before anyone thought to get plates.",
    zh: "送到时还带着余温,我们就站在厨房吃了起来,谁都没想起要拿盘子。",
  },
  "quiet.attrib": { en: "A note from a customer", zh: "来自顾客的留言" },

  // ---------- seasonal ----------
  "season.cta": { en: "Plan a Mid-Autumn box", zh: "洽谈中秋礼盒" },

  // ---------- special orders ----------
  "so.eyebrow": { en: "Made to Order", zh: "客制订单" },
  "so.heading": { en: "Some boxes deserve a conversation", zh: "有些礼盒,值得好好聊一聊" },
  "so.body": {
    en: "These aren't on the menu, and that's on purpose. Tell us the occasion, roughly how many, and what it should feel like — we'll work out the rest with you, one message at a time.",
    zh: "这些不在菜单上,是刻意的。告诉我们场合、大概数量,以及你希望它带来什么感觉 — 剩下的,我们一则讯息一则讯息陪你慢慢谈。",
  },
  "so.fullmoon": { en: "Full Moon Celebrations", zh: "满月礼盒" },
  "so.fullmoonB": {
    en: "For a baby's first month — boxes to share with family, neighbours and everyone who's been waiting to meet them.",
    zh: "为宝宝的第一个月 — 与家人、邻居,以及每一位期待见到他的人分享喜悦。",
  },
  "so.betrothal": { en: "Betrothal Gift Boxes", zh: "过大礼礼盒" },
  "so.betrothalB": {
    en: "For engagements and the traditional exchange between families, arranged with the care the occasion asks for.",
    zh: "为订婚与两家的传统礼数,以这个场合应得的慎重来安排。",
  },
  "so.corporate": { en: "Corporate & Bulk Orders", zh: "企业与大量订购" },
  "so.corporateB": {
    en: "For teams, clients and open houses — individually boxed, delivered together.",
    zh: "为团队、客户与开放日 — 独立包装,一次送达。",
  },
  "so.custom": { en: "Something Else Entirely", zh: "其他想法" },
  "so.customB": {
    en: "A shape you've imagined, a flavour you remember, a box that needs to say something particular.",
    zh: "你想象中的样子、记忆里的味道,或一份想说点什么的礼盒。",
  },
  "so.start": { en: "Start a conversation", zh: "开始洽谈" },
  "so.hours": { en: "We reply during pickup hours", zh: "我们在营业时间内回覆" },

  // ---------- pickup ----------
  "pick.eyebrow": { en: "Visit us", zh: "来找我们" },
  "pick.heading": { en: "Pick up from our bakery", zh: "到店自取" },
  "pick.hours": { en: "Pickup hours", zh: "自取时间" },
  "pick.sandwichHours": { en: "Breakfast sandwiches", zh: "早餐三明治" },
  "pick.directions": { en: "Get Directions", zh: "查看路线" },
  "pick.whatsapp": { en: "WhatsApp Us", zh: "WhatsApp 联络" },

  // ---------- footer ----------
  "footer.tagline": {
    en: "Pudding burnt cakes, hand-drawn cakes and morning sandwiches, made fresh in Seri Kembangan.",
    zh: "布丁烧蛋糕、手绘蛋糕与早餐三明治,在史里肯邦安新鲜手作。",
  },
  "footer.collections": { en: "Collections", zh: "商品系列" },
  "footer.company": { en: "Company", zh: "关于" },
  "footer.rights": { en: "All rights reserved.", zh: "版权所有。" },

  // ---------- common ----------
  "common.orderWhatsapp": { en: "Order on WhatsApp", zh: "WhatsApp 下单" },
  "common.order": { en: "Order", zh: "下单" },
  "common.viewAll": { en: "View All", zh: "查看全部" },
} as const;

export type DictKey = keyof typeof DICT;

export function translate(key: DictKey, lang: Lang): string {
  const entry = DICT[key];
  return entry ? entry[lang] : key;
}
