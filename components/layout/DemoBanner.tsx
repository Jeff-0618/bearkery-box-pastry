import { MessageCircle } from "lucide-react";
import { IS_DEMO } from "@/lib/payment";
import { WHATSAPP_GENERAL, BUSINESS } from "@/lib/business";

/**
 * While the shop is in demo mode, every page says so. A customer must never
 * be able to believe they have placed and paid for a real order when they
 * haven't — that costs the business trust and costs the customer their
 * celebration.
 */
export default function DemoBanner() {
  if (!IS_DEMO) return null;

  return (
    <div className="border-b border-line bg-peach/70">
      <div className="container-bx flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-xs text-cocoa">
        <span>
          <strong className="font-semibold">Preview site.</strong> Online payment
          isn&apos;t live yet — orders here are test orders only.
        </span>
        <a
          href={WHATSAPP_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-caramel underline underline-offset-2"
        >
          <MessageCircle size={13} />
          Order on WhatsApp {BUSINESS.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
