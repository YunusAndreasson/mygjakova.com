/**
 * Structured data for the Visit page.
 *
 * The page's prose lives in `VisitView`'s per-locale `copy` object (the
 * AboutView pattern); the numbers that drive the climate graph live here, the
 * way `src/lib/kosovoLocator.ts` holds the locator geometry — one home, one
 * source of truth, consumed by both the chart and the view.
 */

export interface ClimateMonth {
  /** 0 = January … 11 = December. Display names come from Intl in the chart. */
  month: number;
  /** Average daily high, °C. */
  high: number;
  /** Average daily low, °C. */
  low: number;
  /** Average monthly precipitation, mm. */
  precip: number;
}

/**
 * Gjakova monthly climate normals (°C / mm), anchored to the figures
 * climate-data.org publishes (and Wikipedia cites): annual mean ≈ 11.5 °C,
 * coldest month January (≈ 0.7 °C mean), warmest August (≈ 22.5 °C mean),
 * wettest December (~92 mm), driest August (~37 mm). A warm-summer, humid
 * continental climate (Köppen Cfa) on the Dukagjin plain at ~375 m: cold,
 * snowy winters and hot, drier late summers.
 */
export const climate: ClimateMonth[] = [
  { month: 0, high: 4, low: -3, precip: 55 }, // Jan
  { month: 1, high: 7, low: -2, precip: 52 }, // Feb
  { month: 2, high: 12, low: 1, precip: 55 }, // Mar
  { month: 3, high: 17, low: 5, precip: 60 }, // Apr
  { month: 4, high: 22, low: 9, precip: 72 }, // May
  { month: 5, high: 26, low: 12, precip: 58 }, // Jun
  { month: 6, high: 29, low: 14, precip: 44 }, // Jul
  { month: 7, high: 30, low: 15, precip: 37 }, // Aug — warmest, driest
  { month: 8, high: 24, low: 11, precip: 50 }, // Sep
  { month: 9, high: 18, low: 6, precip: 66 }, // Oct
  { month: 10, high: 11, low: 2, precip: 80 }, // Nov
  { month: 11, high: 5, low: -2, precip: 92 }, // Dec — wettest
];

/** Citation rendered beneath the climate chart and in the page's Sources block. */
export const climateSource = {
  label: 'Climate normals — climate-data.org',
  url: 'https://en.climate-data.org/europe/republic-of-kosovo/gjakove/gjakove-6159/',
};

export interface Mosque {
  /** Albanian endonym (the name on the mosque itself). */
  name: string;
  lat: number;
  lng: number;
  /** The Hadum Mosque anchors the map: terracotta marker + map centre. */
  primary?: boolean;
}

/**
 * Mosques of Gjakova — the dense old-town cluster around the Hadum, plus the
 * newer ones in the quarters beyond it (e.g. the Xhamia e Qylit, north of the
 * historic core). Coordinates are from OpenStreetMap (© OpenStreetMap
 * contributors), which the place basemap already renders and attributes; they
 * all fall inside the committed Gjakova PMTiles extract (see docs/MAP.md).
 */
export const mosques: Mosque[] = [
  { name: 'Xhamia e Hadumit', lat: 42.37919, lng: 20.42732, primary: true },
  { name: 'Xhamia e Re', lat: 42.38143, lng: 20.43067 },
  { name: 'Xhamia e Honkës', lat: 42.3817, lng: 20.42515 },
  { name: 'Xhamia e Mahmut Pashës', lat: 42.37703, lng: 20.43195 },
  { name: 'Xhamia e Sefës', lat: 42.37737, lng: 20.43476 },
  { name: 'Xhamia e Haxhi Ymerit', lat: 42.37952, lng: 20.43315 },
  { name: 'Xhamia e Kusarve', lat: 42.37463, lng: 20.4337 },
  { name: 'Xhamia e Sofës', lat: 42.38805, lng: 20.43101 },
  { name: 'Xhamia e Qylit', lat: 42.39091, lng: 20.4251 },
];
