/**
 * Generates Open Graph share images (run before `astro build`):
 *   node scripts/gen-og.mjs
 *
 *   • public/og-default.jpg            — site-wide default card
 *   • public/og/places/<locale>-<slug>.jpg — one card per place, keyed to the
 *     place's category duotone (mirrors PlaceholderPlate so a shared link looks
 *     like the page it points to).
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

  <!-- arch mark -->
  <path d="M96 300 L96 150 Q156 56 216 150 L216 300 Z" fill="#b4552d"/>
  <rect x="146" y="232" width="20" height="68" rx="4" fill="#2b2620"/>

  <text x="96" y="430" font-family="Georgia, 'Times New Roman', serif" font-size="120" font-weight="700" fill="#fbf7ee" letter-spacing="-2">Gjakova</text>
  <rect x="100" y="468" width="64" height="4" fill="#c5a65c"/>
  <text x="180" y="486" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#e8e2d5" letter-spacing="1">A cultural guide to the old city</text>
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
  <g fill="none" stroke="${pal.fg}" stroke-opacity="0.13" stroke-width="2">
    <path d="M812 630 L812 360 Q1006 118 1200 360 L1200 630"/>
    <path d="M906 630 L906 432 Q1006 300 1106 432 L1106 630"/>
  </g>

  <text x="96" y="250" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="6" fill="${pal.accent}">${esc((category ?? '').toUpperCase())}</text>
  <text x="92" y="378" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="700" fill="${pal.fg}" letter-spacing="-1">${esc(title)}</text>
  <rect x="100" y="500" width="56" height="4" fill="${pal.accent}"/>
  <text x="172" y="516" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${pal.fg}" fill-opacity="0.85" letter-spacing="1">Gjakova — a cultural guide</text>
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
