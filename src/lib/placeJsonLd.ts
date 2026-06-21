import type { CollectionEntry } from 'astro:content';
import type { Locale } from '~/i18n/utils';

/**
 * Build the `TouristAttraction` schema.org node for a place guide. Shared by the
 * EN and SQ `[...slug].astro` routes so the structured data stays identical
 * across locales. Returned node is merged into the page `@graph` by BaseLayout.
 */
export function buildPlaceJsonLd(opts: {
  place: CollectionEntry<'places'>;
  lang: Locale;
  /** Absolute canonical URL of the page. */
  url: string;
  /** Origin href, e.g. "https://gjakova.pages.dev/". */
  origin: string;
  /** Absolute URL of the per-place OG image. */
  image: string;
}): Record<string, unknown> {
  const { place, lang, url, origin, image } = opts;
  const { title, summary, coordinates, address, sources } = place.data;

  // Cite the same authoritative URLs already in the guide as `sameAs` links.
  const sameAs = sources.map((s) => s.url).filter((u): u is string => Boolean(u));

  return {
    '@type': 'TouristAttraction',
    name: title,
    description: summary,
    url,
    image,
    inLanguage: lang,
    isPartOf: { '@id': `${origin}#website` },
    containedInPlace: {
      '@type': 'City',
      name: 'Gjakova',
      address: { '@type': 'PostalAddress', addressLocality: 'Gjakovë', addressCountry: 'XK' },
    },
    ...(coordinates && {
      geo: { '@type': 'GeoCoordinates', latitude: coordinates.lat, longitude: coordinates.lng },
    }),
    ...(address && { address }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
