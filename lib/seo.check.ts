// Run with: npm run check:site
// Guards the structured data shipped on the homepage and service pages.
import assert from "node:assert/strict";
import { siteConfig } from "../config/site.config.ts";
import {
  homeJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  serviceJsonLd,
  SERVICE_SLUGS,
  serviceSlugByTitle,
} from "./seo.ts";

const CANONICAL = "https://www.voltaminelectric.com";
const { business } = siteConfig;

// Canonical host: every URL in the markup must use the www domain.
assert.equal(business.url, CANONICAL);

const home = homeJsonLd() as {
  "@graph": { "@type": string; [key: string]: unknown }[];
};

// One graph with exactly the three entities visible on the homepage.
assert.deepEqual(
  home["@graph"].map((node) => node["@type"]).sort(),
  ["Electrician", "FAQPage", "WebSite"]
);

// No aggregateRating anywhere — self-serving review markup is ineligible for
// LocalBusiness and platform ratings must not be combined.
const noRatings = JSON.stringify(home);
assert.equal(noRatings.includes("aggregateRating"), false);
assert.equal(noRatings.includes("reviewCount"), false);
assert.equal(noRatings.includes("ratingValue"), false);

// Business facts stay accurate.
const electrician = home["@graph"].find((n) => n["@type"] === "Electrician")!;
assert.equal(electrician.name, business.name);
assert.equal(electrician.telephone, business.phoneRaw);
assert.equal(
  electrician.hasCredential,
  `CSLB ${business.licenseClass} License #${business.license}`
);
assert.equal(electrician.url, CANONICAL);
assert.equal(
  (electrician.address as Record<string, string>).addressLocality,
  "Lake Forest"
);
// No street address: service-area business.
assert.equal("streetAddress" in (electrician.address as object), false);

// FAQPage mirrors the visible FAQ list exactly.
const homeFaq = home["@graph"].find((n) => n["@type"] === "FAQPage")! as unknown as {
  mainEntity: { name: string; acceptedAnswer: { text: string } }[];
};
assert.equal(homeFaq.mainEntity.length, siteConfig.faqs.length);
for (const [i, question] of homeFaq.mainEntity.entries()) {
  assert.equal(question.name, siteConfig.faqs[i].question);
  assert.equal(question.acceptedAnswer.text, siteConfig.faqs[i].answer);
}

// Breadcrumbs: Home → Services → page, absolute and canonical.
const crumb = breadcrumbJsonLd("/services/ev-charger-installation", "EV Charger Installation") as {
  itemListElement: { position: number; name: string; item: string }[];
};
assert.deepEqual(
  crumb.itemListElement.map((item) => item.item),
  [
    `${CANONICAL}/`,
    `${CANONICAL}/services`,
    `${CANONICAL}/services/ev-charger-installation`,
  ]
);

// Service markup references the provider entity and stays on the domain.
const service = serviceJsonLd(
  "/services/ev-charger-installation",
  "EV Charger Installation",
  "desc"
) as { provider: { "@id": string }; url: string };
assert.equal(service.provider["@id"], `${CANONICAL}/#business`);
assert.equal(service.url, `${CANONICAL}/services/ev-charger-installation`);

// A page FAQ block only carries questions answered on that page.
const pageFaq = faqJsonLd(`${CANONICAL}/services/ev-charger-installation`, [
  { question: "Q1", answer: "A1" },
]) as { "@type": string; mainEntity: unknown[] };
assert.equal(pageFaq["@type"], "FAQPage");
assert.equal(pageFaq.mainEntity.length, 1);

// Every homepage service has a landing page, and the title→slug map is exact.
assert.deepEqual(
  Object.values(serviceSlugByTitle).sort(),
  [...SERVICE_SLUGS].sort()
);
for (const service of siteConfig.services) {
  assert.ok(
    serviceSlugByTitle[service.title],
    `missing slug for config service: ${service.title}`
  );
}

console.log("seo checks passed");
