import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Content is organised by locale via folders: src/content/<collection>/<locale>/*.md
 * The glob loader derives each entry's `id` as "<locale>/<name>" (e.g.
 * "en/grand-bazaar"), so locale + slug come straight from the file path — no
 * redundant front-matter field to keep in sync. See src/lib/collections.ts.
 */

const PLACE_CATEGORIES = [
  'bazaar',
  'mosque',
  'house',
  'bridge',
  'museum',
  'monument',
  'tekke',
  'square',
  'nature',
] as const;

/**
 * Image attribution. Sourced imagery (Wikimedia Commons etc.) must carry visible
 * credit — author + licence + a link to the file page. Rendered by ImageCredit.astro
 * (and the gallery credits list). All fields optional so own-work needs no ceremony.
 */
const credit = z.object({
  author: z.string().optional(),
  source: z.string().optional(), // e.g. "Wikimedia Commons"
  license: z.string().optional(), // e.g. "CC BY-SA 4.0"
  licenseUrl: z.string().optional(),
  url: z.string().optional(), // link to the source / file-description page
});

const places = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/places' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      /**
       * Search-result overrides. `metaTitle` is the full <title> (no " — Gjakova"
       * suffix is appended) and `metaDescription` replaces `summary` in the meta
       * description — worded around what people actually search for (see
       * docs/SEO.md), while `title`/`summary` stay editorial on the page itself.
       */
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      category: z.enum(PLACE_CATEGORIES),
      era: z.string().optional(),
      hero: image().optional(),
      heroAlt: z.string().optional(),
      heroCredit: credit.optional(),
      coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
      address: z.string().optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
            credit: credit.optional(),
          }),
        )
        .default([]),
      /** Slugs of related places (locale-agnostic), e.g. ['hadum-mosque']. */
      related: z.array(z.string()).default([]),
      /** Citations — see docs/SOURCES.md for the curated library to draw from. */
      sources: z.array(z.object({ label: z.string(), url: z.url().optional() })).default([]),
      order: z.number().default(100),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/timeline' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Numeric sort key (use the start year). */
      year: z.number(),
      /** Human label, e.g. "1594", "15th c.", "1969–1999". */
      displayDate: z.string().optional(),
      era: z.string().optional(),
      summary: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageCaption: z.string().optional(),
      imageCredit: credit.optional(),
      sources: z.array(z.object({ label: z.string(), url: z.url().optional() })).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { places, timeline };
export { PLACE_CATEGORIES };
