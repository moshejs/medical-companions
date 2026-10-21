#!/usr/bin/env python3
"""Write als/src/source-corrections.json from the 2026-10-20 validation.

Inputs: als/src/sources.json as compile_sources.py writes it before corrections, and
registry-ids.json (ClinicalTrials.gov v2 and openFDA lookups made the same day). The
journal entries were compared field by field with PubMed esummary, Crossref and Europe PMC
(compare.txt, strict.txt): every flag there was a formatting difference (group authors,
'Brown RH Jr', a PubMed title that carries the committee name, supplement volume labels)
except Goetz2000, whose DOI link was cut at a semicolon.

    python3 als/research/validation/make_corrections.py && python3 als/src/compile_sources.py als/research

It first recompiles sources.json without corrections, so it always starts from the research files.
"""
import json, pathlib, re
HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE.parent.parent / "src"
import subprocess, sys
(SRC / "source-corrections.json").write_text("{}\n", encoding="utf-8")
subprocess.run([sys.executable, str(SRC / "compile_sources.py"), str(HERE.parent)], check=True, capture_output=True)
d = {s["key"]: s for s in json.loads((SRC / "sources.json").read_text(encoding="utf-8"))}
ids = json.loads((HERE / "registry-ids.json").read_text(encoding="utf-8"))
corr = {"_README": [
    "Validated corrections, applied by compile_sources.py after it merges the research files, so they survive regeneration.",
    "Made by als/research/validation/make_corrections.py on 2026-10-20: journal entries checked against PubMed, Crossref and Europe PMC;",
    "trial entries against the ClinicalTrials.gov v2 API; US labels against openFDA by set ID; EMA and NICE pages opened."]}
def fix(k, **f):
    if k not in d: raise SystemExit(f"no such key {k}")
    corr.setdefault(k, {}).update(f)

fix("Goetz2000", link="https://pubmed.ncbi.nlm.nih.gov/10679709/", verified=True)
for k, s in d.items():
    t = s["text"]
    if re.fullmatch(r"NCT\d{8}", k):
        if t.startswith("ClinicalTrials.gov"): continue  # already rewritten (a corrected sources.json)
        v = ids["nct"][k]; m = re.search(r"\d{4}-\d\d-\d\d\.?\s*(.*)$", t)
        rest = m.group(1).strip() if m else ""  # e.g. the HEALEY regimen list
        title = v["title"] + (f" ({v['acr']})" if v.get("acr") and v["acr"] not in v["title"] else "")
        fix(k, text=f"ClinicalTrials.gov {k}. {title}. Status {v['status'].replace('_', ' ').lower()}, last update posted {v['upd']} (record read 20 Oct 2026)." + (f" {rest}" if rest else ""),
            link=f"https://clinicaltrials.gov/study/{k}", verified=True)
    elif not s["link"]:
        n = re.search(r"NCT\d{8}", t)
        sid = re.search(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", t)
        if k.startswith("CTgov_") and n: fix(k, link=f"https://clinicaltrials.gov/study/{n.group(0)}", verified=True)
        elif sid and ids["setid"].get(sid.group(0), {}).get("ok"): fix(k, link=f"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid={sid.group(0)}", verified=True)
EMA = {"EMA2024Qalsody": "EPAR/qalsody", "EMA_Rilutek": "EPAR/rilutek", "EMA2023Albrioza": "EPAR/albrioza",
       "EMA_Masitinib": "EPAR/alsitek", "EMA2019Radicava": "withdrawn-applications/radicava"}
for k, p in EMA.items(): fix(k, link="https://www.ema.europa.eu/en/medicines/human/" + p, verified=True)
fix("NICE2016", link="https://www.nice.org.uk/guidance/ng42", verified=True)
# read only through search summaries: shown with a 'check' tag
for k in ("HC2018Radicava", "HC2025Qalsody", "News_AdcommAMX0035", "News_AdcommTofersen"):
    fix(k, unverified=True, note="Read only through search-engine summaries; the original page was not opened. Treat dates and figures with care.")
(SRC / "source-corrections.json").write_text(json.dumps(corr, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(len(corr) - 1, "corrections")
