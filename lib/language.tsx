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
 *
 * This dictionary holds interface copy — the words the site itself says.
 * Product names, descriptions and ingredient lists are part of a product's
 * own record and live in `lib/data.ts` with their translations beside them;
 * read those through `lib/localize.ts`, not through t().
 *
 * Chinese punctuation: use the full-width forms ，。、： throughout. A
 * half-width comma between Chinese characters sets no space after itself and
 * makes the line look crowded and slightly wrong to a Chinese reader, in a
 * way that is hard to name but easy to feel.
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
  "product.fromPrice": "From {price}",
  "product.chooseFlavour": "Choose a flavour",
  "product.decreaseQty": "Decrease quantity",
  "product.increaseQty": "Increase quantity",
  "product.viewLarger": "View larger photo",
  "product.viewImage": "View image {n}",
  "product.allergenNote":
    "Contains {list}. Baked in a kitchen that handles common allergens.",
  "product.priceOnRequestNote":
    "This flavour is priced on request — please contact us for the current price before ordering.",
  "product.freshNote": "Freshly baked to order — no two boxes are ever quite the same.",

  // ---- fulfillment & dates ----
  "fulfillment.label": "Fulfillment",
  "fulfillment.method": "Fulfillment method",
  "fulfillment.delivery": "Delivery",
  "fulfillment.deliveryHint": "To your door",
  "fulfillment.pickup": "Pickup",
  "fulfillment.pickupHint": "From our kitchen",
  "fulfillment.deliveryDate": "Delivery date",
  "fulfillment.pickupDate": "Pickup date",
  "fulfillment.dayUnit": "day",
  "fulfillment.daysUnit": "days",
  "fulfillment.noticeDelivery":
    "This bake needs at least {notice} notice — earliest delivery is {date}.",
  "fulfillment.noticePickup":
    "This bake needs at least {notice} notice — earliest pickup is {date}.",

  // ---- gift / personalisation ----
  "gift.heading": "Personalise this bake",
  "gift.recipient": "Recipient name (optional)",
  "gift.recipientPlaceholder": "Who is this bake for?",
  "gift.cakeMessage": "Cake message (piped in icing)",
  "gift.cakeMessagePlaceholder": "e.g. Happy Birthday Mia",
  "gift.isGift": "This is a gift — include a gift card",
  "gift.cardMessage": "Gift card message",
  "gift.cardMessagePlaceholder": "Write a little blessing...",
  "gift.specialRequest": "Special request (optional)",
  "gift.specialRequestPlaceholder": "Allergies, colour preferences, candles, etc.",

  "cart.title": "Your Gift Basket",
  "cart.empty": "Your gift basket is waiting to be filled",
  "cart.emptyBody": "Nothing in here yet. Have a look at what we're baking today.",
  "cart.shop": "Shop Collections",
  "cart.checkout": "Prepare My Gift Box",
  "cart.remove": "Remove",
  "cart.summary": "Order Summary",
  "cart.subtotal": "Subtotal",
  "cart.total": "Estimated Total",

  // ---- about / our story ----
  "about.storyEyebrow": "The Story Behind Bearkery",
  "about.storyTitle1": "Baked with warmth,",
  "about.storyTitle2": "shared as blessings.",
  "about.storyBody":
    "Bearkery Box Pastry started as a handful of cakes shared with neighbours during festive season. Word spread softly, the way warmth always does — and what began in a small kitchen grew into a little bakery devoted to gentle, handmade celebration.",
  "about.storyAlt": "Baker hand-piping cream onto a soft layered cake",

  "about.teddyEyebrow": "Meet Our Teddy",
  "about.teddyTitle": "The quiet heart of every box.",
  "about.teddyBody":
    "He doesn't say much. He just bakes, wraps, and waits by the door for the next box to go out. Our teddy has been with Bearkery Box since the very first cake — a small, steady reminder that behind every order is a hand that cared enough to make it well.",

  "about.kitchenEyebrow": "Our Kitchen",
  "about.kitchenTitle": "Small batches, slow mornings.",
  "about.kitchenBody":
    "Every bake starts before sunrise, in small batches, so nothing sits waiting and nothing is rushed. We keep our kitchen small on purpose — it's the only way we know how to keep every box feeling personal.",
  "about.kitchenAlt": "A small, warm home-style bakery kitchen with fresh bakes cooling",

  "about.valuesEyebrow": "Made With Love",
  "about.valuesTitle": "Three things that guide every bake",
  "about.value1Title": "Handmade, always",
  "about.value1Body": "Every layer, every piped message, is shaped by hand — never a machine.",
  "about.value2Title": "A blessing in every box",
  "about.value2Body":
    "We believe a cake is never just dessert. It's a small blessing passed from one hand to another.",
  "about.value3Title": "Family at the core",
  "about.value3Body":
    "Bearkery Box began in a home kitchen, and every order still feels like it's for family.",

  "about.promiseEyebrow": "Our Promise",
  "about.promiseTitle": "Every box, wrapped like it's for someone we love.",
  "about.promiseBody":
    "That's the whole promise, really — nothing baked here leaves our kitchen until we'd be happy to hand it to our own family.",
  "about.promiseCta": "Order Now",

  // ---- collections ----
  "collections.eyebrow": "All collections",
  "collections.title": "Find the bake for your moment",
  "collections.description":
    "Every collection is baked to order, hand-finished, and carries its own little story.",
  "collections.count": "{n} bakes",
  "collections.emptyTitle": "Fresh bakes coming soon",
  "collections.emptyBody":
    "We're preparing new additions for this collection. Check back shortly.",

  // ---- faq ----
  "faq.eyebrow": "Good to know",
  "faq.title": "Frequently asked questions",
  "faq.description": "Everything you need to know before you order.",

  "faq.q1": "How do I place an order?",
  "faq.a1":
    "Choose what you'd like on the site, then send the order through WhatsApp at checkout — your selections, dates and details are filled in for you. We'll reply to confirm availability, the final total, and payment.",
  "faq.q2": "Do you take payment on the website?",
  "faq.a2":
    "Not yet. Everything is confirmed and paid directly with us over WhatsApp, so nothing is charged through the site.",
  "faq.q3": "How far in advance do I need to preorder?",
  "faq.a3":
    "It depends on the bake — sandwiches need the least notice and the larger cakes need the most. The exact lead time is shown on each product page, and the date picker only offers dates we can actually make.",
  "faq.q4": "What time can I pick up the breakfast sandwiches?",
  "faq.a4":
    "Sandwiches are hand-packed fresh each morning and available for pickup between {sandwichHours}, while supplies last. Other bakes follow our general pickup hours of {generalHours}.",
  "faq.q5": "Where do I collect my order?",
  "faq.a5":
    "From our bakery at {address}. You can call or WhatsApp us at {phone} if you need help finding us.",
  "faq.q6": "Some flavours show 'Price on request' — why?",
  "faq.a6":
    "A few flavours are priced individually depending on what you need. Message us on WhatsApp and we'll confirm the price before you order.",
  "faq.q7": "Can I order a custom or celebration gift box?",
  "faq.a7":
    "Yes — baby celebration boxes, traditional ceremony gifts, custom and corporate orders are arranged personally rather than through the cart. Use the Start a conversation button and we'll plan it with you.",
  "faq.q8": "What if I have a food allergy?",
  "faq.a8":
    "Each product lists common allergens. You can also leave a note in the Special Request field, and our kitchen team will reach out if there's anything to confirm.",

  // ---- footer ----
  "footer.tagline": "Pudding burnt cakes, hand-drawn cakes and morning sandwiches, made fresh in Seri Kembangan.",
  "footer.collections": "Collections",
  "footer.company": "Company",
  "footer.rights": "All rights reserved.",

  // ---- misc ----
  "common.viewAll": "View All Collections",
  "common.explore": "Explore",
  "common.home": "Home",
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
  "hero.title1": "为每一段小时光",
  "hero.title2": "而烘焙。",
  "hero.lineMorning": "三文治刚出炉，取货至上午 11 点。",
  "hero.lineAfternoon": "午后的一块蛋糕，接单现做。",
  "hero.lineEvening": "今天已经打烊了。先预订，明早为你新鲜烘焙。",
  "hero.ctaSandwiches": "今日三文治",
  "hero.ctaCake": "招牌布丁烧蛋糕",
  "hero.ctaStory": "品牌故事",
  "hero.collection": "取货时间 7:00 – 11:00",

  // ---- signature ----
  "sig.eyebrow": "招牌产品",
  "sig.tagline": "我们的小小心头好，为你最甜的时刻新鲜烘焙。",
  "sig.cta": "查看布丁烧蛋糕",

  // ---- everyday favourites ----
  "ef.eyebrow": "日常早餐",
  "ef.heading": "为每一个早晨准备的",
  "ef.body": "每天开店前手工现做现包，简单、实在，带着就能出门。",
  "ef.pickup": "取货时间 7:00 – 11:00",

  // ---- hand-drawn ----
  "hd.eyebrow": "手绘蛋糕",
  "hd.heading": "一笔一笔，为你而画",
  "hd.body": "想画什么都可以 — 一家人的合照、只有你们懂的梗、一个名字加一个数字 — 我们手工一笔一笔画上去。",
  "hd.from": "起",

  // ---- seasonal ----
  "season.cta": "洽谈中秋礼盒",

  // ---- how it works ----
  "how.eyebrow": "如何订购",
  "how.heading": "从我们的厨房，到你的餐桌",
  "how.step1": "选择",
  "how.step1body": "浏览菜单，挑选你喜欢的。",
  "how.step2": "客制",
  "how.step2body": "加上蛋糕文字、名字，或一句小小的话。",
  "how.step3": "预约",
  "how.step3body": "选择日期，自取或外送。",
  "how.step4": "取货",
  "how.step4body": "包装妥当，等你带回家。",

  // ---- quiet words ----
  "quiet.quote": "「送到的时候还有点温热，我们就站在厨房里吃完了，连盘子都忘了拿。」",
  "quiet.attribution": "来自一位顾客",

  // ---- special orders ----
  "special.eyebrow": "订制订单",
  "special.heading": "有些礼盒，值得好好聊一聊",
  "special.body": "这些不放在菜单上，是刻意的。告诉我们场合、大概的数量，还有你希望它带给人什么感觉 — 剩下的，我们一则讯息一则讯息陪你想清楚。",
  "special.fullmoon": "满月礼盒",
  "special.fullmoonBody": "为宝宝的第一个月 — 分送给家人、邻居，还有所有等着见他的人。",
  "special.betrothal": "过大礼礼盒",
  "special.betrothalBody": "为订婚与两家人之间的传统礼数，用这个场合该有的慎重来准备。",
  "special.corporate": "企业与大量订购",
  "special.corporateBody": "为团队、客户与开放日 — 独立包装，一次送达。",
  "special.custom": "其他特别想法",
  "special.customBody": "你想像中的样子、记忆里的味道，或是一份需要说点什么的礼盒。",
  "special.start": "开始洽谈",
  "special.hours": "我们会在营业时间内回覆",

  // ---- pickup ----
  "pickup.eyebrow": "来找我们",
  "pickup.heading": "到店自取",
  "pickup.hours": "取货时间",
  "pickup.sandwichHours": "早餐三文治",
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
  "product.fromPrice": "{price} 起",
  "product.chooseFlavour": "选择口味",
  "product.decreaseQty": "减少数量",
  "product.increaseQty": "增加数量",
  "product.viewLarger": "查看大图",
  "product.viewImage": "查看第 {n} 张图",
  "product.allergenNote": "含有 {list}。本厨房同时处理常见过敏原。",
  "product.priceOnRequestNote":
    "这个口味的价格需要个别洽询 — 下单前请先联络我们确认价钱。",
  "product.freshNote": "接单现烤 — 没有两盒会长得一模一样。",

  // ---- fulfillment & dates ----
  "fulfillment.label": "取货方式",
  "fulfillment.method": "取货方式",
  "fulfillment.delivery": "外送",
  "fulfillment.deliveryHint": "送到你家门口",
  "fulfillment.pickup": "自取",
  "fulfillment.pickupHint": "到我们的厨房拿",
  "fulfillment.deliveryDate": "外送日期",
  "fulfillment.pickupDate": "取货日期",
  "fulfillment.dayUnit": "天",
  "fulfillment.daysUnit": "天",
  "fulfillment.noticeDelivery": "这一款需要至少提前 {notice} — 最早可外送日期是 {date}。",
  "fulfillment.noticePickup": "这一款需要至少提前 {notice} — 最早可取货日期是 {date}。",

  // ---- gift / personalisation ----
  "gift.heading": "为这一份加点心意",
  "gift.recipient": "收礼人姓名（选填）",
  "gift.recipientPlaceholder": "这一份要送给谁？",
  "gift.cakeMessage": "蛋糕上的文字（用糖霜写上去）",
  "gift.cakeMessagePlaceholder": "例如：生日快乐 Mia",
  "gift.isGift": "这是一份礼物 — 请附上一张小卡",
  "gift.cardMessage": "小卡上想写的话",
  "gift.cardMessagePlaceholder": "写一句小小的祝福……",
  "gift.specialRequest": "特别要求（选填）",
  "gift.specialRequestPlaceholder": "过敏、颜色偏好、蜡烛等等",

  "cart.title": "你的礼物篮",
  "cart.empty": "礼物篮还空着",
  "cart.emptyBody": "还没有东西。看看我们今天烤了什么。",
  "cart.shop": "浏览产品",
  "cart.checkout": "准备我的礼盒",
  "cart.remove": "移除",
  "cart.summary": "订单摘要",
  "cart.subtotal": "小计",
  "cart.total": "预估总额",

  // ---- about / our story ----
  "about.storyEyebrow": "Bearkery 的起点",
  "about.storyTitle1": "用温度烘焙，",
  "about.storyTitle2": "当作祝福送出。",
  "about.storyBody":
    "Bearkery Box Pastry 的开始，只是过节时分送给邻居的几块蛋糕。消息就这样轻轻传开了，温暖向来是这样传的 — 一间小厨房，慢慢长成了一家小小的烘焙坊，专心做温柔的、手工的庆祝。",
  "about.storyAlt": "师傅正用手把鲜奶油挤在柔软的夹层蛋糕上",

  "about.teddyEyebrow": "认识我们的小熊",
  "about.teddyTitle": "每一个礼盒里，安静的那颗心。",
  "about.teddyBody":
    "他话不多。他只是烤、只是包，然后在门边等下一个盒子出门。从第一块蛋糕开始，小熊就一直在 Bearkery Box — 安安静静地提醒着：每一张订单背后，都有一双愿意把它做好的手。",

  "about.kitchenEyebrow": "我们的厨房",
  "about.kitchenTitle": "小批量，慢早晨。",
  "about.kitchenBody":
    "每天的烘焙都在天亮前开始，一次只做一小批，所以没有东西要等，也没有东西被赶。厨房小是我们刻意的 — 我们只会用这个方法，让每一盒都还像是为某个人做的。",
  "about.kitchenAlt": "一间温暖的家庭式烘焙厨房，刚出炉的点心正在放凉",

  "about.valuesEyebrow": "用心做",
  "about.valuesTitle": "每一次烘焙，都守着这三件事",
  "about.value1Title": "始终手工",
  "about.value1Body": "每一层、每一句挤上去的字，都是手做的 — 从来不用机器。",
  "about.value2Title": "每一盒里都有一份祝福",
  "about.value2Body": "我们相信蛋糕从来不只是甜点。它是一份小小的祝福，从一双手，交到另一双手。",
  "about.value3Title": "家，是一切的起点",
  "about.value3Body": "Bearkery Box 是从一间家里的厨房开始的，到今天每一张订单，都还像是做给家人的。",

  "about.promiseEyebrow": "我们的承诺",
  "about.promiseTitle": "每一盒，都当作要送给自己最亲的人来包。",
  "about.promiseBody":
    "说穿了，承诺就这一句 — 这里烤出来的东西，如果我们自己不愿意拿给家人，就不会离开这间厨房。",
  "about.promiseCta": "立即订购",

  // ---- collections ----
  "collections.eyebrow": "全部系列",
  "collections.title": "找到属于这个时刻的那一款",
  "collections.description": "每个系列都是接单现做、手工完成，各自带着一个小故事。",
  "collections.count": "共 {n} 款",
  "collections.emptyTitle": "新品即将上架",
  "collections.emptyBody": "我们正在为这个系列准备新的品项，请稍后再回来看看。",

  // ---- faq ----
  "faq.eyebrow": "订购前先看看",
  "faq.title": "常见问题",
  "faq.description": "下单前你会想知道的事，都在这里。",

  "faq.q1": "要怎么下单？",
  "faq.a1":
    "在网站上选好想要的，结账时透过 WhatsApp 把订单送出 — 你选的品项、日期和资料都会自动帮你填好。我们会回覆确认是否有货、最后金额，以及付款方式。",
  "faq.q2": "网站上可以付款吗？",
  "faq.a2":
    "目前还不行。所有确认与付款都是直接透过 WhatsApp 跟我们完成，网站不会向你收取任何费用。",
  "faq.q3": "需要提前多久预订？",
  "faq.a3":
    "看品项 — 三文治需要的时间最短，大蛋糕最长。每个产品页都写明确切的天数，日期选择器也只会让你选到我们真的做得出来的日期。",
  "faq.q4": "早餐三文治几点可以取？",
  "faq.a4":
    "三文治每天早上手工现做现包，取货时间 {sandwichHours}，售完即止。其他烘焙品依照我们一般的取货时间 {generalHours}。",
  "faq.q5": "要去哪里取货？",
  "faq.a5":
    "到我们的烘焙坊：{address}。找不到路的话，可以打电话或 WhatsApp 给我们：{phone}。",
  "faq.q6": "为什么有些口味写「价格请洽询」？",
  "faq.a6":
    "有几个口味要看你的需求个别报价。WhatsApp 讯息给我们，下单前我们会先跟你确认价钱。",
  "faq.q7": "可以订制礼盒或庆祝礼盒吗？",
  "faq.a7":
    "可以 — 满月礼盒、传统礼俗礼盒、订制与企业订单，都是由专人安排，不走购物车。按「开始洽谈」，我们陪你一起规划。",
  "faq.q8": "有食物过敏怎么办？",
  "faq.a8":
    "每个产品都列出了常见过敏原。你也可以在「特别要求」栏位留言，如果有需要确认的地方，厨房会主动联络你。",

  // ---- footer ----
  "footer.tagline": "布丁烧蛋糕、手绘蛋糕与早餐三文治，在沙登新鲜手作。",
  "footer.collections": "产品系列",
  "footer.company": "关于我们",
  "footer.rights": "版权所有。",

  // ---- misc ----
  "common.viewAll": "查看全部系列",
  "common.explore": "查看",
  "common.home": "首页",
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
