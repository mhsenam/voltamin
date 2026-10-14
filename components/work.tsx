"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site.config";

// 1366.webp plus 1366 (1)…(29).webp — the job photos in /public/images
export const photos = [
  "/images/1366.webp",
  ...Array.from({ length: 29 }, (_, i) => `/images/1366 (${i + 1}).webp`),
];

const INITIAL = 12;

export const Work = () => {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const visible = expanded ? photos : photos.slice(0, INITIAL);

  const step = useCallback(
    (delta: number) =>
      setActive((current) =>
        current === null
          ? null
          : (current + delta + photos.length) % photos.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, step]);

  return (
    <section id="work" className="bg-navy-50 py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="04"
          title="Recent work"
          description={`Lighting, outlets, panels, and fans across ${siteConfig.business.region} homes and businesses. Over ${siteConfig.proof.photoCount} job photos documented — a selection is below.`}
        />

        <div
          data-stagger="scale"
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3 lg:grid-cols-4"
        >
          {visible.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(photos.indexOf(src))}
              className="group relative aspect-square overflow-hidden rounded-[4px] bg-navy-200"
              aria-label={`Open project photo ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Voltamin Electric project photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-navy-950/0 transition-colors duration-300 group-hover:bg-navy-950/25" />
              <ArrowUpRight className="absolute right-2.5 top-2.5 h-4 w-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {!expanded && photos.length > INITIAL && (
          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-[5px] border border-navy-300 px-5 py-2.5 text-[13.5px] font-semibold text-navy-950 transition-colors hover:border-navy-950"
            >
              View all {photos.length} photos
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Project photo viewer"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition-colors hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-3 rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-white/40 hover:text-white md:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[76%] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[active]}
                alt={`Voltamin Electric project photo ${active + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute right-3 rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-white/40 hover:text-white md:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <p className="absolute bottom-5 text-[12px] tabular-nums tracking-widest text-white/50">
              {active + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
