You are building a production website for a real Filipino business.

## MANDATORY: READ THESE FIRST

1. Read `brief.json` — this is the source of truth. Every piece of client data comes from here.
2. Read the industry design model at `.claude/skills/industry-designs/models/{vertical}.yaml` — match `brief.json.business_type` to the correct file. Copy the EXACT hex codes, font names, and specifications.
3. List all files in `/photos/` and `/brand-assets/` — these are the client's images.
4. Check `brief.json.brand.primary_color` — if set, this overrides the model's primary color.
5. Read `.claude/skills/interaction-library/SKILL.md` — for animation patterns to include.

## DO NOT START CODING UNTIL ALL 5 ARE READ.

---

## STEP 1: SETUP DESIGN TOKENS

Create CSS custom properties. Every value must trace to either the industry design model or brief.json.

```css
:root {
  /* Copy ALL colors from the model's color_system — neutrals, primary, accent, CTA */
  /* Use the full 10-shade ramps, not just the base color */
  --c-text: /* model neutrals[0] */;
  --c-text-2: /* model neutrals[1] */;
  --c-text-3: /* model neutrals[2] */;
  --c-muted: /* model neutrals[3] */;
  --c-border: /* model neutrals[4] */;
  --c-divider: /* model neutrals[5] */;
  --c-bg-3: /* model neutrals[6] */;
  --c-card: /* model neutrals[7] */;
  --c-bg-2: /* model neutrals[8] */;
  --c-bg: /* model neutrals[9] */;
  /* Primary 10-shade ramp */
  --c-primary-darkest: /* model primary[0] */;
  --c-primary-dark: /* model primary[1] */;
  --c-primary-deep: /* model primary[2] */;
  --c-primary: /* model primary[3] */;
  --c-primary-light: /* model primary[4] */;
  --c-primary-lighter: /* model primary[5] */;
  --c-primary-pale: /* model primary[6] */;
  --c-primary-tint: /* model primary[7] */;
  --c-primary-wash: /* model primary[8] */;
  --c-primary-ghost: /* model primary[9] */;
  /* Accent 10-shade ramp (if model has one) */
  /* Typography */
  --serif: /* model heading font */, Georgia, serif;
  --sans: /* model body font */, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  /* Spacing */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --r-sm: 6px;
  --r-md: 12px;
  --r-lg: 20px;
  --r-xl: 28px;
  --shadow-soft: 0 1px 2px rgba(0,0,0,.04), 0 6px 16px rgba(0,0,0,.06);
  --shadow-lift: 0 8px 22px rgba(0,0,0,.08), 0 24px 60px rgba(0,0,0,.10);
}
```

IF `brief.json.brand.primary_color` is set → replace primary color ramp with that value as base.

## STEP 2: PREPARE IMAGES

For each image in `/photos/` or `/brand-assets/photos/`:
- Use the highest quality image available
- Hero image: prefer landscape orientation, largest file
- If brand-assets photos exist, use those over stock photos
- Embed as base64 data URIs in the HTML (single file output)

## STEP 3: BUILD THE HTML

Write a SINGLE file: `/site/index.html`

Structure (build each section completely before moving to the next):

### <head>
- charset UTF-8
- viewport meta: `width=device-width, initial-scale=1.0, viewport-fit=cover`
- theme-color meta matching primary color
- SEO title from brief.json
- Meta description (150-160 chars)
- Open Graph tags: og:title, og:description, og:image, og:type, og:locale="en_PH"
- Google Fonts <link> for heading + body fonts
- Schema.org JSON-LD (LocalBusiness or correct type)
- <style> block with ALL CSS custom properties and styles
- NO Tailwind CDN — write custom CSS. This produces smaller, faster, more distinctive sites.

### <nav> — Sticky Navigation
- Fixed position, z-index 100
- Logo mark + business name (left)
- Desktop: horizontal section links (hidden on mobile)
- CTA button (right side)
- Hamburger toggle for mobile (3-line icon)
- Mobile: slide-in menu from right
- Transparent on top, blur+shadow on scroll

### <section id="hero"> — Hero Banner
- Full viewport height (min-height: 100vh)
- Background image with dark overlay (rgba 0.4-0.6)
- Headline: serif font, large, with the tagline from brief
- Subheadline: 1 line about the business
- Primary CTA + secondary CTA
- **Stats strip at bottom** (if applicable to industry)

**CRITICAL MOBILE HERO PATTERN:**
```css
@media(max-width:680px){
  .hero{padding:104px 0 0;min-height:auto;display:block}
  .hero-content{padding:0 20px;max-width:100%;text-align:left}
  .hero h1{font-size:2.25rem;line-height:1.08;margin-bottom:18px}
  .hero-ctas{flex-direction:column;gap:10px;align-items:stretch;width:100%}
  .hero-ctas .btn{width:100%;justify-content:center;padding:14px 20px}
  .hero-strip{position:relative;bottom:auto;background:var(--c-primary-darkest);padding:28px 20px;margin-top:48px}
  .hero-strip-inner{grid-template-columns:repeat(2,1fr);gap:18px 14px}
  .hero-stat{padding:14px 8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px}
  .hero-stat-num{font-size:1.65rem;margin-bottom:4px}
  .hero-stat-label{font-size:9.5px;letter-spacing:.1em;line-height:1.3;word-break:keep-all}
}
@media(max-width:380px){
  .hero h1{font-size:2rem}
  .hero-content{padding:0 18px}
  .hero-strip{padding:24px 16px}
  .hero-stat-num{font-size:1.45rem}
  .hero-stat-label{font-size:9px}
}
```

### <section id="services"> — Services Grid
- Section eyebrow (small uppercase label)
- Section heading (serif font)
- Grid layout: desktop per model, 2-col tablet, 1-col mobile
- Each service card: icon or number, name, description, price if available
- Card style: subtle background, no border+shadow combo
- Hover: card-lift effect

### <section id="about"> — About Section
- Split layout: image left, text right (stacks on mobile)
- Trust signals: years, customers, certifications
- Image with subtle decorative element (offset border, shadow)

### <section id="listings"> or <section id="gallery"> — Properties/Work
- Grid of featured items with photos
- Each card: image, title, price/tag, location if applicable
- Hover: image zoom + shadow lift
- "View details" link per card

### <section id="testimonials"> — Social Proof
- Carousel with auto-play (5s intervals)
- Quote, reviewer name, star rating
- Navigation dots
- Left/right arrows on desktop

### <section id="faq"> — FAQ Accordion
- Common questions for the industry
- Click to expand/collapse with smooth height animation
- Chevron icon rotation

### <section id="contact"> — Contact Section
- Two-column: contact info left, CTA card right (stacks mobile)
- WhatsApp link (fastest response emphasized)
- Phone number (click-to-call)
- Email
- Address
- CTA card: "Talk to us today" with WhatsApp button

### <footer>
- Business name + tagline
- Three columns: Services, Company, Contact
- "Powered by Yoshi Labs" (subtle, secondary color)
- Copyright year

### Chatbot Widget (ALWAYS include)
- Floating button: bottom-left, circular, primary color
- Chat panel: slides up on mobile, fixed bottom-right on desktop
- Welcome message
- Quick-reply chips (3-5 common questions)
- Chat responses use the site's design tokens
- On mobile: full-width, bottom positioned

### WhatsApp Float (ALWAYS include)
- Floating button: bottom-right, green (#25D366)
- Links to wa.me/{phone}
- 52x52px on mobile, 56x56px on desktop
- Does NOT overlap chatbot button

## STEP 4: INCLUDE ANIMATION ENGINE

Read `.claude/skills/interaction-library/scripts/animation-engine.js` and include it inline in a `<script>` tag.

Apply these data attributes:
- `data-sr="fade-up"` on section content for scroll reveal
- `data-sr-stagger="100"` on grid children
- `data-counter` on stats numbers
- `data-carousel` on testimonials
- `data-accordion` on FAQ
- `data-sticky-nav` on nav
- `data-mobile-menu-toggle` on hamburger
- `data-back-to-top` on a back-to-top button

Apply hover classes:
- `.card-lift` on service cards and listing cards
- `.img-zoom` on gallery images
- `.link-underline` on nav links

## STEP 5: MOBILE-FIRST VERIFICATION

Before finishing, verify ALL of these:

```css
/* ALL sections must have minimum 20px horizontal padding on mobile */
.container{padding:0 20px}
@media(max-width:380px){.container{padding:0 18px}}

/* No horizontal overflow */
body{overflow-x:hidden}

/* Hamburger menu works */
/* WhatsApp float at bottom-right, chatbot at bottom-left */
/* Stats in 2x2 grid, not side-by-side overflow */
/* All text readable at 375px width */
/* CTA buttons full-width on mobile */
```

## STEP 6: SELF-CHECK

```bash
# Check for placeholder text
grep -i "lorem\|ipsum\|placeholder\|your text\|TODO\|sample\|example" /site/index.html
# Should return EMPTY

# Check CSS custom properties exist
grep "var(--" /site/index.html | head -5
# Should show variables being used

# Verify no external JS dependencies
grep '<script src=' /site/index.html | grep -v 'google\|tailwindcss'
# Should return EMPTY (no external JS)
```

## DESIGN QUALITY TARGET

The output must look like it was designed by a premium agency — NOT generated by AI.
READ `docs/premium-design-research.md` for the full reference.

**World-class references by vertical:**
| Vertical | Reference Quality Target |
|----------|--------------------------|
| salon | Aesop website aesthetic — minimal, warm, luxury |
| dental | Apple Health UI — clean, clinical, trustworthy |
| restaurant | Noma or Eleven Madison Park — bold food-forward |
| repair | Tesla Service — efficient, modern, industrial |
| real-estate | Compass, Zillow luxury — aspirational, premium |
| law-firm | Cravath or Freshfields — authoritative, classic |
| gym | Nike Training — powerful, high-contrast, energetic |
| bakery | Tartine Bakery — wholesome, artisanal, warm |
| veterinary | modern veterinary clinic US — caring, friendly, clean |
| accounting | Stripe Dashboard — precise, professional, structured |
| construction | Caterpillar or Deere — strong, dependable, bold |
| tutorial | Khan Academy or Duolingo — fresh, engaging, clear |

**Premium Agency Techniques (from Awwwards/Cuberto/Stripe research):**

1. HERO — Full viewport, dark gradient overlay (transparent 30% → rgba(0,0,0,0.75) bottom), text reveals with `cubic-bezier(0.77, 0, 0.175, 1)`, split 60/40 on desktop, minimal text (tagline + 1 CTA only)

2. TYPOGRAPHY — clamp() responsive sizing, 1 serif + 1 sans-serif ONLY, letter-spacing 0.15em on uppercase labels, body min 1rem with line-height 1.7, h1 clamp(2.5rem, 5vw, 4rem)

3. COLOR — Primary color on CTAs only, backgrounds: #fafaf8 (warm) or #0a0a0a (dark, never pure black), subtle 135deg gradients for depth, see vertical palettes in docs/premium-design-research.md

4. SPACING — 8px base grid, section padding 6rem desktop / 3rem mobile, container max-width 1280px with 2rem side padding, generous whitespace = premium

5. ANIMATIONS — IntersectionObserver (NOT scroll listeners), fade-up: opacity 0→1 + translateY(30px→0) 0.6s ease, stagger children with transition-delay, hover cards: translateY(-5px) scale(1.02), nav underline: width 0→100% ::after

6. CARDS — border-radius 12px, hover: translateY(-5px) scale(1.02) + box-shadow 0 20px 40px rgba(0,0,0,0.08), backface-visibility: hidden for smooth transforms, image scale(1.05) on hover with overflow:hidden

7. PHOTOGRAPHY — Hero: full-bleed object-fit cover, dark gradient overlay for text readability, Card images: consistent aspect ratios (16:9 hero, 4:3 services, 1:1 testimonials), hover zoom with overflow hidden

8. SECTION RHYTHM — Alternate backgrounds (white → light gray → white → dark), never more than 3 sections without visual break, each section: eyebrow + heading + subtext + content

**Anti-generic rules:**
- If it looks like a Tailwind template, it's wrong
- If it looks like every other AI website, it's wrong
- Every vertical must feel DISTINCT — a gym should NOT look like a bakery
- Use the FULL 10-shade color ramps, not just the base color
- Typography must create hierarchy — not all one weight
- Spacing must breathe — not cramped, not wasteful
- Animations must be subtle and intentional — not gimmicky
- NO default blue (#3B82F6), NO default Tailwind colors, NO system fonts as primary
- NEVER pure black (#000) — use #0a0a0a or #111111
- NEVER center-aligned body text — left-aligned only for readability

## OUTPUT
- `/site/index.html` — complete website (single file)
- Print confirmation: "Built {business_name} — {N} sections, {N} images, mobile-first verified"
