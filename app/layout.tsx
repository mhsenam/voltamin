import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const { business, proof, seo, social } = siteConfig;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D1728",
};

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: business.owner }],
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: business.url,
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// LocalBusiness structured data — helps the profile surface in local search
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: business.name,
  image: `${business.url}/images/1366 (22).webp`,
  url: business.url,
  telephone: business.phoneRaw,
  email: business.email,
  priceRange: business.priceRange,
  founder: { "@type": "Person", name: business.owner },
  address: {
    "@type": "PostalAddress",
    addressLocality: business.city,
    addressRegion: business.state,
    addressCountry: "US",
  },
  areaServed: siteConfig.serviceAreas.map((city) => ({
    "@type": "City",
    name: `${city}, CA`,
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: proof.rating,
    reviewCount: proof.reviewCount,
    bestRating: 5,
  },
  hasCredential: `CSLB ${business.licenseClass} License #${business.license}`,
  sameAs: [social.instagram, social.facebook],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="overflow-x-hidden">
        {children}
        <noscript>
          <style>{"[data-hero]{visibility:visible}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
