import type { Metadata } from "next";
import AboutClient from "./AboutClient";

/**
 * Server shell.
 *
 * `metadata` can only be exported from a server component, and a component
 * that calls useLang() has to be a client one — so the page splits in two,
 * the same way the product page already does. Everything a visitor reads
 * lives in AboutClient; this file exists for the crawler.
 *
 * The metadata stays English because it is one fixed string per route and
 * the site serves both languages from the same URL. Translating it would
 * mean picking a language for the crawler that the visitor may not be
 * reading in.
 */
export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn the story behind Bearkery Box Pastry — a family bakery built on warmth, blessings, and handmade craft, with a little teddy bear at its heart.",
};

export default function AboutPage() {
  return <AboutClient />;
}
