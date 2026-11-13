"use client";

import Image from "next/image";
import { Phone, Star, Award, ShieldCheck, Sparkles } from "lucide-react";
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
      className="relative overflow-hidden bg-background text-foreground min-h-screen flex flex-col"
    >
      {/* Ambient glow orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -left-20 -top-40 h-[600px] w-[600px] rounded-full bg-gold/10 blur-[140px] mix-blend-overlay"
          style={{ animation: "pulse 10s ease-in-out infinite alternate" }}
        />
        <div
          className="absolute -right-20 -bottom-40 h-[700px] w-[700px] rounded-full bg-[#3c5980]/20 blur-[140px] mix-blend-overlay"
          style={{ animation: "pulse 12s ease-in-out infinite alternate-reverse", animationDelay: "2s" }}
        />
      </div>

      <div
        data-hero
        className="shell relative flex flex-col items-start justify-center pt-28 pb-32 lg:pt-36 lg:pb-44 z-10"
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-1 w-8 bg-accent rounded-full" />
            <p className="eyebrow text-accent">
              <span className="block">Electrical Contractor</span>
            </p>
          </div>

          <h1
            data-split
            data-delay="0.1"
            className="display mt-0 mb-6 text-[2.2rem] sm:text-[3.2rem] lg:text-[4.6rem] tracking-tight"
          >
            {hero.headline}
            <br />
            {/* Solid gold, not a background-clip gradient: SplitText wraps each
                word in position:relative divs that paint over the parent's
                clipped background, which made this line invisible. */}
            <span className="text-gold">{hero.headlineAccent}</span>
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-navy-300">
            {business.intro}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`tel:${business.phoneRaw}`}
              data-magnetic
              className="btn-primary glow"
              style={{ borderRadius: "14px" }}
            >
              <Phone className="h-4 w-4" />
              Call {business.phone}
            </a>
            <a href="#contact" className="btn-ghost glow" style={{ borderRadius: "14px" }}>
              Get a free quote
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6 border-t border-white/5 pt-8">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <ShieldCheck className="h-4 w-4 text-accent" />
              CSLB {business.licenseClass} Lic. #{business.license}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4 text-accent" />
              Rated {proof.rating.toFixed(1)} from {proof.reviewCount} Thumbtack
              reviews
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Phone className="h-4 w-4 text-accent" />
              Free service call
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/5 pt-7">
            {ratings.map((r) => (
              <div key={r.label} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {r.icon}
                  <span className="text-xl font-bold tabular-nums leading-none text-white">
                    {r.source.rating.toFixed(1)}
                  </span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                  </span>
                </div>
                <p className="text-xs text-navy-300">
                  {r.source.count} {r.label} reviews
                </p>
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-accent"
                >
                  <b.icon className="h-3.5 w-3.5 text-accent" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Cover image */}
          <div
            data-clip
            data-delay="0.5"
            className="mt-16 relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 shadow-2xl"
          >
            <div className="relative aspect-[2.435/1] w-full">
              <Image
                src="/images/cover.jpeg"
                alt={`${business.name} — licensed C-10 electrical contractor`}
                fill
                priority
                className="object-cover object-center scale-100 transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
