# Voltamin Electric

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6)

Marketing site for **Voltamin Electric**, a licensed C-10 electrical contractor
(CSLB #1159185) serving Orange County, California. Single-page site plus ten
service landing pages, built with the Next.js App Router, with a hardened
contact form that sends through Resend.

Live: [www.voltaminelectric.com](https://www.voltaminelectric.com)

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run check:reviews` | Offline checks for the live reviews code |
| `npm run check:site` | Offline checks for form validation, rate limiting, and structured data |

### Environment

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxx

# Live reviews (optional, see below)
SCRAPINGBEE_API_KEY=xxxxxxxx
SCRAPINGBEE_PROXY=stealth      # optional: Thumbtack uses the premium proxy (25 credits) by default, stealth is 75

# Durable contact-form rate limiting (optional but recommended in production).
# Attach a Vercel Marketplace KV (Upstash) store and these are injected
# automatically; without them the form falls back to per-instance limiting.
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

See `.env.example` for the full list with comments.

`RESEND_API_KEY` is only for the contact form. Without it the build still succeeds and the
page renders normally — `/api/send-email` returns a 503 telling the visitor to call instead.

The form sends from `noreply@voltaminelectric.com` and `Sam@VoltaminElectric.com`, so
`voltaminelectric.com` must be verified in Resend (Domains): add the DKIM TXT record
(`resend._domainkey`) and the `send` MX + SPF TXT records Resend lists to the GoDaddy DNS.
Until the domain shows "Verified", Resend rejects every send and the form shows
"Could not send your message".

### Live reviews

The reviews section has Thumbtack and Google tabs, filled on the server by `lib/reviews.ts`
through ScrapingBee. Only `SCRAPINGBEE_API_KEY` is needed, and it must also be set in the
Vercel project's environment variables. Results are cached with `unstable_cache`, so a
visitor is never kept waiting on a scrape: Thumbtack refreshes hourly, Google daily (the
`HOUR` and `DAY` constants in `lib/reviews.ts`). Once there is a cached result, a refresh that
fails keeps serving the old one.

- **Thumbtack** runs `lib/thumbtack-extractor.ts` inside the profile page (premium proxy,
  25 credits a call). It sorts newest first and pages through every review.
- **Google** loads Google Search with a `#lrd=` fragment, which opens the "Google reviews"
  overlay and lists every review (Google Maps stops at 5 when signed out). ScrapingBee's
  Google mode cannot run scripts, so `parseGoogleHtml` reads the returned HTML. It needs the
  stealth proxy (75 credits a call), and Google sometimes answers with a CAPTCHA anyway. A
  failed call is not charged and is retried on the next refresh. The `#lrd=` value is the
  listing's ID in `config/site.config.ts`.
- **Credits:** at those settings the two sources use roughly 20,000 credits a month, and a
  deploy that has to refill the cache costs about 100. Slow them down by raising the
  constants, or the Thumbtack refresh is the big one.
- With no key, and before the first successful fetch, the Thumbtack tab shows the archived
  reviews in `siteConfig.reviews` and the Google tab says it is unavailable.
- Only the reviews section is live. The hero, footer and trust bar read the static `proof`
  figures, which are Thumbtack's — those spots say "Thumbtack" next to the numbers, and the
  Google figures stay on the Google tab. The Thumbtack link was removed on purpose, so the
  Google listing is the only review link on the site.
- If Thumbtack or Google change their markup, the extractor or parser returns nothing and
  the fallbacks above apply. `npm run check:reviews` checks the parsers, and that the
  Thumbtack extractor still parses and fits in a URL.

---

## Contact form security

`app/api/send-email/route.ts` runs every submission through, in order:

1. **Origin check** (`lib/origin-check.ts`) — cross-site POSTs are refused by host; the
   canonical domain, the apex, `VERCEL_URL` (previews), and localhost (non-Vercel) pass.
2. **Rate limiting** (`lib/rate-limit.ts`) — 5 per IP per hour and 40 globally per hour,
   via Upstash Redis REST when `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are set,
   with a per-instance in-memory fallback. A failing Redis store fails open rather than
   blocking real customers.
3. **Honeypot** — a hidden `company` field; filled submissions get a fake success and send
   nothing.
4. **Validation** (`lib/contact-validate.ts`) — required fields, strict length limits,
   email format, phone format, control-character stripping. The same rules run client-side
   in `components/contact.tsx` for instant feedback.

Resend's error paths are unchanged: no key → 503 with the phone number; admin send failure
→ 500; customer confirmation failure is logged and swallowed.

---

## Editing content

**Almost every string on the page lives in `config/site.config.ts`.** Components read
from it and hold no hardcoded business facts, so copy changes are a one-file edit.

| Key | Drives |
| --- | --- |
| `business` | Name, owner, licence, phone, email, city, tenure |
| `proof` | Rating, review count, times hired, photo count, Top Pro year |
| `trustBadges` | The five-badge bar under the hero |
| `services` | The numbered `01`–`07` service list |
| `projectOptions` | Ceiling height / construction type / property type qualifiers |
| `process` | The five "How it works" steps |
| `clients` | Residential / Commercial / Industrial cards |
| `credentials` | The ten training and certification entries; those with an `image` (scans in `public/certificates`) show in the zoomable certificate gallery |
| `serviceAreas` | Service-area pills, footer list, contact-form city dropdown |
| `reviews`, `googleReviews` | Archived Thumbtack and Google reviews, the fallback when the live fetch is unavailable |
| `faqs` | FAQ accordion |
| `payments`, `social`, `seo` | Payment chips, social links, metadata |

### Where the data comes from

The figures are taken from two live profiles and should be refreshed together:

- **[Thumbtack](https://www.thumbtack.com/ca/lake-forest/interior-lighting-designer/voltamin-electric/service/452715709538287627)**
  — rating, review count, times hired, photo count, Top Pro status,
  background-check date, licence, employees, payment methods, services, process,
  credentials, reviews, FAQs.
- **[Facebook](https://www.facebook.com/VoltaminElectric/)** — tagline and contact
  details. The service-area list was supplied by the owner (2026-10-08).

Both render client-side, so `WebFetch` returns an empty page. Scrape them with a real
browser (Playwright) and read `document.body.innerText`. On Thumbtack, click every
"Show more" / "Read more" control first or the reviews, FAQs and service list stay
collapsed.

`proof.rating`, `proof.reviewCount`, `proof.timesHired`, `proof.photoCount` and
`business.yearsInBusiness` all change over time — re-check them on any content refresh.

### Photos

`components/work.tsx` reads `/public/images/google-01.webp` … `google-40.webp` — 40 files,
the top photos on the Google Business Profile (replaced from there on 2026-11-05), shown
12 at a time behind a "View all" toggle, with a keyboard-navigable lightbox. A "More
photos on Google" button links to the profile's photo gallery (`social.googlePhotos`). To
change the set, drop files in `public/images` and update the `photos` array. The hero
image is set separately in `components/hero.tsx`.

---

## Page structure

`app/page.tsx` composes the sections in this order:

| # | Component | Notes |
| --- | --- | --- |
| | `navigation` | Sticky header with logo, section links, phone, mobile menu |
| | `hero` | Headline, call/quote buttons, rating strip, feature photo |
| | `testimonials` | Bold rating header, Thumbtack/Google tabs, auto-scrolling review rows |
| | `socials` | Google, Facebook, Instagram and WhatsApp link cards |
| | `marquee` | Scrolling service keywords |
| | `trust-bar` | Five credibility badges |
| 01 | `services` | Ten services with detail chips + project qualifiers, each linking to its landing page |
| | `free-service-call` | The free-estimate differentiator |
| 02 | `process` | Five steps from call to walk-through |
| 03 | `clients` | Residential / commercial / industrial + payment chips |
| 04 | `work` | 40-photo gallery with lightbox |
| 05 | `about` | Owner story, licence verification, zoomable certificate gallery (`certificates`) |
| 06 | `service-area` | 26 Orange County cities |
| | `faq` | Eight-question accordion |
| | `contact` | Contact channels + estimate request form |
| | `footer` | Brand, nav, areas, contact, payment methods, licence |
| | `mobile-call-bar` | Sticky call / estimate bar below `lg` |

`section-heading.tsx` renders the numbered headings shared by the `01`–`06` sections.

---

## Design system

Navy ground with a gold accent, Inter throughout, hairline rules and numbered sections.

| Token | Value | Use |
| --- | --- | --- |
| `navy-950` | `#070F1C` | Dark section backgrounds |
| `navy-900` | `#0D1728` | Header utility strip, footer, theme colour |
| `navy-50` | `#F2F5F9` | Alternating light section backgrounds |
| `gold` | `#E9A621` | CTAs, section badges, accents, active states |

Semantic tokens (`--primary`, `--accent`, `--muted`, …) are defined as HSL in
`styles/globals.css`; the `navy` and `gold` scales are in `tailwind.config.ts`.

Shared utility classes in `globals.css`:

- `.shell` — page container, `max-w-[1180px]` with responsive padding
- `.eyebrow` — small uppercase label with a gold leading rule
- `.display` — tight-tracking display headings
- `.animate-marquee` — the keyword ticker (disabled under `prefers-reduced-motion`)

Section reveals use Framer Motion `whileInView`. This means **full-page screenshots come
out mostly blank** — the viewport resize resets the observers. Capture viewport-sized
screenshots at scroll offsets instead.

---

## Project structure

```
voltamin/
├── app/
│   ├── api/send-email/route.ts   # Hardened Resend handler (see above)
│   ├── layout.tsx                # Fonts, metadata, JSON-LD graph
│   ├── page.tsx                  # Section composition
│   ├── services/page.tsx         # Services index
│   ├── services/[slug]/page.tsx  # Ten SSG service landing pages
│   ├── sitemap.ts  robots.ts     # Generated sitemap.xml / robots.txt
│   ├── opengraph-image.png  twitter-image.png  # Static 1200x630 social cards
│   └── icon.png  apple-icon.png  # Favicons (file-convention metadata)
├── components/                   # (nav, hero, sections, form, footer…)
│   └── ui/select.tsx             # Radix select used by the form
├── config/site.config.ts         # All site content
├── lib/
│   ├── seo.ts                    # JSON-LD builders (tested by seo.check.ts)
│   ├── service-pages.ts          # Landing-page copy for the ten services
│   ├── contact-validate.ts       # Form validation rules (shared client/server)
│   ├── rate-limit.ts             # Upstash/in-memory rate limiter
│   ├── origin-check.ts           # Same-origin enforcement for the form
│   ├── reviews.ts  thumbtack-extractor.ts  reviews.check.ts
│   ├── contact-validate.check.ts  rate-limit.check.ts  seo.check.ts
│   └── utils.ts                  # cn() class merger
├── public/images/                # 40 job photos + cover + logo
├── styles/globals.css            # Tokens + shared utilities
└── tailwind.config.ts            # navy / gold scales, fonts
```

---

## SEO

- **Canonical domain** is `https://www.voltaminelectric.com` (`business.url`); every
  canonical, OG URL and structured-data reference derives from it.
- `app/layout.tsx` emits a JSON-LD `@graph` with `Electrician` (licence, phone,
  city-level address, `areaServed`), `WebSite`, and `FAQPage` (the visible FAQ list).
  Deliberately **no `aggregateRating`**: the 5.0/106 figures are Thumbtack's, and
  self-serving review markup on LocalBusiness entities is ineligible under Google's
  guidelines. Ratings live in visible text, attributed to their platform.
- `app/sitemap.ts` lists the homepage, `/services`, and the ten service pages;
  `app/robots.ts` allows everything except `/api/` and links the sitemap.
- Service pages get `Service` + `BreadcrumbList` + page-level `FAQPage` markup, each
  matching visible page content (`lib/service-pages.ts`).
- Social cards are the static `opengraph-image.png` / `twitter-image.png` (regenerate
  with the script pattern in git history or any 1200×630 render).
- `npm run check:site` asserts the JSON-LD shape, the no-aggregateRating policy, and
  that every `siteConfig.services` entry has a landing page.

---

## Deployment

Deploys to Vercel with no configuration beyond setting the environment variables above
(`RESEND_API_KEY`, plus the two review keys to turn on live reviews, plus the two
Upstash variables for durable form rate limiting). The home page sets `maxDuration = 60`
so the Thumbtack scrape (about 20s) has an explicit time limit. Security headers
(CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) are set in
`next.config.js` for every route.

```bash
npm run build && npm start   # verify locally first
```

---

## Contact

**Saeid "Sam" Amini** — Voltamin Electric, Lake Forest, CA
C-10 Licensed & Insured · CSLB #1159185

[(818) 699-2255](tel:+18186992255) ·
[Sam@VoltaminElectric.com](mailto:Sam@VoltaminElectric.com) ·
[@voltamin_electric](https://www.instagram.com/voltamin_electric/)
