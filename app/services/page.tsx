import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { servicePages } from "@/lib/service-pages";
import { serviceIcons } from "@/lib/service-icons";
import { breadcrumbJsonLd, servicePath } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";

const { business } = siteConfig;

export const metadata: Metadata = {
  title: "Electrical Services in Orange County",
  description:
    "All Voltamin Electric services: panel upgrades, EV chargers, troubleshooting, lighting, wiring, outlets, fans, breakers, smart home, and security cameras. Free on-site estimate.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Electrical Services in Orange County",
    description:
      "All Voltamin Electric services: panel upgrades, EV chargers, troubleshooting, lighting, wiring, outlets, fans, breakers, smart home, and security cameras.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesIndex() {
  const jsonLd = breadcrumbJsonLd("/services", "Services");

  return (
    <>
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]"
          />
          {/* Extra top padding clears the transparent sticky header */}
          <div className="shell relative pt-28 pb-16 md:py-24">
            <p className="eyebrow !text-navy-300">What we do</p>
            <h1 className="display mt-6 text-4xl sm:text-5xl md:text-[3.4rem]">
              Electrical services
              <span className="block text-gold">in Orange County, CA</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-navy-200">
              {business.intro} Every job starts with a genuinely free, no-obligation
              service call.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${business.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-gold px-5 py-3 text-[14px] font-bold text-navy-950 transition-colors hover:bg-gold-400"
              >
                <Phone className="h-4 w-4" />
                Call {business.phone}
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-white/20 px-5 py-3 text-[14px] font-semibold transition-colors hover:border-white/50"
              >
                Request a free estimate
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="shell">
            <div className="grid gap-6 md:grid-cols-2">
              {servicePages.map((page, i) => {
                const Icon = serviceIcons[page.icon];
                const configService = siteConfig.services.find((s) =>
                  s.title.startsWith(page.name.split(" & ")[0])
                );
                return (
                  <article
                    key={page.slug}
                    className="group flex flex-col rounded-[6px] border border-border p-6 transition-colors hover:border-gold md:p-8"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        {Icon && <Icon className="h-5 w-5 text-gold-600" />}
                        <h2 className="text-[19px] font-semibold leading-snug text-navy-950 group-hover:text-gold-700">
                          <Link href={servicePath(page.slug)}>{page.name}</Link>
                        </h2>
                      </span>
                      <span className="text-[12px] font-semibold tabular-nums text-gold-700">
                        / {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">
                      {configService?.description}
                    </p>
                    <Link
                      href={servicePath(page.slug)}
                      className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-navy-900 transition-colors hover:text-gold-700"
                    >
                      {page.name} in Orange County
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCallBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
