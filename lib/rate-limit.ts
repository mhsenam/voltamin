/**
 * Rate limiting for the estimate-request API on Vercel serverless.
 *
 * Two backends behind one interface:
 *  - Upstash Redis over its REST API when UPSTASH_REDIS_REST_URL and
 *    UPSTASH_REDIS_REST_TOKEN are set (Vercel Marketplace KV injects these
 *    automatically). Fixed-window counters via INCR/EXPIRE: durable across
 *    warm starts, cold starts, and regions.
 *  - An in-memory fixed-window map otherwise. Serverless instances come and
 *    go, so this is best-effort only — it blunts bursts but is not durable,
 *    which is why the honeypot, origin check, and field limits exist too.
 *
 * The fetch function is injectable so the checks can run offline in tests.
 */

export const RATE_LIMITS = {
  /** Requests per IP per window. */
  perIp: { limit: 5, windowSeconds: 3600 },
  /** Global requests per window — caps total abuse even across rotating IPs. */
  global: { limit: 40, windowSeconds: 3600 },
} as const;

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets, for the Retry-After header. */
  retryAfterSeconds: number;
};

export type RateLimitStore = (opts: {
  key: string;
  limit: number;
  windowSeconds: number;
}) => Promise<RateLimitResult>;

type InMemoryState = Map<string, { count: number; resetAt: number }>;

const state: InMemoryState = new Map();

/** Best-effort per-instance limiter (the no-Redis fallback). */
const memoryStore: RateLimitStore = async ({ key, limit, windowSeconds }) => {
  const now = Date.now();
  const entry = state.get(key);
  if (!entry || entry.resetAt <= now) {
    state.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    // Opportunistic cleanup so the map cannot grow without bound.
    if (state.size > 1000) {
      for (const [k, v] of state) if (v.resetAt <= now) state.delete(k);
    }
    return { allowed: true, retryAfterSeconds: 0 };
  }
  entry.count += 1;
  const allowed = entry.count <= limit;
  return {
    allowed,
    retryAfterSeconds: allowed ? 0 : Math.ceil((entry.resetAt - now) / 1000),
  };
};

/** Durable fixed-window limiter over Upstash Redis' REST pipeline API. */
export const createUpstashStore = (
  url: string,
  token: string,
  fetchFn: typeof fetch
): RateLimitStore => {
  // INCR then EXPIRE (only on the first hit) as a single pipeline. A lost
  // EXPIRE would leave a permanent key, so fall back to SET with TTL.
  return async ({ key, limit, windowSeconds }) => {
    try {
      const res = await fetchFn(`${url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, String(windowSeconds), "NX"],
          ["TTL", key],
        ]),
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) throw new Error(`Upstash ${res.status}`);
      const results = (await res.json()) as { result: unknown }[];
      const count = Number(results[0]?.result ?? 0);
      const ttl = Number(results[2]?.result ?? windowSeconds);
      const allowed = count <= limit;
      return {
        allowed,
        retryAfterSeconds: allowed ? 0 : Math.max(1, Number.isFinite(ttl) ? ttl : windowSeconds),
      };
    } catch (error) {
      // Redis unavailable: fail closed would block real customers. Fail open
      // here and let the other layers (honeypot, origin, limits) absorb it.
      console.error("[rate-limit] store unavailable, failing open:", error instanceof Error ? error.message : error);
      return { allowed: true, retryAfterSeconds: 0 };
    }
  };
};

let cachedStore: RateLimitStore | null = null;
let cachedStoreKey = "";

export const getRateLimitStore = (fetchFn: typeof fetch = fetch): RateLimitStore => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const storeKey = `${url ?? ""}|${token ? "set" : "unset"}`;
  if (!cachedStore || cachedStoreKey !== storeKey) {
    cachedStore = url && token ? createUpstashStore(url, token, fetchFn) : memoryStore;
    cachedStoreKey = storeKey;
  }
  return cachedStore;
};

/** Per-IP + global composition over any store (exported for offline tests). */
export const checkRateLimitWith = async (
  store: RateLimitStore,
  ip: string
): Promise<RateLimitResult> => {
  const now = Math.floor(Date.now() / 1000);
  const { perIp, global } = RATE_LIMITS;
  const ipWindow = Math.floor(now / perIp.windowSeconds);
  const globalWindow = Math.floor(now / global.windowSeconds);

  const [perIpResult, globalResult] = await Promise.all([
    store({
      key: `rl:contact:ip:${ip}:${ipWindow}`,
      limit: perIp.limit,
      windowSeconds: perIp.windowSeconds,
    }),
    store({
      key: `rl:contact:global:${globalWindow}`,
      limit: global.limit,
      windowSeconds: global.windowSeconds,
    }),
  ]);

  return perIpResult.allowed && globalResult.allowed
    ? { allowed: true, retryAfterSeconds: 0 }
    : {
        allowed: false,
        retryAfterSeconds:
          Math.max(perIpResult.retryAfterSeconds, globalResult.retryAfterSeconds) ||
          perIp.windowSeconds,
      };
};

export const checkRateLimit = async (
  ip: string,
  fetchFn: typeof fetch = fetch
): Promise<RateLimitResult> => checkRateLimitWith(getRateLimitStore(fetchFn), ip);

/** Best client IP available on Vercel; never empty (fallback keeps keys usable). */
export const clientIp = (headers: Headers): string =>
  headers.get("x-real-ip") ??
  headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "unknown";
