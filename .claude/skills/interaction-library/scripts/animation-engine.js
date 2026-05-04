/**
 * Yoshi Labs Animation Engine v1.0
 * Lightweight (under 8KB), accessible, no dependencies.
 * Handles: scroll reveal, counters, text split, parallax, micro-interactions
 */
(function() {
  'use strict';
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
    // Show everything immediately
    document.querySelectorAll('[data-sr], [data-sr-stagger]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // ── Scroll Reveal ──────────────────────────────────────
  const srDefaults = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  
  const srEffects = {
    'fade-up':    { opacity: [0, 1], transform: ['translateY(40px)', 'translateY(0)'] },
    'fade-down':  { opacity: [0, 1], transform: ['translateY(-40px)', 'translateY(0)'] },
    'fade-left':  { opacity: [0, 1], transform: ['translateX(-40px)', 'translateX(0)'] },
    'fade-right': { opacity: [0, 1], transform: ['translateX(40px)', 'translateX(0)'] },
    'fade-in':    { opacity: [0, 1] },
    'scale-up':   { opacity: [0, 1], transform: ['scale(0.92)', 'scale(1)'] },
    'flip-up':    { opacity: [0, 1], transform: ['perspective(600px) rotateX(15deg)', 'perspective(600px) rotateX(0)'] },
  };

  function initScrollReveal() {
    const elements = document.querySelectorAll('[data-sr]');
    
    // Set initial hidden states
    elements.forEach(el => {
      const effect = srEffects[el.dataset.sr] || srEffects['fade-up'];
      el.style.opacity = effect.opacity ? effect.opacity[0] : '';
      if (effect.transform) el.style.transform = effect.transform[0];
      el.style.transition = 'none';
      el.style.willChange = 'opacity, transform';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const effect = srEffects[el.dataset.sr] || srEffects['fade-up'];
        const duration = parseInt(el.dataset.srDuration) || 700;
        const delay = parseInt(el.dataset.srDelay) || 0;
        const easing = el.dataset.srEasing || 'cubic-bezier(0.16, 1, 0.3, 1)';

        setTimeout(() => {
          el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
          el.style.opacity = effect.opacity ? effect.opacity[1] : '';
          if (effect.transform) el.style.transform = effect.transform[1];
          
          setTimeout(() => { el.style.willChange = 'auto'; }, duration);
        }, delay);

        observer.unobserve(el);
      });
    }, srDefaults);

    elements.forEach(el => observer.observe(el));
  }

  // ── Stagger ──────────────────────────────────────────────
  function initStagger() {
    const containers = document.querySelectorAll('[data-sr-stagger]');
    
    containers.forEach(container => {
      const staggerDelay = parseInt(container.dataset.srStagger) || 100;
      const children = Array.from(container.children);
      
      children.forEach(child => {
        child.dataset.sr = child.dataset.sr || 'fade-up';
        // Already initialized by initScrollReveal, just add delay
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const container = entry.target;
        const staggerDelay = parseInt(container.dataset.srStagger) || 100;
        const children = Array.from(container.children);
        
        children.forEach((child, i) => {
          if (i >= 8) return; // Cap at 8 visible staggers
          child.dataset.srDelay = String(i * staggerDelay);
        });

        // Trigger scroll reveal for children
        children.forEach(child => {
          const effect = srEffects[child.dataset.sr] || srEffects['fade-up'];
          const duration = parseInt(child.dataset.srDuration) || 700;
          const delay = parseInt(child.dataset.srDelay) || 0;
          
          setTimeout(() => {
            child.style.transition = `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`;
            child.style.opacity = effect.opacity ? effect.opacity[1] : '';
            if (effect.transform) child.style.transform = effect.transform[1];
          }, delay);
        });

        observer.unobserve(container);
      });
    }, srDefaults);

    containers.forEach(c => observer.observe(c));
  }

  // ── Counter Animation ──────────────────────────────────
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.counterTarget);
        const duration = parseInt(el.dataset.counterDuration) || 2000;
        const decimals = parseInt(el.dataset.counterDecimals) || 0;
        const prefix = el.dataset.counterPrefix || '';
        const suffix = el.dataset.counterSuffix || '';
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        
        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  // ── Text Split Animation ───────────────────────────────
  function initTextSplit() {
    document.querySelectorAll('[data-text-split]').forEach(el => {
      const mode = el.dataset.textSplit; // 'char' or 'word'
      const stagger = parseInt(el.dataset.textStagger) || 30;
      const text = el.textContent.trim();
      el.innerHTML = '';
      
      const units = mode === 'char' ? text.split('') : text.split(' ');
      
      units.forEach((unit, i) => {
        const span = document.createElement('span');
        span.textContent = unit === ' ' ? '\u00A0' : unit;
        if (mode === 'word' && i < units.length - 1) span.textContent += '\u00A0';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * stagger}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * stagger}ms`;
        span.dataset.srTextUnit = '';
        el.appendChild(span);
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          el.querySelectorAll('[data-sr-text-unit]').forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
          observer.unobserve(el);
        });
      }, { threshold: 0.3 });

      observer.observe(el);
    });
  }

  // ── Typewriter Effect ──────────────────────────────────
  function initTypewriter() {
    document.querySelectorAll('[data-typewriter]').forEach(el => {
      const text = el.textContent.trim();
      const speed = parseInt(el.dataset.typewriterSpeed) || 80;
      const delay = parseInt(el.dataset.typewriterDelay) || 0;
      el.textContent = '';
      el.style.borderRight = '2px solid currentColor';
      
      let started = false;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || started) return;
          started = true;
          
          setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
              el.textContent += text[i];
              i++;
              if (i >= text.length) {
                clearInterval(interval);
                setTimeout(() => { el.style.borderRight = 'none'; }, 1000);
              }
            }, speed);
          }, delay);
          
          observer.unobserve(el);
        });
      }, { threshold: 0.5 });
      
      observer.observe(el);
    });
  }

  // ── Parallax ───────────────────────────────────────────
  function initParallax() {
    const elements = document.querySelectorAll('[data-parallax]');
    if (!elements.length) return;

    let ticking = false;
    
    function updateParallax() {
      const scrollY = window.scrollY;
      elements.forEach(el => {
        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.3;
        const rect = el.getBoundingClientRect();
        const inView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!inView) return;
        
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Accordion ──────────────────────────────────────────
  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(accordion => {
      const items = accordion.querySelectorAll('[data-accordion-item]');
      
      items.forEach(item => {
        const trigger = item.querySelector('[data-accordion-trigger]');
        const content = item.querySelector('[data-accordion-content]');
        if (!trigger || !content) return;
        
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)';
        
        trigger.addEventListener('click', () => {
          const isOpen = item.hasAttribute('data-accordion-open');
          
          // Close all
          items.forEach(i => {
            i.removeAttribute('data-accordion-open');
            const c = i.querySelector('[data-accordion-content]');
            if (c) c.style.maxHeight = '0';
            const icon = i.querySelector('[data-accordion-icon]');
            if (icon) icon.style.transform = 'rotate(0deg)';
          });
          
          // Open clicked (if wasn't open)
          if (!isOpen) {
            item.setAttribute('data-accordion-open', '');
            content.style.maxHeight = content.scrollHeight + 'px';
            const icon = item.querySelector('[data-accordion-icon]');
            if (icon) icon.style.transform = 'rotate(180deg)';
          }
        });
      });
    });
  }

  // ── Carousel ───────────────────────────────────────────
  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
      const slides = carousel.querySelectorAll('[data-carousel-slide]');
      if (slides.length < 2) return;
      
      let current = 0;
      const autoplayMs = parseInt(carousel.dataset.carouselAutoplay) || 0;
      
      // Create dots
      if (carousel.dataset.carouselDots === 'true') {
        const dotsContainer = document.createElement('div');
        dotsContainer.style.cssText = 'display:flex;gap:8px;justify-content:center;margin-top:20px;';
        slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.style.cssText = `width:10px;height:10px;border-radius:50%;border:none;background:${i===0?'#333':'#ccc'};cursor:pointer;transition:background 0.3s`;
          dot.setAttribute('aria-label', `Go to slide ${i+1}`);
          dot.addEventListener('click', () => goTo(i));
          dotsContainer.appendChild(dot);
        });
        carousel.appendChild(dotsContainer);
      }

      // Style slides
      slides.forEach((slide, i) => {
        slide.style.cssText = `display:${i===0?'block':'none'};opacity:${i===0?'1':'0'};transition:opacity 0.5s ease;`;
      });

      function goTo(index) {
        slides[current].style.opacity = '0';
        setTimeout(() => { slides[current].style.display = 'none'; }, 300);
        current = index;
        slides[current].style.display = 'block';
        requestAnimationFrame(() => { slides[current].style.opacity = '1'; });
        
        // Update dots
        const dots = carousel.querySelectorAll('[aria-label^="Go to slide"]');
        dots.forEach((d, i) => { d.style.background = i === current ? '#333' : '#ccc'; });
      }

      function next() { goTo((current + 1) % slides.length); }
      function prev() { goTo((current - 1 + slides.length) % slides.length); }

      if (autoplayMs > 0) {
        let timer = setInterval(next, autoplayMs);
        carousel.addEventListener('mouseenter', () => clearInterval(timer));
        carousel.addEventListener('mouseleave', () => { timer = setInterval(next, autoplayMs); });
      }
    });
  }

  // ── Sticky Nav ─────────────────────────────────────────
  function initStickyNav() {
    document.querySelectorAll('[data-sticky-nav]').forEach(nav => {
      const threshold = parseInt(nav.dataset.stickyThreshold) || 100;
      nav.style.transition = 'background-color 0.3s, box-shadow 0.3s, padding 0.3s';
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            nav.setAttribute('data-sticky-active', '');
          } else {
            nav.removeAttribute('data-sticky-active');
          }
        },
        { threshold: 0, rootMargin: `-${threshold}px 0px 0px 0px` }
      );
      
      observer.observe(document.body);
    });
  }

  // ── Mobile Menu ────────────────────────────────────────
  function initMobileMenu() {
    const toggle = document.querySelector('[data-mobile-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;
    
    const direction = menu.dataset.mobileMenuDirection || 'right';
    menu.style.cssText = `position:fixed;top:0;${direction}:${direction==='right'?'-100%':'-100%'};width:min(300px,80vw);height:100vh;z-index:999;transition:${direction} 0.4s cubic-bezier(0.16,1,0.3,1);`;
    
    let isOpen = false;
    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      menu.style[direction] = isOpen ? '0' : '-100%';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // ── Back to Top ────────────────────────────────────────
  function initBackToTop() {
    document.querySelectorAll('[data-back-to-top]').forEach(btn => {
      const threshold = parseInt(btn.dataset.backToTopThreshold) || 300;
      btn.style.cssText = 'position:fixed;bottom:24px;right:24px;opacity:0;transform:translateY(20px);transition:opacity 0.3s,transform 0.3s;pointer-events:none;z-index:99;';
      
      window.addEventListener('scroll', () => {
        if (window.scrollY > threshold) {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
          btn.style.pointerEvents = 'auto';
        } else {
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(20px)';
          btn.style.pointerEvents = 'none';
        }
      }, { passive: true });
      
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // ── Initialize Everything ──────────────────────────────
  function init() {
    initScrollReveal();
    initStagger();
    initCounters();
    initTextSplit();
    initTypewriter();
    initParallax();
    initAccordions();
    initCarousels();
    initStickyNav();
    initMobileMenu();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
