/* ==========================================================================
   CRUSTHY'LIA — MAIN JS
   Lenis smooth scroll, nav, mobile menu, loader, cursor, magnetic buttons
   ========================================================================== */

'use strict';

// ── 1. PAGE LOADER ──────────────────────────────────────────────────────────
const loader = document.getElementById('page-loader');

let loaderHidden = false;
function hideLoader() {
  if (loaderHidden) return;
  loaderHidden = true;
  if (!loader) return;
  gsap.to(loader, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      loader.style.display = 'none';
      document.body.classList.remove('is-loading');
      initHeroAnimations();
    }
  });
}

// ── 2. LENIS SMOOTH SCROLL ───────────────────────────────────────────────────
let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Wire GSAP ScrollTrigger to Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ── 3. NAVIGATION ────────────────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  // Transparent → frosted glass on scroll
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init

  // Active link underline
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('active');
    }
  });
}

// ── 4. MOBILE MENU ────────────────────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  if (!hamburger || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    hamburger.classList.add('is-active');

    // Stagger links in
    gsap.from(mobileLinks, {
      opacity: 0,
      x: -30,
      stagger: 0.06,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.1
    });
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    hamburger.classList.remove('is-active');
  }

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on link click
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close on Escape — named handler prevents duplicate bindings if initMobileMenu is ever re-called
  if (!initMobileMenu._escBound) {
    initMobileMenu._escBound = true;
    document.addEventListener('keydown', function onMobileMenuEsc(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }
}

// ── 5. HERO ANIMATIONS (runs after loader exits) ─────────────────────────────
function initHeroAnimations() {
  const nav = document.getElementById('site-nav');
  const heroContent = document.querySelector('.hero-content');
  const heroCtas = document.querySelectorAll('.hero-buttons .btn');
  const heroImage = document.querySelector('.hero-image-wrap');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Nav slides down
  if (nav) {
    tl.from(nav, { y: -80, opacity: 0, duration: 0.6 }, 0);
  }

  // Hero heading — SplitText line reveal
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1 && window.SplitText) {
    const split = new SplitText(heroH1, { type: 'lines' });
    tl.from(split.lines, {
      y: '120%',
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power4.out',
      clipPath: 'inset(0 0 100% 0)',
    }, 0.3);
  }

  // Hero subtext
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    tl.from(heroSub, { y: 20, opacity: 0, duration: 0.8 }, 0.8);
  }

  // CTA buttons
  if (heroCtas.length) {
    tl.from(heroCtas, { scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.6 }, 1.0);
  }

  // Hero image clip-path reveal
  if (heroImage) {
    tl.from(heroImage, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0.2);
  }

  // Scroll indicator bounce
  if (scrollIndicator) {
    tl.from(scrollIndicator, { opacity: 0, duration: 0.4 }, 1.4);
    gsap.to(scrollIndicator, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 1.5
    });
  }
}

// ── 6. CUSTOM CURSOR (desktop only) ──────────────────────────────────────────
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  if (!cursor || !cursorDot) return;

  // Hide on touch devices
  if (window.matchMedia('(hover: none)').matches) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { left: mouseX, top: mouseY, duration: 0.6, ease: 'power2.out' });
    gsap.to(cursorDot, { left: mouseX, top: mouseY, duration: 0.1 });
  });

  // Grow on interactive elements
  document.querySelectorAll('a, button, .card, .menu-item').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.5, duration: 0.3 }));
    el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
  });

  // Show cursor once mouse moves
  cursor.style.opacity = '0';
  cursorDot.style.opacity = '0';
  window.addEventListener('mousemove', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  }, { once: true });
}

// ── 7. MAGNETIC BUTTONS ───────────────────────────────────────────────────────
function initMagneticButtons() {
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ── 8. SMOOTH ANCHOR SCROLL ───────────────────────────────────────────────────
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// ── 9. BACK TO TOP ────────────────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── 10. FLOATING WHATSAPP BUTTON ──────────────────────────────────────────────
function initFloatingWhatsApp() {
  const floatingWA = document.querySelector('.floating-btn-wa');
  if (!floatingWA) return;
  window.addEventListener('scroll', () => {
    floatingWA.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
}

// ── 11. LOAD SAVED LANGUAGE ───────────────────────────────────────────────────
function loadSavedLanguage() {
  const saved = localStorage.getItem('crusthylia-lang');
  if (saved && window.applyTranslations) {
    window.applyTranslations(saved);
  }
}

// ── 12. INIT ALL ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-loading');

  // Guard: ensure GSAP loaded
  if (typeof gsap === 'undefined') {
    console.warn('Crusthy\'lia: GSAP not loaded');
    if (loader) loader.style.display = 'none';
    return;
  }

  // Guard: ensure Lenis loaded
  if (typeof Lenis !== 'undefined') {
    initLenis();
  }

  initNav();
  initMobileMenu();
  initCursor();
  initMagneticButtons();
  initAnchorScroll();
  initBackToTop();
  initFloatingWhatsApp();
  loadSavedLanguage();

  // Hide loader after minimum display time
  const minLoadTime = 800;
  const startTime = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minLoadTime - elapsed);
    setTimeout(hideLoader, remaining);
  });

  // Fallback: hide loader after 3s regardless
  setTimeout(() => {
    if (loader && loader.style.display !== 'none') {
      hideLoader();
    }
  }, 3000);
});
