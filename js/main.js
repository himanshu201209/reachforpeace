/* ========================================
   Reach for Peace - Main JavaScript
   ======================================== */

/* ========================================
   CONFIGURATION - REPLACE BEFORE PUBLISHING
   ======================================== */

const CONFIG = {
    // WhatsApp number (format: 91XXXXXXXXXX, no spaces/dashes)
    WHATSAPP_NUMBER: '919999920290',
    // Phone for tel: links (same digits as WhatsApp unless you set a different line)
    PHONE_NUMBER: '919999920290',
    
    // REPLACE WITH YOUR ACTUAL SESSION FEE (just the number, e.g. "2000")
    SESSION_FEE: '1500', // single session; packages shown on page
    
    // Email
    EMAIL: 'admin@reachforpeace.in',

    // Google Business / reviews page (paste your Maps or GBP reviews URL)
    GOOGLE_REVIEWS_URL: 'https://share.google/VC4CBOkd3j5sh1Isy',
    GOOGLE_RATING: '4.8',
};

/* ========================================
   WhatsApp Message Templates
   ======================================== */

const WHATSAPP_MESSAGES = {
    bookSession: 'Hi, I would like to book a therapy session with Reach for Peace.',
    fitCall: 'Hi, I would like to schedule a 15-minute fit call to learn more about therapy at Reach for Peace.',
    oneSession: 'Hi, I would like to book 1 session (₹1,500) with Reach for Peace.',
    threeSession: 'Hi, I would like to book the 3-session package (₹1,400/session) with Reach for Peace.',
    sixSession: 'Hi, I would like to book the 6-session package (₹1,200/session) with Reach for Peace.',
};

/* ========================================
   Initialize App
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeConfig();
    initializePhoneLinks();
    initializeMobileNav();
    initializeWhatsAppLinks();
    initializePricingPackageLinks();
    initializeSmoothScroll();
    initializeAccessibility();
    initializeStickyHeader();
    initializeGoogleReviewsLink();
    initializeTestimonialDialog();
    initializeInstagramEmbeds();
});

/* ========================================
   Configuration Setup
   ======================================== */

function initializeConfig() {
    // Update session fee display
    const sessionFeeElements = document.querySelectorAll('#session-fee-display');
    sessionFeeElements.forEach(el => {
        el.textContent = CONFIG.SESSION_FEE;
    });
    
    // Update WhatsApp number display
    const whatsappDisplay = document.getElementById('whatsapp-display');
    if (whatsappDisplay) {
        // Format for display: +91 XXXXX XXXXX
        const formatted = CONFIG.WHATSAPP_NUMBER.replace(/^91(\d{5})(\d{5})$/, '+91 $1 $2');
        whatsappDisplay.textContent = formatted;
    }
    
    // Update email links
    const emailLinks = document.querySelectorAll('#footer-email');
    emailLinks.forEach(el => {
        el.href = `mailto:${CONFIG.EMAIL}`;
        const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
            textNode.textContent = CONFIG.EMAIL;
        }
    });
}


/* ========================================
   Google reviews CTA
   ======================================== */

function initializeGoogleReviewsLink() {
    if (!CONFIG.GOOGLE_REVIEWS_URL) return;
    ['google-reviews-cta', 'google-rating-link'].forEach((id) => {
        const link = document.getElementById(id);
        if (link) link.href = CONFIG.GOOGLE_REVIEWS_URL;
    });
}


/* ========================================
   Testimonial Read more dialog
   ======================================== */

function initializeTestimonialDialog() {
    const dialog = document.getElementById('testimonial-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const bodyEl = document.getElementById('testimonial-dialog-body');
    const titleEl = document.getElementById('testimonial-dialog-title');
    const closeBtn = document.getElementById('testimonial-dialog-close');
    let lastTrigger = null;

    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card) => {
        const body = card.querySelector('.testimonial-body');
        const moreBtn = card.querySelector('.testimonial-more');
        const author = card.querySelector('.testimonial-source');
        if (!body || !moreBtn) return;

        const revealIfClamped = () => {
            const clamped = body.scrollHeight > body.clientHeight + 1;
            moreBtn.hidden = !clamped;
        };

        revealIfClamped();
        window.addEventListener('resize', revealIfClamped);

        moreBtn.addEventListener('click', () => {
            lastTrigger = moreBtn;
            bodyEl.innerHTML = '';
            body.querySelectorAll('.testimonial-text').forEach((p) => {
                bodyEl.appendChild(p.cloneNode(true));
            });
            titleEl.textContent = author ? author.textContent.trim() : 'Client testimonial';
            dialog.showModal();
            closeBtn.focus();
        });
    });

    const closeDialog = () => {
        if (dialog.open) dialog.close();
    };

    closeBtn?.addEventListener('click', closeDialog);

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeDialog();
    });

    dialog.addEventListener('close', () => {
        bodyEl.innerHTML = '';
        if (lastTrigger) {
            lastTrigger.focus();
            lastTrigger = null;
        }
    });
}


/* ========================================
   Instagram embeds
   ======================================== */

function initializeInstagramEmbeds() {
    const process = () => {
        if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
            window.instgrm.Embeds.process();
        }
    };
    process();
    // embed.js is async — retry briefly if it loads after DOMContentLoaded
    let tries = 0;
    const timer = setInterval(() => {
        tries += 1;
        process();
        if ((window.instgrm && window.instgrm.Embeds) || tries > 20) {
            clearInterval(timer);
        }
    }, 250);
}

/* ========================================
   Mobile Navigation
   ======================================== */

function initializeMobileNav() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isOpen);
        nav.classList.toggle('is-open');
    });
    
    // Close menu when clicking nav links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) {
            toggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        }
    });
}

/* ========================================
   WhatsApp Links
   ======================================== */

function trackClarityEvent(name) {
    try {
        if (typeof window.clarity === 'function') {
            window.clarity('event', name);
        }
    } catch (e) {
        /* Clarity optional */
    }
}

function initializeWhatsAppLinks() {
    // Generate WhatsApp URL with pre-filled message
    function generateWhatsAppURL(messageType) {
        const message = WHATSAPP_MESSAGES[messageType] || '';
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
    }

    function bindWhatsAppClick(el, eventName, href) {
        if (!el) return;
        if (href) el.href = href;
        el.setAttribute('data-clarity-event', eventName);
        el.addEventListener('click', function () {
            trackClarityEvent(eventName);
            // Specific CTA location when available
            if (el.id) {
                trackClarityEvent(eventName + '_' + el.id);
            } else if (el.getAttribute('data-whatsapp-package')) {
                trackClarityEvent(eventName + '_' + el.getAttribute('data-whatsapp-package'));
            }
        });
    }
    
    // Book session links (hero, free-seekers, final, FAB)
    const bookLinks = [
        '#hero-book-whatsapp',
        '#pricing-book-whatsapp',
        '#free-seekers-book-whatsapp',
        '#final-book-whatsapp',
        '#whatsapp-fab'
    ];
    const bookUrl = generateWhatsAppURL('bookSession');
    
    bookLinks.forEach(selector => {
        bindWhatsAppClick(document.querySelector(selector), 'book_whatsapp_cta', bookUrl);
    });

    // Pricing package Book buttons
    document.querySelectorAll('[data-whatsapp-package]').forEach((el) => {
        bindWhatsAppClick(el, 'book_whatsapp_cta', null);
    });
    
    // Fit call links
    const fitCallLinks = ['#final-fit-call'];
    
    fitCallLinks.forEach(selector => {
        bindWhatsAppClick(
            document.querySelector(selector),
            'fit_call_whatsapp_cta',
            generateWhatsAppURL('fitCall')
        );
    });
    
    // Footer WhatsApp link
    bindWhatsAppClick(
        document.querySelector('#footer-whatsapp'),
        'book_whatsapp_cta',
        bookUrl
    );

    // Nav "Book now" scrolls to #book — track intent separately
    document.querySelectorAll('a.nav-cta[href="#book"]').forEach((el) => {
        el.addEventListener('click', function () {
            trackClarityEvent('nav_book_now_click');
        });
    });
}

/* ========================================
   Smooth Scroll
   ======================================== */

function initializeSmoothScroll() {
    // Only if user hasn't set prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Offset for sticky header
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });
}

/* ========================================
   Accessibility Enhancements
   ======================================== */

function initializeAccessibility() {
    // Announce page region changes for screen readers (optional enhancement)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const heading = section.querySelector('h2');
                    if (heading && section.id) {
                        // Could add aria-live region announcements here if needed
                    }
                }
            });
        },
        { threshold: 0.5 }
    );
    
    // Observe main sections
    document.querySelectorAll('main > section[id]').forEach(section => {
        observer.observe(section);
    });
    
    // Ensure FAQ details/summary are keyboard accessible (they should be by default)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        if (summary) {
            // Add keyboard event listeners if needed (details/summary should handle this natively)
            summary.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    // Native behavior should handle this, but we ensure it
                    e.preventDefault();
                    item.open = !item.open;
                }
            });
        }
    });
}

/* ========================================
   Sticky Header Shrink on Scroll
   ======================================== */

function initializeStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const scrollThreshold = 24;
    let ticking = false;

    const updateHeader = () => {
        header.classList.toggle('is-scrolled', window.scrollY > scrollThreshold);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    updateHeader();
}

/* ========================================
   Configuration Validation (Development Helper)
   ======================================== */

function validateConfiguration() {
    const warnings = [];
    
    if (CONFIG.WHATSAPP_NUMBER === '910000000000' || !CONFIG.WHATSAPP_NUMBER) {
        warnings.push('⚠️ WhatsApp number not configured');
    }
    
    if (CONFIG.SESSION_FEE === '——') {
        warnings.push('⚠️ Session fee not configured');
    }
    
    if (CONFIG.EMAIL === 'hello@example.com' || !CONFIG.EMAIL) {
        warnings.push('⚠️ Email not configured');
    }
    
    if (warnings.length > 0) {
        console.warn('Reach for Peace - Configuration warnings:');
        warnings.forEach(warning => console.warn(warning));
        console.warn('Update the CONFIG object in js/main.js before publishing.');
    }
}

// Run validation on load (will show warnings in browser console)
if (typeof window !== 'undefined') {
    validateConfiguration();
}

/* ========================================
   Utility Functions
   ======================================== */

// Format phone number for display
function formatPhoneNumber(number) {
    // Assumes Indian format: 91XXXXXXXXXX
    const match = number.match(/^91(\d{5})(\d{5})$/);
    if (match) {
        return `+91 ${match[1]} ${match[2]}`;
    }
    return number;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


/* Package-specific WhatsApp CTAs on pricing cards */
function initializePricingPackageLinks() {
    const map = {
        'one-session': WHATSAPP_MESSAGES.oneSession,
        'three-session': WHATSAPP_MESSAGES.threeSession,
        'six-session': WHATSAPP_MESSAGES.sixSession,
    };
    document.querySelectorAll('[data-whatsapp-package]').forEach((el) => {
        const key = el.getAttribute('data-whatsapp-package');
        const message = map[key] || WHATSAPP_MESSAGES.bookSession;
        const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
    });
}


function formatPhoneDisplay(num) {
    const digits = String(num || '').replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
        return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
    }
    if (digits.length === 10) {
        return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    }
    return num;
}

function initializePhoneLinks() {
    const digits = String(CONFIG.PHONE_NUMBER || CONFIG.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    if (!digits) return;
    const tel = `tel:+${digits}`;
    const display = formatPhoneDisplay(digits);

    document.querySelectorAll('#nav-call, #footer-phone').forEach((el) => {
        el.setAttribute('href', tel);
    });
    document.querySelectorAll('#phone-display').forEach((el) => {
        el.textContent = display;
    });
}


/* Lazy-load Instagram embed.js when the Instagram section nears the viewport */
(function () {
  var section = document.getElementById('instagram');
  if (!section) return;

  function loadEmbed() {
    if (document.querySelector('script[data-ig-embed]')) return;
    var s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    s.dataset.igEmbed = '1';
    s.onload = function () {
      if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(s);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          loadEmbed();
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(section);
  } else {
    loadEmbed();
  }
})();
