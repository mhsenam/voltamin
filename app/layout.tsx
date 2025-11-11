import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "@/styles/globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3B82F6",
};

export const metadata: Metadata = {
  title: "VOLTAMIN ELECTRIC - Electrical Specialist | Saeid Amini",
  description:
    "Professional electrical specialist with 15 years of experience. Services include installation, repair, and maintenance of electrical systems",
  keywords: [
    "electrical specialist",
    "electrician",
    "installation",
    "repair",
    "maintenance",
    "solar energy",
    "VOLTAMIN ELECTRIC",
  ],
  authors: [{ name: "Saeid Amini" }],
  metadataBase: new URL("https://voltaminelectric.com"),
  openGraph: {
    title: "VOLTAMIN ELECTRIC - Professional Electrical Services",
    description: "Expert electrical services with 15 years of experience",
    url: "https://voltaminelectric.com",
    siteName: "VOLTAMIN ELECTRIC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={vazir.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={`overflow-x-hidden`}>{children}</body>
    </html>
  );
}
