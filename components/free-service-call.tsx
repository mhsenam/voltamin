"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const { business } = siteConfig;

const points = [
  {
    title: "No charge for the visit",
    body: "I come to your home or business and look at the project in person. Nothing is billed for that visit.",
  },
  {
    title: "A real number, not a range",
    body: "You get a clear estimate covering scope, materials, and price before any work starts.",
  },
  {
    title: "No obligation to proceed",
    body: "Take the estimate and think it over. If you decide against it, you owe nothing.",
  },
];

export const FreeServiceCall = () => (
  <section className="relative overflow-hidden bg-navy-950 py-20 text-white md:py-24">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-gold/10 blur-[110px]"
    />

    <div className="shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="eyebrow !text-navy-300">The Voltamin difference</p>
        <h2 className="display mt-6 text-3xl sm:text-4xl md:text-[2.6rem]">
          The service call is
          <br />
          genuinely <span className="text-gold">free.</span>
        </h2>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-navy-200">
          Most electricians bill for the trip out before they have quoted
          anything. I do not. You get an in-person assessment and honest,
          upfront pricing so you know exactly what to expect before committing
          to anything.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-[5px] bg-gold px-5 py-3 text-[14px] font-bold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Request your free estimate
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${business.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-white/20 px-5 py-3 text-[14px] font-semibold transition-colors hover:border-white/50"
          >
            <Phone className="h-4 w-4" />
            {business.phone}
          </a>
        </div>
      </motion.div>

      <div className="divide-y divide-white/10 border-y border-white/10 lg:border-t-0 lg:pt-0">
        {points.map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="flex gap-5 py-7"
          >
            <span className="text-[12px] font-semibold tabular-nums text-gold">
              / {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[16px] font-semibold text-white">
                {point.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-navy-200">
                {point.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
