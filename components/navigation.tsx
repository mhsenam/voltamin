"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ShieldCheck, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Areas", href: "#areas" },
  { label: "FAQ", href: "#faq" },
];

const { business } = siteConfig;

/** Thin utility strip above the header — license, area, phone. */
const UtilityBar = () => (
  <div className="hidden border-b border-white/10 bg-navy-950 text-navy-200 lg:block">
    <div className="shell flex h-9 items-center justify-between text-[11.5px] tracking-wide">
      <div className="flex items-center gap-6">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          CSLB {business.licenseClass} Lic. #{business.license} · Licensed &amp;
          Insured
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          Serving {business.region}, CA
        </span>
      </div>
      <a
        href={`tel:${business.phoneRaw}`}
        className="link-underline font-medium text-white"
      >
        {business.phone}
      </a>
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
            ? "border-border bg-white/90 backdrop-blur-md"
            : "border-transparent bg-white"
        )}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          {/* Wordmark */}
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-navy-950">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-gold"
                aria-hidden="true"
              >
                <path d="M13.5 2 4 13.2h6.2L9.4 22 20 10.4h-6.6z" />
              </svg>
            </span>
            <span className="text-[15px] font-bold uppercase leading-none tracking-[0.14em] text-navy-950">
              Voltamin
              <span className="mt-1 block text-[8.5px] font-semibold tracking-[0.34em] text-muted-foreground">
                Electric
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline text-[13.5px] font-medium text-navy-700 transition-colors hover:text-navy-950"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${business.phoneRaw}`}
              className="hidden items-center gap-2 rounded-[5px] border border-border px-3.5 py-2.5 text-[13px] font-semibold text-navy-950 transition-colors hover:border-navy-950 sm:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {business.phone}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center whitespace-nowrap rounded-[5px] bg-gold px-3.5 py-2.5 text-[13px] font-bold text-navy-950 transition-colors hover:bg-gold-400 sm:px-4"
            >
              <span className="sm:hidden">Free Call</span>
              <span className="hidden sm:inline">Free Service Call</span>
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="-mr-1 p-2 lg:hidden"
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
            className="border-b border-border bg-white lg:hidden"
          >
            <div className="shell flex flex-col py-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-[15px] font-medium text-navy-800 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${business.phoneRaw}`}
                className="mt-3 mb-3 inline-flex items-center justify-center gap-2 rounded-[5px] bg-navy-950 py-3 text-sm font-semibold text-white"
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
