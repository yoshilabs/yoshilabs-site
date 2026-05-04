# Yoshi Labs — Industry Design System
## Production design specifications for Claude Code website builds.
## Every value is from real design system analysis. No invented values.

---

## TEMPLATE SELECTION ALGORITHM

```
brief.json.business_type → template:

salon, spa, beauty, barbershop, nail, wax    → airbnb
dental, medical, clinic, health, pharmacy     → stripe  
restaurant, cafe, bakery, food, catering      → spotify-light
real_estate, property, condominium, broker    → apple
law, legal, attorney, notary, accounting      → bmw
repair, auto, mechanic, electrician, plumber  → uber
retail, shop, store, boutique, grocery        → figma
fitness, gym, yoga, sports                    → spotify-dark
education, tutorial, review, training         → notion
general, other, default                       → notion

If brief.json.brand.style_preference is set → use that template instead.
```

---

## AIRBNB — Salon / Spa / Beauty

### Color Tokens
```css
--color-primary: #ff385c;        /* Rausch Red — CTAs, accent highlights */
--color-primary-hover: #e0294e;  /* Darker on hover */
--color-bg: #ffffff;             /* Page background */
--color-surface: #f2f2f2;        /* Cards, secondary surfaces */
--color-surface-alt: #f7f7f7;    /* Alternate section bg */
--color-text: #222222;           /* Headings, primary body */
--color-text-secondary: #6a6a6a; /* Descriptions, captions */
--color-border: #c1c1c1;         /* Card borders, dividers */
--color-overlay: rgba(0,0,0,0.5);/* Hero image overlay */
--color-success: #008a05;        /* "Open now", confirmation */
```

### Typography
```css
--font-primary: 'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
/* Google Fonts CDN: */
/* <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"> */

/* Heading sizes */
h1: 48px / 700 / 1.1 line-height (hero)
h2: 32px / 600 / 1.25 line-height (section titles)
h3: 20px / 600 / 1.3 line-height (card titles)
body: 16px / 400 / 1.5 line-height
caption: 14px / 400 / 1.4 line-height
small: 12px / 500 / 1.3 line-height

/* Letter spacing */
headings: -0.02em
body: 0
```

### Component Specs
```css
/* CARDS */
.card {
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 
    0 0 0 1px rgba(0,0,0,0.05),        /* border ring */
    0 2px 4px rgba(0,0,0,0.03),          /* soft blur */
    0 12px 24px rgba(0,0,0,0.06);        /* stronger blur */
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 0 0 1px rgba(0,0,0,0.05),
    0 4px 8px rgba(0,0,0,0.04),
    0 16px 32px rgba(0,0,0,0.08);
}

/* BUTTONS */
.btn-primary {
  background: #ff385c;
  color: #ffffff;
  border: none;
  border-radius: 24px;  /* pill */
  padding: 12px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #e0294e; }

.btn-secondary {
  background: #222222;
  color: #ffffff;
  border-radius: 24px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 14px;
}

/* NAV */
.nav {
  height: 64px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #f2f2f2;
}
.nav-logo { font-weight: 700; font-size: 20px; color: #ff385c; }

/* HERO */
.hero {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
}
.hero h1 { color: #ffffff; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }

/* GALLERY */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
@media (max-width: 768px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }

/* CHATBOT WIDGET */
.chatbot-btn {
  width: 56px; height: 56px;
  background: #ff385c;
  border-radius: 50%;
  position: fixed; bottom: 24px; right: 24px;
  box-shadow: 0 4px 12px rgba(255,56,92,0.4);
}
.chatbot-panel {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.16);
}
```

### Layout Patterns
- **Hero:** Full viewport, photo background, centered white text, two CTA buttons side by side
- **Services:** 3-column card grid, photo top, content bottom, price in primary color
- **About:** Split — photo left (40%), text right (60%), stack on mobile
- **Gallery:** 4-column masonry-like grid, 8px gap
- **Contact:** 2-column — form left, info+map right

---

## STRIPE — Dental / Medical / Clinic

### Color Tokens
```css
--color-primary: #533afd;            /* Stripe Purple */
--color-primary-hover: #4529d4;
--color-bg: #ffffff;
--color-surface: #f6f9fc;            /* Light blue-gray surface */
--color-text: #061b31;               /* Deep navy — warm, not cold */
--color-text-secondary: #64748d;     /* Slate */
--color-border: #e3e8ee;
--color-shadow-blue: rgba(50,50,93,0.25);
--color-shadow-soft: rgba(50,50,93,0.1);
```

### Typography
```css
--font-primary: 'Source Sans 3', system-ui, sans-serif;
/* CDN: https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap */

h1: 52px / 300 / 1.07 line-height   /* LIGHT weight — whispered authority */
h2: 36px / 300 / 1.14 line-height
h3: 22px / 500 / 1.3 line-height
body: 18px / 400 / 1.6 line-height
caption: 15px / 400

/* Letter spacing */
h1: -0.03em
h2: -0.02em
body: -0.01em
```

### Component Specs
```css
/* CARDS */
.card {
  background: #ffffff;
  border: 1px solid #e3e8ee;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 
    0 2px 4px rgba(50,50,93,0.1),
    0 4px 6px rgba(50,50,93,0.06),
    0 8px 24px rgba(50,50,93,0.08);
}

/* BUTTONS */
.btn-primary {
  background: #533afd;
  color: #ffffff;
  border-radius: 8px;      /* Conservative, not playful */
  padding: 14px 28px;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.01em;
}

/* HERO — Stripe style: clean white, big light headline */
.hero {
  background: #ffffff;
  padding: 120px 0 80px;
  text-align: center;
}
.hero h1 { color: #061b31; font-weight: 300; }
.hero-subtitle { color: #64748d; max-width: 600px; margin: 0 auto; }

/* NAV */
.nav {
  height: 72px;
  background: #ffffff;
  border-bottom: 1px solid #e3e8ee;
}

/* SERVICE CARDS — Medical precision */
.service-card {
  border: 1px solid #e3e8ee;
  border-radius: 8px;
  padding: 24px;
}
.service-price {
  color: #533afd;
  font-weight: 600;
  font-size: 20px;
}
```

### Layout Patterns
- **Hero:** Clean white, centered text, NO background image. Purple CTA. Trust badges below.
- **Services:** Clean grid or table layout. No playfulness. Professional.
- **About:** Doctor/owner photo with credentials. Authority-focused.
- **Contact:** Prominent phone number. Medical clients CALL first.
- **Trust elements:** Certifications, years of experience, "Trusted by N+ patients"

---

## SPOTIFY LIGHT — Restaurant / Cafe / Food

### Color Tokens
```css
--color-primary: #1ed760;            /* Spotify Green — fresh, appetizing */
--color-primary-hover: #1fdf64;
--color-bg: #faf9f6;                 /* Warm cream — not sterile white */
--color-surface: #f5f5f5;
--color-surface-alt: #f0efe8;        /* Warm alternate */
--color-text: #1a1a1a;
--color-text-secondary: #6a6a6a;
--color-accent-warm: #ff6b35;        /* Orange for specials, highlights */
--color-accent-gold: #ffb703;        /* "Popular", "New" badges */
```

### Typography
```css
--font-primary: 'DM Sans', system-ui, sans-serif;
/* CDN: same as Airbnb */

h1: 56px / 700 / 1.1 line-height
h2: 36px / 700 / 1.2 line-height
h3: 22px / 600 / 1.3 line-height
body: 16px / 400 / 1.5 line-height
price: 20px / 700

/* Letter spacing: -0.02em on headings */
```

### Component Specs
```css
/* CARDS — food-forward */
.menu-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
.menu-card img { 
  height: 200px; 
  object-fit: cover; 
  width: 100%;
}
.menu-price {
  background: rgba(30,215,96,0.1);
  color: #1ed760;
  border-radius: 9999px; /* pill badge */
  padding: 4px 12px;
  font-weight: 700;
}

/* BUTTONS */
.btn-primary {
  background: #1ed760;
  color: #000000;          /* Black text on green — Spotify style */
  border-radius: 999px;    /* Full pill */
  padding: 14px 32px;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* HERO — food photography forward */
.hero {
  min-height: 100vh;
  background-size: cover;
  position: relative;
}
.hero::after {
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%);
}

/* SPECIALS BADGE */
.badge-special {
  background: #ff6b35;
  color: white;
  border-radius: 9999px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}
```

### Layout Patterns
- **Hero:** Full-bleed food photo, dark gradient from bottom, white text overlay, "View Menu" CTA
- **Menu/Services:** Card grid with food photos prominent. Name + description + price badge.
- **Gallery:** Full-width photo strips between sections. Food photography IS the design.
- **Contact:** Hours prominent. Delivery info. Social links.

---

## APPLE — Real Estate

### Color Tokens
```css
--color-primary: #0071e3;            /* Apple Blue */
--color-primary-hover: #0077ED;
--color-bg-dark: #000000;            /* Hero sections */
--color-bg-light: #f5f5f7;           /* Content sections */
--color-surface: #ffffff;
--color-text-on-dark: #ffffff;
--color-text-on-light: #1d1d1f;
--color-text-secondary: #86868b;
--color-border: #d2d2d7;
```

### Typography
```css
--font-primary: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
/* NO CDN needed — uses device's best system font */
/* SF Pro on Mac, Segoe UI on Windows, Roboto on Android */

h1: 56px / 600 / 1.07 line-height   /* Billboard impact */
h2: 40px / 600 / 1.1 line-height
h3: 24px / 600 / 1.2 line-height
body: 17px / 400 / 1.5 line-height

/* Letter spacing: tight — -0.03em on h1 */
```

### Component Specs
```css
/* PROPERTY CARDS — cinematic */
.property-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}
.property-price {
  position: absolute;
  top: 16px; left: 16px;
  background: rgba(0,0,0,0.7);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

/* BUTTONS */
.btn-primary {
  background: #0071e3;
  color: #ffffff;
  border-radius: 980px;  /* Apple full pill */
  padding: 14px 28px;
  font-weight: 500;
  font-size: 17px;
}

/* SECTION RHYTHM — alternate dark/light */
.section-dark { background: #000000; color: #ffffff; }
.section-light { background: #f5f5f7; color: #1d1d1f; }

/* HERO — product-as-hero */
.hero {
  background: #000000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero h1 { color: #ffffff; }
```

---

## BMW — Law Firm / Legal

### Color Tokens
```css
--color-primary: #1c69d4;            /* BMW Blue */
--color-primary-hover: #1557b0;
--color-bg: #ffffff;
--color-surface: #f5f5f5;
--color-text: #262626;
--color-text-secondary: #757575;
--color-border: #e0e0e0;
```

### Typography
```css
--font-primary: 'Inter', system-ui, sans-serif;
/* CDN: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap */

h1: 44px / 600 / 1.15 line-height
h2: 32px / 600 / 1.2 line-height
h3: 20px / 500 / 1.3 line-height
body: 16px / 400 / 1.6 line-height

/* Letter spacing: -0.02em on headings, 0 on body */
```

### Component Specs
```css
/* CARDS — structured, minimal */
.card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;      /* Conservative — not playful */
  padding: 32px;
}

/* BUTTONS */
.btn-primary {
  background: #1c69d4;
  color: #ffffff;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 500;
}

/* PRACTICE AREAS — icon + name grid */
.practice-area {
  text-align: center;
  padding: 24px;
}
.practice-area-icon {
  width: 48px; height: 48px;
  color: #1c69d4;
}

/* ATTORNEY CARDS */
.attorney-card {
  text-align: center;
}
.attorney-photo {
  width: 160px; height: 160px;
  border-radius: 50%;
  object-fit: cover;
}
```

---

## UBER — Repair / Auto / Service

### Color Tokens
```css
--color-primary: #000000;            /* Uber Black */
--color-bg: #ffffff;
--color-surface: #f3f3f3;
--color-text: #000000;
--color-text-secondary: #4b4b4b;
--color-border: #e2e2e2;
--color-accent: #0071e3;             /* Blue CTA */
```

### Typography
```css
--font-primary: 'DM Sans', system-ui, sans-serif;

h1: 52px / 700 / 1.1 line-height
h2: 36px / 700 / 1.15 line-height
h3: 20px / 600 / 1.3 line-height
body: 16px / 400 / 1.5 line-height
```

### Component Specs
```css
/* CARDS — functional */
.card {
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  padding: 24px;
}

/* BUTTONS */
.btn-primary {
  background: #000000;
  color: #ffffff;
  border-radius: 999px;    /* Full pill */
  padding: 14px 28px;
  font-weight: 600;
}
.btn-accent {
  background: #0071e3;
  color: #ffffff;
  border-radius: 999px;
}

/* PROCESS STEPS */
.step-number {
  width: 40px; height: 40px;
  background: #000000;
  color: #ffffff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
}
```

---

## NOTION — General SME / Default

### Color Tokens
```css
--color-primary: #00775f;            /* Notion Teal */
--color-primary-hover: #006a54;
--color-bg: #ffffff;
--color-surface: #f6f5f4;            /* Warm gray */
--color-surface-alt: #f1f1ef;
--color-text: rgba(0,0,0,0.95);      /* Near-black, warm */
--color-text-secondary: #615d59;
--color-border: rgba(0,0,0,0.1);     /* Ultra-thin whisper */
```

### Typography
```css
--font-primary: 'Inter', system-ui, sans-serif;

h1: 40px / 700 / 1.2 line-height
h2: 30px / 600 / 1.25 line-height
h3: 20px / 500 / 1.3 line-height
body: 16px / 400 / 1.6 line-height

/* Letter spacing: -0.02em on display, 0 on body */
```

### Component Specs
```css
/* CARDS — whisper borders */
.card {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  box-shadow: 
    rgba(15,15,15,0.05) 0px 0px 0px 1px,
    rgba(15,15,15,0.1) 0px 3px 6px;
  padding: 24px;
}

/* BUTTONS */
.btn-primary {
  background: #00775f;
  color: #ffffff;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
}
.btn-pill {
  border-radius: 9999px;
  padding: 8px 16px;
}
```
