# Bearkery Box Pastry

A warm handmade-bakery site for **Bearkery Box Pastry** (Seri Kembangan, Selangor), built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. Bilingual (English / 简体中文). Orders are placed through WhatsApp.

## Getting started

Requires [Node.js](https://nodejs.org) LTS.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For production: `npm run build` then `npm run start`.

## Configuration

Copy `.env.example` to `.env.local` and fill it in. On Vercel, set the same names under **Project → Settings → Environment Variables**, then redeploy. Anything starting with `NEXT_PUBLIC_` is written into the browser bundle at build time — it is **not secret**.

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The real domain (e.g. `https://bearkery-box-pastry.vercel.app`). Drives the sitemap, canonical links and share previews. Until it is set, `robots.txt` leaves the sitemap out. |
| `NEXT_PUBLIC_ORDER_WEBHOOK` | Google Sheet intake URL. Every order is also sent there. See [`google-apps-script/README.md`](google-apps-script/README.md). |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Free key from web3forms.com. Enables the contact-form email and the newsletter box. Without it the contact form opens WhatsApp instead and the newsletter box is hidden. |
| `ADMIN_PASSWORD` | Password for `/admin` (server-side only, never `NEXT_PUBLIC_`). **If unset, `/admin` returns 404 in production.** |

## How ordering works

1. The customer builds a basket (variant, date, pickup/delivery, cake message).
2. Checkout opens WhatsApp with the whole order prefilled (`lib/whatsapp-order.ts`). The bakery confirms availability, the final total and payment there. **No payment is taken on the site.**
3. The order is also recorded: always in that browser's `localStorage`, and — if `NEXT_PUBLIC_ORDER_WEBHOOK` is set — in your Google Sheet. Without the webhook, orders placed on customers' phones are **not** visible to you.
4. `/admin` shows the orders stored in the browser you open it in, with CSV/JSON export and reports. It is protected by `ADMIN_PASSWORD` (`middleware.ts`) and needs a host that runs Next.js middleware (Vercel does).

Online payment is deliberately not wired up: `lib/payment.ts` lists the steps for adding a Malaysian gateway (Billplz / senangPay / iPay88) once a merchant account exists. Keep gateway secrets in server-side environment variables.

## Language

Interface text lives in two dictionaries in `lib/language.tsx` (`en` and `zh`); components call `t("some.key")`, and `t("some.key", { name: "Mia" })` fills `{name}` slots. Add a key to **both** dictionaries. A missing key falls back to English. Chinese strings use full-width punctuation（，。：？）.

Product and collection wording lives beside the English in `lib/data.ts` (`nameZh`, `descriptionZh`, …) and is read through `lib/localize.ts`; a missing `…Zh` field falls back to English. Basket lines and saved orders keep the **English** name and flavour (that is what the WhatsApp message and the Sheet receive); `cartLineText()` looks up the Chinese for display only.

Page `<title>` and meta descriptions stay English: there is one URL per page, not per language.

## Deploying

The site is deployed by Vercel from the `main` branch of the GitHub repository. Pushing to any other branch creates a **Preview** deployment with its own URL and leaves the live site alone — use that to check a change before merging it into `main`.

## Folder structure

```
app/
  layout.tsx            Root layout, fonts, metadata, structured data, providers
  page.tsx              Home
  about/ faq/ collections/   page.tsx (metadata) + *Client.tsx (interactive/bilingual UI)
  contact/              page.tsx + ContactContent.tsx + ContactForm.tsx
  product/[slug]/       Product page (server) + ProductDetailClient (configurator)
  cart/ checkout/ order-confirmation/   Basket flow (noindex)
  admin/                Orders & reports (noindex, password-protected)
  sitemap.ts robots.ts not-found.tsx
components/             layout/ home/ product/ cart/ shared/ ui/
lib/
  data.ts               Collections and products (real menu, real prices, Chinese beside English)
  localize.ts           Picks the right language from a record; cartLineText for basket lines
  language.tsx          EN/ZH dictionaries and provider
  business.ts           Phone, address, hours, WhatsApp links
  order-sink.ts         Where orders are recorded (browser + optional webhook)
  order-store.ts        Browser order store, CSV/JSON export
  forms.ts              Web3Forms helper for contact + newsletter
  site.ts               SITE_URL
  payment.ts            Pluggable payment layer (demo only for now)
middleware.ts           Password gate for /admin
google-apps-script/     Code to paste into your Google Sheet
```

## Before launch

- Set `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD`, and (recommended) `NEXT_PUBLIC_ORDER_WEBHOOK` and `NEXT_PUBLIC_WEB3FORMS_KEY`.
- The About page still uses two Unsplash stock photos (`app/about/AboutClient.tsx`); swap in real photos of the kitchen, then drop Unsplash from `images.remotePatterns` in `next.config.mjs`.
- The `?demo=1` test button on checkout records a fake order (`is_demo = TRUE`) — delete such rows from the Sheet after testing.
