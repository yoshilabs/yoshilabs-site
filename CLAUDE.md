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
5. Build `site/index.html` — single file, all CSS/JS inline
6. Run QA — must score 90+
7. `qa-gate.sh` — block deploy on fail [GATE]
8. Deploy to Vercel: `npx vercel --prod --yes`

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

## CRITICAL RULES
- **Single HTML file** — no build tools, no npm, no frameworks
- **Mobile-first** — test at 375px, 390px, 414px, 430px
- **Total weight under 2MB**
- **No default blue (#3B82F6)** — follow Reference Library colors
- **No generic Inter-only** — pair fonts from industry model or Reference Library
- **No emoji, no Lorem ipsum, no placeholder text**
- **No bounce/spin/particle effects** — follow Reference Library interaction rules
- **Include animation engine** in every site — use data-sr, data-counter, data-carousel
- **Custom class names** — never use `.h-1`, `.h-2` etc. (collisions with Tailwind)
- **No saturated colors on backgrounds** — universal Refero rule
- **Accent used sparingly** — CTAs and active states only
- **Noise overlay (0.02-0.035 opacity)** — on all pages

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

## SUPPORTING FILES
- `brief-schema.json` — authoritative schema, 27 industry enum
- `docs/brand-structure-system.md` — V3 design system documentation (407 lines)
- `docs/premium-design-research.md` — anti-slop rules, animation standards, photography
- `clients/_template/meta.json` — 14-stage state machine template
- `.gitignore` — blocks local settings, node_modules, Vercel, credentials
