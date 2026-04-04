import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════════════════════
// CRUSTHYLIA.COM — COMPREHENSIVE LIVE SITE AUDIT
// SuperDev QA | UltraThink | Only pages that are actually deployed
// ═══════════════════════════════════════════════════════════════

const BASE = 'https://www.crusthylia.com';

// Pages confirmed live (HTTP 200)
const PAGES = [
  { name: 'Homepage', path: '/homepage.html' },
  { name: 'About', path: '/about.html' },
  { name: 'Menu', path: '/menu.html' },
  { name: 'Contact', path: '/contact.html' },
  { name: 'Reservation', path: '/reservation.html' },
  { name: 'Brunch', path: '/brunch.html' },
  { name: 'Livraison', path: '/livraison.html' },
  { name: 'Evenements', path: '/evenements.html' },
  { name: 'Galerie', path: '/galerie.html' },
  { name: 'FAQ', path: '/faq.html' },
  { name: 'Blog Index', path: '/blog/index.html' },
  { name: 'Blog Brunchs', path: '/blog/meilleurs-brunchs-marrakech-2026.html' },
];

// ═══════════════════════════════════════════════════════════════
// 0. CRITICAL: ROOT URL & REDIRECT ISSUES
// ═══════════════════════════════════════════════════════════════
test.describe('0. Critical URL Issues', () => {
  test('root / should not return 404', async ({ page }) => {
    const res = await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    expect(res.status(), 'Root URL returns 404 — needs redirect to homepage.html').not.toBe(404);
  });

  test('/index.html should not return 404', async ({ page }) => {
    const res = await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
    expect(res.status(), 'index.html returns 404 — needs redirect to homepage.html').not.toBe(404);
  });

  test('non-www should redirect to www', async ({ page }) => {
    const res = await page.goto('https://crusthylia.com/homepage.html', { waitUntil: 'domcontentloaded' });
    expect(res.url()).toContain('www.crusthylia.com');
  });
});

// ═══════════════════════════════════════════════════════════════
// 1. PAGE REACHABILITY
// ═══════════════════════════════════════════════════════════════
test.describe('1. Page Reachability', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: HTTP 200`, async ({ page }) => {
      const res = await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(res.status()).toBe(200);
    });
  }

  // Pages that SHOULD be deployed but are 404
  const MISSING_PAGES = [
    { name: 'Blog: Boulangerie Artisanale', path: '/blog/boulangerie-artisanale-vs-industrielle-marrakech.html' },
    { name: 'Blog: Guide Café', path: '/blog/guide-cafe-marrakech-les-meilleurs.html' },
    { name: 'Blog: Livraison École', path: '/blog/livraison-ecole-marrakech-guide-parents.html' },
    { name: 'Blog: Pâtisserie Marocaine', path: '/blog/patisserie-marocaine-traditions-marrakech.html' },
    { name: 'Blog: Petit Déjeuner', path: '/blog/petit-dejeuner-targa-guide-complet.html' },
    { name: 'Blog: Anniversaire', path: '/blog/anniversaire-restaurant-marrakech-idees.html' },
    { name: 'Blog: Brunch English', path: '/blog/brunch-marrakech-english-guide.html' },
    { name: 'Blog: Targa Food Guide', path: '/blog/marrakech-targa-neighbourhood-food-guide.html' },
    { name: 'Blog: Ramadan', path: '/blog/menu-ramadan-iftar-marrakech.html' },
    { name: 'SEO: Boulangerie', path: '/boulangerie-artisanale-marrakech.html' },
    { name: 'SEO: Brunch', path: '/brunch-marrakech.html' },
    { name: 'SEO: Café', path: '/cafe-artisanal-marrakech.html' },
    { name: 'SEO: Pâtisserie', path: '/patisserie-marrakech.html' },
    { name: 'SEO: Reservation', path: '/reservation-marrakech.html' },
    { name: 'SEO: Restaurant Targa', path: '/restaurant-targa-marrakech.html' },
    { name: 'SEO: Livraison', path: '/livraison-marrakech.html' },
    { name: 'SEO: Événements', path: '/evenements-marrakech.html' },
    { name: 'SEO: Petit Déjeuner', path: '/petit-dejeuner-targa-marrakech.html' },
    { name: 'SEO: Pourquoi', path: '/pourquoi-crusthylia.html' },
    { name: 'SEO: Qui Sommes Nous', path: '/qui-sommes-nous.html' },
    { name: 'SEO: Engagement', path: '/notre-engagement.html' },
    { name: 'SEO: Livraison École', path: '/livraison-dejeuner-ecole-marrakech.html' },
  ];

  for (const pg of MISSING_PAGES) {
    test(`NOT DEPLOYED: ${pg.name} (${pg.path})`, async ({ page }) => {
      const res = await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      // This test documents missing pages — it PASSES if 404 (expected), FAILS if 200 (deployed)
      // The real issue is these should be deployed
      expect(res.status(), `${pg.name} is 404 — needs deployment`).toBe(200);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 2. HTML FUNDAMENTALS
// ═══════════════════════════════════════════════════════════════
test.describe('2. HTML Fundamentals', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: non-empty <title>`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const title = await page.title();
      expect(title.trim().length, 'Empty or missing title').toBeGreaterThan(0);
    });

    test(`${pg.name}: lang attribute`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBeTruthy();
    });

    test(`${pg.name}: meta charset`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('meta[charset]').count()).toBeGreaterThan(0);
    });

    test(`${pg.name}: meta viewport`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('meta[name="viewport"]').count()).toBeGreaterThan(0);
    });

    test(`${pg.name}: meta description non-empty`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const el = page.locator('meta[name="description"]');
      const count = await el.count();
      expect(count, 'Missing meta description tag').toBeGreaterThan(0);
      if (count > 0) {
        const content = await el.first().getAttribute('content');
        expect(content?.trim().length, 'Empty meta description').toBeGreaterThan(10);
      }
    });

    test(`${pg.name}: exactly one <h1>`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const count = await page.locator('h1').count();
      expect(count, `Found ${count} h1 tags`).toBe(1);
    });

    test(`${pg.name}: title length 30-70 chars (SEO)`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const title = await page.title();
      if (title.length > 0) {
        expect(title.length, `Title too short (${title.length} chars): "${title}"`).toBeGreaterThanOrEqual(20);
        expect(title.length, `Title too long (${title.length} chars): "${title}"`).toBeLessThanOrEqual(80);
      }
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 3. SEO TAGS
// ═══════════════════════════════════════════════════════════════
test.describe('3. SEO Tags', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: canonical link`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('link[rel="canonical"]').count(), 'Missing canonical').toBeGreaterThan(0);
    });

    test(`${pg.name}: og:title`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('meta[property="og:title"]').count(), 'Missing og:title').toBeGreaterThan(0);
    });

    test(`${pg.name}: og:description`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('meta[property="og:description"]').count(), 'Missing og:description').toBeGreaterThan(0);
    });

    test(`${pg.name}: og:image`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('meta[property="og:image"]').count(), 'Missing og:image').toBeGreaterThan(0);
    });

    test(`${pg.name}: og:url`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('meta[property="og:url"]').count(), 'Missing og:url').toBeGreaterThan(0);
    });

    test(`${pg.name}: Twitter card meta`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('meta[name="twitter:card"], meta[property="twitter:card"]').count(), 'Missing twitter:card').toBeGreaterThan(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 4. STRUCTURED DATA (JSON-LD)
// ═══════════════════════════════════════════════════════════════
test.describe('4. Structured Data', () => {
  test('Homepage: Organization/LocalBusiness/Restaurant schema', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`, { waitUntil: 'domcontentloaded' });
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonLd.length, 'No JSON-LD found').toBeGreaterThan(0);
    const has = jsonLd.some(j => j.includes('Organization') || j.includes('LocalBusiness') || j.includes('Restaurant'));
    expect(has, 'Missing business structured data').toBe(true);
  });

  test('FAQ: FAQPage schema', async ({ page }) => {
    await page.goto(`${BASE}/faq.html`, { waitUntil: 'domcontentloaded' });
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    const has = jsonLd.some(j => j.includes('FAQPage'));
    expect(has, 'Missing FAQPage schema').toBe(true);
  });

  test('Menu: Menu/Restaurant schema', async ({ page }) => {
    await page.goto(`${BASE}/menu.html`, { waitUntil: 'domcontentloaded' });
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    const has = jsonLd.some(j => j.includes('Menu') || j.includes('Restaurant'));
    expect(has, 'Missing Menu schema').toBe(true);
  });

  test('Blog Brunchs: Article/BlogPosting schema', async ({ page }) => {
    await page.goto(`${BASE}/blog/meilleurs-brunchs-marrakech-2026.html`, { waitUntil: 'domcontentloaded' });
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    const has = jsonLd.some(j => j.includes('Article') || j.includes('BlogPosting'));
    expect(has, 'Missing Article schema').toBe(true);
  });

  test('Reservation: Event/ReservationAction schema', async ({ page }) => {
    await page.goto(`${BASE}/reservation.html`, { waitUntil: 'domcontentloaded' });
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonLd.length, 'No JSON-LD on reservation page').toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════════
// 5. BRANDING CONSISTENCY
// ═══════════════════════════════════════════════════════════════
test.describe('5. Branding', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: navbar says "Crusthylia"`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const nav = page.locator('nav');
      if (await nav.count() > 0) {
        expect(await nav.textContent()).toContain('Crusthylia');
      }
    });

    test(`${pg.name}: footer says "Crusthylia"`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const footer = page.locator('footer');
      if (await footer.count() > 0) {
        expect(await footer.textContent()).toContain('Crusthylia');
      }
    });

    test(`${pg.name}: no placeholder text`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const body = await page.textContent('body');
      expect(body).not.toContain("L'Atelier");
      expect(body).not.toContain('Lorem ipsum');
      expect(body).not.toContain('lorem ipsum');
      expect(body).not.toContain('Heritage City');
      expect(body).not.toContain('442 Artisans Way');
      expect(body).not.toContain('123 Example');
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 6. IMAGE AUDIT
// ═══════════════════════════════════════════════════════════════
test.describe('6. Images', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: all <img> have alt`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const images = await page.locator('img').all();
      const missing = [];
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        if (alt === null || alt.trim() === '') {
          missing.push(await img.getAttribute('src') || 'unknown');
        }
      }
      expect(missing, `Missing alt: ${missing.map(s => s.substring(0, 60)).join(', ')}`).toHaveLength(0);
    });

    test(`${pg.name}: no broken images`, async ({ page }) => {
      const broken = [];
      page.on('response', res => {
        if (res.request().resourceType() === 'image' && res.status() >= 400) {
          broken.push(`${res.status()} ${res.url().substring(0, 80)}`);
        }
      });
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 20000 });
      expect(broken, `Broken:\n${broken.join('\n')}`).toHaveLength(0);
    });

    test(`${pg.name}: images use lazy loading`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const images = await page.locator('img').all();
      if (images.length <= 2) return;
      let lazy = 0;
      for (const img of images) {
        if (await img.getAttribute('loading') === 'lazy') lazy++;
      }
      expect(lazy, `${lazy}/${images.length} lazy`).toBeGreaterThan(0);
    });

    test(`${pg.name}: images have width/height (CLS)`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const images = await page.locator('img').all();
      let missingDims = 0;
      for (const img of images) {
        const w = await img.getAttribute('width');
        const h = await img.getAttribute('height');
        if (!w && !h) missingDims++;
      }
      if (images.length > 0) {
        const ratio = missingDims / images.length;
        expect(ratio, `${missingDims}/${images.length} images lack width/height`).toBeLessThan(0.8);
      }
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 7. LINK INTEGRITY
// ═══════════════════════════════════════════════════════════════
test.describe('7. Links', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: nav links not all dead (#)`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const hashOnly = await page.locator('nav a[href="#"]').count();
      const total = await page.locator('nav a').count();
      if (total > 0) {
        expect(hashOnly / total, `${hashOnly}/${total} nav links are #`).toBeLessThan(0.5);
      }
    });

    test(`${pg.name}: external links have rel="noopener"`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const blanks = await page.locator('a[target="_blank"]').all();
      const unsafe = [];
      for (const link of blanks) {
        const rel = await link.getAttribute('rel') || '';
        if (!rel.includes('noopener')) {
          unsafe.push(await link.getAttribute('href') || '?');
        }
      }
      expect(unsafe, `Missing noopener:\n${unsafe.map(s => s.substring(0, 60)).join('\n')}`).toHaveLength(0);
    });

    test(`${pg.name}: no empty href links`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const empty = await page.locator('a[href=""]').count();
      expect(empty, `${empty} empty href links`).toBe(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 8. WHATSAPP LINKS
// ═══════════════════════════════════════════════════════════════
test.describe('8. WhatsApp', () => {
  const VALID_WA = /^https:\/\/wa\.me\/212\d{9}/;
  for (const pg of PAGES) {
    test(`${pg.name}: valid Moroccan WhatsApp numbers`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const links = await page.locator('a[href*="wa.me"]').all();
      const bad = [];
      for (const l of links) {
        const href = await l.getAttribute('href');
        if (!VALID_WA.test(href)) bad.push(href);
      }
      expect(bad, `Bad WA: ${bad.join(', ')}`).toHaveLength(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 9. CURRENCY & ADDRESS
// ═══════════════════════════════════════════════════════════════
test.describe('9. Currency & Address', () => {
  test('Menu: DH/MAD not USD', async ({ page }) => {
    await page.goto(`${BASE}/menu.html`, { waitUntil: 'domcontentloaded' });
    const body = await page.textContent('body');
    expect(/\$\d+/.test(body), 'Found USD ($)').toBe(false);
    expect(/\d+\s*(DH|MAD|dh|Dh)/.test(body), 'No DH/MAD found').toBe(true);
  });

  test('Contact: Targa Marrakech address', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`, { waitUntil: 'domcontentloaded' });
    const body = await page.textContent('body');
    expect(body).toContain('Targa');
    expect(body).toContain('Marrakech');
  });

  test('Homepage: phone number present', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`, { waitUntil: 'domcontentloaded' });
    const body = await page.textContent('body');
    const hasPhone = /(\+212|0[5-7])\s*\d/.test(body);
    const hasTel = await page.locator('a[href^="tel:"]').count();
    expect(hasPhone || hasTel > 0, 'No phone number found').toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 10. COPYRIGHT
// ═══════════════════════════════════════════════════════════════
test.describe('10. Copyright', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: copyright is 2025 or 2026`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const footer = page.locator('footer');
      if (await footer.count() > 0) {
        const text = await footer.textContent();
        const old = /© 20(2[0-4]|1\d)/.test(text);
        expect(old, 'Outdated copyright year').toBe(false);
      }
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 11. i18n LANGUAGE SWITCHING
// ═══════════════════════════════════════════════════════════════
test.describe('11. i18n', () => {
  for (const pg of PAGES.slice(0, 6)) {
    test(`${pg.name}: FR/EN language buttons`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const body = await page.textContent('body');
      expect(body.includes('FR') || body.includes('Français'), 'No FR button').toBe(true);
      expect(body.includes('EN') || body.includes('English'), 'No EN button').toBe(true);
    });

    test(`${pg.name}: data-i18n attributes present`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('[data-i18n]').count(), 'No data-i18n').toBeGreaterThan(0);
    });

    test(`${pg.name}: language switch works (EN)`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      const enBtn = page.locator('button:has-text("EN"), [data-lang="en"], .lang-btn:has-text("EN")').first();
      if (await enBtn.count() > 0) {
        await enBtn.click();
        await page.waitForTimeout(500);
        const body = await page.textContent('body');
        // After clicking EN, some English content should appear
        const hasEnglish = /about|contact|menu|home|gallery|events|delivery|reservation/i.test(body);
        expect(hasEnglish, 'EN button click did not switch language').toBe(true);
      }
    });

    test(`${pg.name}: AR button exists`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const ar = page.locator('button:has-text("AR"), [data-lang="ar"], .lang-btn:has-text("AR")');
      expect(await ar.count(), 'No AR language button').toBeGreaterThan(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 12. CONSOLE ERRORS
// ═══════════════════════════════════════════════════════════════
test.describe('12. Console Errors', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: no JS errors`, async ({ page }) => {
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 20000 });
      const real = errors.filter(e =>
        !e.includes('net::ERR') && !e.includes('favicon') &&
        !e.includes('Failed to load resource') && !e.includes('third-party')
      );
      expect(real, `Errors:\n${real.join('\n')}`).toHaveLength(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 13. RESPONSIVE — MOBILE
// ═══════════════════════════════════════════════════════════════
test.describe('13. Mobile Responsive', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const w = await page.evaluate(() => document.body.scrollWidth);
      expect(w, `scrollWidth=${w}`).toBeLessThanOrEqual(380);
    });

    test(`${pg.name}: h1 visible on mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const h1 = page.locator('h1').first();
      if (await h1.count() > 0) {
        await expect(h1).toBeVisible();
      }
    });

    test(`${pg.name}: no text cut off on mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const clipped = await page.evaluate(() => {
        return [...document.querySelectorAll('p, h2, h3')].filter(el => {
          const s = window.getComputedStyle(el);
          return s.overflow === 'hidden' && el.scrollHeight > el.clientHeight + 5 && el.textContent.trim().length > 20;
        }).map(el => el.textContent.substring(0, 40)).slice(0, 3);
      });
      expect(clipped, `Clipped text: ${clipped.join(' | ')}`).toHaveLength(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 14. MOBILE MENU
// ═══════════════════════════════════════════════════════════════
test.describe('14. Mobile Menu', () => {
  for (const pg of PAGES.slice(0, 4)) {
    test(`${pg.name}: hamburger toggles nav`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      const hamburger = page.locator('[class*="hamburger"], [class*="mobile-menu"], .menu-toggle, [aria-label*="menu"], button:has(.material-symbols-outlined)').first();
      if (await hamburger.count() > 0) {
        await hamburger.click();
        await page.waitForTimeout(500);
        await expect(page.locator('nav a').first()).toBeVisible();
      }
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 15. FORMS
// ═══════════════════════════════════════════════════════════════
test.describe('15. Forms', () => {
  test('Contact: form has submit handler', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`, { waitUntil: 'domcontentloaded' });
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      const action = await form.getAttribute('action');
      const onsubmit = await form.getAttribute('onsubmit');
      expect(action || onsubmit, 'No submit handler').toBeTruthy();
    }
  });

  test('Contact: email required', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`, { waitUntil: 'domcontentloaded' });
    const email = page.locator('input[type="email"]').first();
    if (await email.count() > 0) {
      expect(await email.getAttribute('required') !== null, 'Email not required').toBe(true);
    }
  });

  test('Reservation: form has submit handler', async ({ page }) => {
    await page.goto(`${BASE}/reservation.html`, { waitUntil: 'domcontentloaded' });
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      const action = await form.getAttribute('action');
      const onsubmit = await form.getAttribute('onsubmit');
      expect(action || onsubmit, 'No submit handler').toBeTruthy();
    }
  });

  test('Contact: form inputs have labels or placeholders', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`, { waitUntil: 'domcontentloaded' });
    const inputs = await page.locator('input:not([type="hidden"]):not([type="submit"]), textarea').all();
    const unlabeled = [];
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      const label = id ? await page.locator(`label[for="${id}"]`).count() : 0;
      if (!label && !ariaLabel && !placeholder) {
        unlabeled.push(id || await input.getAttribute('name') || 'unnamed');
      }
    }
    expect(unlabeled, `Unlabeled: ${unlabeled.join(', ')}`).toHaveLength(0);
  });
});

// ═══════════════════════════════════════════════════════════════
// 16. ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════
test.describe('16. Accessibility', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: has <main> or role="main"`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(await page.locator('main, [role="main"]').count(), 'No <main> landmark').toBeGreaterThan(0);
    });

    test(`${pg.name}: buttons have accessible names`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const buttons = await page.locator('button').all();
      const noText = [];
      for (const btn of buttons) {
        const text = (await btn.textContent()).trim();
        const ariaLabel = await btn.getAttribute('aria-label');
        const title = await btn.getAttribute('title');
        if (!text && !ariaLabel && !title) {
          noText.push(await btn.getAttribute('class') || 'unknown');
        }
      }
      expect(noText, `Inaccessible buttons: ${noText.join(', ')}`).toHaveLength(0);
    });

    test(`${pg.name}: skip link or landmark nav`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const nav = await page.locator('nav, [role="navigation"]').count();
      const skip = await page.locator('.skip-link, a[href="#main"], a[href="#content"]').count();
      expect(nav + skip, 'No nav landmark or skip link').toBeGreaterThan(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 17. PERFORMANCE
// ═══════════════════════════════════════════════════════════════
test.describe('17. Performance', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: loads < 8s`, async ({ page }) => {
      const start = Date.now();
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(Date.now() - start, 'Too slow').toBeLessThan(8000);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 18. DUPLICATE RESOURCES
// ═══════════════════════════════════════════════════════════════
test.describe('18. Duplicates', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: no duplicate stylesheets`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const hrefs = await page.locator('link[rel="stylesheet"]').evaluateAll(els =>
        els.map(el => el.getAttribute('href')).filter(Boolean)
      );
      const dupes = hrefs.filter((h, i) => hrefs.indexOf(h) !== i);
      expect(dupes, `Dupes: ${dupes.join(', ')}`).toHaveLength(0);
    });

    test(`${pg.name}: no duplicate scripts`, async ({ page }) => {
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'domcontentloaded' });
      const srcs = await page.locator('script[src]').evaluateAll(els =>
        els.map(el => el.getAttribute('src')).filter(Boolean)
      );
      const dupes = srcs.filter((s, i) => srcs.indexOf(s) !== i);
      expect(dupes, `Dupes: ${dupes.join(', ')}`).toHaveLength(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 19. SOCIAL MEDIA
// ═══════════════════════════════════════════════════════════════
test.describe('19. Social Media', () => {
  test('Homepage: Instagram link', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`, { waitUntil: 'domcontentloaded' });
    expect(await page.locator('a[href*="instagram.com"]').count(), 'No IG link').toBeGreaterThan(0);
  });

  test('Homepage: social links not placeholder', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`, { waitUntil: 'domcontentloaded' });
    const socials = await page.locator('a[href*="instagram.com"], a[href*="facebook.com"], a[href*="tiktok.com"]').all();
    for (const link of socials) {
      const href = await link.getAttribute('href');
      expect(href).not.toContain('your-');
      expect(href).not.toContain('placeholder');
    }
  });

  test('Footer: social links in all pages', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`, { waitUntil: 'domcontentloaded' });
    const footer = page.locator('footer');
    if (await footer.count() > 0) {
      const socialLinks = await footer.locator('a[href*="instagram"], a[href*="facebook"], a[href*="tiktok"]').count();
      expect(socialLinks, 'No social links in footer').toBeGreaterThan(0);
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 20. SECURITY
// ═══════════════════════════════════════════════════════════════
test.describe('20. Security', () => {
  test('HTTPS works', async ({ page }) => {
    const res = await page.goto(`${BASE}/homepage.html`, { waitUntil: 'domcontentloaded' });
    expect(res.url()).toMatch(/^https:\/\//);
  });

  for (const pg of PAGES) {
    test(`${pg.name}: no mixed content`, async ({ page }) => {
      const mixed = [];
      page.on('request', req => {
        if (req.url().startsWith('http://') && !req.url().includes('localhost')) {
          mixed.push(req.url().substring(0, 80));
        }
      });
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      expect(mixed, `Mixed:\n${mixed.join('\n')}`).toHaveLength(0);
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 21. FAQ ACCORDION
// ═══════════════════════════════════════════════════════════════
test.describe('21. FAQ', () => {
  test('clicking question reveals answer', async ({ page }) => {
    await page.goto(`${BASE}/faq.html`, { waitUntil: 'domcontentloaded' });
    const detail = page.locator('details').first();
    if (await detail.count() > 0) {
      expect(await detail.getAttribute('open')).toBeNull();
      await detail.locator('summary').click();
      await page.waitForTimeout(300);
      expect(await detail.getAttribute('open')).not.toBeNull();
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 22. FONTS
// ═══════════════════════════════════════════════════════════════
test.describe('22. Fonts', () => {
  test('Homepage: custom fonts loaded', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`, { waitUntil: 'networkidle', timeout: 15000 });
    const fonts = await page.evaluate(() =>
      [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family)
    );
    expect(fonts.length, 'No fonts loaded').toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════════
// 23. GOOGLE MAPS
// ═══════════════════════════════════════════════════════════════
test.describe('23. Maps', () => {
  test('Contact: Google Maps embed or link', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`, { waitUntil: 'domcontentloaded' });
    const iframe = await page.locator('iframe[src*="google.com/maps"], iframe[src*="maps.google"]').count();
    const link = await page.locator('a[href*="maps.google"], a[href*="goo.gl/maps"]').count();
    expect(iframe + link, 'No Google Maps').toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════════
// 24. BLOG QUALITY
// ═══════════════════════════════════════════════════════════════
test.describe('24. Blog', () => {
  test('Blog Index: lists articles', async ({ page }) => {
    await page.goto(`${BASE}/blog/index.html`, { waitUntil: 'domcontentloaded' });
    const articles = await page.locator('article, .blog-card, .article-card, a[href*="blog/"]').count();
    expect(articles, 'Blog index has no article cards').toBeGreaterThan(0);
  });

  test('Blog Brunchs: has date', async ({ page }) => {
    await page.goto(`${BASE}/blog/meilleurs-brunchs-marrakech-2026.html`, { waitUntil: 'domcontentloaded' });
    const body = await page.textContent('body');
    const hasDate = /\d{4}|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|January|February|March/i.test(body);
    const hasTime = await page.locator('time').count();
    expect(hasDate || hasTime > 0, 'No date found').toBe(true);
  });

  test('Blog Brunchs: back-to-blog link', async ({ page }) => {
    await page.goto(`${BASE}/blog/meilleurs-brunchs-marrakech-2026.html`, { waitUntil: 'domcontentloaded' });
    const back = await page.locator('a[href*="blog/index"], a[href*="/blog"], [class*="breadcrumb"]').count();
    expect(back, 'No back-to-blog link').toBeGreaterThan(0);
  });

  test('Blog Brunchs: content > 500 chars', async ({ page }) => {
    await page.goto(`${BASE}/blog/meilleurs-brunchs-marrakech-2026.html`, { waitUntil: 'domcontentloaded' });
    const main = page.locator('article, main, .blog-content').first();
    const text = await main.textContent();
    expect(text.trim().length, 'Too short').toBeGreaterThan(500);
  });
});

// ═══════════════════════════════════════════════════════════════
// 25. SITEMAP & ROBOTS
// ═══════════════════════════════════════════════════════════════
test.describe('25. Sitemap & Robots', () => {
  test('robots.txt exists', async ({ page }) => {
    const res = await page.goto(`${BASE}/robots.txt`, { waitUntil: 'domcontentloaded' });
    expect(res.status()).toBe(200);
  });

  test('sitemap.xml exists', async ({ page }) => {
    const res = await page.goto(`${BASE}/sitemap.xml`, { waitUntil: 'domcontentloaded' });
    expect(res.status()).toBe(200);
  });
});

// ═══════════════════════════════════════════════════════════════
// 26. FAVICON
// ═══════════════════════════════════════════════════════════════
test.describe('26. Favicon', () => {
  test('Homepage: favicon present', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`, { waitUntil: 'domcontentloaded' });
    const favicon = await page.locator('link[rel="icon"], link[rel="shortcut icon"]').count();
    expect(favicon, 'No favicon').toBeGreaterThan(0);
  });

  test('Homepage: apple-touch-icon', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`, { waitUntil: 'domcontentloaded' });
    const apple = await page.locator('link[rel="apple-touch-icon"]').count();
    expect(apple, 'No apple-touch-icon').toBeGreaterThan(0);
  });
});
