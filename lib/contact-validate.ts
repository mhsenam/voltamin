/**
 * Server-side validation for the estimate-request form. Pure functions over
 * the parsed request body so lib/contact-validate.check.ts can test the exact
 * rules the API route enforces — nothing here touches fetch, Resend or env.
 *
 * Rules per field: required flags, strict length limits, format checks, and
 * stripping of control characters (except \n and \t in the message) so nothing
 * unexpected travels into the email templates.
 */

export const FIELD_LIMITS = {
  name: 80,
  email: 120,
  phone: 30,
  city: 60,
  service: 80,
  time: 40,
  message: 4000,
} as const;

export const MESSAGE_MIN_LENGTH = 10;

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  time: string;
  message: string;
};

export type ValidatedContact = ContactFields & {
  /** Normalised for the Reply-To header. */
  replyTo: string;
};

// Practical email check: one @, no whitespace, a dot-separated domain of at
// least two characters. Full RFC validity is not the goal here — Resend will
// reject undeliverable addresses anyway — header safety is.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Optional phone: digits with the usual separators. Counts the actual digits
// so "(818) 699-2255", "+18186992255" and "818.699.2255" all pass.
const PHONE_ALLOWED_RE = /^[+0-9()\s.\-]{7,30}$/;

/** Control characters break email rendering and are a header-injection risk. */
const CONTROL_CHARS_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const asTrimmedString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const sanitize = (value: string, keepNewlines = false) =>
  value
    .replace(CONTROL_CHARS_RE, "")
    .replace(keepNewlines ? /[^\S\n\t]+/g : /\s+/g, keepNewlines ? " " : " ");

export type ValidationResult =
  | { ok: true; data: ValidatedContact }
  | { ok: false; fieldErrors: Partial<Record<keyof ContactFields, string>> };

export const validateContact = (body: unknown): ValidationResult => {
  const fieldErrors: Partial<Record<keyof ContactFields, string>> = {};

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return {
      ok: false,
      fieldErrors: { message: "Invalid request. Please try again or call instead." },
    };
  }

  const raw = body as Record<string, unknown>;

  const name = sanitize(asTrimmedString(raw.name));
  const email = asTrimmedString(raw.email);
  const phoneRaw = asTrimmedString(raw.phone);
  const city = sanitize(asTrimmedString(raw.city));
  const service = sanitize(asTrimmedString(raw.service));
  const time = sanitize(asTrimmedString(raw.time));
  // Keep newlines in the message — the email renders them with pre-wrap.
  const message = sanitize(asTrimmedString(raw.message), true)
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  if (!name) fieldErrors.name = "Please enter your name.";
  else if (name.length > FIELD_LIMITS.name)
    fieldErrors.name = `Name is limited to ${FIELD_LIMITS.name} characters.`;

  if (!email) fieldErrors.email = "Please enter your email address.";
  else if (email.length > FIELD_LIMITS.email)
    fieldErrors.email = `Email is limited to ${FIELD_LIMITS.email} characters.`;
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "That email address does not look right.";

  if (phoneRaw) {
    const digits = phoneRaw.replace(/\D/g, "");
    if (!PHONE_ALLOWED_RE.test(phoneRaw) || digits.length < 7 || digits.length > 15) {
      fieldErrors.phone = "That phone number does not look right.";
    }
  }

  if (city.length > FIELD_LIMITS.city)
    fieldErrors.city = `City is limited to ${FIELD_LIMITS.city} characters.`;
  if (service.length > FIELD_LIMITS.service)
    fieldErrors.service = `Service is limited to ${FIELD_LIMITS.service} characters.`;
  if (time.length > FIELD_LIMITS.time)
    fieldErrors.time = `Best time is limited to ${FIELD_LIMITS.time} characters.`;

  if (!message) fieldErrors.message = "Please describe the project.";
  else if (message.length < MESSAGE_MIN_LENGTH)
    fieldErrors.message = "Please add a little more detail about the project.";
  else if (message.length > FIELD_LIMITS.message)
    fieldErrors.message = `Project details are limited to ${FIELD_LIMITS.message} characters.`;

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };

  return {
    ok: true,
    data: {
      name,
      // Reply-To must be a bare address; lowercase normalises its casing.
      replyTo: email.toLowerCase(),
      email: email.toLowerCase(),
      phone: phoneRaw,
      city,
      service,
      time,
      message,
    },
  };
};
