"use client";

import Link from "next/link";
import { VISIBLE_COLLECTIONS } from "@/lib/data";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-line bg-cream">
      <div className="container-bx grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Bearkery Box Pastry"
              width={160}
              height={115}
              className="h-auto w-32"
            />
          </div>
          <p className="text-sm leading-relaxed text-taupe">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <p className="label-bx">{t("footer.collections")}</p>
          <ul className="flex flex-col gap-2.5">
            {VISIBLE_COLLECTIONS.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="text-sm text-taupe hover:text-teddy">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-bx">{t("footer.company")}</p>
          <ul className="flex flex-col gap-2.5">
            <li><Link href="/about" className="text-sm text-taupe hover:text-teddy">{t("nav.story")}</Link></li>
            <li><Link href="/faq" className="text-sm text-taupe hover:text-teddy">{t("nav.faq")}</Link></li>
            <li><Link href="/contact" className="text-sm text-taupe hover:text-teddy">{t("nav.contact")}</Link></li>
            <li><Link href="/collections" className="text-sm text-taupe hover:text-teddy">All Collections</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-bx">Stay close to the oven</p>
          <p className="mb-3 text-sm text-taupe">
            New collections and gifting ideas, once or twice a month.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-line py-6">
        <div className="container-bx flex flex-col items-center justify-between gap-3 text-xs text-taupe sm:flex-row">
          <p>© {new Date().getFullYear()} Bearkery Box Pastry. {t("footer.rights")}</p>
          <p>Made with warmth, sugar, and a little bit of bear magic.</p>
        </div>
      </div>
    </footer>
  );
}
