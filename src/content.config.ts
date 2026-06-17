import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
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
] as const;

const places = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/places' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(PLACE_CATEGORIES),
      era: z.string().optional(),
      hero: image().optional(),
      heroAlt: z.string().optional(),
      coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
      address: z.string().optional(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      /** Slugs of related places (locale-agnostic), e.g. ['hadum-mosque']. */
      related: z.array(z.string()).default([]),
      /** Citations — see docs/SOURCES.md for the curated library to draw from. */
      sources: z
        .array(z.object({ label: z.string(), url: z.string().url().optional() }))
        .default([]),
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
      sources: z
        .array(z.object({ label: z.string(), url: z.string().url().optional() }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { places, timeline };
export { PLACE_CATEGORIES };
