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
  de: 'Deutsch',
  tr: 'Türkçe',
  sv: 'Svenska',
  // ar: 'العربية',  // deferred — RTL-ready
} as const;

/** Locales that read right-to-left. */
export const rtlLocales = new Set<string>(['ar', 'he', 'fa', 'ur']);

/**
 * Open Graph locale (`language_TERRITORY`) per UI locale, for `og:locale`.
 * `en_GB` matches the site's British spelling ("centre"); Albanian uses `sq_AL`
 * — the nearest territory recognised by social scrapers (Kosovo's `sq_XK` is
 * not in their supported lists, so it would be ignored).
 */
export const ogLocales = {
  en: 'en_GB',
  sq: 'sq_AL',
  de: 'de_DE',
  tr: 'tr_TR',
  sv: 'sv_SE',
  // ar: 'ar_AR',  // deferred — RTL-ready
} as const satisfies Record<keyof typeof languages, string>;

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
    'nav.visit': 'Visit',

    'a11y.skip': 'Skip to content',
    'a11y.menu': 'Menu',
    'a11y.close': 'Close',
    'a11y.primaryNav': 'Primary',
    'a11y.footerNav': 'Footer',
    'a11y.followNav': 'Follow the maker',
    'lang.label': 'Language',

    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Keeping the old city’s stories close.',
    'footer.credit': 'An unofficial guide by Yunus Andreasson',

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
    'places.related': 'Related places',
    'sources.title': 'Sources',

    'map.ariaLabel': 'Interactive map',
    'map.viewOsm': 'View on OpenStreetMap',
    'toc.title': 'On this page',
    'gallery.title': 'Gallery',
    'gallery.view': 'View image',
    'gallery.prev': 'Previous image',
    'gallery.next': 'Next image',
    'gallery.close': 'Close',
    'gallery.credits': 'Image credits',
    'actions.share': 'Share',
    'actions.directions': 'Directions',
    'actions.directionsGoogle': 'Google Maps',
    'actions.directionsApple': 'Apple Maps',

    'timeline.title': 'A timeline of Gjakova',
    'timeline.lede': 'Centuries of trade, faith, fire and revival, told as a single thread.',

    'about.title': 'About this guide',
    'about.description':
      'Who made this guide to Gjakova and why — the sources behind it, and the bazaar, mosques and stone kullas that hold the old city’s memory.',

    'visit.title': 'Visiting Gjakova',
    'visit.description':
      'How to get to Gjakova, where to stay in the old town, when to come, and the halal and prayer practicalities — a practical guide to visiting western Kosovo’s Ottoman-heritage city.',

    'locator.title': 'Where Gjakova sits in Kosovo',
    'locator.alt':
      'Map of Kosovo with Gjakova marked in the west and the capital Prishtina to the north-east.',
    'locator.capital': 'Prishtina',

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
    'nav.visit': 'Vizito',

    'a11y.skip': 'Kalo te përmbajtja',
    'a11y.menu': 'Menyja',
    'a11y.close': 'Mbyll',
    'a11y.primaryNav': 'Kryesore',
    'a11y.footerNav': 'Fundi i faqes',
    'a11y.followNav': 'Ndiq krijuesin',
    'lang.label': 'Gjuha',

    'footer.rights': 'Të gjitha të drejtat e rezervuara.',
    'footer.tagline': 'I mbajmë afër tregimet e qytetit të vjetër.',
    'footer.credit': 'Një udhërrëfyes joizyrtar nga Yunus Andreasson',

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
    'places.related': 'Vende të lidhura',
    'sources.title': 'Burime',

    'map.ariaLabel': 'Hartë interaktive',
    'map.viewOsm': 'Shiko në OpenStreetMap',
    'toc.title': 'Në këtë faqe',
    'gallery.title': 'Galeria',
    'gallery.view': 'Shiko fotografinë',
    'gallery.prev': 'Fotografia e mëparshme',
    'gallery.next': 'Fotografia tjetër',
    'gallery.close': 'Mbyll',
    'gallery.credits': 'Kreditë e imazheve',
    'actions.share': 'Ndaj',
    'actions.directions': 'Drejtimet',
    'actions.directionsGoogle': 'Google Maps',
    'actions.directionsApple': 'Apple Maps',

    'timeline.title': 'Një kronologji e Gjakovës',
    'timeline.lede': 'Shekuj tregtie, besimi, zjarri e rilindjeje, të rrëfyer si një fije e vetme.',

    'about.title': 'Rreth këtij udhërrëfyesi',
    'about.description':
      'Kush e bëri këtë udhërrëfyes për Gjakovën dhe pse — burimet që e mbështesin, dhe çarshia, xhamitë e kullat e gurta që ruajnë kujtesën e qytetit të vjetër.',

    'visit.title': 'Vizita në Gjakovë',
    'visit.description':
      'Si të arrini në Gjakovë, ku të rrini në qytetin e vjetër, kur të vini, dhe çështjet praktike të ushqimit hallall e të faljes — një udhërrëfyes praktik për qytetin e Gjakovës me trashëgimi osmane.',

    'locator.title': 'Ku ndodhet Gjakova në Kosovë',
    'locator.alt':
      'Hartë e Kosovës me Gjakovën të shënuar në perëndim dhe kryeqytetin Prishtina në verilindje.',
    'locator.capital': 'Prishtina',

    'notFound.title': 'Kjo shteg s’të çon askund',
    'notFound.lede': 'Faqja që kërkonit ka humbur nga harta.',
    'notFound.cta': 'Kthehu në ballinë',
  },

  de: {
    'site.name': 'Gjakova',
    'site.tagline': 'Ein Kulturführer durch die Altstadt',
    'site.description':
      'Ein eleganter Führer durch die alte Kultur von Gjakova, Kosovo — ihren Basar, ihre Moscheen, ihre Steinhäuser und die Menschen, die sie geprägt haben.',

    'nav.home': 'Start',
    'nav.places': 'Orte',
    'nav.timeline': 'Zeitleiste',
    'nav.about': 'Über',
    'nav.visit': 'Besuch',

    'a11y.skip': 'Zum Inhalt springen',
    'a11y.menu': 'Menü',
    'a11y.close': 'Schließen',
    'a11y.primaryNav': 'Hauptnavigation',
    'a11y.footerNav': 'Fußzeile',
    'a11y.followNav': 'Dem Macher folgen',
    'lang.label': 'Sprache',

    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.tagline': 'Die Geschichten der Altstadt bewahren.',
    'footer.credit': 'Ein inoffizieller Führer von Yunus Andreasson',

    'home.hero.eyebrow': 'Kosovo · die Dukagjin-Ebene',
    'home.hero.title': 'Gjakova, eine Stadt, bewahrt von ihren Handwerkern',
    'home.hero.lede':
      'Erkunden Sie den längsten alten Basar des Balkans, folgen Sie Jahrhunderten aus Stein und Holz und begegnen Sie der lebendigen Kultur einer der geschichtsträchtigsten Städte des Kosovo.',
    'home.hero.cta.places': 'Orte entdecken',
    'home.hero.cta.timeline': 'Der Zeitleiste folgen',

    'home.places.eyebrow': 'Wo beginnen',
    'home.places.title': 'Orte, die man kennen sollte',
    'home.places.lede':
      'Führer zu den Wahrzeichen, die das Gedächtnis der Stadt bewahren — vom Großen Basar bis zu den Kullas der alten Viertel.',

    'places.title': 'Orte',
    'places.lede':
      'Sorgfältig zusammengestellte Führer zu den Straßen, Moscheen, Häusern und Denkmälern des alten Gjakova.',
    'places.viewGuide': 'Den Führer lesen',
    'places.backToPlaces': 'Alle Orte',
    'places.related': 'Verwandte Orte',
    'sources.title': 'Quellen',

    'map.ariaLabel': 'Interaktive Karte',
    'map.viewOsm': 'Auf OpenStreetMap ansehen',
    'toc.title': 'Auf dieser Seite',
    'gallery.title': 'Galerie',
    'gallery.view': 'Bild ansehen',
    'gallery.prev': 'Vorheriges Bild',
    'gallery.next': 'Nächstes Bild',
    'gallery.close': 'Schließen',
    'gallery.credits': 'Bildnachweise',
    'actions.share': 'Teilen',
    'actions.directions': 'Wegbeschreibung',
    'actions.directionsGoogle': 'Google Maps',
    'actions.directionsApple': 'Apple Maps',

    'timeline.title': 'Eine Zeitleiste von Gjakova',
    'timeline.lede':
      'Jahrhunderte des Handels, des Glaubens, des Feuers und der Wiederkehr, erzählt als ein einziger Faden.',

    'about.title': 'Über diesen Führer',
    'about.description':
      'Wer diesen Führer durch Gjakova gemacht hat und warum — die Quellen dahinter sowie der Basar, die Moscheen und die steinernen Kullas, die das Gedächtnis der Altstadt bewahren.',

    'visit.title': 'Gjakova besuchen',
    'visit.description':
      'Wie man nach Gjakova kommt, wo man in der Altstadt übernachtet, wann man kommen sollte und das Praktische zu Halal und Gebet — ein praktischer Führer für den Besuch der osmanisch geprägten Stadt im Westen des Kosovo.',

    'locator.title': 'Wo Gjakova im Kosovo liegt',
    'locator.alt':
      'Karte des Kosovo mit Gjakova im Westen und der Hauptstadt Prishtina im Nordosten markiert.',
    'locator.capital': 'Prishtina',

    'notFound.title': 'Dieser Weg führt nirgendwohin',
    'notFound.lede': 'Die gesuchte Seite hat sich von der Karte verirrt.',
    'notFound.cta': 'Zurück zur Startseite',
  },

  tr: {
    'site.name': 'Gjakova',
    'site.tagline': 'Eski şehre kültürel bir rehber',
    'site.description':
      'Kosova’nın Gjakova şehrinin eski kültürüne zarif bir rehber — çarşısı, camileri, taş evleri ve onları biçimlendiren insanlar.',

    'nav.home': 'Ana Sayfa',
    'nav.places': 'Yerler',
    'nav.timeline': 'Zaman Çizelgesi',
    'nav.about': 'Hakkında',
    'nav.visit': 'Ziyaret',

    'a11y.skip': 'İçeriğe geç',
    'a11y.menu': 'Menü',
    'a11y.close': 'Kapat',
    'a11y.primaryNav': 'Ana gezinme',
    'a11y.footerNav': 'Alt bilgi',
    'a11y.followNav': 'Yapımcıyı takip et',
    'lang.label': 'Dil',

    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.tagline': 'Eski şehrin hikâyelerini yaşatmak.',
    'footer.credit': 'Yunus Andreasson tarafından gayriresmî bir rehber',

    'home.hero.eyebrow': 'Kosova · Dukagjin Ovası',
    'home.hero.title': 'Gjakova, zanaatkârlarının koruduğu bir şehir',
    'home.hero.lede':
      'Balkanlar’ın en uzun eski çarşısında yürüyün, yüzyıllar boyu süren taş ve ahşabın izini sürün ve Kosova’nın en çok hikâyesi olan şehirlerinden birinin yaşayan kültürüyle tanışın.',
    'home.hero.cta.places': 'Yerleri keşfedin',
    'home.hero.cta.timeline': 'Zaman çizelgesini izleyin',

    'home.places.eyebrow': 'Nereden başlamalı',
    'home.places.title': 'Bilinmesi gereken yerler',
    'home.places.lede':
      'Şehrin hafızasını taşıyan simge yapılara rehberler — Büyük Çarşı’dan eski mahallelerin kullalarına dek.',

    'places.title': 'Yerler',
    'places.lede':
      'Eski Gjakova’nın sokaklarına, camilerine, evlerine ve anıtlarına özenle hazırlanmış rehberler.',
    'places.viewGuide': 'Rehberi okuyun',
    'places.backToPlaces': 'Tüm yerler',
    'places.related': 'İlgili yerler',
    'sources.title': 'Kaynaklar',

    'map.ariaLabel': 'Etkileşimli harita',
    'map.viewOsm': 'OpenStreetMap’te görüntüle',
    'toc.title': 'Bu sayfada',
    'gallery.title': 'Galeri',
    'gallery.view': 'Resmi görüntüle',
    'gallery.prev': 'Önceki resim',
    'gallery.next': 'Sonraki resim',
    'gallery.close': 'Kapat',
    'gallery.credits': 'Görsel künyeleri',
    'actions.share': 'Paylaş',
    'actions.directions': 'Yol tarifi',
    'actions.directionsGoogle': 'Google Maps',
    'actions.directionsApple': 'Apple Maps',

    'timeline.title': 'Gjakova’nın zaman çizelgesi',
    'timeline.lede':
      'Yüzyıllar süren ticaret, inanç, yangın ve yeniden doğuş; tek bir iplik gibi anlatıldı.',

    'about.title': 'Bu rehber hakkında',
    'about.description':
      'Bu rehberi kimin neden hazırladığı, ardındaki kaynaklar ve eski şehrin hafızasını taşıyan çarşı, camiler ve taş kullalar.',

    'visit.title': 'Gjakova’yı ziyaret',
    'visit.description':
      'Gjakova’ya nasıl gidilir, eski şehirde nerede kalınır, ne zaman gelinir ve helal ile namaz pratikleri — batı Kosova’nın Osmanlı miraslı şehrini ziyaret için pratik bir rehber.',

    'locator.title': 'Gjakova Kosova’nın neresinde',
    'locator.alt': 'Kosova haritası: Gjakova batıda, başkent Priştine kuzeydoğuda işaretli.',
    'locator.capital': 'Priştine',

    'notFound.title': 'Bu yol hiçbir yere çıkmıyor',
    'notFound.lede': 'Aradığınız sayfa haritadan kaybolmuş.',
    'notFound.cta': 'Ana sayfaya dön',
  },

  sv: {
    'site.name': 'Gjakova',
    'site.tagline': 'En kulturguide till den gamla staden',
    'site.description':
      'En stillsam guide till den gamla kulturen i Gjakova, Kosovo — basaren, moskéerna, stenhusen och människorna som formade dem.',

    'nav.home': 'Hem',
    'nav.places': 'Platser',
    'nav.timeline': 'Tidslinje',
    'nav.about': 'Om guiden',
    'nav.visit': 'Besök',

    'a11y.skip': 'Hoppa till innehållet',
    'a11y.menu': 'Meny',
    'a11y.close': 'Stäng',
    'a11y.primaryNav': 'Huvudmeny',
    'a11y.footerNav': 'Sidfot',
    'a11y.followNav': 'Följ skaparen',
    'lang.label': 'Språk',

    'footer.rights': 'Alla rättigheter förbehållna.',
    'footer.tagline': 'Vi håller den gamla stadens berättelser nära.',
    'footer.credit': 'En inofficiell guide av Jonas Andreasson',

    'home.hero.eyebrow': 'Kosovo · Dukagjin-slätten',
    'home.hero.title': 'Gjakova, en stad som bevarats av sina hantverkare',
    'home.hero.lede':
      'Vandra Balkans längsta gamla basar, följ sekler av sten och timmer och möt den levande kulturen i en av Kosovos mest omskrivna städer.',
    'home.hero.cta.places': 'Utforska platserna',
    'home.hero.cta.timeline': 'Följ tidslinjen',

    'home.places.eyebrow': 'Var du börjar',
    'home.places.title': 'Platser att känna till',
    'home.places.lede':
      'Guider till de landmärken som bär stadens minne — från Stora basaren till de gamla kvarterens kullor.',

    'places.title': 'Platser',
    'places.lede':
      'Omsorgsfulla guider till gatorna, moskéerna, husen och monumenten i gamla Gjakova.',
    'places.viewGuide': 'Läs guiden',
    'places.backToPlaces': 'Alla platser',
    'places.related': 'Närliggande platser',
    'sources.title': 'Källor',

    'map.ariaLabel': 'Interaktiv karta',
    'map.viewOsm': 'Visa på OpenStreetMap',
    'toc.title': 'På den här sidan',
    'gallery.title': 'Bildgalleri',
    'gallery.view': 'Visa bilden',
    'gallery.prev': 'Föregående bild',
    'gallery.next': 'Nästa bild',
    'gallery.close': 'Stäng',
    'gallery.credits': 'Bildkällor',
    'actions.share': 'Dela',
    'actions.directions': 'Vägbeskrivning',
    'actions.directionsGoogle': 'Google Maps',
    'actions.directionsApple': 'Apple Maps',

    'timeline.title': 'En tidslinje över Gjakova',
    'timeline.lede': 'Sekler av handel, tro, eld och återuppbyggnad, berättade som en enda tråd.',

    'about.title': 'Om den här guiden',
    'about.description':
      'Vem som gjort den här guiden till Gjakova och varför — källorna bakom den, och basaren, moskéerna och stenkullorna som bär den gamla stadens minne.',

    'visit.title': 'Att besöka Gjakova',
    'visit.description':
      'Hur du tar dig till Gjakova, var du bor i gamla staden, när du bör komma och vad som är bra att veta på plats — en handfast guide till västra Kosovos osmanska kulturstad.',

    'locator.title': 'Var Gjakova ligger i Kosovo',
    'locator.alt':
      'Karta över Kosovo med Gjakova utmärkt i väster och huvudstaden Pristina i nordost.',
    'locator.capital': 'Pristina',

    'notFound.title': 'Den här vägen leder ingenstans',
    'notFound.lede': 'Sidan du letade efter har vandrat bort från kartan.',
    'notFound.cta': 'Tillbaka till start',
  },
} as const;

/** All translatable keys, derived from the source (`en`) dictionary. */
export type UIKey = keyof (typeof ui)[typeof defaultLang];
