import { ArrowUpRight, Facebook, Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const { social, business } = siteConfig;

const GoogleG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

const channels = [
  {
    name: "Google",
    action: "See our reviews",
    detail: "Rate us on Google",
    href: social.google,
    tile: "bg-white",
    icon: <GoogleG className="h-7 w-7" />,
    hover: "hover:border-[#4285F4]",
  },
  {
    name: "Facebook",
    action: "Like our page",
    detail: social.facebookHandle,
    href: social.facebook,
    tile: "bg-[#1877F2]",
    icon: <Facebook className="h-6 w-6 fill-white text-white" />,
    hover: "hover:border-[#1877F2]",
  },
  {
    name: "Instagram",
    action: "Follow our work",
    detail: social.instagramHandle,
    href: social.instagram,
    tile: "bg-[radial-gradient(circle_at_30%_110%,#FFDC80,#F77737_25%,#E1306C_50%,#C13584_70%,#5851DB)]",
    icon: <Instagram className="h-6 w-6 text-white" />,
    hover: "hover:border-[#E1306C]",
  },
  {
    name: "WhatsApp",
    action: "Message us",
    detail: business.phone,
    href: social.whatsapp,
    tile: "bg-[#25D366]",
    icon: <MessageCircle className="h-6 w-6 fill-white text-white" />,
    hover: "hover:border-[#25D366]",
  },
];

/** Big, branded links to every channel, right after the reviews. */
export const Socials = () => (
  <section className="relative overflow-hidden bg-navy-950 py-16 text-white md:py-20">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]"
    />
    <div className="shell relative">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p data-reveal className="eyebrow !text-navy-300">
            Stay connected
          </p>
          <h2 data-split className="display mt-5 text-3xl sm:text-4xl">
            Find us <span className="text-gold">online.</span>
          </h2>
        </div>
        <p data-reveal className="max-w-sm text-[14.5px] leading-relaxed text-navy-200">
          See recent installs, read what neighbors say, or message us directly.
        </p>
      </div>

      <div data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08] ${c.hover}`}
          >
            <span
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${c.tile}`}
            >
              {c.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[16px] font-bold">{c.name}</span>
              <span className="block text-[13px] font-semibold text-gold">
                {c.action}
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-navy-300">
                {c.detail}
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-navy-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </a>
        ))}
      </div>
    </div>
  </section>
);
