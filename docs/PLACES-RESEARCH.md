# Places — the 9 most interesting sites (research tracker)

A curated shortlist of the **9 most interesting places to visit in Gjakova**, weighted
toward Islam and Ottoman heritage, plus two **nature** picks for beautiful scenery.
Three entries have finished prose; six are **research stubs** whose body is still an
internal checklist.

> **All nine are live** (`draft: false`), so they appear on `/places/` and `/sq/places/`.
> The stub *cards* read fine (title + summary + designed plate), but each stub *detail
> page* still shows the "needs research" checklist body — replace that with real prose
> before treating it as published.

**How to use this:** open a stub (both `en/` and `sq/`), research it with
[`SOURCES.md`](SOURCES.md), replace the placeholder body with real prose, add
`coordinates`, and verify the `sources`. Read the **Cautions & disambiguation** section of
`SOURCES.md` first — several of these have real wrong-city / contested-date traps.

> **Heroes added (2026-06-20):** all nine entries now carry an illustrated `hero`
> (`src/assets/places/<slug>.png`, with localized `heroAlt`) — the detail pages and cards show
> the artwork instead of the `PlaceholderPlate.astro` fallback (which still renders
> automatically for any future entry left without a `hero`).
> Stubs still carry no `coordinates` on purpose — a wrong map pin is worse than none; adding
> them is a research step.

## The list

| # | Place | slug | category | status | key open questions |
| --- | --- | --- | --- | --- | --- |
| 1 | The Grand Bazaar (Çarshia e Madhe) | `grand-bazaar` | bazaar | ✅ written | — |
| 2 | The Hadum Mosque (Xhamia e Hadumit) | `hadum-mosque` | mosque | ✅ written | — |
| 3 | The Hadum Library & Madrasa | `hadum-library` | monument | 🔲 stub | distinguish historic library vs modern "Great Madrasa"; founding date; what the rebuilt library holds |
| 4 | The Tailors' Bridge (Ura e Terzive) | `terzi-bridge` | bridge | 🔲 stub | construction date (15th–18th c. all cited → give a range); exact location/access; arches |
| 5 | The Clock Tower (Sahat Kulla) | `clock-tower` | monument | 🔲 stub | original date & patron; destruction/rebuild story; what is reconstruction |
| 6 | The Old Hammam | `hammam` | monument | 🔲 stub | **does it still stand?**; founding date; tie to the Hadum vakëf |
| 7 | The Stone Kulla | `kulla` | house | ✅ written | — |
| 8 | Radoniq Lake (Liqeni i Radoniqit) | `radoniq-lake` | nature | 🔲 stub | reservoir scale & date; shore access from Gjakova; best viewpoints; **needs a nature source** |
| 9 | The Accursed Mountains (Bjeshkët e Nemuna) | `accursed-mountains` | nature | 🔲 stub | pin a viewpoint/trailhead reachable from Gjakova; municipality boundaries vs Deçan/Junik; park status; **needs a nature source** |

## Source leads by theme

- **Ottoman bazaar complex** (bazaar, mosque, library, clock tower, hammam): Monumentet
  Kulturore "Çarshia e Madhe" dossier (E.K. 59/55); Osmanlı Eserleri (Hadum); Evliya Çelebi
  1662 (trans. Robert Elsie).
- **Mosques & learning**: TYB "Camiler ve tekkeler şehri Yakova"; the academic entry on the
  Islamic community of Gjakova.
- **Heritage status / official records**: Trashëgimia Kulturore e Kosovës (`dtk.rks-gov.net`);
  Komuna e Gjakovës — Historiku & portal.
- **General / cultural history**: Wikipedia "Culture of Gjakova" and the sq equivalents.
- **Nature (Radoniq Lake, Accursed Mountains)**: ⚠ **not yet covered by `SOURCES.md`** — it is
  a heritage-only library. Add verified nature/tourism sources before publishing these two
  (candidates to vet: Wikipedia "Radonjić Lake"; Bjeshkët e Nemuna National Park; an official
  Kosovo tourism portal). The municipal portal is the only solid starting point so far.

All heritage URLs live in [`SOURCES.md`](SOURCES.md). Prefer official/academic; cross-check
dates; cite endonyms per locale.

## Notes

- The two nature entries use a new **`nature`** place category (added to
  `PLACE_CATEGORIES` in `src/content.config.ts`); its placeholder plate uses the earthy
  `stone` palette (`src/lib/placePalette.mjs`) — no new colour ramp was introduced.

## Candidates considered but left off

Swap any of these in if research turns up better material than a current stub:

- **Heritage:** the Mahmut Pasha / other historic mosques; the House of Tradition
  (*Shtëpia e Traditës*); specific surviving tower-houses; the old quarters / *mëhalla* as a
  walking route.
- **Nature (verify the municipality):** Çabrat hill (*Kodra e Çabratit*) — green hill over
  the town, but also a war-memorial site; Mirusha Waterfalls (mostly Malishevë/Klinë, not
  Gjakovë); the Fshaj Bridge & canyon (Deçan). Confirm boundaries before promoting any.
- **Dropped on request:** the Ethnographic Museum, the Sufi/Bektashi tekke, and the Catholic
  cathedral.
