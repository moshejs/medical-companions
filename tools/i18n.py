"""Languages, UI strings and review status, shared by the build tools.

site.json "languages" is the table of every language the site can be built in:
  name     its name in itself, which the language switcher shows ("Deutsch", "日本語")
  english  its name in English, for reports
  dir      ltr or rtl
  locale   the og:locale value (he_IL)
  fonts    display / body: faces that carry the script, placed after the companion's own
           first (Latin) face in --display / --body, so Latin text keeps the companion's
           look and the script falls through to them; the body face also goes first in
           --mono, so labels are not set monospace-wide. google: the Google Fonts css2 family
           query that loads them. subset: the Google Fonts subset the script needs (css2
           serves it as unicode-range slices, so a page downloads only the slices for the
           characters it shows, which is what keeps CJK fonts small).
  css      extra CSS for the language (word-break rules for Japanese and Korean)

A companion lists the languages it is built in ("langs") and, for each, a reviewer:
name, credentials and review date, empty until filled. English is the source language.
Any other language is indexed only once its reviewer is named, unless the companion
lists it in "indexed_without_review" (Hebrew, which was published before review was
tracked).

UI strings: a part may say %t:key% instead of a piece of interface text. The build fills
it from <companion>/src/<lang>/strings.json, then tools/i18n/<lang>.json (shared by every
companion), and falls back to the English files (<companion>/src/strings.json,
tools/i18n/en.json) for a key a language lacks, listing it as missing. %t:key{a:expr,b:expr}%
names parameters: {a} and {b} in the value become ${expr} (only inside a template literal).
In a script a value is placed in the string as written, with the string's own quote
escaped; in HTML it is placed as written (so it may carry tags), with " escaped inside a tag.
"""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "site.json").read_text(encoding="utf-8"))
SITE = CFG["site"].rstrip("/")
LANGS = CFG["languages"]
SOURCE = "en"

def lang(code):
    if code not in LANGS: raise SystemExit(f"language {code!r} is not in site.json languages")
    return LANGS[code]

def lang_dir(code):
    """URL folder of a language under a companion: '' for English, else the code in lower case."""
    return "" if code == SOURCE else code.lower()

def lang_url(slug, code):
    return f"{SITE}/{slug}/" + (f"{lang_dir(code)}/" if code != SOURCE else "")

def companion(slug):
    return next((c for c in CFG["companions"] if c["slug"] == slug), {})

def reviewer(comp, code):
    """The named reviewer of COMP in CODE, or None."""
    r = comp.get("reviewers", {}).get(code) or {}
    return r if r.get("name", "").strip() else None

def review_ok(comp, code):
    """May pages of COMP in CODE be indexed, as far as review goes?"""
    return code == SOURCE or bool(reviewer(comp, code)) or code in comp.get("indexed_without_review", [])

# ------------------------------------------------------------------ strings
def _load(p):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}

def string_files(slug, code):
    """(companion file, shared file) for CODE."""
    src = ROOT / slug / "src"
    return (src / "strings.json" if code == SOURCE else src / code / "strings.json",
            ROOT / "tools" / "i18n" / f"{code}.json")

class Strings:
    def __init__(self, slug, code):
        self.code = code
        own = [_load(p) for p in string_files(slug, code)]
        en = [_load(p) for p in string_files(slug, SOURCE)]
        self.own = {**own[1], **own[0]}      # the companion's file wins over the shared one
        self.en = {**en[1], **en[0]}
        self.used, self.missing = set(), set()

    def get(self, key):
        self.used.add(key)
        if key in self.own: return self.own[key]
        if key not in self.en: raise SystemExit(f"unknown string %t:{key}% (not in the English strings files)")
        self.missing.add(key)
        return self.en[key]

PH = re.compile(r"%t:([a-z][a-z0-9_.-]*)(?:\{([^{}%]*)\})?%")

def _params(spec):
    out = {}
    for p in filter(None, (s.strip() for s in (spec or "").split(","))):
        name, _, expr = p.partition(":")
        if not expr: raise SystemExit(f"string parameter {p!r} must be name:expression")
        out[name.strip()] = expr.strip()
    return out

REGEX_PREV = set("(,=:[!&|?{};+-*%<>~^") | {"return", "typeof", "case", "in", "of", "=>"}

def js_quotes(src, positions):
    """For each position in SRC (a script), the quote of the string literal around it:
    ' or " or ` (template text), or None when it is in code."""
    want, out = sorted(set(positions)), {}
    stack, q, i, n, last, k = [], None, 0, len(src), "", 0   # stack: brace depths of open ${ }
    depth = 0
    while i < n and k < len(want):
        while k < len(want) and want[k] <= i:
            out[want[k]] = q; k += 1
        c = src[i]
        if q:
            if c == "\\": i += 2; continue
            if q == "`" and src.startswith("${", i):
                stack.append(depth); depth = 0; q = None; i += 2; last = "{"; continue
            if c == q: q = None; last = "str"
            i += 1; continue
        if src.startswith("//", i): i = src.find("\n", i); i = n if i < 0 else i; continue
        if src.startswith("/*", i): j = src.find("*/", i + 2); i = n if j < 0 else j + 2; continue
        if c in "'\"`": q = c; i += 1; continue
        if c == "/" and (last in REGEX_PREV or last == ""):
            j, cls = i + 1, False
            while j < n and (src[j] != "/" or cls):
                if src[j] == "\\": j += 1
                elif src[j] == "[": cls = True
                elif src[j] == "]": cls = False
                j += 1
            i = j + 1; last = "re"; continue
        if c == "{": depth += 1
        elif c == "}":
            if depth == 0 and stack: depth = stack.pop(); q = "`"; i += 1; continue
            depth -= 1
        if c.isspace(): i += 1; continue
        m = re.match(r"[A-Za-z_$][\w$]*|=>|\d[\w.]*", src[i:i + 40])
        if m: last = m.group(0); i += m.end(); continue
        last = c; i += 1
    for p in want[k:]: out[p] = q
    return out

def fill(text, kind, strings, where=""):
    """Replace every %t:key% in TEXT (kind 'js' or 'html') from STRINGS."""
    if "%t:" not in text: return text
    ms = list(PH.finditer(text))
    quotes = js_quotes(text, [m.start() for m in ms]) if kind == "js" else {}
    out, last = [], 0
    for m in ms:
        val, params = strings.get(m.group(1)), _params(m.group(2))
        if kind == "js":
            q = quotes.get(m.start())
            if q is None: raise SystemExit(f"{where}: %t:{m.group(1)}% must be inside a string")
            if params and q != "`": raise SystemExit(f"{where}: %t:{m.group(1)}{{…}}% needs a template literal")
            val = val.replace(q, "\\" + q)
            if q == "`": val = val.replace("${", "\\${")
        elif text.rfind("<", 0, m.start()) > text.rfind(">", 0, m.start()):
            val = val.replace('"', "&quot;")
        for name, expr in params.items():
            if "{" + name + "}" not in val: raise SystemExit(f"{where}: the {strings.code} value of {m.group(1)} has no {{{name}}}")
            val = val.replace("{" + name + "}", "${" + expr + "}")
        out += [text[last:m.start()], val]; last = m.end()
    return "".join(out) + text[last:]

# ------------------------------------------------------------------ head
def font_css(code, head):
    """CSS that puts CODE's script faces after the companion's first face in --display and
    --body and first in --mono (read from HEAD's :root), plus the language's own CSS."""
    L, css = lang(code), ""
    decl = []
    for var in ("display", "body"):
        faces = L["fonts"].get(var) or []
        m = re.search(rf"--{var}:([^;]+);", head)
        if not faces or not m: continue
        first, _, rest = m.group(1).partition(",")
        decl.append(f"--{var}:{first}," + ",".join(f'"{f}"' for f in faces) + (f",{rest}" if rest else ""))
    # labels: the script's body face first, so spaces between its words are not monospace-wide
    m = re.search(r"--mono:([^;]+);", head)
    if L["fonts"].get("body") and m: decl.append(f'--mono:"{L["fonts"]["body"][0]}",{m.group(1)}')
    if decl: css += ":root{" + ";".join(decl) + "}\n"
    if L.get("css"): css += L["css"] + "\n"
    return css

def switcher(slug, code, langs, strings):
    """The language switcher for a page of SLUG in CODE: links only, no redirect. Each
    language is labelled with its own name. With two languages it is one link to the
    other; with more, a menu (no script needed) of all of them, the current one marked."""
    def href(to):
        up = "" if code == SOURCE else "../"
        return (up + (lang_dir(to) + "/" if to != SOURCE else "")) or "./"
    def label(to):
        # lang.link, e.g. "{name}, {english} version": what a screen reader says for the link
        name, english = lang(to)["name"], lang(to)["english"]
        # "English, English version" says the name twice: drop the native name when they match
        s = strings.get("lang.link").format(name="" if name == english else name, english=english).lstrip(" ,،、")
        return f' aria-label="{s.replace(chr(34), "&quot;")}"' if s else ""
    others = [l for l in langs if l != code]
    if len(langs) == 2:
        to = others[0]
        return f'<a class="langbtn" id="langBtn" href="{href(to)}" hreflang="{to}" lang="{to}"{label(to)}>{lang(to)["name"]}</a>'
    items = "".join(
        f'<li><span lang="{l}" aria-current="true">{lang(l)["name"]}</span></li>' if l == code else
        f'<li><a href="{href(l)}" hreflang="{l}" lang="{l}"{label(l)}>{lang(l)["name"]}</a></li>' for l in langs)
    label = strings.get("lang.menu").replace('"', "&quot;")
    return (f'<details class="langmenu"><summary class="langbtn" aria-label="{label}">'
            f'{lang(code)["name"]}</summary><ul>{items}</ul></details>')

# The menu opens in place rather than as a floating list: the sidebar scrolls (down on a
# wide screen, sideways as the phone-width top bar), which would clip a floating one. On a
# phone the languages appear in a row inside the bar.
SWITCHER_CSS = (".langmenu summary{list-style:none;cursor:pointer}.langmenu summary::-webkit-details-marker{display:none}"
                ".langmenu ul{margin:6px 0 0;padding:4px;list-style:none;border:1px solid var(--line);border-radius:10px;background:var(--panel)}"
                ".langmenu li a,.langmenu li span{display:block;padding:5px 9px;border-radius:7px;color:var(--ink);text-decoration:none;white-space:nowrap}"
                ".langmenu li a:hover,.langmenu li a:focus-visible{background:var(--line)}.langmenu li span{font-weight:700}"
                "@media (max-width:900px){.langmenu[open]{display:flex;align-items:center;gap:4px}"
                ".langmenu[open] ul{display:flex;margin:0;padding:0;border:0;background:none}}\n")
