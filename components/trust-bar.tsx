import {
  ShieldCheck,
  UserCheck,
  Award,
  Star,
  CircleDollarSign,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";

const icons = [ShieldCheck, UserCheck, Award, Star, CircleDollarSign];

export const TrustBar = () => (
  <section className="border-b border-border bg-white">
    <div data-stagger className="shell grid grid-cols-2 divide-x divide-y divide-border border-x border-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
      {siteConfig.trustBadges.map((badge, i) => {
        const Icon = icons[i];
        return (
          <div
            key={badge.label}
            className="flex flex-col gap-2 px-4 py-6 lg:px-5"
          >
            <Icon className="h-[18px] w-[18px] text-gold-600" />
            <p className="text-[13px] font-semibold leading-tight text-navy-950">
              {badge.label}
            </p>
            <p className="text-[11.5px] leading-tight text-muted-foreground">
              {badge.detail}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);
