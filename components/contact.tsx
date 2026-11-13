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
import { FIELD_LIMITS, MESSAGE_MIN_LENGTH } from "@/lib/contact-validate";

const { business, social } = siteConfig;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  service: "",
  time: "",
  message: "",
  // Honeypot: rendered off-screen and never shown to humans. Bots fill it.
  company: "",
};

type FormState = typeof initialForm;
type FormErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

// Hourly slots, 8 AM to 6 PM, for the "best time to reach you" picker.
const times = Array.from({ length: 11 }, (_, i) => {
  const hour = 8 + i;
  return `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
});

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
  "w-full rounded-[5px] border border-border bg-white px-3.5 py-2.5 text-[14px] text-navy-950 outline-none transition-colors placeholder:text-navy-400 focus:border-navy-950 aria-[invalid=true]:border-red-500";

const invalidBorder = "border-red-500";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground";

const errorClass = "mt-1.5 text-[12px] font-medium text-red-700";

/** Mirrors the server rules in lib/contact-validate.ts for instant feedback. */
const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > FIELD_LIMITS.name)
    errors.name = `Name is limited to ${FIELD_LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "That email address does not look right.";

  if (form.phone.trim()) {
    const digits = form.phone.replace(/\D/g, "");
    if (!/^[+0-9()\s.\-]{7,30}$/.test(form.phone.trim()) || digits.length < 7) {
      errors.phone = "That phone number does not look right.";
    }
  }

  if (!message) errors.message = "Please describe the project.";
  else if (message.length < MESSAGE_MIN_LENGTH)
    errors.message = "Please add a little more detail about the project.";
  else if (message.length > FIELD_LIMITS.message)
    errors.message = `Project details are limited to ${FIELD_LIMITS.message} characters.`;

  return errors;
};

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the visitor starts fixing it.
    setErrors((prev) => (prev[name as keyof FormErrors] ? { ...prev, [name]: undefined } : prev));
  };

  // Radix Select reports the value directly rather than through an event
  const setField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move attention to the first problem so keyboard and screen-reader
      // users are not left hunting for it.
      const first = (["name", "email", "phone", "message"] as const).find(
        (field) => nextErrors[field]
      );
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setSending(true);
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
        // Conversion hook — only fires if an analytics layer already exists
        // on the page; nothing is sent anywhere by this site itself.
        if (typeof window !== "undefined") {
          (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
            event: "estimate_request_submitted",
          });
        }
      } else {
        if (data?.fieldErrors && typeof data.fieldErrors === "object") {
          setErrors((prev) => ({ ...prev, ...data.fieldErrors }));
        }
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

  const fieldError = (name: keyof FormErrors) =>
    errors[name] ? (
      <p id={`${name}-error`} className={errorClass} role="alert">
        {errors[name]}
      </p>
    ) : null;

  const describedBy = (name: keyof FormErrors) =>
    errors[name] ? `${name}-error` : undefined;

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
          noValidate
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
                autoComplete="name"
                value={form.name}
                onChange={update}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy("name")}
                className={`${inputClass} ${errors.name ? invalidBorder : ""}`}
              />
              {fieldError("name")}
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={update}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={describedBy("phone")}
                className={`${inputClass} ${errors.phone ? invalidBorder : ""}`}
              />
              {fieldError("phone")}
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
              autoComplete="email"
              value={form.email}
              onChange={update}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              className={`${inputClass} ${errors.email ? invalidBorder : ""}`}
            />
            {fieldError("email")}
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
            <label htmlFor="time" className={labelClass}>
              Best time to reach you
            </label>
            <Select value={form.time} onValueChange={setField("time")}>
              <SelectTrigger id="time" aria-label="Best time to reach you">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {times.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
                <SelectItem value="Any time">Any time</SelectItem>
              </SelectContent>
            </Select>
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
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message")}
              placeholder="What needs doing, whether there is existing wiring, roughly when you would like it done…"
              className={`${inputClass} ${errors.message ? invalidBorder : ""} resize-none`}
            />
            {fieldError("message")}
          </div>

          {/* Honeypot — visually hidden, off the tab order, ignored by humans */}
          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
            <label htmlFor="company" className={labelClass}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={update}
            />
          </div>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              aria-live="polite"
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
