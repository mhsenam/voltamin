"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

// Root-anchored so the same header works on the homepage and on the
// /services pages (plain #hash links would be dead there).
const links = [
  { label: "Reviews", href: "/#reviews" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Areas", href: "/#areas" },
  { label: "FAQ", href: "/#faq" },
];

const { business } = siteConfig;

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[50] transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        )}
      >
        <div className="shell flex h-[70px] items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5 glow rounded-xl" style={{ borderRadius: "16px" }}>
            <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image
                src="/images/logo.jpeg"
                alt={`${business.name} logo`}
                fill
                sizes="44px"
                className="object-cover object-center"
                priority
              />
            </span>
            <span className="font-slab text-[18px] uppercase leading-[1.05] tracking-[0.02em] text-white">
              Voltamin
              <span className="block text-[9px] font-semibold tracking-[0.4em] text-accent">
                Electric
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-navy-300 lg:flex">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="link-underline hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${business.phoneRaw}`}
              className="hidden flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {business.phone}
            </a>
            <a href="/#contact" className="btn-primary whitespace-nowrap sm:px-5">
              Contact Us
            </a>
            <button
              type="button"
              ref={menuButton}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-xl p-2.5 bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-colors lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <div className="flex w-5 flex-col gap-1.5">
                  <span className="h-[2px] w-full bg-white rounded" />
                  <span className="h-[2px] w-full bg-white rounded" />
                  <span className="h-[2px] w-full bg-white rounded" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-[60] mt-[70px] bg-background/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="shell flex flex-col py-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-4 text-sm font-medium text-white last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${business.phoneRaw}`}
                className="mt-4 mb-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-accent-foreground"
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
