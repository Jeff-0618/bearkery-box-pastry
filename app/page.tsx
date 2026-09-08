import Hero from "@/components/home/Hero";
import SignatureProduct from "@/components/home/SignatureProduct";
import EverydayFavouritesSection from "@/components/home/EverydayFavouritesSection";
import BentoSection from "@/components/home/BentoSection";
import HowItWorks from "@/components/home/HowItWorks";
import QuietWords from "@/components/home/QuietWords";
import SpecialOrders from "@/components/home/SpecialOrders";
import PickupInfo from "@/components/home/PickupInfo";

/**
 * Section order follows the commercial hierarchy: emotion opens the door,
 * then the signature product immediately, then everyday items, then the
 * service-led paths. Backgrounds alternate milk / cream so the page reads
 * as a series of rooms rather than one long scroll.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureProduct />
      <EverydayFavouritesSection />
      <BentoSection />
      <HowItWorks />
      <QuietWords />
      <SpecialOrders />
      <PickupInfo />
    </>
  );
}
