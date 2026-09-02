"use client";

import { Instagram, Facebook, MessageCircle, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const { business, social, proof } = siteConfig;

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Recent work", href: "#work" },
  { label: "Credentials", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export const Footer = () => (
  <footer className="border-t border-white/10 bg-navy-950 text-navy-300">
    {/* Extra bottom padding clears the sticky mobile call bar */}
    <div className="shell pb-24 pt-14 md:py-16 lg:pb-16">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-gold">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-navy-950"
                aria-hidden="true"
              >
                <path d="M13.5 2 4 13.2h6.2L9.4 22 20 10.4h-6.6z" />
              </svg>
            </span>
            <span className="text-[15px] font-bold uppercase leading-none tracking-[0.14em] text-white">
              Voltamin
              <span className="mt-1 block text-[8.5px] font-semibold tracking-[0.34em] text-navy-400">
                Electric
              </span>
            </span>
          </div>

          <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed">
            {business.tagline} Residential, commercial, and industrial work by a
            licensed {business.licenseClass} contractor.
          </p>

          <div className="mt-6 flex gap-2">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-white/10 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-white/10 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-white/10 transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Nav */}
        <div>
          <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13.5px] transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service areas */}
        <div>
          <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white">
            Service areas
          </h3>
          <ul className="mt-4 space-y-2.5">
            {siteConfig.serviceAreas.map((city) => (
              <li key={city} className="text-[13.5px]">
                {city}, CA
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`tel:${business.phoneRaw}`}
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-white transition-colors hover:text-gold"
              >
                <Phone className="h-3.5 w-3.5 text-gold" />
                {business.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2 text-[13.5px] transition-colors hover:text-gold"
              >
                <Mail className="h-3.5 w-3.5 text-gold" />
                {business.email}
              </a>
            </li>
            <li className="pt-1 text-[13px]">
              {business.city}, {business.state} · Serving {business.region}
            </li>
            <li className="text-[13px]">
              Rated {proof.rating.toFixed(1)} from {proof.reviewCount} reviews
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {siteConfig.payments.map((method) => (
              <span
                key={method}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[11px]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-[12px] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <p className="text-navy-400">
          CSLB License #{business.license} · {business.licenseClass}{" "}
          Classification · Licensed &amp; Insured
        </p>
      </div>
    </div>
  </footer>
);
