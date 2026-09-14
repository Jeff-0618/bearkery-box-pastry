import { MessageCircle } from "lucide-react";
import { WHATSAPP_SPECIAL_ORDER, BUSINESS } from "@/lib/business";
import Reveal from "@/components/shared/Reveal";

/**
 * Special orders are arranged person to person over WhatsApp — never through
 * a cart. The section is kept plain and typographic: an abstract symbol here
 * said nothing, so the words and the action carry it instead.
 */
export default function SpecialOrders() {
  return (
    <section className="section bg-milk">
      <div className="container-bx">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="t-eyebrow">Special Orders</p>
          <h2 className="t-heading mt-4">Something special in mind?</h2>
          <p className="t-body mx-auto mt-4 max-w-md">
            Baby celebration boxes, traditional ceremony gifts, custom and
            corporate orders — arranged personally with you, at your pace.
          </p>

          <a
            href={WHATSAPP_SPECIAL_ORDER}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            <MessageCircle size={16} />
            Talk to Our Team
          </a>
          <p className="t-caption mt-4">
            Message us on WhatsApp · {BUSINESS.phoneDisplay}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
