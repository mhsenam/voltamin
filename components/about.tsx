"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, UserCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site.config";

const { business, proof } = siteConfig;

const facts = [
  { label: "Years in business", value: `${business.yearsInBusiness}` },
  { label: "Jobs completed", value: `${proof.timesHired}` },
  { label: "Team size", value: `${business.employees}` },
  { label: "Average rating", value: proof.rating.toFixed(1) },
];

export const About = () => (
  <section id="about" className="bg-white py-20 md:py-28">
    <div className="shell">
      <SectionHeading index="05" title="Credentials & background" />

      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-[21px] font-semibold tracking-[-0.015em] text-navy-950">
            {business.owner} — owner, {business.name}
          </h3>

          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              I started my electrical career as an apprentice working alongside
              certified electricians and licensed contractors, including a
              specialty C-10 licensed electrician and a general B contractor.
              Through hands-on experience and mentorship I built practical
              skills in both residential and commercial work — the foundation
              for what I now do through {business.name}.
            </p>
            <p>
              Today I run a small, two-person operation out of {business.city}.
              Staying small is deliberate: it means the person who quotes your
              job is the person who does it, and the quality does not change
              depending on which crew turns up. I use laser levels, thermal and
              digital inspection cameras, and proper diagnostic gear so the work
              is precise and your walls and ceilings take as little damage as
              possible.
            </p>
          </div>

          {/* Verification badges */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-[6px] border border-border p-4">
              <ShieldCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-600" />
              <div>
                <p className="text-[13.5px] font-semibold text-navy-950">
                  License verified
                </p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                  {business.licenseClass} Electrical Contractor ·{" "}
                  {business.licenseState} #{business.license}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[6px] border border-border p-4">
              <UserCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-600" />
              <div>
                <p className="text-[13.5px] font-semibold text-navy-950">
                  Background checked
                </p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                  Passed {proof.backgroundCheckDate}
                </p>
              </div>
            </div>
          </div>

          {/* Numbers */}
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] bg-border sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-navy-50 px-4 py-5">
                <p className="text-2xl font-bold tabular-nums tracking-tight text-navy-950">
                  {fact.value}
                </p>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Credential list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="eyebrow">Training &amp; certification</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {siteConfig.credentials.map((credential, i) => (
              <li
                key={credential}
                className="flex items-start gap-4 py-3.5 text-[14px] leading-snug text-navy-800"
              >
                <span className="mt-0.5 text-[11px] font-semibold tabular-nums text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);
