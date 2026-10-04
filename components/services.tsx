import {
  Lightbulb,
  Wrench,
  ToggleRight,
  Cable,
  Gauge,
  Fan,
  Zap,
  PlugZap,
  Home,
  Camera,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site.config";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Wrench,
  ToggleRight,
  Cable,
  Gauge,
  Fan,
  Zap,
  PlugZap,
  Home,
  Camera,
};

const optionGroups: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["Ceiling height", siteConfig.projectOptions.ceilingHeight],
  ["Construction type", siteConfig.projectOptions.constructionType],
  ["Property type", siteConfig.projectOptions.propertyType],
];

export const Services = () => (
  <section id="services" className="bg-white py-20 md:py-28">
    <div className="shell">
      <SectionHeading
        index="01"
        title="What we do"
        description={`${siteConfig.services.length} core services, every one of them carried out by a licensed C-10 contractor. If your job sits outside this list, call and ask — most electrical work in a home or small commercial space is something we can take on.`}
      />

      <div data-stagger="left" className="divide-y divide-border border-b border-border">
        {siteConfig.services.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Zap;
          return (
            <article
              key={service.title}
              className="group grid gap-4 py-8 md:grid-cols-[64px_1fr_1.35fr] md:gap-8 md:py-9"
            >
              <div className="flex items-center gap-3 md:block">
                <span className="text-[12px] font-semibold tabular-nums text-gold-600">
                  / {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-navy-400 transition-colors group-hover:text-gold-600" />
                <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.01em] text-navy-950 md:text-xl">
                  {service.title}
                </h3>
              </div>

              <div>
                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="rounded-full border border-border px-2.5 py-1 text-[11.5px] font-medium text-navy-600"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {/* Project qualifiers — mirrors the options on the booking profile */}
      <div
        data-stagger
        className="mt-14 grid gap-8 rounded-[6px] bg-navy-50 p-7 sm:grid-cols-3 md:p-9"
      >
        {optionGroups.map(([label, values]) => (
          <div key={label}>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-700">
              {label}
            </p>
            <ul className="mt-3 space-y-1.5">
              {values.map((value) => (
                <li key={value} className="text-[13.5px] text-navy-700">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);
