"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

const scanned = siteConfig.credentials.filter(
  (c): c is { title: string; label: string; issuer: string; image: string } => !!c.image
);
const unscanned = siteConfig.credentials.filter((c) => !c.image);

const ZOOMS = [1, 1.75, 2.5, 3.5];
const CLICK_ZOOM = 2.5;

/** Certificate wall: the licence large, the rest as thumbnails, all zoomable. */
export const Certificates = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [license, ...rest] = scanned;

  return (
    <div>
      <p data-reveal className="eyebrow">
        Training &amp; certification
      </p>

      <CertificateCard
        cert={license}
        onOpen={() => setOpen(0)}
        featured
        className="mt-6"
      />

      <div data-stagger className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {rest.map((cert, i) => (
          <CertificateCard
            key={cert.image}
            cert={cert}
            onOpen={() => setOpen(i + 1)}
          />
        ))}
      </div>

      <ul className="mt-6 divide-y divide-border border-y border-border">
        {unscanned.map((c) => (
          <li
            key={c.title}
            className="flex items-start gap-3 py-3 text-[13.5px] leading-snug text-navy-800"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
            {c.title}
          </li>
        ))}
      </ul>

      <Viewer index={open} onIndex={setOpen} />
    </div>
  );
};

const CertificateCard = ({
  cert,
  onOpen,
  featured,
  className,
}: {
  cert: (typeof scanned)[number];
  onOpen: () => void;
  featured?: boolean;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={`View certificate: ${cert.title}`}
    className={cn(
      "group block w-full rounded-xl border border-border bg-white p-2 text-left transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-18px_rgba(13,23,40,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold",
      className
    )}
  >
    <span className="relative block aspect-[1.3] overflow-hidden rounded-lg bg-navy-50">
      <Image
        src={cert.image}
        alt=""
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 560px" : "(max-width: 640px) 50vw, 190px"}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-navy-950/0 transition-colors duration-300 group-hover:bg-navy-950/35">
        <span className="flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white text-navy-950 opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
          <ZoomIn className="h-5 w-5" />
        </span>
      </span>
      {featured && (
        <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-950">
          State licence
        </span>
      )}
    </span>
    <span className="block px-1.5 pb-1 pt-3">
      <span
        className={cn(
          "line-clamp-2 font-semibold leading-snug text-navy-950",
          featured ? "text-[15px]" : "text-[12.5px]"
        )}
      >
        {cert.label}
      </span>
      <span className="mt-1 block text-[11.5px] text-muted-foreground">
        {cert.issuer}
      </span>
    </span>
  </button>
);

/**
 * Full-screen viewer on a native <dialog> (Esc, focus trap and backdrop for
 * free). Click the scan to zoom into that spot; drag, scroll or swipe to pan.
 */
const Viewer = ({
  index,
  onIndex,
}: {
  index: number | null;
  onIndex: (i: number | null) => void;
}) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  // Width of the scan when it fits the screen; zoom levels scale from this.
  const fitWidth = useRef(0);
  // Point (0-1 of the image) to keep centred after the next zoom change.
  const focus = useRef({ x: 0.5, y: 0.5 });
  const drag = useRef<{ x: number; y: number; left: number; top: number; moved: boolean } | null>(null);

  const cert = index === null ? null : scanned[index];
  const step = (by: number) =>
    index !== null && onIndex((index + by + scanned.length) % scanned.length);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
    setZoom(1);
    document.documentElement.style.overflow = index === null ? "" : "hidden";
  }, [index]);

  // Keep the chosen point under the centre of the frame when zoom changes.
  useLayoutEffect(() => {
    const el = frame.current;
    if (!el) return;
    el.scrollLeft = focus.current.x * el.scrollWidth - el.clientWidth / 2;
    el.scrollTop = focus.current.y * el.scrollHeight - el.clientHeight / 2;
  }, [zoom]);

  // Without a point, zoom around whatever is in the middle of the frame now.
  const zoomTo = (next: number, at?: { x: number; y: number }) => {
    const el = frame.current;
    if (zoom === 1 && img.current) fitWidth.current = img.current.clientWidth;
    focus.current =
      at ??
      (el && zoom > 1
        ? {
            x: (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth,
            y: (el.scrollTop + el.clientHeight / 2) / el.scrollHeight,
          }
        : { x: 0.5, y: 0.5 });
    setZoom(next);
  };

  const zoomStep = (by: 1 | -1) => {
    const i = ZOOMS.findIndex((z) => z >= zoom);
    zoomTo(ZOOMS[Math.min(Math.max(i + by, 0), ZOOMS.length - 1)]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "+" || e.key === "=") zoomStep(1);
    else if (e.key === "-") zoomStep(-1);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = frame.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = frame.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    el.scrollLeft = d.left - dx;
    el.scrollTop = d.top - dy;
  };

  const onImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const moved = drag.current?.moved;
    drag.current = null;
    if (moved) return;
    if (zoom > 1) return zoomTo(1);
    const box = e.currentTarget.getBoundingClientRect();
    zoomTo(CLICK_ZOOM, {
      x: (e.clientX - box.left) / box.width,
      y: (e.clientY - box.top) / box.height,
    });
  };

  return (
    <dialog
      ref={dialog}
      onClose={() => onIndex(null)}
      onKeyDown={onKeyDown}
      aria-labelledby="certificate-title"
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-navy-950/90 backdrop:backdrop-blur-sm"
    >
      {cert && (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1">
              <p id="certificate-title" className="truncate text-[14px] font-semibold">
                {cert.title}
              </p>
              <p className="truncate text-[12px] text-navy-300">
                {cert.issuer} · {index! + 1} of {scanned.length}
              </p>
            </div>
            <div className="flex items-center rounded-full border border-white/15 bg-white/5">
              <button
                type="button"
                onClick={() => zoomStep(-1)}
                disabled={zoom === 1}
                aria-label="Zoom out"
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:text-gold disabled:opacity-35"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-[12px] font-semibold tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => zoomStep(1)}
                disabled={zoom === ZOOMS[ZOOMS.length - 1]}
                aria-label="Zoom in"
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:text-gold disabled:opacity-35"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onIndex(null)}
              aria-label="Close"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <div
              ref={frame}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerLeave={() => (drag.current = null)}
              className={cn(
                "h-full overflow-auto overscroll-contain px-4 pb-4 sm:px-16",
                zoom > 1 && "cursor-grab active:cursor-grabbing"
              )}
            >
              <div
                // Clicking the dark area around the scan closes the viewer.
                onClick={(e) => e.target === e.currentTarget && onIndex(null)}
                className={cn(
                  "flex min-h-full items-center justify-center",
                  zoom > 1 && "w-max"
                )}
              >
                {/* Plain <img>: zooming needs the original scan, not a resized copy. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={cert.image}
                  ref={img}
                  src={cert.image}
                  alt={cert.title}
                  draggable={false}
                  onClick={onImageClick}
                  style={zoom > 1 ? { width: zoom * fitWidth.current } : undefined}
                  className={cn(
                    "max-w-none select-none rounded-md shadow-2xl",
                    zoom > 1
                      ? "h-auto"
                      : "max-h-[calc(100dvh/var(--page-zoom)-6rem)] w-auto max-w-full cursor-zoom-in"
                  )}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous certificate"
              className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy-950/70 transition-colors hover:border-gold hover:text-gold sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next certificate"
              className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy-950/70 transition-colors hover:border-gold hover:text-gold sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
};
