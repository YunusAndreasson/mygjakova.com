# Security policy

mygjakova.com is a static site. It has no accounts, forms, database or server
code, so a hole in it would reach its visitors' browsers: a script that
shouldn't run, or a page that can be framed or altered. Please report one
privately.

## Reporting a vulnerability

Use GitHub's private reporting:
[report a vulnerability](https://github.com/YunusAndreasson/mygjakova.com/security/advisories/new).
Please don't open a public issue.

Include the URL, your browser, what you did, what happened, and what an
attacker would gain. A fix is coordinated with you before anything is
published, and you're credited in the advisory unless you'd rather not be.

## Supported versions

Only the live site at https://mygjakova.com and the `main` branch get fixes.
There are no releases.

## Scope

In scope:

- every page on https://mygjakova.com, in every language
- its Content Security Policy (`astro.config.mjs`) and response headers
  (`public/_headers`)
- this repository's code, build scripts and workflows

Out of scope: Cloudflare's platform, the sites the guide links to (Google
Maps, Apple Maps, OpenStreetMap, Wikimedia Commons and the cited sources), and
scanner output without a working attack.

The CSP is delivered in a `<meta>` tag, where browsers ignore
`frame-ancestors`; the `X-Frame-Options: SAMEORIGIN` header is what blocks
framing. That's known and doesn't need a report.
