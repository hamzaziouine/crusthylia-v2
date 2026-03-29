/* ==========================================================================
   CRUSTHY'LIA — MENU TABS JS
   Tab switching with GSAP, floating WhatsApp, search/filter
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ── TAB SWITCHING ─────────────────────────────────────────────────────────
  const tabs = document.querySelectorAll('.menu-tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  if (!tabs.length || !panels.length) return;

  // Init: hide all panels except first
  panels.forEach((panel, i) => {
    if (i === 0) {
      panel.classList.add('active');
      panel.style.display = 'block';
    } else {
      panel.classList.remove('active');
      panel.style.display = 'none';
    }
  });

  if (tabs[0]) {
    tabs[0].classList.add('active');
    tabs[0].setAttribute('aria-selected', 'true');
  }

  function switchTab(targetId) {
    if (!targetId) return;

    const currentPanel = document.querySelector('.menu-panel.active');
    const newPanel = document.getElementById('mtab-' + targetId);
    if (!newPanel || newPanel === currentPanel) return;

    // Update tab states
    tabs.forEach(t => {
      const isActive = t.getAttribute('data-tab') === targetId;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (window.gsap) {
      // Animate out current panel
      if (currentPanel) {
        gsap.to(currentPanel, {
          opacity: 0,
          y: 8,
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => {
            currentPanel.classList.remove('active');
            currentPanel.style.display = 'none';

            // Animate in new panel
            newPanel.style.display = 'block';
            newPanel.classList.add('active');
            gsap.from(newPanel, {
              opacity: 0,
              y: 8,
              duration: 0.25,
              ease: 'power2.out'
            });

            // Stagger menu items
            const items = newPanel.querySelectorAll('.menu-item, .menu-card');
            if (items.length) {
              gsap.from(items, {
                opacity: 0,
                y: 16,
                stagger: 0.03,
                duration: 0.35,
                ease: 'power2.out'
              });
            }
          }
        });
      } else {
        newPanel.style.display = 'block';
        newPanel.classList.add('active');
        gsap.from(newPanel, { opacity: 0, y: 8, duration: 0.25, ease: 'power2.out' });
      }
    } else {
      // No-GSAP fallback
      if (currentPanel) {
        currentPanel.classList.remove('active');
        currentPanel.style.display = 'none';
      }
      newPanel.style.display = 'block';
      newPanel.classList.add('active');
    }

    // Scroll tab into view on mobile
    const activeTab = document.querySelector(`.menu-tab-btn[data-tab="${targetId}"]`);
    if (activeTab && window.innerWidth < 768) {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // Wire tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-tab'));
    });

    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(tab);
      let newIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabArray.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabArray.length - 1;
      }

      if (newIndex !== undefined) {
        tabArray[newIndex].focus();
        switchTab(tabArray[newIndex].getAttribute('data-tab'));
      }
    });
  });

  // ── URL HASH SUPPORT ──────────────────────────────────────────────────────
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const hashTab = document.querySelector(`.menu-tab-btn[data-tab="${hash}"]`);
    if (hashTab) switchTab(hash);
  }

  // ── MENU ITEM SEARCH / FILTER ─────────────────────────────────────────────
  const searchInput = document.getElementById('menu-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      const allItems = document.querySelectorAll('.menu-item, .menu-card');

      allItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matches = !query || text.includes(query);
        item.style.display = matches ? '' : 'none';

        if (matches && query && window.gsap) {
          gsap.from(item, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.out' });
        }
      });

      // Show "no results" message if all hidden
      const visibleItems = document.querySelectorAll('.menu-item:not([style*="none"]), .menu-card:not([style*="none"])');
      const noResults = document.getElementById('menu-no-results');
      if (noResults) {
        noResults.style.display = visibleItems.length === 0 ? 'block' : 'none';
      }
    });

    // Clear search on Escape
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  }

  // ── DIETARY FILTER TAGS ───────────────────────────────────────────────────
  document.querySelectorAll('.diet-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      const isActive = btn.classList.toggle('active');

      document.querySelectorAll('.menu-item, .menu-card').forEach(item => {
        if (!isActive || filter === 'all') {
          item.style.display = '';
        } else {
          const hasTag = item.getAttribute('data-tags')?.includes(filter);
          item.style.display = hasTag ? '' : 'none';
        }
      });
    });
  });

  // ── FLOATING WHATSAPP BUTTON ──────────────────────────────────────────────
  const floatingWA = document.querySelector('.floating-wa');
  if (floatingWA) {
    // Show after scrolling past hero area
    const showThreshold = 250;

    window.addEventListener('scroll', () => {
      if (window.scrollY > showThreshold) {
        floatingWA.classList.add('visible');
      } else {
        floatingWA.classList.remove('visible');
      }
    }, { passive: true });

    // Pulse animation
    if (window.gsap) {
      gsap.to(floatingWA, {
        scale: 1.06,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        delay: 2
      });
    }
  }

  // ── STICKY TABS ON SCROLL ─────────────────────────────────────────────────
  const tabsContainer = document.querySelector('.menu-tabs-container');
  if (tabsContainer && window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: tabsContainer,
      start: 'top 80px',
      end: 'max',
      pin: false,
      onEnter: () => tabsContainer.classList.add('sticky'),
      onLeaveBack: () => tabsContainer.classList.remove('sticky')
    });
  }
});
