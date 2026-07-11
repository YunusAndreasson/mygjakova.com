import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPlaces, entrySlug } from '~/lib/collections';
import { useTranslations, localizedPath } from '~/i18n/utils';

const lang = 'de' as const;

export async function GET(context: APIContext) {
  const t = useTranslations(lang);
  const places = await getPlaces(lang);
  return rss({
    title: `${t('site.name')} — ${t('site.tagline')}`,
    description: t('site.description'),
    site: context.site ?? context.url.origin,
    items: places.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      link: localizedPath(lang, `/places/${entrySlug(p.id)}`),
    })),
    customData: `<language>${lang}</language>`,
  });
}
