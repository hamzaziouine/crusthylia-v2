/* ==========================================================================
   CRUSTHY'LIA — INTERNATIONALISATION (i18n)
   FR / EN / AR translations + RTL switching + language persitence
   ========================================================================== */

'use strict';

const translations = {
  fr: {
    // ── Navigation ───────────────────────────────────────────────────────────
    nav_menu:          'Menu',
    nav_brunch:        'Brunch',
    nav_about:         'Notre Histoire',
    nav_contact:       'Contact',
    nav_reserve:       'Réserver',
    nav_events:        'Événements',
    nav_blog:          'Blog',
    nav_delivery:      'Livraison',

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero_headline:     'Boulangerie Artisanale,\nPâtisserie & Restaurant',
    hero_sub:          'À Targa, Marrakech — Ouvert tous les jours 07h–00h',
    hero_scroll:       'Découvrir',

    // ── CTAs ──────────────────────────────────────────────────────────────────
    cta_order:         'Commander sur WhatsApp',
    cta_reserve:       'Réserver une table',
    cta_menu:          'Voir le menu',
    cta_learn_more:    'En savoir plus',
    cta_read:          'Lire l\'article',
    cta_see_all:       'Voir tous les articles',
    cta_view_menu:     'Voir le menu complet',
    cta_directions:    'Itinéraire',

    // ── Sections ──────────────────────────────────────────────────────────────
    section_services:      'Ce que nous proposons',
    section_services_sub:  'Une expérience complète',
    section_stats:         'Crusthy\'lia en chiffres',
    section_menu_preview:  'Aperçu du Menu',
    section_promise:       'Notre Promesse',
    section_brunch:        'Le Brunch du Week-end',
    section_brunch_sub:    'Trois formules pour commencer le weekend comme il se doit',
    section_school:        'Programme Déjeuner École',
    section_blog:          'Nos Derniers Articles',
    section_contact:       'Nous Trouver',
    section_about:         'Notre Histoire',

    // ── Services Cards ────────────────────────────────────────────────────────
    service_bakery:       'Boulangerie Artisanale',
    service_bakery_desc:  'Pains au levain, croissants, brioche faits chaque matin. L\'odeur du four dès 7h.',
    service_cafe:         'Café & Boissons',
    service_cafe_desc:    'Cafés de spécialité, jus frais, smoothies. Une sélection soigneusement choisie.',
    service_restaurant:   'Restaurant & Livraison',
    service_restaurant_desc: 'Déjeuners, dîners, plats du jour. Livraison disponible à Targa et environs.',
    service_brunch:       'Brunch & Petit Déjeuner',
    service_brunch_desc:  '11 formules petit déjeuner, 3 formules brunch. Du simple au généreux.',

    // ── Stats ────────────────────────────────────────────────────────────────
    stat_reviews:     'Avis Google',
    stat_breakfast:   'Formules Petit Déjeuner',
    stat_open:        'Ouvert',
    stat_brunch:      'Formules Brunch',

    // ── Promise section ──────────────────────────────────────────────────────
    promise_title:   'Fait maison, chaque jour',
    promise_body:    'Chez Crusthy\'lia, chaque produit est préparé à la main dans notre cuisine. Nos pains sortent du four chaque matin, nos pâtisseries sont façonnées par nos artisans. Pas de surgelé, pas d\'industriel — juste l\'authenticité du fait maison.',

    // ── School section ────────────────────────────────────────────────────────
    school_title:  'Programme Déjeuner École',
    school_body:   'Une solution pratique pour les parents : des repas équilibrés et faits maison livrés directement à l\'école de vos enfants. Inscription mensuelle, menu varié chaque semaine.',

    // ── English section ──────────────────────────────────────────────────────
    english_title: 'Welcome to Crusthy\'lia — Marrakech\'s Favourite Bakery & Café',
    english_body:  'Nestled in the vibrant Targa neighbourhood, Crusthy\'lia is where Marrakech comes for its morning ritual. Fresh-baked sourdough, buttery croissants, specialty coffee — open every day from 7am to 11pm.',

    // ── Contact ───────────────────────────────────────────────────────────────
    contact_title:    'Nous Trouver',
    contact_address:  '890 Lotissement Nakhil 2, Targa, Marrakech 40000',
    contact_hours:    'Tous les jours 07:00 – 00:00',
    contact_phone:    '+212 764 745 159',

    // ── Footer ───────────────────────────────────────────────────────────────
    footer_tagline:   'Fait maison, chaque jour',
    footer_hours:     'Tous les jours 07:00 – 00:00',
    footer_address:   '890 Lotissement Nakhil 2, Targa, Marrakech',
    footer_copyright: '© 2026 Crusthy\'lia. Tous droits réservés.',
    footer_nav:       'Navigation',
    footer_info:      'Informations',
    footer_contact:   'Contact',

    // ── Menu page ─────────────────────────────────────────────────────────────
    menu_tab_breakfast: 'Petit Déjeuner',
    menu_tab_brunch:    'Brunch',
    menu_tab_lunch:     'Déjeuner',
    menu_tab_pastry:    'Pâtisserie',
    menu_tab_bread:     'Boulangerie',
    menu_tab_drinks:    'Boissons',
    menu_title:         'Notre Menu',
    menu_sub:           'Fait maison, chaque jour',
    'menu.hero.eyebrow':  'Boulangerie · Café · Restaurant',
    'menu.hero.title':    'Notre Carte',
    'menu.hero.subtitle': 'Fait maison chaque jour à Targa, Marrakech — 07h00 à 00h00',
    'menu.order.title':   'Comment Commander',

    // ── Brunch formulas ───────────────────────────────────────────────────────
    brunch_parisien:     'Formule Parisienne',
    brunch_norvegien:    'Formule Norvégienne',
    brunch_americain:    'Formule Américaine',

    // ── FAQ ───────────────────────────────────────────────────────────────────
    faq_title:  'Questions Fréquentes',
    faq_sub:    'Tout ce que vous devez savoir sur Crusthy\'lia',

    // ── Reservation ───────────────────────────────────────────────────────────
    reservation_title: 'Réserver une Table',
    reservation_sub:   'Nous serons ravis de vous accueillir',
    form_name:         'Votre nom',
    form_date:         'Date souhaitée',
    form_time:         'Heure souhaitée',
    form_guests:       'Nombre de personnes',
    form_message:      'Message (optionnel)',
    form_submit:       'Confirmer la réservation',

    // ── Events ───────────────────────────────────────────────────────────────
    events_title: 'Événements & Privatisation',
    events_sub:   'Célébrez vos moments importants chez Crusthy\'lia',

    // ── Blog ─────────────────────────────────────────────────────────────────
    blog_title:     'Blog & Actualités',
    blog_sub:       'Conseils, recettes et actualités de votre boulangerie-café à Marrakech',
    blog_read_time: 'min de lecture',
    blog_by:        'Par l\'équipe Crusthy\'lia',

    // ── Breadcrumbs ───────────────────────────────────────────────────────────
    breadcrumb_home: 'Accueil',

    // ── Loading ───────────────────────────────────────────────────────────────
    loading_text: 'Chargement…',

    // ── Accessibility ─────────────────────────────────────────────────────────
    skip_link:    'Aller au contenu principal',
    close_menu:   'Fermer le menu',
    open_menu:    'Ouvrir le menu',
    back_to_top:  'Retour en haut de page',
  },

  en: {
    // ── Navigation ───────────────────────────────────────────────────────────
    nav_menu:          'Menu',
    nav_brunch:        'Brunch',
    nav_about:         'Our Story',
    nav_contact:       'Contact',
    nav_reserve:       'Reserve',
    nav_events:        'Events',
    nav_blog:          'Blog',
    nav_delivery:      'Delivery',

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero_headline:     'Artisan Bakery,\nPatisserie & Restaurant',
    hero_sub:          'In Targa, Marrakech — Open every day 7am–midnight',
    hero_scroll:       'Discover',

    // ── CTAs ──────────────────────────────────────────────────────────────────
    cta_order:         'Order on WhatsApp',
    cta_reserve:       'Book a table',
    cta_menu:          'View the menu',
    cta_learn_more:    'Learn more',
    cta_read:          'Read article',
    cta_see_all:       'See all articles',
    cta_view_menu:     'View full menu',
    cta_directions:    'Get directions',

    // ── Sections ──────────────────────────────────────────────────────────────
    section_services:      'What we offer',
    section_services_sub:  'A complete experience',
    section_stats:         'Crusthy\'lia by numbers',
    section_menu_preview:  'Menu Preview',
    section_promise:       'Our Promise',
    section_brunch:        'Weekend Brunch',
    section_brunch_sub:    'Three formulas for the perfect weekend start',
    section_school:        'School Lunch Programme',
    section_blog:          'Latest Articles',
    section_contact:       'Find Us',
    section_about:         'Our Story',

    // ── Services Cards ────────────────────────────────────────────────────────
    service_bakery:       'Artisan Bakery',
    service_bakery_desc:  'Sourdough loaves, croissants, brioche baked fresh every morning. The smell of the oven from 7am.',
    service_cafe:         'Coffee & Drinks',
    service_cafe_desc:    'Specialty coffees, fresh juices, smoothies. A carefully curated selection.',
    service_restaurant:   'Restaurant & Delivery',
    service_restaurant_desc: 'Lunches, dinners, daily specials. Delivery available in Targa and surrounding areas.',
    service_brunch:       'Brunch & Breakfast',
    service_brunch_desc:  '11 breakfast options, 3 brunch formulas. From simple to generous.',

    // ── Stats ────────────────────────────────────────────────────────────────
    stat_reviews:     'Google Reviews',
    stat_breakfast:   'Breakfast Formulas',
    stat_open:        'Open',
    stat_brunch:      'Brunch Formulas',

    // ── Promise ──────────────────────────────────────────────────────────────
    promise_title:   'Homemade, every day',
    promise_body:    'At Crusthy\'lia, every product is prepared by hand in our kitchen. Our breads come out of the oven every morning, our pastries are crafted by our artisans. No frozen, no industrial — just authentic homemade quality.',

    // ── School ────────────────────────────────────────────────────────────────
    school_title:  'School Lunch Programme',
    school_body:   'A practical solution for parents: balanced, homemade meals delivered directly to your children\'s school. Monthly subscription, varied menu every week.',

    // ── English section ──────────────────────────────────────────────────────
    english_title: 'Welcome to Crusthy\'lia — Marrakech\'s Favourite Bakery & Café',
    english_body:  'Nestled in the vibrant Targa neighbourhood, Crusthy\'lia is where Marrakech comes for its morning ritual. Fresh-baked sourdough, buttery croissants, specialty coffee — open every day from 7am to midnight.',

    // ── Contact ───────────────────────────────────────────────────────────────
    contact_title:    'Find Us',
    contact_address:  '890 Lotissement Nakhil 2, Targa, Marrakech 40000',
    contact_hours:    'Every day 07:00 – 00:00',
    contact_phone:    '+212 764 745 159',

    // ── Footer ───────────────────────────────────────────────────────────────
    footer_tagline:   'Homemade, every day',
    footer_hours:     'Every day 07:00 – 00:00',
    footer_address:   '890 Lotissement Nakhil 2, Targa, Marrakech',
    footer_copyright: '© 2026 Crusthy\'lia. All rights reserved.',
    footer_nav:       'Navigation',
    footer_info:      'Information',
    footer_contact:   'Contact',

    // ── Menu page ─────────────────────────────────────────────────────────────
    menu_tab_breakfast: 'Breakfast',
    menu_tab_brunch:    'Brunch',
    menu_tab_lunch:     'Lunch',
    menu_tab_pastry:    'Pastry',
    menu_tab_bread:     'Bakery',
    menu_tab_drinks:    'Drinks',
    menu_title:         'Our Menu',
    menu_sub:           'Homemade, every day',
    'menu.hero.eyebrow':  'Bakery · Café · Restaurant',
    'menu.hero.title':    'Our Menu',
    'menu.hero.subtitle': 'Homemade every day in Targa, Marrakech — 7am to midnight',
    'menu.order.title':   'How to Order',

    // ── Brunch formulas ───────────────────────────────────────────────────────
    brunch_parisien:     'Parisian Formula',
    brunch_norvegien:    'Norwegian Formula',
    brunch_americain:    'American Formula',

    // ── FAQ ───────────────────────────────────────────────────────────────────
    faq_title:  'Frequently Asked Questions',
    faq_sub:    'Everything you need to know about Crusthy\'lia',

    // ── Reservation ───────────────────────────────────────────────────────────
    reservation_title: 'Book a Table',
    reservation_sub:   'We look forward to welcoming you',
    form_name:         'Your name',
    form_date:         'Preferred date',
    form_time:         'Preferred time',
    form_guests:       'Number of guests',
    form_message:      'Message (optional)',
    form_submit:       'Confirm reservation',

    // ── Events ───────────────────────────────────────────────────────────────
    events_title: 'Events & Private Hire',
    events_sub:   'Celebrate your special moments at Crusthy\'lia',

    // ── Blog ─────────────────────────────────────────────────────────────────
    blog_title:     'Blog & News',
    blog_sub:       'Tips, inspiration and news from your Marrakech bakery-café',
    blog_read_time: 'min read',
    blog_by:        'By the Crusthy\'lia team',

    // ── Breadcrumbs ───────────────────────────────────────────────────────────
    breadcrumb_home: 'Home',

    // ── Loading ───────────────────────────────────────────────────────────────
    loading_text: 'Loading…',

    // ── Accessibility ─────────────────────────────────────────────────────────
    skip_link:    'Skip to main content',
    close_menu:   'Close menu',
    open_menu:    'Open menu',
    back_to_top:  'Back to top',
  },

  ar: {
    // ── Navigation ───────────────────────────────────────────────────────────
    nav_menu:          'القايمة',
    nav_brunch:        'برونش',
    nav_about:         'حكايتنا',
    nav_contact:       'تواصل معنا',
    nav_reserve:       'حجز',
    nav_events:        'مناسبات',
    nav_blog:          'بلوغ',
    nav_delivery:      'ليفراج',

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero_headline:     'مخبزة حرفية\nوكافيه وريستورون',
    hero_sub:          'فتارقة، مراكش — حاضرين كل نهار من 07:00 على 00:00',
    hero_scroll:       'اكتشف',

    // ── CTAs ──────────────────────────────────────────────────────────────────
    cta_order:         'طلب عبر واتساب',
    cta_reserve:       'احجز طاولة',
    cta_menu:          'شوف القايمة',
    cta_learn_more:    'زيد تعرف',
    cta_read:          'قرا المقال',
    cta_see_all:       'شوف جميع المقالات',
    cta_view_menu:     'شوف القايمة كاملة',
    cta_directions:    'كيفاش نجيو',

    // ── Sections ──────────────────────────────────────────────────────────────
    section_services:      'شنو كنقدمو',
    section_services_sub:  'تجربة كاملة',
    section_stats:         'كروستيليا بالأرقام',
    section_menu_preview:  'نموذج من القايمة',
    section_promise:       'وعدنا',
    section_brunch:        'برونش نهاية الأسبوع',
    section_brunch_sub:    'تلت فورمول باش تبدا الويكاند مزيان',
    section_school:        'برنامج غدا المدرسة',
    section_blog:          'آخر المقالات',
    section_contact:       'وين نلقاوكم',
    section_about:         'حكايتنا',

    // ── Services Cards ────────────────────────────────────────────────────────
    service_bakery:       'مخبزة حرفية',
    service_bakery_desc:  'خبز، كروسان، بريوش — مطيب كل صباح. ريحة الفرن من الساعة 7.',
    service_cafe:         'قهوة ومشروبات',
    service_cafe_desc:    'قهوة مختصة، عصير طازج، سموذي — اختيار مدروس بعناية.',
    service_restaurant:   'ريستورون وليفراج',
    service_restaurant_desc: 'غدا، عشا، طبق النهار — ليفراج متاح فتارقة وحواليها.',
    service_brunch:       'برونش وفطور',
    service_brunch_desc:  '11 فورمول فطور، 3 فورمول برونش — من البسيط على الكبير.',

    // ── Stats ────────────────────────────────────────────────────────────────
    stat_reviews:     'تقييمات Google',
    stat_breakfast:   'فورمول الفطور',
    stat_open:        'حاضرين',
    stat_brunch:      'فورمول البرونش',

    // ── Promise ──────────────────────────────────────────────────────────────
    promise_title:   'مطيب فالدار، كل نهار',
    promise_body:    'عند كروستيليا، كل شي كيتحضر باليد فمطبخنا. الخبز كيخرج من الفرن كل صباح، والحلويات كتعمل بأيدي حرفيينا. ماشي مجمد، ماشي صناعي — غير أكل دار حقيقي.',

    // ── School ────────────────────────────────────────────────────────────────
    school_title:  'برنامج غدا المدرسة',
    school_body:   'حل عملي للوالدين: وجبات متوازنة ومطيبة فالدار كتوصل لمدرسة ولادكم. اشتراك شهري، قايمة متنوعة كل أسبوع.',

    // ── English section ──────────────────────────────────────────────────────
    english_title: 'مرحبا بيكم فكروستيليا — أحسن مخبزة وكافيه فمراكش',
    english_body:  'فحي تارقة المعمور، كروستيليا هي الماكان لي كيجي ليه مراكش فالصباح. خبز طازج، كروسان بالزبدة، قهوة مختصة — حاضرين كل نهار من الساعة 7 على نص الليل.',

    // ── Contact ───────────────────────────────────────────────────────────────
    contact_title:    'وين نلقاوكم',
    contact_address:  '890 لوتيسمان نخيل 2، تارقة، مراكش 40000',
    contact_hours:    'كل نهار 07:00 – 00:00',
    contact_phone:    '+212 764 745 159',

    // ── Footer ───────────────────────────────────────────────────────────────
    footer_tagline:   'مطيب فالدار، كل نهار',
    footer_hours:     'كل نهار 07:00 – 00:00',
    footer_address:   '890 لوتيسمان نخيل 2، تارقة، مراكش',
    footer_copyright: '© 2026 كروستيليا. جميع الحقوق محفوظة.',
    footer_nav:       'التنقل',
    footer_info:      'معلومات',
    footer_contact:   'تواصل معنا',

    // ── Menu page ─────────────────────────────────────────────────────────────
    menu_tab_breakfast: 'الفطور',
    menu_tab_brunch:    'برونش',
    menu_tab_lunch:     'الغدا',
    menu_tab_pastry:    'الحلويات',
    menu_tab_bread:     'المخبزة',
    menu_tab_drinks:    'المشروبات',
    menu_title:         'قايمتنا',
    menu_sub:           'مطيب فالدار، كل نهار',
    'menu.hero.eyebrow':  'مخبزة · كافيه · ريستورون',
    'menu.hero.title':    'قايمتنا',
    'menu.hero.subtitle': 'مطيب فالدار كل نهار فتارقة، مراكش — من 07:00 على 00:00',
    'menu.order.title':   'كيفاش تطلب',

    // ── Brunch formulas ───────────────────────────────────────────────────────
    brunch_parisien:     'الفورمول الباريسية',
    brunch_norvegien:    'الفورمول النرويجية',
    brunch_americain:    'الفورمول الأمريكية',

    // ── FAQ ───────────────────────────────────────────────────────────────────
    faq_title:  'الأسئلة المكررة',
    faq_sub:    'كل شي خاصك تعرفو على كروستيليا',

    // ── Reservation ───────────────────────────────────────────────────────────
    reservation_title: 'احجز طاولة',
    reservation_sub:   'يسرنا نستقبلوكم',
    form_name:         'سميتك',
    form_date:         'التاريخ لي بغيتي',
    form_time:         'الوقت لي بغيتي',
    form_guests:       'شحال من نفر',
    form_message:      'رسالة (اختياري)',
    form_submit:       'تأكيد الحجز',

    // ── Events ───────────────────────────────────────────────────────────────
    events_title: 'المناسبات والتخصيص',
    events_sub:   'احتفل بلحظاتك الكبيرة عند كروستيليا',

    // ── Blog ─────────────────────────────────────────────────────────────────
    blog_title:     'البلوغ والأخبار',
    blog_sub:       'نصايح وإلهام وأخبار من مخبزة كافيه مراكش',
    blog_read_time: 'دقيقة قراءة',
    blog_by:        'فريق كروستيليا',

    // ── Breadcrumbs ───────────────────────────────────────────────────────────
    breadcrumb_home: 'الصفحة الرئيسية',

    // ── Loading ───────────────────────────────────────────────────────────────
    loading_text: 'كيتحمل…',

    // ── Accessibility ─────────────────────────────────────────────────────────
    skip_link:    'انتقل للمحتوى الرئيسي',
    close_menu:   'سد القايمة',
    open_menu:    'حل القايمة',
    back_to_top:  'ارجع لفوق',
  }
};

// Dev-only: warn about missing translation keys
(function validateTranslations() {
  if (typeof window === 'undefined') return;
  var frKeys = Object.keys(translations.fr);
  ['en', 'ar'].forEach(function(lang) {
    var missing = frKeys.filter(function(k) { return !(k in translations[lang]); });
    if (missing.length) {
      console.warn('[i18n] Missing keys in ' + lang + ':', missing);
    }
  });
})();

// ── applyTranslations ────────────────────────────────────────────────────────
function applyTranslations(lang) {
  const validLangs = ['fr', 'en', 'ar'];
  if (!validLangs.includes(lang)) lang = 'fr';

  // Update html attributes
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Apply to all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang] && translations[lang][key];
    if (value !== undefined) {
      // Use innerHTML only when value contains HTML tags or newlines; otherwise use textContent (XSS-safe)
      if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && (value.includes('<') || value.includes('\n'))) {
        el.innerHTML = value.replace(/\n/g, '<br>');
      } else {
        el.textContent = value;
      }
    }
  });

  // Update aria-label for data-i18n-aria elements
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const value = translations[lang] && translations[lang][key];
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  // Update placeholder for inputs
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = translations[lang] && translations[lang][key];
    if (value !== undefined) el.setAttribute('placeholder', value);
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // RTL body class
  document.body.setAttribute('data-lang', lang);
  if (lang === 'ar') {
    document.body.classList.add('rtl');
  } else {
    document.body.classList.remove('rtl');
  }

  // GSAP transition on language switch (if available)
  if (window.gsap) {
    const content = document.querySelector('.translatable-content') || document.querySelector('main');
    if (content) {
      gsap.fromTo(content,
        { opacity: 0.7 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }

  // Persist choice
  try {
    localStorage.setItem('crusthylia-lang', lang);
  } catch (e) {
    // localStorage not available (private mode)
  }
}

// ── Init language switcher ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load saved language or default to FR
  let savedLang = 'fr';
  try {
    savedLang = localStorage.getItem('crusthylia-lang') || 'fr';
  } catch (e) {
    // ignore
  }

  applyTranslations(savedLang);

  // Wire all lang-btn clicks
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTranslations(btn.getAttribute('data-lang'));
    });
  });
});

// ── Expose globally ───────────────────────────────────────────────────────────
window.applyTranslations = applyTranslations;
window.translations = translations;
