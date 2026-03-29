/* ==========================================================================
   CRUSTHY'LIA — ANIMATIONS JS
   All GSAP + ScrollTrigger scroll-driven animations
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Crusthy\'lia: GSAP or ScrollTrigger not loaded — animations skipped');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);

  // ── 1. TEXT REVEALS ───────────────────────────────────────────────────────
  // Apply to every .reveal-text element (h2, h3, pull quotes, eyebrows)
  gsap.utils.toArray('.reveal-text').forEach(el => {
    if (window.SplitText) {
      const split = new SplitText(el, { type: 'lines,words' });
      gsap.from(split.words, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 60,
        rotateX: -15,
        stagger: 0.05,
        duration: 0.9,
        ease: 'power3.out'
      });
    } else {
      // Fallback without SplitText
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  });

  // ── 2. CARD STAGGER REVEALS ───────────────────────────────────────────────
  gsap.utils.toArray('.card-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.card');
    if (!cards.length) return;
    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      scale: 0.96,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power2.out'
    });
  });

  // ── 3. PARALLAX HERO IMAGE ────────────────────────────────────────────────
  const heroImageInner = document.querySelector('.hero-image-inner');
  if (heroImageInner) {
    gsap.to(heroImageInner, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: '30%',
      ease: 'none'
    });
  }

  // ── 4. HORIZONTAL SCROLL SECTION ─────────────────────────────────────────
  const track = document.querySelector('.h-scroll-track');
  if (track) {
    const hScrollContainer = document.querySelector('.h-scroll-container');

    // Wait for layout
    ScrollTrigger.refresh();

    const setupHScroll = (retried = false) => {
      // Disable GSAP pin on mobile — use native touch scroll instead
      if (window.innerWidth < 768) return;

      const totalWidth = track.scrollWidth - window.innerWidth;
      if (totalWidth <= 0) {
        // Retry once after images have had time to render
        if (!retried) {
          setTimeout(() => setupHScroll(true), 500);
        }
        return;
      }

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: hScrollContainer || track,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    };

    window.addEventListener('load', () => {
      setupHScroll();
      // Double rAF ensures layout has fully settled after load (images rendered, paint done)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      }));
    });

    // Re-setup if crossing the mobile/desktop threshold on resize
    let wasDesktop = window.innerWidth >= 768;
    window.addEventListener('resize', () => {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop !== wasDesktop) {
        ScrollTrigger.getAll().forEach(t => t.kill());
        wasDesktop = isDesktop;
        setupHScroll();
        ScrollTrigger.refresh();
      }
    });
  }

  // ── 5. COUNTER ANIMATION ──────────────────────────────────────────────────
  gsap.utils.toArray('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const suffix = counter.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      onUpdate() {
        counter.textContent = Math.round(obj.val) + suffix;
      }
    });
  });

  // ── 6. IMAGE CLIP-PATH REVEALS ────────────────────────────────────────────
  gsap.utils.toArray('.img-reveal').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.1,
      ease: 'power3.inOut'
    });
  });

  // ── 7. GENERAL FADE-UP ELEMENTS ───────────────────────────────────────────
  gsap.utils.toArray('.fade-up').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out'
    });
  });

  // ── 8. SECTION BACKGROUND TRANSITIONS (nav color adaptation) ─────────────
  const nav = document.getElementById('site-nav');
  if (nav) {
    document.querySelectorAll('.section-dark').forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80px',
        end: 'bottom 80px',
        onToggle: ({ isActive }) => {
          nav.classList.toggle('nav-light', isActive);
        }
      });
    });
  }

  // ── 9. SPLIT LAYOUT ANIMATION (image + text pairs) ───────────────────────
  gsap.utils.toArray('.split-layout').forEach(layout => {
    const img = layout.querySelector('.split-image');
    const content = layout.querySelector('.split-content');

    if (!img && !content) return;

    if (img) {
      gsap.from(img, {
        scrollTrigger: { trigger: layout, start: 'top 75%' },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power3.out'
      });
    }

    if (content) {
      gsap.from(content, {
        scrollTrigger: { trigger: layout, start: 'top 75%' },
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15
      });
    }
  });

  // ── 10. GOLD LINE ANIMATION ───────────────────────────────────────────────
  gsap.utils.toArray('.gold-line').forEach(line => {
    gsap.from(line, {
      scrollTrigger: { trigger: line, start: 'top 90%' },
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // ── 11. STAT CARDS FADE ───────────────────────────────────────────────────
  gsap.utils.toArray('.stat-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 85%' },
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // ── 12. BLOG CARD HOVER EFFECT (subtle lift) ─────────────────────────────
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.inOut' });
    });
  });

  // ── 13. FAQ ACCORDION ────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    if (!question || !answer) return;

    // Init: close all
    gsap.set(answer, { height: 0, opacity: 0, overflow: 'hidden' });

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        const a = openItem.querySelector('.faq-answer');
        const ic = openItem.querySelector('.faq-icon');
        gsap.to(a, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut' });
        if (ic) gsap.to(ic, { rotation: 0, duration: 0.3 });
      });

      if (!isOpen) {
        item.classList.add('open');
        gsap.to(answer, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
        if (icon) gsap.to(icon, { rotation: 45, duration: 0.3 });
        question.setAttribute('aria-expanded', 'true');
      } else {
        question.setAttribute('aria-expanded', 'false');
      }
    });

    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('role', 'button');
  });

  // ── 14. SWIPER CAROUSELS ─────────────────────────────────────────────────
  if (typeof Swiper !== 'undefined') {
    // Brunch formula carousel (mobile)
    const brunchSwiper = document.querySelector('.brunch-swiper');
    if (brunchSwiper) {
      new Swiper(brunchSwiper, {
        slidesPerView: 1.2,
        spaceBetween: 16,
        centeredSlides: true,
        breakpoints: {
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3, centeredSlides: false }
        },
        pagination: { el: '.swiper-pagination', clickable: true },
      });
    }

    // Blog carousel (mobile)
    const blogSwiper = document.querySelector('.blog-swiper');
    if (blogSwiper) {
      new Swiper(blogSwiper, {
        slidesPerView: 1.1,
        spaceBetween: 16,
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        },
        pagination: { el: '.swiper-pagination', clickable: true },
      });
    }

    // Menu category preview swiper
    const menuSwiper = document.querySelector('.menu-preview-swiper');
    if (menuSwiper) {
      new Swiper(menuSwiper, {
        slidesPerView: 1.3,
        spaceBetween: 20,
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3.5 }
        },
      });
    }
  }

  // Refresh ScrollTrigger after all setup
  ScrollTrigger.refresh();
});
