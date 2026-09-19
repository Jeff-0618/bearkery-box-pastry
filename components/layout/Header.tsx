"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { VISIBLE_COLLECTIONS } from "@/lib/data";
import { useLang } from "@/lib/language";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/collections", key: "nav.collections" },
  { href: "/about", key: "nav.story" },
  { href: "/faq", key: "nav.faq" },
  { href: "/contact", key: "nav.contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Stop the page behind the drawer from scrolling while it's open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    {/*
      The header is a single row that must never wrap. On a phone the four
      controls plus the wordmark came to more than the viewport width, so the
      wordmark broke onto a second line and its descenders landed beside the
      theme button. The fix is width, not layout: the brand block is allowed
      to shrink and is clipped rather than wrapped, and every control is a
      little smaller below `sm`.

      The backdrop blur is desktop-only. Blurring what is behind a sticky bar
      forces the phone to recompose that blur on every scroll frame, which is
      the single most expensive thing on this page while scrolling.
    */}
    <header className="sticky top-0 z-50 border-b border-line bg-milk md:bg-milk/85 md:backdrop-blur-md">
      <div className="container-bx flex h-20 items-center justify-between gap-2">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 overflow-hidden sm:gap-2.5"
          aria-label="Bearkery Box Pastry home"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={40}
            height={31}
            priority
            className="h-7 w-auto shrink-0 sm:h-8"
          />
          <span className="whitespace-nowrap font-display text-base font-semibold tracking-tight text-cocoa sm:text-xl">
            Bearkery <span className="italic text-teddy">Box</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cocoa transition hover:text-teddy"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <ThemeToggle />
          <LanguageToggle />
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-cocoa transition hover:bg-cream sm:h-11 sm:w-11"
            aria-label={`${t("nav.cart")} (${count})`}
          >
            <ShoppingBag size={18} strokeWidth={1.75} />
            {count > 0 && (
              <span key={count} className="animate-popIn absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teddy px-1 text-[11px] font-bold text-milk">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cocoa sm:h-11 sm:w-11 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>

    {/* Rendered outside <header> on purpose — see note above. */}
    {mounted &&
      createPortal(
        <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-cocoa/50 md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="ml-auto flex h-full w-4/5 max-w-xs flex-col bg-milk p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">{t("nav.menu")}</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
                >
                  <X size={16} />
                </button>
              </div>
              <nav className="flex flex-col gap-5" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-cocoa"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 border-t border-line pt-6">
                <p className="label-bx">{t("nav.shopByCollection")}</p>
                <div className="flex flex-col gap-3">
                  {VISIBLE_COLLECTIONS.slice(0, 4).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/collections/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-sm text-taupe hover:text-teddy"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export function BearMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={40}
      height={31}
      className={`h-8 w-auto ${className}`}
    />
  );
}
