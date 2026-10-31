"use client";

import { Phone, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "./ContactForm";
import { BUSINESS, ADDRESS_ONE_LINE, MAPS_URL, WHATSAPP_GENERAL } from "@/lib/business";
import { useLang } from "@/lib/language";

export default function ContactContent() {
  const { t } = useLang();

  const info = [
    { icon: Phone, label: t("contact.phone"), value: BUSINESS.phoneDisplay },
    { icon: MapPin, label: t("contact.address"), value: ADDRESS_ONE_LINE },
    {
      icon: Clock,
      label: t("contact.hours"),
      value: `${BUSINESS.hours.general} · ${t("contact.sandwiches", { hours: BUSINESS.hours.sandwiches })}`,
    },
  ];

  return (
    <div className="container-bx page">
      <SectionHeading
        level={1}
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.desc")}
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          {info.map(({ icon: Icon, label, value }) => (
            <div key={label} className="paper flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-milk text-teddy">
                <Icon size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-taupe">{label}</p>
                <p className="text-sm font-medium text-cocoa">{value}</p>
              </div>
            </div>
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={WHATSAPP_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-primary gap-2">
              <MessageCircle size={15} aria-hidden="true" /> {t("pickup.whatsapp")}
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-soft gap-2">
              <Navigation size={15} aria-hidden="true" /> {t("pickup.directions")}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
