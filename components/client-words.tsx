"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { photos } from "@/components/work";
import type { Review } from "@/lib/reviews";

gsap.registerPlugin(useGSAP, SplitText);

const MAX = 6;
const SECONDS_PER_QUOTE = 8;

/**
 * "Client Words" spotlight, after the testimonial block on
 * kitchenartandbath.com: one large quote on a dark panel beside a project
 * photo, rotating through short five-star reviews.
 */
export const ClientWords = ({ reviews }: { reviews: Review[] }) => {
  // Short enough to read at display size, long enough to say something.
  const featured = useMemo(
    () =>
      reviews
        .filter((r) => r.rating === 5 && r.body.length >= 120 && r.body.length <= 320)
        .slice(0, MAX),
    [reviews]
  );
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<gsap.core.Tween>();
  const shown = useRef(0);

  const count = featured.length;
  const go = (next: number) => setIndex((next + count) % count);

  useGSAP(
    () => {
      if (!count) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
      const from = shown.current;
      shown.current = index;
      gsap.set(slides, { zIndex: 0 });
      gsap.set(slides[from], { zIndex: 1 });
      gsap.set(slides[index], { zIndex: 2 });

      if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

      if (from !== index) {
        const ease = "expo.inOut";
        gsap.fromTo(
          slides[index],
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease }
        );
        gsap.fromTo(
          slides[index].querySelector("img"),
          { scale: 1.25 },
          { scale: 1, duration: 1.6, ease: "expo.out" }
        );
        const split = SplitText.create("[data-quote]", { type: "words" });
        gsap.from(split.words, {
          opacity: 0,
          y: 14,
          filter: "blur(6px)",
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.015,
        });
        gsap.from("[data-quote-meta]", { opacity: 0, x: -20, duration: 0.6, delay: 0.3 });
      }

      timer.current = gsap.fromTo(
        "[data-timer]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: SECONDS_PER_QUOTE,
          ease: "none",
          onComplete: () => setIndex((i) => (i + 1) % count),
        }
      );
    },
    { scope: root, dependencies: [index, count], revertOnUpdate: true }
  );

  if (!count) return null;
  const review = featured[index];

  // Hovering or tabbing into the card holds the current quote.
  const hold = () => timer.current?.pause();
  const release = () => timer.current?.resume();

  return (
    <div
      ref={root}
      data-reveal
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured customer reviews"
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
      className="mb-16 grid overflow-hidden rounded-[6px] border border-white/10 lg:grid-cols-2"
    >
      <div className="flex flex-col bg-navy-900 p-7 sm:p-10 lg:p-12">
        <Quote className="h-7 w-7 fill-gold text-gold" aria-hidden />
        <h3 data-split className="display mt-5 text-3xl text-white md:text-[2.5rem]">
          Client Words
        </h3>

        <div key={index} className="min-h-[15rem] sm:min-h-[12rem]">
          <p
            data-quote
            className="mt-6 text-[18px] leading-snug text-white md:text-[21px]"
          >
            {review.body}
          </p>
          <div data-quote-meta className="mt-6">
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-semibold text-white">
                {review.name}
              </span>
              <span className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </span>
            </div>
            <p className="mt-1 text-[12.5px] text-navy-300">
              {[review.service, review.date].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4 pt-10">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous review"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next review"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <span className="text-[12px] font-semibold tabular-nums tracking-widest text-navy-300">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 overflow-hidden bg-white/15">
            <span
              data-timer
              className="block h-full origin-left scale-x-0 bg-gold"
            />
          </span>
        </div>
      </div>

      <div className="relative min-h-[300px] bg-navy-900 sm:min-h-[380px]">
        {featured.map((_, i) => (
          <div
            key={i}
            data-slide
            className={`absolute inset-0 overflow-hidden ${i === 0 ? "z-[2]" : ""}`}
          >
            <Image
              src={photos[(i * 5 + 2) % photos.length]}
              alt={`Voltamin Electric project photo ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 590px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
