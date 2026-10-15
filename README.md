# Number 8 AI — AI tools directory for NZ small businesses

Static site, zero dependencies (Node 18+ only).

## Structure
- `data/tools.json` — the directory (edit this to add/update tools). Fields: id, name, url, category, description, pricing, nzNotes, nzMade, lastChecked.
- `data/categories.json` — categories (slug, name, icon, blurb).
- `data/site.json` — site name, base URL, contact email, last-updated date, Featured/Sponsored slot (set `placeholder:false` and fill name/description/url/cta when a sponsor pays).
- `assets/` — CSS, JS (search/filter, placeholder forms), favicon, og.png.
- `build.js` — generates `public/` (homepage, 12 category pages, sponsor, submit, about, sitemap.xml, robots.txt, llms.txt, tools.json).
- `scripts/seed_tools.py` — one-off seed used to create tools.json (history only).

## Build & preview
    node build.js
    cd public && python3 -m http.server 8765   # http://localhost:8765

## Routine maintenance (for the agent)
1. Re-check every tool URL resolves; update `lastChecked`.
2. Re-check pricing on providers' sites; never invent prices — use "See site" if unverified.
3. Add new tools (prioritise NZ-made; add NZ notes only when verified).
4. Bump `lastUpdated` in site.json, run `node build.js`, deploy `public/`.

## TODO before launch
- Confirm sponsor prices (currently labelled suggested/TBC on /sponsor/).
- Wire newsletter form (`form[data-newsletter]`) and submit form (`form[data-placeholder]`) to real services.
- Register domain, set `baseUrl` in site.json (base path is derived from it). Contact email: number8@mail.grokbot.com (site.json).
