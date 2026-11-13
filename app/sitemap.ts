import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { SERVICE_SLUGS, servicePath } from "@/lib/seo";

// Every published, indexable page. API routes and anything nonexistent are
// deliberately absent.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const { business } = siteConfig;

  return [
    {
      url: business.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${business.url}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${business.url}${servicePath(slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
