---
name: interaction-library
version: 1.0.0
description: Animation & interaction library for premium SME websites. Scroll animations, hover effects, counters, parallax, text effects, and interactive components. All production-ready, lightweight, accessible.
triggers:
  - building a website
  - adding animations
  - making site interactive
  - hero section
  - scroll effects
  - micro-interactions
---

# Interaction Library

Production-ready animation and interaction patterns for Yoshi Labs client sites.
Every effect uses vanilla JS (no libraries). Total animation JS must stay under 15KB gzipped.
All effects respect `prefers-reduced-motion`.

## Architecture

Include `animation-engine.js` (from scripts/) as a single `<script>` block in the HTML.
It provides:
- `ScrollReveal` — Intersection Observer-based scroll animations
- `CounterAnimator` — Number counter animation
- `TextSplitter` — Character/word splitting for text animations
- `ParallaxEngine` — Lightweight parallax layers
- `MicroInteractions` — Hover, click, focus micro-animations

## Quick Reference

### 1. Scroll Reveal Animations

```html
<!-- Add data-sr attribute to any element -->
<div data-sr="fade-up">Fades up from below</div>
<div data-sr="fade-left">Slides in from left</div>
<div data-sr="fade-right">Slides in from right</div>
<div data-sr="fade-in">Simple opacity fade</div>
<div data-sr="scale-up">Scales from 0.9 to 1</div>
<div data-sr="flip-up">3D flip from bottom</div>

<!-- With options -->
<div data-sr="fade-up" data-sr-delay="200" data-sr-duration="800" data-sr-easing="cubic-bezier(0.16,1,0.3,1)">
  Delayed 200ms, 800ms duration, custom easing
</div>

<!-- Stagger children automatically -->
<div data-sr-stagger="100">
  <div>Item 1 (0ms delay)</div>
  <div>Item 2 (100ms delay)</div>
  <div>Item 3 (200ms delay)</div>
  <div>Item 4 (300ms delay)</div>
</div>
```

### 2. Counter Animations

```html
<!-- Counters animate when scrolled into view -->
<div data-counter data-counter-target="500" data-counter-suffix="+">0</div>
<div data-counter data-counter-target="15" data-counter-suffix=" Years">0</div>
<div data-counter data-counter-target="98" data-counter-suffix="%" data-counter-decimals="1">0</div>

<!-- With duration -->
<div data-counter data-counter-target="2500" data-counter-duration="2000">0</div>
```

### 3. Text Effects

```html
<!-- Split text for character animation -->
<h1 data-text-split="char" data-text-stagger="30" data-sr="fade-up">
  Welcome to Our Clinic
</h1>

<!-- Word-by-word reveal -->
<p data-text-split="word" data-text-stagger="50" data-sr="fade-up">
  We provide world-class dental care for the whole family
</p>

<!-- Typewriter effect -->
<h1 data-typewriter data-typewriter-speed="80" data-typewriter-delay="500">
  Your dream home awaits
</h1>

<!-- Gradient animated text -->
<h1 data-text-gradient="linear-gradient(90deg, #667eea, #764ba2, #667eea)"
    data-text-gradient-speed="3">
  Premium Real Estate
</h1>
```

### 4. Hover Micro-Interactions

```css
/* Button ripple effect — add class .btn-ripple */
.btn-ripple {
  position: relative;
  overflow: hidden;
}
.btn-ripple::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--ripple-x, 50%) var(--ripple-y, 50%), rgba(255,255,255,0.3) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s;
}
.btn-ripple:hover::after {
  opacity: 1;
}

/* Card lift on hover */
.card-lift {
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
}
.card-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

/* Image zoom on hover */
.img-zoom {
  overflow: hidden;
}
.img-zoom img {
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.img-zoom:hover img {
  transform: scale(1.08);
}

/* Link underline animation */
.link-underline {
  position: relative;
  text-decoration: none;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
}
.link-underline:hover::after {
  width: 100%;
}

/* Magnetic button — button follows cursor slightly */
.btn-magnetic {
  transition: transform 0.2s ease-out;
}
```

### 5. Parallax

```html
<!-- Background parallax -->
<section data-parallax="background" data-parallax-speed="0.3">
  <img src="hero.jpg" alt="Hero">
  <div class="content">Content over parallax image</div>
</section>

<!-- Multi-layer parallax -->
<div data-parallax="layer" data-parallax-speed="0.1" class="layer-1">Slow layer</div>
<div data-parallax="layer" data-parallax-speed="0.3" class="layer-2">Medium layer</div>
<div data-parallax="layer" data-parallax-speed="0.5" class="layer-3">Fast layer</div>
```

### 6. Interactive Components

**Accordion/FAQ:**
```html
<div data-accordion>
  <div data-accordion-item>
    <button data-accordion-trigger>
      <span>How does it work?</span>
      <svg data-accordion-icon><!-- chevron --></svg>
    </button>
    <div data-accordion-content>
      <p>Answer content here</p>
    </div>
  </div>
</div>
```

**Testimonial Carousel:**
```html
<div data-carousel data-carousel-autoplay="5000" data-carousel-dots="true">
  <div data-carousel-slide>
    <blockquote>"Amazing service!"</blockquote>
    <cite>— Maria Santos</cite>
  </div>
  <div data-carousel-slide>
    <blockquote>"Highly recommend!"</blockquote>
    <cite>— Juan Dela Cruz</cite>
  </div>
</div>
```

**Lightbox Gallery:**
```html
<div data-gallery>
  <a href="full.jpg" data-gallery-item>
    <img src="thumb.jpg" alt="Photo 1">
  </a>
  <a href="full2.jpg" data-gallery-item>
    <img src="thumb2.jpg" alt="Photo 2">
  </a>
</div>
```

**Sticky Nav with Scroll Detection:**
```html
<nav data-sticky-nav data-sticky-threshold="100">
  <!-- Nav shrinks/changes background when scrolled past threshold -->
</nav>
```

**Mobile Menu:**
```html
<button data-mobile-menu-toggle aria-label="Menu">
  <span></span><span></span><span></span>
</button>
<div data-mobile-menu data-mobile-menu-direction="right">
  <!-- Mobile menu content -->
</div>
```

**Back to Top:**
```html
<button data-back-to-top data-back-to-top-threshold="300">
  ↑ Top
</button>
```

**Tabs:**
```html
<div data-tabs>
  <div data-tab-list>
    <button data-tab-trigger data-tab-active>Services</button>
    <button data-tab-trigger>Pricing</button>
    <button data-tab-trigger>About</button>
  </div>
  <div data-tab-panel data-tab-active>Services content</div>
  <div data-tab-panel>Pricing content</div>
  <div data-tab-panel>About content</div>
</div>
```

## Performance Rules (MANDATORY)

1. **Intersection Observer ONLY** — no scroll event listeners for reveal animations
2. **CSS transforms only** — translate, scale, rotate, opacity. NO layout properties (top/left/width/height)
3. **will-change** — add to elements being animated, remove after animation completes
4. **requestAnimationFrame** — for any JS-driven animation loops (parallax, counters)
5. **prefers-reduced-motion** — MUST disable all animations when user preference is reduce
6. **Lazy images** — use `loading="lazy"` + blur-up placeholder via CSS
7. **Total animation JS < 15KB** — the engine + component scripts combined
8. **No layout shifts** — elements must reserve space before/after animation
9. **Stagger cap** — max 8 staggered items visible at once (don't stagger 50 list items)
10. **Debounce resize** — any resize handlers must be debounced

## Anti-Slop Animation Rules

- NO bounce animations on CTA buttons (feels cheap)
- NO rotating/spinning elements (feels 2010)
- NO marquee/ticker text
- NO particle effects (too heavy, gimmicky)
- NO cursor-follow effects (janky on mobile)
- NO auto-playing video backgrounds (heavy, distracting)
- YES to subtle, intentional movement that serves content hierarchy
- YES to scroll-triggered reveals that pace the user experience
- YES to micro-interactions that confirm user actions
- YES to smooth state transitions (open/close, show/hide)
