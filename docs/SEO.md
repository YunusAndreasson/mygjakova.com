# SEO surface

A map of what the site emits for search engines and social scrapers, and where
each piece is generated. The technical baseline was already strong; this ledger
documents it plus the 2026 enrichment pass.

## Where it lives

Almost everything is centralised in **`src/layouts/BaseLayout.astro`** — every page
renders through it, so meta tags and the JSON-LD graph are emitted once, per locale.

| Signal | Source | Notes |
| --- | --- | --- |
| `<title>` | `BaseLayout` | `"{title} — {siteName}"`, or `"{siteName} — {tagline}"` on the home page. |
| `<meta name="description">` | page `description` prop → `t('site.description')` fallback | Every section sets its own; About uses `about.description`. |
| Canonical | `BaseLayout` | Self-referential, absolute, per-locale (built from `stripLocale` + `localizedPath`). |
| `hreflang` | `BaseLayout` | All 5 locales + `x-default` on every page. |
| Open Graph / Twitter | `BaseLayout` | Full set; `og:image` is the per-place card or `og-default.jpg`; `og:locale` from `ogLocales`. |
| Icons / manifest | `BaseLayout` `<head>` | SVG + PNG favicon, `apple-touch-icon`, `site.webmanifest`. |
| RSS autodiscovery | `BaseLayout` `<head>` | `<link rel="alternate" type="application/rss+xml">`, per locale. |
| `robots` | `BaseLayout` (`noindex` prop) | Only the 404 page is `noindex`. `public/robots.txt` allows all + points at the sitemap. |
| Sitemap | `@astrojs/sitemap` (`astro.config.mjs`) | i18n-aware; `serialize` adds `priority`/`changefreq`/`lastmod`. |

## Structured data (JSON-LD `@graph`)

One `<script type="application/ld+json">` per page, assembled in `BaseLayout` from a
shared graph plus any node(s) a route passes via the `jsonLd` prop. Builders are in
**`src/lib/jsonLd.ts`** and **`src/lib/placeJsonLd.ts`**.

| Node | On | Built by |
| --- | --- | --- |
| `WebSite` (+ `publisher`) | every page | `BaseLayout` |
| `Organization` (the publisher, `@id` `#org`, `logo` → `/logo.png`) | every page | `buildOrganization` |
| `BreadcrumbList` | every page below home | `buildBreadcrumbJsonLd`, computed in `BaseLayout` from the path + page title — **no per-route wiring** |
| `TouristAttraction` | place guides | `buildPlaceJsonLd` (name, description, geo, address, `additionalType` from category, `temporalCoverage` from era, `sameAs` from sources, `publisher`) |
| `CollectionPage` + `ItemList` | places index, timeline | `buildPlacesItemList` / `buildTimelineItemList` |

The `#website` / `#org` `@id`s are shared so nodes cross-reference each other.

**Deliberately not modelled:** timeline events as `Event` — historical events don't
qualify for Google's event rich result, so `Event` markup would be misleading. They're
an `ItemList` instead (semantic structure, not a rich result).

## Brand assets (one source of truth)

`public/favicon.svg` (the Clock Tower / Sahat Kulla) drives everything, so the favicon,
header logo, PWA icons, Organization logo and OG share cards all match.

- `pnpm icons` (`scripts/gen-icons.mjs`) → `favicon-32.png`, `apple-touch-icon.png`,
  `icon-192.png`, `icon-512.png` (maskable), `logo.png` (512², Organization + manifest).
- `pnpm og` (`scripts/gen-og.mjs`) → `og-default.jpg` + per-place cards, using the same
  clock-tower mark and the `myGjakova` wordmark.

Both run automatically in `pnpm build` (before `astro build`).

## Headers (`public/_headers`)

Copied verbatim into `dist/` by Cloudflare Pages. Immutable caching for `/_astro/*`,
long cache for `/map/*` and `/og/*`, and site-wide security headers. Note: the CSP is
emitted by Astro as a `<meta>`, where `frame-ancestors` is ignored — so `X-Frame-Options:
SAMEORIGIN` in `_headers` is the real clickjacking guard.

## Re-checking it

```sh
pnpm check && pnpm build           # types/content, then the full static build
# Inspect emitted tags + JSON-LD:
grep -ro 'application/ld+json[^<]*' dist | head
# Validate a page's structured data in Google's Rich Results Test, and run
# Lighthouse (SEO + Core Web Vitals) against /, a place guide, /places, an /sq/ page.
```

## Known follow-ups (intentionally deferred)

- Per-page sitemap `lastmod` from content-file mtimes (today: a single build timestamp).
- Arabic (`ar`) locale — the stack is RTL-ready; adding it extends `hreflang` automatically.

**Search Console:** verified via the HTML-tag method — a `google-site-verification`
`<meta>` is emitted site-wide from `BaseLayout.astro`. After verifying, submit
`/sitemap-index.xml` under Sitemaps.
