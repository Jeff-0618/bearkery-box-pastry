"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_GENERAL } from "@/lib/business";
import { cx } from "@/lib/utils";
import { useLang } from "@/lib/language";

/**
 * A persistent WhatsApp button.
 *
 * Online payment isn't live, so WhatsApp is how every order actually gets
 * placed. That path should never be more than one tap away — particularly for
 * someone who has just scanned a QR code at a market stall and is standing in
 * front of the counter deciding.
 *
 * Appears after a short scroll so it doesn't cover the opening view, and sits
 * clear of the cart button in the header.
 */
export default function WhatsappFab() {
  const [shown, setShown] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_GENERAL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("fab.order")}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      className={cx(
        "fixed right-4 z-[80] flex items-center gap-2 rounded-pill bg-[#25D366] px-4 py-3 sm:right-5 sm:px-5 sm:py-3.5",
        "text-sm font-semibold text-white shadow-lifted transition-all duration-500 ease-gentle",
        "hover:brightness-105 active:scale-95",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <MessageCircle size={18} strokeWidth={2.2} />
      <span className="hidden sm:inline">{t("fab.order")}</span>
      <span className="sm:hidden">{t("fab.orderShort")}</span>
    </a>
  );
}
