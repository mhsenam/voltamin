"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
const delayOf = (el: HTMLElement) => Number(el.dataset.delay ?? 0);
const onEnter = (el: Element) => ({ trigger: el, start: "top 88%", once: true });

const staggerFrom: Record<string, gsap.TweenVars> = {
  up: { y: 40 },
  left: { x: -48 },
  scale: { y: 24, scale: 0.9 },
  cells: { y: 24 },
};

/**
 * Drives every scroll and intro animation on the page from data attributes,
 * so sections stay server components and only describe what should move:
 *
 *   data-split          heading words flip up into place
 *   data-reveal         fade and rise (data-delay="0.2" to offset)
 *   data-stagger        children enter in sequence ("up" | "left" | "scale"),
 *                       or "cells" to animate what is inside each child, for
 *                       grids whose 1px gaps would show while cells are hidden
 *   data-line           rule draws from the left
 *   data-pop            badge springs in
 *   data-count="72"     number counts up to the value
 *   data-clip           image wipes up into frame
 *   data-parallax="-20" drifts by that yPercent while scrolling past
 *   data-marquee        endless ticker that speeds up with scroll velocity
 *   data-magnetic       button leans toward the cursor
 *
 * Everything sits behind prefers-reduced-motion, so those visitors get the
 * finished page with nothing moving.
 */
export const Animations = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The hero is hidden in CSS until this point to avoid a flash of the
      // final state before its intro tweens take over.
      gsap.set("[data-hero]", { visibility: "visible" });

      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      all("[data-split]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.from(split.words, {
          opacity: 0,
          y: "0.5em",
          rotateX: -75,
          transformPerspective: 700,
          transformOrigin: "50% 100%",
          duration: 1,
          ease: "expo.out",
          stagger: 0.06,
          delay: delayOf(el),
          scrollTrigger: onEnter(el),
        });
      });

      all("[data-reveal]").forEach((el) =>
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 1,
          ease: "power3.out",
          delay: delayOf(el),
          scrollTrigger: onEnter(el),
        })
      );

      all("[data-stagger]").forEach((parent) => {
        const variant = parent.dataset.stagger || "up";
        const cells = Array.from(parent.children);
        const items =
          variant === "cells" ? cells.flatMap((cell) => Array.from(cell.children)) : cells;
        gsap.set(items, {
          opacity: 0,
          ...staggerFrom[variant],
        });
        ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: variant === "cells" ? 0.04 : 0.08,
              overwrite: true,
            }),
        });
      });

      all("[data-line]").forEach((el) =>
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.inOut",
          delay: delayOf(el),
          scrollTrigger: onEnter(el),
        })
      );

      all("[data-pop]").forEach((el) =>
        gsap.from(el, {
          scale: 0,
          rotate: -90,
          duration: 0.8,
          ease: "back.out(2.2)",
          delay: delayOf(el),
          scrollTrigger: onEnter(el),
        })
      );

      // The target lives in the attribute, not the text, so a re-run (React
      // strict mode, hot reload) never reads a half-counted number.
      all("[data-count]").forEach((el) => {
        const target = el.dataset.count ?? "";
        const end = parseFloat(target);
        const node = el.firstChild;
        if (Number.isNaN(end) || !node) return;
        const decimals = target.split(".")[1]?.length ?? 0;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: end,
          duration: 1.8,
          ease: "power2.out",
          delay: delayOf(el),
          scrollTrigger: onEnter(el),
          onStart: () => {
            node.nodeValue = (0).toFixed(decimals);
          },
          onUpdate: () => {
            node.nodeValue = counter.value.toFixed(decimals);
          },
        });
      });

      all("[data-clip]").forEach((el) => {
        const vars = { delay: delayOf(el), scrollTrigger: onEnter(el) };
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", ...vars }
        );
        const img = el.querySelector("img");
        if (img) {
          gsap.from(img, { scale: 1.3, duration: 2.2, ease: "expo.out", ...vars });
        }
      });

      all("[data-parallax]").forEach((el) =>
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      );

      all("[data-marquee]").forEach((el) => {
        const loop = gsap.to(el, {
          xPercent: -50,
          duration: 38,
          ease: "none",
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) =>
            gsap.to(loop, {
              timeScale: gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 250),
              duration: 0.2,
              overwrite: true,
              onComplete: () => {
                gsap.to(loop, { timeScale: 1, duration: 1.2 });
              },
            }),
        });
      });
    });

    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const cleanups = all("[data-magnetic]").map((el) => {
        const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
        const move = (e: PointerEvent) => {
          const box = el.getBoundingClientRect();
          x((e.clientX - box.left - box.width / 2) * 0.3);
          y((e.clientY - box.top - box.height / 2) * 0.4);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    });
  });

  return (
    <div
      data-progress
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-gold"
    />
  );
};
