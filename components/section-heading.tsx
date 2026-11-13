import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  title: string;
  description?: string;
  /** Use on navy backgrounds */
  dark?: boolean;
  className?: string;
};

export const SectionHeading = ({
  index,
  title,
  description,
  dark = false,
  className,
}: Props) => (
  <div className={cn("mb-12 md:mb-16", className)}>
    <div className="flex items-baseline gap-4">
      {index && (
        <span
          data-pop
          className="inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-[3px] bg-gold px-1.5 text-[11px] font-bold tabular-nums text-navy-950"
        >
          {index}
        </span>
      )}
      <h2
        data-split
        className={cn(
          "display text-3xl sm:text-4xl md:text-[2.75rem]",
          // Light sections need an explicit dark heading colour: --foreground is
          // near-white for the dark root theme, so text-foreground would be
          // invisible on white.
          dark ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </h2>
    </div>

    {description && (
      <p
        data-reveal
        data-delay="0.2"
        className={cn(
          "mt-5 max-w-2xl text-[15px] leading-relaxed md:text-base",
          dark ? "text-navy-200" : "text-muted-foreground"
        )}
      >
        {description}
      </p>
    )}

    <div
      data-line
      data-delay="0.1"
      className={cn(
        "mt-8 h-px w-full",
        dark ? "bg-white/15" : "bg-border"
      )}
    />
  </div>
);
