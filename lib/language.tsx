"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * BILINGUAL SUPPORT (English / 简体中文)
 *
 * The site is one set of pages with a swappable dictionary, rather than two
 * sets of routed pages. That keeps the structure simple and safe to deploy,
 * at the cost of search engines only indexing the default language — an
 * acceptable trade while most visitors arrive from Instagram and QR codes
 * rather than search.
 *
 * Adding a string: add it to BOTH dictionaries below, then call t("key").
 * A missing key falls back to English rather than showing the raw key.
 */

export type Lang = "en" | "zh";

const STORAGE_KEY = "bearkery-lang";

type Dict = Record<string, string>;

const en: Dict = {
  // ---- navigation & chrome ----
  "nav.collections": "Collections",
  "nav.story": "Our Story",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.cart": "Gift basket",
  "nav.menu": "Menu",
  "nav.shopByCollection": "Shop by collection",

  "banner.notice": "Orders are confirmed over WhatsApp — no payment is taken on this site.",
  "fab.order": "Order on WhatsApp",
  "fab.orderShort": "Order",

  // ---- hero ----
  "hero.greetingMorning": "Good morning",
  "hero.greetingAfternoon": "Good afternoon",
  "hero.greetingEvening": "Good evening",
  "hero.location": "Seri Kembangan",
  "hero.title1": "Baked for",
  "hero.title2": "little moments.",
  "hero.lineMorning": "The sandwiches are out of the kitchen. Collection until 11am.",
  "hero.lineAfternoon": "A quiet afternoon slice, freshly baked to order.",
  "hero.lineEvening": "We've closed for the night. Order ahead and we'll bake it fresh in the morning.",
  "hero.ctaSandwiches": "Today's Sandwiches",
  "hero.ctaCake": "Our Pudding Burnt Cake",
  "hero.ctaStory": "Our Story",
  "hero.collection": "Collection 7:00 – 11:00 AM",

  // ---- signature ----
  "sig.eyebrow": "Our Signature",
  "sig.tagline": "Our little favourite, baked fresh for your sweetest moments.",
  "sig.cta": "Explore Pudding Cakes",

  // ---- everyday favourites ----
  "ef.eyebrow": "Everyday Favourites",
  "ef.heading": "Something for every morning",
  "ef.body": "Fresh little favourites for your everyday mornings, hand-packed before the day begins.",
  "ef.pickup": "Pickup 7:00 AM – 11:00 AM",

  // ---- hand-drawn ----
  "hd.eyebrow": "Hand-Drawn Cakes",
  "hd.heading": "Drawn by hand, just for you",
  "hd.body": "Tell us what to draw — a family portrait, a private joke, a name and a number — and we pipe it on by hand.",
  "hd.from": "from",

  // ---- seasonal ----
  "season.cta": "Plan a Mid-Autumn box",

  // ---- how it works ----
  "how.eyebrow": "How to order",
  "how.heading": "From our kitchen to your table",
  "how.step1": "Choose",
  "how.step1body": "Browse the menu and pick your favourites.",
  "how.step2": "Personalise",
  "how.step2body": "Add a cake message, a name, a little note.",
  "how.step3": "Schedule",
  "how.step3body": "Pick a preorder date, delivery or pickup.",
  "how.step4": "Receive",
  "how.step4body": "Your order arrives, ready to carry home.",

  // ---- quiet words ----
  "quiet.quote": "“It arrived still a little warm, and we ate it standing in the kitchen before anyone thought to get plates.”",
  "quiet.attribution": "A note from a customer",

  // ---- special orders ----
  "special.eyebrow": "Made to Order",
  "special.heading": "Some boxes deserve a conversation",
  "special.body": "These aren't on the menu, and that's on purpose. Tell us the occasion, roughly how many, and what it should feel like — we'll work out the rest with you, one message at a time.",
  "special.fullmoon": "Full Moon Celebrations",
  "special.fullmoonBody": "For a baby's first month — boxes to share with family, neighbours and everyone who's been waiting to meet them.",
  "special.betrothal": "Betrothal Gift Boxes",
  "special.betrothalBody": "For engagements and the traditional exchange between families, arranged with the care the occasion asks for.",
  "special.corporate": "Corporate & Bulk Orders",
  "special.corporateBody": "For teams, clients and open houses — individually boxed, delivered together.",
  "special.custom": "Something Else Entirely",
  "special.customBody": "A shape you've imagined, a flavour you remember, a box that needs to say something particular.",
  "special.start": "Start a conversation",
  "special.hours": "We reply during pickup hours",

  // ---- pickup ----
  "pickup.eyebrow": "Visit us",
  "pickup.heading": "Pick up from our bakery",
  "pickup.hours": "Pickup hours",
  "pickup.sandwichHours": "Breakfast sandwiches",
  "pickup.directions": "Get Directions",
  "pickup.whatsapp": "WhatsApp Us",

  // ---- product & cart ----
  "product.addToCart": "Wrap This Gift",
  "product.added": "Wrapped ✓",
  "product.buyNow": "Send It Now",
  "product.quantity": "Quantity",
  "product.chooseSize": "Choose a size",
  "product.priceOnRequest": "Price on request",
  "product.ingredients": "What's inside",
  "product.contains": "Contains",
  "product.related": "You may also love",
  "product.preorderOnly": "Preorder Only",
  "product.signature": "Signature",

  "cart.title": "Your Gift Basket",
  "cart.empty": "Your gift basket is waiting to be filled",
  "cart.emptyBody": "Nothing in here yet. Have a look at what we're baking today.",
  "cart.shop": "Shop Collections",
  "cart.checkout": "Prepare My Gift Box",
  "cart.remove": "Remove",
  "cart.summary": "Order Summary",
  "cart.subtotal": "Subtotal",
  "cart.total": "Estimated Total",

  // ---- footer ----
  "footer.tagline": "Pudding burnt cakes, hand-drawn cakes and morning sandwiches, made fresh in Seri Kembangan.",
  "footer.collections": "Collections",
  "footer.company": "Company",
  "footer.rights": "All rights reserved.",

  // ---- misc ----
  "common.viewAll": "View All Collections",
  "common.explore": "Explore",
  "common.backHome": "Back to Home",
};

const zh: Dict = {
  // ---- navigation & chrome ----
  "nav.collections": "全部产品",
  "nav.story": "品牌故事",
  "nav.faq": "常见问题",
  "nav.contact": "联络我们",
  "nav.cart": "礼物篮",
  "nav.menu": "选单",
  "nav.shopByCollection": "选购系列",

  "banner.notice": "订单透过 WhatsApp 确认 — 本网站不收款。",
  "fab.order": "WhatsApp 下单",
  "fab.orderShort": "下单",

  // ---- hero ----
  "hero.greetingMorning": "早安",
  "hero.greetingAfternoon": "午安",
  "hero.greetingEvening": "晚安",
  "hero.location": "沙登",
  "hero.title1": "为每个小日子",
  "hero.title2": "而烘焙。",
  "hero.lineMorning": "三明治刚出炉,取货至上午 11 点。",
  "hero.lineAfternoon": "午后的一块蛋糕,接单现做。",
  "hero.lineEvening": "今天已经打烊了。先预订,明早为你新鲜烘焙。",
  "hero.ctaSandwiches": "今日三明治",
  "hero.ctaCake": "招牌布丁烧蛋糕",
  "hero.ctaStory": "品牌故事",
  "hero.collection": "取货时间 7:00 – 11:00",

  // ---- signature ----
  "sig.eyebrow": "招牌产品",
  "sig.tagline": "我们的小小心头好,为你最甜的时刻新鲜烘焙。",
  "sig.cta": "查看布丁烧蛋糕",

  // ---- everyday favourites ----
  "ef.eyebrow": "日常早餐",
  "ef.heading": "为每一个早晨准备的",
  "ef.body": "每天开店前手工现做现包,简单、实在,带着就能出门。",
  "ef.pickup": "取货时间 7:00 – 11:00",

  // ---- hand-drawn ----
  "hd.eyebrow": "手绘蛋糕",
  "hd.heading": "一笔一笔,为你而画",
  "hd.body": "想画什么都可以 — 一家人的合照、只有你们懂的梗、一个名字加一个数字 — 我们手工一笔一笔画上去。",
  "hd.from": "起",

  // ---- seasonal ----
  "season.cta": "洽谈中秋礼盒",

  // ---- how it works ----
  "how.eyebrow": "如何订购",
  "how.heading": "从我们的厨房,到你的餐桌",
  "how.step1": "选择",
  "how.step1body": "浏览菜单,挑选你喜欢的。",
  "how.step2": "客制",
  "how.step2body": "加上蛋糕文字、名字,或一句小小的话。",
  "how.step3": "预约",
  "how.step3body": "选择日期,自取或外送。",
  "how.step4": "取货",
  "how.step4body": "包装妥当,等你带回家。",

  // ---- quiet words ----
  "quiet.quote": "「送到的时候还有点温热,我们就站在厨房里吃完了,连盘子都忘了拿。」",
  "quiet.attribution": "来自一位顾客",

  // ---- special orders ----
  "special.eyebrow": "订制订单",
  "special.heading": "有些礼盒,值得好好聊一聊",
  "special.body": "这些不放在菜单上,是刻意的。告诉我们场合、大概的数量,还有你希望它带给人什么感觉 — 剩下的,我们一则讯息一则讯息陪你想清楚。",
  "special.fullmoon": "满月礼盒",
  "special.fullmoonBody": "为宝宝的第一个月 — 分送给家人、邻居,还有所有等着见他的人。",
  "special.betrothal": "过大礼礼盒",
  "special.betrothalBody": "为订婚与两家人之间的传统礼数,用这个场合该有的慎重来准备。",
  "special.corporate": "企业与大量订购",
  "special.corporateBody": "为团队、客户与开放日 — 独立包装,一次送达。",
  "special.custom": "其他特别想法",
  "special.customBody": "你想像中的样子、记忆里的味道,或是一份需要说点什么的礼盒。",
  "special.start": "开始洽谈",
  "special.hours": "我们会在营业时间内回覆",

  // ---- pickup ----
  "pickup.eyebrow": "来找我们",
  "pickup.heading": "到店自取",
  "pickup.hours": "取货时间",
  "pickup.sandwichHours": "早餐三明治",
  "pickup.directions": "查看地图",
  "pickup.whatsapp": "WhatsApp 联络",

  // ---- product & cart ----
  "product.addToCart": "加入礼物篮",
  "product.added": "已加入 ✓",
  "product.buyNow": "立即订购",
  "product.quantity": "数量",
  "product.chooseSize": "选择口味 / 尺寸",
  "product.priceOnRequest": "价格请洽询",
  "product.ingredients": "内容物",
  "product.contains": "含有",
  "product.related": "你可能也会喜欢",
  "product.preorderOnly": "需预订",
  "product.signature": "招牌",

  "cart.title": "你的礼物篮",
  "cart.empty": "礼物篮还空着",
  "cart.emptyBody": "还没有东西。看看我们今天烤了什么。",
  "cart.shop": "浏览产品",
  "cart.checkout": "准备我的礼盒",
  "cart.remove": "移除",
  "cart.summary": "订单摘要",
  "cart.subtotal": "小计",
  "cart.total": "预估总额",

  // ---- footer ----
  "footer.tagline": "布丁烧蛋糕、手绘蛋糕与早餐三明治,在沙登新鲜手作。",
  "footer.collections": "产品系列",
  "footer.company": "关于我们",
  "footer.rights": "版权所有。",

  // ---- misc ----
  "common.viewAll": "查看全部系列",
  "common.explore": "查看",
  "common.backHome": "回到首页",
};

const DICTS: Record<Lang, Dict> = { en, zh };

interface LangValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangValue>({
  lang: "en",
  setLang: () => {},
  t: (k) => en[k] ?? k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start on English so server and client markup match, then restore the
  // saved choice after mount.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "zh") setLangState(saved);
    } catch {
      /* storage unavailable — stay on English */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string) => DICTS[lang][key] ?? en[key] ?? key,
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
