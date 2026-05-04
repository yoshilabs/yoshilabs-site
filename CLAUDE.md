# CLAUDE.md — Yoshi Labs Fulfillment Pipeline v3

## WHAT THIS IS
Client website delivery pipeline for Yoshi Labs (AI agency, Davao City PH).
Builds premium, non-generic websites for Filipino SMEs.

## PRODUCT TIERS
- **Starter** ₱15K setup + ₱5K/mo: Website + AI chatbot + lead capture
- **Pro** ₱15K setup + ₱5K/mo+: Starter + auto-booking + SMS follow-ups + Google Business Profile

## HOW TO BUILD A SITE (8 steps, gated)
1. `validate-brief.sh` — abort on fail [GATE]
2. Load industry model from `.claude/skills/industry-designs/models/{industry}.yaml` → SECTION STRUCTURE
3. Load Refero Reference Library principles via `/reference` → VISUAL DNA (color, typography, layout, interaction, composition)
4. Load animation engine from `.claude/skills/interaction-library/scripts/animation-engine.js`
5. Build `site/index.html` — single file, all CSS/JS inline. **MUST follow ALL 11 Mobile-First Build Laws below.**
6. Run QA — must score 90+
7. `qa-gate.sh` — block deploy on fail [GATE]
8. Deploy to Vercel: `npx vercel --prod --yes`

---

## DESIGN SYSTEM — Two Layers

### Layer 1: Industry Models (WHAT sections exist)
13 YAML files in `.claude/skills/industry-designs/models/`:
accounting, bakery, construction, creative-agency, dental, gym, law-firm,
real-estate, repair, restaurant, salon, tutorial, veterinary

Each defines: core emotion, visual voice, motion style, typography options,
color system (60-30-10), component styling, photography direction,
section structure, CTA strategy, competitor references, local PH context.

### Layer 2: Refero Reference Library (HOW sections look)
17 files across 6 categories in `.claude/skills/refero/reference-library/`:
- color/ — warm-trust, dark-premium, gallery-minimal, bold-brand
- typography/ — editorial-headings, technical-display, warm-body
- layout/ — editorial-spacing, dashboard-density, gallery-rhythm
- interaction/ — cinematic-motion, utility-snappy, warm-hover
- composition/ — hero-patterns, card-systems, cta-patterns
- master-index.yaml — decision tree + how to combine

Use `/reference <category> <file>` during builds to load principles.
These are universal design rules extracted from 40 world-class production sites
via styles.refero.design — not company-specific themes.

### Build Decision Tree (apply every time)
```
Industry Model → SECTION STRUCTURE
  +
Reference Library → VISUAL DNA:
  1. COLOR: Based on mood → warm-trust / dark-premium / gallery-minimal / bold-brand
  2. TYPOGRAPHY: Based on content → editorial-headings / technical-display + warm-body
  3. LAYOUT: Based on density → editorial-spacing / dashboard-density / gallery-rhythm
  4. INTERACTION: Based on energy → cinematic-motion / utility-snappy / warm-hover
  5. COMPOSITION: Always applied → hero-patterns + card-systems + cta-patterns
```

---

## MOBILE-FIRST BUILD LAWS (HARDCODED — NON-NEGOTIABLE)

Every site must pass all breakpoints: **375px (iPhone SE), 390px (iPhone 14), 414px (iPhone 11/XR), 430px (iPhone 14 Pro Max), 768px (iPad mini), 1024px (iPad Pro).**

### LAW 1 — Typography Auto-Scaling
ALL heading font-sizes MUST use clamp() with a mobile minimum.
MINIMUM MOBILE SIZES:
  H1: clamp(1.75rem, 8vw, 4.5rem)   — 28px minimum
  H2: clamp(1.5rem, 5vw, 2.75rem)   — 24px minimum
  H3: clamp(1.125rem, 2.5vw, 1.5rem) — 18px minimum
  Body: 15px minimum at 375px
  Small/caption: 12px minimum — never below
If heading wraps to 3+ lines at 375px, reduce the clamp minimum.

### LAW 2 — Touch Targets
ALL interactive elements (buttons, links, accordion triggers, nav items) MUST be at least:
  Width: 44px minimum, Height: 44px minimum
  Gap between adjacent touch targets: 8px minimum
Applies to: mobile nav links, hamburger menu bars, service cards, CTA buttons, accordion question rows, footer links.

### LAW 3 — Button Stacking
At 375-430px:
  ALL button groups (hero CTAs, booking actions, card actions) MUST stack vertically.
  ALL buttons in a stack MUST be 100% width.
  Max 2 buttons in a hero stack. If 3 exist, combine the weakest two.
  Use: `@media (max-width: 480px) { .hero-actions { flex-direction: column; } .hero-actions .btn-primary, .hero-actions .btn-ghost { width: 100%; justify-content: center; } }`

### LAW 4 — No Horizontal Scroll (EVER)
Body must have: overflow-x: hidden
All images: max-width: 100%
All pre/code blocks: max-width: 100%; overflow-x: auto
All tables: max-width: 100%; overflow-x: auto
All grid containers: max-width: 100vw
No element may exceed 100vw at any breakpoint.

### LAW 5 — Section Spacing
Default desktop padding: clamp(4rem, 8vw, 7rem) top and bottom
At 375px: minimum 3.5rem top, 3rem bottom
Last section before footer: extra 2rem bottom padding
Adjacent sections with same background: reduce gap to 0.

### LAW 6 — Grid Collapse
All multi-column grids MUST collapse to 1 column at 375-430px:
  - Services grid: 1 col mobile, 2 col at 640px+, 3 col at 1024px+
  - Testimonials: 1 col mobile, 2 col at 768px+, 3 col at 1024px+
  - Contact cards: 1 col at 375-480px, 2 col at 480px+
  - Stats bar: 2 col at 375px, 4 col at 768px+
  - Footer: 1 col at 375px, 2 col at 480px+, 3 col at 768px+
Never show 3-column grid below 1024px. Never show 2-column grid below 640px (except stats bar).

### LAW 7 — Navigation
Desktop (1024px+): Horizontal nav links visible. Hamburger hidden.
Tablet/Mobile (<1024px): Hamburger menu visible. Nav links hidden.
  Mobile menu overlay: full-width, slides down from top of nav.
  Menu links: 16px+ font size, 1rem+ vertical padding, bottom border separator.
  Menu CTA: full-width, prominent, at bottom of menu.
  Close on link click + close on outside tap.
  Menu button: 44x44px minimum, bordered square with 3-line icon.

### LAW 8 — WhatsApp Float Button
Position: fixed, bottom: 1.5rem, right: 1.5rem
Size: 56px x 56px minimum (meets 44px touch target)
Color: #25D366 (WhatsApp green), z-index: 9999
At 375px: bottom: 1rem, right: 1rem to avoid covering content
Add 16px bottom padding to body or last section so button doesn't cover footer links.

### LAW 9 — Hero Visual Scaling
Desktop: max-width 480px, aspect-ratio 4/5
Tablet (<1024px): max-width 320px, aspect-ratio 1/1
Phone (<480px): max-width 260px, centered
Floating badges: hidden below 480px (they overlap text)

### LAW 10 — Image/Illustration Constraints
All images must have explicit max-width: 100% and height: auto.
SVG illustrations: must use viewBox, never fixed width/height.
No image may force the page wider than 100vw.
Background images on mobile: use background-size: cover, not contain.
No fixed widths above 430px without a mobile override.

### LAW 11 — Overlay Elements on Illustrations
NEVER trap text-heavy elements (badges, credential pills, name tags) inside
small illustration containers that shrink on mobile.

Desktop: overlay pills on illustrations are fine (ample space).
Mobile (<480px): ALL overlay pills inside illustrations/visuals MUST be
  hidden (display: none) and replaced with a standalone element below the
  illustration — full-width card, proper padding, no overlapping.

This applies to: credential badges on doctor avatars, "years of experience"
pills on hero visuals, any text overlay on an SVG illustration or photo container.

Pattern:
  Desktop: .overlay-pill { display: flex; }  -- inside illustration
  Mobile:  .overlay-pill { display: none; }  -- hidden
           .overlay-standalone { display: flex; }  -- full card below

The standalone version gets REAL spacing (1.25rem+ padding, 44px icon,
full readable font sizes). It never re-shrinks.

---

## CRITICAL RULES
- **Single HTML file** — no build tools, no npm, no frameworks
- **Mobile-first** — must pass ALL 11 LAWS above
- **Total weight under 2MB**
- **No default blue (#3B82F6) or purple (#6C5CE7)** — follow Reference Library colors
- **No generic Inter-only** — pair fonts from industry model or Reference Library
- **No emoji, no Lorem ipsum, no placeholder text**
- **No bounce/spin/particle effects** — follow Reference Library interaction rules
- **Include animation engine** in every site — use data-sr, data-counter, data-carousel
- **Custom class names** — never use `.h-1`, `.h-2`, `.w-1`, `.p-1` etc. (collisions with Tailwind). Use `.heading-1`, `.heading-2`, `.section-title`.
- **No data-text-split on headings with inline HTML** (span/em/strong/a tags) — renders raw code
- **No saturated colors on backgrounds** — universal Refero rule
- **Accent used sparingly** — CTAs and active states only
- **Noise overlay (0.02-0.035 opacity)** — on all pages
- **Never use Unsplash placeholder photos** — use CSS gradients or SVG illustrations
- **Never read CLAUDE.md from parent directories** — project self-contained
- **Claude Code must run from the CLIENT directory** (e.g., `clients/smile-zone-dental/`), not the repo root

## CLIENT FOLDER STRUCTURE
```
clients/{slug}/
├── meta.json              ← 14-stage state machine + timestamps + deploy URLs
├── lead.json              ← Hermes raw scrape (immutable)
├── brief.json             ← Source of truth + validated
├── design-decisions.json  ← 5-axis design DNA
├── photos/                ← mockup/ (AI) + production/ (real)
├── brand-assets/          ← UPLOADED BY CLIENT POST-CLOSE
├── mockup/index.html      ← Outreach preview
├── site/index.html        ← Production site
├── chatbot/knowledge-base.json
└── outreach/message.txt
```

## DEPLOYMENT
- Vercel (free tier, HTTPS, permanent URLs)
- Command: `npx vercel --prod --yes`
- Preview deploys for mockups, production deploys for live sites
- Run `./qa-gate.sh` BEFORE deploy — score <75 blocks deploy

## SUPPORTING FILES
- `brief-schema.json` — authoritative schema, 27 industry enum
- `docs/brand-structure-system.md` — V3 design system documentation (407 lines)
- `docs/premium-design-research.md` — anti-slop rules, animation standards, photography
- `clients/_template/meta.json` — 14-stage state machine template
- `.gitignore` — blocks local settings, node_modules, Vercel, credentials
- `.claude/commands/build-site.md` — full build pipeline with 11 laws (manual slash command)
