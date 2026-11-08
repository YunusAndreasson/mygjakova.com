# Contributing

Corrections help the most: a wrong date, a misspelt name, a place that has
closed, a dead source link. Open an issue with the source that shows it. For
anything bigger than a fix, open an issue first, so we can agree on the shape
before you write the code.

## Build and check

You need Node 26 and pnpm 11, the versions CI uses.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Before a pull request:

- `pnpm verify` passes: Biome lint and format, `astro check`, the Vitest tests
  and the full build. If sharp fails to install on a machine with libvips
  installed system-wide, set `SHARP_IGNORE_GLOBAL_LIBVIPS=1` and install again.
- The build rewrites the icons and share cards in `public/`. Leave them out of
  your commit unless your change is to them.
- A change to the guide's text is made in every language it appears in
  (`src/content/<collection>/<locale>/`, `src/i18n/ui.ts`), or the pull request
  says which ones you couldn't do.
- A new fact cites a source, ideally one from [docs/SOURCES.md](docs/SOURCES.md).
  Read its "Cautions & disambiguation" section first: some sources describe a
  different town, and some dates are contested.
- One change per pull request, with a commit message in the repository's
  style: `feat(sq): …`, `feat(seo): …`, `docs: …`, `chore: …`.

## What myGjakova won't do

Some behaviour is deliberate and changes to it need a strong case:

- Nothing loads from another origin. Fonts, map tiles and glyphs are served
  from the site itself, with no API key, and the CSP stays same-origin.
- No language falls back to another. A page without a translation is a 404.
- No guessed credits. A borrowed image is a public-domain or Creative Commons
  work from Wikimedia Commons, recorded in `scripts/data/image-manifest.mjs`
  with its author and licence, and credited on the page.
- No guessed map pins. A place gets coordinates only once they're verified;
  a wrong pin is worse than none.
- No `left` or `right` in the CSS. Logical properties keep the layout ready to
  flip for Arabic.

## Security issues

Not in issues or pull requests: see [SECURITY.md](SECURITY.md).

## Conduct and license

Everyone here follows the [Code of Conduct](CODE_OF_CONDUCT.md). By
contributing code, you agree it's released under the [MIT license](LICENSE).
The guide's text, photographs and illustrations aren't MIT; LICENSE says which
files are which.
