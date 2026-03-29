# Crusthy'lia — Website

Site web production-ready pour Crusthy'lia, boulangerie-café-restaurant à Marrakech.
Hébergement : Netlify | Domaine : crusthylia.com (Namecheap)

---

## Déploiement rapide (5 minutes)

1. Va sur **[netlify.com](https://netlify.com)** → "Add new site" → "Deploy manually"
2. **Glisse ce dossier entier** dans la zone de dépôt Netlify
3. Le site est en ligne en 30 secondes

### Connecter ton domaine crusthylia.com

1. Dans Netlify : **Site settings → Domain management → Add custom domain**
2. Tape `crusthylia.com` et confirme
3. Dans **Namecheap** (ton registrar) → Manage Domain → Nameservers → Custom DNS
4. Remplace les nameservers par ceux que Netlify t'indique (ex: `dns1.p05.nsone.net`)
5. Attente de propagation DNS : 5 minutes à 24h

---

## Ajouter les vraies photos

Place les photos dans `assets/images/` avec **exactement ces noms de fichiers** :

| Fichier | Page | Dimensions recommandées |
|---------|------|------------------------|
| `facade-restaurant-crusthylia-targa-marrakech.jpg` | Hero homepage | 1920 × 1080 px |
| `interieur-ambiance-crusthylia-marrakech.jpg` | Notre Promesse | 1200 × 800 px |
| `petit-dejeuner-crusthylia-marrakech.jpg` | Section petit-déj | 1200 × 800 px |
| `brunch-crusthylia-marrakech-weekend.jpg` | Brunch Spotlight | 1200 × 800 px |
| `patisserie-viennoiserie-crusthylia.jpg` | Page pâtisserie | 800 × 600 px |
| `boulangerie-pain-artisanal-crusthylia.jpg` | Page boulangerie | 800 × 600 px |
| `cafe-specialite-crusthylia-marrakech.jpg` | Page café | 800 × 600 px |
| `equipe-crusthylia-marrakech.jpg` | Qui sommes-nous | 1200 × 800 px |
| `livraison-repas-ecole-marrakech.jpg` | Livraison école | 800 × 600 px |
| `logo-crusthylia.png` | Partout | 400 × 200 px (fond transparent) |

> **Format** : JPEG pour photos (qualité 80–85%), PNG pour logo avec transparence
> **Taille max** : 300 KB par image (optimise avec [squoosh.app](https://squoosh.app))

---

## Soumettre le sitemap à Google

1. Va sur **[search.google.com/search-console](https://search.google.com/search-console)**
2. Ajoute la propriété `crusthylia.com`
3. **Sitemaps → Ajouter un sitemap** → colle : `https://crusthylia.com/sitemap.xml`

---

## Structure des fichiers

```
crusthylia-website/
├── index.html                          ← Page d'accueil
├── menu.html                           ← Menu complet
├── qui-sommes-nous.html                ← À propos
├── faq.html                            ← Questions fréquentes
├── contact.html                        ← Contact & carte
├── reservation-marrakech.html          ← Réservations
├── evenements-marrakech.html           ← Événements
├── brunch-marrakech.html               ← Landing brunch
├── petit-dejeuner-targa-marrakech.html ← Landing petit-dej
├── livraison-marrakech.html            ← Landing livraison
├── livraison-dejeuner-ecole-marrakech.html ← Landing école
├── boulangerie-artisanale-marrakech.html   ← Landing boulangerie
├── patisserie-marrakech.html           ← Landing pâtisserie
├── cafe-artisanal-marrakech.html       ← Landing café
├── restaurant-targa-marrakech.html     ← Landing restaurant
├── pourquoi-crusthylia.html            ← Différenciateurs
├── notre-engagement.html               ← Engagement qualité
├── blog/
│   ├── index.html                      ← Liste des articles
│   └── [10 articles de blog]
├── assets/
│   ├── css/
│   │   ├── main.css        ← Design system + tous les composants
│   │   ├── animations.css  ← États de base avant animation
│   │   └── rtl.css         ← Surcharges arabe/RTL
│   ├── js/
│   │   ├── main.js         ← Lenis, nav, loader, curseur
│   │   ├── animations.js   ← GSAP + ScrollTrigger
│   │   ├── i18n.js         ← Traductions FR/EN/AR
│   │   └── menu-tabs.js    ← Onglets menu + recherche
│   └── images/             ← Tes photos ici
├── _redirects              ← Règles Netlify
├── robots.txt              ← SEO crawlers
└── netlify.toml            ← Headers cache + sécurité
```

---

## Stack technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| GSAP | 3.12.5 | Animations premium |
| Lenis | 1.1.14 | Smooth scroll |
| Swiper | 11 | Carousels mobile |
| Phosphor Icons | Latest | Icônes |
| Google Fonts | — | Cormorant Garamond, DM Sans, Cairo |

---

## Support

Questions ou problèmes → contact@crusthylia.com
