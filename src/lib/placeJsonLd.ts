import type { CollectionEntry } from 'astro:content';
import type { Locale } from '~/i18n/utils';

/**
 * schema.org subtypes for the place categories that map cleanly onto a built-in
 * type. Emitted as `additionalType` to refine the generic TouristAttraction
 * (e.g. a mosque is also a https://schema.org/Mosque). Categories without a
 * clean equivalent (bazaar, house, tekke, square, monument, nature) rely on the
 * `keywords` string instead.
 */
const CATEGORY_TYPE: Partial<Record<CollectionEntry<'places'>['data']['category'], string>> = {
  mosque: 'https://schema.org/Mosque',
  museum: 'https://schema.org/Museum',
  bridge: 'https://schema.org/Bridge',
};

/**
 * Build the `TouristAttraction` schema.org node for a place guide. Shared by all
 * locale `[...slug].astro` routes so the structured data stays identical across
 * languages. The returned node is merged into the page `@graph` by BaseLayout.
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
  const { title, summary, category, era, coordinates, address, sources } = place.data;

  // Cite the same authoritative URLs already in the guide as `sameAs` links.
  const sameAs = sources.map((s) => s.url).filter((u): u is string => Boolean(u));
  const additionalType = CATEGORY_TYPE[category];

  return {
    '@type': 'TouristAttraction',
    name: title,
    description: summary,
    url,
    image,
    inLanguage: lang,
    keywords: category,
    isPartOf: { '@id': `${origin}#website` },
    publisher: { '@id': `${origin}#org` },
    containedInPlace: {
      '@type': 'City',
      name: 'Gjakova',
      address: { '@type': 'PostalAddress', addressLocality: 'Gjakovë', addressCountry: 'XK' },
    },
    ...(additionalType && { additionalType }),
    ...(era && { temporalCoverage: era }),
    ...(coordinates && {
      geo: { '@type': 'GeoCoordinates', latitude: coordinates.lat, longitude: coordinates.lng },
    }),
    ...(address && { address }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
