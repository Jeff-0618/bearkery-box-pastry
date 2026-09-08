# Bearkery Box Pastry

A warm, premium handmade-bakery e-commerce experience for **Bearkery Box Pastry** (Seri Kembangan, Selangor) — built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

The brand's own teddy bear mascot is the centerpiece of the site — see `public/illustrations/README.md` for the 10 illustration files the design still needs and exactly where each one appears.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

> Product photography (sandwiches, bento cakes, etc.) uses royalty-free Unsplash placeholder URLs in `lib/data.ts` — swap in real product photos before launch. Bento Cake pricing (RM18) is a placeholder — confirm real pricing before launch.

## Design tokens

| Token | Hex |
|---|---|
| Primary | `#F5E7D3` |
| Secondary | `#E8D5BE` |
| Accent | `#C49A6C` |
| Dark Brown (`bark`) | `#5A4433` |
| Cream | `#FFF9F4` |
| Gold | `#D6B37A` |
| Dusty Pink | `#E7C3C1` |
| Matcha | `#B9C4A9` |
| Lavender | `#D6CFE8` |
| Butter | `#F0D9A0` |

Typography: **Fraunces** (display/headlines) paired with **Manrope** (body/UI), loaded via `next/font/google` in `app/layout.tsx`.

Currency: prices are formatted as Malaysian Ringgit (`RM`) via `lib/utils.ts`'s `formatPrice`.

## Folder structure

```
app/
  layout.tsx                  Root layout, fonts, metadata, providers
  page.tsx                    Home (Hero → Featured Cakes → Everyday
                               Favourites → How To Order → About → Instagram)
  collections/
    page.tsx                  Collections index
    [slug]/page.tsx            Collection detail (dynamic)
    [slug]/loading.tsx          Skeleton state
  product/
    [slug]/page.tsx             Product detail (server: fetches product)
    [slug]/ProductDetailClient.tsx  Interactive configurator (client)
    [slug]/loading.tsx           Skeleton state
  cart/page.tsx                Shopping cart
  checkout/page.tsx            Checkout (customer details + pickup/delivery + order review)
  order-confirmation/page.tsx  Order confirmation
  about/page.tsx               About Us / brand story (5 sections)
  faq/page.tsx + FaqAccordion.tsx    FAQ (accessible accordion)
  contact/page.tsx + ContactForm.tsx Contact + real pickup info
  sitemap.ts / robots.ts       SEO
  not-found.tsx                Custom 404

components/
  layout/        Header, Footer, BearMark logo (small nav mark, not the mascot)
  product/       ProductCard, StoryCollectionCard, VariantSelector,
                 QuantitySelector, FulfillmentToggle,
                 DeliveryDatePicker, GiftDetailsForm
  cart/          CartLineItem, OrderSummary
  home/          Hero, EverydayFavouritesSection, HowItWorks (How To Order),
                 OurStory (About Bearkery teaser), Testimonials, InstagramGallery
  shared/        SectionHeading, LazyImage, BearIllustration (mascot slot system)
  ui/            Badge, Skeleton

lib/
  types.ts       Domain types (Product, CartItem, Order, etc.)
  data.ts        Collections & products — Everyday Favourites and Bento Cake
                 are real menu items; the rest are placeholder collections
  cart-context.tsx  Cart state (React context + localStorage persistence)
  utils.ts       Formatting (RM currency) & date helpers
```

## Collections

Everyday Favourites and Bento Cake carry real menu items and pricing.
The remaining collections (Tiny Blessings, Double Happiness, Birthday
Cakes, Cupcakes, Cake Rolls, Gift Boxes) are placeholder categories from
the original site scope — keep, edit, or remove them as needed.

## Shopping flow implemented

1. **Home** — hero, featured cakes, Everyday Favourites menu, how-to-order steps, about teaser, Instagram gallery.
2. **Collections** — all 8 collections with their own story copy.
3. **Collection detail** — filtered product grid with breadcrumb.
4. **Product detail** — image gallery, variant selector, quantity stepper, pickup/delivery toggle, preorder date picker (enforces each product's minimum lead time), gift details, add-to-cart / buy-now, related products.
5. **Cart** — editable line items with gift/date summary, running subtotal.
6. **Checkout** — contact + delivery form or real pickup info block, order review, summary sidebar, simulated payment step.
7. **Order confirmation** — order number, fulfillment recap, itemized total.

## Notes for production use

- Replace `lib/data.ts` placeholder collections/pricing with your final catalog.
- Checkout currently simulates order placement via `sessionStorage`; wire it to a real payment provider and order API.
- Swap Unsplash placeholder URLs for owned photography, and update `next.config.mjs`'s `images.remotePatterns` accordingly.
- Add the 10 mascot illustrations per `public/illustrations/README.md`.
- All interactive controls are keyboard-accessible with visible focus states, `aria-*` labeling, and semantic form structure.
