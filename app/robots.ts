import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  const { business } = siteConfig;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The email API takes POSTs only and returns no indexable content.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${business.url}/sitemap.xml`,
  };
}
