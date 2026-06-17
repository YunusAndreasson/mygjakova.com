/**
 * Generates the default Open Graph share image (public/og-default.jpg).
 *   node scripts/gen-og.mjs
 * Text uses generic system serif/sans (fontconfig) — fine for a share card.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-default.jpg');
const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
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

await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(OUT);
console.log('wrote', OUT);
