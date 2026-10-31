"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { VISIBLE_COLLECTIONS } from "@/lib/data";
import { useLang } from "@/lib/language";
import { collectionText } from "@/lib/localize";
import { cx } from "@/lib/utils";
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
  const { t, lang } = useLang();
  const pathname = usePathname() ?? "";
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // A link tapped inside the drawer navigates; make sure the drawer follows.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Stop the page behind the drawer from scrolling while it's open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard behaviour for the drawer: Escape closes it, Tab stays inside it,
  // focus moves in on open and returns to the menu button on close.
  useEffect(() => {
    if (!open) return;
    const opener = menuButtonRef.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
          aria-label={t("nav.homeAria")}
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
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cx(
                "text-sm font-medium transition hover:text-teddy",
                isActive(link.href) ? "text-teddy" : "text-cocoa"
              )}
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
            <ShoppingBag size={18} strokeWidth={1.75} aria-hidden="true" />
            {count > 0 && (
              <span key={count} aria-hidden="true" className="animate-popIn absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teddy px-1 text-[11px] font-bold text-milk">
                {count}
              </span>
            )}
          </Link>
          <button
            ref={menuButtonRef}
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cocoa sm:h-11 sm:w-11 md:hidden"
            aria-label={t("nav.openMenu")}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <Menu size={18} aria-hidden="true" />
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
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.menu")}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="ml-auto flex h-full w-4/5 max-w-xs flex-col overflow-y-auto bg-milk p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">{t("nav.menu")}</span>
                <button
                  ref={closeButtonRef}
                  onClick={() => setOpen(false)}
                  aria-label={t("nav.closeMenu")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
              <nav className="flex flex-col gap-5" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cx(
                      "text-base font-medium",
                      isActive(link.href) ? "text-teddy" : "text-cocoa"
                    )}
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
                      {collectionText(c, lang).name}
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
