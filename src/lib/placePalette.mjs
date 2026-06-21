/**
 * Single source for the place category → duotone palette mapping. Shared by
 * PlaceholderPlate.astro (on-page plates) and scripts/gen-og.mjs (share images)
 * so the two can never drift. Plain ESM JS, with no app-runtime imports, so the
 * Node build script can import it directly (the .astro side resolves it through
 * the `~` alias). Unknown categories fall back to 'warm'.
 */

/** Place category → palette name (see PLACE_CATEGORIES in src/content.config.ts). */
export const CATEGORY_PALETTE = {
  bazaar: 'warm',
  bridge: 'warm',
  monument: 'warm',
  mosque: 'brass',
  tekke: 'brass',
  museum: 'brass',
  house: 'stone',
  square: 'stone',
  nature: 'stone',
};

/** Resolve a category to its palette name, defaulting to 'warm'. */
export function paletteFor(category) {
  return CATEGORY_PALETTE[category] ?? 'warm';
}
