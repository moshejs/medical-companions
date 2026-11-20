"""The crawler policy: what robots.txt says, and a matcher the checks use to test it.

tools/build_site.py writes robots.txt with render(); tools/check_site.py reads the built
file back with allowed() and fails if the policy below is not what it says, or if a
sitemap URL is blocked for an agent that should index it.

Three groups:
1. BLOCKED: training crawlers, bulk scrapers and SEO data resellers. They cost bandwidth
   and edge requests and send back no readers. Disallow: / for all of them.
2. ANSWER_BOTS: answer engines that cite and link back, so they bring readers. Allowed,
   minus INTERNAL.
3. "*": search engines (Googlebot, Bingbot, Applebot), link-preview bots and everyone
   else. Allowed, minus INTERNAL.

INTERNAL: the deploy tree is the whole repository plus the build output
(.github/workflows/site.yml), so the sources are served too: each companion's src/
(sources.json alone is ~225 KB) and research/ notes (~80 KB a file), tools/, the hub/
templates (/hub redirects to / anyway), the READMEs and site.json. No page links to them
and no page loads them at run time, so they are kept out of every crawler's walk.
Nothing a reader or a link preview needs is in them: share-card.png, app.js and fonts/
stay allowed. The site is static, with no query-driven pages, so query strings are not
disallowed (app.js?v=<hash> is the only one a page emits, and crawlers rendering the
page need it).
"""
import re

BLOCKED = [
    # Anthropic, OpenAI and Common Crawl training crawlers
    "ClaudeBot", "Claude-Web", "anthropic-ai", "GPTBot", "CCBot",
    # AI-training opt-out tokens (they do not affect Google or Apple search)
    "Google-Extended", "Applebot-Extended", "meta-externalagent", "FacebookBot",
    # bulk scrapers and data resellers
    "Amazonbot", "Bytespider", "cohere-ai", "Diffbot", "ImagesiftBot", "Omgilibot",
    "Timpibot", "YouBot", "DataForSeoBot", "ExaSearchBot",
    # SEO backlink and ranking crawlers
    "SERankingBacklinksBot", "SemrushBot", "AhrefsBot", "MJ12bot", "DotBot", "Barkrowler",
    "BLEXBot", "serpstatbot", "PetalBot",
]

ANSWER_BOTS = [
    "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User",
    # Anthropic's search index and user-triggered fetcher (ClaudeBot stays blocked above)
    "Claude-SearchBot", "Claude-User",
    "DuckAssistBot", "MistralAI-User",
]

INTERNAL = ["/*/src/", "/*/research/", "/tools/", "/hub/", "/*.md$", "/site.json"]


def render(site):
    """robots.txt for the site at SITE (https://host, no trailing slash)."""
    def group(agents, lines):
        return "".join(f"User-agent: {a}\n" for a in agents) + "".join(f"{l}\n" for l in lines)
    keep_out = ["Allow: /"] + [f"Disallow: {p}" for p in INTERNAL]
    return "\n".join([
        "# Training crawlers, bulk scrapers and SEO resellers: no readers come back from them.",
        group(BLOCKED, ["Disallow: /"]),
        "# Answer engines that cite and link back: allowed, minus the sources and templates.",
        group(ANSWER_BOTS, keep_out),
        "# Search engines, link previews and everyone else: the same.",
        group(["*"], keep_out),
        f"Sitemap: {site}/sitemap.xml",
        "",
    ])


def _groups(text):
    """[(agents, [(allow, pattern)])] from robots.txt TEXT."""
    groups, agents, rules = [], [], None
    for raw in text.splitlines():
        line = raw.split("#", 1)[0].strip()
        if ":" not in line: continue
        key, val = (s.strip() for s in line.split(":", 1))
        key = key.lower()
        if key == "user-agent":
            if rules is not None: groups.append((agents, rules)); agents, rules = [], None
            agents.append(val.lower())
        elif key in ("allow", "disallow") and agents:
            rules = rules if rules is not None else []
            if val: rules.append((key == "allow", val))
    if agents: groups.append((agents, rules or []))
    return groups


def _match(pattern, path):
    rx = "".join(".*" if ch == "*" else "$" if ch == "$" and i == len(pattern) - 1 else re.escape(ch)
                 for i, ch in enumerate(pattern))
    return re.match(rx, path) is not None


def allowed(text, agent, path):
    """Whether AGENT may fetch PATH under robots.txt TEXT, as Google reads it (RFC 9309): the
    group naming the agent, else "*"; the longest matching rule wins, Allow on a tie."""
    groups = _groups(text)
    mine = [r for a, r in groups if agent.lower() in a] or [r for a, r in groups if "*" in a]
    rules = [rule for r in mine for rule in r]
    best = max((r for r in rules if _match(r[1], path)), key=lambda r: (len(r[1]), r[0]), default=None)
    return best is None or best[0]
