/**
 * Sourced imagery for the guide — every entry is a freely-licensed work from
 * Wikimedia Commons (public-domain or Creative Commons), with verified
 * attribution captured here so credit is never guessed. This manifest drives:
 *   • scripts/data/fetch-images.mjs   — downloads each `file` to `dest`
 *   • scripts/data/apply-images.mjs   — writes gallery/image front-matter
 *     (incl. author + license + page URL) into the locale markdown.
 * The About-page image is wired by hand in src/components/views/AboutView.astro.
 *
 * To add an image: find it with `python3 scripts/data/commons.py search "<q>"`,
 * read its licence with `… info "File:<name>"`, add a record below, then run
 * `node scripts/data/fetch-images.mjs && node scripts/data/apply-images.mjs`.
 */

const L = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0',
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0',
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
  'Public domain': '',
};

/** id → { commons file, local dest (under src/assets/photos), attribution } */
function img(id, file, author, license) {
  return {
    id,
    file,
    dest: `src/assets/photos/${id}.jpg`,
    author,
    license,
    licenseUrl: L[license] ?? '',
    source: 'Wikimedia Commons',
    page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(file.replace(/ /g, '_'))}`,
  };
}

/**
 * id → a record for the site's OWN photography: a local file already placed under
 * src/assets/photos (not fetched from Commons), credited to the photographer.
 * `local: true` tells fetch-images to skip it and gen-credits to leave it out of
 * the Wikimedia ledger; the in-site byline still renders from these fields.
 */
function own(id) {
  return {
    id,
    file: null,
    local: true,
    dest: `src/assets/photos/${id}.jpg`,
    author: 'Yunus Andreasson',
    license: '',
    licenseUrl: '',
    source: '@andreasson.photo',
    page: 'https://www.instagram.com/andreasson.photo/',
  };
}

export const images = {
  hadumExt: img('hadumExt', 'File:Gjakova Hadum Aga Mosque (WPWTR17).jpg', 'Albinfo', 'CC BY 4.0'),
  hadumInt: img(
    'hadumInt',
    'File:Inside Hadum mosque, Gjakova.JPG',
    'Aljabakphoto',
    'CC BY-SA 4.0',
  ),
  hadumWar: img(
    'hadumWar',
    'File:Gjakovë - Xhamia e Hadumit pas lyftës 1999.jpg',
    'Shkëlzen Rexha',
    'CC BY-SA 3.0',
  ),
  // Documentary photograph of the Old Bazaar in ruins, 1999 (watermarked "Shkëlzen Rexha '99").
  bazaarWar99: img('bazaarWar99', 'File:Gjakova 1999.jpg', 'Shkëlzen Rexha', 'CC BY-SA 3.0'),
  hadumSchool: img(
    'hadumSchool',
    'File:Xhamia e Hadumit – minaret and school (OSCAL19 trip).jpg',
    'albinfo',
    'CC0',
  ),
  bazaarPano: img(
    'bazaarPano',
    'File:Gjakova - Çarshia e Madhe - Big Baazar Panorama.JPG',
    'Shkëlzen Rexha (Valed Promotion)',
    'CC BY-SA 3.0',
  ),
  bazaarStreet: img(
    'bazaarStreet',
    'File:Street in the Old Bazaar of Gjakova, 2025.jpg',
    'Bdx',
    'CC0',
  ),
  bazaarCobbles: img(
    'bazaarCobbles',
    'File:Kalldrëmi i Qarshisë.jpg',
    'OrgenKelmendi',
    'CC BY-SA 4.0',
  ),
  bazaarCarpenter: img('bazaarCarpenter', 'File:Gjakovar carpenter.JPG', 'Edakaja', 'CC BY-SA 3.0'),
  clock1: img('clock1', 'File:Clock Tower of Gjakova.jpg', 'Irvi Hyka', 'CC BY-SA 3.0'),
  clock2: img('clock2', 'File:Clock tower, Gjakova.JPG', 'Aljabakphoto', 'CC BY-SA 4.0'),
  bridge1: img(
    'bridge1',
    'File:Ura e Terzive, shek. XVIII, Gjakovë 01.jpg',
    'GentiBehramaj',
    'CC BY-SA 4.0',
  ),
  bridgeMtn: img(
    'bridgeMtn',
    "File:Tailors' Bridge Gjakova and Mountains (OSCAL19 trip).jpg",
    'albinfo',
    'CC0',
  ),
  kullaKoshi: img(
    'kullaKoshi',
    'File:18 Gjakovë Kulla Koshit - Koshi Tower.jpg',
    'Shkëlzen Rexha',
    'CC BY-SA 3.0',
  ),
  kullaJunik: img(
    'kullaJunik',
    'File:Kulla e Brahim Hoxhës, Junik.jpg',
    'Sali Shoshi',
    'CC BY-SA 4.0',
  ),
  kullaJunik2: img('kullaJunik2', 'File:Kulla ne Junik.jpg', 'Seferaliqkaj', 'CC BY-SA 4.0'),
  radoniqPano: img(
    'radoniqPano',
    'File:Liqeni i Radoniqit - panoramic.jpg',
    'Shkumbin Saneja',
    'CC BY 2.0',
  ),
  radoniqAir: img('radoniqAir', 'File:Radoniqi Lake from air 01.jpg', 'Arianit', 'CC BY-SA 4.0'),
  mtnGjeravica: img(
    'mtnGjeravica',
    'File:Gjeravica and Maja e Strellcit (WPWTR17).jpg',
    'Albinfo',
    'CC BY 4.0',
  ),
  mtnProkletije: img(
    'mtnProkletije',
    'File:Prokletije seen from Gjakova outskirts (WPWTR17).jpg',
    'Albinfo',
    'CC BY 4.0',
  ),
  evliyaMs: img(
    'evliyaMs',
    'File:Seyahatname C6 Evliya Çelebi.jpg',
    'Evliya Çelebi (Atatürk Kitaplığı)',
    'Public domain',
  ),
  // Historical scans & rare photography (all public domain) — the older material.
  mapYakova: img(
    'mapYakova',
    'File:Iskodra, Yakova, Akova, Ipek - btv1b10100886z.jpg',
    'Bibliothèque nationale de France',
    'Public domain',
  ),
  mehmedAli: img(
    'mehmedAli',
    'File:Mehmed Ali Pasha.png',
    'Eduard Dammüller (engraving, 1877)',
    'Public domain',
  ),
  refugees1913: img(
    'refugees1913',
    'File:Nopcsa 265.jpg',
    'Baron Franz Nopcsa (1913)',
    'Public domain',
  ),
  nopcsaPass: img(
    'nopcsaPass',
    'File:Nopcsa 284.jpg',
    'Baron Franz Nopcsa (1903)',
    'Public domain',
  ),
  kanun: img(
    'kanun',
    'File:Kanuni i Lekë Dukagjinit.jpg',
    'Shtjefën Gjeçovi, ed. (1933)',
    'Public domain',
  ),
  devojka: img(
    'devojka',
    'File:Devojka iz Đakovice.jpg',
    'Unknown photographer (1913)',
    'Public domain',
  ),
  rebuilt2015: img(
    'rebuilt2015',
    'File:Gjakova renovated old town 2015.JPG',
    'Bdx',
    'CC BY-SA 4.0',
  ),
  tekkeShejhEmin: img(
    'tekkeShejhEmin',
    'File:Shejh Emin Tekke of the XVIII ct. - Gjakovë.JPG',
    'Nentor Oseku',
    'CC BY-SA 3.0',
  ),

  // The site's own black-and-white photography (local files; credited @andreasson.photo).
  ownHadum: own('ownHadum'),
  ownHadumInt: own('ownHadumInt'),
  ownHadumPortico: own('ownHadumPortico'),
  ownBazaar: own('ownBazaar'),
  ownBazaar2: own('ownBazaar2'),
  ownAccursed: own('ownAccursed'),
  ownAccursed2: own('ownAccursed2'),
  ownClock: own('ownClock'),
  ownLibrary: own('ownLibrary'),
  ownQylit: own('ownQylit'),
  ownCityCenter: own('ownCityCenter'),
  ownDestroyedBazaar: own('ownDestroyedBazaar'),
  ownMosque: own('ownMosque'),
};

/** timeline slug → one supporting figure */
export const timeline = {
  '1485-first-mention': {
    image: 'mapYakova',
    alt: {
      en: 'A colour-shaded antique topographic map of the region around Gjakova.',
      sq: 'Një hartë e vjetër topografike me ngjyra e rajonit rreth Gjakovës.',
    },
    caption: {
      en: 'Yakova (Gjakova) named on a map of the region, around 1900.',
      sq: 'Jakova (Gjakova) e shënuar në një hartë të rajonit, rreth vitit 1900.',
    },
  },
  '1594-hadum-mosque': {
    image: 'ownHadum',
    alt: {
      en: 'The arched, painted portico of the Hadum Mosque at dusk, a cypress beside it.',
      sq: 'Portiku me harqe i pikturuar i Xhamisë së Hadumit në muzg, me një selvi pranë.',
    },
    caption: {
      en: "Süleyman Aga's endowment — the Hadum Mosque the bazaar grew around.",
      sq: 'Vakëfi i Sylejman Agës — Xhamia e Hadumit rreth së cilës u rrit çarshia.',
    },
  },
  '1597-clock-tower': {
    image: 'ownClock',
    alt: {
      en: 'The stone clock tower above the river embankment at dusk.',
      sq: 'Kulla e gurtë e Sahatit mbi argjinaturën e lumit në muzg.',
    },
    caption: {
      en: 'The clock tower (Sahat Kulla), rebuilt after 1999 on its 1597 site.',
      sq: 'Kulla e Sahatit, e rindërtuar pas vitit 1999 në vendin e saj të vitit 1597.',
    },
  },
  '1662-evliya-celebi': {
    image: 'evliyaMs',
    alt: {
      en: "The Ottoman-Turkish title page of Evliya Çelebi's Seyahatnâme.",
      sq: 'Faqja e parë osmanisht e Sejahatnamesë së Evlija Çelebiut.',
    },
    caption: {
      en: "The title page of Evliya Çelebi's Seyahatnâme — his 1662 account of Yakova.",
      sq: 'Faqja e parë e Sejahatnamesë së Evlija Çelebiut — rrëfimi i tij i vitit 1662 për Jakovën.',
    },
  },
  '1878-league-of-prizren': {
    image: 'mehmedAli',
    alt: {
      en: 'An 1877 engraving of Mehmed Ali Pasha in an Ottoman fez and medals.',
      sq: 'Një gravurë e vitit 1877 e Mehmed Ali Pashës me fes osman dhe dekorata.',
    },
    caption: {
      en: 'Mehmed Ali Pasha, the marshal besieged and killed at Gjakova in 1878 (engraving, 1877).',
      sq: 'Mehmed Ali Pasha, mareshali i rrethuar dhe i vrarë në Gjakovë më 1878 (gravurë, 1877).',
    },
  },
  '18th-century-trade': {
    image: 'ownBazaar2',
    alt: {
      en: 'A bazaar lane of timber-fronted shops, a man resting outside one under a dramatic sky.',
      sq: 'Një rrugicë e çarshisë me dyqane me fasada druri, një burrë i ulur para njërit nën një qiell dramatik.',
    },
    caption: {
      en: "The Grand Bazaar — the crafts and trade that made Gjakova's wealth.",
      sq: 'Çarshia e Madhe — zanatet dhe tregtia që e bënë pasurinë e Gjakovës.',
    },
  },
  '1912-end-of-ottoman-rule': {
    image: 'refugees1913',
    alt: {
      en: 'A 1913 photograph of Albanian highland women from the Gjakova area, displaced by the war.',
      sq: 'Një fotografi e vitit 1913 me gra malësore shqiptare nga zona e Gjakovës, të shpërngulura nga lufta.',
    },
    caption: {
      en: 'Women from the Gjakova highlands, displaced in 1913 — photographed by Franz Nopcsa.',
      sq: 'Gra nga malësia e Gjakovës, të shpërngulura më 1913 — fotografuar nga Franz Nopcsa.',
    },
  },
  '1942-mosques-and-tekkes': {
    image: 'ownMosque',
    alt: {
      en: 'A tall, slender mosque minaret rising against a dramatic evening sky, mountains behind.',
      sq: 'Një minare e hollë e gjatë xhamie që ngrihet përballë një qielli dramatik mbrëmjeje, me male në sfond.',
    },
    caption: {
      en: "A minaret over the old town — Gjakova's many mosques, counted in 1942.",
      sq: 'Një minare mbi qytetin e vjetër — xhamitë e shumta të Gjakovës, të numëruara në 1942.',
    },
  },
  '1999-fire': {
    image: 'ownDestroyedBazaar',
    alt: {
      en: 'A gutted, roofless shell of a bazaar building beside the river, still standing in ruins.',
      sq: 'Një ndërtesë e çarshisë e shkrumbuar e pa çati pranë lumit, ende në këmbë në rrënoja.',
    },
    caption: {
      en: 'A stretch of the bazaar by the river — gutted in 1999 and still unrestored in 2026.',
      sq: 'Një pjesë e çarshisë buzë lumit — e shkrumbuar më 1999 dhe ende e parestauruar në vitin 2026.',
    },
  },
  '2000s-rebuilding': {
    image: 'ownBazaar',
    alt: {
      en: "A rebuilt cobbled lane of timber-fronted shops in Gjakova's old bazaar at dusk.",
      sq: 'Një rrugicë e rindërtuar me kalldrëm e dyqane me fasada druri në çarshinë e vjetër të Gjakovës, në muzg.',
    },
    caption: {
      en: 'The rebuilt Çarshia, raised again shop by shop.',
      sq: 'Çarshia e rindërtuar, e ringritur dyqan pas dyqani.',
    },
  },
  '2005-hadum-restored': {
    image: 'ownHadumInt',
    alt: {
      en: 'The painted interior of the Hadum Mosque — its carved wooden minber and walls of calligraphy.',
      sq: 'Brendia e pikturuar e Xhamisë së Hadumit — minberi i gdhendur prej druri dhe muret me kaligrafi.',
    },
    caption: {
      en: 'Inside the restored Hadum Mosque, its painted decoration brought back.',
      sq: 'Brenda Xhamisë së restauruar të Hadumit, me zbukurimin e pikturuar të rikthyer.',
    },
  },
  '2016-library-rebuilt': {
    image: 'ownLibrary',
    alt: {
      en: 'The rebuilt octagonal Hadum library building among trees, its tiled roof and stone base.',
      sq: 'Ndërtesa tetëkëndëshe e rindërtuar e bibliotekës së Hadumit mes pemëve, me çati tjegullash e bazament guri.',
    },
    caption: {
      en: 'The rebuilt Hadum library beside the mosque.',
      sq: 'Biblioteka e rindërtuar e Hadumit, pranë xhamisë.',
    },
  },
};

/** place slug → gallery (ordered). hammam is intentionally omitted (it no longer stands). */
export const places = {
  'hadum-mosque': [
    {
      image: 'ownHadum',
      alt: {
        en: "The Hadum Mosque's arched, painted portico at dusk, a cypress beside it.",
        sq: 'Portiku me harqe i pikturuar i Xhamisë së Hadumit në muzg, me një selvi pranë.',
      },
      caption: { en: 'The Hadum Mosque at dusk.', sq: 'Xhamia e Hadumit në muzg.' },
    },
    {
      image: 'ownHadumInt',
      alt: {
        en: 'The painted interior — the carved wooden minber and walls of calligraphy.',
        sq: 'Brendia e pikturuar — minberi i gdhendur prej druri dhe muret me kaligrafi.',
      },
      caption: {
        en: 'The painted interior and carved minber.',
        sq: 'Brendia e pikturuar dhe minberi i gdhendur.',
      },
    },
    {
      image: 'ownHadumPortico',
      alt: {
        en: "A wide view of the mosque's painted porch and courtyard under a dark sky.",
        sq: 'Pamje e gjerë e portikut të pikturuar dhe oborrit të xhamisë nën një qiell të errët.',
      },
      caption: {
        en: 'The painted porch and courtyard.',
        sq: 'Portiku i pikturuar dhe oborri.',
      },
    },
  ],
  'grand-bazaar': [
    {
      image: 'ownBazaar',
      alt: {
        en: 'The Çarshia bazaar street at dusk — timber-fronted shops along the cobbles.',
        sq: 'Rruga e Çarshisë në muzg — dyqane me fasada druri përgjatë kalldrëmit.',
      },
      caption: { en: 'The bazaar street at dusk.', sq: 'Rruga e çarshisë në muzg.' },
    },
    {
      image: 'ownBazaar2',
      alt: {
        en: 'A bazaar lane with a man resting outside a shop under a dramatic sky.',
        sq: 'Një rrugicë e çarshisë me një burrë të ulur para një dyqani nën një qiell dramatik.',
      },
      caption: { en: 'A quiet hour in the bazaar.', sq: 'Një orë e qetë në çarshi.' },
    },
    {
      image: 'devojka',
      alt: {
        en: 'A 1913 studio portrait of a young woman of Gjakova in elaborate traditional costume and coin jewellery.',
        sq: 'Një portret studioje i vitit 1913 i një vajze nga Gjakova me kostum tradicional të pasur dhe stoli me monedha.',
      },
      caption: {
        en: "A woman of Gjakova in traditional dress and filigree, 1913 — the bazaar craftsmen's work, worn.",
        sq: 'Një grua e Gjakovës me veshje tradicionale dhe filigran, 1913 — puna e mjeshtërve të çarshisë, e veshur.',
      },
    },
    {
      image: 'bazaarWar99',
      alt: {
        en: "Gjakova's Old Bazaar in ruins in 1999 — gutted, roofless shops along the cobbled street, a few people returning.",
        sq: 'Çarshia e Gjakovës në rrënoja më 1999 — dyqane të shkrumbuara e pa çati përgjatë rrugës me kalldrëm, ca njerëz që kthehen.',
      },
      caption: {
        en: 'The bazaar in ruins soon after the 1999 fire.',
        sq: 'Çarshia në rrënoja pak pas zjarrit të vitit 1999.',
      },
    },
  ],
  'clock-tower': [
    {
      image: 'ownClock',
      alt: {
        en: 'The clock tower rising above the river embankment at dusk.',
        sq: 'Kulla e Sahatit që ngrihet mbi argjinaturën e lumit në muzg.',
      },
      caption: {
        en: 'The Clock Tower above the river.',
        sq: 'Kulla e Sahatit mbi lumë.',
      },
    },
  ],
  'terzi-bridge': [
    {
      image: 'bridge1',
      alt: {
        en: "The Tailors' Bridge, a long stone arched bridge over the Erenik.",
        sq: 'Ura e Terzive, një urë e gjatë guri me harqe mbi Erenik.',
      },
      caption: { en: "The Tailors' Bridge over the Erenik.", sq: 'Ura e Terzive mbi Erenik.' },
    },
    {
      image: 'bridgeMtn',
      alt: {
        en: "The Tailors' Bridge with the Accursed Mountains on the horizon.",
        sq: 'Ura e Terzive me Bjeshkët e Nemuna në horizont.',
      },
      caption: {
        en: 'The bridge with the Accursed Mountains beyond.',
        sq: 'Ura me Bjeshkët e Nemuna në sfond.',
      },
    },
  ],
  kulla: [
    {
      image: 'kullaKoshi',
      alt: {
        en: 'The Koshi kulla, a fortified stone tower-house in Gjakova.',
        sq: 'Kulla e Koshit, një kullë guri e fortifikuar në Gjakovë.',
      },
      caption: { en: 'The Koshi kulla in Gjakova.', sq: 'Kulla e Koshit në Gjakovë.' },
    },
    {
      image: 'kullaJunik',
      alt: {
        en: 'A restored Dukagjin tower-house at Junik, near Gjakova.',
        sq: 'Një kullë dukagjinase e restauruar në Junik, pranë Gjakovës.',
      },
      caption: {
        en: 'A restored Dukagjin kulla at Junik.',
        sq: 'Një kullë dukagjinase e restauruar në Junik.',
      },
    },
    {
      image: 'kullaJunik2',
      alt: {
        en: 'A tall stone kulla with small upper windows at Junik.',
        sq: 'Një kullë e lartë guri me dritare të vogla në krye, në Junik.',
      },
      caption: { en: 'Stone tower-house, Junik.', sq: 'Kullë guri, Junik.' },
    },
    {
      image: 'kanun',
      alt: {
        en: 'The red title page of the 1933 printed edition of the Code of Lekë Dukagjini.',
        sq: 'Faqja e parë e kuqe e botimit të vitit 1933 të Kanunit të Lekë Dukagjinit.',
      },
      caption: {
        en: 'The Code of Lekë Dukagjini, first printed in 1933 — the customary law of the kulla world.',
        sq: 'Kanuni i Lekë Dukagjinit, i botuar së pari më 1933 — e drejta zakonore e botës së kullave.',
      },
    },
  ],
  'radoniq-lake': [
    {
      image: 'radoniqPano',
      alt: {
        en: 'A panorama of Radoniq Lake among low hills.',
        sq: 'Një panoramë e Liqenit të Radoniqit mes kodrave të ulëta.',
      },
      caption: { en: 'Radoniq Lake.', sq: 'Liqeni i Radoniqit.' },
    },
    {
      image: 'radoniqAir',
      alt: {
        en: 'Radoniq reservoir seen from the air, its blue arms among green hills.',
        sq: 'Rezervuari i Radoniqit parë nga ajri, me krahët e tij të kaltër mes kodrave të gjelbra.',
      },
      caption: { en: 'The reservoir from the air.', sq: 'Rezervuari nga ajri.' },
    },
  ],
  'accursed-mountains': [
    {
      image: 'ownAccursed',
      alt: {
        en: 'A craggy peak of the Accursed Mountains under heavy storm cloud.',
        sq: 'Një majë shkëmbore e Bjeshkëve të Nemuna nën re të rënda stuhie.',
      },
      caption: {
        en: 'A peak of the Accursed Mountains under storm light.',
        sq: 'Një majë e Bjeshkëve të Nemuna nën dritën e stuhisë.',
      },
    },
    {
      image: 'ownAccursed2',
      alt: {
        en: 'Shafts of light falling through cloud over the ridged valleys of the Accursed Mountains.',
        sq: 'Rreze drite që bien përmes reve mbi luginat me kreshta të Bjeshkëve të Nemuna.',
      },
      caption: {
        en: 'Light over the highland valleys.',
        sq: 'Dritë mbi luginat malore.',
      },
    },
    {
      image: 'nopcsaPass',
      alt: {
        en: 'A 1903 photograph of a packhorse and a rifleman crossing a snowy mountain pass between Prizren and Gjakova.',
        sq: 'Një fotografi e vitit 1903 me një kalë barre dhe një burrë me pushkë duke kaluar një qafë mali me borë mes Prizrenit dhe Gjakovës.',
      },
      caption: {
        en: 'Crossing the Prizren–Gjakova highlands, 1903 — photographed by Franz Nopcsa.',
        sq: 'Duke kaluar malësinë Prizren–Gjakovë, 1903 — fotografuar nga Franz Nopcsa.',
      },
    },
  ],
  'hadum-library': [
    {
      image: 'ownLibrary',
      alt: {
        en: 'The rebuilt octagonal Hadum library building among trees, its tiled roof and stone base.',
        sq: 'Ndërtesa tetëkëndëshe e rindërtuar e bibliotekës së Hadumit mes pemëve, me çati tjegullash e bazament guri.',
      },
      caption: {
        en: 'The rebuilt Hadum library building.',
        sq: 'Ndërtesa e rindërtuar e bibliotekës së Hadumit.',
      },
    },
    {
      image: 'hadumWar',
      alt: {
        en: "Gjakova's old town in ruins after the 1999 fire that burned the Hadum library.",
        sq: 'Qyteti i vjetër i Gjakovës në rrënoja pas zjarrit të vitit 1999 që dogji bibliotekën e Hadumit.',
      },
      caption: {
        en: 'The old town after the 1999 fire that destroyed the library.',
        sq: 'Qyteti i vjetër pas zjarrit të vitit 1999 që shkatërroi bibliotekën.',
      },
    },
  ],
};

/** About-page image (wired by hand in AboutView.astro). */
export const about = {
  image: 'evliyaMs',
  alt: {
    en: "The title page of Evliya Çelebi's Seyahatnâme, the 1662 traveller's account.",
    sq: 'Faqja e parë e Sejahatnamesë së Evlija Çelebiut, rrëfimi i udhëtarit i vitit 1662.',
  },
  caption: {
    en: "Evliya Çelebi's Seyahatnâme (1662), the account quoted here.",
    sq: 'Sejahatnameja e Evlija Çelebiut (1662), rrëfimi i cituar këtu.',
  },
};
