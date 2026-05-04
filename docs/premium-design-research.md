# Premium Design Research — Yoshi Labs

## What Makes a Site Look Designed vs AI-Generated

The difference between a site that feels premium and one that feels "vibe-coded" is never the color palette. It's four things:

1. **Motion** — Interactions, not animations. Scroll reveals with stagger. Counters that animate up. Hover states that feel tactile. A static site, no matter how beautiful its colors, looks AI-generated.
2. **Photography** — Real or realistic photography that matches the brand's world. AI-generated images are fine for mockups but must follow the industry photography spec: lighting, composition, subject matter, color grading.
3. **Typography discipline** — Font pairings with purpose. Never generic Inter-only. Heading font and body font must contrast meaningfully (serif + sans, or geometric + humanist). Weight hierarchies: 300 for display, 400 for body, 500 for emphasis, 600+ only for micro-labels.
4. **Spacing rigor** — Consistent 4px grid. Generous whitespace. Section padding that breathes (5rem+ on mobile, 8rem+ on desktop). Content density that feels editorial, not crammed.

---

## Anti-Slop Rules (from anti-slop-design skill)

### Never
- Default blue (#3B82F6) as accent — dead giveaway of unstyled output
- Emojis in UI — instant cheapens the brand
- Lorem ipsum — no placeholder text survives to production
- Generic Inter-only — always pair heading + body fonts
- Bounce/spin/particle effects — motion must feel deliberate
- Gradient backgrounds on dark sites — looks like a template
- Center-aligned body text — editorial sites left-align everything

### Always
- Pill buttons (9999px radius) for agencies, sharp (6px) for SaaS, 16px for service businesses
- Subtle noise/grain overlay (opacity 0.02-0.035) on backgrounds
- Inset shadows instead of visible borders on light backgrounds
- Staggered scroll reveals with 80ms delay between elements
- Magnetic buttons (4px max displacement) on hover
- Cursor spotlight (radial gradient) within cards
- Custom class names that never collide with Tailwind utilities

---

## Refero Quality Benchmarks

### What Refero Provides
The 84KB `refero-design-systems.yaml` contains extracted design tokens from 20 world-class production sites. Each system includes:
- Exact hex codes with semantic roles (bg, text, accent, border, success, warning)
- Typography with font families, weights, letter-spacing, type scale
- Spacing tokens — base unit, density, section padding
- Shape tokens — border radii, shadow formulas, inset rules
- Dos/Donts extracted from observing the real production site

### Quality Tiers

**Tier 1 — Agency Benchmark (use for creative-agency builds)**
- ElevenLabs: Warm editorial, Inter 300, pill buttons, near-zero saturation
- monopo saigon: Shifting gradient depths, bold creative energy
- Superhuman: Cinematic cockpit, experience-focused

**Tier 2 — Trust/Conversion (use for service businesses)**
- Stripe: Structured warmth, off-white + gold, clear hierarchy
- Anthropic: Research journal, warm paper, scholarly
- Linear: Midnight command center, data-driven, precise

**Tier 3 — Minimal/Gallery (use for visual-first businesses)**
- Minimalissimo: White gallery canvas, photography-led
- Cursor: Warm ivory software studio, clean
- Perplexity AI: Ivory desk with graphite tools

---

## Animation Standards

Every site must include these interactions before being considered complete:

1. **Scroll-triggered reveals** — Elements fade + slide up as they enter viewport. 80ms stagger between children. Use Intersection Observer, not scroll event listener.
2. **Counter animation** — Stats count up from 0 over 1.5s with easeOutExpo when scrolled into view.
3. **At least one "wow" moment** — Text scramble, counter animation, or cursor effect in the hero section.
4. **Magnetic buttons** — CTAs subtly displace toward cursor on hover (max 4px, spring back on exit).
5. **FAQ accordion** — Expand/collapse with smooth max-height transition (0.35s ease).
6. **Noise overlay** — Film grain texture at opacity 0.02-0.035 on all background surfaces.

### Animation Engine
The interaction library at `.claude/skills/interaction-library/scripts/animation-engine.js` provides:
- `data-sr` — Scroll reveal with stagger
- `data-counter` — Animated counter
- `data-carousel` — Testimonial/image carousel
- `data-parallax` — Subtle parallax on scroll
- `data-scramble` — Text scramble effect
- `data-magnetic` — Magnetic button hover
- `data-spotlight` — Cursor spotlight on cards

---

## Photography Direction by Industry

### Creative Agency
Editorial, cinematic, human-centered. Natural window-lit lighting. People working, screens with AI output, team collaboration, Davao cityscapes. Golden hour warmth.

### Salon / Beauty
Bright, beauty-forward. Soft diffused ring-light aesthetic. Close-ups of hair/skin/nails. Portrait orientation.

### Restaurant / Cafe
Warm, inviting, food-forward. Natural light, shallow depth of field. Plated dishes, interior ambiance, chefs at work.

### Real Estate
Bright, airy, spacious. Wide-angle lens. Clean lines. Property exteriors, key rooms, neighborhood context.

### Medical / Dental
Clean, clinical, trustworthy. Even lighting. Equipment shots, doctor portraits, facility interiors.

### Law Firm
Professional, authoritative. Studio-lit portraits. Office interiors, legal documents (stylized), city skyline.

### Construction / Repair
Technical, process-focused. Natural/industrial lighting. Work in progress, completed projects, tools/materials.

---

## PH Market Context

### What PH SMEs Actually Want
- Mobile-first: 90%+ of their customers browse on phone
- Messenger-ready: Facebook Messenger is the primary business communication channel
- Payment integration: GCash, Maya, bank transfer
- Taglish support: Filipino-English hybrid in chatbot responses
- "Po/opo" respect markers in automated messages
- Google Maps presence: Customers navigate by landmark, not address
- DTI registration as trust signal

### Price Psychology
- ₱2,499/mo = "affordable upgrade" (below daily minimum wage threshold psychologically)
- ₱4,999/mo = "serious investment" (needs clear ROI justification)
- ₱15,000 setup = "one-time project cost" (acceptable for established businesses)
- Free consultation = removes friction for first contact

---

## Build Quality Checklist

Before any site ships, verify:
- [ ] No default blue (#3B82F6) anywhere
- [ ] No emojis in production code
- [ ] Font pairing from industry model (not Inter-only)
- [ ] Custom class names (no Tailwind utility collisions)
- [ ] Mobile tested at 375px, 390px, 414px, 430px
- [ ] Scroll reveals with stagger on all sections
- [ ] At least one counter animation
- [ ] Magnetic hover on all CTAs
- [ ] Noise overlay at 0.02-0.035 opacity
- [ ] FAQ accordion with smooth expand
- [ ] Total file weight under 2MB
- [ ] QA score 90+
- [ ] Vercel deploy confirmed
