/** Single source of truth for business details. Update here, changes everywhere. */
export const BUSINESS = {
  name: "Bearkery Box Pastry",
  phoneDisplay: "011-4535 5220",
  phoneDial: "+601145355220",
  whatsappNumber: "601145355220",
  address: { line1: "1120A, Jalan SK 8/7", line2: "43300 Seri Kembangan", state: "Selangor" },
  hours: { general: "7:00 AM – 6:00 PM", sandwiches: "7:00 AM – 11:00 AM" },
} as const;

export const ADDRESS_ONE_LINE = `${BUSINESS.address.line1}, ${BUSINESS.address.line2}, ${BUSINESS.address.state}`;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_ONE_LINE)}`;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WHATSAPP_GENERAL = whatsappLink("Hi Bearkery Box Pastry! I'd like to ask about your bakes.");
export const WHATSAPP_SPECIAL_ORDER = whatsappLink("Hi Bearkery Box Pastry! I'd like to enquire about a special order.");
