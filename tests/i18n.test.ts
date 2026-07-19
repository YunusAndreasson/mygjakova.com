import { describe, expect, it } from 'vitest';
import {
  getDirection,
  isLocale,
  localizedPath,
  resolveLocale,
  stripLocale,
  useTranslations,
} from '~/i18n/utils';

describe('isLocale', () => {
  it('accepts configured locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('sq')).toBe(true);
    expect(isLocale('sv')).toBe(true);
  });
  it('rejects unknown values and undefined', () => {
    expect(isLocale('xx')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe('resolveLocale', () => {
  it('returns the locale when valid', () => {
    expect(resolveLocale('sq')).toBe('sq');
  });
  it('falls back to the default locale otherwise', () => {
    expect(resolveLocale(undefined)).toBe('en');
    expect(resolveLocale('zz')).toBe('en');
  });
});

describe('getDirection', () => {
  it('is ltr for en/sq and rtl for ar (the stack is RTL-ready)', () => {
    expect(getDirection('en')).toBe('ltr');
    expect(getDirection('sq')).toBe('ltr');
    expect(getDirection('ar')).toBe('rtl');
  });
});

describe('localizedPath', () => {
  it('does not prefix the default locale', () => {
    expect(localizedPath('en', '/places')).toBe('/places');
    expect(localizedPath('en', '/')).toBe('/');
  });
  it('prefixes non-default locales', () => {
    expect(localizedPath('sq', '/places')).toBe('/sq/places');
    expect(localizedPath('sq', '/')).toBe('/sq/');
  });
  it('normalises a missing leading slash', () => {
    expect(localizedPath('sq', 'places')).toBe('/sq/places');
  });
});

describe('stripLocale', () => {
  it('removes a non-default locale prefix', () => {
    expect(stripLocale('/sq/places')).toBe('/places');
    expect(stripLocale('/sq')).toBe('/');
  });
  it('leaves default-locale paths untouched', () => {
    expect(stripLocale('/places')).toBe('/places');
    expect(stripLocale('/')).toBe('/');
  });
});

describe('useTranslations', () => {
  it('translates a known key per locale', () => {
    expect(useTranslations('en')('nav.places')).toBe('Places');
    expect(useTranslations('sq')('nav.places')).toBe('Vendet');
    expect(useTranslations('sv')('nav.places')).toBe('Platser');
  });
});
