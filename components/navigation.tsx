"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ShieldCheck,
  MapPin,
  Instagram,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

const links = [
  { label: "Reviews", href: "#reviews" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Areas", href: "#areas" },
  { label: "FAQ", href: "#faq" },
];

const { business, social } = siteConfig;

/** Thin utility strip above the header — license, area, phone. */
const UtilityBar = () => (
  <div className="hidden border-b border-white/10 bg-navy-950 text-navy-200 lg:block">
    <div className="shell flex h-9 items-center justify-between text-[12.5px] tracking-wide">
      <div className="flex items-center gap-6">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          CSLB {business.licenseClass} Lic. #{business.license} · Licensed,
          Bonded &amp; Insured
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          Serving {business.region}, CA
        </span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Voltamin Electric on Instagram"
          className="transition-colors hover:text-gold"
        >
          <Instagram className="h-3.5 w-3.5" />
        </a>
        <a
          href={`tel:${business.phoneRaw}`}
          className="link-underline text-[14px] font-semibold text-white"
        >
          {business.phone}
        </a>
      </div>
    </div>
  </div>
);

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <UtilityBar />

      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-white/10 bg-navy-900/90 backdrop-blur-md"
            : "border-white/10 bg-navy-900"
        )}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-6">
          {/* Wordmark */}
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-[5px]">
              <Image
                src="/images/logo.jpeg"
                alt=""
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </span>
            <span className="font-slab text-[18px] uppercase leading-[1.05] tracking-[0.02em] text-logo">
              Voltamin
              <span className="block">Electric</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline text-[15.5px] font-medium text-navy-100 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${business.phoneRaw}`}
              className="hidden items-center gap-2 rounded-[5px] border border-white/25 px-4 py-2.5 text-[16px] font-semibold text-white transition-colors hover:border-gold hover:text-gold sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {business.phone}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center whitespace-nowrap rounded-[5px] bg-gold px-3.5 py-2.5 text-[14.5px] font-bold text-navy-950 transition-colors hover:bg-gold-400 sm:px-4"
            >
              Contact Us
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="-mr-1 p-2 text-white lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-white/10 bg-navy-900 lg:hidden"
          >
            <div className="shell flex flex-col py-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-3.5 text-[16px] font-medium text-navy-100 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${business.phoneRaw}`}
                className="mt-3 mb-3 inline-flex items-center justify-center gap-2 rounded-[5px] bg-gold py-3 text-[16px] font-bold text-navy-950"
              >
                <Phone className="h-4 w-4" />
                Call {business.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
