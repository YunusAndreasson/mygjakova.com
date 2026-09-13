# Gjakova — cultural guide

An elegant, content-driven tourist guide to **Gjakova, Kosovo**, focused on its old
culture. Static Astro site deployed to Cloudflare Pages.

## Stack

- **Astro 6** (`output: 'static'`), **pnpm**, **TypeScript** (strict).
- **Tailwind CSS v4** via `@tailwindcss/vite` — CSS-first config in `src/styles/global.css`
  (the `@theme` block). The legacy `@astrojs/tailwind` integration is NOT used.
- **Fonts**: Astro Fonts API (self-hosted, build-time). Fraunces (display), Newsreader
  (reading serif), Hanken Grotesk (UI sans) → CSS vars `--ff-display/-serif/-sans`,
  mapped to Tailwind `font-display/serif/sans`.
- **Images**: Astro `<Image>` + Sharp at build time (no Cloudflare adapter).
- View transitions via `<ClientRouter />`; built-in CSP (`security.csp`).

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server. |
| `pnpm check` | `astro check` (type + content errors). Run before committing. |
| `pnpm lint` | Biome lint + format check on JS/TS/JSON. (`.astro` is covered by `pnpm check`; CSS by the Tailwind pipeline.) |
| `pnpm lint:fix` | Biome — apply safe lint fixes and format. |
| `pnpm test` | Vitest unit tests (`tests/**`). |
| `pnpm build` | Static build into `dist/`. |
| `pnpm verify` | Full check in one command: lint + check + test + build. Run before finishing. |
| `pnpm cf:preview` | Build + serve through `wrangler pages dev dist` (local CF runtime). |
| `pnpm deploy` | `astro check && astro build && wrangler pages deploy --branch main`. |
| `pnpm og` | Regenerate OG share cards (default + per-place) — brand clock-tower + `myGjakova` lockup. |
| `pnpm icons` | Regenerate the favicon PNG / PWA icon set + Organization `logo.png` from `favicon.svg`. |

## i18n (RTL-ready)

- Locales: `en` (default, no prefix) + `sq`, `de`, `tr`, `sv` (`/sq/...`, `/de/...`,
  `/tr/...`, `/sv/...`). Every locale is fully mirrored — routes, UI dictionary, view
  copy blocks and content. **Arabic (`ar`) is planned**;
  the stack is RTL-ready — add `ar` to `astro.config.mjs` `i18n.locales`, add an `ar`
  dictionary in `src/i18n/ui.ts`, and add an Arabic-subset font. `getDirection()`
  already returns `rtl` for it and `<html dir>` flips automatically.
- **Always use CSS logical properties** (`margin-inline`, `padding-block`,
  `inset-inline-start`, `text-align: start`, etc.) — never `left`/`right`. This is what
  makes Arabic "just work". Existing components follow this; keep it up.
- UI strings: `src/i18n/ui.ts` (`en` is the source of truth; missing keys fall back to
  `en`). Helpers in `src/i18n/utils.ts` (`useTranslations`, `localizedPath`,
  `getDirection`, `stripLocale`).
- **Maker byline is locale-aware**: `src/lib/maker.ts` is the single source —
  `makerName(lang)` gives *Jonas* Andreasson on `sv` and *Yunus* Andreasson everywhere
  else, `makerCredit(lang)` is the own-photography byline. Used by `<meta name="author">`,
  the JSON-LD `Person`, the About colophon and the Visit/About figure credits; the sv
  markdown front-matter `author:` fields say Jonas too. The Person node keeps one `@id`
  and carries the other form in `alternateName`, so the locales resolve to one identity.

## Content

- Collections defined in `src/content.config.ts` (Astro content layer + `glob` loader).
- Organised **by locale folder**: `src/content/<collection>/<locale>/<slug>.md`. The
  entry `id` is `"<locale>/<slug>"`; helpers in `src/lib/collections.ts`
  (`getPlaces(lang)`, `getTimeline(lang)`, `entrySlug`, `entryLocale`).
- `places` = guide pages; `timeline` = historical events. Hero images are **optional**:
  drop a real photo into `src/assets/places/` and set `hero:` (relative path) in the
  markdown. When `hero` is absent, `PlaceholderPlate.astro` renders an intentional
  typographic/duotone "plate" (no image request) keyed by `category` — so the design
  reads as deliberate, not as a missing photo, until real photography arrives.
- **Search titles:** places take optional `metaTitle` (full `<title>`, used verbatim) and
  `metaDescription` (replaces `summary` in the meta description), worded around real search
  queries — keep `title`/`summary` editorial. See [`docs/SEO.md`](docs/SEO.md).
- **Citations:** both collections take a `sources: [{ label, url? }]` field. Cite real
  entries from [`docs/SOURCES.md`](docs/SOURCES.md). They render via `Sources.astro`
  (`variant="block"` on guides, `variant="inline"` on the timeline).

## Sources & references

When writing or fact-checking place/timeline content, use the curated, annotated
bibliography in **[`docs/SOURCES.md`](docs/SOURCES.md)** — authoritative Kosovo-government,
Albanian, and Turkish/Ottoman-heritage sources, plus the primary Evliya Çelebi (1662)
account. **Read its "Cautions & disambiguation" section first** — there are real
wrong-city traps (e.g. TDV İslâm Ansiklopedisi's "Yakova/Diyakova" is Đakovo in *Croatia*,
not Gjakova) and contested dates (Hadum Mosque 1574 vs 1594/95). Prefer official/academic
sources; cross-check dates; cite endonyms per locale.

## Structure

- `src/pages/` = EN routes; `src/pages/sq|de|tr|sv/` = the locale mirrors. Pages are thin
  wrappers that render a **view** from `src/components/views/` with an explicit `lang` prop.
- Add a new page once per locale; add new place/timeline content by dropping markdown
  into the locale folders (no code change).

## Deploy (Cloudflare Pages, direct upload)

`pnpm deploy` builds and uploads `dist/` to the `gjakova` Pages project
(`wrangler.jsonc` → `pages_build_output_dir`). Auth: `wrangler login` once, or set
`CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` (token: *Account · Cloudflare Pages ·
Edit*). `--branch main` = production; any other branch = a preview URL. Update `site`
in `astro.config.mjs` and the Sitemap URL in `public/robots.txt` when a custom domain
is connected.

## Deferred (not yet built)

Search, a CMS, dark theme, and original (own) photography. Note: freely-licensed
historical/CC imagery is now in place (see "Sourced imagery" below) — the gap is
commissioned photography, not images in general.

**Built since:** interactive place maps (MapLibre GL + self-hosted Protomaps PMTiles,
`PlaceMap.astro` over the `MapEmbed.astro` fallback — see [`docs/MAP.md`](docs/MAP.md));
per-place OG images (`scripts/gen-og.mjs`, run on `pnpm build`); richer `TouristAttraction`
JSON-LD (`src/lib/placeJsonLd.ts`); place photo gallery + `<dialog>` lightbox
(`Gallery.astro`, renders when the `gallery` field is populated); an "On this page" TOC
(`TableOfContents.astro`, shows at ≥2 headings); share/directions (`PlaceActions.astro`);
a rewritten About page with a "Gjakova in brief" facts block; a self-hosted, tile-free
**Kosovo locator map** (inline SVG: `KosovoLocator.astro`, geometry generated by
`scripts/gen-locator.mjs` → `src/lib/kosovoLocator.ts`, see [`docs/MAP.md`](docs/MAP.md)); and a
site-wide footer credit (`footer.credit`). CSP moved to the object form in `astro.config.mjs`
to permit the map (all same-origin).

**Visit page (`/visit`):** a plan-your-trip guide — an essentials "Good to know" strip,
transport route cards, a hand-built temperature/rainfall **climatograph**
(`ClimateChart.astro`, drawing real monthly normals from `src/lib/visitData.ts` as pure
inline SVG — the `KosovoLocator` pattern, no chart library), a softened where-to-stay list
and halal/prayer logistics. Building it extracted the tinted facts plate into a reusable
`FactsPanel.astro` (now shared with the About page). The page is **translated into every
locale** — `VisitView` carries one copy block per locale (and its figures), `ClimateChart`
is localised (legend, source, screen-reader summary; month labels come from `Intl`), each
`/<locale>/visit` mirrors it, and the nav link shows everywhere. Locale copy blocks may
**differ in what they include**, not just in wording: `halalTitle`/`halal` are optional and
the Swedish edition omits that section entirely (its practical cash note moved into the sv
`arrivalNote`), so the section renders only where the block defines it. The static `404.astro` is
locale-aware too: it ships all five languages and a tiny script swaps copy based on the
first path segment (one `404.html` serves every unmatched route).

**Sourced imagery (Wikimedia Commons):** the timeline, place galleries and the About
page are illustrated with freely-licensed photographs, scans and manuscripts (public
domain / CC) — including rare archival material (the *Seyahatnâme* title page, an 1877
engraving of Mehmed Ali Pasha, Franz Nopcsa's 1903–13 highland photographs, a c.1900
regional map, the 1933 *Kanun*). Every image carries **visible attribution**:
`Figure.astro` (timeline + About) and the `gallery` lightbox/credits panel both render
`ImageCredit.astro` (author · source · licence, linked to the file page). Schema gained
optional `caption` + `credit` on gallery items and `imageCaption`/`imageCredit` on
timeline (`src/content.config.ts`). Sourcing is **reproducible** via `scripts/data/`:
`commons.py` (search / licence lookup / download), `image-manifest.mjs` (the single
source of truth — files + verified attribution + placements), `fetch-images.mjs` →
`src/assets/photos/`, `apply-images.mjs` (writes front-matter; overwrite-safe), and
`gen-credits.mjs` → [`docs/IMAGES.md`](docs/IMAGES.md) (the provenance ledger). Hero
plates on place pages remain original illustrated artwork, not sourced photos.

**SEO & structured data:** the technical baseline (per-locale `<title>`, self-referential
canonical, `hreflang` for all 5 locales + `x-default`, OG/Twitter, locale-specific OG cards)
lives in `BaseLayout.astro`. Structured data is a single JSON-LD `@graph` per page: a
site-wide `WebSite` + `Organization` (publisher), an auto-computed `BreadcrumbList` (derived
in `BaseLayout` from the path + page title — no per-route wiring), `TouristAttraction` on
place guides (`src/lib/placeJsonLd.ts`), and `CollectionPage`+`ItemList` on the places index
and timeline. Shared node builders are in [`src/lib/jsonLd.ts`](src/lib/jsonLd.ts). Brand
assets all derive from `public/favicon.svg` (the Clock Tower): `pnpm icons` emits the
favicon-PNG/PWA/`apple-touch-icon` set + `logo.png` (Organization logo + manifest), and OG
cards use the same clock-tower + `myGjakova` lockup. Also: per-locale RSS feeds
(`src/pages/**/rss.xml.ts`), sitemap `priority`/`changefreq`/`lastmod` (`astro.config.mjs`
`serialize`), `public/site.webmanifest`, and `public/_headers` (immutable asset caching +
security headers; `X-Frame-Options` there is the real clickjacking guard, since the Astro CSP
ships as `<meta>` where `frame-ancestors` is ignored). Full map: [`docs/SEO.md`](docs/SEO.md).
