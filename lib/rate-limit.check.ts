// Run with: npm run check:site
// Verifies the fixed-window limiter logic against a fake Upstash pipeline.
import assert from "node:assert/strict";
import {
  RATE_LIMITS,
  createUpstashStore,
  checkRateLimitWith,
  getRateLimitStore,
} from "./rate-limit.ts";

/** Minimal in-memory stand-in asserting the exact pipeline Upstash receives. */
const makeFakeUpstash = (requests: string[][]) => {
  const counters = new Map<string, number>();
  let calls = 0;
  const fetchFn: typeof fetch = async (_url, init) => {
    calls += 1;
    const body = JSON.parse(String(init?.body)) as string[][];
    for (const command of body) requests.push(command);
    const results = body.map((command) => {
      if (command[0] === "INCR") {
        const next = (counters.get(command[1]) ?? 0) + 1;
        counters.set(command[1], next);
        return { result: next };
      }
      if (command[0] === "EXPIRE") return { result: 1 };
      if (command[0] === "TTL") return { result: 3600 };
      return { result: null };
    });
    return new Response(JSON.stringify(results), { status: 200 });
  };
  return { fetchFn, calls: () => calls };
};

// Under the per-IP limit: allowed, and one pipeline covers both counters.
const requests: string[][] = [];
const fake = makeFakeUpstash(requests);
const store = createUpstashStore("https://example.upstash.io", "test-token", fake.fetchFn);
const first = await checkRateLimitWith(store, "1.2.3.4");
assert.equal(first.allowed, true);
// Two counters (per-IP + global), each a single pipeline call.
assert.equal(fake.calls(), 2);
const hour = Math.floor(Math.floor(Date.now() / 1000) / RATE_LIMITS.perIp.windowSeconds);
assert.deepEqual(requests[0], ["INCR", `rl:contact:ip:1.2.3.4:${hour}`]);
assert.equal(requests[1][0], "EXPIRE");

// Hammering past the per-IP limit blocks, with a retry window.
let last = { allowed: true, retryAfterSeconds: 0 };
for (let i = 0; i < RATE_LIMITS.perIp.limit + 2; i++) {
  last = await checkRateLimitWith(store, "1.2.3.4");
}
assert.equal(last.allowed, false);
assert.ok(last.retryAfterSeconds > 0);

// A different IP is not affected by the first one's limit.
const other = await checkRateLimitWith(store, "5.6.7.8");
assert.equal(other.allowed, true);

// The in-memory fallback limiter also blocks after its limit.
const memory = getRateLimitStore();
let memoryLast = { allowed: true, retryAfterSeconds: 0 };
for (let i = 0; i < RATE_LIMITS.perIp.limit + 2; i++) {
  memoryLast = await memory({
    key: "test-key",
    limit: RATE_LIMITS.perIp.limit,
    windowSeconds: RATE_LIMITS.perIp.windowSeconds,
  });
}
assert.equal(memoryLast.allowed, false);

// A failing Redis store fails open, never blocking real customers.
const failing = createUpstashStore("https://example.upstash.io", "test-token", async () => {
  throw new Error("connection refused");
});
const openResult = await checkRateLimitWith(failing, "9.9.9.9");
assert.equal(openResult.allowed, true);

console.log("rate-limit checks passed");
