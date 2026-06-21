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
    image: 'bazaarPano',
    alt: {
      en: "Panorama of Gjakova's Grand Bazaar with the domed Hadum Mosque rising at its centre.",
      sq: 'Panoramë e Çarshisë së Madhe të Gjakovës me Xhaminë me kube të Hadumit në qendër.',
    },
    caption: {
      en: "The bazaar grew around Süleyman Aga's endowment, the Hadum Mosque at its head.",
      sq: 'Çarshia u rrit rreth vakëfit të Sylejman Agës, me Xhaminë e Hadumit në krye.',
    },
  },
  '1597-clock-tower': {
    image: 'clock1',
    alt: {
      en: 'The stone clock tower of Gjakova against a clear sky.',
      sq: 'Kulla e gurtë e Sahatit në Gjakovë përballë një qielli të kthjellët.',
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
    image: 'bazaarCarpenter',
    alt: {
      en: 'A craftsman at work among cradles and timber in a bazaar workshop.',
      sq: 'Një mjeshtër duke punuar mes djepave dhe drurit në një punishte të çarshisë.',
    },
    caption: {
      en: "A carpenter's workshop — the crafts that made Gjakova's wealth.",
      sq: 'Një punishte zdrukthtari — zanatet që e bënë pasurinë e Gjakovës.',
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
    image: 'tekkeShejhEmin',
    alt: {
      en: 'The whitewashed Shejh Emin tekke, an 18th-century dervish lodge in Gjakova.',
      sq: 'Teqja e zbardhur e Shejh Eminit, një teqe dervishe e shekullit XVIII në Gjakovë.',
    },
    caption: {
      en: 'The Shejh Emin (Saadi) tekke of 1730 — one of the lodges counted in 1942.',
      sq: 'Teqja e Shejh Eminit (saadive), e vitit 1730 — një nga teqet e numëruara në 1942.',
    },
  },
  '1999-fire': {
    image: 'hadumWar',
    alt: {
      en: "A fire-gutted street in Gjakova's old town, photographed soon after the 1999 war.",
      sq: 'Një rrugë e shkrumbuar nga zjarri në qytetin e vjetër të Gjakovës, fotografuar pak pas luftës së vitit 1999.',
    },
    caption: {
      en: "Gjakova's burned old town soon after the war, 1999.",
      sq: 'Qyteti i vjetër i djegur i Gjakovës pak pas luftës, 1999.',
    },
  },
  '2000s-rebuilding': {
    image: 'rebuilt2015',
    alt: {
      en: "A restored cobbled street of shops in Gjakova's old town in 2015.",
      sq: 'Një rrugë me kalldrëm dhe dyqane e restauruar në qytetin e vjetër të Gjakovës, 2015.',
    },
    caption: {
      en: 'A renovated lane in the rebuilt old town, 2015.',
      sq: 'Një rrugicë e rinovuar në qytetin e vjetër të rindërtuar, 2015.',
    },
  },
  '2005-hadum-restored': {
    image: 'hadumInt',
    alt: {
      en: 'The painted interior of the Hadum Mosque, walls covered in floral and cypress motifs.',
      sq: 'Brendia e pikturuar e Xhamisë së Hadumit, me mure të mbuluara me motive lulesh e selvish.',
    },
    caption: {
      en: 'Inside the restored Hadum Mosque, its painted decoration brought back.',
      sq: 'Brenda Xhamisë së restauruar të Hadumit, me zbukurimin e pikturuar të rikthyer.',
    },
  },
  '2016-library-rebuilt': {
    image: 'hadumSchool',
    alt: {
      en: "The reconstructed school and library building behind the Hadum Mosque's minaret.",
      sq: 'Ndërtesa e rindërtuar e shkollës dhe bibliotekës pas minares së Xhamisë së Hadumit.',
    },
    caption: {
      en: 'The rebuilt Hadum-complex school and library beside the mosque.',
      sq: 'Shkolla dhe biblioteka e rindërtuar e kompleksit të Hadumit, pranë xhamisë.',
    },
  },
};

/** place slug → gallery (ordered). hammam is intentionally omitted (it no longer stands). */
export const places = {
  'hadum-mosque': [
    {
      image: 'hadumExt',
      alt: {
        en: 'The Hadum Mosque today, its dome and minaret above the bazaar.',
        sq: 'Xhamia e Hadumit sot, me kube e minare mbi çarshi.',
      },
      caption: { en: 'The Hadum Mosque today.', sq: 'Xhamia e Hadumit sot.' },
    },
    {
      image: 'hadumInt',
      alt: {
        en: "The mosque's painted interior — cypresses, vases and flowers across the walls.",
        sq: 'Brendia e pikturuar e xhamisë — selvi, vazo e lule nëpër mure.',
      },
      caption: {
        en: 'The painted interior — cypresses, vases and flowers.',
        sq: 'Brendia e pikturuar — selvi, vazo e lule.',
      },
    },
    {
      image: 'hadumWar',
      alt: {
        en: "A ruined, fire-blackened street in Gjakova's old town after the 1999 war.",
        sq: 'Një rrugë e rrënuar e nxirë nga zjarri në qytetin e vjetër të Gjakovës pas luftës së vitit 1999.',
      },
      caption: {
        en: "Gjakova's old town in ruins after the 1999 war.",
        sq: 'Qyteti i vjetër i Gjakovës në rrënoja pas luftës së vitit 1999.',
      },
    },
  ],
  'grand-bazaar': [
    {
      image: 'bazaarPano',
      alt: {
        en: 'Wide view of the Grand Bazaar with the Hadum Mosque at its head.',
        sq: 'Pamje e gjerë e Çarshisë së Madhe me Xhaminë e Hadumit në krye.',
      },
      caption: {
        en: 'The bazaar with the Hadum Mosque at its head.',
        sq: 'Çarshia me Xhaminë e Hadumit në krye.',
      },
    },
    {
      image: 'bazaarStreet',
      alt: {
        en: 'A rebuilt lane of low timber-fronted shops in the bazaar.',
        sq: 'Një rrugicë e rindërtuar me dyqane të ulëta me fasada druri në çarshi.',
      },
      caption: { en: 'A rebuilt lane of shops.', sq: 'Një rrugicë e rindërtuar dyqanesh.' },
    },
    {
      image: 'bazaarCobbles',
      alt: {
        en: 'The cobbled paving of the old bazaar between rows of shops.',
        sq: 'Kalldrëmi i çarshisë së vjetër mes radhëve të dyqaneve.',
      },
      caption: { en: 'The cobbled lanes of the Çarshia.', sq: 'Rrugicat me kalldrëm të Çarshisë.' },
    },
    {
      image: 'bazaarCarpenter',
      alt: {
        en: 'A carpenter at work among cradles in his bazaar workshop.',
        sq: 'Një zdrukthtar duke punuar mes djepave në punishten e tij në çarshi.',
      },
      caption: {
        en: "A carpenter's workshop — the old crafts endure.",
        sq: 'Një punishte zdrukthtari — zanatet e vjetra vazhdojnë.',
      },
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
  ],
  'clock-tower': [
    {
      image: 'clock1',
      alt: {
        en: 'The clock tower of Gjakova rising above the rooftops.',
        sq: 'Kulla e Sahatit e Gjakovës që ngrihet mbi çatitë.',
      },
      caption: {
        en: 'The clock tower on the Field of the Clock.',
        sq: 'Kulla e Sahatit në Fushën e Sahatit.',
      },
    },
    {
      image: 'clock2',
      alt: {
        en: 'The reconstructed stone clock tower with its belfry.',
        sq: 'Kulla e gurtë e Sahatit e rindërtuar, me kambanore.',
      },
      caption: {
        en: 'The reconstructed stone tower and belfry.',
        sq: 'Kulla e gurtë e rindërtuar dhe kambanorja.',
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
      image: 'mtnGjeravica',
      alt: {
        en: 'Snow-streaked peaks of Gjeravica and Maja e Strellcit.',
        sq: 'Majat me brazda bore të Gjeravicës dhe Majës së Strellcit.',
      },
      caption: {
        en: "Gjeravica, Kosovo's highest peak, with Maja e Strellcit.",
        sq: 'Gjeravica, maja më e lartë e Kosovës, me Majën e Strellcit.',
      },
    },
    {
      image: 'mtnProkletije',
      alt: {
        en: 'The Accursed Mountains seen across fields from the edge of Gjakova.',
        sq: 'Bjeshkët e Nemuna parë përtej arave nga skaji i Gjakovës.',
      },
      caption: {
        en: 'The Accursed Mountains seen from the edge of Gjakova.',
        sq: 'Bjeshkët e Nemuna parë nga skaji i Gjakovës.',
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
      image: 'hadumSchool',
      alt: {
        en: 'The rebuilt school and library building of the Hadum complex.',
        sq: 'Ndërtesa e rindërtuar e shkollës dhe bibliotekës së kompleksit të Hadumit.',
      },
      caption: {
        en: 'The rebuilt library and school of the Hadum complex.',
        sq: 'Biblioteka dhe shkolla e rindërtuar e kompleksit të Hadumit.',
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
