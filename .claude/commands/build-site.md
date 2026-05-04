# Build Site — Yoshi Labs

Build the Yoshi Labs landing page using the ElevenLabs design system (warm editorial, ElevenLabs-style from Refero).

## MANDATORY: READ THESE FIRST

1. Read `brief.json` — source of truth for all content (services, pricing, FAQ, about, portfolio)
2. Read `.claude/skills/refero-design-systems.yaml` — extract ElevenLabs section (lines 1402-1513 approximately)
3. Check `photos/` for available images

## DESIGN SYSTEM — ELEVENLABS

**Source:** https://elevenlabs.io / styles.refero.design
**Theme:** Light mode ONLY — warm, papery, editorial, near-zero saturation

### Colors
- Background: #fdfcfc (Eggshell) — warm near-white, NEVER pure #ffffff
- Secondary surface: #f5f3f1 (Powder) — hover states, subtle sections
- Borders: #e5e5e5 (Chalk) — ALL borders, dividers, card outlines
- Disabled/placeholder: #b1b0b0 (Fog)
- Secondary text: #777169 (Gravel) — warm stone undertone, nav items, captions
- Tertiary text: #a59f97 (Slate) — icon strokes, deemphasized labels
- Mid-tone text: #57534e (Cinder) — secondary headings
- Primary text: #000000 (Obsidian) — headings, CTA buttons (filled), logo
- Accent Signal Blue: #0447ff — RESERVED for 8-16px avatar/dots ONLY
- Accent Ember: #ff4704 — RESERVED for 8-16px avatar/dots ONLY

### Typography
- Primary: Inter (weights 300, 400, 500, 600 via Google Fonts)
- Mono: Geist Mono (weight 400) — for numbers, labels, annotations ONLY
- Display headings: Inter 300 with letter-spacing -0.02em for h1/h2 at 32px+
- Body: Inter 400/500, 0.01em tracking, never below 14px
- NEVER use a weight above 300 for display headlines

### Shapes
- Buttons: border-radius 9999px (pill buttons) — every button is a pill
- Tags/pills: border-radius 9999px
- Cards: border-radius 16-20px
- Input fields: border-radius 0px (bare)

### Shadows
- Card inset: rgba(0,0,0,0.075) 0px 0px 0px 0.5px inset — replaces borders on cards
- Button: rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 1px 2px 0px, rgba(0,0,0,0.04) 0px 2px 4px 0px
- NEVER use broad diffuse shadows or glow effects

### Rules
- NO saturated colors for text, backgrounds, or buttons
- NO pure white #ffffff backgrounds — always #fdfcfc
- NO blue/ember accents on anything larger than 16px
- Inter 300 for all headings 32px+, never heavier
- Warm papery editorial feel, not tech/SaaS
- Absolute black (#000000) for primary text

## SECTIONS
1. Navigation — Fixed, subtle backdrop. Logo left. Links center. Pill CTA right "Book a Call" (black bg, white text, 9999px).
2. Hero — Small eyebrow pill: "BUILDING IN DAVAO · OPEN FOR PROJECTS" with green dot. Headline: Inter 300 light, "Your business, online and automated." Two pill CTAs. Trust bar.
3. Problem — Strikethrough headline: "Most Filipino SMEs are invisible online getting left behind." 3 stat cards on Powder.
4. Services — 4 cards with inset shadow. Icon container, title, description, price.
5. How It Works — 4 steps with horizontal connecting line. Step numbers in small circles.
6. Portfolio — 3 project cards. Grayscale or CSS gradients. Hover: scale/border.
7. Pricing — Single featured card on Powder. ₱15,000 setup + ₱5,000/mo. Feature list. Black pill CTA.
8. About — Two column. Photo card 20px radius. Story text. Chips (pill): Davao-based · Filipino-Canadian · AI-powered.
9. FAQ — 7 questions. Accordion +/− toggle. Geist Mono for question numbers.
10. CTA — Powder background. "Ready to go digital?" + black pill CTA.
11. Footer — 3 columns. Brand + tagline, links, contact. Status dot.

## ANIMATIONS
- Staggered scroll reveal: data-delay offsets 0ms, 80ms, 160ms, 240ms, 320ms
- Counter animation on stats (77%, 3%, ₱30-50K) — IntersectionObserver trigger
- Text scramble on hero headline on load
- Magnetic buttons (max 4px displacement)
- FAQ accordion with smooth height
- Cursor spotlight on service cards (radial gradient, 0.06 opacity)
- Respect prefers-reduced-motion

## TECHNICAL
- Single HTML file, inline CSS and JS
- Google Fonts: Inter (300,400,500,600) + Geist Mono (400)
- Mobile responsive with hamburger menu
- Native smooth scroll (NOT position:fixed)
- Total file under 60KB

## OUTPUT
- Write to `site/index.html`
- Print: "Built Yoshi Labs — ElevenLabs editorial, {N} sections, mobile-first verified"
