import { MetadataRoute } from "next";
import { VISIBLE_COLLECTIONS, VISIBLE_PRODUCTS } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// Pages that are personal to a visitor (/cart, /checkout, /order-confirmation)
// and /admin are deliberately left out.
const STATIC_ROUTES = ["", "/collections", "/about", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const collectionRoutes = VISIBLE_COLLECTIONS.map((c) => ({
    url: `${SITE_URL}/collections/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = VISIBLE_PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
