import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site.config";

export const Process = () => (
  <section id="process" className="bg-navy-50 py-20 md:py-28">
    <div className="shell">
      <SectionHeading
        index="02"
        title="How it works"
        description="Five steps from first call to final walk-through. You know the scope and the price before anything is opened up, and nothing changes without a conversation first."
      />

      <div data-stagger className="grid gap-x-12 gap-y-0 sm:grid-cols-2">
        {siteConfig.process.map((step, i) => (
          <div
            key={step.title}
            className="border-t border-navy-200 py-7"
          >
            <span className="text-[12px] font-semibold tabular-nums text-gold-700">
              / {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-navy-950">
              {step.title}
            </h3>
            <p className="mt-2.5 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
