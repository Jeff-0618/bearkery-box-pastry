import Link from "next/link";
import { VISIBLE_COLLECTIONS } from "@/lib/data";
import { BearMark } from "./Header";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream">
      <div className="container-bx grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <BearMark />
            <span className="font-display text-lg font-semibold">Bearkery Box</span>
          </div>
          <p className="text-sm leading-relaxed text-taupe">
            Handmade cakes and gift boxes, baked warm with every blessing in mind.
          </p>
        </div>

        <div>
          <p className="label-bx">Collections</p>
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
          <p className="label-bx">Company</p>
          <ul className="flex flex-col gap-2.5">
            <li><Link href="/about" className="text-sm text-taupe hover:text-teddy">Our Story</Link></li>
            <li><Link href="/faq" className="text-sm text-taupe hover:text-teddy">FAQ</Link></li>
            <li><Link href="/contact" className="text-sm text-taupe hover:text-teddy">Contact</Link></li>
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
          <p>© {new Date().getFullYear()} Bearkery Box Pastry. All rights reserved.</p>
          <p>Made with warmth, sugar, and a little bit of bear magic.</p>
        </div>
      </div>
    </footer>
  );
}
