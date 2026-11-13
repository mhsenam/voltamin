/**
 * Structured-data builders. Kept as pure functions over siteConfig so
 * lib/seo.check.ts can assert on the exact JSON that ships to the page.
 *
 * Policy notes (Google structured-data guidelines):
 *  - No aggregateRating anywhere: the 5.0/106 figures are Thumbtack's, and
 *    reviews a business marks up about itself are "self-serving" for
 *    LocalBusiness/Organization and ineligible for rich results. Combining
 *    platform ratings is not allowed either, so the rating lives in visible
 *    text only, attributed to its platform.
 *  - No street address: Voltamin is a service-area business, so the markup
 *    carries city/state plus areaServed instead of inventing a public address.
 */
// Relative with an explicit extension so the offline check script can run
// this module under plain node (same pattern as lib/reviews.ts).
import { siteConfig } from "../config/site.config.ts";

type JsonLd = Record<string, unknown>;

const { business, social, faqs, serviceAreas, services } = siteConfig;

export const SERVICE_SLUGS = [
  "electrical-panel-upgrade",
  "ev-charger-installation",
  "electrical-troubleshooting",
  "lighting-installation",
  "electrical-wiring",
  "outlet-and-switch-installation",
  "ceiling-fan-installation",
  "circuit-breaker-replacement",
  "smart-home-electrical",
  "security-camera-installation",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const servicePath = (slug: ServiceSlug) => `/services/${slug}`;

/** Exact siteConfig.services title → landing page slug (homepage card links). */
export const serviceSlugByTitle: Record<string, ServiceSlug> = {
  "Lighting Installation & Upgrades": "lighting-installation",
  "Electrical Panel Upgrades": "electrical-panel-upgrade",
  "EV Charger Installation": "ev-charger-installation",
  "Electrical Troubleshooting & Repair": "electrical-troubleshooting",
  "Outlets, Switches & GFCI/AFCI": "outlet-and-switch-installation",
  "Electrical Wiring & Rewiring": "electrical-wiring",
  "Circuit Breaker Installation & Replacement": "circuit-breaker-replacement",
  "Ceiling Fan Installation": "ceiling-fan-installation",
  "Smart Home & Electrical Automation": "smart-home-electrical",
  "Security Cameras & Smart Doorbells": "security-camera-installation",
};

/** Electrician (LocalBusiness) + WebSite, in one @graph on the homepage. */
export const homeJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Electrician",
      "@id": `${business.url}/#business`,
      name: business.name,
      description: business.intro,
      url: business.url,
      telephone: business.phoneRaw,
      email: business.email,
      priceRange: business.priceRange,
      image: [
        `${business.url}/images/logo.jpeg`,
        `${business.url}/images/cover.jpeg`,
      ],
      logo: `${business.url}/images/logo.jpeg`,
      founder: { "@type": "Person", name: business.owner },
      address: {
        "@type": "PostalAddress",
        addressLocality: business.city,
        addressRegion: business.state,
        addressCountry: "US",
      },
      areaServed: serviceAreas.map((city) => ({
        "@type": "City",
        name: `${city}, CA`,
      })),
      hasCredential: `CSLB ${business.licenseClass} License #${business.license}`,
      sameAs: [social.instagram, social.facebook, social.google],
    },
    {
      "@type": "WebSite",
      "@id": `${business.url}/#website`,
      url: business.url,
      name: business.name,
      publisher: { "@id": `${business.url}/#business` },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": `${business.url}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
});

/** FAQPage for a service page — only questions visibly answered on that page. */
export const faqJsonLd = (
  url: string,
  entries: { question: string; answer: string }[]
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: entries.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

/** BreadcrumbList for an internal page (Home → Services → service page). */
export const breadcrumbJsonLd = (path: string, name: string): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${business.url}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${business.url}/services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name,
      item: `${business.url}${path}`,
    },
  ],
});

/** Service markup for a service landing page. */
export const serviceJsonLd = (
  path: string,
  name: string,
  description: string
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  description,
  provider: { "@id": `${business.url}/#business` },
  areaServed: { "@type": "State", name: "California" },
  url: `${business.url}${path}`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${business.name} services`,
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
  },
});
