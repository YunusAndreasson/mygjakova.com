// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Final deployed origin. Update when a custom domain is connected in Cloudflare.
const site = 'https://mygjakova.com';

// Locales. Arabic ('ar') is intentionally deferred but the whole stack is
// RTL-ready (see src/i18n/utils.ts → getDirection). Adding it later is config,
// not surgery: add 'ar' here, an `ar` dictionary, and an Arabic-subset font.
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',

  // Emit all styles as external same-origin <link> stylesheets, never inline
  // <style> blocks. Required for the built-in CSP (security.csp) to coexist
  // with <ClientRouter /> view transitions: inline styles are allow-listed by
  // per-page sha256 hashes, but a soft navigation keeps the *first* page's
  // <meta> CSP active while swapping in the next page's differently-hashed
  // inline styles — so the browser blocks them and the CSS appears broken until
  // a full reload. External stylesheets are covered by `style-src 'self'` on
  // every page (no per-page hashes), and ClientRouter awaits them before swap.
  build: { inlineStylesheets: 'never' },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sq', 'de', 'tr', 'sv'],
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
  // The one third-party exception is Cloudflare Web Analytics (cookieless, no
  // personal data): its beacon script loads from static.cloudflareinsights.com
  // and reports to cloudflareinsights.com — so script-src and connect-src name
  // exactly those two origins and nothing else.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: blob:",
        "worker-src 'self' blob:",
        "connect-src 'self' https://cloudflareinsights.com",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'self'",
      ],
      // Overrides Astro's default script-src sources, so 'self' is restated.
      // Astro still appends the per-build hashes of its own scripts.
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
      },
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
        locales: { en: 'en', sq: 'sq', de: 'de', tr: 'tr', sv: 'sv' },
      },
      // Freshness + importance hints. lastmod is the build time (a per-page
      // lastmod would require reading content mtimes — a future refinement).
      // Priority: home > places (the core content) > everything else.
      serialize(item) {
        const bare = new URL(item.url).pathname.replace(/^\/(sq|de|tr|sv)(?=\/|$)/, '') || '/';
        // Match the page canonicals (directory-style, trailing slash) so every
        // sitemap URL returns 200 directly instead of 308-redirecting on
        // Cloudflare Pages. Applies to the entry and its hreflang alternates.
        const slash = (/** @type {string} */ u) => (u.endsWith('/') ? u : `${u}/`);
        item.url = slash(item.url);
        if (item.links) item.links = item.links.map((l) => ({ ...l, url: slash(l.url) }));
        item.lastmod = new Date().toISOString();
        item.priority = bare === '/' ? 1.0 : bare.startsWith('/places') ? 0.8 : 0.6;
        // changefreq is typed as the `sitemap` package's EnumChangefreq; the
        // string value is correct, so cast the literal to satisfy the checker.
        item.changefreq = /** @type {any} */ ('monthly');
        return item;
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
