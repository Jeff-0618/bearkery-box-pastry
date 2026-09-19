import Hero from "@/components/home/Hero";
import CollectionsPreview from "@/components/home/CollectionsPreview";
import SeasonalSection from "@/components/home/SeasonalSection";
import HowItWorks from "@/components/home/HowItWorks";
import QuietWords from "@/components/home/QuietWords";
import SpecialOrders from "@/components/home/SpecialOrders";
import PickupInfo from "@/components/home/PickupInfo";

/**
 * Section order follows the commercial hierarchy: emotion opens the door,
 * then the three collections as three ways in, then the service-led paths.
 * Backgrounds alternate milk / cream so the page reads as a series of rooms
 * rather than one long scroll.
 *
 * SignatureProduct, EverydayFavouritesSection and HandDrawnSection used to
 * sit in the second slot and between them printed every price on the menu
 * before a visitor had chosen anything. CollectionsPreview replaces all
 * three. The three component files are left in the repo unused — nothing
 * imports them, so nothing ships them — in case the price-forward layout is
 * wanted back for a promotion.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsPreview />
      <SeasonalSection />
      <HowItWorks />
      <QuietWords />
      <SpecialOrders />
      <PickupInfo />
    </>
  );
}
