/**
 * UI string dictionaries.
 *
 * `en` is the source of truth: every key here must exist in `en`, and other
 * locales may omit keys (they fall back to `en` via useTranslations). Arabic
 * ('ar') is deferred but the system is RTL-ready — when added, register it in
 * `languages`, add an `ar` dictionary, and it will automatically render RTL
 * (see rtlLocales + getDirection in ./utils).
 */

export const defaultLang = 'en' as const;

/** Locale → endonym (its own name), shown in the language switcher. */
export const languages = {
  en: 'English',
  sq: 'Shqip',
  // ar: 'العربية',  // deferred — RTL-ready
} as const;

/** Locales that read right-to-left. */
export const rtlLocales = new Set<string>(['ar', 'he', 'fa', 'ur']);

export const ui = {
  en: {
    'site.name': 'Gjakova',
    'site.tagline': 'A cultural guide to the old city',
    'site.description':
      'An elegant guide to the old culture of Gjakova, Kosovo — its bazaar, mosques, stone houses and the people who shaped them.',

    'nav.home': 'Home',
    'nav.places': 'Places',
    'nav.timeline': 'Timeline',
    'nav.about': 'About',

    'a11y.skip': 'Skip to content',
    'a11y.menu': 'Menu',
    'a11y.close': 'Close',
    'lang.label': 'Language',

    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Keeping the old city’s stories close.',

    'home.hero.eyebrow': 'Kosovo · the Dukagjin plain',
    'home.hero.title': 'Gjakova, a city kept by its craftspeople',
    'home.hero.lede':
      'Walk the longest old bazaar in the Balkans, trace centuries of stone and timber, and meet the living culture of one of Kosovo’s most storied cities.',
    'home.hero.cta.places': 'Explore the places',
    'home.hero.cta.timeline': 'Follow the timeline',

    'home.places.eyebrow': 'Where to begin',
    'home.places.title': 'Places to know',
    'home.places.lede':
      'Guides to the landmarks that hold the city’s memory — from the Grand Bazaar to the kullas of the old quarters.',

    'places.title': 'Places',
    'places.lede': 'Curated guides to the streets, mosques, houses and monuments of old Gjakova.',
    'places.viewGuide': 'Read the guide',
    'places.backToPlaces': 'All places',
    'sources.title': 'Sources',

    'timeline.title': 'A timeline of Gjakova',
    'timeline.lede': 'Centuries of trade, faith, fire and revival, told as a single thread.',

    'about.title': 'About this guide',

    'notFound.title': 'This path leads nowhere',
    'notFound.lede': 'The page you were looking for has wandered off the map.',
    'notFound.cta': 'Return home',
  },

  sq: {
    'site.name': 'Gjakova',
    'site.tagline': 'Një udhërrëfyes kulturor për qytetin e vjetër',
    'site.description':
      'Një udhërrëfyes elegant për kulturën e vjetër të Gjakovës, Kosovë — çarshia, xhamitë, shtëpitë e gurta dhe njerëzit që e formësuan atë.',

    'nav.home': 'Ballina',
    'nav.places': 'Vendet',
    'nav.timeline': 'Kronologjia',
    'nav.about': 'Rreth nesh',

    'a11y.skip': 'Kalo te përmbajtja',
    'a11y.menu': 'Menyja',
    'a11y.close': 'Mbyll',
    'lang.label': 'Gjuha',

    'footer.rights': 'Të gjitha të drejtat e rezervuara.',
    'footer.tagline': 'I mbajmë afër tregimet e qytetit të vjetër.',

    'home.hero.eyebrow': 'Kosovë · rrafshi i Dukagjinit',
    'home.hero.title': 'Gjakova, një qytet i ruajtur nga mjeshtërit e tij',
    'home.hero.lede':
      'Shëtit çarshinë më të gjatë të vjetër në Ballkan, ndiq shekuj guri e druri dhe njih kulturën e gjallë të një prej qyteteve më të rrëfyera të Kosovës.',
    'home.hero.cta.places': 'Eksploro vendet',
    'home.hero.cta.timeline': 'Ndiq kronologjinë',

    'home.places.eyebrow': 'Ku të fillosh',
    'home.places.title': 'Vendet që duhen njohur',
    'home.places.lede':
      'Udhërrëfyes për pikat që ruajnë kujtesën e qytetit — nga Çarshia e Madhe te kullat e lagjeve të vjetra.',

    'places.title': 'Vendet',
    'places.lede':
      'Udhërrëfyes të përzgjedhur për rrugët, xhamitë, shtëpitë dhe monumentet e Gjakovës së vjetër.',
    'places.viewGuide': 'Lexo udhërrëfyesin',
    'places.backToPlaces': 'Të gjitha vendet',
    'sources.title': 'Burime',

    'timeline.title': 'Një kronologji e Gjakovës',
    'timeline.lede': 'Shekuj tregtie, besimi, zjarri e rilindjeje, të rrëfyer si një fije e vetme.',

    'about.title': 'Rreth këtij udhërrëfyesi',

    'notFound.title': 'Kjo shteg s’të çon askund',
    'notFound.lede': 'Faqja që kërkonit ka humbur nga harta.',
    'notFound.cta': 'Kthehu në ballinë',
  },
} as const;

/** All translatable keys, derived from the source (`en`) dictionary. */
export type UIKey = keyof (typeof ui)[typeof defaultLang];
