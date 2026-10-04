const items = [
  "Recessed Lighting",
  "Panel Upgrades",
  "EV Chargers",
  "Switches & Outlets",
  "Ceiling Fans",
  "Circuit Breakers",
  "Smart Home",
  "Security Cameras",
  "Rewiring",
  "Troubleshooting",
  "GFCI & AFCI",
];

/** Continuous keyword ticker between the hero and the first content section. */
export const Marquee = () => (
  <div className="overflow-hidden border-y border-white/10 bg-navy-900 py-3.5">
    <div data-marquee className="flex w-max">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="flex shrink-0 items-center"
          aria-hidden={copy === 1}
        >
          {items.map((item) => (
            <span
              key={item}
              className="flex items-center whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-300"
            >
              {item}
              <span className="mx-6 text-gold">·</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
