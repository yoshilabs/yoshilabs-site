# Build Site — Yoshi Labs

Build the client website. **Do NOT use colors or fonts from project CLAUDE.md.** This build follows the industry model structure + Refero visual DNA. The industry model defines **WHAT** sections exist. Refero defines **HOW** they look.

---

## PIPELINE (strict sequential — abort on any step failure)

### Step 0 — Validate Brief
```bash
./validate-brief.sh
```
**ABORT ON FAILURE.** Do not proceed if the brief is invalid.

### Step 1 — Load Source Data
Read both files into context:
- `brief.json` — source of truth for all content (services, pricing, FAQ, about, portfolio, photos)
- `brief-schema.json` — schema validation reference

### Step 2 — Load Industry Model (MANDATORY STRUCTURE)
```
.claude/skills/industry-designs/models/{industry}.yaml
```
This defines **WHAT** sections exist on the page — their names, order, required elements, content mapping, and layout rules. The industry is determined from `brief.json`.

**THIS IS NOT OPTIONAL.** Every section must map to an entry in the industry model.

### Step 3 — Load Refero Design System (MANDATORY VISUAL DNA)
```
.claude/skills/refero-design-systems.yaml
```
Use the **style mapped to the industry** in `refero-vertical-mapping.yaml`. This defines **HOW** every element looks — colors, type scale, spacing tokens, border radii, shadow rules, and component dos/don'ts.

**THIS IS NOT OPTIONAL.** Do not invent colors or fall back to defaults. Extract the Refero style block and apply it wholesale.

### Step 4 — Load Animation Engine
```
.claude/skills/interaction-library/scripts/animation-engine.js
```
Provides `data-sr`, `data-counter`, `data-carousel`, and other animation primitives. Include inline in the final site.

### Step 5 — Build Site
Write **single file** `site/index.html` with all CSS and JS inline. Follow the **MOBILE-FIRST BUILD LAWS** below exactly.

### Step 6 — QA Check
Run the quality assurance check. **Must score 90+** before proceeding.

### Step 7 — QA Gate
```bash
./qa-gate.sh
```
**BLOCKS DEPLOY ON FAILURE.** Fix issues and re-run until it passes.

### Step 8 — Deploy
```bash
npx vercel --prod --yes
```

---

## MOBILE-FIRST BUILD LAWS (HARDCODED — NON-NEGOTIABLE)

Every site must pass all breakpoints: **375px (iPhone SE), 390px (iPhone 14), 414px (iPhone 11/XR), 430px (iPhone 14 Pro Max), 768px (iPad mini), 1024px (iPad Pro).**

### LAW 1 — Typography Auto-Scaling
```
ALL heading font-sizes MUST use clamp() with a mobile minimum.
MINIMUM MOBILE SIZES:
  H1: clamp(1.75rem, 8vw, 4.5rem)   — 28px minimum
  H2: clamp(1.5rem, 5vw, 2.75rem)   — 24px minimum
  H3: clamp(1.125rem, 2.5vw, 1.5rem) — 18px minimum
  Body: 15px minimum at 375px
  Small/caption: 12px minimum — never below
```
Never use a clamp() where the minimum is larger than what fits at 375px. If heading wraps to 3+ lines at 375px, reduce the clamp minimum.

### LAW 2 — Touch Targets
```
ALL interactive elements (buttons, links, accordion triggers, nav items) MUST be at least:
  Width: 44px minimum
  Height: 44px minimum
  Gap between adjacent touch targets: 8px minimum
```
This applies to mobile nav links, hamburger menu bars, service cards, CTA buttons, accordion question rows, and footer links.

### LAW 3 — Button Stacking
```
At 375-430px:
  ALL button groups (hero CTAs, booking actions, card actions) MUST stack vertically.
  ALL buttons in a stack MUST be 100% width.
  Max 2 buttons in a hero stack. If 3 exist, combine the weakest two.
```
Never put two buttons side-by-side below 430px — they will overflow or pinch.

### LAW 4 — No Horizontal Scroll (EVER)
```
Body must have: overflow-x: hidden
All images: max-width: 100%
All pre/code blocks: max-width: 100%; overflow-x: auto
All tables: max-width: 100%; overflow-x: auto
All grid containers: max-width: 100vw
No element may exceed 100vw at any breakpoint.
```
Test at exactly 375px. If horizontal scrollbar appears, fix before committing.

### LAW 5 — Section Spacing
```
Default desktop padding: clamp(4rem, 8vw, 7rem) top and bottom
At 375px: minimum 3.5rem top, 3rem bottom
Last section before footer: extra 2rem bottom padding
Adjacent sections with same background: reduce gap to 0 (merge visually)
```

### LAW 6 — Grid Collapse
```
All multi-column grids MUST collapse to 1 column at 375-430px.
  - Services grid: 1 col mobile, 2 col at 640px+, 3 col at 1024px+
  - Testimonials: 1 col mobile, 2 col at 768px+, 3 col at 1024px+
  - Contact cards: 1 col at 375-480px, 2 col at 480px+
  - Stats bar: 2 col at 375px, 4 col at 768px+
  - Footer: 1 col at 375px, 2 col at 480px+, 3 col at 768px+
```
Never show a 3-column grid below 1024px. Never show a 2-column grid below 640px (except stats bar: 2 col is fine at 375px since cards are small).

### LAW 7 — Navigation
```
Desktop (1024px+): Horizontal nav links visible. Hamburger hidden.
Tablet/Mobile (< 1024px): Hamburger menu visible. Nav links hidden.
  Mobile menu overlay: full-width, slides down from top of nav.
  Menu links: 16px+ font size, 1rem+ vertical padding, bottom border separator.
  Menu CTA: full-width, prominent, at bottom of menu.
  Close on link click + close on outside tap.
  Menu button: 44x44px minimum, bordered square with 3-line icon.
```

### LAW 8 — WhatsApp Float Button
```
Position: fixed, bottom: 1.5rem, right: 1.5rem
Size: 56px x 56px minimum (meets 44px touch target)
Color: #25D366 (WhatsApp green)
z-index: 9999
At 375px: bottom: 1rem, right: 1rem to avoid covering content
Add 16px bottom padding to body or last section so button doesn't cover footer links.
```

### LAW 9 — Hero Visual Scaling
```
Desktop: max-width 480px, aspect-ratio 4/5
Tablet (< 1024px): max-width 320px, aspect-ratio 1/1
Phone (< 480px): max-width 260px, centered
Floating badges: hidden below 480px (they overlap text)
```

### LAW 10 — Image/Illustration Constraints
```
All images must have explicit max-width: 100% and height: auto.
SVG illustrations: must use viewBox, never fixed width/height.
No image may force the page wider than 100vw.
Background images on mobile: use background-size: cover, not contain.
```

---

## DESIGN AUTHORITY

| Concern | Source | Role |
|---|---|---|
| **Structure** (what sections exist) | Industry model `.yaml` | MANDATORY |
| **Visual DNA** (how it looks) | Refero style block | MANDATORY |
| **Mobile behavior** (responsive rules) | MOBILE-FIRST LAWS above | HARDCODED |
| **Content** (text, pricing, images) | `brief.json` | Source of truth |
| **Interaction** (animations, reveals) | `animation-engine.js` | Included inline |

**Under no circumstances** should colors, fonts, or spacing be pulled from `CLAUDE.md`, personal preference, or generic defaults. The pipeline is self-contained: industry model + Refero + brief + Mobile Laws.

---

## OUTPUT
After a successful build, print:
```
Built {Business Name} — {industry} site, Refero {style_name}, {N} sections, QA {score}%, deployed to Vercel
```
