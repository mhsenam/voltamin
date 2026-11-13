import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import { homeJsonLd } from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Closest Google match to the lettering in the logo, for the wordmark only.
const slab = Roboto_Slab({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-slab",
  display: "swap",
});

const { business, seo } = siteConfig;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D1728",
};

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    // Homepage title; internal pages get "<page> | Voltamin Electric".
    default: seo.title,
    template: `%s | ${business.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: business.owner }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Electrical Contractor",
};

// LocalBusiness + WebSite + FAQPage structured data — all three describe
// content that is visible on the homepage. Deliberately no aggregateRating:
// the 5.0/106 figures are Thumbtack's, and self-serving review markup on
// LocalBusiness entities is ineligible under Google's guidelines.
const jsonLd = homeJsonLd();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${slab.variable}`}>
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
