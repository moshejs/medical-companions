#!/usr/bin/env python3
"""Merge the research files' Sources sections into src/sources.json.

Usage: compile_sources.py RESEARCH_DIR
Each research file lists sources as "- [Key] text" or "- **[Key]** text".
Same key + same identifier (PMID/DOI) across files = one source.
Same key + different work = later one renamed Key + area letter (reported).
"""
import json, re, sys, pathlib

AREAS = {"A": "Epidemiology, stages & history", "B": "Pathology", "C": "Genetics",
         "D": "Diagnosis & biomarkers", "E": "Symptomatic drugs & BPSD", "F": "Anti-amyloid antibodies",
         "G": "Prevention, living & caregiving", "H": "Nursing care", "I": "Research & cure"}
rd = pathlib.Path(sys.argv[1])
out = pathlib.Path(__file__).resolve().parent / "sources.json"
line_re = re.compile(r"^\s*[-*]\s*(?:\*\*)?\[([A-Za-z0-9_\-]+)\](?:\*\*)?\s*[:\-–]?\s*(.+)$")

DOI_RE = re.compile(r"(10\.\d{4,}/[^\s;,]+)", re.I)
def clean_doi(d):
    d = d.lower().rstrip(".")
    # keep parentheses that belong to the DOI (Lancet DOIs contain them); drop an unbalanced trailing ")"
    while d.endswith(")") and d.count(")") > d.count("("): d = d[:-1]
    return d.rstrip(".")
def ids(text):
    out = set()
    m = re.search(r"PMID[:\s]*(\d+)", text)
    if m: out.add("pmid" + m.group(1))
    m = DOI_RE.search(text)
    if m: out.add("doi" + clean_doi(m.group(1)))
    m = re.search(r"\b(NCT\d{8})\b", text)
    if m and not out: out.add(m.group(1))
    parts = re.split(r"\.\s+", text)
    if len(parts) > 1: out.add("t" + re.sub(r"\W+", "", parts[1].lower())[:50])
    return out
def same(a, b):
    ia, ib = ids(a), ids(b)
    pa = {x for x in ia if x.startswith("pmid")}; pb = {x for x in ib if x.startswith("pmid")}
    if pa and pb: return bool(pa & pb)            # PMIDs are authoritative when both have one
    da = {x for x in ia if x.startswith("doi")}; db = {x for x in ib if x.startswith("doi")}
    if da and db: return bool(da & db)
    if (pa or da) and (pb or db): return False     # both identified, by different schemes: do not guess
    ta = [x for x in ia if x.startswith("t") and len(x) > 35]; tb = [x for x in ib if x.startswith("t") and len(x) > 35]
    return bool(ta and tb and ta[0] == tb[0])
def ident(text): return ids(text)

def clean(t):
    t = re.sub(r"\*\*|\*", "", t).strip()
    return t

srcs, renames = {}, []
for f in sorted(rd.glob("[A-I]-*.md")):
    area = f.name[0]
    body = f.read_text(encoding="utf-8")
    if "## Sources" not in body: continue
    sec = body.split("## Sources", 1)[1]
    for ln in sec.splitlines():
        m = line_re.match(ln)
        if not m: continue
        key, text = m.group(1), clean(m.group(2))
        url = re.search(r"https?://[^\s)]+", text)
        doi = DOI_RE.search(text)
        pmid = re.search(r"PMID[:\s]*(\d+)", text)
        link = url.group(0).rstrip(".") if url else (f"https://doi.org/{clean_doi(doi.group(1))}" if doi else (f"https://pubmed.ncbi.nlm.nih.gov/{pmid.group(1)}/" if pmid else ""))
        rec = {"key": key, "text": text, "link": link, "areas": [area], "unverified": "unverified" in text.lower()}
        if key in srcs:
            if same(srcs[key]["text"], text):
                if area not in srcs[key]["areas"]: srcs[key]["areas"].append(area)
                continue
            nk = key + area
            renames.append((key, area, nk))
            rec["key"] = nk; key = nk
        srcs[key] = rec

# merge different keys that point at the same work
MANUAL = {}
alias = {}
for drop, keep in MANUAL.items():
    if drop in srcs and keep in srcs:
        for ar in srcs[drop]["areas"]:
            if ar not in srcs[keep]["areas"]: srcs[keep]["areas"].append(ar)
        srcs[keep].setdefault("aliases", []).append(drop); alias[drop] = keep; del srcs[drop]
keys = list(srcs)
for i, a in enumerate(keys):
    if a not in srcs: continue
    for b in keys[i+1:]:
        if b not in srcs or a == b: continue
        if same(srcs[a]["text"], srcs[b]["text"]):
            keep, drop = (a, b) if len(srcs[a]["text"]) >= len(srcs[b]["text"]) else (b, a)
            for ar in srcs[drop]["areas"]:
                if ar not in srcs[keep]["areas"]: srcs[keep]["areas"].append(ar)
            srcs[keep].setdefault("aliases", []).extend([drop] + srcs[drop].get("aliases", []))
            alias[drop] = keep
            del srcs[drop]
            if drop == a: break
for k, v in alias.items(): print(f"MERGED {k} -> {v}")

# apply validated corrections (survives regeneration; see source-corrections.json)
corr_path = pathlib.Path(__file__).resolve().parent / "source-corrections.json"
applied, unknown = 0, []
if corr_path.exists():
    corr = json.loads(corr_path.read_text(encoding="utf-8"))
    for key, fields in corr.items():
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
    print(f"applied {applied} source corrections")
    for k in unknown: print(f"CORRECTION for unknown key: {k}")

def sortkey(s):
    return s["key"].lower()
lst = sorted(srcs.values(), key=sortkey)
out.write_text(json.dumps(lst, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{len(lst)} sources -> {out}")
for k, a, nk in renames: print(f"RENAMED: {k} in area {a} -> {nk}")
