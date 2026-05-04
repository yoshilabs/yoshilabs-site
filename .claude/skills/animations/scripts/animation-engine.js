/**
 * Yoshi Labs — Lightweight Animation Engine v1.0
 * ~5KB minified | Zero dependencies | Performance-first
 * 
 * Features:
 * - Intersection Observer scroll animations
 * - Stagger delay system
 * - Counter animations with easing
 * - Parallax with rAF batching
 * - prefers-reduced-motion support
 * - Lazy image loading with blur-up
 * - Toast notifications
 * - Smooth height transitions
 * 
 * Usage: Include this script, add data-attributes to elements.
 * No initialization needed — auto-bootstraps on DOMContentLoaded.
 */

(function () {
  'use strict';

  /* ─── Reduced Motion Detection ─── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Utility: Clamp ─── */
  function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }

  /* ─── Utility: Easing Functions ─── */
  const ease = {
    linear: t => t,
    easeOutCubic: t => 1 - Math.pow(1 - t, 3),
    easeOutQuart: t => 1 - Math.pow(1 - t, 4),
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeOutBack: t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  };

  /* ─── Scroll Animation Observer ─── */
  function initScrollAnimations() {
    const els = document.querySelectorAll('[data-animate]');
    if (!els.length) return;

    // If reduced motion, show everything immediately
    if (prefersReducedMotion) {
      els.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.classList.remove('animate-hidden');
        el.classList.add('animate-visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.animateDelay || '0', 10);
        const stagger = parseInt(el.dataset.animateStagger || '0', 10);
        const staggerIndex = parseInt(el.dataset.staggerIndex || '0', 10);
        const totalDelay = delay + (stagger * staggerIndex);

        setTimeout(() => {
          el.classList.add('animate-visible');
          el.classList.remove('animate-hidden');
          // Remove will-change after animation completes
          const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 600;
          setTimeout(() => { el.style.willChange = 'auto'; }, duration + 100);
        }, totalDelay);

        observer.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    els.forEach((el, i) => {
      el.classList.add('animate-hidden');
      // Auto-detect stagger from parent
      if (el.dataset.animateStagger && !el.dataset.staggerIndex) {
        const parent = el.parentElement;
        const siblings = Array.from(parent.querySelectorAll('[data-animate-stagger]'));
        siblings.forEach((sib, idx) => { sib.dataset.staggerIndex = idx; });
      }
      el.style.willChange = 'opacity, transform';
      observer.observe(el);
    });
  }

  /* ─── Counter Animation ─── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.counterDone) return;
        el.dataset.counterDone = '1';
        animateCounter(el);
        observer.unobserve(el);
      });
    }, { threshold: 0.3 });

    counters.forEach(el => {
      if (prefersReducedMotion) {
        el.textContent = el.dataset.counterTarget || el.dataset.counter;
        return;
      }
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.counterTarget || el.dataset.counter);
    const duration = parseInt(el.dataset.counterDuration || '2000', 10);
    const easingName = el.dataset.counterEasing || 'easeOutCubic';
    const prefix = el.dataset.counterPrefix || '';
    const suffix = el.dataset.counterSuffix || '';
    const decimals = parseInt(el.dataset.counterDecimals || '0', 10);
    const commaSeparate = el.dataset.counterCommas !== 'false';
    const easingFn = ease[easingName] || ease.easeOutCubic;

    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = clamp(elapsed / duration, 0, 1);
      const easedProgress = easingFn(progress);
      const current = easedProgress * target;

      let formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
      if (commaSeparate && decimals === 0) {
        formatted = Number(formatted).toLocaleString();
      }

      el.textContent = prefix + formatted + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* ─── Parallax ─── */
  function initParallax() {
    if (prefersReducedMotion) return;
    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;

    let ticking = false;
    let scrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          els.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.3;
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
            el.style.transform = 'translate3d(0,' + (-offset * 0.1) + 'px,0)';
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── Stagger Group Helper ─── */
  function initStaggerGroups() {
    const groups = document.querySelectorAll('[data-stagger-group]');
    groups.forEach(group => {
      const delay = parseInt(group.dataset.staggerGroup || '100', 10);
      const children = group.querySelectorAll('[data-animate]');
      children.forEach((child, i) => {
        child.dataset.animateStagger = delay;
        child.dataset.staggerIndex = i;
      });
    });
  }

  /* ─── Lazy Image Loading with Blur-Up ─── */
  function initLazyImages() {
    const images = document.querySelectorAll('img[data-lazy]');
    if (!images.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const src = img.dataset.lazy;
        const srcset = img.dataset.lazySrcset;

        img.onload = () => {
          img.classList.add('lazy-loaded');
          img.classList.remove('lazy-loading');
          img.removeAttribute('data-lazy');
        };

        img.classList.add('lazy-loading');
        if (srcset) img.srcset = srcset;
        img.src = src;
        observer.unobserve(img);
      });
    }, { rootMargin: '200px 0px' });

    images.forEach(img => observer.observe(img));
  }

  /* ─── Smooth Scroll for Anchor Links ─── */
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ─── Back to Top Button ─── */
  function initBackToTop() {
    const btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          btn.classList.toggle('back-to-top--visible', window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ─── Sticky Nav Scroll Detection ─── */
  function initStickyNav() {
    const nav = document.querySelector('[data-sticky-nav]');
    if (!nav) return;

    const sections = document.querySelectorAll('[data-nav-section]');
    const links = nav.querySelectorAll('a[href^="#"]');

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('nav--scrolled', window.scrollY > 50);

          // Highlight active section
          let current = '';
          sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.id;
          });
          links.forEach(link => {
            link.classList.toggle('nav-link--active',
              link.getAttribute('href') === '#' + current);
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── Smooth Height Transition Helper ─── */
  window.smoothHeight = function (el, open) {
    if (open) {
      el.style.height = '0px';
      el.style.overflow = 'hidden';
      el.style.display = '';
      const targetHeight = el.scrollHeight;
      el.style.transition = 'height 0.35s ease';
      el.style.height = targetHeight + 'px';
      setTimeout(() => { el.style.height = 'auto'; el.style.overflow = ''; }, 350);
    } else {
      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
      el.offsetHeight; // force reflow
      el.style.transition = 'height 0.35s ease';
      el.style.height = '0px';
      setTimeout(() => { el.style.display = 'none'; el.style.overflow = ''; }, 350);
    }
  };

  /* ─── Toast Notification System ─── */
  window.showToast = function (message, type = 'info', duration = 4000) {
    let container = document.querySelector('[data-toast-container]');
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('data-toast-container', '');
      container.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:0.75rem;pointer-events:none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert');
    const bgMap = { info: '#1e293b', success: '#166534', error: '#991b1b', warning: '#92400e' };
    toast.style.cssText = 'pointer-events:auto;padding:0.875rem 1.25rem;border-radius:0.5rem;color:#fff;font-family:inherit;font-size:0.875rem;max-width:360px;transform:translateX(120%);transition:transform 0.3s ease,opacity 0.3s ease;opacity:0;background:' + (bgMap[type] || bgMap.info);
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  /* ─── Typewriter Effect ─── */
  window.initTypewriter = function (el, options = {}) {
    if (prefersReducedMotion) {
      el.textContent = options.text || el.textContent;
      return;
    }
    const text = options.text || el.textContent;
    const speed = options.speed || 50;
    const delay = options.delay || 0;
    const cursor = options.cursor !== false;
    el.textContent = '';
    if (cursor) el.classList.add('typewriter-cursor');

    setTimeout(() => {
      let i = 0;
      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(() => requestAnimationFrame(type), speed);
        } else if (cursor) {
          el.classList.add('typewriter-done');
        }
      }
      requestAnimationFrame(type);
    }, delay);
  };

  /* ─── Split Text Animation Helper ─── */
  window.splitText = function (el, mode = 'chars') {
    const text = el.textContent.trim();
    const items = mode === 'words' ? text.split(/\s+/) : text.split('');
    el.innerHTML = '';
    el.setAttribute('aria-label', text);

    items.forEach((item, i) => {
      const span = document.createElement('span');
      span.textContent = item === ' ' ? '\u00A0' : item;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      span.style.transitionDelay = (i * 40) + 'ms';
      span.setAttribute('aria-hidden', 'true');
      el.appendChild(span);
    });

    // Trigger animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        el.querySelectorAll('span').forEach(s => {
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        });
        observer.unobserve(el);
      });
    }, { threshold: 0.3 });
    observer.observe(el);
  };

  /* ─── Page Load Animations ─── */
  function initPageLoadAnimations() {
    const loadEls = document.querySelectorAll('[data-load-animate]');
    if (!loadEls.length) return;

    if (prefersReducedMotion) {
      loadEls.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    loadEls.forEach((el, i) => {
      const delay = parseInt(el.dataset.loadDelay || (i * 100), 10);
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.transitionDelay = delay + 'ms';

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  /* ─── Loading Screen ─── */
  function initLoadingScreen() {
    const loader = document.querySelector('[data-loader]');
    if (!loader) return;

    const bar = loader.querySelector('[data-loader-bar]');
    let progress = 0;

    function step() {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90;
      if (bar) bar.style.width = progress + '%';
      if (document.readyState !== 'complete') {
        requestAnimationFrame(step);
      } else {
        if (bar) bar.style.width = '100%';
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          setTimeout(() => loader.remove(), 500);
        }, 300);
      }
    }

    loader.style.transition = 'opacity 0.5s ease';
    if (bar) bar.style.transition = 'width 0.3s ease';
    requestAnimationFrame(step);
  }

  /* ─── Initialize Everything ─── */
  function init() {
    initStaggerGroups();
    initScrollAnimations();
    initCounters();
    initParallax();
    initLazyImages();
    initSmoothScroll();
    initBackToTop();
    initStickyNav();
    initPageLoadAnimations();
    initLoadingScreen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ─── CSS Injection (minimal base styles) ─── */
  const style = document.createElement('style');
  style.textContent = `
    [data-animate].animate-hidden { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    [data-animate="fade"].animate-hidden { transform: none; }
    [data-animate="slide-up"].animate-hidden { transform: translateY(40px); }
    [data-animate="slide-down"].animate-hidden { transform: translateY(-40px); }
    [data-animate="slide-left"].animate-hidden { transform: translateX(-40px); }
    [data-animate="slide-right"].animate-hidden { transform: translateX(40px); }
    [data-animate="scale-up"].animate-hidden { transform: scale(0.9); }
    [data-animate="scale-down"].animate-hidden { transform: scale(1.1); }
    [data-animate="reveal"].animate-hidden { clip-path: inset(0 100% 0 0); }
    [data-animate="reveal-down"].animate-hidden { clip-path: inset(0 0 100% 0); }
    [data-animate].animate-visible { opacity: 1; transform: none; clip-path: inset(0 0 0 0); }

    .lazy-loading { filter: blur(10px); transition: filter 0.4s ease; }
    .lazy-loaded { filter: blur(0); }

    .back-to-top { opacity: 0; transform: translateY(20px); pointer-events: none; transition: opacity 0.3s ease, transform 0.3s ease; }
    .back-to-top--visible { opacity: 1; transform: translateY(0); pointer-events: auto; }

    .typewriter-cursor::after { content: '|'; animation: blink 0.7s infinite; }
    .typewriter-done::after { animation: none; opacity: 0; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
      [data-animate].animate-hidden { opacity: 1; transform: none; clip-path: none; }
    }
  `;
  document.head.prepend(style);

})();
