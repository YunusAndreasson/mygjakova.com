/**
 * Generates the self-hosted MapLibre style for the place maps:
 *   node scripts/gen-map-style.mjs
 *
 * Uses @protomaps/basemaps to emit schema-correct layers for the Protomaps v4
 * basemap (the schema of public/map/gjakova.pmtiles), then:
 *   - warms the palette toward the site's sand/paper tokens,
 *   - points `glyphs` at the self-hosted PBFs in public/map/glyphs,
 *   - points the vector source at the local pmtiles archive (same-origin),
 *   - drops sprite-dependent icon layers (we render our own DOM markers), so
 *     no sprite sheet needs hosting.
 * The result is committed at public/map/style.json. Re-run when the pmtiles
 * extract is regenerated (see docs/MAP.md).
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { layers, LIGHT } from '@protomaps/basemaps';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'map', 'style.json');

// Warm the neutral "light" flavor toward the site palette (sand paper, warm
// earth, terracotta-tinged major roads). Only a few keys are overridden; the
// rest of the Protomaps light theme stays as a calm, legible base.
const flavor = {
  ...LIGHT,
  background: '#f6f1e7', // --color-paper
  earth: '#fbf7ee', // --color-surface
  buildings: '#ece3d2', // --color-sand-200
  water: '#cdd9d6',
  major: '#e8d8c4',
  major_casing: '#d6c9b2', // --color-sand-400
  medium: '#efe6d6',
  medium_casing: '#e0d4be',
  minor: '#f3ece0',
  minor_casing: '#e6dccb',
};

const allLayers = layers('protomaps', flavor, { lang: 'en' });

// Strip sprite icons: keep text labels, drop icon-image so no sprite is needed.
const styleLayers = allLayers
  .filter((l) => !(l.type === 'symbol' && l.layout?.['icon-image'] && !l.layout?.['text-field']))
  .map((l) => {
    if (l.layout?.['icon-image']) {
      const { 'icon-image': _i, 'icon-size': _s, ...layout } = l.layout;
      return { ...l, layout };
    }
    return l;
  });

const style = {
  version: 8,
  glyphs: '/map/glyphs/{fontstack}/{range}.pbf',
  sources: {
    protomaps: {
      type: 'vector',
      url: 'pmtiles:///map/gjakova.pmtiles',
      attribution:
        '<a href="https://openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a> · <a href="https://protomaps.com" target="_blank" rel="noopener">Protomaps</a>',
    },
  },
  layers: styleLayers,
};

writeFileSync(OUT, JSON.stringify(style));
console.log('wrote', OUT, '—', styleLayers.length, 'layers');
