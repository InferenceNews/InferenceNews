// ============================================
// INFER LANDING PAGE - INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initScreenshotZoom();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const nav = document.getElementById('nav');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav__links');

    // Scroll effect for navigation
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for background
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// CATEGORY TABS
// ============================================
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Get category for potential future use
            const category = tab.dataset.category;

            // You could add logic here to filter/load different content
            // For now, it just shows the visual effect
            updateNewsCards(category);
        });
    });
}

// Mock function to update news cards based on category
function updateNewsCards(category) {
    const newsCards = document.querySelectorAll('.news-card');

    // Add a subtle animation effect when switching
    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just #
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav__links');
                const mobileToggle = document.getElementById('mobile-toggle');
                if (navLinks) navLinks.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('active');
            }
        });
    });
}

// ============================================
// SCREENSHOT ZOOM
// ============================================
function initScreenshotZoom() {
    const screenshots = document.querySelectorAll('.preview__phone');
    if (screenshots.length === 0) return;

    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'screenshot-modal';
    modal.innerHTML = `
        <button class="screenshot-modal__close" aria-label="Close zoom">&times;</button>
        <img class="screenshot-modal__content" src="" alt="Zoomed Screenshot">
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.screenshot-modal__content');
    const closeBtn = modal.querySelector('.screenshot-modal__close');

    screenshots.forEach(screenshot => {
        screenshot.addEventListener('click', () => {
            modalImg.src = screenshot.src;
            modalImg.alt = screenshot.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        setTimeout(() => {
            modalImg.src = ''; // Clear src after animation
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// HERO PARALLAX EFFECT (Optional enhancement)
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero__logo');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const parallaxValue = scrolled * 0.4;
            heroLogo.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
}

// ============================================
// TYPING EFFECT (Optional for hero subtitle)
// ============================================
function initTypingEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ============================================
// STOCK TICKER (For FinTech section - future use)
// ============================================
const stockData = [
    { symbol: 'META', price: 589.42, change: +2.34, changePercent: +0.40 },
    { symbol: 'NVDA', price: 875.28, change: +15.67, changePercent: +1.82 },
    { symbol: 'MSFT', price: 421.55, change: -3.21, changePercent: -0.76 },
    { symbol: 'GOOGL', price: 178.92, change: +1.45, changePercent: +0.82 },
    { symbol: 'RR', price: 5.87, change: +0.12, changePercent: +2.09 },
    { symbol: 'AAPL', price: 227.63, change: +4.28, changePercent: +1.92 },
    { symbol: 'AMZN', price: 198.45, change: -1.23, changePercent: -0.62 },
    { symbol: 'TSLA', price: 412.89, change: +8.56, changePercent: +2.12 }
];

function createStockTicker() {
    // This function can be used to create a scrolling stock ticker
    // when the FinTech category is selected
    return stockData.map(stock => {
        const isPositive = stock.change >= 0;
        return `
      <div class="stock-item ${isPositive ? 'positive' : 'negative'}">
        <span class="stock-symbol">${stock.symbol}</span>
        <span class="stock-price">$${stock.price.toFixed(2)}</span>
        <span class="stock-change">${isPositive ? '+' : ''}${stock.changePercent.toFixed(2)}%</span>
      </div>
    `;
    }).join('');
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollAnimations,
        initCategoryTabs,
        initSmoothScroll,
        stockData
    };
}
