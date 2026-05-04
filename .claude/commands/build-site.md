# Build Site — Yoshi Labs

Build the Yoshi Labs landing page. **Do NOT use colors or fonts from project CLAUDE.md.** This build follows the industry model structure + Refero visual DNA. The industry model defines **WHAT** sections exist. Refero defines **HOW** they look.

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
Write **single file** `site/index.html` with all CSS and JS inline:
- Mobile-first, tested at 375px / 390px / 414px / 430px
- Google Fonts for any typefaces from the Refero system
- Custom class names only — never `.h-1`, `.h-2`, etc. (Tailwind conflicts)
- Total weight under 2MB
- No emoji, no Lorem ipsum, no placeholder text
- No bounce/spin/particle effects
- Respect `prefers-reduced-motion`

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

## DESIGN AUTHORITY

| Concern | Source | Role |
|---|---|---|
| **Structure** (what sections exist) | Industry model `.yaml` | MANDATORY |
| **Visual DNA** (how it looks) | Refero style block | MANDATORY |
| **Content** (text, pricing, images) | `brief.json` | Source of truth |
| **Interaction** (animations, reveals) | `animation-engine.js` | Included inline |

**Under no circumstances** should colors, fonts, or spacing be pulled from `CLAUDE.md`, personal preference, or generic defaults. The pipeline is self-contained: industry model + Refero + brief.

---

## OUTPUT
After a successful build, print:
```
Built Yoshi Labs — {industry} site, Refero {style_name}, {N} sections, QA {score}%, deployed to Vercel
```
