import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:9823';

const PAGES = [
  { name: 'Homepage', file: 'homepage.html' },
  { name: 'About', file: 'about.html' },
  { name: 'Menu', file: 'menu.html' },
  { name: 'Contact', file: 'contact.html' },
  { name: 'Reservation', file: 'reservation.html' },
  { name: 'Brunch', file: 'brunch.html' },
  { name: 'Livraison', file: 'livraison.html' },
  { name: 'Evenements', file: 'evenements.html' },
  { name: 'Galerie', file: 'galerie.html' },
  { name: 'FAQ', file: 'faq.html' },
  { name: 'Blog Index', file: 'blog-index.html' },
  { name: 'Blog Article', file: 'blog-article.html' },
];

// ============================================================
// 1. BRANDING CONSISTENCY
// ============================================================
test.describe('Branding Consistency', () => {
  for (const page of PAGES) {
    test(`${page.name}: navbar must say "Crusthylia" (not L'Atelier or other)`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const nav = p.locator('nav');
      const navText = await nav.textContent();
      // Must contain Crusthylia
      expect(navText).toContain('Crusthylia');
      // Must NOT contain wrong branding
      expect(navText).not.toContain("L'Atelier");
    });

    test(`${page.name}: footer must reference "Crusthylia" (not L'Atelier)`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const footer = p.locator('footer');
      const footerText = await footer.textContent();
      expect(footerText).toContain('Crusthylia');
      expect(footerText).not.toContain("L'Atelier");
    });
  }
});

// ============================================================
// 2. HTML FUNDAMENTALS
// ============================================================
test.describe('HTML Fundamentals', () => {
  for (const page of PAGES) {
    test(`${page.name}: must have a <title> tag`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const title = await p.title();
      expect(title.length).toBeGreaterThan(0);
    });

    test(`${page.name}: lang attribute should be "fr"`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const lang = await p.locator('html').getAttribute('lang');
      expect(lang).toBe('fr');
    });

    test(`${page.name}: must have meta charset`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const charset = await p.locator('meta[charset]').count();
      expect(charset).toBeGreaterThan(0);
    });

    test(`${page.name}: must have meta viewport`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const viewport = await p.locator('meta[name="viewport"]').count();
      expect(viewport).toBeGreaterThan(0);
    });

    test(`${page.name}: should have meta description`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const desc = await p.locator('meta[name="description"]').count();
      expect(desc).toBeGreaterThan(0);
    });
  }
});

// ============================================================
// 3. IMAGE ACCESSIBILITY
// ============================================================
test.describe('Image Accessibility', () => {
  for (const page of PAGES) {
    test(`${page.name}: all <img> must have alt attribute`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const images = await p.locator('img').all();
      const missingAlt = [];
      for (let i = 0; i < images.length; i++) {
        const alt = await images[i].getAttribute('alt');
        if (!alt || alt.trim() === '') {
          const src = await images[i].getAttribute('src');
          missingAlt.push(src?.substring(0, 80) || `image #${i}`);
        }
      }
      expect(missingAlt, `Images missing alt: ${missingAlt.join(', ')}`).toHaveLength(0);
    });
  }
});

// ============================================================
// 4. DUPLICATE STYLESHEETS
// ============================================================
test.describe('Duplicate Stylesheets', () => {
  for (const page of PAGES) {
    test(`${page.name}: Material Symbols CSS should not be loaded twice`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const materialLinks = await p.locator('link[href*="Material+Symbols"]').count();
      expect(materialLinks, 'Material Symbols loaded multiple times').toBeLessThanOrEqual(1);
    });
  }
});

// ============================================================
// 5. NAVIGATION LINKS
// ============================================================
test.describe('Navigation Links', () => {
  for (const page of PAGES) {
    test(`${page.name}: nav links should point to real pages (not just #)`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const navLinks = await p.locator('nav a[href="#"]').count();
      // All nav links being # is a bug - at least some should point to actual pages
      const totalNavLinks = await p.locator('nav a').count();
      if (totalNavLinks > 0) {
        const deadRatio = navLinks / totalNavLinks;
        expect(deadRatio, `${navLinks}/${totalNavLinks} nav links are dead (#)`).toBeLessThan(1);
      }
    });
  }
});

// ============================================================
// 6. WHATSAPP LINKS VALIDATION
// ============================================================
test.describe('WhatsApp Links', () => {
  const VALID_WA_PATTERN = /^https:\/\/wa\.me\/212\d{9}$/;

  for (const page of PAGES) {
    test(`${page.name}: WhatsApp links must use real phone numbers`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const waLinks = await p.locator('a[href*="wa.me"]').all();
      const badLinks = [];
      for (const link of waLinks) {
        const href = await link.getAttribute('href');
        if (!VALID_WA_PATTERN.test(href)) {
          badLinks.push(href);
        }
      }
      expect(badLinks, `Invalid WhatsApp links: ${badLinks.join(', ')}`).toHaveLength(0);
    });
  }
});

// ============================================================
// 7. CURRENCY CONSISTENCY (MAD not USD)
// ============================================================
test.describe('Currency Consistency', () => {
  test('Homepage: prices should use MAD not USD ($)', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`);
    const body = await page.textContent('body');
    const hasDollar = /\$\d+/.test(body);
    expect(hasDollar, 'Found USD ($) prices — should use MAD').toBe(false);
  });

  test('Menu: prices should use DH/MAD', async ({ page }) => {
    await page.goto(`${BASE}/menu.html`);
    const body = await page.textContent('body');
    const hasDH = /\d+\s*DH/.test(body) || /\d+\s*MAD/.test(body);
    expect(hasDH, 'Menu should have DH or MAD prices').toBe(true);
  });
});

// ============================================================
// 8. ADDRESS CONSISTENCY
// ============================================================
test.describe('Address Consistency', () => {
  const REAL_ADDRESS_KEYWORDS = ['Targa', 'Marrakech'];

  test('Homepage: should show real Crusthylia address, not placeholder', async ({ page }) => {
    await page.goto(`${BASE}/homepage.html`);
    const body = await page.textContent('body');
    // Should NOT have fake addresses
    expect(body).not.toContain('Heritage City');
    expect(body).not.toContain('Cobblestone District');
    expect(body).not.toContain('442 Artisans Way');
  });

  test('Contact: should show Targa Marrakech address', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`);
    const body = await page.textContent('body');
    for (const keyword of REAL_ADDRESS_KEYWORDS) {
      expect(body).toContain(keyword);
    }
  });
});

// ============================================================
// 9. COPYRIGHT YEAR
// ============================================================
test.describe('Copyright Year', () => {
  for (const page of PAGES) {
    test(`${page.name}: copyright should be current year (not 2024)`, async ({ page: p }) => {
      await p.goto(`${BASE}/${page.file}`);
      const footer = p.locator('footer');
      const text = await footer.textContent();
      expect(text).not.toContain('© 2024');
    });
  }
});

// ============================================================
// 10. FORM VALIDATION
// ============================================================
test.describe('Form Validation', () => {
  test('Contact: form inputs should have required attribute', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`);
    const emailInput = page.locator('input[type="email"]').first();
    const hasRequired = await emailInput.getAttribute('required');
    // Email field should be required
    expect(hasRequired !== null, 'Email input should have required attribute').toBe(true);
  });

  test('Contact: form should have an action or onsubmit handler', async ({ page }) => {
    await page.goto(`${BASE}/contact.html`);
    const form = page.locator('form').first();
    const action = await form.getAttribute('action');
    const onsubmit = await form.getAttribute('onsubmit');
    const hasHandler = (action && action !== '') || (onsubmit && onsubmit !== '');
    expect(hasHandler, 'Contact form has no action or onsubmit').toBe(true);
  });

  test('Reservation: form should have an action or onsubmit handler', async ({ page }) => {
    await page.goto(`${BASE}/reservation.html`);
    const form = page.locator('form').first();
    const action = await form.getAttribute('action');
    const onsubmit = await form.getAttribute('onsubmit');
    const hasHandler = (action && action !== '') || (onsubmit && onsubmit !== '');
    expect(hasHandler, 'Reservation form has no action or onsubmit').toBe(true);
  });
});

// ============================================================
// 11. RESPONSIVE LAYOUT (Mobile)
// ============================================================
test.describe('Responsive Layout', () => {
  test('Homepage: hero text should be visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/homepage.html`);
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Menu: content should not overflow horizontally on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/menu.html`);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375 + 5); // 5px tolerance
  });

  test('Contact: form should be usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/contact.html`);
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
  });
});

// ============================================================
// 12. MOBILE MENU FUNCTIONALITY
// ============================================================
test.describe('Mobile Menu', () => {
  for (const pg of [
    { name: 'About', file: 'about.html' },
    { name: 'FAQ', file: 'faq.html' },
  ]) {
    test(`${pg.name}: mobile hamburger menu should toggle nav`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}/${pg.file}`);
      // Check if hamburger button exists
      const hamburger = page.locator('button:has(span:text("menu"))');
      const count = await hamburger.count();
      if (count > 0) {
        await hamburger.click();
        // After click, nav links should become visible
        // This test will fail if there's no JS handling the menu toggle
        await page.waitForTimeout(500);
        const navLinks = page.locator('nav a').first();
        const isVisible = await navLinks.isVisible();
        expect(isVisible, 'Mobile menu links should be visible after hamburger click').toBe(true);
      }
    });
  }
});

// ============================================================
// 13. PERFORMANCE: PAGE LOAD
// ============================================================
test.describe('Page Load Performance', () => {
  for (const page of PAGES) {
    test(`${page.name}: should load within 5 seconds`, async ({ page: p }) => {
      const start = Date.now();
      await p.goto(`${BASE}/${page.file}`, { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - start;
      expect(loadTime).toBeLessThan(5000);
    });
  }
});

// ============================================================
// 14. CONSOLE ERRORS
// ============================================================
test.describe('Console Errors', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: should have no JS console errors`, async ({ page }) => {
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.goto(`${BASE}/${pg.file}`, { waitUntil: 'networkidle' });
      // Filter out known CDN/external resource errors
      const realErrors = errors.filter(e => !e.includes('net::') && !e.includes('favicon'));
      expect(realErrors, `Console errors: ${realErrors.join('\n')}`).toHaveLength(0);
    });
  }
});

// ============================================================
// 15. FAQ ACCORDION FUNCTIONALITY
// ============================================================
test.describe('FAQ Accordion', () => {
  test('FAQ: clicking a question should reveal the answer', async ({ page }) => {
    await page.goto(`${BASE}/faq.html`);
    const firstDetail = page.locator('details').first();
    const summary = firstDetail.locator('summary');
    const content = firstDetail.locator('div');

    // Initially content should be hidden (details closed)
    expect(await firstDetail.getAttribute('open')).toBeNull();

    // Click to open
    await summary.click();
    await page.waitForTimeout(300);
    expect(await firstDetail.getAttribute('open')).not.toBeNull();
  });
});

// ============================================================
// 16. EXTERNAL LINKS SECURITY
// ============================================================
test.describe('External Links Security', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: external links should have rel="noopener"`, async ({ page }) => {
      await page.goto(`${BASE}/${pg.file}`);
      const externalLinks = await page.locator('a[target="_blank"]').all();
      for (const link of externalLinks) {
        const rel = await link.getAttribute('rel');
        expect(rel, 'External link missing rel="noopener"').toContain('noopener');
      }
    });
  }
});

// ============================================================
// 17. HEADING HIERARCHY
// ============================================================
test.describe('Heading Hierarchy', () => {
  for (const pg of PAGES) {
    test(`${pg.name}: should have exactly one <h1>`, async ({ page }) => {
      await page.goto(`${BASE}/${pg.file}`);
      const h1Count = await page.locator('h1').count();
      expect(h1Count, `Found ${h1Count} h1 tags, expected exactly 1`).toBe(1);
    });
  }
});

// ============================================================
// 18. BROKEN IMAGE CHECK
// ============================================================
test.describe('Broken Images', () => {
  for (const pg of PAGES.slice(0, 4)) { // Test first 4 pages to keep test run time reasonable
    test(`${pg.name}: no images should return 404`, async ({ page }) => {
      const brokenImages = [];
      page.on('response', response => {
        if (response.request().resourceType() === 'image' && response.status() >= 400) {
          brokenImages.push(response.url().substring(0, 80));
        }
      });
      await page.goto(`${BASE}/${pg.file}`, { waitUntil: 'networkidle' });
      expect(brokenImages, `Broken images: ${brokenImages.join(', ')}`).toHaveLength(0);
    });
  }
});
