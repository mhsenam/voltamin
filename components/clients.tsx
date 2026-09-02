"use client";

import { motion } from "framer-motion";
import { Home, Building2, Factory, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site.config";

const icons: LucideIcon[] = [Home, Building2, Factory];

export const Clients = () => (
  <section className="bg-white py-20 md:py-28">
    <div className="shell">
      <SectionHeading
        index="03"
        title="Who I work with"
        description="Homeowners, business owners, and property managers across Orange County. That range keeps me sharp on both finish quality and code, and it means most jobs are something I have handled before."
      />

      <div className="grid gap-px overflow-hidden rounded-[6px] bg-border sm:grid-cols-3">
        {siteConfig.clients.map((client, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={client.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white p-7 md:p-8"
            >
              <Icon className="h-5 w-5 text-gold-600" />
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-navy-950">
                {client.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                {client.body}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Payment methods */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-7"
      >
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Payments accepted
        </span>
        {siteConfig.payments.map((method) => (
          <span
            key={method}
            className="rounded-full border border-border px-3 py-1 text-[12px] font-medium text-navy-700"
          >
            {method}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);
