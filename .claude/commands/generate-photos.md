# Generate Photos — Yoshi Labs

Generate photos via Higgsfield AI for mockup builds. Photos are used in the client's website hero, about, portfolio, and other sections.

## MANDATORY: READ THESE FIRST

1. **Read `brief.json`** — extract `photos_needed` array and `industry` field
2. **Load industry model** from `.claude/skills/industry-designs/models/{industry}.yaml` — extract the `structure.photography` spec (style, lighting, composition)
3. **Check Higgsfield token** exists in `.claude/settings.local.json` under `mcpServers.higgsfield.env.HIGGSFIELD_TOKEN`

## TOKEN CHECK

Before generating, verify the Higgsfield token is present:

```
Read .claude/settings.local.json → mcpServers.higgsfield.env.HIGGSFIELD_TOKEN
```

If the token is missing or the `higgsfield` MCP server is not configured, **fail immediately** with:

> ❌ Higgsfield token not found. Add `HIGGSFIELD_TOKEN` to `.claude/settings.local.json` under `mcpServers.higgsfield.env`.

## PROMPT CONSTRUCTION

For each photo in `brief.json.photos_needed`, construct a prompt using the following pattern:

```
Professional {industry} photography. {style}. {lighting}. {composition}. {specific_photo_description}. Editorial quality, natural lighting, 4K, no text overlay, no watermarks.
```

### Template Breakdown

| Variable | Source |
|---|---|
| `{industry}` | `brief.json.industry` (e.g., "creative-agency", "salon", "dental") |
| `{style}` | `structure.photography.style` from the industry model YAML |
| `{lighting}` | `structure.photography.lighting` from the industry model YAML |
| `{composition}` | `structure.photography.composition` from the industry model YAML |
| `{specific_photo_description}` | Interpret each entry in `photos_needed[]` into a descriptive scene |

### Example: creative-agency industry

Industry model `creative-agency.yaml` → photography spec:
- **style:** "Editorial, cinematic, human-centered. Think Monocle magazine meets a design studio."
- **lighting:** "Natural, window-lit, warm. Golden hour, not studio."
- **composition:** "People working, screens with code/AI output, team shots, desk setups, Davao cityscapes"

For `photos_needed: ["hero-ai-abstract", "team-prince", "office-davao"]`:

```
Professional creative-agency photography. Editorial, cinematic, human-centered — think Monocle magazine meets a design studio. Natural, window-lit, warm lighting — golden hour, not studio. People working, screens with code/AI output, team shots, desk setups, Davao cityscapes. Abstract AI neural network visualization with warm gradients and subtle light particles. Editorial quality, natural lighting, 4K, no text overlay, no watermarks.
```

### Photo Key Mapping

Map each `photos_needed[]` entry to a specific description:

| Key | Scene Description |
|---|---|
| `hero-*` | Hero section image — abstract, brand-forward, no people or minimal people |
| `team-*` | Team/Founder portrait — centered subject, professional but warm |
| `office-*` | Office/workspace interior — natural light, lived-in, authentic |
| `service-*` | Service-related scene — action shot, process, or result |
| `about-*` | About section — personal, storytelling, behind-the-scenes |
| `product-*` | Product photography — isolated on appropriate surface |
| `before-after-*` | Before/after comparison — split frame concept |

## GENERATION

For each photo, call Higgsfield MCP:

```
mcp__higgsfield__generate_image
  model: "marketing_studio_image"
  prompt: "<constructed prompt>"
  count: 1
  aspect_ratio: "16:9"    (use "1:1" for team/product/portrait photos)
```

### Aspect Ratio Rules
- **Hero / About / Office photos:** `16:9` (landscape, cinematic)
- **Team / Portrait photos:** `1:1` or `4:5` (square or portrait crop)
- **Product photos:** `1:1` (square, clean)
- **Before/After photos:** `16:9` (side-by-side landscape)

### Model Notes
- `marketing_studio_image` is optimized for commercial, product, and advertising photography
- It produces polished, publication-ready output
- Generation typically completes in 10-20 seconds
- Poll with `mcp__higgsfield__job_status` if the call returns a job ID instead of direct results

## SAVE RESULTS

Save generated images to the client's photo directory:

```
clients/{slug}/photos/mockup/{photo_key}.png
```

Where `{photo_key}` is the original key from `photos_needed[]` (e.g., `hero-ai-abstract.png`).

### Save Process
1. Download the image URL returned by Higgsfield
2. Ensure `clients/{slug}/photos/mockup/` directory exists (create if needed)
3. Write file as `{photo_key}.png`
4. Log: `✅ Saved {photo_key}.png`

## FULL WORKFLOW

```
1. Read brief.json → extract industry, photos_needed[], slug
2. Check .claude/settings.local.json → verify HIGGSFIELD_TOKEN exists
3. Load .claude/skills/industry-designs/models/{industry}.yaml → extract photography spec
4. FOR EACH photo in photos_needed:
   a. Map photo_key to specific scene description
   b. Construct prompt: "Professional {industry} photography. {style}. {lighting}. {composition}. {scene}. Editorial quality, natural lighting, 4K, no text overlay, no watermarks."
   c. Call mcp__higgsfield__generate_image(model="marketing_studio_image", prompt=..., aspect_ratio=...)
   d. Wait for generation to complete
   e. Save to clients/{slug}/photos/mockup/{photo_key}.png
5. Report: "Generated {N} photos for {client_name} — saved to photos/mockup/"
```

## QUALITY CHECK

After generation, verify each image:
- [ ] Image loaded without errors (not corrupted)
- [ ] No text overlays, watermarks, or logos in the image
- [ ] Matches the intended scene (not a completely different subject)
- [ ] Lighting looks natural, not over-processed or CGI
- [ ] Appropriate aspect ratio matches intended use

If an image fails quality check, adjust the prompt and regenerate.

## ERROR HANDLING

| Error | Action |
|---|---|
| Token missing | Fail immediately with clear error message |
| Model YAML not found | Fail: "No industry model for {industry}. Check .claude/skills/industry-designs/models/" |
| photos_needed is empty | Warn: "No photos needed. Skipping generation." |
| Generation fails | Retry once with same prompt. If still fails, simplify prompt and retry. |
| Job timeout | Report: "Generation timed out for {photo_key}. Check Higgsfield balance with mcp__higgsfield__balance." |

## OUTPUT

Print summary:
```
📸 Generated {N} photos for {client_name} ({industry})
   ✅ {photo_key_1}.png — 16:9 landscape
   ✅ {photo_key_2}.png — 1:1 portrait
   ...
   📁 Saved to clients/{slug}/photos/mockup/
```
