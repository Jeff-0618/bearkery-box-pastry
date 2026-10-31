import type { Metadata } from "next";

// The admin page is a "use client" component, which can't export metadata,
// so the search-engine opt-out lives here.
export const metadata: Metadata = {
  title: "Orders & Reports",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
