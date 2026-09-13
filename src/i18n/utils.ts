import { ui, defaultLang, languages, rtlLocales, type UIKey } from './ui';

export type Locale = keyof typeof ui;

/** Every configured locale, e.g. ['en', 'sq']. */
export const locales = Object.keys(ui) as Locale[];

/** Type guard: is this string a supported locale? */
export function isLocale(value: string | undefined): value is Locale {
  return value != null && value in ui;
}

/**
 * Resolve a usable locale from Astro.currentLocale (which can be undefined when
 * no locale prefix is present, i.e. the default locale at "/").
 */
export function resolveLocale(current: string | undefined): Locale {
  return isLocale(current) ? current : defaultLang;
}

/**
 * Returns a translator `t` bound to a locale. Missing keys fall back to the
 * default-locale string so the UI never renders a raw key.
 */
export function useTranslations(lang: Locale) {
  const dict = ui[lang] as Partial<Record<UIKey, string>>;
  return function t(key: UIKey): string {
    return dict[key] ?? ui[defaultLang][key];
  };
}

/** Text direction for a locale. Drives <html dir> — RTL-ready for Arabic. */
export function getDirection(lang: string): 'ltr' | 'rtl' {
  return rtlLocales.has(lang) ? 'rtl' : 'ltr';
}

/** Endonym for the language switcher, e.g. 'Shqip'. */
export function localeName(lang: Locale): string {
  return languages[lang];
}

/**
 * Build a path for a given locale. The default locale has no prefix
 * (prefixDefaultLocale: false); other locales are prefixed with `/<locale>`.
 * `path` is locale-agnostic and should start with "/", e.g. "/places" → "/sq/places/".
 *
 * Kept dependency-free (no astro:i18n import) so it is usable anywhere,
 * including plain .ts modules and tests.
 */
export function localizedPath(lang: Locale, path = '/'): string {
  let clean = `/${path.replace(/^\/+/, '')}`;
  // Pages build as directories, so their canonical URLs (and the sitemap) end in
  // "/". A slashless link costs every click a 308 redirect and lets Google index
  // the slashless duplicate. File routes such as "/rss.xml" are left as they are.
  if (!clean.endsWith('/') && !/\.[a-z0-9]+$/i.test(clean)) clean += '/';
  return lang === defaultLang ? clean : `/${lang}${clean}`;
}

/**
 * Strip the locale prefix from a pathname, returning the locale-agnostic path.
 * "/sq/places" → "/places", "/places" → "/places", "/sq" → "/".
 */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/([^/]+)(\/.*)?$/);
  if (match && isLocale(match[1]) && match[1] !== defaultLang) {
    return match[2] ?? '/';
  }
  return pathname || '/';
}
