# ALSR Redesign Plan
Client: Advanced Laser Surface Restoration (ALSR), mobile laser cleaning, based in Kempton Park, Gauteng. Live: https://alsr-sa.com
Audience: B2B (automotive, mining, marine, construction, fabrication, farming, transport…). New business building a client base.
Keep the dark + orange feel. Re-read §0 before writing any copy.

## 0. Hard rules and confirmed facts
**Hard rules**
- **Equipment confidentiality:** never mention the laser's brand, model, manufacturer, wattage or wavelength. That covers copy, alt text, filenames, meta, schema and comments. The most specific wording allowed is "industrial-grade fibre laser". Describe capability, not equipment. Don't show the machine/unit in site images, **except the hero image and YouTube videos (client override, 2026-11-19)**. No site image may show a readable machine label.
- Never invent facts (stats, testimonials, certifications, logos, years, response times). Use visible `[[CLIENT: …]]` placeholders, or leave the section out.
- No cleaning-speed or max-thickness numbers. If a section needs one, use `[[CLIENT: TODO …]]`.
- SA/UK English (aluminium, colour, fibre). Brand: "Advanced Laser Surface Restoration (ALSR)", then "ALSR". Service term: "laser cleaning".
- **Relative URLs only** for assets and internal links (`favicon/…`, `assets/…`, `gallery.html`). Never start with `/`, because GitHub Pages serves under `/alsr-sa/`. Canonical, og:url, sitemap and schema use absolute `https://alsr-sa.com/…`.
- All redesign work happens on branch `redesign`. **Never push to `main` before Phase 6 sign-off.** Pushing `redesign` is fine (Netlify may build a branch preview).

**Confirmed facts (client, 2026-11)**
- Services:
  1. Rust and corrosion removal.
  2. Paint and coating stripping (light to medium coats; multi-layer or thick coatings assessed per job).
  3. Oxide, mill scale and heat-tint/weld discolouration removal.
  4. Oil, grease and carbon residue removal.
  5. Surface prep before painting, coating or welding (leaves a clean, lightly textured surface that helps new paint adhere).
- Materials: steel, stainless steel, cast iron, aluminium, copper/brass, titanium. Some stone/concrete on assessment.
- Best suited for: medium and large metal surfaces and structures, including vehicle chassis and parts, machinery, structural steel, trailers, tanks, moulds in service, and marine and mining equipment. Work is done on site.
- Limits (state positively, in the FAQ "Is laser cleaning right for my job?"):
  - Very thin sheet metal and delicate or precision parts can be affected by heat, so we assess these first or decline.
  - Not for plastics, rubber, composites, wood, electronics or heat-sensitive parts.
  - Very thick or built-up coatings take longer and are quoted after assessment.
  - Glass and highly reflective or polished surfaces are assessed case by case.
- Uncertain jobs: offer a **free test patch / photo assessment** as the CTA.
- Area: Gauteng and surrounding areas. Nationwide for larger jobs. No call-out fee in Gauteng. Further afield, a distance-based call-out fee may apply.
- Pricing: quote only. It depends on measured surface area and the thickness of rust, contaminant or paint.
- People: **Tiaan**, owner and laser technician, does the jobs. WhatsApp and phone +27 82 614 1820, tiaan.alsr@gmail.com. **Anne-Marie** handles quotes, invoices and enquiries, sales.alsr@gmail.com.
- Hours: flexible, not set (don't publish hours). Gmail addresses stay (no domain email).
- Form: Web3Forms. **Tiaan (tiaan.alsr@gmail.com) is the primary recipient.** Anne-Marie (sales.alsr@gmail.com) also gets enquiries through Web3Forms CC if the plan allows it, otherwise through a Gmail auto-forward from Tiaan's inbox. POPIA note names "ALSR / Advanced Laser Surface Restoration".
- Hosting: repo `github.com/duranex-solutions/alsr-sa` (`main`) → GitHub Pages `https://duranex-solutions.github.io/alsr-sa/`. The public domain `alsr-sa.com` is the canonical domain. Netlify auto-publishes `main` from the same repo (confirmed; live = `main@ae52975` at planning; pretty URLs, e.g. `/gallery`). **Pushing to `main` = going live on both hosts.** The repo has no CNAME file.
- Scripture "Isaiah 41:10" (English) stays visible in the hero. It's part of the owner's values.
- Founded 2026.
- Industries: keep a broad list. The business is new, so phrase them as "industries we help", not past clients.
- Copy, footer tagline and industry list as planned in §4 are approved (2026-11).
- No testimonials, client logos, Google Business Profile, team or equipment photos yet. IMG_9656/9658 belong to the Steel frame restoration project. The "Aluminum sheet" pair is rust/corrosion removal.

## 1. Audit findings (priority order)
**P1: conversion and content**
- No services section. Benefits are generic ("Precision / Speed / Sustainability"), and materials, typical jobs and limits are never stated.
- Weak conversion path: the consultation CTA leads only to mailto links. There is no form, no WhatsApp, no "send photos" guidance, no process and no FAQ. The CTA label changes everywhere ("Get in contact ↗", "Request a consultation", "Ask about your project"), and the ↗ wrongly suggests an external link.
- Weak proof: the homepage "gallery" shows one rust *before* photo (985 KB) and a 12 KB Facebook profile picture instead of before/after pairs. There are no real trust signals, though true ones exist: owner-operated, no call-out fee in Gauteng, free assessment, Kempton Park base.
- Every h2 uses the same "Slogan.<br><em>Slogan.</em>" pattern, so the page reads as slogans, not information. The H1 lacks "laser cleaning". The verse sits above the H1 in a way that competes with it.
- Gallery copy: two pairs are both titled "Steel frame restoration", numbering starts at "Project 02", eyebrows read "03 / 01 project comparison", alt text is generic, and IMG_9656/9658 are unused.

**P1: accessibility**
- White text on the #f07824 button is about 2.9:1, which fails AA at 14 px bold. Fix: dark text (#111214 ≈ 7:1).
- No skip link and no `:focus-visible` styles. Reveal JS hides content (`visibility:hidden`) and re-hides it when it scrolls out of view.
- Unicode glyph icons (⌖ ♧ ✳ ✦) render inconsistently and are read aloud. Labels at 0.67–0.73 rem are too small.
- Mobile: no menu. Five links wrap at 0.76 rem (120 px scroll-padding hack). A leftover light border (#d8dbd8) appears on mobile contact.

**P2: performance**
- 85 MB of unused MP4s in `assets/videos/` and about 28 MB of unused `_result` images and the 428 KB logo PNG ship with the site.
- 6 eager YouTube iframes (about 500 KB+ of player JS each). Use click-to-load facades.
- No `width`/`height` or `srcset`, no hero `fetchpriority`. Google Fonts loads 8 weights across 2 families and blocks rendering.

- Absolute `/favicon/*` and `/favicon.ico` paths 404 on GitHub Pages (`/alsr-sa/` subpath), so favicons and the manifest are broken there.

**P2: SEO**
- No LocalBusiness JSON-LD (Kempton Park, area served), no og:image or twitter card, `lang="en"` instead of `en-ZA`, no sitemap `lastmod`, no FAQ. Thin service keywords (rust removal, paint stripping, sandblasting alternative, weld cleaning, Gauteng towns).

**P3: code and maintainability**
- Header and footer are copy-pasted into 3 pages and already differ (Industries link only on home).
- CSS is base plus a "depth layer" of overrides. It has dead rules (`.project-*`, `enter-from-right`), duplicates (`.button-light`), misleading tokens (`--navy` is off-white, `--white` is dark) and about 30 hard-coded greys.
- Mixed naming ("ALSR", full name, "@alsr-lazersa", US "Aluminum"). The local folder is not a git repo, but it matches `origin/main` apart from line endings (local CRLF, repo LF).

## 2. Design tokens
### Palette (existing, exact)
| Token (new) | Hex | Was / use |
|---|---|---|
| --bg-0 | #08090a | deepest: industries/footer (#050506, #0b0c0d stops) |
| --bg-1 | #111214 | `--paper`, page base, theme-color |
| --bg-2 | #17181b | gradient mid (#0e0f11, #151619 merge) |
| --surface | #1b1d20 | `--white`, cards/sections |
| --surface-2 | #24272b | card gradient top (#202327, #26292d merge) |
| --line | #303236 | borders |
| --line-strong | #44464a | (#383a3e, #3a3c40, #3a3d41, #414347, #45474a merge) |
| --text | #f3f3f1 | `--navy`, headings (#f0f0ee merges) |
| --text-2 | #d0d1d2 | nav, secondary (#dedfdd, #e3e3e1, #e8e8e6 merge) |
| --muted | #b2b5b8 | body copy |
| --dim | #85888b | decorative numbers only (#a4a7aa merges) |
| --accent | #f07824 | brand orange (`--gold`) |
| --accent-hover | #ff9148 | hover |
| --accent-light | #ffad66 | `--gold-light`, small accent text, focus ring |
| --accent-deep | #d9650f | button gradient bottom (tops #ff8a3d / #ffa062 kept) |
| --accent-tint | #34251c | icon chips |
| --on-accent | #111214 | **new**: text on orange (contrast fix) |

### Additions (supporting, sparing)
- `--steel` #8fa3b3: "Before" tags, secondary icons, process numerals. Cool metal tone that balances the orange.
- `--ok` #46b37f: "After" tags and table checkmarks.
- `--whatsapp` #25d366: WhatsApp icon only.

### Type
Manrope for headings (700, 800) and DM Sans for body (400, 500, 700). Cut from 8 weights to 5, keep `display=swap`.
| Token | Size | Use |
|---|---|---|
| --fs-xs | 0.8125rem | eyebrows, labels (min) |
| --fs-sm | 0.875rem | meta, captions |
| --fs-base | 1rem | body, lh 1.65 |
| --fs-md | 1.125rem | lead |
| --fs-lg | 1.375rem | h3 |
| --fs-xl | clamp(1.75rem, 3vw, 2.25rem) | sub h2 |
| --fs-2xl | clamp(2.1rem, 3.5vw, 3rem) | section h2 |
| --fs-3xl | clamp(2.5rem, 5vw, 4.25rem) | h1 |

Heading tracking -0.035em (was -0.065em). Eyebrows 0.12em uppercase.

### Spacing, radius, shadows
- Spacing (4 px base): --sp-1 4 · --sp-2 8 · --sp-3 12 · --sp-4 16 · --sp-5 24 · --sp-6 32 · --sp-7 48 · --sp-8 64 · --sp-9 96. Section padding `clamp(64px, 9vw, 112px)`. Container `min(1160px, 100% - 2*gutter)`, gutter 24 / 16 px.
- Radius: --radius-sm 4px (buttons, chips) · --radius 6px (cards, media) · --radius-lg 10px (panels) · --radius-pill 999px.
- Shadows (existing values kept):
  - --shadow-sm `0 2px 6px rgb(0 0 0/35%), inset 0 1px 0 rgb(255 255 255/4%)`
  - --shadow-md `0 10px 24px -6px rgb(0 0 0/55%), 0 2px 6px rgb(0 0 0/35%)`
  - --shadow-lg `0 28px 60px -14px rgb(0 0 0/70%), 0 10px 22px -8px rgb(0 0 0/45%)`
  - --glow `0 0 0 1px rgb(240 120 36/45%), 0 14px 38px -10px rgb(240 120 36/40%)`
  - --edge-light `inset 0 1px 0 rgb(255 255 255/7%)`

## 3. Target structure
```
/index.html /gallery.html /videos.html /404.html       (URLs unchanged)
/robots.txt /sitemap.xml /favicon.ico /favicon/*       (kept)
/partials/header.html /partials/footer.html           (source of truth)
/scripts/sync-partials.mjs  (Node, no deps; injects partials between <!-- header:start/end --> markers, sets aria-current)
/assets/css/site.css        (one file: @layer tokens, base, layout, components, pages, utilities)
/assets/js/site.js          (mobile nav, one-shot reveal, YouTube facade, lightbox, Web3Forms submit, year)
/assets/img/brand/          logo-white.webp, og-image.jpg (1200×630)
/assets/img/work/           kebab-case, e.g. steel-frame-before-800.webp / -1600.webp
/assets/img/video-posters/
```
Remove from deploy: `assets/videos/*.mp4` (archive outside the site folder), unused `_result` files, `Logo White 2.png`, and the old `style.css` / `animations.js`. No hosting build step.

## 4. Sitemap and section order
**Header (all pages):** logo · Services · How it works · Our work · Videos · FAQ · [Get a quote]. Mobile: menu button with a disclosure panel and a sticky bottom bar (WhatsApp Tiaan · Call).
**CTA language:** primary "Get a quote". Secondary "WhatsApp Tiaan". Helper line for uncertain jobs: "Not sure? Send photos for a free assessment or test patch."

### Home `/`
1. **Hero**: small "Isaiah 41:10" line, H1 "Mobile laser cleaning in Gauteng", concrete sub (rust, paint and residue removed on site, no chemicals or blasting media), CTAs, 3 proof chips. Value proposition in 5 seconds.
2. **Why ALSR strip**: true signals only: owner-operated (Tiaan does every job), no call-out fee in Gauteng, free photo assessment/test patch, Kempton Park based, nationwide for larger jobs. Credibility without invented stats.
3. **Services**: 5 cards from §0, each with typical jobs, plus a materials row. Visitors can tell whether the job fits.
4. **Before/after showcase**: 3 strongest pairs, linking to the gallery and videos. Proof straight after the claim.
5. **Laser vs sandblasting vs chemicals**: qualitative comparison table (media/waste, substrate wear, chemicals, cleanup, on site). Why switch. No numbers.
6. **How it works**: 4 steps: send photos/details → free assessment and quote → on-site cleaning → handover. Lowers friction.
7. **Industries we help**: broad grid with a one-line use case each (existing 10 plus transport/trailers, manufacturing/moulds, vehicle restoration). B2B self-identification.
8. **About ALSR**: Tiaan (owner and technician) and Anne-Marie (quotes and enquiries). New, SA-based, fully mobile, values. Human trust.
9. **FAQ**: right for my job (limits), area and call-out, why quote-only, what to send, prep and safety on site, surface after cleaning (paint-ready), materials. Objection handling and FAQPage schema.
10. **Contact**: Web3Forms quote form (name, company, phone, location, surface/job type, message, photo-link field), "what to send" checklist, both contacts, WhatsApp, area, POPIA note. Primary conversion.
11. **Footer**: name, Kempton Park + area served, phone/WhatsApp/emails, page links, socials, © year, credit. New tagline: "Mobile laser cleaning for metal, on your site, without chemicals or blasting media."
- Testimonials: no section until real ones exist (a commented slot only).

### Gallery `/gallery.html`
1. **Interior hero**: H1 "Laser cleaning before & after", category chips with correct counts.
2. **Rust & corrosion**: steel frame (wide + close-up + IMG_9656/9658 views), sheet, aluminium sheet corrosion, close-up. Titles and captions use material · what was removed.
3. **Paint & coatings**: car door, car rear.
4. **Contaminants & residue**: floor/surface.
5. **Video teaser**: large poster cards linking to /videos.
6. **CTA band**: "Got a similar job? Send photos for a free assessment."

### Videos `/videos.html`
1. **Interior hero**: H1 "Laser cleaning videos", category chips.
2. **Paint removal**: 9:16 click-to-load YouTube facades with descriptive titles.
3. **Rust removal**: same. Plus any new channel videos, grouped by category.
4. **Follow us**: YouTube / TikTok / Facebook.
5. **CTA band**.

### 404 `/404.html`
Short message, links home and to the gallery, quote CTA.

## 5. Client questions (deferred, add later)
All answered or parked by the client (2026-11). Answers live in §0. Build **no** sections or placeholders for the parked items. Keep this list for future additions:
1. Testimonials and client logos (name, company, permission): add a Testimonials section after §4 Home 4 when available.
2. Google Business Profile: not set up yet. Leave it out entirely (no link, no reviews, no `sameAs`).
3. Projects completed: parked. (Founded 2026 is confirmed, see §0.)
4. Certifications, safety training, insurance, B-BBEE, CSD: parked. When added, they go in the "Why ALSR" strip, About, and LocalBusiness schema.
5. Per-project gallery details (object, industry, location): parked. Use material · what was removed.

**Developer open items:**
- Web3Forms access key: pending from the client (expected within a day), created with tiaan.alsr@gmail.com. Keep the `[[CLIENT: WEB3FORMS_ACCESS_KEY]]` placeholder until it's supplied. Then check whether CC is available; if not, the client sets up the Gmail forward to Anne-Marie.
- Node availability for image tooling.

## 6. Phase checklist
### Phase 2 Foundation (structure, design system, shared header/footer/nav)
- [x] Connect the local folder to the repo without overwriting anything: `git init` → `git remote add origin https://github.com/duranex-solutions/alsr-sa.git` → `git fetch` → `git reset origin/main` (mixed, working tree kept) → `git checkout -b redesign`. Add `.gitattributes` (`* text=auto eol=lf`) and `.gitignore`. `git status` must show only the new docs.
- [x] Convert all `/favicon…` absolute paths to relative (§0 rule)
- [x] Create folders per §3; move/rename the logo
- [x] `assets/css/site.css`: tokens (§2), base, layout, components (button, eyebrow, card, chip, form, table, band, figure, FAQ `<details>`), focus-visible, reduced motion; drop dead/duplicate CSS
- [x] Buttons with dark text on orange; unified CTA labels (§4)
- [x] `partials/header.html` (skip link, nav, mobile disclosure menu, CTA, mobile sticky call bar) and `partials/footer.html` (§4 footer)
- [x] `scripts/sync-partials.mjs`, injected into all pages; `assets/js/site.js` (nav toggle, one-shot reveal that never hides content without JS)
- [x] Inline SVG icon set replacing the Unicode glyphs; trimmed font request; `lang="en-ZA"`
- Files: index.html, gallery.html, videos.html, partials/*, scripts/sync-partials.mjs, assets/css/site.css, assets/js/site.js; delete style.css, animations.js
- **Phase 2 notes:**
  - Shared header/footer: edit `partials/*`, then run `node scripts/sync-partials.mjs` (on this PC Node is at `C:\Program Files\nodejs`, not on PATH). New pages need `<!-- header:start/end -->` and `<!-- footer:start/end -->` markers, `<main id="main" tabindex="-1">`, and the `js`-class head script. Nav links carry `data-nav`; the script sets `aria-current="page"` on gallery/videos. Home uses a scroll-spy in `site.js` (`aria-current="location"`).
  - Header nav targets `index.html#services`, `#how-it-works`, `#faq`, `#contact`. Only `#contact` exists today, so **Phase 3 must create those section ids**. Icons are a `<symbol>` sprite inside the header partial (`<svg class="icon"><use href="#i-…"/></svg>`); add new icons there.
  - CSS is one file in layers (tokens/base/layout/components/pages/utilities). Reusable: `.button` (`--small/--ghost/--whatsapp`), `.eyebrow`, `.section-heading` (`--centered`, `.lead`), `.section--surface/--alt/--deep`, `.card`, `.chip`, `.tag--before/--after`, `.figure`, `.band`, `.table`, `.form/.field`, `.faq`. The old page-specific blocks (hero, intro, benefit-grid, before-after, video-grid…) sit in the `pages` layer and can be replaced in Phases 3/4. Reveal is one-shot via `.reveal` (added by JS to `main > section > .container`).
  - Images are still in `assets/images/` (kebab-case move to `assets/img/work/` is Phase 4). Only the logo moved (`assets/img/brand/logo-white.webp`); `style.css`, `animations.js`, the logo PNG and `_result` logo were removed. MP4s and the original JPGs are untouched. Videos are still eager iframes. Page copy is unchanged except CTA labels ("Get a quote"). The hero photo appears to show the laser unit, so check it in the Phase 4 image review.

### Phase 3 Homepage (layout + copy rewrite)
- [x] Build sections 1–11 (§4) with copy from §0 facts only; verse line in hero
- [x] Services, materials, comparison table, process, industries, about, FAQ (incl. limits)
- [x] Before/after showcase from the existing `_gallery` pairs (swapped to srcset in Phase 4)
- [x] Web3Forms form (`access_key` = `[[CLIENT: WEB3FORMS_ACCESS_KEY]]`, Tiaan's inbox; `subject` and `from_name` fields, honeypot, success/error states, mailto fallback to both addresses), WhatsApp `wa.me/27826141820`, tel links, POPIA note
- [x] Equipment-rule grep: no brand/model/W/nm in any file
- Files: index.html, assets/css/site.css, assets/js/site.js (+ partials/header.html for new sprite icons)
- **Phase 3 notes:**
  - Home section ids: `#home` (hero), `#services`, `#results` (before/after), `#compare`, `#how-it-works`, `#industries`, `#about`, `#faq` (first item `#faq-fit` = limits, open by default), `#contact`. The Why ALSR strip has no id. Nav scroll-spy now finds Services / How it works / FAQ.
  - CTAs: one primary, "Get a quote" (header + hero → `#contact`; the form button reads "Send quote request"). One secondary: "Call 082 614 1820" (ghost button, `tel:`) in the hero. WhatsApp sits in the mobile bar, About and Contact only. Other sections use text links, not buttons. The helper line "Not sure? Send photos for a free assessment or test patch." appears under the hero CTAs and in the contact lead.
  - **Hero image swapped.** `HeroImage_result.webp` may show the laser unit (Phase 2 note), so the hero now uses the steel frame close-up before/after pair (`StructureClose*_gallery.webp`, `fetchpriority="high"`). Phase 4 should still review the old hero file and drop it if unused. The `Facebook PFP` teaser image is gone from home.
  - Scripture shown as "Built on faith · Isaiah 41:10" (English, replacing "Jesaja") as a quiet line under the hero chips, not above the H1. It also appears once in About ("ALSR is built on faith…").
  - Showcase uses one pair per category: steel frame (rust), car door (paint), floor surface (residue). Titles follow "object · what was removed". The testimonials slot is an HTML comment after the showcase (§5.1). No visible placeholder, per §5.
  - Comparison table is qualitative only, with a laser column highlight. At ≤680 px it becomes stacked cards (`td[data-label]`). It ends with an honest link to the FAQ limits.
  - Form: posts to `https://api.web3forms.com/submit` (works without JS). With JS, `site.js` uses fetch with ok/error states in a `role="status"` region, `aria-invalid` on invalid fields, and a mailto/WhatsApp fallback. While the key is still the `[[CLIENT…]]` placeholder, JS stops the submit and shows the fallback. Fields: name*, company, phone*, email (Web3Forms uses it as reply-to), location*, job type (the 5 services + "Not sure yet"), message*, photo link (url). `botcheck` honeypot. **CC to Anne-Marie not wired**: add `<input type="hidden" name="ccemail" value="sales.alsr@gmail.com">` if the Web3Forms plan supports it, otherwise use the Gmail forward.
  - New sprite icons in the header partial: `i-user`, `i-camera`, `i-shield`, `i-layers`, `i-flame`, `i-droplet`, `i-brush`, `i-clipboard` (synced to all pages).
  - CSS: the old home blocks (hero-stamp, image-caption, intro, benefit-grid, gallery-card, old contact) were replaced in the `pages` layer. Gallery/video blocks are untouched. Breakpoints: 1024 (trust/steps to 2 columns), 900 (two-column layouts stack), 680 (single column, stacked table), 480 (card padding).
  - Visible placeholders left on home: `[[CLIENT: WEB3FORMS_ACCESS_KEY]]` (hidden input) only (the on-site requirements placeholder was resolved: FAQ now says self-supplied generator, compressor and most PPE, park within ~30–40 m). HTML `TODO client` comments mark the certifications (Why strip, About) and testimonials slots.
  - Checked in headless Chrome at 360/768/1280: no horizontal overflow. Meta title/description untouched (Phase 5).

### Phase 4 Gallery & Videos pages + media optimisation
- [x] **Image review (allowed exception):** viewed all gallery photos, IMG_9656/9658, the hero photo and the video thumbnails (contact sheets). No readable machine label in any gallery photo. `HeroImage.jpg` shows the laser handpiece with sparks, so it is **dropped** (archived, not deployed). A new hero image cannot be generated here (see notes).
- [x] Gallery: titles, captions, alt text, counts, IMG_9656/9658 added, `<dialog>` lightbox, video teaser, CTA band
- [x] Videos: all 6 existing IDs verified via YouTube oEmbed; channel listing fetched; 5 new videos added; facades with posters; follow-us row; CTA band
- [x] Images: 800 w and 1600 w WebP (portrait pair 600/1200), `srcset`/`sizes`, `width`/`height`, lazy everywhere except the hero (`fetchpriority="high"`). All 1600 w files are under 350 KB, 800 w under 150 KB
- [x] Kebab-case renames under `assets/img/work/`; `assets/img/brand/og-image.jpg` (1200×630); posters in `assets/img/video-posters/`
- [x] Unused media removed from the deploy: originals, `_result`/`_gallery` webps and the MP4s moved to `../ALSR Laser Cleaning - media archive/` (also still in git history). `HeroImage.jpg` is archived too; now the homepage hero (`assets/img/work/hero-laser-cleaning-800|1600.webp`, single image, no before/after tag)
- [x] 404.html: self-contained inline CSS, absolute `https://alsr-sa.com/` links
- Files: gallery.html, videos.html, 404.html, index.html (img refs), assets/img/**, assets/css/site.css, assets/js/site.js, partials/header.html (icons)
- **Phase 4 notes:**
  - Gallery: 3 sections (#rust 6 pairs, #paint 2, #contaminants 1), 18 photos. Each photo is an `<a class="lightbox-link" data-lightbox href=1600w>` so it opens the large file without JS. `site.js` builds one `<dialog class="lightbox">`: focus moves to Close, Esc/backdrop click closes, ←/→/Home/End, swipe, prev/next buttons, counter, focus returns to the last photo viewed, neighbours preloaded. Titles are "object · what was removed" using only what the photos show. HTML `TODO client` comments mark unknowns (material of "large-sheet": old filename said aluminium but it looks like rusted steel; `steel-plate` and `steel-plate-portrait` look like the same plate).
  - Videos: 11 videos in 3 groups (paint 4, rust 5, residue 2). All are YouTube Shorts (9:16). Facade is `<a class="video-facade" href=youtube.com/shorts/ID data-video-id>` with a local poster; `site.js` swaps in a `youtube-nocookie.com` iframe (autoplay) on click and gives it focus. No YouTube request happens before the click. Excluded: `g10ue2Jmhpc` ("04 September 2026"), a promo graphic.
  - Posters: YouTube thumbnails cropped to 9:16. After the 2026-11-19 client override (equipment allowed in hero + videos) all posters are the real video frames. Duplicate portrait steel-plate pair dropped, so the gallery has 5 rust pairs (8 pairs, 16 photos).
  - Home showcase and hero now use the new `assets/img/work/` files with srcset/width/height. New sprite icons: `i-zoom`, `i-chevron-left`, `i-chevron-right`.
  - Checked in headless Chrome at 1280 and 360: no horizontal overflow, no console errors, lightbox keyboard flow and facade click verified.
  - Meta titles/descriptions, og:image tags and JSON-LD are Phase 5. `og-image.jpg` exists but is not yet referenced.

### Phase 5 SEO, accessibility, performance polish
- [ ] Per-page titles/descriptions, og:image, twitter card, canonicals
- [ ] JSON-LD: LocalBusiness (Kempton Park, areaServed Gauteng + South Africa, phone, no equipment details), FAQPage, VideoObject
- [ ] sitemap.xml with `lastmod`; robots.txt; manifest
- [ ] A11y: token contrast check, heading order, landmarks, keyboard/focus, menu ARIA, form labels/errors, reduced motion, 200% zoom
- [ ] Perf: preload hero image and fonts, deferred JS, zero CLS, Lighthouse mobile ≥90 in all four categories
- Files: *.html, sitemap.xml, robots.txt, favicon/site.webmanifest, assets/css/site.css

### Phase 6 Test, fix, push
- [ ] Test at 360/768/1280/1920 px in Chrome, Firefox and Safari/iOS; check rendering with JS off
- [ ] W3C validation, link check, tel/WhatsApp/mailto links
- [ ] Live Web3Forms test: Tiaan receives it, and so does Anne-Marie (CC or forward)
- [ ] Grep for `[[CLIENT` (list the remainder for the client), equipment terms (must be zero) and links starting with `/` (must be zero)
- [ ] Record the Lighthouse report; fix regressions
- [ ] After user sign-off, merge `redesign` → `main` and push (this auto-publishes to Netlify and Pages; the MP4s leave the tree, history keeps them). Rollback: Netlify "Publish deploy" on `ae52975`, or `git revert`.
- [ ] Smoke-test **both** https://duranex-solutions.github.io/alsr-sa/ (favicons, links, form) and https://alsr-sa.com/ (Netlify rebuild, pretty URLs, canonicals)
- Files: as fixes require
