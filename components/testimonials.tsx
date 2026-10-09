"use client";

import { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { Review, ReviewSource } from "@/lib/reviews";
import { cn } from "@/lib/utils";

const { proof, reviewSources } = siteConfig;

const TABS = [
  { id: "thumbtack", label: "Thumbtack" },
  { id: "google", label: "Google" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// Seconds each card takes to cross; the loop length scales with the count.
const SECONDS_PER_CARD = 6;
// A copy of a row must be wider than the screen or the loop shows a gap.
const MIN_CARDS_PER_ROW = 8;

const Stars = ({ count = 5, className }: { count?: number; className?: string }) => (
  <span className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          className ?? "h-4 w-4",
          i < count ? "fill-gold text-gold" : "text-navy-200"
        )}
      />
    ))}
  </span>
);

const Card = ({ review }: { review: Review }) => (
  <article className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-border bg-white p-6 shadow-[0_12px_32px_-20px_rgba(13,23,40,0.35)] sm:w-[370px]">
    <div className="flex items-center justify-between gap-3">
      <Stars count={review.rating} />
      <span className="text-[11.5px] text-muted-foreground">{review.date}</span>
    </div>
    <p className="mt-4 line-clamp-6 flex-1 text-[14.5px] leading-relaxed text-navy-800">
      “{review.body}”
    </p>
    <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-950 text-[15px] font-bold text-gold">
        {review.name.charAt(0).toUpperCase()}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-bold text-navy-950">
          {review.name}
        </span>
        {review.service && (
          <span className="block truncate text-[12px] text-muted-foreground">
            {review.service}
          </span>
        )}
      </span>
    </div>
  </article>
);

/** One endless row: two identical copies slide left (or right) together. */
const Row = ({ reviews, reverse }: { reviews: Review[]; reverse?: boolean }) => {
  let cards = reviews;
  while (cards.length < MIN_CARDS_PER_ROW) cards = [...cards, ...reviews];
  const style = {
    animationDuration: `${cards.length * SECONDS_PER_CARD}s`,
    animationDirection: reverse ? "reverse" : undefined,
  } as const;

  return (
    <div className="group flex py-3 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:overflow-x-auto">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 || undefined}
          style={style}
          className={cn(
            "flex shrink-0 animate-marquee gap-5 pr-5 group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused] motion-reduce:animate-none",
            copy === 1 && "motion-reduce:hidden"
          )}
        >
          {cards.map((review, i) => (
            <Card key={i} review={review} />
          ))}
        </div>
      ))}
    </div>
  );
};

export const Testimonials = ({
  thumbtack,
  google,
}: {
  thumbtack: ReviewSource;
  google: ReviewSource | null;
}) => {
  const [tab, setTab] = useState<TabId>("thumbtack");
  const sources: Record<TabId, ReviewSource | null> = { thumbtack, google };
  const tabs = TABS.filter((t) => sources[t.id]);
  const reviews = (sources[tab] ?? thumbtack).reviews;

  // Long lists split across two rows moving in opposite directions.
  const rows =
    reviews.length >= 2 * MIN_CARDS_PER_ROW
      ? [reviews.filter((_, i) => i % 2 === 0), reviews.filter((_, i) => i % 2 === 1)]
      : [reviews];

  // Two tabs, so either arrow key moves to the other one.
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tab === "thumbtack" ? "google" : "thumbtack";
    if (!sources[next]) return;
    setTab(next);
    document.getElementById(`reviews-tab-${next}`)?.focus();
  };

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-navy-50 py-20 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]"
      />

      <div className="shell relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p data-reveal className="eyebrow">
              Customer reviews
            </p>
            <h2
              data-split
              className="display mt-5 text-4xl font-extrabold text-navy-950 sm:text-5xl md:text-[3.5rem]"
            >
              Orange County
              <br />
              <span className="text-gold-600">trusts Sam.</span>
            </h2>
            <div data-reveal data-delay="0.2" className="mt-7 flex items-center gap-5">
              <span className="text-7xl font-extrabold tabular-nums text-navy-950">
                {thumbtack.rating.toFixed(1)}
              </span>
              <span>
                <Stars className="h-6 w-6" />
                <span className="mt-2 block text-[14px] font-semibold text-navy-800">
                  {thumbtack.count} verified reviews
                </span>
                <span className="block text-[12.5px] text-muted-foreground">
                  {proof.ratingLabel} · Thumbtack Top Pro {proof.topProYears}
                </span>
              </span>
            </div>
          </div>

          {/* Source tabs, shown as rating cards */}
          <div
            role="tablist"
            aria-label="Review source"
            data-reveal
            data-delay="0.3"
            className="grid grid-cols-2 gap-3"
          >
            {tabs.map((t) => {
              const source = sources[t.id]!;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`reviews-tab-${t.id}`}
                  aria-selected={active}
                  aria-controls="reviews-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    "rounded-2xl border p-5 text-left transition duration-300",
                    active
                      ? "border-navy-950 bg-navy-950 text-white shadow-xl"
                      : "border-border bg-white text-navy-950 hover:-translate-y-0.5 hover:border-gold"
                  )}
                >
                  <span
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-[0.16em]",
                      active ? "text-gold" : "text-muted-foreground"
                    )}
                  >
                    {t.label}
                  </span>
                  <span className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tabular-nums">
                      {source.rating.toFixed(1)}
                    </span>
                    <Star className="h-5 w-5 fill-gold text-gold" />
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-[12.5px]",
                      active ? "text-navy-200" : "text-muted-foreground"
                    )}
                  >
                    {source.count} reviews
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id="reviews-panel"
        aria-labelledby={`reviews-tab-${tab}`}
        className="relative mt-12"
      >
        {rows.map((row, i) => (
          <Row key={`${tab}-${i}`} reviews={row} reverse={i === 1} />
        ))}
      </div>

      <div className="shell relative mt-8 flex justify-center">
        <a
          href={reviewSources.googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-navy-950/15 bg-white px-5 py-2.5 text-[13.5px] font-semibold text-navy-950 transition-colors hover:border-gold hover:text-gold-700"
        >
          Read our reviews on Google
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
};
