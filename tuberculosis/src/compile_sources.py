#!/usr/bin/env python3
"""Merge the research files' Sources sections into src/sources.json (TB Companion, tuberculosis, passes A–H).

Usage: compile_sources.py RESEARCH_DIR
Each research file lists sources as "- [Key] text" or "- **[Key]** text".
Same key + same identifier (PMID/DOI) across files = one source.
Same key + different work = later one renamed Key + area letter (reported).
A source line without "(validated: <service>)" is marked unverified.
"""
import json, re, sys, pathlib

AREAS = {"A": "Epidemiology, global burden & history", "B": "Transmission, risk factors & host susceptibility",
         "C": "Microbiology, immunology & pathogenesis", "D": "Clinical presentation & diagnosis",
         "E": "Treatment of drug-susceptible TB disease & TB infection", "F": "Drug-resistant TB, comorbidity & outcomes",
         "G": "Living with TB, infection control & nursing", "H": "Vaccines, the End TB Strategy & research"}
rd = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parent.parent / "research"
out = pathlib.Path(__file__).resolve().parent / "sources.json"
line_re = re.compile(r"^\s*[-*]\s*(?:\*\*)?\[([A-Za-z0-9_\-]+)\](?:\*\*)?\s*[:\-–]?\s*(.+)$")

def _doi(text):
    """A DOI may legitimately contain brackets, as Lancet and Elsevier ones do
    (10.1016/S1474-4422(24)00038-3). Stopping at the first ')' truncates those to a
    prefix that every paper from the same journal and year shares, which then looks
    like a matching identifier. Take the whole run and trim only what cannot belong:
    trailing punctuation, and a ')' with no '(' to close."""
    m = re.search(r"(10\.\d{4,}/[^\s;,]+)", text, re.I)
    if not m: return None
    d = m.group(1).rstrip(".")
    while d.endswith(")") and d.count("(") < d.count(")"): d = d[:-1]
    return d.lower().rstrip(".")

def ids(text):
    out = set()
    m = re.search(r"PMID[:\s]*(\d+)", text)
    if m: out.add("pmid" + m.group(1))
    d = _doi(text)
    if d: out.add("doi" + d)
    # a US drug label has no PMID or DOI; its DailyMed set ID identifies it across label versions
    m = re.search(r"set[ _-]?id\s*([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})", text, re.I)
    if m: out.add("set" + m.group(1).lower())
    ncts = re.findall(r"\b(NCT\d{8})\b", text)
    if ncts and not out: out.update(ncts)
    parts = re.split(r"\.\s+", text)
    if len(parts) > 1: out.add("t" + re.sub(r"\W+", "", parts[1].lower())[:50])
    return out
def same(a, b):
    """Let the strongest identifier both entries carry decide. A PMID is unique to a
    paper, so when both have one it settles the question either way; only fall back to
    the DOI, and then to the title, when that is all there is."""
    if a == b: return True
    ia, ib = ids(a), ids(b)
    pa = {x for x in ia if x.startswith("pmid")}; pb = {x for x in ib if x.startswith("pmid")}
    if pa and pb: return bool(pa & pb)
    da = {x for x in ia if x.startswith("doi")}; db = {x for x in ib if x.startswith("doi")}
    if da and db: return bool(da & db)
    if (pa or da) and (pb or db): return bool((pa | da) & (pb | db))
    # a paper and a page about it (a slide deck, a press release) can share a title: never one work
    if bool(pa or da) != bool(pb or db): return False
    sa = {x for x in ia if x.startswith("set")}; sb = {x for x in ib if x.startswith("set")}
    if sa and sb: return bool(sa & sb)
    na = {x for x in ia if x.startswith("NCT")}; nb = {x for x in ib if x.startswith("NCT")}
    if na and nb: return na == nb  # a registry note listing many trials is not each of them
    ta = [x for x in ia if x.startswith("t") and len(x) > 35]; tb = [x for x in ib if x.startswith("t") and len(x) > 35]
    return bool(ta and tb and ta[0] == tb[0])
def ident(text): return ids(text)

def clean(t):
    t = re.sub(r"\*\*|\*", "", t).strip()
    return t

srcs, renames = {}, []
for f in sorted(rd.glob("[A-H]-*.md")):
    area = f.name[0]
    body = f.read_text(encoding="utf-8")
    if "## Sources" not in body: continue
    sec = body.split("## Sources", 1)[1]
    for ln in sec.splitlines():
        m = line_re.match(ln)
        if not m: continue
        key, text = m.group(1), clean(m.group(2))
        url = re.search(r"https?://[^\s)]+", text)
        doi = _doi(text)  # keeps brackets that belong to the DOI, e.g. 10.1016/S1474-4422(22)00038-3
        pmid = re.search(r"PMID[:\s]*(\d+)", text)
        link = url.group(0).rstrip(".") if url else (f"https://doi.org/{doi}" if doi else (f"https://pubmed.ncbi.nlm.nih.gov/{pmid.group(1)}/" if pmid else ""))
        # each pass names the service that confirmed the record: "(validated: PubMed)"; keep it as a field
        val = re.search(r"\s*\(validated:\s*([^)]+)\)", text)
        if val: text = (text[:val.start()] + text[val.end():]).strip()
        rec = {"key": key, "text": text, "link": link, "areas": [area], "unverified": "unverified" in text.lower() or not val}
        if val: rec["validated"] = val.group(1).strip()
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
