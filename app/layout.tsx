import type { Metadata } from "next";
import { Zen_Maru_Gothic, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/i18n";
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

export const metadata: Metadata = {
  title: {
    default: "Bearkery Box Pastry — Handmade Cakes & Gifting",
    template: "%s · Bearkery Box Pastry",
  },
  description:
    "Bearkery Box Pastry bakes warm, handmade cakes, cupcakes and gift boxes for birthdays, baby showers, weddings and everyday blessings. Preorder online for delivery or pickup.",
  icons: { icon: "/logo-mark.png", apple: "/logo-mark.png" },
  keywords: [
    "handmade bakery",
    "cake preorder",
    "birthday cake delivery",
    "baby shower cake",
    "wedding cake",
    "gift box bakery",
  ],
  openGraph: {
    title: "Bearkery Box Pastry — Handmade Cakes & Gifting",
    description:
      "Warm, handmade cakes and gift boxes for every blessing — birthdays, baby showers, weddings and beyond.",
    type: "website",
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
