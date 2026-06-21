#!/usr/bin/env python3
"""Wikimedia Commons helper — search, license/attribution lookup, and download.

Used to source freely-licensed imagery for the guide with *verified* attribution
(author + license + file-page URL), never guessed. Free-license filtering keeps
us to public-domain / CC works that we may reuse with credit.

Usage:
  commons.py search "<query>" [limit]         # list File: titles
  commons.py info "File:..." ["File:..." ...]  # JSON: url, license, author, ...
  commons.py download "File:..." <dest> [width]  # download (scaled to width px)
"""
import json
import re
import sys
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "GjakovaCulturalGuide/1.0 (https://gjakova.pages.dev; yunus@edenmind.com)"

# License short-names we treat as freely reusable (with attribution where due).
FREE = re.compile(
    r"^(cc0|cc[ -]by([ -]sa)?([ -][0-9.]+)?|public domain|pd|no restrictions)",
    re.I,
)


def _get(params):
    params = {**params, "format": "json"}
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.load(r)


def _clean(html):
    if not html:
        return ""
    text = re.sub(r"<[^>]+>", "", html)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def search(query, limit=20):
    d = _get({
        "action": "query", "list": "search", "srnamespace": 6,
        "srsearch": query, "srlimit": limit,
    })
    for x in d.get("query", {}).get("search", []):
        print(x["title"])


def info(titles):
    d = _get({
        "action": "query", "prop": "imageinfo", "titles": "|".join(titles),
        "iiprop": "url|mime|size|extmetadata",
    })
    out = []
    for page in d.get("query", {}).get("pages", {}).values():
        ii = page.get("imageinfo", [{}])
        ii = ii[0] if ii else {}
        em = ii.get("extmetadata", {}) or {}

        def f(k):
            return (em.get(k) or {}).get("value", "")

        license_short = _clean(f("LicenseShortName"))
        out.append({
            "title": page.get("title"),
            "url": ii.get("url"),
            "descurl": ii.get("descriptionshorturl") or ii.get("descriptionurl"),
            "mime": ii.get("mime"),
            "width": ii.get("width"),
            "height": ii.get("height"),
            "license": license_short,
            "license_url": _clean(f("LicenseUrl")),
            "author": _clean(f("Artist")),
            "credit": _clean(f("Credit")),
            "description": _clean(f("ImageDescription"))[:300],
            "date": _clean(f("DateTimeOriginal")) or _clean(f("DateTime")),
            "restrictions": _clean(f("Restrictions")),
            "free": bool(FREE.match(license_short)),
        })
    print(json.dumps(out, indent=2, ensure_ascii=False))


def download(title, dest, width=1600):
    d = _get({
        "action": "query", "prop": "imageinfo", "titles": title,
        "iiprop": "url|mime|size", "iiurlwidth": width,
    })
    page = next(iter(d["query"]["pages"].values()))
    ii = page["imageinfo"][0]
    # Prefer the scaled thumbnail; fall back to original (e.g. for SVG/GIF).
    src = ii.get("thumburl") or ii["url"]
    req = urllib.request.Request(src, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as r:
        data = r.read()
    with open(dest, "wb") as fh:
        fh.write(data)
    print(json.dumps({"saved": dest, "bytes": len(data), "from": src}))


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "search":
        search(sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 20)
    elif cmd == "info":
        info(sys.argv[2:])
    elif cmd == "download":
        download(sys.argv[2], sys.argv[3],
                 int(sys.argv[4]) if len(sys.argv) > 4 else 1600)
    else:
        print(__doc__)
        sys.exit(1)
