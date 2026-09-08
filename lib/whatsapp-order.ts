import { CartItem, CustomerDetails, FulfillmentMethod } from "./types";
import { formatPrice, formatReadableDate } from "./utils";
import { whatsappLink } from "./business";

/**
 * Turns a cart into a plain-text WhatsApp message.
 * This is the REAL ordering path: the customer is handed off to WhatsApp with
 * everything prefilled, so the bakery receives a complete order with no
 * payment integration required.
 */
export function buildOrderMessage({
  orderId, items, customer, fulfillment, subtotal,
}: {
  orderId: string;
  items: CartItem[];
  customer: CustomerDetails;
  fulfillment: FulfillmentMethod;
  subtotal: number;
}): string {
  const lines: string[] = [];
  lines.push("Hi Bearkery Box Pastry! I'd like to place an order.", "", `Order ref: ${orderId}`, "", "--- ITEMS ---");

  for (const item of items) {
    lines.push(`• ${item.name} (${item.variant.label}) x${item.quantity} — ${formatPrice(item.unitPrice * item.quantity)}`);
    if (item.gift.cakeMessage) lines.push(`   Cake message: "${item.gift.cakeMessage}"`);
    if (item.gift.recipientName) lines.push(`   For: ${item.gift.recipientName}`);
    if (item.gift.specialRequest) lines.push(`   Note: ${item.gift.specialRequest}`);
  }

  lines.push("", `Subtotal: ${formatPrice(subtotal)}`, "", "--- DETAILS ---");
  lines.push(`Name: ${customer.fullName}`, `Phone: ${customer.phone}`);
  if (customer.email) lines.push(`Email: ${customer.email}`);
  lines.push(`Method: ${fulfillment === "pickup" ? "Pickup" : "Delivery"}`);

  const firstDate = items[0]?.deliveryDate;
  if (firstDate) lines.push(`${fulfillment === "pickup" ? "Pickup" : "Delivery"} date: ${formatReadableDate(firstDate)}`);
  if (fulfillment === "delivery" && customer.address) {
    lines.push(`Address: ${customer.address}, ${customer.city} ${customer.postalCode}`.trim());
  }
  if (customer.notes) lines.push("", `Notes: ${customer.notes}`);
  lines.push("", "Please confirm availability and total. Thank you!");
  return lines.join("\n");
}

export function buildOrderWhatsappLink(args: Parameters<typeof buildOrderMessage>[0]) {
  return whatsappLink(buildOrderMessage(args));
}
