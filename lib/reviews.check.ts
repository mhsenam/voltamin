// Run with: npm run check:reviews
import assert from "node:assert/strict";
import { THUMBTACK_EXTRACTOR } from "./thumbtack-extractor.ts";
import {
  compact,
  mergeReviews,
  parseGoogleHtml,
  parseThumbtack,
  type Review,
} from "./reviews.ts";

// The extractor has to still parse once newlines are collapsed (a missing
// semicolon or a // comment would break it) and has to fit in a URL. Many servers
// cap URLs near 8 KB; ScrapingBee's own limit is unknown, so keep real headroom.
const flat = compact(THUMBTACK_EXTRACTOR);
assert.doesNotThrow(() => new Function(flat), "thumbtack extractor does not parse");
const bytes = encodeURIComponent(JSON.stringify({ instructions: [{ evaluate: flat }] })).length;
assert.ok(bytes < 6500, `thumbtack extractor is ${bytes} bytes URL-encoded`);

// Live wins over the archive; punctuation and case do not defeat the match.
const live: Review[] = [
  { name: "Miles F.", date: "1 month ago", rating: 5, body: "Sam came on time. His price was fair." },
];
const archive: Review[] = [
  { name: "miles f.", date: "Aug 31, 2026", rating: 5, body: "Sam came on time, his price was fair!" },
  { name: "Zala K.", date: "Jul 10, 2026", rating: 5, body: "Great work." },
];
const merged = mergeReviews(live, archive);
assert.deepEqual(merged.map((r) => r.name), ["Miles F.", "Zala K."]);
assert.equal(merged[0].date, "1 month ago");

// Thumbtack extractor output: aggregate is used, unreadable star ratings are
// dropped, failures are null.
const ok = parseThumbtack(
  JSON.stringify({
    aggregate: { rating: 4.97, count: 94 },
    reviews: [
      { name: "A", date: "d", rating: 5, body: "x" },
      { name: "B", date: "d", rating: 0, body: "y" },
    ],
  })
);
assert.equal(ok?.reviews.length, 1);
assert.equal(ok?.rating, 4.97);
assert.equal(ok?.count, 94);
assert.equal(
  parseThumbtack(JSON.stringify({ reviews: [{ name: "A", date: "d", rating: 0, body: "x" }] })),
  null
);
assert.equal(parseThumbtack(JSON.stringify({ reviews: [], error: "review cards not found" })), null);
const noAggregate = parseThumbtack(
  JSON.stringify({
    reviews: [
      { name: "A", date: "d", rating: 5, body: "x" },
      { name: "B", date: "d", rating: 3, body: "y" },
    ],
  })
);
assert.equal(noAggregate?.rating, 4);
assert.equal(noAggregate?.count, 2);

// Google HTML: a cut-off preview beside the full text, <br> and entities, a
// partly filled star row, an owner reply that must not be read as the reviewer.
const star = (fill: string) => `<svg><path fill="${fill}"></path></svg>`;
const card = (name: string, date: string, gold: number, preview: string, full: string, reply: string) => `
  <div jsname="x" class="bwb7ce">
    <div class="p7f0Nd"><div class="rhtdWc">${name}</div></div>
    <div class="k0Ysuc"><div class="h3PQJ">${star("#fabb05").repeat(gold)}${star("#dadce0").repeat(5 - gold)}</div>
      <span class="y3Ibjb"><span class="m6Mr5d">${date}</span></span></div>
    <div class="d83Iyc">${preview} … <a class="FrlmTe" role="button">More</a></div>
    <div class="gbdaZe"><div class="d83Iyc">${full}<div class="zMjRQd"><div>Response time</div><div>0–1 hr</div></div></div></div>
    ${reply && `<div class="PdaDLc"><div class="p7f0Nd"><div class="rhtdWc">Voltamin Electric (Owner)</div></div><div class="KmCjbd">${reply}</div></div>`}
  </div>`;
const google = parseGoogleHtml(`<html>
  <span aria-label="Rated 4.8 out of 5,"><span></span></span><span class="DNNpLe">1,234 reviews</span>
  ${card("Jo Bloggs", "3 days ago", 4, "Short pre", "Short preview &amp; the rest.<br>Thanks", "Thanks, Jo.<br>Sam<br>Voltamin &#39;Electric&#39;")}
  ${card("Al Smith", "a week ago", 5, "Hi", "Hi there", "")}
</html>`);
assert.deepEqual(google?.reviews, [
  { name: "Jo Bloggs", date: "3 days ago", rating: 4, body: "Short preview & the rest. Thanks", reply: "Thanks, Jo. Sam Voltamin 'Electric'" },
  { name: "Al Smith", date: "a week ago", rating: 5, body: "Hi there", reply: "" },
]);
assert.equal(google?.rating, 4.8);
assert.equal(google?.count, 1234);
assert.equal(parseGoogleHtml("<html>no reviews overlay here</html>"), null);

console.log("reviews checks passed");
