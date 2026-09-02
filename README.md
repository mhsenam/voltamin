# Voltamin Electric

![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6)

Marketing site for **Voltamin Electric**, a licensed C-10 electrical contractor
(CSLB #1159185) serving Orange County, California. Single-page Next.js App Router
site with a contact form that sends through Resend.

Live: [voltaminelectric.com](https://voltaminelectric.com)

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

### Environment

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxx
```

Only the contact form needs this. Without it the build still succeeds and the page
renders normally — `/api/send-email` returns a 503 telling the visitor to call instead.

---

## Editing content

**Almost every string on the page lives in `config/site.config.ts`.** Components read
from it and hold no hardcoded business facts, so copy changes are a one-file edit.

| Key | Drives |
| --- | --- |
| `business` | Name, owner, licence, phone, email, city, tenure |
| `proof` | Rating, review count, star breakdown, times hired, Top Pro year, keyword chips |
| `trustBadges` | The five-badge bar under the hero |
| `services` | The numbered `01`–`07` service list |
| `projectOptions` | Ceiling height / construction type / property type qualifiers |
| `process` | The five "How it works" steps |
| `clients` | Residential / Commercial / Industrial cards |
| `credentials` | The ten training and certification entries |
| `serviceAreas` | Service-area grid, footer list, contact-form city dropdown |
| `reviews` | Customer reviews and the owner's replies |
| `faqs` | FAQ accordion |
| `payments`, `social`, `seo` | Payment chips, social links, metadata |

### Where the data comes from

The figures are taken from two live profiles and should be refreshed together:

- **[Thumbtack](https://www.thumbtack.com/ca/lake-forest/interior-lighting-designer/voltamin-electric/service/452715709538287627)**
  — rating, review count and breakdown, times hired, photo count, Top Pro status,
  background-check date, licence, employees, payment methods, services, process,
  credentials, reviews, FAQs.
- **[Facebook](https://www.facebook.com/VoltaminElectric/)** — the service-area city
  list, tagline, and contact details.

Both render client-side, so `WebFetch` returns an empty page. Scrape them with a real
browser (Playwright) and read `document.body.innerText`. On Thumbtack, click every
"Show more" / "Read more" control first or the reviews, FAQs and service list stay
collapsed.

`proof.rating`, `proof.reviewCount`, `proof.timesHired`, `proof.photoCount` and
`business.yearsInBusiness` all change over time — re-check them on any content refresh.

### Photos

`components/work.tsx` reads `/public/images/1366.webp` and `1366 (1).webp` …
`1366 (29).webp` — 30 files, shown 12 at a time behind a "View all" toggle, with a
keyboard-navigable lightbox. To change the set, drop files in `public/images` and update
the `photos` array. The hero image is set separately in `components/hero.tsx`.

---

## Page structure

`app/page.tsx` composes the sections in this order:

| # | Component | Notes |
| --- | --- | --- |
| | `navigation` | Utility strip (licence, area, phone) + sticky header |
| | `hero` | Headline, CTAs, rating strip, feature photo |
| | `marquee` | Scrolling service keywords |
| | `trust-bar` | Five credibility badges |
| 01 | `services` | Seven services with detail chips + project qualifiers |
| | `free-service-call` | The free-estimate differentiator |
| 02 | `process` | Five steps from call to walk-through |
| 03 | `clients` | Residential / commercial / industrial + payment chips |
| 04 | `work` | 30-photo gallery with lightbox |
| 05 | `about` | Owner story, licence verification, credentials |
| | `testimonials` | Rating summary, keyword chips, reviews with replies |
| 06 | `service-area` | Ten Orange County cities |
| | `faq` | Eight-question accordion |
| | `contact` | Contact channels + estimate request form |
| | `footer` | Brand, nav, areas, contact, licence |
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
│   ├── api/send-email/route.ts   # Resend handler (force-dynamic)
│   ├── icon.svg                  # Favicon
│   ├── layout.tsx                # Fonts, metadata, LocalBusiness JSON-LD
│   └── page.tsx                  # Section composition
├── components/
│   ├── navigation.tsx  hero.tsx  marquee.tsx  trust-bar.tsx
│   ├── services.tsx    free-service-call.tsx  process.tsx  clients.tsx
│   ├── work.tsx        about.tsx  testimonials.tsx  service-area.tsx
│   ├── faq.tsx         contact.tsx  footer.tsx  mobile-call-bar.tsx
│   ├── section-heading.tsx
│   └── ui/                       # button, card, badge (currently unused)
├── config/site.config.ts         # All site content
├── lib/utils.ts                  # cn() class merger
├── public/images/                # 30 job photos
├── styles/globals.css            # Tokens + shared utilities
└── tailwind.config.ts            # navy / gold scales, fonts
```

---

## SEO

`app/layout.tsx` emits an `Electrician` [schema.org](https://schema.org/Electrician)
JSON-LD block covering the licence, phone, address, `areaServed` for all ten cities, and
`aggregateRating` from `proof`. Keep it in sync when the rating or service areas change.
Open Graph and keyword metadata are generated from `siteConfig.seo`.

---

## Deployment

Deploys to Vercel with no configuration beyond setting `RESEND_API_KEY` in the project's
environment variables.

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
