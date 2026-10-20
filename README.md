# Medical Companions

Animated, cited study and patient-education guides, one disease each, on one site.

| Companion | Path | Languages |
|---|---|---|
| [Alzheimer's Companion](alzheimers/README.md) | `/alzheimers/` | English, Hebrew (`/alzheimers/he/`) |
| [FMF Companion](fmf/README.md) (Familial Mediterranean Fever) | `/fmf/` | English, Hebrew (`/fmf/he/`) |

The hub at `/` links to each one and carries the shared method and disclaimer. Every companion links back to it, and its structured data names the site (`isPartOf`).

> **Not medical advice.** The companions are educational syntheses of the published literature. They cannot diagnose anyone and nothing in them should change a treatment without your own clinician.

## Layout

```
site.json            the site address and the list of companions (names, languages, old addresses)
hub/index.html       the hub page source (hub/share-card.html renders its share image, hub/404.html the not-found page)
tools/               build tools shared by every companion
<companion>/src/     a companion's parts: head and styles, shell, sections, js, sources.json, pages.json (he/ for Hebrew)
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
python3 tools/check_he.py alzheimers                # Hebrew parts must match the English in code, citations and numbers
python3 tools/make_artifact.py alzheimers --lang he # the Claude artifact copy of a page
```

`%SITE%` in any part is replaced with `site` from `site.json`, so moving the site to its own domain is a one-line change there and a rebuild.

## Search

What the build takes care of, so a change doesn't undo it:

- Every module is its own page, `<companion>/<module>/` (and `<companion>/he/<module>/`), so a topic such as lecanemab, APOE4, colchicine dosing or AA amyloidosis can rank on its own. Each page carries only its own module's section (no hidden copies of the others, so the pages are not near-duplicates), its heading as the `h1`, and a breadcrumb in its structured data. All of a companion's pages share one cached script, `app.js`, versioned by its hash. Until that script shows the section it keeps its place but is invisible (a style the build adds): its step buttons and phone-width drawings are filled in by the script, and the footer would otherwise start on screen, so showing it earlier would push the page around as it loads. A `<noscript>` style shows it to readers without JavaScript. The companion's address itself is the home module and keeps the FAQ.
- Module titles and descriptions live in `src/pages.json` (and `src/he/pages.json`), keyed by module id. A module missing there gets its nav title and the first sentences of its lede; the build warns when a description runs past 160 characters.
- The nav, the crawler outline in `<noscript>` and in-page `#module` links are real links to the module pages. Old `#module` addresses still work: the router sends `/alzheimers/#antibody` to `/alzheimers/antibody/`, and so do the redirects from the old repositories.
- Each page has its own canonical URL, title, description (kept under about 160 characters so Google shows it whole; the longer Open Graph description is for link previews), share image and `MedicalWebPage` structured data. The build adds `datePublished` (`site.json`), `dateModified` (the last commit to the companion's `src/`) and the publisher.
- Each companion's English and Hebrew pages point at each other with `hreflang`, module by module, in the page and in `sitemap.xml`. A new translation needs the same: add its language in `site.json` and the `hreflang` links in the head. A translated page that still falls back to an English part (shell, footer, core script, its section or its module script) is built `noindex`, without `hreflang`, and is left out of the sitemap until it is finished. The build lists those parts as `untranslated (he)`.
- On a companion's first page the `h1` names the disease, which is what people search for; the companion's name sits above it. On a module page the `h1` is the module's heading.
- Google Fonts load without blocking the first paint.
- `sitemap.xml` lists every page that may be indexed, dated by the last commit to its companion's `src/`, and `404.html` lists every guide.
- After a deploy goes live, `python3 tools/indexnow.py` tells Bing and the other IndexNow engines about every page in the sitemap. Google reads `sitemap.xml` through Search Console.

`tools/make_artifact.py` builds the Claude artifact from the one-page build (`build.py --single`), where every module is in one file and switched by `#hash`.

### Adding a companion

1. Put its parts in `<slug>/src/`, using `%SITE%/<slug>/` for its own address in the metadata.
2. Add it to `site.json` and give it a card in `hub/index.html` (`%CITED:<slug>%` fills in its cited-source count).
3. Link the others from its footer, run `tools/build_site.py`, then `tools/smoke.py <slug>/index.html all`.

## Hosting

The repo root is the site: GitHub Pages serves it as is (`.nojekyll` is set), and `vercel.json` is ready for Vercel with no build step.

### Old addresses

`tools/build_site.py` writes `redirects/<old repository>/` (not committed). Copying a folder's contents over the old repository's site sends visitors, including any `#module` link, and search engines to the new address. GitHub Pages cannot send a real 301, so each page uses a canonical link and an immediate meta refresh, which Google treats as a permanent move.
