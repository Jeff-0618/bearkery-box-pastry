import { MapPin, Clock, Phone, Navigation, MessageCircle } from "lucide-react";
import { BUSINESS, MAPS_URL, WHATSAPP_GENERAL } from "@/lib/business";
import Reveal from "@/components/shared/Reveal";

/**
 * Pickup details. Deliberately plain and high-contrast: this is the block
 * someone reads while standing on a street looking for the door, so clarity
 * beats atmosphere. All three actions are one tap on mobile.
 */
export default function PickupInfo() {
  return (
    <section className="section bg-cream">
      <div className="container-bx">
        <Reveal className="mx-auto max-w-3xl">
          <p className="t-eyebrow">Visit us</p>
          <h2 className="t-heading mt-4">Pick up from our bakery</h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="paper flex flex-col gap-2 p-6">
              <MapPin size={18} className="text-teddy" />
              <p className="font-medium text-cocoa">{BUSINESS.address.line1}</p>
              <p className="text-sm text-taupe">{BUSINESS.address.line2}</p>
              <p className="text-sm text-taupe">{BUSINESS.address.state}</p>
            </div>

            <div className="paper flex flex-col gap-3 p-6">
              <Clock size={18} className="text-teddy" />
              <p className="text-sm">
                <span className="font-medium text-cocoa">Pickup hours</span>
                <br />
                <span className="text-taupe">{BUSINESS.hours.general}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-cocoa">Breakfast sandwiches</span>
                <br />
                <span className="text-taupe">{BUSINESS.hours.sandwiches}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <a href={`tel:${BUSINESS.phoneDial}`} className="btn-soft">
              <Phone size={15} /> {BUSINESS.phoneDisplay}
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-soft">
              <Navigation size={15} /> Get Directions
            </a>
            <a href={WHATSAPP_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={15} /> WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
