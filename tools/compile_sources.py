#!/usr/bin/env python3
"""Merge a companion's research passes into <slug>/src/sources.json.

    python3 tools/compile_sources.py <slug> [<slug> ...]
    python3 tools/compile_sources.py --all
    python3 tools/compile_sources.py --check --all     (writes nothing; exit 1 if a sources.json is stale)

Inputs, all inside the companion's folder:
  research/<LETTER>-*.md        one research pass per area. Only the letters listed in
                                src/sources.config.json "areas" are read, so U-*.md update
                                notes, RESEARCH-FORMAT.md and BUILDER-BRIEF.md are not.
  src/sources.config.json       per-companion data (see below)
  src/source-corrections.json   optional; validated fixes applied after the merge, so they
                                survive a regeneration. Keys starting with "_" are comments.

Each pass lists its sources under "## Sources" as "- [Key] text" or "- **[Key]** text".
  Same key + same work across passes = one source, with every area that cites it.
  Same key + a different work = the later one is renamed Key + area letter (reported).
  Different keys + the same work = merged; the longer text is kept, the other key becomes
  an alias. "aliases" in the config merges works the identifiers cannot show are one.

sources.config.json (keys starting with "_" are comments):
  "areas"          {"A": "Epidemiology ...", ...}  required; the research areas. The letters
                   pick the pass files; the names document what each pass covered.
  "aliases"        {"DropKey": "KeepKey", ...}     optional; works the identifiers cannot show
                   are one (a label cited under two keys), merged before the automatic merge.
  The rest exist so the first companions, compiled before the shared rules settled, still
  reproduce their sources.json byte for byte. A new companion leaves them out.
  "validated_tag"  default true: each source line ends "(validated: <service>)"; the tag is
                   moved into a "validated" field and a line without it is marked unverified.
                   false: only the word "unverified" in the text marks a line unverified, and
                   any tag stays in the text.
  "match"          default "current": PMID, then DOI, then drug-label set ID, then trial IDs,
                   then title; a paper and a page about it are never one work.
                   "legacy": PMID, then DOI, then title; a trial ID only when there is no
                   PMID or DOI, and no set IDs. "legacy-gout": as legacy, but a trial ID is
                   always kept and two different trial IDs always mean two works.
  "url"            default "simple": a link stops at the first ")". "balanced" keeps brackets
                   that belong to the URL (a search link such as ?term=a+AND+(b+OR+c)).
  "doi_link"       default "normalized": the doi.org link uses the DOI as matched (lower
                   case, brackets kept when balanced). "raw" keeps the DOI's case but stops
                   at the first ")", which truncates Lancet and Elsevier DOIs (gout only).
A companion whose research passes are not in the repository (FMF, Alzheimer's) is skipped,
never emptied: its committed sources.json is the record.
"""
import argparse, functools, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
LINE = re.compile(r"^\s*[-*]\s*(?:\*\*)?\[([A-Za-z0-9_\-]+)\](?:\*\*)?\s*[:\-–]?\s*(.+)$")
VALIDATED = re.compile(r"\s*\(validated:\s*([^)]+)\)")
PMID = re.compile(r"PMID[:\s]*(\d+)")
SET_ID = re.compile(r"set[ _-]?id\s*([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})", re.I)
DEFAULTS = {"aliases": {}, "validated_tag": True, "match": "current", "url": "simple", "doi_link": "normalized"}
OPTIONS = {"validated_tag": (True, False), "match": ("current", "legacy", "legacy-gout"),
           "url": ("simple", "balanced"), "doi_link": ("normalized", "raw")}

def _trim_unopened(s, strip=""):
    """Drop a trailing ')' that has no '(' to close it (and the punctuation before it)."""
    while s.endswith(")") and s.count("(") < s.count(")"): s = s[:-1].rstrip(strip)
    return s

def doi_of(text):
    """A DOI may legitimately contain brackets, as Lancet and Elsevier ones do
    (10.1016/S1474-4422(24)00038-3). Stopping at the first ')' truncates those to a
    prefix that every paper from the same journal and year shares, which then looks
    like a matching identifier. Take the whole run and trim only what cannot belong:
    trailing punctuation, and a ')' with no '(' to close."""
    m = re.search(r"(10\.\d{4,}/[^\s;,]+)", text, re.I)
    if not m: return None
    return _trim_unopened(m.group(1).rstrip(".")).lower().rstrip(".")

def url_of(text, mode):
    if mode == "balanced":
        m = re.search(r"https?://[^\s]+", text)
        return _trim_unopened(m.group(0).rstrip(".,;"), ".,;") if m else None
    m = re.search(r"https?://[^\s)]+", text)
    return m.group(0).rstrip(".") if m else None

def link_of(text, cfg):
    url = url_of(text, cfg["url"])
    if url: return url
    if cfg["doi_link"] == "raw":
        m = re.search(r"(10\.\d{4,}/[^\s;,)]+)", text)
        doi = m.group(1).rstrip(".") if m else None
    else:
        doi = doi_of(text)
    if doi: return f"https://doi.org/{doi}"
    pmid = PMID.search(text)
    return f"https://pubmed.ncbi.nlm.nih.gov/{pmid.group(1)}/" if pmid else ""

@functools.lru_cache(maxsize=None)  # the merge compares every pair of entries, so each text is asked many times
def ids(text, match):
    out = set()
    m = PMID.search(text)
    if m: out.add("pmid" + m.group(1))
    d = doi_of(text)
    if d: out.add("doi" + d)
    if match == "current":
        # a US drug label has no PMID or DOI; its DailyMed set ID identifies it across label versions
        m = SET_ID.search(text)
        if m: out.add("set" + m.group(1).lower())
        ncts = re.findall(r"\b(NCT\d{8})\b", text)
        if ncts and not out: out.update(ncts)
    else:
        m = re.search(r"\b(NCT\d{8})\b", text)
        if m and (match == "legacy-gout" or not out): out.add(m.group(1))
    parts = re.split(r"\.\s+", text)
    if len(parts) > 1: out.add("t" + re.sub(r"\W+", "", parts[1].lower())[:50])
    return frozenset(out)

def same(a, b, match):
    """Let the strongest identifier both entries carry decide. A PMID is unique to a
    paper, so when both have one it settles the question either way; only fall back to
    the DOI, and then to the title, when that is all there is."""
    if a == b: return True
    ia, ib = ids(a, match), ids(b, match)
    pick = lambda s, p: {x for x in s if x.startswith(p)}
    na, nb = pick(ia, "NCT"), pick(ib, "NCT")
    if match == "legacy-gout" and na and nb and not (na & nb): return False  # two registrations are two trials
    pa, pb = pick(ia, "pmid"), pick(ib, "pmid")
    if pa and pb: return bool(pa & pb)
    da, db = pick(ia, "doi"), pick(ib, "doi")
    if da and db: return bool(da & db)
    # both identified, but one by PMID only and the other by DOI only: no way to tell, so not one work
    if (pa or da) and (pb or db): return False
    if match == "current":
        # a paper and a page about it (a slide deck, a press release) can share a title: never one work
        if bool(pa or da) != bool(pb or db): return False
        sa, sb = pick(ia, "set"), pick(ib, "set")
        if sa and sb: return bool(sa & sb)
        if na and nb: return na == nb  # a registry note listing many trials is not each of them
    ta = [x for x in ia if x.startswith("t") and len(x) > 35]; tb = [x for x in ib if x.startswith("t") and len(x) > 35]
    return bool(ta and tb and ta[0] == tb[0])

def load_config(slug):
    path = ROOT / slug / "src" / "sources.config.json"
    cfg = dict(DEFAULTS, **json.loads(path.read_text(encoding="utf-8")))
    unknown = [k for k in cfg if k not in DEFAULTS and k != "areas" and not k.startswith("_")]
    if unknown: sys.exit(f"{path}: unknown setting(s) {unknown}")
    for k, allowed in OPTIONS.items():
        if cfg[k] not in allowed: sys.exit(f"{path}: {k} must be one of {allowed}, not {cfg[k]!r}")
    if not cfg.get("areas"): sys.exit(f"{path}: \"areas\" is required")
    return cfg

def compile_sources(slug, log=print):
    """Return (sources list, pass files read). Reports renames, merges and corrections via log."""
    cfg = load_config(slug)
    match, letters = cfg["match"], set(cfg["areas"])
    rd = ROOT / slug / "research"
    files = sorted(f for f in rd.glob("?-*.md") if f.name[0] in letters) if rd.is_dir() else []
    if not files: return [], files
    srcs, renames = {}, []
    for f in files:
        area = f.name[0]
        body = f.read_text(encoding="utf-8")
        if "## Sources" not in body: continue
        for ln in body.split("## Sources", 1)[1].splitlines():
            m = LINE.match(ln)
            if not m: continue
            key, text = m.group(1), re.sub(r"\*\*|\*", "", m.group(2)).strip()
            link = link_of(text, cfg)
            val = VALIDATED.search(text) if cfg["validated_tag"] else None
            if val: text = (text[:val.start()] + text[val.end():]).strip()
            rec = {"key": key, "text": text, "link": link, "areas": [area],
                   "unverified": "unverified" in text.lower() or (cfg["validated_tag"] and not val)}
            if val: rec["validated"] = val.group(1).strip()
            if key in srcs:
                if same(srcs[key]["text"], text, match):
                    if area not in srcs[key]["areas"]: srcs[key]["areas"].append(area)
                    continue
                nk = key + area
                renames.append((key, area, nk))
                rec["key"] = nk; key = nk
            srcs[key] = rec

    def absorb(keep, drop):
        for ar in srcs[drop]["areas"]:
            if ar not in srcs[keep]["areas"]: srcs[keep]["areas"].append(ar)

    # merge different keys that point at the same work: named in the config first, then by identifier
    alias = {}
    for drop, keep in cfg["aliases"].items():
        if drop in srcs and keep in srcs:
            absorb(keep, drop)
            srcs[keep].setdefault("aliases", []).append(drop); alias[drop] = keep; del srcs[drop]
    keys = list(srcs)
    for i, a in enumerate(keys):
        if a not in srcs: continue
        for b in keys[i+1:]:
            if b not in srcs or a == b: continue
            if same(srcs[a]["text"], srcs[b]["text"], match):
                keep, drop = (a, b) if len(srcs[a]["text"]) >= len(srcs[b]["text"]) else (b, a)
                absorb(keep, drop)
                srcs[keep].setdefault("aliases", []).extend([drop] + srcs[drop].get("aliases", []))
                alias[drop] = keep
                del srcs[drop]
                if drop == a: break
    for k, v in alias.items(): log(f"MERGED {k} -> {v}")

    # apply validated corrections (survives regeneration; see source-corrections.json)
    corr_path = ROOT / slug / "src" / "source-corrections.json"
    if corr_path.exists():
        applied, unknown = 0, []
        for key, fields in json.loads(corr_path.read_text(encoding="utf-8")).items():
            if key.startswith("_"): continue
            target = key if key in srcs else next((k for k, v in srcs.items() if key in v.get("aliases", [])), None)
            if target is None:
                unknown.append(key); continue
            rec = srcs[target]
            for f, v in fields.items():
                if f == "verified":
                    if v: rec["unverified"] = False
                else:
                    rec[f] = v
            applied += 1
        log(f"applied {applied} source corrections")
        for k in unknown: log(f"CORRECTION for unknown key: {k}")
    for k, a, nk in renames: log(f"RENAMED: {k} in area {a} -> {nk}")
    return sorted(srcs.values(), key=lambda s: s["key"].lower()), files

def render(lst):
    return json.dumps(lst, ensure_ascii=False, indent=1)

def companions():
    return sorted(p.parent.parent.name for p in ROOT.glob("*/src/sources.config.json"))

def run(slug, check=False, quiet=False):
    """Compile one companion. Returns 'ok' (unchanged), 'written', 'skipped' (no passes)
    or 'stale' (check mode: it would change). The file is written only when it changes."""
    log = (lambda *a: None) if quiet or check else print
    out = ROOT / slug / "src" / "sources.json"
    lst, files = compile_sources(slug, log)
    if not files:
        if not quiet: print(f"{slug}: no research passes in {slug}/research, so {out.relative_to(ROOT)} is left as committed")
        return "skipped"
    text = render(lst)
    current = out.read_text(encoding="utf-8") if out.exists() else None
    if check:
        if current != text:
            print(f"{slug}: {out.relative_to(ROOT)} is out of date; run python3 tools/compile_sources.py {slug}")
            return "stale"
        if not quiet: print(f"{slug}: {len(lst)} sources, up to date")
        return "ok"
    if current != text: out.write_text(text, encoding="utf-8")
    log(f"{len(lst)} sources -> {out.relative_to(ROOT)}" + ("" if current != text else " (unchanged)"))
    return "written" if current != text else "ok"

def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("slugs", nargs="*", help="companion folder names, e.g. gout")
    ap.add_argument("--all", action="store_true", help="every companion with src/sources.config.json")
    ap.add_argument("--check", action="store_true", help="write nothing; exit 1 if any sources.json differs")
    args = ap.parse_args()
    slugs = companions() if args.all else args.slugs
    if not slugs: ap.error("name a companion, or pass --all")
    for s in slugs:
        if not (ROOT / s / "src" / "sources.config.json").exists():
            ap.error(f"{s}/src/sources.config.json not found")
    results = {}
    for s in slugs:
        if len(slugs) > 1 and not args.check: print(f"== {s}")
        results[s] = run(s, check=args.check)
    if not args.all and "skipped" in results.values(): sys.exit(1)
    if "stale" in results.values(): sys.exit(1)

if __name__ == "__main__":
    main()
