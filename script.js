// ===== APP CAROUSEL (HERO SECTION) =====

let currentSlide = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeTabSwitching();
    initializeCTAButtons();
    initializeEventTracking();
});

// ===== CAROUSEL FUNCTIONS =====
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    // Show first slide
    slides[0].classList.add('active');
    
    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        nextSlide();
    }, 5000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// ===== REVIEWS CAROUSEL =====
let currentReview = 0;

function nextReview() {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.reviews-dots .dot');
    
    if (reviews.length === 0) return;
    
    reviews[currentReview].classList.remove('active');
    if (dots[currentReview]) dots[currentReview].classList.remove('active');
    
    currentReview = (currentReview + 1) % reviews.length;
    
    reviews[currentReview].classList.add('active');
    if (dots[currentReview]) dots[currentReview].classList.add('active');
}

function prevReview() {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.reviews-dots .dot');
    
    if (reviews.length === 0) return;
    
    reviews[currentReview].classList.remove('active');
    if (dots[currentReview]) dots[currentReview].classList.remove('active');
    
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    
    reviews[currentReview].classList.add('active');
    if (dots[currentReview]) dots[currentReview].classList.add('active');
}

function goToReview(index) {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.reviews-dots .dot');
    
    if (reviews.length === 0) return;
    
    reviews[currentReview].classList.remove('active');
    if (dots[currentReview]) dots[currentReview].classList.remove('active');
    
    currentReview = index;
    
    reviews[currentReview].classList.add('active');
    if (dots[currentReview]) dots[currentReview].classList.add('active');
}

// ===== SCROLL TO DEMO =====
function scrollToDemo() {
    trackEvent('check_guides_click', {
        button_text: 'Check Our Guides',
        trigger: 'scroll_to_demo'
    });
    
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== TAB SWITCHING =====
function initializeTabSwitching() {
    const tabs = document.querySelectorAll('.tabs .tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
        });
    });
}

// ===== SCROLL TO CTA =====
function scrollToCTA() {
    trackEvent('buy_guide_scroll_click', {
        button_text: 'Buy Guide - $7',
        trigger: 'scroll_to_cta'
    });
    
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ===== CTA BUTTONS =====
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn-primary-small, .btn-download');
    
    ctaButtons.forEach(button => {
        if (!button.onclick && button.textContent.includes('Download')) {
            button.addEventListener('click', function() {
                // Here you can add App Store/Google Play links
                alert('App will be available soon! Thank you for your interest.');
            });
        }
    });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and guide cards
document.querySelectorAll('.feature-card, .guide-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
%c✨ Welcome to Bastian ✨
%cSee the city through the stories you love.

%cInterested in our API or partnership opportunities?
Contact us at: hello@bastian.app
`, 
'color: #6B4CE6; font-size: 24px; font-weight: bold;',
'color: #4A4A4A; font-size: 14px;',
'color: #757575; font-size: 12px;'
);

// ===== ANALYTICS & EVENT TRACKING =====

// Helper function to send events to Google Analytics
function trackEvent(eventName, eventParams = {}) {
    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
        console.log('GA Event:', eventName, eventParams);
    }
    
    // Send to Clarity (custom tags)
    if (typeof clarity !== 'undefined') {
        clarity('set', eventName, JSON.stringify(eventParams));
        console.log('Clarity Event:', eventName, eventParams);
    }
}

// Track page view
function trackPageView() {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
}

// ===== EVENT TRACKING INITIALIZATION =====
function initializeEventTracking() {
    // Track all Buy buttons
    trackBuyButtons();
    
    // Track all Download buttons
    trackDownloadButtons();
    
    // Track navigation links
    trackNavigationLinks();
    
    // Track audio players
    trackAudioPlayers();
    
    // Track story title cards
    trackStoryCards();
    
    // Track carousel interactions
    trackCarouselInteractions();
    
    // Track review carousel
    trackReviewCarousel();
}

// Track Buy buttons (specific for buy buttons)
function trackBuyButtons() {
    const buyButtons = document.querySelectorAll('.btn-buy, .btn-primary');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get guide name from parent card
            const guideCard = this.closest('.guide-card');
            let guideName = 'Unknown';
            
            if (guideCard) {
                const titleElement = guideCard.querySelector('.guide-title');
                guideName = titleElement ? titleElement.textContent : 'Unknown';
            }
            
            trackEvent('buy_button_click', {
                button_text: this.textContent.trim(),
                guide_name: guideName,
                button_location: guideCard ? 'guide_section' : 'hero_section'
            });
        });
    });
}

// Track Download buttons (specific for download buttons)
function trackDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.btn-download, .btn-primary-small');
    
    downloadButtons.forEach(button => {
        // Skip if it's already been handled by buy buttons
        if (button.classList.contains('btn-primary') || button.classList.contains('btn-buy')) {
            return;
        }
        
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section') || this.closest('nav');
            let location = 'unknown';
            
            if (section) {
                if (section.classList.contains('navbar')) {
                    location = 'navbar';
                } else if (section.classList.contains('hero')) {
                    location = 'hero';
                } else if (section.classList.contains('cta-section')) {
                    location = 'cta_section';
                }
            }
            
            trackEvent('download_button_click', {
                button_text: buttonText,
                button_location: location
            });
        });
    });
}

// Track navigation links
function trackNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-links a:not(button)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackEvent('navigation_click', {
                link_text: this.textContent.trim(),
                link_href: this.getAttribute('href')
            });
        });
    });
}

// Track audio players
function trackAudioPlayers() {
    const audioElements = document.querySelectorAll('audio');
    
    audioElements.forEach(audio => {
        const guideCard = audio.closest('.guide-card');
        let guideName = 'Unknown';
        
        if (guideCard) {
            const titleElement = guideCard.querySelector('.guide-title');
            guideName = titleElement ? titleElement.textContent : 'Unknown';
        }
        
        // Track play
        audio.addEventListener('play', function() {
            trackEvent('audio_play', {
                guide_name: guideName,
                audio_src: this.querySelector('source')?.src || 'unknown'
            });
        });
        
        // Track pause
        audio.addEventListener('pause', function() {
            trackEvent('audio_pause', {
                guide_name: guideName,
                current_time: Math.round(this.currentTime)
            });
        });
        
        // Track completion
        audio.addEventListener('ended', function() {
            trackEvent('audio_complete', {
                guide_name: guideName
            });
        });
    });
}

// Track story title cards in hero
function trackStoryCards() {
    const storyCards = document.querySelectorAll('.story-title-card');
    
    storyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const storyName = this.querySelector('.story-name')?.textContent || 'Unknown';
            
            trackEvent('story_card_click', {
                story_name: storyName,
                link_href: this.getAttribute('href')
            });
        });
    });
}

// Track carousel interactions
function trackCarouselInteractions() {
    const prevButtons = document.querySelectorAll('.app-carousel .carousel-btn.prev');
    const nextButtons = document.querySelectorAll('.app-carousel .carousel-btn.next');
    const dots = document.querySelectorAll('.app-carousel .carousel-dots .dot');
    
    prevButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('carousel_interaction', {
                action: 'previous',
                carousel_type: 'app_screenshots'
            });
        });
    });
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('carousel_interaction', {
                action: 'next',
                carousel_type: 'app_screenshots'
            });
        });
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            trackEvent('carousel_interaction', {
                action: 'dot_click',
                slide_index: index,
                carousel_type: 'app_screenshots'
            });
        });
    });
}

// Track review carousel
function trackReviewCarousel() {
    const reviewPrevButtons = document.querySelectorAll('.reviews-carousel .carousel-btn.prev');
    const reviewNextButtons = document.querySelectorAll('.reviews-carousel .carousel-btn.next');
    const reviewDots = document.querySelectorAll('.reviews-dots .dot');
    
    reviewPrevButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('carousel_interaction', {
                action: 'previous',
                carousel_type: 'reviews'
            });
        });
    });
    
    reviewNextButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('carousel_interaction', {
                action: 'next',
                carousel_type: 'reviews'
            });
        });
    });
    
    reviewDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            trackEvent('carousel_interaction', {
                action: 'dot_click',
                review_index: index,
                carousel_type: 'reviews'
            });
        });
    });
}

// Track "Check Our Guides" button
const checkGuidesButtons = document.querySelectorAll('.btn-secondary');
checkGuidesButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('check_guides_click', {
            button_text: this.textContent.trim()
        });
    });
});

// Track footer links
document.querySelectorAll('.footer a').forEach(link => {
    link.addEventListener('click', function(e) {
        trackEvent('footer_link_click', {
            link_text: this.textContent.trim(),
            link_href: this.getAttribute('href')
        });
    });
});

// Track initial page view
trackPageView();
