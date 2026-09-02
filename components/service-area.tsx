"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site.config";

const { business } = siteConfig;

export const ServiceArea = () => (
  <section id="areas" className="bg-white py-20 md:py-28">
    <div className="shell">
      <SectionHeading
        index="06"
        title={`Available across ${business.region}`}
        description={`Based in ${business.city} and working throughout ${business.region}. If your city is not listed below, call and ask — chances are it is still within range.`}
      />

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[6px] bg-border sm:grid-cols-3 lg:grid-cols-5">
        {siteConfig.serviceAreas.map((city, i) => (
          <motion.div
            key={city}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
            className="group flex items-center gap-2.5 bg-white px-4 py-5 transition-colors hover:bg-navy-50"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" />
            <span className="text-[13.5px] font-medium text-navy-900">
              {city}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[6px] border border-border px-6 py-5 sm:flex-row sm:items-center"
      >
        <p className="text-[14px] text-muted-foreground">
          Not sure whether you are in range?
        </p>
        <a
          href={`tel:${business.phoneRaw}`}
          className="inline-flex items-center gap-2 rounded-[5px] bg-navy-950 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-navy-800"
        >
          <Phone className="h-3.5 w-3.5" />
          Call {business.phone}
        </a>
      </motion.div>
    </div>
  </section>
);
