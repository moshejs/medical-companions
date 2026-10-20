# Medical Companions

Animated, cited study and patient-education guides, one disease each, on one site.

| Companion | Path | Languages |
|---|---|---|
| [Alzheimer's Companion](alzheimers/README.md) | `/alzheimers/` | English, Hebrew (`/alzheimers/he/`) |
| [FMF Companion](fmf/README.md) (Familial Mediterranean Fever) | `/fmf/` | English |

The hub at `/` links to each one and carries the shared method and disclaimer. Every companion links back to it, and its structured data names the site (`isPartOf`).

> **Not medical advice.** The companions are educational syntheses of the published literature. They cannot diagnose anyone and nothing in them should change a treatment without your own clinician.

## Layout

```
site.json            the site address and the list of companions (names, languages, old addresses)
hub/index.html       the hub page source
tools/               build tools shared by every companion
<companion>/src/     a companion's parts: head and styles, shell, sections, js, sources.json (he/ for Hebrew)
<companion>/index.html, <companion>/<lang>/index.html   built pages (committed, so the repo is the site)
index.html, sitemap.xml, robots.txt                     built from hub/ and site.json
```

Each companion keeps its own look (palette, fonts, icon) and its own `compile_sources.py`, since those are content. Everything that turns parts into a page is shared.

Both companions' git histories were carried over from `moshejs/alzheimers-companion` and `moshejs/fmf-companion`. Each arrived in a commit titled "Bring in …", whose second parent is the old repository's history (`git log <that commit>^2`); those older commits use the old paths, without the `alzheimers/` or `fmf/` prefix.

## Building

```bash
python3 tools/build_site.py                         # every companion and language, the hub, sitemap.xml, robots.txt, redirects/
python3 tools/build.py fmf                          # one companion (add --lang he for a translation)
python3 tools/smoke.py fmf/index.html all           # headless-Chrome check of every module
python3 tools/check_he.py alzheimers                # Hebrew parts must match the English in code, citations and numbers
python3 tools/make_artifact.py alzheimers --lang he # the Claude artifact copy of a page
```

`%SITE%` in any part is replaced with `site` from `site.json`, so moving the site to its own domain is a one-line change there and a rebuild.

### Adding a companion

1. Put its parts in `<slug>/src/`, using `%SITE%/<slug>/` for its own address in the metadata.
2. Add it to `site.json` and give it a card in `hub/index.html` (`%CITED:<slug>%` fills in its cited-source count).
3. Link the others from its footer, run `tools/build_site.py`, then `tools/smoke.py <slug>/index.html all`.

## Hosting

The repo root is the site: GitHub Pages serves it as is (`.nojekyll` is set), and `vercel.json` is ready for Vercel with no build step.

### Old addresses

`tools/build_site.py` writes `redirects/<old repository>/` (not committed). Copying a folder's contents over the old repository's site sends visitors, including any `#module` link, and search engines to the new address. GitHub Pages cannot send a real 301, so each page uses a canonical link and an immediate meta refresh, which Google treats as a permanent move.
