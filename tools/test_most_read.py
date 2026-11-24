#!/usr/bin/env python3
"""Offline checks for tools/most_read.py and the /most-read/ page it writes.

    python3 tools/test_most_read.py
"""
import datetime, json, pathlib, sys, unittest
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import most_read as mr


class Window(unittest.TestCase):
    def test_twelve_months_ending_in_the_given_month(self):
        self.assertEqual(mr.window("2026-10"), (datetime.date(2025, 11, 1), datetime.date(2026, 10, 31)))
        self.assertEqual(mr.window("2026-12"), (datetime.date(2026, 1, 1), datetime.date(2026, 12, 31)))
        self.assertEqual(mr.window("2027-02"), (datetime.date(2026, 3, 1), datetime.date(2027, 2, 28)))


class Rounding(unittest.TestCase):
    def test_round_views(self):
        self.assertEqual(mr.round_views(126895.4), 126900)
        self.assertEqual(mr.round_views(1049.9), 1000)
        self.assertEqual(mr.round_views(843), 840)


class SavedPage(unittest.TestCase):
    data = json.loads(mr.DATA.read_text(encoding="utf-8"))
    src = json.loads(mr.SRC.read_text(encoding="utf-8"))["articles"]

    def test_every_listed_article_is_ranked_once(self):
        ranked = self.data["articles"]
        self.assertEqual(len(ranked), len(self.src))
        self.assertEqual([a["rank"] for a in ranked], list(range(1, len(ranked) + 1)))
        avgs = [a["avg"] for a in ranked]
        self.assertEqual(avgs, sorted(avgs, reverse=True))

    def test_guides_exist(self):
        slugs = {c["slug"] for c in mr.CFG["companions"]}
        for a in self.src:
            if "guide" in a: self.assertIn(a["guide"], slugs)

    def test_page_matches_saved_figures(self):
        """hub/most-read.html is exactly what the saved data renders to (no hand edits, no stale page)."""
        d = self.data
        rows = [a | {"renamed_from": ", ".join(a["series"][1:]) or None} for a in d["articles"]]
        day = datetime.date.fromisoformat
        self.assertEqual(mr.OUT.read_text(encoding="utf-8"), mr.render(rows, day(d["from"]), day(d["to"]), day(d["fetched"])))

    def test_no_private_research_fields(self):
        """Only Wikipedia titles, older titles and guide slugs belong in the public list."""
        for a in self.src: self.assertLessEqual(set(a), {"title", "also", "guide"})


if __name__ == "__main__":
    unittest.main()
