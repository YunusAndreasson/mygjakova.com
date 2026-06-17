import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '~/i18n/utils';

/** Locale segment of a glob `id` ("en/grand-bazaar" → "en"). */
export function entryLocale(id: string): string {
  return id.split('/')[0] ?? '';
}

/** Locale-agnostic slug of a glob `id` ("en/grand-bazaar" → "grand-bazaar"). */
export function entrySlug(id: string): string {
  return id.split('/').slice(1).join('/');
}

/** Published places for a locale, ordered by `order` then title. */
export async function getPlaces(lang: Locale): Promise<CollectionEntry<'places'>[]> {
  const entries = await getCollection('places', (e) => !e.data.draft && entryLocale(e.id) === lang);
  return entries.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, lang),
  );
}

/** Published timeline events for a locale, ordered chronologically. */
export async function getTimeline(lang: Locale): Promise<CollectionEntry<'timeline'>[]> {
  const entries = await getCollection(
    'timeline',
    (e) => !e.data.draft && entryLocale(e.id) === lang,
  );
  return entries.sort((a, b) => a.data.year - b.data.year);
}
