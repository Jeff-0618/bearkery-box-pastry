import type { Metadata } from "next";
import { Phone, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "./ContactForm";
import { BUSINESS, ADDRESS_ONE_LINE, MAPS_URL, WHATSAPP_GENERAL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Bearkery Box Pastry for orders, pickup, or special requests.",
};

const INFO = [
  { icon: Phone, label: "Phone", value: BUSINESS.phoneDisplay },
  { icon: MapPin, label: "Pickup Address", value: ADDRESS_ONE_LINE },
  { icon: Clock, label: "Pickup Hours", value: `${BUSINESS.hours.general} · Sandwiches ${BUSINESS.hours.sandwiches}` },
];

export default function ContactPage() {
  return (
    <div className="container-bx py-16">
      <SectionHeading
        t-eyebrow="We'd love to hear from you"
        title="Get in touch"
        description="Questions about an order, a special request, or just want to say hello?"
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          {INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} className="paper items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-milk text-teddy">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-taupe">{label}</p>
                <p className="text-sm font-medium text-cocoa">{value}</p>
              </div>
            </div>
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={WHATSAPP_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-primary gap-2">
              <MessageCircle size={15} /> WhatsApp Us
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-soft gap-2">
              <Navigation size={15} /> Get Directions
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
