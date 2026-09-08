import { MetadataRoute } from "next";
import { VISIBLE_COLLECTIONS, VISIBLE_PRODUCTS } from "@/lib/data";

const BASE_URL = "https://bearkerybox.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collections", "/about", "/faq", "/contact", "/cart"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const collectionRoutes = VISIBLE_COLLECTIONS.map((c) => ({
    url: `${BASE_URL}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = VISIBLE_PRODUCTS.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
