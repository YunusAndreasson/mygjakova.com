/**
 * Download every image in image-manifest.mjs to src/assets/photos/ (scaled to
 * 1600px wide via the Commons thumbnailer). Idempotent: existing files are
 * skipped, so re-running only fetches what's missing.
 */
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { images } from './image-manifest.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const helper = resolve(root, 'scripts/data/commons.py');
const WIDTH = 1600;

let ok = 0;
let skip = 0;
let fail = 0;
for (const { id, file, dest } of Object.values(images)) {
  // The site's own photography is placed locally, not fetched from Commons.
  if (!file) {
    skip++;
    continue;
  }
  const abs = resolve(root, dest);
  if (existsSync(abs) && statSync(abs).size > 1024) {
    skip++;
    continue;
  }
  mkdirSync(dirname(abs), { recursive: true });
  try {
    execFileSync('python3', [helper, 'download', file, abs, String(WIDTH)], {
      stdio: ['ignore', 'inherit', 'inherit'],
    });
    ok++;
  } catch (e) {
    fail++;
    console.error(`FAILED ${id} (${file}): ${e.message}`);
  }
}
console.log(`\nimages: ${ok} downloaded, ${skip} already present, ${fail} failed`);
if (fail) process.exit(1);
