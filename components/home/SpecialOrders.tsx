import { MessageCircle } from "lucide-react";
import { WHATSAPP_SPECIAL_ORDER } from "@/lib/business";
import Bear from "@/components/shared/Bear";
import Reveal from "@/components/shared/Reveal";

/**
 * Special orders are handled person to person, never through a cart.
 * The bear is holding the gift box the section is about — his reason for
 * being here is that he's carrying the thing you'd be ordering.
 */
export default function SpecialOrders() {
  return (
    <section className="section bg-milk">
      <div className="container-bx">
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <div className="relative mx-auto mb-2 h-40 w-40 sm:h-48 sm:w-48">
            <Bear slot="gift-box" gaze className="h-full w-full" />
            <div
              aria-hidden="true"
              className="absolute -bottom-1 left-1/2 h-5 w-2/5 -translate-x-1/2 rounded-[50%] bg-cocoa/[0.07] blur-lg"
            />
          </div>

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
        </Reveal>
      </div>
    </section>
  );
}
