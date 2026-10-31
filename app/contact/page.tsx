import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Bearkery Box Pastry for orders, pickup, or special requests.",
};

export default function ContactPage() {
  return <ContactContent />;
}
