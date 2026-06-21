// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Final deployed origin. Update when a custom domain is connected in Cloudflare.
const site = 'https://gjakova.pages.dev';

// Locales. Arabic ('ar') is intentionally deferred but the whole stack is
// RTL-ready (see src/i18n/utils.ts → getDirection). Adding it later is config,
// not surgery: add 'ar' here, an `ar` dictionary, and an Arabic-subset font.
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sq'],
    routing: {
      // English at "/", Albanian at "/sq/". No prefix for the default locale.
      prefixDefaultLocale: false,
    },
    // No `fallback` configured: every locale is fully mirrored, so a missing
    // translation should 404 rather than silently serve another language. When
    // a partially-translated locale (e.g. 'ar') is added, set
    // `fallback: { ar: 'en' }` + `routing.fallbackType: 'rewrite'` here.
  },

  // Instant-feeling navigation: prefetch links on hover.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  // Built-in CSP (Astro 6). Astro auto-manages script-src / style-src / font-src
  // ('self' + per-build hashes for its bundled scripts and styles). The object
  // form adds a hardened baseline plus the few extra directives the interactive
  // place map needs — all same-origin (no third-party, no API keys):
  //   • worker-src 'self' blob: — MapLibre runs its renderer on a Web Worker
  //     instantiated from a same-document `blob:` URL (its bundled worker).
  //   • connect-src 'self'      — PMTiles range requests + glyph PBFs (/map/…).
  //   • img-src 'self' data: blob: — Astro images, the inline `data:` paper
  //     grain, and MapLibre canvas/texture sources.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: blob:",
        "worker-src 'self' blob:",
        "connect-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'self'",
      ],
    },
  },

  // Self-hosted fonts via Astro's stable Fonts API (downloaded & cached at
  // build time, fallbacks generated, preload links emitted). latin-ext is
  // required for Albanian diacritics (ë, ç).
  fonts: [
    // Fraunces as a *variable* font (weight range, not discrete instances):
    // one file with the full 400–900 wght axis replaces the previous 10 static
    // cuts — leaner, and headings can use any weight. (Google's provider only
    // ships the wght axis here, not opsz; full optical sizing would need a
    // self-hosted VF.) Italic is unused, so it's dropped.
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--ff-display',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    // Reading serif: body (400) + bold (600, see `.prose strong`) + italic only.
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--ff-serif',
      weights: [400, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    // UI sans: only 400/500/600 are used in the chrome (700 was never referenced).
    {
      provider: fontProviders.google(),
      name: 'Hanken Grotesk',
      cssVariable: '--ff-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', sq: 'sq' },
      },
    }),
    mdx(),
  ],

  // No code blocks on a cultural guide — disabling Shiki keeps the build fully
  // CSP-compatible (Shiki emits per-token inline styles that can't be hashed).
  markdown: {
    syntaxHighlight: false,
  },

  // Compile-time image optimization (Sharp). No Cloudflare adapter needed for a
  // pure static build; optimized assets are emitted into dist/.
  image: {},

  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: true },
  },
});
