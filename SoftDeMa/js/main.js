// ============================================
// SOFTDEMA - MAIN JAVASCRIPT (COMPLETO)
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Scroll Reveal
    initScrollReveal();

    // Initialize Smooth Scroll
    initSmoothScroll();

    // Initialize Mobile Menu
    initMobileMenu();

    // Initialize Language Toggle
    initLanguageToggle();

    // Initialize Pricing Mode
    initPricingMode();

    console.log('🚀 SoftDeMA initialized');
});

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
    gsap.utils.toArray('.scroll-reveal').forEach((elem, index) => {
        gsap.fromTo(elem,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                delay: index % 3 * 0.1
            }
        );
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) mobileMenu.classList.add('hidden');

                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuButton = document.querySelector('button[onclick="toggleMobileMenu()"]');

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
}

// ============================================
// LANGUAGE TOGGLE (EN/ES dentro del botón)
// ============================================
let currentLang = 'en';

function initLanguageToggle() {
    const savedLang = localStorage.getItem('softdema-lang');
    const toggleBtn = document.getElementById('langToggle');

    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        toggleBtn.setAttribute('data-lang', currentLang);
    }

    updateLanguageLabels();
    updateLanguage(false);
}

function toggleLanguage() {
    const toggleBtn = document.getElementById('langToggle');

    currentLang = currentLang === 'en' ? 'es' : 'en';
    toggleBtn.setAttribute('data-lang', currentLang);
    localStorage.setItem('softdema-lang', currentLang);

    updateLanguageLabels();
    updateLanguage(true);
    document.documentElement.lang = currentLang;
}

function updateLanguageLabels() {
    const options = document.querySelectorAll('.lang-option');
    options.forEach(opt => {
        if (opt.getAttribute('data-lang') === currentLang) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });
}

function updateLanguage(animate = true) {
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            if (animate) {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.textContent = text;
                    el.style.opacity = '1';
                }, 150);
            } else {
                el.textContent = text;
            }
        }
    });
}

// Agregar transición suave
document.querySelectorAll('[data-en]').forEach(el => {
    el.style.transition = 'opacity 0.15s ease';
});

// ============================================
// PRICING TOGGLE - ONE-TIME vs MONTHLY
// ============================================
let currentPricingMode = 'onetime';

function setPricingMode(mode) {
    currentPricingMode = mode;

    // Guardar en localStorage
    localStorage.setItem('softdema-pricing', mode);

    // Actualizar botones
    const btnOnetime = document.getElementById('btn-onetime');
    const btnMonthly = document.getElementById('btn-monthly');

    if (btnOnetime && btnMonthly) {
        if (mode === 'onetime') {
            btnOnetime.classList.add('active');
            btnMonthly.classList.remove('active');
        } else {
            btnOnetime.classList.remove('active');
            btnMonthly.classList.add('active');
        }
    }

    // Actualizar precios en todas las cards
    document.querySelectorAll('.price-display').forEach(el => {
        const newPrice = el.getAttribute(`data-${mode}`);
        if (newPrice) {
            // Animación de fade
            el.style.opacity = '0';
            setTimeout(() => {
                el.textContent = newPrice;
                el.style.opacity = '1';
            }, 200);
        }
    });

    // Actualizar texto del período
    document.querySelectorAll('.price-period').forEach(el => {
        if (mode === 'onetime') {
            el.textContent = currentLang === 'en' ? '/project' : '/proyecto';
        } else {
            el.textContent = currentLang === 'en' ? '/month' : '/mes';
        }
    });
}

// Inicializar al cargar
function initPricingMode() {
    const savedMode = localStorage.getItem('softdema-pricing');
    if (savedMode && (savedMode === 'onetime' || savedMode === 'monthly')) {
        setPricingMode(savedMode);
    } else {
        setPricingMode('onetime');
    }
}

// ============================================
// FLIP CARDS
// ============================================
function flipCard(cardId) {
    const card = document.getElementById(`card-${cardId}`);
    if (card) {
        card.classList.toggle('flipped');
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }
}

// ============================================
// NAV SCROLL EFFECT
// ============================================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(11, 15, 25, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
        nav.style.background = 'rgba(31, 41, 55, 0.7)';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🚀 SoftDeMA', 'font-size: 24px; font-weight: bold; color: #06B6D4;');
console.log('%cWe build digital growth.', 'font-size: 14px; color: #666;');
