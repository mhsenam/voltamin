import { MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site.config";

const { business } = siteConfig;

export const ServiceArea = () => (
  <section id="areas" className="bg-white py-20 md:py-28">
    <div className="shell">
      <SectionHeading
        index="06"
        title={`Available across ${business.region}`}
        description={`Based in ${business.city} and working throughout ${business.region}. If your city is not listed below, call and ask — chances are it is still within range.`}
      />

      <ul data-stagger className="flex flex-wrap gap-2.5">
        {siteConfig.serviceAreas.map((city) => (
          <li
            key={city}
            className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 transition-colors hover:border-gold hover:bg-gold/5"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" />
            <span className="text-[13.5px] font-medium text-navy-900">
              {city}
            </span>
          </li>
        ))}
      </ul>

      <div
        data-reveal
        className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[6px] border border-border px-6 py-5 sm:flex-row sm:items-center"
      >
        <p className="text-[14px] text-muted-foreground">
          Not sure whether you are in range?
        </p>
        <a
          href={`tel:${business.phoneRaw}`}
          data-magnetic
          className="inline-flex items-center gap-2 rounded-[5px] bg-navy-950 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-navy-800"
        >
          <Phone className="h-3.5 w-3.5" />
          Call {business.phone}
        </a>
      </div>
    </div>
  </section>
);
