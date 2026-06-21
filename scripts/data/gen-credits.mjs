/**
 * Generate docs/IMAGES.md — a provenance ledger for every sourced image, built
 * from image-manifest.mjs so it never drifts from what the site actually ships.
 * Run: node scripts/data/gen-credits.mjs   (also fine to run in CI before build).
 */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { images, timeline, places, about } from './image-manifest.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

// Where each image id is used.
const usedIn = {};
const add = (id, where) => {
  if (!usedIn[id]) usedIn[id] = [];
  usedIn[id].push(where);
};
for (const [slug, def] of Object.entries(timeline)) add(def.image, `timeline · ${slug}`);
for (const [slug, gal] of Object.entries(places))
  for (const item of gal) add(item.image, `place · ${slug}`);
add(about.image, 'about page');

const rows = Object.values(images).map((img) => {
  const lic = img.licenseUrl ? `[${img.license}](${img.licenseUrl})` : img.license;
  const where = (usedIn[img.id] ?? ['(unused)']).join('; ');
  return `| [${img.file.replace(/^File:/, '')}](${img.page}) | ${img.author} | ${lic} | ${where} |`;
});

const md = `# Image credits & provenance

Every photograph and scan on the site is a freely-licensed work from **Wikimedia
Commons** (public-domain or Creative Commons), reused with attribution. This file
is **generated** from \`scripts/data/image-manifest.mjs\` — do not edit by hand; run
\`node scripts/data/gen-credits.mjs\` after changing the manifest.

Attribution also renders **in the site itself**: under each timeline/About figure,
and in the "Image credits" panel beneath every place gallery (and in its lightbox).

The illustrated **hero plates** on place pages are original artwork for this guide,
not sourced images, and are not listed here.

> ${rows.length} sourced images. Last generated from the manifest.

| Image | Author | Licence | Used in |
| --- | --- | --- | --- |
${rows.join('\n')}

## How imagery is sourced

1. Find candidates: \`python3 scripts/data/commons.py search "<query>"\`
2. Verify licence + author: \`python3 scripts/data/commons.py info "File:<name>"\`
   (only public-domain / CC works are used).
3. Add a record to \`scripts/data/image-manifest.mjs\` and map it to a timeline
   entry or place gallery.
4. \`node scripts/data/fetch-images.mjs\` downloads to \`src/assets/photos/\`.
5. \`node scripts/data/apply-images.mjs\` writes the front-matter (with credit).
6. \`node scripts/data/gen-credits.mjs\` regenerates this file.
`;

writeFileSync(resolve(root, 'docs/IMAGES.md'), md);
console.log(`docs/IMAGES.md written (${rows.length} images)`);
