Quality-assure the built website. This is a 35-point inspection.

## MANDATORY: READ THESE FIRST
1. Read `brief.json` — expected client data
2. Read the industry design model at `.claude/skills/industry-designs/models/{vertical}.yaml` — expected design tokens
3. Read `/site/index.html` — the built website

## 35-POINT INSPECTION

### SECTION A: DESIGN FIDELITY (10 points)
1. [ ] Primary color matches industry model's base hex (or brief.json override)
2. [ ] Full 10-shade color ramps exist in CSS (neutrals, primary, accent)
3. [ ] Heading font matches model's Google Font (check actual font-family)
4. [ ] Body font matches model's body font
5. [ ] Typography hierarchy uses clamp() with model's size scale
6. [ ] Border-radius values are intentional (not all rounded-lg)
7. [ ] Shadow definitions match model style (multi-layer soft shadows)
8. [ ] Button styles match model aesthetic (pill, rounded, or squared appropriately)
9. [ ] Card styles use background difference OR subtle border, never both
10. [ ] Overall visual language matches model personality — NOT generic

### SECTION B: CONTENT COMPLETENESS (10 points)
11. [ ] Business name in nav, hero h1, footer
12. [ ] All services from brief.json listed with correct names/prices
13. [ ] Phone number present and clickable (tel: link)
14. [ ] WhatsApp link present and correct number
15. [ ] Address present
16. [ ] About section has real content from brief
17. [ ] Hero has headline + CTA button(s)
18. [ ] Images present (not broken placeholders)
19. [ ] SEO title + meta description present
20. [ ] Schema.org JSON-LD present with real data

### SECTION C: FUNCTIONAL (5 points)
21. [ ] Chatbot widget with open/close/send logic
22. [ ] Chatbot uses site design tokens (not generic blue)
23. [ ] Testimonial carousel with auto-play and navigation
24. [ ] FAQ accordion with smooth expand/collapse
25. [ ] Smooth scroll for all nav anchor links

### SECTION D: MOBILE-FIRST (5 points)
26. [ ] @media(max-width:680px) block exists with mobile-specific styles
27. [ ] Hero stats stack vertically or become 2x2 grid on mobile (NO side-by-side overflow)
28. [ ] Hamburger menu toggle works (data-mobile-menu-toggle)
29. [ ] All sections have minimum 20px horizontal padding on mobile
30. [ ] CTA buttons go full-width on mobile
31. [ ] @media(max-width:380px) block exists for iPhone SE

### SECTION E: TECHNICAL (4 points)
32. [ ] No placeholder text (grep: Lorem, ipsum, placeholder, TODO, Your text)
33. [ ] No external JS dependencies (only Google Fonts allowed)
34. [ ] prefers-reduced-motion respected in animations
35. [ ] Total file size under 2MB

### PRO-ONLY CHECKS (if brief.json.package === "pro")
36. [ ] Cal.com embed present
37. [ ] WhatsApp floating button links correctly
38. [ ] Booking-related chatbot flows in knowledge-base.json

## SCORING
- Count passes out of 35 (38 for Pro)
- Score = (passes / total) * 100

## AUTO-FIX (for score < 90)
If any check fails, fix it immediately:
- Missing content → pull from brief.json
- Wrong colors → pull from industry model, update CSS
- Placeholder text → replace with real data
- Missing mobile CSS → add the mobile hero pattern from build-site.md
- Missing animations → add data-attributes and inline animation engine
- Missing hamburger → add mobile menu toggle JS

Re-run the check after fixes.

## OUTPUT
Write to `/qa-report.json`:
```json
{
  "business_name": "",
  "date": "",
  "score": 0,
  "total_checks": 35,
  "passes": 0,
  "failures": [],
  "fixes_applied": [],
  "status": "PASS | FAIL",
  "mobile_verified": false,
  "sections_checked": []
}
```

Status = PASS if score >= 90. Otherwise FAIL and keep fixing.
