"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-navy-50 py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p data-reveal className="eyebrow">
            Common questions
          </p>
          <h2 data-split className="display mt-6 text-3xl text-navy-950 sm:text-4xl">
            Questions
            <br />
            answered
          </h2>
          <p
            data-reveal
            data-delay="0.2"
            className="mt-5 text-[14.5px] leading-relaxed text-muted-foreground">
            The things customers ask most before booking. Anything not covered
            here, call and ask directly.
          </p>
          <a
            href={`tel:${siteConfig.business.phoneRaw}`}
            className="mt-6 inline-block text-[14px] font-semibold text-gold-700 underline-offset-4 hover:underline"
          >
            {siteConfig.business.phone}
          </a>
        </div>

        <div
          data-stagger
          className="divide-y divide-navy-200 border-y border-navy-200"
        >
          {siteConfig.faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  id={`faq-question-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="flex gap-4">
                    <span className="mt-1 text-[11px] font-semibold tabular-nums text-gold-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15.5px] font-semibold leading-snug text-navy-950">
                      {faq.question}
                    </span>
                  </span>
                  <Plus
                    className={`mt-0.5 h-4 w-4 shrink-0 text-navy-500 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-8 pr-8 text-[14.5px] leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
