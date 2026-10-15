import { Fragment } from "react";
import Image from "next/image";
import { Phone, Star, Award, ShieldCheck } from "lucide-react";
import { GoogleG } from "@/components/socials";
import { siteConfig } from "@/config/site.config";
import type { ReviewSource } from "@/lib/reviews";

const { business, proof, hero } = siteConfig;

const badges = [
  { label: "Licensed", icon: ShieldCheck },
  ...proof.topProYears.split(" & ").map((year) => ({ label: `Top Pro ${year}`, icon: Award })),
];

export const Hero = ({
  thumbtack,
  google,
}: {
  thumbtack: ReviewSource;
  google: ReviewSource;
}) => {
  const ratings = [
    { label: "Thumbtack", source: thumbtack, icon: null },
    { label: "Google", source: google, icon: <GoogleG className="h-4 w-4" /> },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy-950 text-white"
    >
      {/* Soft gold bloom behind the copy */}
      <div
        aria-hidden
        data-parallax="60"
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]"
      />
      <div
        aria-hidden
        data-parallax="12"
        className="pointer-events-none absolute -inset-y-24 inset-x-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      <div data-hero className="shell relative py-14 md:py-20 lg:py-24">
        {/* Copy */}
        <div className="max-w-3xl">
          {/* The header logo, large, so the brand leads the page */}
          <div data-reveal className="mb-10 flex items-center gap-4 sm:gap-5">
            <span className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-[10px] border border-gold/40 shadow-[0_0_48px_-8px_rgba(233,166,33,0.55)] sm:h-28 sm:w-28">
              <Image
                src="/images/logo.jpeg"
                alt={`${business.name} logo`}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </span>
            <span className="font-slab text-[30px] uppercase leading-[1.02] tracking-[0.02em] text-logo sm:text-[44px]">
              Voltamin
              <span className="block">Electric</span>
            </span>
          </div>

          <p data-reveal className="eyebrow !text-navy-300">
            {business.licenseClass} Licensed · Lic. #{business.license} ·{" "}
            {business.region}
          </p>

          <h1
            data-split
            data-delay="0.1"
            className="display mt-6 text-[2.15rem] sm:text-[2.9rem] lg:text-[3.5rem]"
          >
            {hero.headline}
            <br />
            <span className="text-gold">{hero.headlineAccent}</span>
          </h1>

          <p
            data-reveal
            data-delay="0.45"
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-navy-200 md:text-[17px]"
          >
            {business.intro}
          </p>

          {/* CTAs */}
          <div
            data-reveal
            data-delay="0.6"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={`tel:${business.phoneRaw}`}
              data-magnetic
              className="inline-flex items-center justify-center gap-2.5 rounded-[5px] bg-gold px-7 py-4 text-[17px] font-bold text-navy-950 transition-colors hover:bg-gold-400 md:text-[19px]"
            >
              <Phone className="h-5 w-5" />
              Call {business.phone}
            </a>
          </div>

          {/* Rating strip */}
          <div
            data-reveal
            data-delay="0.75"
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/10 pt-7"
          >
            {ratings.map((r, i) => (
              <Fragment key={r.label}>
                {i > 0 && <div className="h-9 w-px bg-white/10" />}
                <a href="#reviews" className="group">
                  <div className="flex items-center gap-1.5">
                    {r.icon}
                    <span
                      data-count={r.source.rating.toFixed(1)}
                      data-delay="0.75"
                      className="text-xl font-bold tabular-nums leading-none"
                    >
                      {r.source.rating.toFixed(1)}
                    </span>
                    <span className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                      ))}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11.5px] tracking-wide text-navy-300 underline decoration-white/20 underline-offset-4 transition-colors group-hover:text-gold group-hover:decoration-gold">
                    {r.source.count} {r.label} reviews
                  </p>
                </a>
              </Fragment>
            ))}

            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5"
                >
                  <b.icon className="h-4 w-4 text-gold" />
                  <span className="text-[12px] font-semibold text-gold-200">{b.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cover banner — a wide, self-contained piece of artwork, so it is shown
            whole from sm up and cropped to its left (logo + headline) on phones. */}
        <div
          data-clip
          data-delay="0.5"
          className="relative mt-12 overflow-hidden rounded-[6px] border border-white/10 md:mt-16"
        >
          <div className="relative aspect-[4/3] w-full sm:aspect-[2.435/1]">
            <Image
              src="/images/cover.jpeg"
              alt={`${business.name} — licensed C-10 electrical contractor for residential, commercial, and industrial work`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1200px"
              className="object-cover object-left sm:object-contain sm:object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
