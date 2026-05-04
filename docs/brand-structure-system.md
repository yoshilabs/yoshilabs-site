# Yoshi Labs Brand Structure System v3
## The Complete Design DNA Engine

*Built from analysis of Noma, Glossier, Compass, Cuberto, Stripe, Nike, Aesop, and 40+ Awwwards winners. This document is the single source of truth for how Yoshi Labs encodes brand identity into every client website.*

---

## THE 12 INDUSTRY MODEL SYSTEM

The Brand Structure System is built on **12 vertical industry models**, each a complete design system containing color palettes, typography pairings, spacing tokens, animation curves, photography direction, and section templates. Every client that enters the pipeline is mapped to exactly one industry model, which becomes the primary design DNA for their site.

### The 12 Verticals

| # | Industry Model | Core Emotion | YAML File | Status |
|---|---------------|-------------|-----------|--------|
| 1 | **Restaurant / Cafe** | Appetite, warmth, craving | `restaurant.yaml` | ✅ v3 |
| 2 | **Salon / Beauty** | Desire, luxury, self-care | `salon.yaml` | ✅ v3 |
| 3 | **Gym / Fitness** | Power, energy, transformation | `gym.yaml` | ✅ v3 |
| 4 | **Real Estate** | Aspiration, trust, prestige | `real-estate.yaml` | ✅ v3 |
| 5 | **Dental / Medical** | Comfort, trust, relief | `dental.yaml` | ✅ v3 |
| 6 | **Law Firm** | Authority, confidence, gravitas | `law-firm.yaml` | ✅ v3 |
| 7 | **Bakery / Cafe** | Warmth, nostalgia, comfort | `bakery.yaml` | ✅ v3 |
| 8 | **Accounting** | Precision, reliability, clarity | `accounting.yaml` | ⚠️ Needs v3 |
| 9 | **Construction** | Strength, capability, dependability | `construction.yaml` | ⚠️ Needs v3 |
| 10 | **Veterinary** | Care, warmth, trust | `veterinary.yaml` | ⚠️ Needs v3 |
| 11 | **Repair / Auto** | Efficiency, reliability, skill | `repair.yaml` | ⚠️ Needs v3 |
| 12 | **Tutorial / Education** | Engagement, curiosity, progress | `tutorial.yaml` | ⚠️ Needs v3 |

### Model Hierarchy

Each model file contains:
- **Brand personality** — core emotion, visual voice, motion style
- **Typography system** — 3-4 mood-based font pairings with weight matrices and scale
- **Color system (60-30-10)** — light mode, dark mode, 10-shade neutral ramp
- **Brand structure** — border radius, shadow layers, icon style, photography direction, animation curves
- **Section templates** — 6-8 named sections with purpose, layout, and required flags
- **CTA strategy** — primary/secondary text, placement, urgency language, trust signals
- **Competitor references** — 2-3 world-class URLs with specific takeaways
- **PH local context** — payment methods, contact channels, delivery platforms, trust signals

### Model Selection Logic

```
Client vertical → industry model YAML → primary design DNA
    ↓
If client has existing brand: model adapts (keep logo colors, adopt structure)
If client is brand-new: model is the complete starting point
    ↓
Refero system is layered on top as quality benchmark
```

---

## THE 5-AXIS DESIGN DNA

Every brand identity is encoded across **five orthogonal axes**. Changing any single axis transforms the feel of the site. Together they form a complete, non-overlapping description of a brand's visual language.

### Axis 1: INDUSTRY (Vertical Context)

**What it answers:** *What business is this? What does the visitor expect?*

The industry axis sets the fundamental context. A salon and a gym have entirely different visual vocabularies because they serve different human needs. The industry model provides:
- Color psychology rules (red = appetite for restaurants, teal = healing for dental)
- Expected section flow (menu for restaurants, schedule for gyms, listings for real estate)
- Photography conventions (top-down food plating vs. dynamic gym action shots)
- Trust signal types (Google reviews for restaurants, certifications for dental, sale prices for real estate)

**Industry → Mood mapping:**
| Industry | Expected Mood | Wrong Mood Feels... |
|----------|--------------|-------------------|
| Restaurant | Warm, inviting, indulgent | Cold, sterile = hospital cafeteria |
| Salon | Luxurious, soft, editorial | Harsh, loud = discount barber |
| Gym | Powerful, energetic, bold | Gentle, slow = yoga studio (wrong niche) |
| Dental | Clean, calm, trustworthy | Dark, moody = scary dentist |
| Law | Authoritative, structured, serious | Playful, colorful = not credible |
| Bakery | Warm, artisanal, nostalgic | Industrial, cold = factory bread |

### Axis 2: MOOD (Emotional Signature)

**What it answers:** *What does the visitor feel in 3 seconds?*

Mood is the emotional signature — the gut reaction before any text is read. It's encoded through:
- **Background color temperature** — warm cream (#FFFBF2) = comfort; cool white (#FAFAFA) = clinical; near-black (#0D0D0D) = premium intensity
- **Color saturation level** — muted/earthy = premium, artisanal; vibrant/neon = energetic, youthful
- **Photography treatment** — dark and dramatic vs. bright and airy vs. high-contrast action
- **Animation speed** — slow/cinematic (0.8-1.2s) = luxury; fast/snappy (0.3-0.5s) = energetic; minimal (0.3-0.5s) = professional

**Mood spectrum per vertical:**

```
RESTAURANT:     Cozy/Warm ←→ Moody/Premium ←→ Fresh/Health-focused
SALON:          Soft/Romantic ←→ Editorial/Luxe ←→ Modern/Minimal
GYM:            Raw/Gritty ←→ Powerful/Elite ←→ Community/Energetic
REAL ESTATE:    Warm/Aspirational ←→ Data-Driven/Premium ←→ Trustworthy/Established
DENTAL:         Calm/Reassuring ←→ Modern/Precise ←→ Warm/Family-friendly
LAW:            Traditional/Gravitas ←→ Modern/Confident ←→ Boutique/Specialized
```

**Mood selection rule:** Pick one primary mood. Do not blend. An attempt to be "both warm AND authoritative" produces a site that feels like neither.

### Axis 3: REFERO (Quality Benchmark)

**What it answers:** *What world-class design system sets the quality bar?*

Refero is the quality axis — it doesn't dictate the visual style, but sets the execution standard. The 20 Refero design systems (extracted from real production screens of Linear, Stripe, Anthropic, Cursor, Mercury, ElevenLabs, Superhuman, etc.) provide:

- **Real dos/don'ts** — not theory; extracted from actual production design decisions
- **Color usage rules** — how the best companies actually deploy color (spoiler: very sparingly)
- **Spacing tokens** — base units, density profiles, actual measured gaps
- **Type scales** — verified ratios and font pairings from live products
- **Shape systems** — border radius values and their contexts (buttons get different radii than cards)
- **Shadow architectures** — how shadows are layered (or not used at all)

**Refero → Industry mapping (primary recommendation):**

| Industry | Primary Refero | Why |
|----------|---------------|-----|
| Salon | Superhuman | Cinematic, immersive, experience-focused — perfect for beauty/wellness |
| Dental | Anthropic | Scholarly, clean, trustworthy — medical credibility without looking sterile |
| Restaurant | Stripe | Structured, appetizing, payment/checkout DNA — food business flow |
| Repair | Cursor | Bold, technical, industrial — shows competence and precision |
| Real Estate | Linear | Dark mode, data-heavy, premium aspirational — property dashboard feel |
| Law Firm | Anthropic | Editorial, authoritative, text-heavy — legal credibility |
| Gym | Cursor | Bold, energetic, high-contrast — power and performance |
| Bakery | ElevenLabs | Warm, editorial, storytelling — food craft and care |
| Veterinary | Superhuman | Caring, immersive, clean — trust for pet owners |
| Accounting | Linear | Dark, data-driven, precise — financial dashboards |
| Construction | Cursor | Technical, structural, engineering — shows building expertise |
| Tutorial | Anthropic | Educational, clean info hierarchy, scholarly |

**Using Refero in builds:**
1. Load the Refero system for the mapped style
2. Extract: color palette, spacing tokens, border radii, shadow rules, typography dos/don'ts
3. Apply as a quality overlay on top of the industry model
4. The industry model provides the *what* (sections, content type, photography direction)
5. The Refero system provides the *how* (execution quality, spacing precision, typographic refinement)

### Axis 4: PALETTE (Color Architecture)

**What it answers:** *What is the complete color system, not just "a primary color"?*

The palette axis is the full 60-30-10 color architecture:

- **60% Dominant** — backgrounds, large surfaces. Sets the mood. Usually neutral. Determines: warm vs. cool, light vs. dark, clinical vs. inviting
- **30% Secondary** — text, cards, secondary elements. Provides structure. Determines: contrast level, readability, hierarchy
- **10% Accent** — CTAs, highlights, interactive elements. Draws the eye. Must be used *sparingly* — accent on everything = accent on nothing

**Critical palette rules:**
1. Never use accent color as background
2. Background determines mood — warm off-white = inviting, pure white = clinical, near-black = premium
3. Gray-scale test: if contrast disappears without color, hierarchy is broken
4. Dark mode works for: gym, luxury restaurants, high-end salon, law firm. Does NOT work for: dental, bakery, veterinary, accounting
5. Muted tones > saturated tones for premium feel (#C75B39 terracotta > #FF4500 orange-red)
6. Never default blue (#3B82F6) — this is the #1 AI-generated design tell

**Palette delivers:** 10-shade neutral ramp, light mode full system, dark mode full system, supporting accent colors, ghost/light variants for backgrounds.

### Axis 5: TYPE-PAIRINGS (Typography Identity)

**What it answers:** *What font pairing encodes the brand's personality?*

Type-pairings are the typographic signature. The rule: **contrast creates character**. A pairing works when two fonts have visible structural contrast — different era, different structure, different mood.

**Pairing architecture:**
- **Heading font** — display personality. Determines: serif vs. sans, traditional vs. modern, delicate vs. bold
- **Body font** — readability engine. Must be: clean, highly legible at 16px, good Filipino character support
- **Contrast ratio** — the visual tension between heading and body. Too similar = boring. Too extreme = chaotic
- **Weight matrix** — minimum 3 weights across the pair (light/regular/bold or regular/semibold/bold)

**The 6 archetype typography personalities (from anti-slop system):**

| Archetype | Type Personality | Industries |
|-----------|-----------------|------------|
| urban-edge | Condensed grotesque, tight apertures, industrial weight | Gym, auto, barbershop, martial arts |
| heritage-craft | Refined transitional serif, high-contrast strokes | Restaurant, bakery, furniture, art |
| opulent-classic | High-contrast didone, hairline serifs, dramatic thick-thin | Fine dining, jewelry, spirits, hotel |
| clean-modern | Neo-grotesque, neutral proportions, even stroke | Real estate, dental, law, accounting |
| natural-organic | Humanist sans-serif, soft terminals, open apertures | Wellness, spa, salon, florist, veterinary |
| tech-forward | Geometric sans-serif, uniform stroke, precise curves | Tech, fitness, gaming, coworking |

**Pairing rules:**
1. Always 1 serif + 1 sans-serif (or 2 sans with strong weight/style contrast)
2. Never two serifs or two sans-serifs without extreme contrast
3. Never system fonts (Arial, Helvetica, Times) as primary
4. Never more than 2 font families (3 max if monospace needed for code/stats)
5. Body minimum 16px/1rem — 14px body = cheap
6. Letter-spacing 0.1-0.2em on ALL uppercase — non-negotiable
7. Line-height 1.6-1.8 for body — tight line-height looks cramped

**Verified pairings per industry (tested on award-winning sites):**

| Industry | Mood | Heading | Body |
|----------|------|---------|------|
| Restaurant (fine dining) | Elegant | Playfair Display | DM Sans |
| Restaurant (modern) | Clean | DM Serif Display | Inter |
| Restaurant (artisanal) | Personality | Fraunces | Outfit |
| Salon (luxury) | Editorial | Cormorant | Outfit |
| Salon (modern) | Clean beauty | Playfair Display | Manrope |
| Gym (hardcore) | Aggressive | Bebas Neue | Inter |
| Gym (premium) | Powerful | Oswald | Nunito Sans |
| Real Estate (luxury) | Aspirational | DM Serif Display | Inter |
| Real Estate (modern) | Trustworthy | Playfair Display | IBM Plex Sans |
| Dental | Clinical-calm | Montserrat | Open Sans |
| Law (traditional) | Gravitas | Cormorant Garamond | Manrope |
| Law (modern) | Confident | DM Serif Display | IBM Plex Sans |
| Bakery | Artisanal | Lora | Quicksand |
| Veterinary | Caring | Outfit | Inter |

---

## THE 14-STAGE STATE MACHINE FOR CLIENT PIPELINE

Every client that enters the Yoshi Labs fulfillment pipeline moves through a deterministic **14-stage state machine**. Each stage has entry criteria, a deliverable, and exit criteria that must be satisfied before advancing. No stage can be skipped. No stage can be partially completed.

### State Machine Diagram

```
STAGE 0: LEAD_DISCOVERED
    ↓ (lead scored ≥ threshold)
STAGE 1: LEAD_QUALIFIED
    ↓ (contact info verified, vertical identified)
STAGE 2: OUTREACH_SENT
    ↓ (email/SMS/FB message delivered)
STAGE 3: CLIENT_RESPONDED
    ↓ (positive response OR scheduled call)
STAGE 4: BRIEF_COLLECTED
    ↓ (brief.json complete, validated against schema)
STAGE 5: INDUSTRY_MODEL_ASSIGNED
    ↓ (vertical mapped, YAML loaded, Refero paired)
STAGE 6: DESIGN_DNA_SYNTHESIZED
    ↓ (5-axis DNA complete: industry + mood + Refero + palette + type-pairings)
STAGE 7: SITE_BUILT
    ↓ (index.html generated, animation engine included, mobile-first)
STAGE 8: QA_AUDIT_RUN
    ↓ (automated checks + visual review)
STAGE 9: QA_PASSED
    ↓ (score ≥ 90/100, all critical rules met)
STAGE 10: CLIENT_REVIEW_SENT
    ↓ (preview URL shared with client)
STAGE 11: CLIENT_APPROVED
    ↓ (explicit approval received)
STAGE 12: DEPLOYED_TO_VERCEL
    ↓ (production URL live, HTTPS, custom domain if provided)
STAGE 13: OUTREACH_FOLLOWUP
    ↓ (post-launch email, testimonial request, upsell Pro tier)
TERMINAL: LIVE
```

### Stage Details

#### STAGE 0: LEAD_DISCOVERED
**Entry:** Lead source provides business data (Google Maps scrape, Facebook page, referral, inbound form).
**What happens:** Raw lead data is captured — business name, address, phone, website (if any), category.
**Deliverable:** Lead object with metadata (source, timestamp, location).
**Exit criteria:** Lead has minimum required fields (name + phone OR name + address).

#### STAGE 1: LEAD_QUALIFIED
**Entry:** Lead object from Stage 0.
**What happens:** Vertical classification, existing web presence audit, competitor check, contact verification. Lead is scored (1-10) based on: has no website (8+), has terrible website (6+), has decent website (3-), budget signals, urgency signals.
**Deliverable:** Qualified lead with vertical tag, priority score, contact status.
**Exit criteria:** Score ≥ 5, vertical identified, contact method verified.

#### STAGE 2: OUTREACH_SENT
**Entry:** Qualified lead from Stage 1.
**What happens:** Outreach message drafted using vertical-specific template (references industry model pain points). Sent via email, Facebook Messenger, or SMS. Tracked in CRM (Twenty).
**Deliverable:** Outreach record with delivery status, template used, timestamp.
**Exit criteria:** Message delivered (not bounced). If bounced, retry alternate channel.

#### STAGE 3: CLIENT_RESPONDED
**Entry:** Outreach sent and delivered.
**What happens:** Client responds. Response classified: interested, not-interested, needs-more-info, schedule-call. If no response in 72h, follow-up sequence triggers.
**Deliverable:** Response record with classification and next action.
**Exit criteria:** Response classified as "interested" or "schedule-call". If "not-interested", pipeline terminates (archived).

#### STAGE 4: BRIEF_COLLECTED
**Entry:** Client interested.
**What happens:** Brief form sent to client (Google Form, direct message, or phone call). Questions cover: business name, vertical, services, target customers, existing branding, preferred colors, competitor examples, content/messaging, photos available, special requirements.
**Deliverable:** `brief.json` in client folder, validated against `brief-schema.json`.
**Exit criteria:** All required fields populated, schema validation passes, no missing critical info.

#### STAGE 5: INDUSTRY_MODEL_ASSIGNED
**Entry:** Valid `brief.json`.
**What happens:** Vertical from brief mapped to one of 12 industry models. YAML file loaded. If client vertical is ambiguous (e.g., "wellness center"), closest match is used with adaptation notes.
**Deliverable:** Industry model assignment record with vertical + YAML path.
**Exit criteria:** Vertical mapped to exactly one industry model. If no model matches, flag for human review.

#### STAGE 6: DESIGN_DNA_SYNTHESIZED
**Entry:** Industry model assigned.
**What happens:** The 5-axis Design DNA is fully synthesized:
- **INDUSTRY:** YAML model loaded, section templates confirmed
- **MOOD:** Selected from client brief (if client has preference) or default from industry model
- **REFERO:** Primary + secondary Refero system loaded from `refero-vertical-mapping.yaml`
- **PALETTE:** 60-30-10 color system built (client colors adapted or industry defaults used)
- **TYPE-PAIRINGS:** Font pairing selected from industry model's font_options, matching the chosen mood

If client has existing branding: palette and type-pairings adapt to client colors/fonts while preserving industry structure and Refero quality rules.
**Deliverable:** Design DNA record (5 axes documented).
**Exit criteria:** All 5 axes defined, no contradictory choices (e.g., playful mood for law firm).

#### STAGE 7: SITE_BUILT
**Entry:** Design DNA synthesized.
**What happens:** Claude Code builds `index.html`:
1. Industry model loaded → section structure determined
2. Design DNA applied → colors, fonts, spacing, radii, shadows
3. Animation engine included → `data-sr`, `data-counter`, `data-carousel` attributes placed
4. Anti-slop rules applied → no default blue, no centered body text, no gradient CTAs, etc.
5. Mobile-first implementation → tested at 375px
6. All content from brief.json → no Lorem ipsum, no placeholder text
**Deliverable:** Single `index.html` with all CSS/JS inline.
**Exit criteria:** File exists, renders in browser, all brief content present, no anti-slop violations.

#### STAGE 8: QA_AUDIT_RUN
**Entry:** `index.html` built.
**What happens:** Automated QA suite runs:
- **Critical rules check:** No default blue (#3B82F6), no Inter-only typography, no emoji, no Lorem ipsum, no centered body text, proper font pairing, custom class names (no `.h-1`/`.h-2`)
- **Mobile check:** Renders correctly at 375px, 390px, 414px, 430px
- **Performance check:** Total weight under 2MB, images compressed
- **Animation check:** Animation engine included, scroll reveals working
- **Content check:** All brief fields rendered, no placeholders
- **Visual review:** Compare against industry model expectations
**Deliverable:** `qa-report.json` with scores and violation list.
**Exit criteria:** QA report generated with complete findings.

#### STAGE 9: QA_PASSED
**Entry:** QA audit complete.
**What happens:** QA score evaluated. Score must be ≥ 90/100. If below 90, violations are fixed and QA re-run. Loop continues until pass or 5 max retries (then human review).
**Deliverable:** Passing QA report (score ≥ 90).
**Exit criteria:** Score ≥ 90. All critical violations resolved. Non-critical violations documented (acceptable if score still ≥ 90).

#### STAGE 10: CLIENT_REVIEW_SENT
**Entry:** QA passed.
**What happens:** Preview URL (Vercel preview deployment or raw file link) shared with client via their preferred channel. Client asked to review: content accuracy, photos, colors, overall feel.
**Deliverable:** Review request record with preview URL and timestamp.
**Exit criteria:** Preview sent. If no response in 48h, follow-up sent.

#### STAGE 11: CLIENT_APPROVED
**Entry:** Client review sent.
**What happens:** Client provides feedback. Classified as: approved, changes-requested, rejected.
- If approved → advance
- If changes-requested → revise and re-send (loops back to Stage 7 for rebuild or Stage 10 for re-review)
- If rejected → archive with reason
**Deliverable:** Approval record with client confirmation.
**Exit criteria:** Explicit "approved" received from client.

#### STAGE 12: DEPLOYED_TO_VERCEL
**Entry:** Client approved.
**What happens:** Site deployed to Vercel production:
```bash
npx vercel --prod --yes
```
- Production URL generated (vercel.app subdomain)
- Custom domain configured if client provided one
- HTTPS enforced
- Deployment verified (live URL loads correctly)
**Deliverable:** Live production URL.
**Exit criteria:** URL loads, renders correctly, HTTPS valid, all links functional.

#### STAGE 13: OUTREACH_FOLLOWUP
**Entry:** Site deployed and live.
**What happens:** Post-launch sequence:
1. Launch notification sent to client (with live URL)
2. Testimonial request (after 1 week)
3. Pro tier upsell pitch (after 2 weeks if on Starter)
4. Client moved to "maintenance" status in CRM
**Deliverable:** Follow-up records for each action.
**Exit criteria:** Launch notification delivered. Pipeline reaches TERMINAL state.

#### TERMINAL: LIVE
Site is live and client is in maintenance/retention mode. Pipeline complete.

### State Transitions and Idempotency

- Each stage transition is **atomic** — a stage is either complete or not; partial states are not permitted
- Stages are **idempotent** — running Stage N twice produces the same result (e.g., QA can be re-run without side effects)
- **Backward transitions** are explicit: Stage 11 → Stage 7 (rebuild after client changes), Stage 9 → Stage 7 (rebuild after QA fail)
- **Forward-only skip** is never allowed — no stage can be bypassed

### Pipeline Monitoring

- Current stage is tracked in `clients/{slug}/pipeline-state.json`
- Timestamps recorded for stage entry and exit
- Total pipeline time measured from Stage 0 entry to Stage 12 exit
- Target: ≤ 48 hours from Stage 4 (brief collected) to Stage 12 (deployed)

---

## IMPLEMENTATION: USING THIS DOCUMENT

When building any client site, follow this exact sequence:

```
1. Identify vertical → Map to 1 of 12 industry models
2. Load industry YAML → .claude/skills/industry-designs/models/{vertical}.yaml
3. Synthesize 5-axis DNA:
   a. INDUSTRY: Section templates, photography direction, CTA strategy
   b. MOOD: Select from client brief or model default
   c. REFERO: Load primary + secondary from refero-vertical-mapping.yaml
   d. PALETTE: Build 60-30-10 from client colors or model defaults
   e. TYPE-PAIRINGS: Select pairing matching the chosen mood
4. Move through state machine → Stage 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12
5. Apply Refero quality overlay → Extract dos/don'ts, spacing, shape rules
6. Apply anti-slop rules → From anti-slop-design/rules/
7. Run QA → Score must be 90+
8. Deploy → Vercel production
```

This is not optional. This IS the product. Every site shipped without completing all 14 stages and synthesizing all 5 DNA axes is a site that looks generic — and a generic site is a failed site.
