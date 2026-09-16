import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import FaqAccordion from "./FaqAccordion";
import { BUSINESS, ADDRESS_ONE_LINE } from "@/lib/business";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about preordering, pickup, and ordering from Bearkery Box Pastry.",
};

const FAQS = [
  {
    q: "How do I place an order?",
    a: "Choose what you'd like on the site, then send the order through WhatsApp at checkout — your selections, dates and details are filled in for you. We'll reply to confirm availability, the final total, and payment.",
  },
  {
    q: "Do you take payment on the website?",
    a: "Not yet. Everything is confirmed and paid directly with us over WhatsApp, so nothing is charged through the site.",
  },
  {
    q: "How far in advance do I need to preorder?",
    a: "Sandwiches need a day's notice, Pudding Burnt Cakes and Bento Cakes need two, and 6 inch cakes need three. The exact lead time is shown on each product page, and the date picker only offers valid dates.",
  },
  {
    q: "What time can I pick up the breakfast sandwiches?",
    a: `Sandwiches are hand-packed fresh each morning and available for pickup between ${BUSINESS.hours.sandwiches}, while supplies last. Other bakes follow our general pickup hours of ${BUSINESS.hours.general}.`,
  },
  {
    q: "Where do I collect my order?",
    a: `From our bakery at ${ADDRESS_ONE_LINE}. You can call or WhatsApp us at ${BUSINESS.phoneDisplay} if you need help finding us.`,
  },
  {
    q: "Some flavours show 'Price on request' — why?",
    a: "A few flavours are priced individually depending on what you need. Message us on WhatsApp and we'll confirm the price before you order.",
  },
  {
    q: "Can I order a custom or celebration gift box?",
    a: "Yes — baby celebration boxes, traditional ceremony gifts, custom and corporate orders are arranged personally rather than through the cart. Use the Talk to Our Team button and we'll plan it with you.",
  },
  {
    q: "What if I have a food allergy?",
    a: "Each product lists common allergens. You can also leave a note in the Special Request field, and our kitchen team will reach out if there's anything to confirm.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-bx page">
      <SectionHeading
        t-eyebrow="Good to know"
        title="Frequently asked questions"
        description="Everything you need to know before you order."
      />
      <FaqAccordion items={FAQS} />
    </div>
  );
}
