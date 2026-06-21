# Place maps — self-hosted vector basemap

The place guides render an interactive map with **MapLibre GL JS** over a
**self-hosted [Protomaps](https://protomaps.com) PMTiles** extract. There is **no
API key and no third-party runtime call** — every tile, glyph and style file is
served from our own origin (`/map/…`), in keeping with the site's self-hosted,
CSP-locked ethos. The component (`src/components/PlaceMap.astro`) progressively
enhances the static OpenStreetMap link (`MapEmbed.astro`): with no JS, or if the
map fails to load, the link card remains.

## Assets (committed under `public/map/`)

| File | What | Approx size |
| --- | --- | --- |
| `gjakova.pmtiles` | Vector tile extract, Gjakova bbox, z0–15 | ~2.5 MB |
| `style.json` | MapLibre style (warm site palette, no sprite) | ~64 KB |
| `glyphs/<font>/<range>.pbf` | Label glyphs: Noto Sans Regular/Medium/Italic, Latin + Latin-ext (covers ë/ç) | ~0.6 MB total |

All are static — committed to the repo and shipped verbatim into `dist/map/`.
PMTiles is read with HTTP **Range** requests, which Cloudflare Pages serves for
static assets, so the whole archive is never downloaded.

## Regenerating

Requires the [`pmtiles` CLI](https://github.com/protomaps/go-pmtiles/releases).

```sh
# 1. Vector extract for the Gjakova bbox from a recent Protomaps daily build.
#    (Builds are retained ~2 weeks; pick a current date from build.protomaps.com.)
pmtiles extract https://build.protomaps.com/<YYYYMMDD>.pmtiles \
  public/map/gjakova.pmtiles --bbox=20.38,42.35,20.48,42.42 --maxzoom=16

# 2. Themed style from the @protomaps/basemaps layer helper (site palette,
#    local glyphs, sprite-free). Re-run whenever the extract is regenerated.
pnpm map:style       # → node scripts/gen-map-style.mjs

# 3. (Only if the style references new fonts) refresh the glyph PBFs.
#    Source: https://protomaps.github.io/basemaps-assets/fonts/<font>/<range>.pbf
```

Attribution (`© OpenStreetMap · Protomaps`) is carried in the style's source
`attribution` and shown by MapLibre's attribution control — keep it.

## Kosovo locator map (separate, no tiles)

The About page also shows a **country-level locator** — the silhouette of Kosovo
with Gjakova pinned (and the capital, Prishtina, as a faint reference). This is
**not** the PMTiles map: the place basemap only covers the Gjakova bbox, so the
locator is a self-contained **inline SVG** instead — no MapLibre, no tiles, no
runtime fetch, nothing extra for the CSP to allow.

- Component: `src/components/KosovoLocator.astro` (palette + labels; i18n keys
  `locator.*`). Used in `AboutView.astro`'s "Gjakova in brief" block.
- Geometry: pre-projected at build time into `src/lib/kosovoLocator.ts` by
  `scripts/gen-locator.mjs` (`pnpm map:locator`). It reads the committed boundary
  `scripts/data/kosovo.geojson` (Natural Earth admin-0, public domain),
  simplifies it (Douglas–Peucker), and projects it equirectangularly with a
  `cos(lat)` width correction. `src/lib/kosovoLocator.ts` is generated — it's
  excluded from Biome (`biome.json`) like `public/map`; edit the script, not it.
- Re-run `pnpm map:locator` only if the boundary or the pinned-city list changes.

## Content Security Policy

`astro.config.mjs` adds `worker-src 'self' blob:`, `connect-src 'self'`,
`img-src 'self' data: blob:` to permit MapLibre's worker, the PMTiles/glyph
range fetches, and canvas textures — all same-origin (`blob:`/`data:` are
same-document). Script and style remain Astro-hashed `'self'`.
