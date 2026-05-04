# /reference — Load Refero Design Principles

## What This Does
Loads curated design principles from the Refero Reference Library during a build.
Does NOT load a full company-specific design system. Loads universal principles
extracted across all 40 Refero styles, organized by design dimension.

## Usage
```
/reference <category> <file>
```

## Categories & Files

### Color
- `/reference color warm-trust` — Warm off-whites, black text, natural stone/paper undertones. For service businesses, hospitality, agencies.
- `/reference color dark-premium` — Near-black base, layered dark grays, single accent. For SaaS, fintech, tools.
- `/reference color gallery-minimal` — White dominant, photos carry color, very low contrast chrome. For photography, real estate.
- `/reference color bold-brand` — High contrast, saturated accent pops, dramatic shifts. For gyms, repair, construction.

### Typography
- `/reference typography editorial-headings` — Light weight (300-400), negative tracking, serif/humanist sans. For agencies, salons, law firms.
- `/reference typography technical-display` — Monospace + geometric sans, tabular figures. For construction, tools, engineering.
- `/reference typography warm-body` — 16px+, 1.65-1.75 line-height, never bold body. For restaurants, clinics, bakeries.

### Layout
- `/reference layout editorial-spacing` — 5-8rem sections, 1200px max, content breathes like a magazine.
- `/reference layout dashboard-density` — 3-4rem sections, multi-column, cards carry data weight.
- `/reference layout gallery-rhythm` — Image-led grids, minimal text, photos dictate pace.

### Interaction
- `/reference interaction cinematic-motion` — Atmospheric, 0.5-0.8s, parallax, grain. For salons, hospitality, experiential brands.
- `/reference interaction utility-snappy` — 0.15-0.3s, functional, no drama. For repair, tools, construction.
- `/reference interaction warm-hover` — Gentle paper-like feedback, 0.3-0.5s. For restaurants, clinics.

### Composition
- `/reference composition hero-patterns` — 4 hero types: editorial, command, image-led, minimal.
- `/reference composition card-systems` — 5 card types: service, pricing, portfolio, testimonial, team.
- `/reference composition cta-patterns` — Primary, secondary, sticky, section — conversion patterns.

## How to Execute
When this command is called during a build, Claude Code should:

1. Read `.claude/skills/refero/reference-library/master-index.yaml` for the decision tree
2. Read the specific reference file: `.claude/skills/refero/reference-library/{category}/{file}.yaml`
3. Apply the principles as CONSTRAINTS — these override generic defaults
4. Document which references were used in the QA report

## Build Decision Tree
```
Industry model (section structure) + 5-axis Reference:
  1. COLOR: Based on mood → warm-trust / dark-premium / gallery-minimal / bold-brand
  2. TYPOGRAPHY: Based on content type → editorial-headings / technical-display + warm-body
  3. LAYOUT: Based on density → editorial-spacing / dashboard-density / gallery-rhythm
  4. INTERACTION: Based on energy → cinematic-motion / utility-snappy / warm-hover
  5. COMPOSITION: Always applied → hero-patterns + card-systems + cta-patterns
```

## Example Build Pipeline
```
/build-site creative-agency:
  1. validate-brief.sh
  2. Load industry-designs/models/creative-agency.yaml → SECTION STRUCTURE
  3. /reference color warm-trust → ElevenLabs+Anthropic+Superhuman palettes
  4. /reference typography editorial-headings → Light weight, negative tracking rules
  5. /reference layout editorial-spacing → 5-8rem sections, breathes
  6. /reference interaction cinematic-motion → Atmospheric reveals, grain
  7. /reference composition hero-patterns → editorial_hero type
  8. /reference composition card-systems → service+pricing+portfolio cards
  9. /reference composition cta-patterns → Pill CTAs, magnetic hover
  10. Build site/index.html
  11. QA check → must score 90+
  12. qa-gate.sh
  13. Vercel deploy
```
