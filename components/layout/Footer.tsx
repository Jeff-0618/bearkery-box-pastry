"use client";

import Link from "next/link";
import { VISIBLE_COLLECTIONS } from "@/lib/data";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { useLang } from "@/lib/language";
import { collectionText } from "@/lib/localize";
import { FORMS_ENABLED } from "@/lib/forms";

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="mt-24 border-t border-line bg-cream">
      <div
        className={`container-bx grid gap-12 py-16 ${FORMS_ENABLED ? "md:grid-cols-4" : "md:grid-cols-3"}`}
      >
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
                  {collectionText(c, lang).name}
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
            <li><Link href="/collections" className="text-sm text-taupe hover:text-teddy">{t("footer.allCollections")}</Link></li>
          </ul>
        </div>

        {/* Hidden until a form key is configured — a box that swallows an
            email and sends it nowhere is worse than no box. */}
        {FORMS_ENABLED && (
          <div>
            <p className="label-bx">{t("footer.newsletterTitle")}</p>
            <p className="mb-3 text-sm text-taupe">{t("footer.newsletterBody")}</p>
            <NewsletterForm />
          </div>
        )}
      </div>

      <div className="border-t border-line py-6">
        <div className="container-bx flex flex-col items-center justify-between gap-3 text-xs text-taupe sm:flex-row">
          <p>© {new Date().getFullYear()} Bearkery Box Pastry. {t("footer.rights")}</p>
          <p>{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
