"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/config/site.config";

const { business, social } = siteConfig;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  service: "",
  message: "",
};

const channels = [
  {
    icon: Phone,
    label: "Call or text",
    value: business.phone,
    href: `tel:${business.phoneRaw}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: business.phone,
    href: social.whatsapp,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: social.instagramHandle,
    href: social.instagram,
  },
];

const inputClass =
  "w-full rounded-[5px] border border-border bg-white px-3.5 py-2.5 text-[14px] text-navy-950 outline-none transition-colors placeholder:text-navy-400 focus:border-navy-950";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground";

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Radix Select reports the value directly rather than through an event
  const setField = (field: keyof typeof initialForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: data.message ?? "Message sent. We will be in touch shortly.",
        });
        setForm(initialForm);
      } else {
        setStatus({
          type: "error",
          message: data.error ?? "Could not send. Please try again or call.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please call instead.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Left: pitch + channels */}
        <div>
          <p data-reveal className="eyebrow">
            Free service call
          </p>
          <h2
            data-split
            className="display mt-6 text-3xl text-navy-950 sm:text-4xl md:text-[2.6rem]"
          >
            Tell us about
            <br />
            the <span className="text-gold-600">project.</span>
          </h2>
          <p
            data-reveal
            data-delay="0.2"
            className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Send a short description or a photo of the panel or fixture. We will
            come out, assess it in person, and give you a clear estimate at no
            charge and no obligation.
          </p>

          <div
            data-stagger="left"
            className="mt-9 divide-y divide-border border-y border-border"
          >
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  channel.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-center gap-4 py-4"
              >
                <channel.icon className="h-4 w-4 shrink-0 text-gold-600" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {channel.label}
                  </p>
                  <p className="mt-0.5 text-[14.5px] font-medium text-navy-950 transition-colors group-hover:text-gold-700">
                    {channel.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-6 text-[12.5px] leading-relaxed text-muted-foreground">
            {business.licenseClass} licensed, bonded &amp; insured · CSLB #
            {business.license} · Based in {business.city}, {business.state}
          </p>
        </div>

        {/* Right: form */}
        <form
          onSubmit={submit}
          data-reveal
          data-delay="0.15"
          className="rounded-[6px] border border-border bg-navy-50 p-6 md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name *
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={update}
                placeholder="Your Name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={update}
                placeholder="(949) 000-0000"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={update}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className={labelClass}>
                Service needed
              </label>
              <Select
                value={form.service}
                onValueChange={setField("service")}
              >
                <SelectTrigger id="service" aria-label="Service needed">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {siteConfig.services.map((service) => (
                    <SelectItem key={service.title} value={service.title}>
                      {service.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="Something else">
                    Something else
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <Select value={form.city} onValueChange={setField("city")}>
                <SelectTrigger id="city" aria-label="City">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {siteConfig.serviceAreas.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                  <SelectItem value="Elsewhere in Orange County">
                    Elsewhere in Orange County
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className={labelClass}>
              Project details *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={update}
              placeholder="What needs doing, whether there is existing wiring, roughly when you would like it done…"
              className={`${inputClass} resize-none`}
            />
          </div>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 flex items-start gap-2.5 rounded-[5px] border px-4 py-3 text-[13.5px] ${
                status.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="mt-px h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-px h-4 w-4 shrink-0" />
              )}
              {status.message}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[5px] bg-gold px-6 py-3.5 text-[14.5px] font-bold text-navy-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {sending ? "Sending…" : "Request our free service call"}
          </button>

          <p className="mt-3.5 text-center text-[12px] text-muted-foreground">
            No charge for the visit. No obligation to proceed.
          </p>
        </form>
      </div>
    </section>
  );
};
