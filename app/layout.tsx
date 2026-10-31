import type { Metadata, Viewport } from "next";
import { Zen_Maru_Gothic, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_URL_IS_PLACEHOLDER, absoluteUrl } from "@/lib/site";
import { BUSINESS } from "@/lib/business";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";
import Header from "@/components/layout/Header";
import DemoBanner from "@/components/layout/DemoBanner";
import WhatsappFab from "@/components/layout/WhatsappFab";
import { FlyToCartProvider } from "@/components/shared/FlyToCart";
import Footer from "@/components/layout/Footer";

const zen = Zen_Maru_Gothic({
  subsets: ["latin"],
  variable: "--font-zen",
  weight: ["400", "500", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDF6EC", // --c-milk, the everyday page colour
};

// Structured data so search results can show the shop's address and phone.
// Everything here comes from lib/business.ts — nothing is invented. The site
// address and logo URL are left out until a real domain is known.
const [postalCode, ...cityWords] = BUSINESS.address.line2.split(" ");
const siteAddress = absoluteUrl("");
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: BUSINESS.name,
  ...(siteAddress && { url: siteAddress, image: `${siteAddress}/logo.png` }),
  telephone: BUSINESS.phoneDial,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.line1,
    addressLocality: cityWords.join(" "),
    postalCode,
    addressRegion: BUSINESS.address.state,
    addressCountry: "MY",
  },
};

export const metadata: Metadata = {
  // Resolves every relative URL below (share images, canonical links) into
  // the absolute form that social apps and search engines require.
  metadataBase: new URL(SITE_URL),
  // No canonical until the real domain is known: a canonical pointing at the
  // placeholder would tell search engines this page lives somewhere else.
  ...(SITE_URL_IS_PLACEHOLDER ? {} : { alternates: { canonical: "./" } }),
  title: {
    default: "Bearkery Box Pastry — Handmade Cakes & Gifting",
    template: "%s · Bearkery Box Pastry",
  },
  // Describes what is actually on the menu (same wording as the footer), not
  // the demo catalogue the site started with.
  description:
    "Bearkery Box Pastry makes pudding burnt cakes, hand-drawn cakes and morning sandwiches, fresh in Seri Kembangan. Preorder online and collect from the bakery or have it delivered.",
  icons: { icon: "/logo-mark.png", apple: "/logo-mark.png" },
  keywords: [
    "pudding burnt cake",
    "hand-drawn cake",
    "cake preorder",
    "breakfast sandwich",
    "Seri Kembangan bakery",
    "handmade bakery",
  ],
  openGraph: {
    title: "Bearkery Box Pastry — Handmade Cakes & Gifting",
    description:
      "Pudding burnt cakes, hand-drawn cakes and morning sandwiches, made fresh in Seri Kembangan.",
    type: "website",
    siteName: BUSINESS.name,
    locale: "en_MY",
    images: [{ url: "/products/pbc-hero.jpg", alt: "Pudding Burnt Cake from Bearkery Box Pastry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bearkery Box Pastry — Handmade Cakes & Gifting",
    images: ["/products/pbc-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${zen.variable} ${poppins.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // "<" is escaped so no string in the data can close the tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
        <LanguageProvider>
        <CartProvider>
        <FlyToCartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-milk"
          >
            Skip to content
          </a>
          <DemoBanner />
          <Header />
          <main id="main-content" className="pb-24 sm:pb-16">{children}</main>
          <Footer />
          <WhatsappFab />
        </FlyToCartProvider>
      </CartProvider>
        </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
