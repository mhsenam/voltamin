/**
 * Same-origin protection for the public estimate-request form. A public form
 * cannot use CSRF tokens meaningfully (every visitor gets a fresh session),
 * so the practical control is checking that cross-site requests do not pass:
 * the Origin header must name a host this deployment actually serves on.
 *
 * Allowed hosts:
 *  - the canonical host from siteConfig (www.voltaminelectric.com)
 *  - the apex host (voltaminelectric.com), in case it serves traffic directly
 *  - VERCEL_URL, so preview deployments can test the form
 *  - localhost / 127.0.0.1 on any port during development
 */
// Relative with an explicit extension so offline check scripts can run this
// module under plain node (same pattern as lib/reviews.ts).
import { siteConfig } from "../config/site.config.ts";

const canonicalHost = (): string => {
  try {
    return new URL(siteConfig.business.url).host;
  } catch {
    return "www.voltaminelectric.com";
  }
};

export const allowedHosts = (): string[] => {
  const hosts = new Set<string>();
  const canonical = canonicalHost();
  hosts.add(canonical);
  // The apex domain — strip a leading "www." if present.
  hosts.add(canonical.replace(/^www\./, ""));

  // VERCEL_URL is the deployment's own host (no protocol), e.g. the project
  // name plus its per-branch hash on preview deployments.
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) hosts.add(vercelUrl.replace(/^https?:\/\//, ""));

  return [...hosts];
};

export const isLocalHost = (host: string): boolean =>
  /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);

/** Validates the Origin (or falls back to Referer) against the allowed hosts. */
export const isAllowedOrigin = (request: Request): boolean => {
  const origin = request.headers.get("origin") ?? request.headers.get("referer");
  if (!origin) {
    // Some privacy tools strip Origin on same-origin POSTs; the Referer
    // fallback above covers most of those. With neither header, refuse.
    return false;
  }

  let host: string | null = null;
  try {
    host = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }
  if (!host) return false;

  if (isLocalHost(host)) {
    // Local development: allow when not running on Vercel infrastructure.
    return !process.env.VERCEL;
  }

  return allowedHosts().map((h) => h.toLowerCase()).includes(host);
};
