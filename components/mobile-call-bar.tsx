"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, CalendarCheck } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const { business } = siteConfig;

/** Sticky call / book bar on small screens — appears once the hero is scrolled past. */
export const MobileCallBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-px border-t border-white/10 bg-navy-950 lg:hidden"
        >
          <a
            href={`tel:${business.phoneRaw}`}
            className="flex items-center justify-center gap-2 py-3.5 text-[13.5px] font-semibold text-white"
          >
            <Phone className="h-4 w-4 text-gold" />
            Call now
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 bg-gold py-3.5 text-[13.5px] font-bold text-navy-950"
          >
            <CalendarCheck className="h-4 w-4" />
            Free estimate
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
