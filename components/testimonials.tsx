"use client";

import { motion } from "framer-motion";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const { proof, social, business } = siteConfig;

const Stars = ({ count = 5 }: { count?: number }) => (
  <span className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
    ))}
  </span>
);

export const Testimonials = () => (
  <section id="reviews" className="bg-navy-950 py-20 text-white md:py-28">
    <div className="shell">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <div className="flex items-baseline gap-4">
          <span className="inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-[3px] bg-gold px-1.5 text-[11px] font-bold text-navy-950">
            ★
          </span>
          <h2 className="display text-3xl text-white sm:text-4xl md:text-[2.75rem]">
            What customers say
          </h2>
        </div>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-navy-200">
          {proof.reviewCount} verified reviews, rated {proof.rating.toFixed(1)}{" "}
          out of 5. Customers rate {business.shortName} highest on
          professionalism, work quality, and responsiveness.
        </p>
        <div className="mt-8 h-px w-full bg-white/15" />
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
        {/* Rating summary */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <p className="text-5xl font-bold tracking-tight">
            {proof.rating.toFixed(1)}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <Stars />
            <span className="text-[12.5px] text-navy-300">
              {proof.ratingLabel}
            </span>
          </div>

          <div className="mt-6 space-y-1.5">
            {proof.breakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-2.5">
                <span className="w-3 text-[11px] tabular-nums text-navy-300">
                  {row.stars}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gold"
                  />
                </div>
                <span className="w-8 text-right text-[11px] tabular-nums text-navy-300">
                  {row.percent}%
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold">
            Frequently mentioned
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {proof.mentions.map((mention) => (
              <span
                key={mention.word}
                className="rounded-full border border-white/15 px-2.5 py-1 text-[11.5px] text-navy-200"
              >
                {mention.word}
                <span className="ml-1.5 tabular-nums text-navy-400">
                  {mention.count}
                </span>
              </span>
            ))}
          </div>

          <a
            href={social.thumbtack}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold transition-colors hover:text-gold-300"
          >
            Read all {proof.reviewCount} reviews
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.aside>

        {/* Reviews */}
        <div className="divide-y divide-white/10 border-t border-white/10">
          {siteConfig.reviews.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.24) }}
              className="py-8"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Stars count={review.rating} />
                <span className="text-[14px] font-semibold text-white">
                  {review.name}
                </span>
                <span className="text-[12px] text-navy-400">
                  {review.date}
                </span>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold-200">
                  {review.service}
                </span>
              </div>

              <p className="mt-4 text-[14.5px] leading-relaxed text-navy-100">
                {review.body}
              </p>

              <p className="mt-3 text-[11.5px] text-navy-400">
                {review.details}
              </p>

              <div className="mt-5 flex gap-3 border-l-2 border-gold/40 pl-4">
                <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/60" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                    Reply from {business.ownerShort}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-navy-200">
                    {review.reply}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
