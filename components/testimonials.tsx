"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { ReviewSource } from "@/lib/reviews";

const { proof, business, reviewSources } = siteConfig;

const PER_PAGE = 8;

const TABS = [
  { id: "thumbtack", label: "Thumbtack" },
  { id: "google", label: "Google" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const Stars = ({ count = 5 }: { count?: number }) => (
  <span className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={
          i < count
            ? "h-3.5 w-3.5 fill-gold text-gold"
            : "h-3.5 w-3.5 text-white/25"
        }
      />
    ))}
  </span>
);

export const Testimonials = ({
  thumbtack,
  google,
}: {
  thumbtack: ReviewSource;
  google: ReviewSource | null;
}) => {
  const [tab, setTab] = useState<TabId>("thumbtack");
  const [page, setPage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const active = TABS[tab === "google" ? 1 : 0];
  const source = tab === "thumbtack" ? thumbtack : google;
  const reviews = useMemo(() => source?.reviews ?? [], [source]);
  const pageCount = Math.max(1, Math.ceil(reviews.length / PER_PAGE));

  const visible = useMemo(
    () => reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE),
    [reviews, page]
  );

  const switchTab = (next: TabId) => {
    setTab(next);
    setPage(0);
  };

  // Two tabs, so either arrow key moves to the other one.
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tab === "thumbtack" ? "google" : "thumbtack";
    switchTab(next);
    document.getElementById(`reviews-tab-${next}`)?.focus();
  };

  const goTo = (next: number) => {
    setPage(Math.min(Math.max(next, 0), pageCount - 1));
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Show a compact window of page numbers around the current page
  const pageNumbers = useMemo(() => {
    const span = 2;
    const nums = new Set<number>([0, pageCount - 1]);
    for (let i = page - span; i <= page + span; i++) {
      if (i >= 0 && i < pageCount) nums.add(i);
    }
    return [...nums].sort((a, b) => a - b);
  }, [page, pageCount]);

  const summary =
    tab === "thumbtack"
      ? `${thumbtack.count} verified reviews on Thumbtack, rated ${thumbtack.rating.toFixed(1)} out of 5. Customers rate ${business.shortName} highest on professionalism, work quality, and responsiveness.`
      : google
        ? `${google.count} reviews on Google, rated ${google.rating.toFixed(1)} out of 5.`
        : "Our Google reviews are not available right now.";

  return (
    <section id="reviews" className="bg-navy-950 py-20 text-white md:py-28">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
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
            {summary}
          </p>
          <div className="mt-8 h-px w-full bg-white/15" />
        </motion.div>

        <div
          role="tablist"
          aria-label="Review source"
          className="mb-12 flex gap-2"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`reviews-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="reviews-panel"
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => switchTab(t.id)}
              onKeyDown={onTabKeyDown}
              className={
                tab === t.id
                  ? "h-10 rounded-[5px] bg-gold px-5 text-[13.5px] font-bold text-navy-950"
                  : "h-10 rounded-[5px] border border-white/15 px-5 text-[13.5px] font-medium transition-colors hover:border-gold hover:text-gold"
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="reviews-panel"
          aria-labelledby={`reviews-tab-${tab}`}
        >
          {!source ? (
            <div className="border border-white/15 p-8">
              <p className="text-[14.5px] text-navy-200">
                {active.label} reviews could not be loaded right now.
              </p>
              <a
                href={reviewSources.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:underline"
              >
                See our reviews on Google
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
              {/* Rating summary */}
              <motion.aside
                key={`aside-${tab}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:sticky lg:top-32 lg:self-start"
              >
                <p className="text-5xl font-bold tracking-tight">
                  {source.rating.toFixed(1)}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Stars count={Math.round(source.rating)} />
                  <span className="text-[12.5px] text-navy-300">
                    {tab === "thumbtack"
                      ? proof.ratingLabel
                      : `${source.count} reviews`}
                  </span>
                </div>

                {tab === "thumbtack" && (
                  <>
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
                  </>
                )}

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-[12.5px] leading-relaxed text-navy-300">
                    Showing {page * PER_PAGE + 1}–
                    {Math.min((page + 1) * PER_PAGE, reviews.length)} of{" "}
                    {reviews.length} written reviews.
                  </p>
                  {tab === "google" && (
                    <a
                      href={reviewSources.googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold hover:underline"
                    >
                      See all on Google
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.aside>

              {/* Reviews */}
              <div>
                <div
                  ref={listRef}
                  className="scroll-mt-32 divide-y divide-white/10 border-t border-white/10"
                >
                  {visible.map((review, i) => (
                    <motion.article
                      key={`${tab}-${page}-${i}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(i * 0.05, 0.2),
                      }}
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
                        {review.service && (
                          <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold-200">
                            {review.service}
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-[14.5px] leading-relaxed text-navy-100">
                        {review.body}
                      </p>

                      {review.details && (
                        <p className="mt-3 text-[11.5px] text-navy-400">
                          {review.details}
                        </p>
                      )}

                      {review.reply && (
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
                      )}
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                <nav
                  aria-label="Reviews pagination"
                  className="mt-10 flex flex-wrap items-center justify-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => goTo(page - 1)}
                    disabled={page === 0}
                    aria-label="Previous page of reviews"
                    className="inline-flex h-9 items-center gap-1 rounded-[5px] border border-white/15 px-3 text-[13px] font-medium transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/15 disabled:hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </button>

                  {pageNumbers.map((num, i) => {
                    const previous = pageNumbers[i - 1];
                    const gap = previous !== undefined && num - previous > 1;
                    return (
                      <span key={num} className="flex items-center gap-2">
                        {gap && (
                          <span className="px-1 text-[13px] text-navy-400">…</span>
                        )}
                        <button
                          type="button"
                          onClick={() => goTo(num)}
                          aria-label={`Go to reviews page ${num + 1}`}
                          aria-current={num === page ? "page" : undefined}
                          className={
                            num === page
                              ? "h-9 w-9 rounded-[5px] bg-gold text-[13px] font-bold tabular-nums text-navy-950"
                              : "h-9 w-9 rounded-[5px] border border-white/15 text-[13px] font-medium tabular-nums transition-colors hover:border-gold hover:text-gold"
                          }
                        >
                          {num + 1}
                        </button>
                      </span>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => goTo(page + 1)}
                    disabled={page === pageCount - 1}
                    aria-label="Next page of reviews"
                    className="inline-flex h-9 items-center gap-1 rounded-[5px] border border-white/15 px-3 text-[13px] font-medium transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/15 disabled:hover:text-white"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
