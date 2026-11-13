import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone, ArrowRight, MapPin } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { Contact } from "@/components/contact";
import { serviceBySlug, servicePages } from "@/lib/service-pages";
import { serviceIcons } from "@/lib/service-icons";
import { SERVICE_SLUGS, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, servicePath } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";

const { business } = siteConfig;

// Every page is prerendered at build; unknown slugs 404 rather than render.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = serviceBySlug(params.slug);
  if (!page) return {};
  const url = servicePath(page.slug);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
    },
  };
}

// Honest, generic gallery strip — the photos come from the same work gallery as
// the homepage, without claiming any of them shows this specific service.
const galleryPhotos = ["/images/google-04.webp", "/images/google-12.webp", "/images/google-24.webp"];

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = serviceBySlug(params.slug);
  if (!page) notFound();

  const url = servicePath(page.slug);
  const related = page.related
    .map((slug) => servicePages.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // One script block per entity keeps each type independently validatable.
  const jsonLd = [
    serviceJsonLd(url, page.name, page.metaDescription),
    breadcrumbJsonLd(url, page.name),
    faqJsonLd(`${business.url}${url}`, page.faqs),
  ];

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]"
          />
          {/* Extra top padding clears the transparent sticky header */}
          <div className="shell relative pt-28 pb-16 md:py-24">
            <nav aria-label="Breadcrumb" className="mb-8 text-[12.5px] text-navy-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-gold">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/services" className="transition-colors hover:text-gold">
                    Services
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-navy-100">
                  {page.name}
                </li>
              </ol>
            </nav>

            <p className="eyebrow !text-navy-300">Electrical services</p>
            <h1 className="display mt-6 text-4xl sm:text-5xl md:text-[3.4rem]">
              {page.name}
              <span className="block text-gold">in Orange County, CA</span>
            </h1>
            <div className="mt-8 max-w-2xl space-y-4 text-[15.5px] leading-relaxed text-navy-200">
              {page.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${business.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-gold px-5 py-3 text-[14px] font-bold text-navy-950 transition-colors hover:bg-gold-400"
              >
                <Phone className="h-4 w-4" />
                Call {business.phone}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-white/20 px-5 py-3 text-[14px] font-semibold transition-colors hover:border-white/50"
              >
                Get a free estimate
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 text-[12.5px] text-navy-300">
              {business.licenseClass} Licensed, Bonded &amp; Insured · CSLB #{business.license} ·
              Based in {business.city}
            </p>
          </div>
        </section>

        {/* Problems */}
        <section className="bg-white py-16 md:py-24">
          <div className="shell">
            <p className="eyebrow">When to call</p>
            <h2 className="display mt-6 text-3xl text-navy-950 sm:text-4xl">
              Sound familiar?
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {page.problems.map((problem) => (
                <article
                  key={problem.title}
                  className="rounded-[6px] border border-border p-6"
                >
                  <h3 className="text-[16.5px] font-semibold leading-snug text-navy-950">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                    {problem.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Scope */}
        <section className="bg-navy-50 py-16 md:py-24">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="display mt-6 text-3xl text-navy-950 sm:text-4xl">
                What the work
                <br />
                includes
              </h2>
              <div className="mt-6 aspect-[16/10] overflow-hidden rounded-[6px] border border-border bg-navy-200">
                <Image
                  src={galleryPhotos[0]}
                  alt="Recent Voltamin Electric work in Orange County"
                  width={800}
                  height={500}
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <ul className="mt-2 space-y-4 lg:mt-12">
              {page.scope.map((item) => (
                <li key={item.slice(0, 32)} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />
                  <span className="text-[14.5px] leading-relaxed text-navy-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="bg-white py-16 md:py-24">
          <div className="shell">
            <p className="eyebrow">The process</p>
            <h2 className="display mt-6 text-3xl text-navy-950 sm:text-4xl">
              From call to finished work
            </h2>
            <div className="mt-10 grid gap-x-12 sm:grid-cols-3">
              {page.process.map((step, i) => (
                <div key={step.title} className="border-t border-navy-200 py-7">
                  <span className="text-[12px] font-semibold tabular-nums text-gold-700">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[16px] font-semibold text-navy-950">{step.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photos */}
        <section className="bg-navy-50 py-14 md:py-16">
          <div className="shell">
            <div className="grid gap-3 sm:grid-cols-3">
              {galleryPhotos.map((src) => (
                <div key={src} className="aspect-[4/3] overflow-hidden rounded-[4px] bg-navy-200">
                  <Image
                    src={src}
                    alt="Voltamin Electric project photo from our Orange County work gallery"
                    width={640}
                    height={480}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-[13px] text-muted-foreground">
              See more in the{" "}
              <Link href="/#work" className="font-semibold text-navy-900 underline-offset-4 hover:underline">
                recent work gallery
              </Link>{" "}
              or on{" "}
              <a
                href={siteConfig.social.googlePhotos}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy-900 underline-offset-4 hover:underline"
              >
                our Google profile
              </a>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 md:py-24">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">Common questions</p>
              <h2 className="display mt-6 text-3xl text-navy-950 sm:text-4xl">
                About {page.name.toLowerCase()}
              </h2>
            </div>
            <div className="divide-y divide-navy-200 border-y border-navy-200">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-[15.5px] font-semibold leading-snug text-navy-950">
                    {faq.question}
                    <span
                      aria-hidden
                      className="mt-1 text-[18px] leading-none text-gold-700 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-8 text-[14.5px] leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="bg-navy-50 py-16 md:py-20">
          <div className="shell">
            <h2 className="display text-2xl text-navy-950 sm:text-3xl">Related services</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {related.map((rel) => {
                const RelIcon = serviceIcons[rel.icon];
                return (
                  <Link
                    key={rel.slug}
                    href={servicePath(rel.slug)}
                    className="group rounded-[6px] border border-border bg-white p-6 transition-colors hover:border-gold"
                  >
                    {RelIcon && (
                      <RelIcon className="h-5 w-5 text-gold-600 transition-colors group-hover:text-gold-700" />
                    )}
                    <h3 className="mt-4 text-[15.5px] font-semibold text-navy-950 group-hover:text-gold-700">
                      {rel.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13.5px] text-muted-foreground">
                      {siteConfig.services.find((s) => s.title.startsWith(rel.name.split(" & ")[0]))
                        ?.description ?? ""}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Area + CTA */}
        <section className="bg-white py-14">
          <div className="shell flex flex-col items-start justify-between gap-5 rounded-[6px] border border-border px-6 py-6 sm:flex-row sm:items-center">
            <p className="flex items-start gap-2 text-[13.5px] text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              <span>
                Serving {business.city}, {business.region}, and surrounding Orange County
                communities. Not sure if you are in range? Call and ask.
              </span>
            </p>
            <a
              href={`tel:${business.phoneRaw}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-[5px] bg-navy-950 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-navy-800"
            >
              <Phone className="h-3.5 w-3.5" />
              Call {business.phone}
            </a>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
