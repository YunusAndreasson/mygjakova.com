/**
 * Generates the raster icon set + Organization logo from public/favicon.svg
 * (run before `astro build`, alongside gen-og.mjs):
 *   node scripts/gen-icons.mjs
 *
 *   • public/favicon-32.png       — PNG fallback for the SVG favicon
 *   • public/apple-touch-icon.png — iOS home-screen icon (180×180)
 *   • public/icon-192.png         — PWA manifest icon
 *   • public/icon-512.png         — PWA manifest icon, MASKABLE (full-bleed)
 *   • public/logo.png             — schema.org Organization logo (512×512)
 *
 * The favicon (Clock Tower / Sahat Kulla on a dark rounded square) is the single
 * source of truth, so every icon matches the site header + OG share cards.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

// Source of truth: the favicon. Render a high-res master once, downscale for
// each output so they stay crisp (a 32-unit SVG upscaled from 32px would blur).
const faviconSvg = readFileSync(join(pub, 'favicon.svg'));
const master = await sharp(faviconSvg, { density: 2304 }).resize(1024, 1024).png().toBuffer();

const write = (name, size, buf = master) =>
  sharp(buf)
    .resize(size, size)
    .png()
    .toFile(join(pub, name))
    .then(() => console.log(`wrote public/${name}`));

await write('favicon-32.png', 32);
await write('apple-touch-icon.png', 180);
await write('icon-192.png', 192);
await write('logo.png', 512);

// Maskable icon: a full-bleed dark square (no rounded corners — the platform
// applies its own mask) with the Clock Tower centred inside the ~80% safe zone.
// The tower geometry mirrors public/favicon.svg.
const tower = `<path d="M8.5 28 L10.5 12 C10.5 7.5 12.8 4.5 16 4.5 C19.2 4.5 21.5 7.5 21.5 12 L23.5 28 Z" fill="#b4552d"/>
  <rect x="7" y="11" width="18" height="2" fill="#b4552d"/>
  <rect x="15.2" y="2.8" width="1.6" height="2.4" fill="#b4552d"/>
  <circle cx="16" cy="2.4" r="1.7" fill="#b4552d"/>
  <circle cx="16" cy="19" r="4.2" fill="#f6f1e7"/>
  <path d="M16 19 L16 15.8 M16 19 L18.3 20" stroke="#7c381d" stroke-width="1.2" stroke-linecap="round" fill="none"/>`;
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#2b2620"/>
  <g transform="translate(16 16) scale(0.78) translate(-16 -16)">${tower}</g>
</svg>`;
await sharp(Buffer.from(maskableSvg), { density: 2304 })
  .resize(512, 512)
  .png()
  .toFile(join(pub, 'icon-512.png'));
console.log('wrote public/icon-512.png (maskable)');
