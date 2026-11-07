# Medical Companions

Animated, cited study and patient-education guides, one disease each, on one site.

| Companion | Path | Languages |
|---|---|---|
| [Alzheimer's Companion](alzheimers/README.md) | `/alzheimers/` | English, Hebrew (`/alzheimers/he/`) |
| [FMF Companion](fmf/README.md) (Familial Mediterranean Fever) | `/fmf/` | English, Hebrew (`/fmf/he/`) |
| [Myasthenia Gravis Companion](myasthenia-gravis/README.md) | `/myasthenia-gravis/` | English |
| [Gout Companion](gout/README.md) | `/gout/` | English |
| [ALS Companion](als/README.md) (amyotrophic lateral sclerosis) | `/als/` | English |
| [Parkinson's Companion](parkinsons-disease/README.md) | `/parkinsons-disease/` | English |
| [MS Companion](multiple-sclerosis/README.md) (multiple sclerosis) | `/multiple-sclerosis/` | English |
| [Colorectal Cancer Companion](colorectal-cancer/README.md) (bowel cancer) | `/colorectal-cancer/` | English |
| [EDS Companion](ehlers-danlos-syndromes/README.md) (Ehlers-Danlos syndromes) | `/ehlers-danlos-syndromes/` | English |
| [TB Companion](tuberculosis/README.md) (tuberculosis) | `/tuberculosis/` | English |
| [BPD Companion](borderline-personality-disorder/README.md) (borderline personality disorder) | `/borderline-personality-disorder/` | English |
| [ADHD Companion](adhd/README.md) (attention deficit hyperactivity disorder) | `/adhd/` | English |
| [Autism Companion](autism/README.md) (autism spectrum disorder) | `/autism/` | English |
| [Bipolar Companion](bipolar-disorder/README.md) (bipolar disorder and lithium therapy) | `/bipolar-disorder/` | English |
| [AUD Companion](alcohol-use-disorder/README.md) (alcohol use disorder and alcohol withdrawal) | `/alcohol-use-disorder/` | English |
| [Heart Attack Companion](myocardial-infarction/README.md) (myocardial infarction, acute coronary syndromes and recovery) | `/myocardial-infarction/` | English |
| [Cirrhosis Companion](cirrhosis/README.md) (cirrhosis of the liver and its complications) | `/cirrhosis/` | English |
| [Sepsis Companion](sepsis-and-shock/README.md) (sepsis, septic shock and the other types of shock) | `/sepsis-and-shock/` | English |
| [CF Companion](cystic-fibrosis/README.md) (cystic fibrosis and CFTR modulators) | `/cystic-fibrosis/` | English |
| [COPD Companion](copd/README.md) (chronic obstructive pulmonary disease, emphysema and inhaled treatment) | `/copd/` | English |

The hub at `/` links to each one and carries the shared method and disclaimer. Every companion links back to it, and its structured data names the site (`isPartOf`).

> **Not medical advice.** The companions are educational syntheses of the published literature. They cannot diagnose anyone and nothing in them should change a treatment without your own clinician.

## Layout

```
site.json            the site address, the languages table, and the companions (names, languages, reviewers, old addresses)
hub/index.html       the hub page source (hub/share-card.html renders its share image, hub/404.html the not-found page)
tools/               build tools shared by every companion; tools/i18n/<lang>.json holds the UI strings they share
tools/core/          the script runtime every companion shares (helpers, routing, nav, theme, the player, boot)
<companion>/src/     a companion's parts: head and styles, shell, sections, js, sources.json, pages.json, strings.json
                     (<lang>/ for a translation: he/); sources.config.json and source-corrections.json feed sources.json
<companion>/research/   the research passes (<LETTER>-<area>.md) that sources.json is compiled from
<companion>/index.html, <companion>/<module>/index.html, <companion>/app.js   built pages and their shared script
                     (<companion>/<lang>/… for a translation; committed, so the repo is the site)
index.html, 404.html, share-card.png, sitemap.xml, robots.txt   built from hub/ and site.json
```

Each companion keeps its own look (palette, fonts, icon), since that is content, and its research areas as data in `src/sources.config.json`. Everything that turns parts into a page, or research passes into `sources.json`, is shared.

Both companions' git histories were carried over from `moshejs/alzheimers-companion` and `moshejs/fmf-companion`. Each arrived in a commit titled "Bring in …", whose second parent is the old repository's history (`git log <that commit>^2`); those older commits use the old paths, without the `alzheimers/` or `fmf/` prefix.

### The script

Every page runs one script, built from the shared runtime in `tools/core/` and the companion's own `src/js/*.js`, concatenated in file-name order inside one `<script>` and one closure, so every part sees the others' names:

| File | Whose | What it holds |
|---|---|---|
| `tools/core/00-core.js` | shared | opens the script; `$`, `$$`, `store` (localStorage under the companion's `PREFIX`), `rng`, `lerp`, `clamp`, `ramp`, `ease`, `bump`, `f1`, `animate`, `pathFn`, `marker` |
| `<companion>/src/js/01-config.js` | companion | `PREFIX` (its storage key prefix, such as `'fmfc:'`), `MODS` (the modules in nav order: `{id,t,g,n,d}`; the build reads it too) and `GROUPS` (each group's name and colour classes) |
| `<companion>/src/js/02-draw.js` | companion, optional | its drawing kit: the glyphs its modules share (gout's `needle()` and `rhomb()`, the ALS `bodyMap()` ...) |
| `tools/core/03-router.js` | shared | module pages and `#module` routing, the nav, the home page's unit list, the pager, the cite click handler, the skip link, the language link, the theme button, narrow mode (`NARROW`, `vb`), the aria-live guard, the player (`playWire`, `stepWire`, `phaseOf`, `noteHTML`) |
| `<companion>/src/js/05-*.js` … | companion | one module each: `inits.<id>=()=>{…}` |
| `tools/core/99-boot.js` | shared | shows the first module and closes the script |

`SOURCES` (from `sources.json`) follows `00-core.js`. A fix to the runtime goes in `tools/core/` once and reaches every companion and language at the next build; a companion keeps no copy of a shared file (the build stops if it finds one). The runtime's words are `%t:` UI strings, so a translation needs only its own `src/<lang>/js/01-config.js` for the module and group names; a drawing kit falls back to English without being listed as untranslated, so a kit that draws words needs its own `src/<lang>/js/02-draw.js`.

## Building

```bash
python3 tools/compile_sources.py gout               # research/*.md -> gout/src/sources.json (--all for every companion)
python3 tools/compile_sources.py --check --all      # writes nothing; exit 1 if a sources.json is out of date
python3 tools/build_site.py                         # every companion and language, the hub, sitemap.xml, robots.txt, redirects/
python3 tools/build.py fmf                          # one companion (add --lang he for a translation)
python3 tools/smoke.py fmf/index.html all           # headless-Chrome check of every module page
python3 tools/check_site.py                         # JSON-LD, placeholders, sitemap, internal links of the built site
python3 tools/check_lang.py alzheimers he           # a translation must match the English in code, citations and numbers
python3 tools/make_artifact.py alzheimers --lang he # the Claude artifact copy of a page
```

`%SITE%` in any part is replaced with `site` from `site.json`, so moving the site to its own domain is a one-line change there and a rebuild.

### Sources

`sources.json` is compiled, not edited. `tools/compile_sources.py <slug>` reads every research pass `research/<LETTER>-*.md` whose letter is one of the companion's `areas` in `src/sources.config.json` (so `U-*.md` update notes and `RESEARCH-FORMAT.md` are not read), merges their **Sources** sections (same work under one key, cited from several areas, becomes one entry; a key reused for a different work is renamed key + area letter; different keys for one work are merged by PMID, DOI, drug-label set ID, trial ID or title), applies `src/source-corrections.json`, and writes `src/sources.json` sorted by key. Each source line ends `(validated: <service>)`; a line without it is marked unverified. `tools/build_site.py` runs it for every companion before it builds (a few seconds; the file is rewritten only when it changes); `tools/build.py` reads only `sources.json`, so run the compiler yourself before building a single companion. Commit `sources.json` with the passes or corrections that changed it.

`sources.config.json` holds the area letters and names and, when needed, `aliases` (works no identifier shows are one, such as a drug label cited under two keys). The first companions (FMF, ALS, Alzheimer's, gout, myasthenia gravis, Parkinson's) also carry `validated_tag`, `match`, `url` or `doi_link`, which reproduce how they were compiled before the rules settled; the docstring of `tools/compile_sources.py` explains each, and a new companion leaves them out. The FMF and Alzheimer's research passes are not in this repository, so the compiler skips those two and their committed `sources.json` is the record.

## Search

What the build takes care of, so a change doesn't undo it:

- Every module is its own page, `<companion>/<module>/` (and `<companion>/he/<module>/`), so a topic such as lecanemab, APOE4, colchicine dosing or AA amyloidosis can rank on its own. Each page carries only its own module's section (no hidden copies of the others, so the pages are not near-duplicates), its heading as the `h1`, and a breadcrumb in its structured data. All of a companion's pages share one cached script, `app.js`, versioned by its hash. Until that script shows the section it keeps its place, at least a screen tall, but is invisible (a style the build adds): its step buttons and phone-width drawings are filled in by the script, and the footer would otherwise start on screen, so showing it earlier would push the page around as it loads. A `<noscript>` style shows it to readers without JavaScript. The companion's address itself is the home module and keeps the FAQ.
- The text a module's script draws into empty containers (key-number cards, notes, readouts, tables, the glossary) is prerendered into the built page, so readers and crawlers without JavaScript see it. The last step of `tools/build_site.py` runs `tools/prerender.py`, which loads each page in headless Chrome, takes the HTML of every element in the module's section that was empty and now holds text, and writes it between `<!--pre-->` and `<!--/pre-->`. The script still replaces it, while the section is still invisible, so nothing changes for readers with JavaScript. Left out: SVG and canvas drawings, form fields, containers that hold only buttons, the quiz, flashcards and sources, and anything that changes with the reader's width, locale, time zone, clock or random numbers (each page is rendered twice under different conditions, and the two must match). A page whose prerendered copy renders differently once the script runs is left as it was. The step is idempotent (the markers are removed before a page is read) and needs Chrome; `build_site.py --no-prerender` skips it, and `tools/prerender.py --check` reports without writing.
- Module titles and descriptions live in `src/pages.json` (and `src/<lang>/pages.json`), keyed by module id. A module missing there gets its nav title and the first sentences of its lede; the build warns when a description runs past 160 characters.
- The nav, the crawler outline in `<noscript>` and in-page `#module` links are real links to the module pages. Old `#module` addresses still work: the router sends `/alzheimers/#antibody` to `/alzheimers/antibody/`, and so do the redirects from the old repositories.
- Each page has its own canonical URL, title, description (kept under about 160 characters so Google shows it whole; the longer Open Graph description is for link previews), share image and `MedicalWebPage` structured data. The build adds `datePublished` (`site.json`), `dateModified` (the last commit to the companion's `src/`) and the publisher.
- Each companion's pages in every language point at each other with `hreflang`, module by module, plus `x-default` for English, in the page and in `sitemap.xml`. The build writes these links (at `<!--HREFLANG-->` in `00-head.html`) from the companion's `langs`, so a new language needs no head edits. Only pages that may be indexed are linked: see [Translations](#translations).
- On a companion's first page the `h1` names the disease, which is what people search for; the companion's name sits above it. On a module page the `h1` is the module's heading.
- Fonts are self-hosted: `tools/fonts.py` (run by `build_site.py`) keeps the woff2 files each Google Fonts link in the parts names under `fonts/`, content-hashed and cached for a year, and the build turns each link into inline `@font-face` rules, preloads the body face, and adds a metric-matched local fallback, so no page asks Google for anything and the font swap does not move the page.
- `sitemap.xml` lists every page that may be indexed, dated by the last commit to its companion's `src/`, and `404.html` lists every guide.
- After a deploy goes live, `python3 tools/indexnow.py` tells Bing and the other IndexNow engines about every page in the sitemap. Google reads `sitemap.xml` through Search Console.

`tools/make_artifact.py` builds the Claude artifact from the one-page build (`build.py --single`), where every module is in one file and switched by `#hash`.

### Adding a companion

1. Put its parts in `<slug>/src/`, using `%SITE%/<slug>/` for its own address in the metadata. Its script is only its config and content: `js/01-config.js` (a `PREFIX` no other companion uses, `MODS`, `GROUPS`), `js/02-draw.js` if it has a drawing kit, and one `js/*.js` per module; the runtime comes from `tools/core/` (see [The script](#the-script)).
   Put its research passes in `<slug>/research/` (format: any companion's `research/RESEARCH-FORMAT.md`), write `<slug>/src/sources.config.json` with just its `areas` (copy one from another companion), and run `python3 tools/compile_sources.py <slug>` to make `src/sources.json`.
2. Add it to `site.json` and give it a card in `hub/index.html` (`%CITED:<slug>%` fills in its cited-source count).
3. Link the others from its footer, run `tools/build_site.py`, then `tools/smoke.py <slug>/index.html all`.

## Translations

English is the source. Every other language is built from the same parts, and nothing on the site redirects by language: each language has its own folder (`/fmf/he/`, `/fmf/de/`, `/fmf/pt-br/`), and a reader moves between them with the language switcher.

**The languages table.** `languages` in `site.json` lists every language the site can be built in, whether or not a companion uses it yet: its name in itself (what the switcher shows), its English name, its direction (`ltr` or `rtl`), its `og:locale`, its fonts and any CSS it needs. `fonts.display` and `fonts.body` are faces that carry the script; the build puts them after the companion's own first face in `--display` and `--body`, so Latin text keeps the companion's look and the script falls through to them, puts the body face first in `--mono`, and self-hosts them from the Google Fonts query in `fonts.google` (`tools/fonts.py`). `fonts.subset` names the Google Fonts subset the script needs; Google serves it in unicode-range slices, so a Japanese page downloads only the slices for the characters it shows. Japanese gets `word-break:auto-phrase` and Korean `word-break:keep-all` from `css`. A right-to-left language gets `dir="rtl"` and the companion's `src/<lang>/rtl.css`, which mirrors the layout; until it has its own, the build uses another right-to-left language's (Arabic would start from Hebrew's) and says so. Hebrew sets its own fonts in its `rtl.css` and `meta.html`, so the build leaves those alone.

**A companion's languages.** Each companion lists the languages it is built in (`langs`) and, for each, a `reviewer` with `name`, `credentials` and `date`, empty until filled.

**Review gate.** Machine translation of medical text is not published unreviewed. A translated page is indexed only when it is complete and its language has a named reviewer:

- complete: none of its parts (shell, footer, `js/01-config.js`, its section, its module script, `meta.html`) falls back to English, and neither does any UI string it uses
- reviewed: `reviewers.<lang>.name` is filled in. The page's `MedicalWebPage` structured data then carries `reviewedBy` and `lastReviewed`, and its footer names the reviewer, so the structured data matches what the page shows

Any other page is still built, so it can be read and reviewed at its address, but it is `noindex`, has no `hreflang` links, is not linked from the others' `hreflang`, and is left out of `sitemap.xml`. Every build reports per language what is untranslated, which strings are missing and the review status. Hebrew was published before review was tracked, so each companion lists it in `indexed_without_review`; remove it from there once a Hebrew reviewer is named. No other language should be added to that list. Every page's structured data carries `inLanguage`.

**The hub's language links.** `tools/build_site.py` fills each card's `%LANGS:slug%` (the links) and `%LANGNAMES:slug%` (the names) from the companion's `langs`, listing only languages whose first page is indexed, so an unreviewed translation is not linked from the hub; a link reads `hub.read` from `tools/i18n/<lang>.json` ("Read in English"), or the language's own name until that is translated.

**UI strings.** Interface text in the parts is written as `%t:key%`: the shell's skip link, nav label, theme button and disclaimers, the previous/next pager, the player's Play/Pause, "In plain words" and "Exam hook", the flashcard, quiz, glossary and sources controls, and the footer's not-medical-advice line. The build fills each key from `<companion>/src/<lang>/strings.json`, then `tools/i18n/<lang>.json` (shared by every companion), and falls back to English (`<companion>/src/strings.json`, `tools/i18n/en.json`) for a key the language lacks, listing it as `missing strings`. `%t:key{n:i+1,total:list.length}%` passes values in: the string says `{n} of {total}` in whatever order the language needs. So a language's chrome can be translated once in `tools/i18n/<lang>.json`, before any module is. Two strings are new with this layer and not yet in Hebrew: `lang.menu`, the label of the menu the switcher becomes once a companion has a third language, and `review.line`, the footer line naming the reviewer. Each is used only from that point, and a Hebrew page that would show one in English is `noindex` until it is added to `tools/i18n/he.json` (`check_lang.py` lists both as falling back to English).

**Adding a language to a companion**

1. Add the language to the table in `site.json` if it is not there, then to the companion's `langs`, with an empty reviewer.
2. Translate `tools/i18n/<lang>.json` (if no companion has the language yet), then `<companion>/src/<lang>/meta.html`, `strings.json`, `pages.json`, `10-shell.html`, `90-foot.html`, and the sections and `js/` files (`js/01-config.js` holds the module and group names; the shared runtime in `tools/core/` needs no translation). A file that is missing falls back to English.
3. Run `python3 tools/check_lang.py <companion> <lang>`. It compares each translated part with its English part: the code and element structure must match exactly, and so must the citations and the numbers, so a translation cannot drop a citation or change a dose. It checks the strings files the same way, and lists text that still looks like English.
4. Run `tools/build_site.py`, then `tools/smoke.py <companion>/<lang>/index.html all`. Until step 5 every page in the language is `noindex`.
5. When the language's named medical reviewer has signed off, fill in `reviewers.<lang>` in `site.json` and rebuild. The finished pages join the sitemap and the `hreflang` sets.

## Hosting

The repository holds sources only: built pages (`index.html`, `app.js`, `sitemap.xml`, `llms.txt`, `robots.txt`, `404.html`) are listed in `.gitignore` and never committed. Build locally to look at your work; CI builds what is deployed.

`.github/workflows/site.yml` runs on every pull request and every push to `main`: it builds the whole site (with the Chrome prerender), runs `tools/check_site.py` and the smoke tests for every companion and language, and only if all pass pushes the built tree to a deploy branch:

| Source | Deploy branch | Served as |
|---|---|---|
| `main` | `site` | production, https://www.medcompanions.org (`site` in `site.json`) |
| pull request N | `preview/pr-N` | a Vercel preview; the workflow comments its URL on the PR, and deletes the branch when the PR closes |

Vercel's production branch is `site`. `vercel.json`'s `ignoreCommand` skips any branch without the `.built` marker the workflow writes, so Vercel never deploys raw sources. A red `site` check means nothing was published. To redeploy production without a change, run the workflow by hand on `main` (Actions → site → Run workflow).

### Old addresses

`tools/build_site.py` writes `redirects/<old repository>/` (not committed). `old` in a companion's site.json entry is optional: a companion that never had another address has none, and gets no redirects. Copying a folder's contents over the old repository's site sends visitors, including any `#module` link, and search engines to the new address. GitHub Pages cannot send a real 301, so each page uses a canonical link and an immediate meta refresh, which Google treats as a permanent move.
