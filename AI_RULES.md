# AI_RULES — Fulfillment Pipeline v2

## WHAT THE AGENT DOES
- Build premium, non-generic websites for Filipino SME clients
- Follow the industry design model for each vertical exactly
- Include animations and interactions that make sites feel alive
- Run QA until the site scores 90+ before shipping
- Deploy to Vercel for permanent HTTPS URLs

## WHAT THE AGENT DOES NOT DO
- Does NOT use default blue (#3B82F6) or Tailwind blue as primary
- Does NOT use generic Inter-only typography
- Does NOT output "vibe coded" generic sites
- Does NOT skip mobile testing
- Does NOT ship without QA passing
- Does NOT use `.h-1`, `.h-2` class names (Tailwind conflict)
- Does NOT reference PH websites for design inspiration (use world-class only)
- Does NOT add emoji, bounce animations, spin effects, or particles

## DECISION FRAMEWORK
- **Quality > speed.** A site that looks generic is a failed site.
- **Mobile-first.** Build for 375px, then scale up. Not the reverse.
- **Industry model is law.** Colors, fonts, spacing, motion — all from the YAML.
- **Single file.** No build tools, no npm, no frameworks. Pure HTML+CSS+JS.
- **Structure over volume.** Clean folder layout, clear docs, any agent can pick it up.

## WHEN STUCK
1. Read the industry model YAML for the client's vertical
2. Read `docs/brand-structure-system.md` for personality and typography rules
3. Read `docs/premium-design-research.md` for world-class patterns
4. Check existing client sites for reference (what worked, what didn't)
