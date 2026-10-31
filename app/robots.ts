import { MetadataRoute } from "next";
import { SITE_URL, SITE_URL_IS_PLACEHOLDER } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/cart", "/checkout", "/order-confirmation"],
    },
    // Don't advertise a sitemap full of placeholder-domain links; it appears
    // once NEXT_PUBLIC_SITE_URL is set to the real domain.
    ...(SITE_URL_IS_PLACEHOLDER ? {} : { sitemap: `${SITE_URL}/sitemap.xml` }),
  };
}
