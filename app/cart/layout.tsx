import type { Metadata } from "next";

// Personal, per-visitor pages: nothing here belongs in search results.
export const metadata: Metadata = {
  title: "Your Gift Basket",
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
