import { MessageCircle } from "lucide-react";
import { whatsappLink, BUSINESS } from "@/lib/business";
import Reveal from "@/components/shared/Reveal";

/**
 * Special orders.
 *
 * These are never sold through the cart — they're arranged one at a time in
 * conversation, which is the client's own working method and also the honest
 * way to sell something that has to be discussed before it can be quoted.
 *
 * The copy names the occasions plainly (a customer searching for 满月礼盒
 * needs to recognise themselves here), explains how it works so nobody has
 * to guess, and makes the first message easy to send.
 */
const OCCASIONS = [
  {
    title: "Full Moon Celebrations",
    body: "For a baby's first month — boxes to share with family, neighbours and everyone who's been waiting to meet them.",
    message: "Hi Bearkery Box Pastry! I'd like to ask about a full moon celebration gift box.",
  },
  {
    title: "Betrothal Gift Boxes",
    body: "For engagements and the traditional exchange between families, arranged with the care the occasion asks for.",
    message: "Hi Bearkery Box Pastry! I'd like to ask about a betrothal gift box.",
  },
  {
    title: "Corporate & Bulk Orders",
    body: "For teams, clients and open houses — individually boxed, delivered together.",
    message: "Hi Bearkery Box Pastry! I'd like to ask about a corporate or bulk order.",
  },
  {
    title: "Something Else Entirely",
    body: "A shape you've imagined, a flavour you remember, a box that needs to say something particular.",
    message: "Hi Bearkery Box Pastry! I have a custom order in mind.",
  },
];

export default function SpecialOrders() {
  return (
    <section className="section bg-milk">
      <div className="container-bx">
        <Reveal className="mx-auto mb-12 max-w-xl text-center">
          <p className="t-eyebrow">Made to Order</p>
          <h2 className="t-heading mt-4">Some boxes deserve a conversation</h2>
          <p className="t-body mx-auto mt-4">
            These aren&apos;t on the menu, and that&apos;s on purpose. Tell us the
            occasion, roughly how many, and what it should feel like — we&apos;ll
            work out the rest with you, one message at a time.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.07}>
              <a
                href={whatsappLink(o.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="paper group flex h-full flex-col p-6 transition-shadow duration-500 hover:shadow-lifted"
              >
                <h3 className="font-display text-lg text-cocoa">{o.title}</h3>
                <p className="t-caption mt-2 flex-1">{o.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-caramel">
                  <MessageCircle size={13} />
                  Start a conversation
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="t-caption">
            We reply during pickup hours, {BUSINESS.hours.general} · {BUSINESS.phoneDisplay}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
