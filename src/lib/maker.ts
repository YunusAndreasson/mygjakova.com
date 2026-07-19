import type { Locale } from '~/i18n/utils';

/**
 * The maker's identity, in one place.
 *
 * The Swedish locale bylines him under his Swedish given name (Jonas); every
 * other locale uses Yunus. Both name the same person — `buildPerson` carries the
 * other form as `alternateName` and pins a single `@id`, so the identity still
 * resolves to one entity whichever locale a crawler reads.
 */
export const MAKER_URL = 'https://andreassonphoto.com';
export const MAKER_INSTAGRAM = 'https://www.instagram.com/andreasson.photo/';

export function makerName(lang: Locale): string {
  return lang === 'sv' ? 'Jonas Andreasson' : 'Yunus Andreasson';
}

/** The byline attached to the site's own photography (figures + galleries). */
export function makerCredit(lang: Locale) {
  return {
    author: makerName(lang),
    source: '@andreasson.photo',
    url: MAKER_INSTAGRAM,
  };
}
