# Medical Companions

Animated, cited study and patient-education guides, one disease each, on one site.

| Companion | Path | Languages |
|---|---|---|
| [Alzheimer's Companion](alzheimers/README.md) | `/alzheimers/` | English, Hebrew (`/alzheimers/he/`) |
| [FMF Companion](fmf/README.md) (Familial Mediterranean Fever) | `/fmf/` | English, Hebrew (`/fmf/he/`) |
| [Parkinson's Companion](parkinsons-disease/README.md) | `/parkinsons-disease/` | English |

The hub at `/` links to each one and carries the shared method and disclaimer. Every companion links back to it, and its structured data names the site (`isPartOf`).

> **Not medical advice.** The companions are educational syntheses of the published literature. They cannot diagnose anyone and nothing in them should change a treatment without your own clinician.

## Layout

```
site.json            the site address, the languages table, and the companions (names, languages, reviewers, old addresses)
hub/index.html       the hub page source (hub/share-card.html renders its share image, hub/404.html the not-found page)
tools/               build tools shared by every companion; tools/i18n/<lang>.json holds the UI strings they share
<companion>/src/     a companion's parts: head and styles, shell, sections, js, sources.json, pages.json, strings.json
                     (<lang>/ for a translation: he/)
<companion>/index.html, <companion>/<module>/index.html, <companion>/app.js   built pages and their shared script
                     (<companion>/<lang>/… for a translation; committed, so the repo is the site)
index.html, 404.html, share-card.png, sitemap.xml, robots.txt   built from hub/ and site.json
```

Each companion keeps its own look (palette, fonts, icon) and its own `compile_sources.py`, since those are content. Everything that turns parts into a page is shared.

Both companions' git histories were carried over from `moshejs/alzheimers-companion` and `moshejs/fmf-companion`. Each arrived in a commit titled "Bring in …", whose second parent is the old repository's history (`git log <that commit>^2`); those older commits use the old paths, without the `alzheimers/` or `fmf/` prefix.

## Building

```bash
python3 tools/build_site.py                         # every companion and language, the hub, sitemap.xml, robots.txt, redirects/
python3 tools/build.py fmf                          # one companion (add --lang he for a translation)
python3 tools/smoke.py fmf/index.html all           # headless-Chrome check of every module page
python3 tools/check_lang.py alzheimers he           # a translation must match the English in code, citations and numbers
python3 tools/make_artifact.py alzheimers --lang he # the Claude artifact copy of a page
```

`%SITE%` in any part is replaced with `site` from `site.json`, so moving the site to its own domain is a one-line change there and a rebuild.

## Search

What the build takes care of, so a change doesn't undo it:

- Every module is its own page, `<companion>/<module>/` (and `<companion>/he/<module>/`), so a topic such as lecanemab, APOE4, colchicine dosing or AA amyloidosis can rank on its own. Each page carries only its own module's section (no hidden copies of the others, so the pages are not near-duplicates), its heading as the `h1`, and a breadcrumb in its structured data. All of a companion's pages share one cached script, `app.js`, versioned by its hash. Until that script shows the section it keeps its place, at least a screen tall, but is invisible (a style the build adds): its step buttons and phone-width drawings are filled in by the script, and the footer would otherwise start on screen, so showing it earlier would push the page around as it loads. A `<noscript>` style shows it to readers without JavaScript. The companion's address itself is the home module and keeps the FAQ.
- Module titles and descriptions live in `src/pages.json` (and `src/<lang>/pages.json`), keyed by module id. A module missing there gets its nav title and the first sentences of its lede; the build warns when a description runs past 160 characters.
- The nav, the crawler outline in `<noscript>` and in-page `#module` links are real links to the module pages. Old `#module` addresses still work: the router sends `/alzheimers/#antibody` to `/alzheimers/antibody/`, and so do the redirects from the old repositories.
- Each page has its own canonical URL, title, description (kept under about 160 characters so Google shows it whole; the longer Open Graph description is for link previews), share image and `MedicalWebPage` structured data. The build adds `datePublished` (`site.json`), `dateModified` (the last commit to the companion's `src/`) and the publisher.
- Each companion's pages in every language point at each other with `hreflang`, module by module, plus `x-default` for English, in the page and in `sitemap.xml`. The build writes these links (at `<!--HREFLANG-->` in `00-head.html`) from the companion's `langs`, so a new language needs no head edits. Only pages that may be indexed are linked: see [Translations](#translations).
- On a companion's first page the `h1` names the disease, which is what people search for; the companion's name sits above it. On a module page the `h1` is the module's heading.
- Google Fonts load without blocking the first paint.
- `sitemap.xml` lists every page that may be indexed, dated by the last commit to its companion's `src/`, and `404.html` lists every guide.
- After a deploy goes live, `python3 tools/indexnow.py` tells Bing and the other IndexNow engines about every page in the sitemap. Google reads `sitemap.xml` through Search Console.

`tools/make_artifact.py` builds the Claude artifact from the one-page build (`build.py --single`), where every module is in one file and switched by `#hash`.

### Adding a companion

1. Put its parts in `<slug>/src/`, using `%SITE%/<slug>/` for its own address in the metadata.
2. Add it to `site.json` and give it a card in `hub/index.html` (`%CITED:<slug>%` fills in its cited-source count).
3. Link the others from its footer, run `tools/build_site.py`, then `tools/smoke.py <slug>/index.html all`.

## Translations

English is the source. Every other language is built from the same parts, and nothing on the site redirects by language: each language has its own folder (`/fmf/he/`, `/fmf/de/`, `/fmf/pt-br/`), and a reader moves between them with the language switcher.

**The languages table.** `languages` in `site.json` lists every language the site can be built in, whether or not a companion uses it yet: its name in itself (what the switcher shows), its English name, its direction (`ltr` or `rtl`), its `og:locale`, its fonts and any CSS it needs. `fonts.display` and `fonts.body` are faces that carry the script; the build puts them after the companion's own first face in `--display` and `--body`, so Latin text keeps the companion's look and the script falls through to them, puts the body face first in `--mono`, and loads them from Google Fonts (`fonts.google`). `fonts.subset` names the Google Fonts subset the script needs; Google serves it in unicode-range slices, so a Japanese page downloads only the slices for the characters it shows. Japanese gets `word-break:auto-phrase` and Korean `word-break:keep-all` from `css`. A right-to-left language gets `dir="rtl"` and the companion's `src/<lang>/rtl.css`, which mirrors the layout; until it has its own, the build uses another right-to-left language's (Arabic would start from Hebrew's) and says so. Hebrew sets its own fonts in its `rtl.css` and `meta.html`, so the build leaves those alone.

**A companion's languages.** Each companion lists the languages it is built in (`langs`) and, for each, a `reviewer` with `name`, `credentials` and `date`, empty until filled.

**Review gate.** Machine translation of medical text is not published unreviewed. A translated page is indexed only when it is complete and its language has a named reviewer:

- complete: none of its parts (shell, footer, core script, its section, its module script, `meta.html`) falls back to English, and neither does any UI string it uses
- reviewed: `reviewers.<lang>.name` is filled in. The page's `MedicalWebPage` structured data then carries `reviewedBy` and `lastReviewed`, and its footer names the reviewer, so the structured data matches what the page shows

Any other page is still built, so it can be read and reviewed at its address, but it is `noindex`, has no `hreflang` links, is not linked from the others' `hreflang`, and is left out of `sitemap.xml`. Every build reports per language what is untranslated, which strings are missing and the review status. Hebrew was published before review was tracked, so each companion lists it in `indexed_without_review`; remove it from there once a Hebrew reviewer is named. No other language should be added to that list. Every page's structured data carries `inLanguage`.

**The hub's language links.** `tools/build_site.py` fills each card's `%LANGS:slug%` (the links) and `%LANGNAMES:slug%` (the names) from the companion's `langs`, listing only languages whose first page is indexed, so an unreviewed translation is not linked from the hub; a link reads `hub.read` from `tools/i18n/<lang>.json` ("Read in English"), or the language's own name until that is translated.

**UI strings.** Interface text in the parts is written as `%t:key%`: the shell's skip link, nav label, theme button and disclaimers, the previous/next pager, the player's Play/Pause, "In plain words" and "Exam hook", the flashcard, quiz, glossary and sources controls, and the footer's not-medical-advice line. The build fills each key from `<companion>/src/<lang>/strings.json`, then `tools/i18n/<lang>.json` (shared by every companion), and falls back to English (`<companion>/src/strings.json`, `tools/i18n/en.json`) for a key the language lacks, listing it as `missing strings`. `%t:key{n:i+1,total:list.length}%` passes values in: the string says `{n} of {total}` in whatever order the language needs. So a language's chrome can be translated once in `tools/i18n/<lang>.json`, before any module is. Two strings are new with this layer and not yet in Hebrew: `lang.menu`, the label of the menu the switcher becomes once a companion has a third language, and `review.line`, the footer line naming the reviewer. Each is used only from that point, and a Hebrew page that would show one in English is `noindex` until it is added to `tools/i18n/he.json` (`check_lang.py` lists both as falling back to English).

**Adding a language to a companion**

1. Add the language to the table in `site.json` if it is not there, then to the companion's `langs`, with an empty reviewer.
2. Translate `tools/i18n/<lang>.json` (if no companion has the language yet), then `<companion>/src/<lang>/meta.html`, `strings.json`, `pages.json`, `10-shell.html`, `90-foot.html`, and the sections and `js/` files. A file that is missing falls back to English.
3. Run `python3 tools/check_lang.py <companion> <lang>`. It compares each translated part with its English part: the code and element structure must match exactly, and so must the citations and the numbers, so a translation cannot drop a citation or change a dose. It checks the strings files the same way, and lists text that still looks like English.
4. Run `tools/build_site.py`, then `tools/smoke.py <companion>/<lang>/index.html all`. Until step 5 every page in the language is `noindex`.
5. When the language's named medical reviewer has signed off, fill in `reviewers.<lang>` in `site.json` and rebuild. The finished pages join the sitemap and the `hreflang` sets.

## Hosting

The repo root is the site: GitHub Pages serves it as is (`.nojekyll` is set), and `vercel.json` is ready for Vercel with no build step.

### Old addresses

`tools/build_site.py` writes `redirects/<old repository>/` (not committed). Copying a folder's contents over the old repository's site sends visitors, including any `#module` link, and search engines to the new address. GitHub Pages cannot send a real 301, so each page uses a canonical link and an immediate meta refresh, which Google treats as a permanent move.
