# Reach for Peace — Online Therapy Website
A production-ready single-page website for **Reach for Peace**, an India-based online therapy practice founded by Dr. Lisha Jindal.

## 🎨 Design System

- **Color Palette:** Warm clay (defined in `:root` CSS variables)
- **Typography:** Lora (headings) + Source Sans 3 (body) via Google Fonts
- **Accessibility:** WCAG 2.1 AA compliant
- **Responsive:** Mobile-first design, works on all devices

## ⚠️ Before Publishing — Required Changes

**You MUST replace these placeholders before publishing:**

### 1. WhatsApp Number

**File:** `js/main.js`

```javascript
WHATSAPP_NUMBER: '919999920290',
```

Format: `91XXXXXXXXXX` (no spaces, dashes, or + symbol)

**Current:** `+91 99999 20290`

### 2. Session Fee

**File:** `js/main.js`

```javascript
SESSION_FEE: '——', // ⚠️ REPLACE ME
```

Replace with your actual session fee (just the number)

**Example:** `'2500'` for ₹2,500

### 3. Email Address

**File:** `js/main.js`

```javascript
EMAIL: 'itsyourtalkspace@gmail.com',
```

**Current:** `itsyourtalkspace@gmail.com`

### 4. Privacy Policy & Terms

**Files:** `privacy.html` and `terms.html`

These are **stub pages only**. Replace the entire content with:
- Complete, legally-compliant privacy policy
- Complete terms of service

**⚠️ Important:** Consult with a legal professional to ensure compliance with Indian data protection laws and professional psychology standards.

### 5. Testimonials

**File:** `index.html` (Testimonials section)

The current testimonials are **sample placeholders**. Replace them with:
- Real client testimonials (with written consent)
- Or remove the section entirely if you don't have consented testimonials yet

### 6. Instagram Posts

**File:** `index.html` (Instagram section)

The Instagram thumbnails are placeholders. Options:
- Leave as-is (they link to your Instagram profile)
- Replace with actual Instagram embed code
- Update with real post thumbnails once your Instagram is active

### 7. Domain & Structured Data

**File:** `index.html`

Update the JSON-LD structured data with your actual domain:

```javascript
"url": "https://reach-for-peace.example.com", // ⚠️ REPLACE ME
```

Update `robots.txt` Sitemap line with your actual sitemap URL after deployment.

---

## 📁 Project Structure

```
reach-for-peace/
├── index.html           # Main single-page website
├── privacy.html         # Privacy policy (STUB - replace before publishing)
├── terms.html           # Terms of service (STUB - replace before publishing)
├── robots.txt           # Search engine instructions
├── css/
│   └── styles.css       # All styles (warm clay design system)
├── js/
│   └── main.js          # Configuration & interactions
└── README.md            # This file
```

## 🚀 How to Run Locally

### Option 1: Simple HTTP Server (Python)

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 2: Node.js HTTP Server

```bash
npx http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 3: VS Code Live Server

1. Install the "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🌐 How to Deploy

This is a **static website** (no server-side code). You can deploy to:

### GitHub Pages (Free)

1. Create a GitHub repository
2. Push all files to the `main` branch
3. Go to Settings → Pages
4. Set source to `main` branch
5. Your site will be live at `https://yourusername.github.io/repo-name/`

### Netlify (Free)

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop the entire folder
3. Your site will be live instantly with a custom URL
4. You can add a custom domain in settings

### Vercel (Free)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-deploy on every push

### Traditional Web Hosting

1. Upload all files via FTP to your web host's `public_html` or `www` directory
2. Ensure `index.html` is in the root directory

## ♿ Accessibility Features

This website meets **WCAG 2.1 Level AA** standards:

- ✅ **Skip link** for keyboard navigation
- ✅ **Visible focus indicators** on all interactive elements
- ✅ **Proper heading hierarchy** (H1 → H2 → H3)
- ✅ **Semantic HTML5** landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ✅ **ARIA labels** where needed
- ✅ **Color contrast ratios** meet AA standards
- ✅ **44px minimum touch targets** for mobile
- ✅ **Keyboard navigation** for all interactive elements
- ✅ **prefers-reduced-motion** support for animations
- ✅ **Telephone links** (`tel:`) for crisis helpline
- ✅ **Descriptive alt text** and aria-labels

### Accessibility Testing

Run these checks before publishing:

1. **Keyboard navigation:** Tab through entire page
2. **Screen reader:** Test with NVDA (Windows) or VoiceOver (Mac)
3. **Contrast checker:** Use WebAIM Contrast Checker
4. **Automated audit:** Use Lighthouse in Chrome DevTools

## 📱 Responsive Breakpoints

- **Mobile:** Up to 640px
- **Tablet:** 641px to 768px
- **Desktop:** 769px and above

## 🎯 SEO Features

- ✅ **Semantic HTML** structure
- ✅ **Meta descriptions** and proper titles
- ✅ **JSON-LD structured data** (ProfessionalService, Person, FAQPage)
- ✅ **robots.txt** for search engine instructions
- ✅ **Google Fonts** with `display=swap` for performance
- ✅ **Clean, descriptive URLs**

Add after deployment:
- Sitemap.xml (use a generator or create manually)
- Google Search Console setup
- Google Analytics (if needed)

## ⚙️ Technical Details

### Fonts

- **Headings:** Lora 600/700 (serif)
- **Body:** Source Sans 3 400/600 (sans-serif)
- Loaded from Google Fonts with `display=swap`

### Colors (Warm Clay Palette)

| Token          | Hex       | Usage                  |
|----------------|-----------|------------------------|
| `--bg`         | `#F7F1EA` | Page background        |
| `--surface`    | `#EDE4DA` | Cards, sections        |
| `--text`       | `#3D2C29` | Primary text           |
| `--accent`     | `#8B4A3A` | Buttons, links, CTAs   |
| `--accent-soft`| `#C4785A` | Decorative accents     |
| `--dark`       | `#5C4033` | Dark backgrounds, CTA  |
| `--border`     | `#D9CFC4` | Borders, dividers      |
| `--crisis-bg`  | `#F3E6E1` | Crisis strip, notices  |
| `--whatsapp`   | `#128C7E` | WhatsApp FAB only      |

### Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Android (last 2 versions)

## 🔒 Security & Privacy

- No external tracking scripts (privacy-first)
- No cookies (GDPR/cookie banner not needed)
- WhatsApp links use `https://wa.me/` (secure)
- Email links use `mailto:` protocol
- External links use `rel="noopener noreferrer"`
- Stub privacy/terms pages marked `noindex, nofollow`

## 📞 Crisis Helpline Information

The website prominently displays:

- **Tele-MANAS: 14416** (India's 24×7 govt mental health helpline)
- Clear messaging that the clinic is **not a 24×7 emergency service**
- Crisis strip at top of page
- Repeated in footer and free-seekers section

## 💡 Features

1. **Sticky WhatsApp FAB** (Floating Action Button)
2. **Mobile-responsive navigation** with hamburger menu
3. **Smooth scrolling** to page sections (respects `prefers-reduced-motion`)
4. **FAQ accordion** using native `<details>` elements
5. **Pre-filled WhatsApp messages** for booking
6. **Instagram integration** with follow CTA
7. **Testimonials** (placeholder - replace with real ones)
8. **Configuration validation** in browser console (development mode)

## 🧪 Testing Checklist

Before going live, test:

- [ ] All WhatsApp links work with correct pre-filled messages
- [ ] Email link works
- [ ] Session fee displays correctly
- [ ] Mobile navigation works
- [ ] All internal anchor links work
- [ ] FAQ accordion expands/collapses
- [ ] Privacy and terms pages are complete (not stubs)
- [ ] Instagram link works
- [ ] All images/placeholders look correct
- [ ] Site works on mobile, tablet, desktop
- [ ] Site works in different browsers
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators are visible
- [ ] Screen reader announces content correctly
- [ ] No console errors in browser DevTools

## 📝 Content Notes

### Copy Guidelines

All copy follows these principles:
- **Honest:** No false claims or fake credentials
- **Warm but professional:** Compassionate tone
- **Clear:** No therapy jargon unless explained
- **India-specific:** References Tele-MANAS, IST, "across India"
- **Not emergency service:** Clearly stated multiple times

### What NOT to Add

Do NOT add these without proper authorization:
- Fake RCI registration numbers
- Fake Google reviews or ratings
- Fake client testimonials (without consent)
- Stock photos claiming to be Dr. Lisha Jindal
- Clinic address (service is online only)
- 24×7 availability claims

## 🤝 Support

For questions about this website:
- **Technical issues:** Check browser console for errors
- **Configuration:** Review this README's "Before Publishing" section
- **Design/layout:** Review `css/styles.css` for design tokens

## 📄 License

This website is proprietary to Reach for Peace and Dr. Lisha Jindal.

---

## Quick Start Checklist

1. [x] Update `WHATSAPP_NUMBER` in `js/main.js` (+91 99999 20290)
2. [ ] Update `SESSION_FEE` in `js/main.js`
3. [x] Update `EMAIL` in `js/main.js` (itsyourtalkspace@gmail.com)
4. [ ] Replace `privacy.html` content (consult legal professional)
5. [ ] Replace `terms.html` content (consult legal professional)
6. [ ] Replace testimonials with consented client feedback
7. [ ] Update JSON-LD structured data with actual domain
8. [ ] Run full testing checklist above
9. [ ] Deploy to hosting platform
10. [ ] Test live site thoroughly
11. [ ] Submit to Google Search Console
12. [ ] Share on social media / Instagram

---

**Built with care for mental health accessibility across India** 🇮🇳
