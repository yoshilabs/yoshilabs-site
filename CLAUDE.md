# CLAUDE.md — Yoshi Labs Fulfillment Pipeline v2

## WHAT THIS IS
Client website delivery pipeline for Yoshi Labs (AI agency, Davao City PH).
Builds premium, non-generic websites for Filipino SMEs.

## PRODUCT TIERS
- **Starter** ₱2,499/mo: Website + AI chatbot + lead capture
- **Pro** ₱4,999/mo: Starter + auto-booking + SMS follow-ups + Google Business Profile

## HOW TO BUILD A SITE
1. Read `clients/{slug}/brief.json` — source of truth for all client data
2. Load industry model from `.claude/skills/industry-designs/models/{vertical}.yaml`
3. Load animation engine from `.claude/skills/interaction-library/scripts/animation-engine.js`
4. Build `clients/{slug}/site/index.html` — single file, all CSS/JS inline
5. Run QA — must score 90+ before shipping
6. Deploy to Vercel

## CRITICAL RULES
- **Single HTML file** — no build tools, no npm, no frameworks
- **Mobile-first** — test at 375px, 390px, 414px, 430px
- **Total weight under 2MB**
- **No default blue (#3B82F6)** — follow industry model colors
- **No generic Inter-only** — pair heading + body fonts from model
- **No emoji, no Lorem ipsum, no placeholder text**
- **No bounce/spin/particle effects**
- **Include animation engine** in every site — use data-sr, data-counter, data-carousel
- **Custom class names** — never use `.h-1`, `.h-2` etc. (conflicts with Tailwind utilities)

## DESIGN SYSTEM
- **12 industry models** in `.claude/skills/industry-designs/models/`
- **20 Refero world-class design systems** in `.claude/skills/refero-design-systems.yaml` — extracted from real product screens (Linear, Stripe, Anthropic, Cursor, Mercury, etc.)
- **Brand Structure System v3** in `docs/brand-structure-system.md`
- **Premium research** in `docs/premium-design-research.md`
- **Anti-slop rules** in `.claude/skills/anti-slop-design/rules/`

## WHEN TO USE Refero vs Industry Models
- Use **industry models** as the primary design system for each vertical (salon, dental, restaurant, etc.)
- Use **Refero** as a quality benchmark — when a client's existing branding is minimal, extract a Refero system and adapt it for PH context
- Refero systems include real dos/donts, color usage rules, spacing tokens, and type scales from production sites
- The `refero-design-systems.yaml` file is readable by Claude Code during builds — include it in prompts when you want world-class reference quality

## CLIENT FOLDER STRUCTURE
```
clients/{slug}/
├── brief.json          ← Source of truth
├── photos/             ← Stock/downloaded images
├── site/index.html     ← The deliverable
└── qa-report.json      ← QA results
```

## DEPLOYMENT
- Vercel (free tier, HTTPS, permanent URLs)
- Command: `npx vercel --prod --yes`
