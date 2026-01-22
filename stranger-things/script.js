// ===== STRANGER THINGS - ANALYTICS & EVENT TRACKING =====

// Helper function to send events to Google Analytics (Stranger Things specific)
function trackEvent(eventName, eventParams = {}) {
    // Add stranger-things prefix to all events
    const stEventName = `stranger_things_${eventName}`;
    
    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', stEventName, eventParams);
        console.log('✅ ST GA Event sent:', stEventName, eventParams);
    } else {
        console.warn('⚠️ gtag is not defined yet');
        // Retry after a delay if gtag is not ready
        setTimeout(() => {
            if (typeof gtag !== 'undefined') {
                gtag('event', stEventName, eventParams);
                console.log('✅ ST GA Event sent (delayed):', stEventName, eventParams);
            } else {
                console.error('❌ gtag failed to load');
            }
        }, 1000);
    }
    
    // Send to Clarity as custom event
    if (typeof clarity !== 'undefined') {
        clarity('event', stEventName);
        console.log('✅ ST Clarity Event sent:', stEventName);
    } else {
        console.warn('⚠️ Clarity is not defined yet');
        // Retry after a delay if Clarity is not ready
        setTimeout(() => {
            if (typeof clarity !== 'undefined') {
                clarity('event', stEventName);
                console.log('✅ ST Clarity Event sent (delayed):', stEventName);
            } else {
                console.error('❌ Clarity failed to load');
            }
        }, 1000);
    }
}

// Initialize Analytics
function initializeAnalytics() {
    console.log('🔧 Initializing Stranger Things Analytics...');
    
    // Check if gtag is available
    if (typeof gtag !== 'undefined') {
        console.log('✅ Google Analytics loaded (ST ID: G-99MHLJW6TW)');
    } else {
        console.error('❌ Google Analytics (gtag) not loaded');
    }
    
    // Check if Clarity is available
    if (typeof clarity !== 'undefined') {
        console.log('✅ Microsoft Clarity loaded (ST Project)');
    } else {
        console.error('❌ Microsoft Clarity not loaded');
    }
    
    // Track initial page view
    trackPageView();
}

// Track page view
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
        console.log('✅ ST Page view tracked');
    }
}

// ===== EVENT TRACKING INITIALIZATION =====
function initializeEventTracking() {
    // Track hero buttons
    trackHeroButtons();
    
    // Track CTA section
    trackCTASection();
    
    // Track footer links
    trackFooterLinks();
    
    // Track location cards
    trackLocationCards();
    
    // Track Stripe button
    trackStripeButton();
}

// Track Hero Section Buttons
function trackHeroButtons() {
    // Buy button in hero
    const heroBuyBtn = document.getElementById('hero-buy-btn');
    if (heroBuyBtn) {
        heroBuyBtn.addEventListener('click', function(e) {
            trackEvent('buy_button_click', {
                button_text: this.textContent.trim(),
                button_location: 'hero_section',
                button_type: 'primary'
            });
        });
    }
    
    // Preview Locations button
    const heroPreviewBtn = document.getElementById('hero-preview-btn');
    if (heroPreviewBtn) {
        heroPreviewBtn.addEventListener('click', function(e) {
            trackEvent('preview_locations_click', {
                button_text: this.textContent.trim(),
                button_location: 'hero_section',
                button_type: 'outline'
            });
        });
    }
}

// Track CTA Section
function trackCTASection() {
    // Monitor when CTA section becomes visible
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('cta_section_viewed', {
                        section_name: 'Enter the Upside Down CTA'
                    });
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        ctaObserver.observe(ctaSection);
    }
}

// Track Stripe Buy Button
function trackStripeButton() {
   const wrapper = document.getElementById('stripe-buy-button-wrapper');
    if (!wrapper) return;

    let tracked = false;

    wrapper.addEventListener(
      'pointerdown',
      function () {
        if (tracked) return;
        tracked = true;

        if (typeof trackEvent === 'function') {
          trackEvent('begin_checkout', {
            button_text: 'Get the Tour Map',
            button_location: 'cta_section',
            value: 0.99,
            currency: 'USD',
            provider: 'stripe'
          });
        } else if (typeof gtag === 'function') {
          gtag('event', 'begin_checkout', {
            value: 0.99,
            currency: 'USD',
            payment_method: 'stripe'
          });
        }
      },
      { passive: true }
    );
}

// Track Footer Links
function trackFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackEvent('footer_link_click', {
                link_text: this.textContent.trim(),
                link_href: this.getAttribute('href')
            });
        });
    });
}

// Track Location Cards
function trackLocationCards() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach((card, index) => {
        // Track when location cards come into view
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const locationTitle = card.querySelector('.location-title')?.textContent || 'Unknown';
                    trackEvent('location_card_viewed', {
                        location_name: locationTitle,
                        location_number: index + 1,
                        is_highlight: card.classList.contains('highlight')
                    });
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        cardObserver.observe(card);
    });
}

// Track scroll depth
let maxScrollDepth = 0;
let scrollTracked = {
    '25': false,
    '50': false,
    '75': false,
    '100': false
};

function trackScrollDepth() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
    
    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
    }
    
    // Track milestone scroll depths
    ['25', '50', '75', '100'].forEach(milestone => {
        const milestoneNum = parseInt(milestone);
        if (scrollPercent >= milestoneNum && !scrollTracked[milestone]) {
            scrollTracked[milestone] = true;
            trackEvent('scroll_depth', {
                depth_percent: milestone,
                page_section: getCurrentSection()
            });
        }
    });
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section.className || 'unknown';
        }
    }
    return 'unknown';
}

// Add scroll listener with throttle
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(trackScrollDepth, 100);
});

// ===== ORIGINAL FUNCTIONALITY =====

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
  section.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  .hero {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Console easter egg for Stranger Things fans
console.log('%c🔴 Welcome to the Upside Down...', 'color: #ff0000; font-size: 20px; font-weight: bold;');
console.log('%cHawkins Horror Day - A Stranger Things Fan Experience', 'color: #999; font-size: 12px;');

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for analytics to load
    setTimeout(() => {
        initializeAnalytics();
        initializeEventTracking();
    }, 500);
});
