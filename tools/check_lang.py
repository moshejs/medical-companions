#!/usr/bin/env python3
"""Check that each translated part in src/<lang>/ is a faithful translation of its English part.

    python3 tools/check_lang.py alzheimers he                 # every translated file
    python3 tools/check_lang.py alzheimers he js/14-tau.js    # one or more files, by English path

For each pair it compares:
  code     JS with every string's text removed (template ${...} code is kept), so the
           logic must be identical; HTML tags with their ids, classes, data-*, roles,
           input attributes and hrefs, so the structure must be identical
  cites    the multiset of [[citation keys]]
  strings  the multiset of %t:key% UI strings (inside string text, so code does not see them)
  numbers  the multiset of numbers in the text (digits must stay digits)
and lists strings that still look like untranslated English (warnings only: trial
names, drug brands and abbreviations may rightly stay in Latin letters).

It checks the language's UI strings the same way (<companion>/src/<lang>/strings.json and
tools/i18n/<lang>.json against the English files): every key must exist in English, use
no {parameter} the English lacks (the build stops if a script needs one the value
leaves out), and keep the same tags and numbers; keys the language lacks are listed, since the
build falls back to English for them.
Exit status is 1 if any code, cite, number or string check fails.
"""
import json, re, sys, pathlib
from collections import Counter
import i18n

ROOT = i18n.ROOT
_pos = [a for a in sys.argv[1:] if not a.startswith("-")]
if len(_pos) < 2 or _pos[1] not in i18n.LANGS or _pos[1] == i18n.SOURCE or not (ROOT / _pos[0] / "src").is_dir():
    sys.exit("usage: check_lang.py COMPANION LANG [file ...]   (LANG: a language in site.json other than en)")
SLUG, LANG = _pos[0], _pos[1]
SRC = ROOT / SLUG / "src"
TR = SRC / LANG
SKIP = {"meta.html", "rtl.css", "strings.json", "pages.json"}

# ---------------------------------------------------------------- JS lexing
REGEX_PREV = set("(,=:[!&|?{};+-*%<>~^") | {"return", "typeof", "case", "in", "of", "=>"}

def js_split(src):
    """Return (skeleton, strings): skeleton is the code with string text replaced by
    a placeholder; strings is the list of string texts (template literal text runs)."""
    out, strs, i, n = [], [], 0, len(src)
    last = ""  # last significant token, to tell a regex from a division

    def template(i):
        # src[i] == '`'; returns index after closing backtick
        buf = ""
        out.append("`")
        i += 1
        while i < n:
            c = src[i]
            if c == "\\":
                buf += src[i:i+2]; i += 2; continue
            if c == "`":
                strs.append(buf); out.append("S`"); return i + 1
            if c == "$" and i + 1 < n and src[i+1] == "{":
                strs.append(buf); buf = ""
                out.append("S${")
                i = code(i + 2, "}")
                out.append("}")
                continue
            buf += c; i += 1
        raise ValueError("unterminated template")

    def code(i, stop=None):
        nonlocal last
        depth = 0
        while i < n:
            c = src[i]
            if stop and c == stop and depth == 0:
                return i + 1
            if c in "{(": depth += 1
            elif c in "})": depth -= 1
            if c.isspace():
                i += 1; continue
            if src.startswith("//", i):
                j = src.find("\n", i); i = n if j < 0 else j; continue
            if src.startswith("/*", i):
                j = src.find("*/", i + 2); i = n if j < 0 else j + 2; continue
            if c in "'\"":
                j, buf = i + 1, ""
                while j < n and src[j] != c:
                    if src[j] == "\\": buf += src[j:j+2]; j += 2; continue
                    buf += src[j]; j += 1
                strs.append(buf); out.append(c + "S" + c); last = "str"; i = j + 1; continue
            if c == "`":
                i = template(i); last = "str"; continue
            if c == "/" and (last in REGEX_PREV or last == ""):
                j, cls = i + 1, False
                while j < n:
                    if src[j] == "\\": j += 2; continue
                    if src[j] == "[": cls = True
                    elif src[j] == "]": cls = False
                    elif src[j] == "/" and not cls: break
                    j += 1
                j += 1
                while j < n and src[j].isalpha(): j += 1
                out.append(src[i:j]); last = "re"; i = j; continue
            m = re.match(r"[A-Za-z_$][\w$]*|\d[\d.eExXa-fA-F_]*|=>|===|!==|==|!=|<=|>=|&&|\|\||\?\?|\?\.|\.\.\.|.", src[i:], re.S)
            tok = m.group(0); out.append(tok); last = tok; i += len(tok)
        return i

    code(0)
    return " ".join(out), strs

# ---------------------------------------------------------------- HTML
KEEP_ATTR = re.compile(r'\s(id|class|data-[\w-]+|role|type|min|max|step|value|href|for|tabindex|hidden|aria-pressed|aria-live|name)=("[^"]*"|\'[^\']*\')')

def html_split(src):
    """Structure = tags with structural attributes, plus <script>/<style> code skeletons.
    Text = visible text and the text-bearing attributes."""
    struct, strs = [], []
    for m in re.finditer(r"<(script|style)\b[^>]*>(.*?)</\1>|<(/?[a-zA-Z][\w-]*)([^>]*)>|([^<]+)", src, re.S):
        if m.group(1):
            if m.group(1) == "script":
                sk, ss = js_split(m.group(2)); struct.append("<script>" + sk); strs += ss
            else:
                struct.append("<style>" + re.sub(r"\s+", " ", m.group(2)).strip())
        elif m.group(3):
            attrs = m.group(4)
            kept = KEEP_ATTR.findall(attrs)
            # a link to another page of the site may go to that page in this language
            kept = [(a, re.sub(r'^"(%SITE%/[\w/-]*?)' + re.escape(i18n.lang_dir(LANG)) + r'/"$', r'"\1"', v) if a == "href" else v) for a, v in kept]
            struct.append("<" + m.group(3) + "".join(sorted(f" {a}={v}" for a, v in kept)) + ">")
            strs += [v for _, v in re.findall(r'\s(aria-label|title|placeholder|alt|content)="([^"]*)"', attrs)]
        elif m.group(5) and m.group(5).strip():
            strs.append(m.group(5))
    return "\n".join(struct), strs

# ---------------------------------------------------------------- checks
# same key pattern as build.py, so code like [['all','All']] is not a citation
CITE = re.compile(r"\[\[(\s*(?=[A-Za-z0-9_\-]*[A-Za-z])[A-Za-z0-9][A-Za-z0-9_\-]*(?:\s*,\s*(?=[A-Za-z0-9_\-]*[A-Za-z])[A-Za-z0-9][A-Za-z0-9_\-]*)*\s*)\]\]")
NUM = re.compile(r"(?<![\w#.])\d+(?:[.,]\d+)*")
# letters of the language's own script; a Latin-script language is told from English by
# common English words instead
SCRIPTS = {"he": "\u0590-\u05ff", "ar": "\u0600-\u06ff\u0750-\u077f", "ja": "\u3040-\u30ff\u4e00-\u9fff",
           "ko": "\uac00-\ud7af\u1100-\u11ff", "zh-Hans": "\u4e00-\u9fff"}
OWN = re.compile(f"[{SCRIPTS[LANG]}]") if LANG in SCRIPTS else None
EN_WORDS = re.compile(r"\b(the|and|with|which|that|from|are|is|of|to|for|in|it|this|not|be|or)\b")
ENGW = re.compile(r"\b[a-z]{3,}\b")

def cites(txt):
    return Counter(k.strip() for m in CITE.finditer(txt) for k in m.group(1).split(","))

def nums(strs):
    return Counter(n.replace(",", "") for s in strs for n in NUM.findall(CITE.sub("", s)))

def english_like(t):
    if re.search(r"[{};]|var\(--|class=|https?:", t) or len(ENGW.findall(t)) < 3: return False
    return not OWN.search(t) if OWN else len(EN_WORDS.findall(t)) >= 3

def check(rel):
    en_p, he_p = SRC / rel, TR / rel
    en, he = en_p.read_text(encoding="utf-8"), he_p.read_text(encoding="utf-8")
    # the crawler outline is generated per language, not translated line by line
    ns = re.compile(r'<noscript id="nsOutline">.*?</noscript>', re.S)
    en, he = ns.sub("", en), ns.sub("", he)
    split = js_split if rel.endswith(".js") else html_split
    try:
        (es, estr), (hs, hstr) = split(en), split(he)
    except Exception as e:
        return [f"  parse error: {e}"], []
    errs, warns = [], []
    if es != hs:
        a, b = es.split(), hs.split()
        k = next((i for i, (x, y) in enumerate(zip(a, b)) if x != y), min(len(a), len(b)))
        errs.append(f"  code differs at token {k}:\n    en: {' '.join(a[max(0,k-12):k+12])}\n    he: {' '.join(b[max(0,k-12):k+12])}")
    pe, ph = Counter(i18n.PH.findall(en)), Counter(i18n.PH.findall(he))
    if pe != ph:
        errs.append(f"  UI strings differ: missing {[k for k, _ in pe - ph]} extra {[k for k, _ in ph - pe]}")
    ce, ch = cites(en), cites(he)
    if ce != ch:
        errs.append(f"  citations differ: missing {dict(ce-ch)} extra {dict(ch-ce)}")
    ne, nh = nums(estr), nums(hstr)
    if ne != nh:
        errs.append(f"  numbers differ: missing {dict(ne-nh)} extra {dict(nh-ne)}")
    for s in hstr:
        t = re.sub(r"<[^>]*>", " ", i18n.PH.sub("", CITE.sub("", s)))  # tag names are not English text
        if english_like(t):
            warns.append("  english? " + t.strip()[:110])
    return errs, warns

PARAM = re.compile(r"\{([a-z_]+)\}")
TAG = re.compile(r"</?[a-zA-Z][^>]*>")

def check_strings():
    """The language's UI strings against the English ones. Returns the number of failures."""
    bad = 0
    for en_p, tr_p in zip(i18n.string_files(SLUG, i18n.SOURCE), i18n.string_files(SLUG, LANG)):
        if not tr_p.exists():
            print(f"-- {tr_p.relative_to(ROOT)}: not translated yet"); continue
        en, tr = (json.loads(p.read_text(encoding="utf-8")) if p.exists() else {} for p in (en_p, tr_p))
        errs = []
        for k, v in tr.items():
            if k not in en: errs.append(f"  {k}: not an English key"); continue
            extra = set(PARAM.findall(v)) - set(PARAM.findall(en[k]))
            if extra: errs.append(f"  {k}: parameters the English does not have: {sorted(extra)}")
            if [re.sub(r"\s(aria-label|title)=\"[^\"]*\"", "", x) for x in TAG.findall(v)] != \
               [re.sub(r"\s(aria-label|title)=\"[^\"]*\"", "", x) for x in TAG.findall(en[k])]:
                errs.append(f"  {k}: tags differ")
            if nums([v]) != nums([en[k]]): errs.append(f"  {k}: numbers differ: en {en[k]!r} {LANG} {v!r}")
        missing = sorted(set(en) - set(tr))
        print(("FAIL " if errs else "ok   ") + str(tr_p.relative_to(ROOT))
              + (f"  ({len(missing)} keys fall back to English: {', '.join(missing)})" if missing else ""))
        for e in errs: print(e)
        bad += bool(errs)
    return bad

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")][2:]
    if not TR.is_dir() and not args:
        print(f"-- {SLUG}/src/{LANG}/: nothing translated yet")
    rels = args or sorted(str(p.relative_to(TR)) for p in TR.rglob("*") if p.is_file() and p.name not in SKIP)
    bad = 0 if args else check_strings()
    for rel in rels:
        if not (TR / rel).exists():
            print(f"-- {rel}: not translated yet"); continue
        errs, warns = check(rel)
        print(("FAIL " if errs else "ok   ") + rel + (f"  ({len(warns)} english-looking strings)" if warns else ""))
        for e in errs: print(e)
        if "-v" in sys.argv or args:
            for w in warns[:40]: print(w)
        bad += bool(errs)
    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
