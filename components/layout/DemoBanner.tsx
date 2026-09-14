import { MessageCircle } from "lucide-react";
import { IS_DEMO } from "@/lib/payment";
import { WHATSAPP_GENERAL, BUSINESS } from "@/lib/business";

/**
 * Until online payment is live, every order is placed over WhatsApp.
 *
 * The wording matters: this should read as "here's how you order", not as a
 * warning that the site is unfinished. But it must still be unambiguous that
 * nothing is paid for on the site itself — a customer who believes they've
 * paid, and then finds no cake waiting, is the worst outcome.
 */
export default function DemoBanner() {
  if (!IS_DEMO) return null;

  return (
    <div className="border-b border-line bg-peach/70">
      <div className="container-bx flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 py-2 text-center text-xs text-cocoa">
        <span>Orders are confirmed over WhatsApp — no payment is taken on this site.</span>
        <a
          href={WHATSAPP_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-caramel underline underline-offset-2"
        >
          <MessageCircle size={13} />
          {BUSINESS.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
