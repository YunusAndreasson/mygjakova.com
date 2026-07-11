/**
 * Generates Open Graph share images (run before `astro build`):
 *   node scripts/gen-og.mjs
 *
 *   • public/og-default.jpg            — site-wide default card
 *   • public/og/places/<locale>-<slug>.jpg — one card per place, keyed to the
 *     place's category duotone (mirrors PlaceholderPlate so a shared link looks
 *     like the page it points to).
 *
 * The brand mark is the Clock Tower (Sahat Kulla) — the SAME silhouette as the
 * favicon and the site header — and the wordmark is "myGjakova", so a shared
 * link matches the site's identity (not a generic, off-brand card).
 *
 * Text uses generic system serif/sans (fontconfig) — fine for a share card.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { paletteFor } from '../src/lib/placePalette.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1200;
const H = 630;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * The Clock Tower (Sahat Kulla) brand mark, drawn in a 32×32 unit box (the same
 * geometry as public/favicon.svg). `translate`+`scale` place and size it; colours
 * are passed so it can sit on any card background. No dark backing square — the
 * card supplies the background.
 */
function clockTower(x, y, scale, { body, face, hand }) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M8.5 28 L10.5 12 C10.5 7.5 12.8 4.5 16 4.5 C19.2 4.5 21.5 7.5 21.5 12 L23.5 28 Z" fill="${body}"/>
    <rect x="7" y="11" width="18" height="2" fill="${body}"/>
    <rect x="15.2" y="2.8" width="1.6" height="2.4" fill="${body}"/>
    <circle cx="16" cy="2.4" r="1.7" fill="${body}"/>
    <circle cx="16" cy="19" r="4.2" fill="${face}"/>
    <path d="M16 19 L16 15.8 M16 19 L18.3 20" stroke="${hand}" stroke-width="1.2" stroke-linecap="round" fill="none"/>
  </g>`;
}

/** Faint pointed-arch arcade — the bazaar motif, used as a right-edge watermark. */
function archArcade(stroke, opacity) {
  return `<g fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="2">
    <path d="M812 630 L812 360 Q1006 118 1200 360 L1200 630"/>
    <path d="M906 630 L906 432 Q1006 300 1106 432 L1106 630"/>
  </g>`;
}

// --- Site-wide default card -------------------------------------------------
const defaultSvg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stop-color="#7c381d"/>
      <stop offset="1" stop-color="#2b2620"/>
    </linearGradient>
    <radialGradient id="glow" cx="22%" cy="30%" r="70%">
      <stop offset="0" stop-color="#d8be7e" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#d8be7e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  ${archArcade('#f6f1e7', '0.10')}

  <!-- Clock Tower brand mark (matches the favicon + header logo) -->
  ${clockTower(96, 108, 5.6, { body: '#c96a3f', face: '#f6f1e7', hand: '#7c381d' })}

  <!-- Wordmark: myGjakova ("my" lighter terracotta, "Gjakova" cream) -->
  <text x="92" y="452" font-family="Georgia, 'Times New Roman', serif" font-size="128" font-weight="700" letter-spacing="-3">
    <tspan fill="#c96a3f" font-weight="400">my</tspan><tspan fill="#fbf7ee">Gjakova</tspan>
  </text>
  <rect x="100" y="486" width="64" height="4" fill="#c5a65c"/>
  <text x="180" y="504" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#e8e2d5" letter-spacing="1">A cultural guide to the old city</text>
</svg>`;

await sharp(Buffer.from(defaultSvg))
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(root, 'public', 'og-default.jpg'));
console.log('wrote public/og-default.jpg');

// --- Per-place cards --------------------------------------------------------
// Literal duotone hex for each palette name. These mirror the design tokens in
// src/styles/global.css (e.g. warm.a === --color-terracotta-500); SVG needs
// literal colours, so they can't reference the CSS vars. The category → palette
// name mapping itself is shared with PlaceholderPlate via src/lib/placePalette.mjs.
const PALETTE = {
  warm: { a: '#b4552d', b: '#5f2c18', fg: '#fbf7ee', accent: '#d8be7e' },
  brass: { a: '#927231', b: '#2b2620', fg: '#fbf7ee', accent: '#d8be7e' },
  stone: { a: '#5e5444', b: '#1c1915', fg: '#f6f1e7', accent: '#c5a65c' },
};

function frontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const block = m ? m[1] : '';
  const field = (key) => {
    const r = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return r ? r[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
  };
  return { title: field('title'), category: field('category') };
}

function placeSvg(title, category) {
  const pal = PALETTE[paletteFor(category)] ?? PALETTE.warm;
  const len = title.length;
  const size = len > 24 ? 76 : len > 16 ? 96 : 116;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0" stop-color="${pal.a}"/>
      <stop offset="1" stop-color="${pal.b}"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="28%" r="75%">
      <stop offset="0" stop-color="${pal.accent}" stop-opacity="0.26"/>
      <stop offset="1" stop-color="${pal.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>

  <!-- faint pointed-arch arcade watermark (the bazaar motif) -->
  ${archArcade(pal.fg, '0.13')}

  <text x="96" y="250" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="6" fill="${pal.accent}">${esc((category ?? '').toUpperCase())}</text>
  <text x="92" y="378" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="700" fill="${pal.fg}" letter-spacing="-1">${esc(title)}</text>

  <!-- brand lockup: Clock Tower mark + myGjakova wordmark -->
  ${clockTower(96, 476, 1.3, { body: pal.accent, face: pal.fg, hand: pal.b })}
  <text x="150" y="514" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${pal.fg}" fill-opacity="0.85" letter-spacing="0.5">myGjakova — a cultural guide</text>
</svg>`;
}

const ogDir = join(root, 'public', 'og', 'places');
mkdirSync(ogDir, { recursive: true });
const placesBase = join(root, 'src', 'content', 'places');

let count = 0;
for (const locale of readdirSync(placesBase, { withFileTypes: true })) {
  if (!locale.isDirectory()) continue;
  const dir = join(placesBase, locale.name);
  for (const file of readdirSync(dir)) {
    if (!/\.(md|mdx)$/.test(file)) continue;
    const slug = basename(file).replace(/\.(md|mdx)$/, '');
    const { title, category } = frontmatter(readFileSync(join(dir, file), 'utf8'));
    if (!title) continue;
    await sharp(Buffer.from(placeSvg(title, category ?? 'bazaar')))
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(join(ogDir, `${locale.name}-${slug}.jpg`));
    count++;
  }
}
console.log(`wrote ${count} place OG image(s) to public/og/places/`);
