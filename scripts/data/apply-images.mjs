/**
 * Write image front-matter into the locale markdown from image-manifest.mjs:
 *   • timeline entries get  image / imageAlt / imageCaption / imageCredit
 *   • place entries get a    gallery: [ … ]   array
 * Both with verified attribution (author · source · licence · file-page URL).
 *
 * Overwrite-safe: every run first STRIPS the managed keys from all timeline /
 * place files, then re-inserts from the manifest. So editing a caption — or
 * removing an entry from the manifest — propagates cleanly on the next run.
 * Run after fetch-images.mjs. The About-page image is wired by hand in AboutView.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { images, timeline, places } from './image-manifest.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const LOCALES = ['en', 'sq'];
const REL = '../../../assets/photos'; // from src/content/<coll>/<locale>/*.md
const TL_KEYS = new Set(['image', 'imageAlt', 'imageCaption', 'imageCredit']);
const PLACE_KEYS = new Set(['gallery']);

const q = (s) => JSON.stringify(s); // safe YAML double-quoted scalar

/** YAML lines for a credit mapping under `key`, at the given indent (spaces). */
function creditYaml(img, key, indent) {
  const p = ' '.repeat(indent);
  const out = [`${p}${key}:`];
  const f = (k, v) => v && out.push(`${p}  ${k}: ${q(v)}`);
  f('author', img.author);
  f('source', img.source);
  f('license', img.license);
  f('licenseUrl', img.licenseUrl);
  f('url', img.page);
  return out;
}

/** Locate the [open, close] front-matter fence line indices. */
function fences(lines) {
  let a = -1;
  let b = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (a < 0) a = i;
      else {
        b = i;
        break;
      }
    }
  }
  return [a, b];
}

/** Remove given top-level keys (and their indented children) from front-matter. */
function stripKeys(text, keys) {
  const lines = text.split('\n');
  const [a, b] = fences(lines);
  if (a < 0 || b < 0) return text;
  const head = lines.slice(0, a + 1);
  const tail = lines.slice(b);
  const body = lines.slice(a + 1, b);
  const kept = [];
  for (let i = 0; i < body.length; i++) {
    const m = body[i].match(/^([A-Za-z0-9_]+):/);
    if (m && keys.has(m[1])) {
      // drop this key line and any subsequent indented (child) lines
      while (i + 1 < body.length && /^\s/.test(body[i + 1])) i++;
      continue;
    }
    kept.push(body[i]);
  }
  return [...head, ...kept, ...tail].join('\n');
}

/** Insert `snippet` (array of lines) before the closing front-matter fence. */
function insertFrontmatter(text, snippet) {
  const lines = text.split('\n');
  const [, b] = fences(lines);
  if (b < 0) throw new Error('no front-matter fences');
  lines.splice(b, 0, ...snippet);
  return lines.join('\n');
}

function timelineSnippet(slug, locale) {
  const def = timeline[slug];
  if (!def) return null;
  const img = images[def.image];
  if (!img) throw new Error(`timeline ${slug}: unknown image ${def.image}`);
  return [
    `image: ${REL}/${img.id}.jpg`,
    `imageAlt: ${q(def.alt[locale])}`,
    `imageCaption: ${q(def.caption[locale])}`,
    ...creditYaml(img, 'imageCredit', 0),
  ];
}

function placeSnippet(slug, locale) {
  const gallery = places[slug];
  if (!gallery) return null;
  const out = ['gallery:'];
  for (const item of gallery) {
    const img = images[item.image];
    if (!img) throw new Error(`place ${slug}: unknown image ${item.image}`);
    out.push(`  - src: ${REL}/${img.id}.jpg`);
    out.push(`    alt: ${q(item.alt[locale])}`);
    if (item.caption?.[locale]) out.push(`    caption: ${q(item.caption[locale])}`);
    out.push(...creditYaml(img, 'credit', 4));
  }
  return out;
}

let changed = 0;
function processDir(coll, keys, snippetFor) {
  for (const locale of LOCALES) {
    const dir = resolve(root, `src/content/${coll}/${locale}`);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      const path = resolve(dir, file);
      const text = readFileSync(path, 'utf8');
      const stripped = stripKeys(text, keys);
      const snippet = snippetFor(slug, locale);
      const next = snippet ? insertFrontmatter(stripped, snippet) : stripped;
      if (next !== text) {
        writeFileSync(path, next);
        changed++;
      }
    }
  }
}

processDir('timeline', TL_KEYS, timelineSnippet);
processDir('places', PLACE_KEYS, placeSnippet);
console.log(`front-matter: ${changed} files updated`);
