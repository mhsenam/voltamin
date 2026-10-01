/**
 * Live review services. Both run on the server through ScrapingBee
 * (env: SCRAPINGBEE_API_KEY, optional SCRAPINGBEE_PROXY=stealth for Thumbtack).
 * A missing key or a failed fetch yields null, and the page then falls back to
 * the reviews archived in config/site.config.ts.
 *
 *   Thumbtack: ScrapingBee loads the profile in a browser and runs
 *              THUMBTACK_EXTRACTOR, which pages through every review.
 *   Google:    ScrapingBee's Google mode cannot run scripts, so it loads Google
 *              Search with a #lrd= fragment (which opens the "Google reviews"
 *              overlay on its own, listing every review signed out) and the
 *              returned HTML is parsed here. Google Maps stops at 5 reviews.
 *
 * Results are cached by the caller-supplied `cache`, so visitors get the last
 * result instantly and a refresh only happens when it has expired. Failures
 * throw inside the cached function, so they are never cached and retry next time.
 */
import { THUMBTACK_EXTRACTOR } from "./thumbtack-extractor.ts";

export type Review = {
  name: string;
  date: string;
  rating: number;
  body: string;
  service?: string;
  details?: string;
  reply?: string;
};

export type ReviewSource = { rating: number; count: number; reviews: Review[] };

/** Runs `run` at most once per `seconds`, keyed by `key`. */
export type Cache = <T>(key: string, seconds: number, run: () => Promise<T>) => Promise<T>;
const uncached: Cache = (_key, _seconds, run) => run();

const HOUR = 60 * 60;
const DAY = 24 * HOUR;
const SCRAPINGBEE = "https://app.scrapingbee.com/api/v1/";
// A normal call takes 25-45s; leave room under the page's 60s maxDuration.
const TIMEOUT = 55_000;

const mean = (reviews: Review[]) =>
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

const guard = async (
  name: string,
  run: () => Promise<ReviewSource>
): Promise<ReviewSource | null> => {
  try {
    return await run();
  } catch (error) {
    console.error(
      `[reviews] ${name} failed:`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
};

/** Live reviews first, then archived ones that the live list does not already have. */
export const mergeReviews = (
  live: Review[],
  archive: readonly Review[]
): Review[] => {
  const key = (r: Review) =>
    `${r.name}${r.body}`.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
  const seen = new Set(live.map(key));
  return [...live, ...archive.filter((r) => !seen.has(key(r)))];
};

/** Turns scraped reviews into a source, or null when nothing usable came back. */
const toSource = (t: {
  reviews?: Review[];
  aggregate?: { rating: number; count: number } | null;
}): ReviewSource | null => {
  // A rating outside 1-5 means the star reader broke, so do not show it.
  const reviews = (t.reviews ?? []).filter((r) => r.rating >= 1 && r.rating <= 5);
  if (!reviews.length) return null;
  return {
    rating: t.aggregate?.rating ?? mean(reviews),
    count: t.aggregate?.count ?? reviews.length,
    reviews,
  };
};

const scrapingBee = async (params: Record<string, string>) => {
  const res = await fetch(`${SCRAPINGBEE}?${new URLSearchParams(params)}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) {
    throw new Error(`ScrapingBee ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  return res;
};

/* ---------------------------------- Thumbtack --------------------------------- */

// The extractor travels in a URL query string, so newlines are collapsed to keep it short.
export const compact = (source: string) => source.replace(/\s*\n\s*/g, " ");

/** What the Thumbtack extractor leaves in window.__tt. */
export const parseThumbtack = (raw: string) => toSource(JSON.parse(raw));

export const getThumbtack = (profileUrl: string, cache: Cache = uncached) =>
  guard("thumbtack", async () => {
    const apiKey = process.env.SCRAPINGBEE_API_KEY;
    if (!apiKey) throw new Error("SCRAPINGBEE_API_KEY is not set");
    return cache("reviews-thumbtack", HOUR, async () => {
      // premium_proxy is 25 credits a call, stealth_proxy 75. Start cheap, escalate if blocked.
      const proxy =
        process.env.SCRAPINGBEE_PROXY === "stealth" ? "stealth_proxy" : "premium_proxy";
      const scenario = {
        instructions: [
          { evaluate: compact(THUMBTACK_EXTRACTOR) },
          { wait_for: "#tt-done" },
          { evaluate: "JSON.stringify(window.__tt)" },
        ],
      };
      const res = await scrapingBee({
        api_key: apiKey,
        url: profileUrl,
        render_js: "true",
        // ScrapingBee blocks CSS and images by default, and with that Thumbtack's
        // React app crashes during hydration and blanks the page after ~3s.
        block_resources: "false",
        [proxy]: "true",
        json_response: "true",
        js_scenario: JSON.stringify(scenario),
      });
      const { evaluate_results } = (await res.json()) as { evaluate_results?: unknown[] };
      const raw = evaluate_results?.find(
        (v): v is string => typeof v === "string" && v.startsWith("{")
      );
      if (!raw) throw new Error("ScrapingBee returned no extractor result");
      const source = parseThumbtack(raw);
      if (!source) throw new Error("no reviews found on the Thumbtack page");
      return source;
    });
  });

/* ------------------------------------ Google ---------------------------------- */

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
};

// Drops tags (a <br> becomes a space), decodes entities and tidies whitespace.
const text = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();

/**
 * Reads the reviews out of Google Search HTML with the reviews overlay open.
 * A card is div.bwb7ce: name .rhtdWc, date .m6Mr5d, filled stars are paths with
 * fill #fabb05 inside .h3PQJ, owner reply .KmCjbd. Each card holds the review text
 * twice, a preview cut off with "... More" and the full text (which also nests a
 * "Response time" div), so the longest text before any nested div or link wins.
 */
export const parseGoogleHtml = (html: string): ReviewSource | null => {
  const starts = [...html.matchAll(/<div[^>]*class="bwb7ce"/g)].map((m) => m.index ?? 0);
  const reviews = starts.flatMap((start, i) => {
    const card = html.slice(start, starts[i + 1] ?? start + 120_000);
    const name = text(card.match(/class="rhtdWc">([^<]*)</)?.[1] ?? "");
    const stars = card.match(/class="h3PQJ">([\s\S]*?)<\/div>/)?.[1] ?? "";
    const body = [...card.matchAll(/class="d83Iyc">([\s\S]*?)(?:<div|<\/div>|<a )/g)]
      .map((m) => text(m[1]).replace(/\s*…$/, ""))
      .sort((a, b) => b.length - a.length)[0];
    if (!name || !body) return [];
    return [
      {
        name,
        date: text(card.match(/class="m6Mr5d">([^<]*)</)?.[1] ?? ""),
        rating: (stars.match(/fill="#fabb05"/g) ?? []).length,
        body,
        reply: text(card.match(/class="KmCjbd">([\s\S]*?)<\/div>/)?.[1] ?? ""),
      },
    ];
  });
  const summary = html.match(
    /aria-label="Rated (\d\.\d) out of 5[^"]*"[\s\S]{0,200}?class="DNNpLe">(\d[\d,]*) reviews?</
  );
  return toSource({
    reviews,
    aggregate: summary
      ? { rating: parseFloat(summary[1]), count: parseInt(summary[2].replace(/,/g, ""), 10) }
      : null,
  });
};

export const getGoogle = (searchUrl: string, cache: Cache = uncached) =>
  guard("google", async () => {
    const apiKey = process.env.SCRAPINGBEE_API_KEY;
    if (!apiKey) throw new Error("SCRAPINGBEE_API_KEY is not set");
    return cache("reviews-google", DAY, async () => {
      const res = await scrapingBee({
        api_key: apiKey,
        url: searchUrl,
        render_js: "true",
        block_resources: "false",
        // Scraping google.com needs custom_google, and without the stealth proxy
        // Google answers with a CAPTCHA. A US exit avoids the EU cookie wall.
        custom_google: "true",
        stealth_proxy: "true",
        country_code: "us",
        // The overlay is drawn by script after load, so wait for its first card.
        wait_for: "div.bwb7ce",
      });
      const source = parseGoogleHtml(await res.text());
      if (!source) throw new Error("no reviews found on the Google page");
      return source;
    });
  });
