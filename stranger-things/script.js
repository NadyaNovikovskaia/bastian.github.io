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

// ===== INITIAL ANALYTICS =====
function initializeAnalytics() {
    console.log('🔧 Initializing Stranger Things Analytics...');
    trackPageView();
}

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

// ===== EVENT TRACKING =====
function initializeEventTracking() {
    trackHeroButtons();
    trackCTASection();
    trackFooterLinks();
    trackLocationCards();
    trackStripeButton();
    trackFooterBuyButton();
    trackExploreLocationsButton();
    trackQRCode();
}

// --- Hero Buttons ---
function trackHeroButtons() {
    const heroBuyBtn = document.getElementById('hero-buy-btn');
    if (heroBuyBtn) {
        heroBuyBtn.addEventListener('click', function() {
            trackEvent('scroll_to_buy', {
                button_text: this.textContent.trim(),
                button_location: 'hero_section',
                button_type: 'primary',
                price: '$8.49'
            });
        });
    }

    const heroPreviewBtn = document.getElementById('hero-preview-btn');
    if (heroPreviewBtn) {
        heroPreviewBtn.addEventListener('click', function() {
            trackEvent('scroll_to_locations', {
                button_text: this.textContent.trim(),
                button_location: 'hero_section'
            });
        });
    }
    
    // Location button (Google Maps)
    const locationBtn = document.getElementById('location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function(e) {
            trackEvent('location_button_click', {
                location_name: 'Gwinnett Place Mall',
                location_address: 'Duluth, GA',
                button_text: this.textContent.trim()
            });
        });
    }
}

// --- CTA Section ---
function trackCTASection() {
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('cta_section_viewed', {section_name: 'Enter the Upside Down CTA'});
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(ctaSection);
    }
}

// --- Stripe Button (Middle of Page) ---
function trackStripeButton() {
   const wrapper = document.getElementById('stripe-buy-button-wrapper');
    if (!wrapper) return;

    let tracked = false;

    wrapper.addEventListener(
      'pointerdown',
      function () {
        if (tracked) return;
        tracked = true;

          trackEvent('begin_checkout', {
            button_text: 'Get the Tour Map',
            button_location: 'middle',
            value: 8.49,
            currency: 'USD',
            provider: 'stripe'
          });
    }, { passive: true });
}

// --- Footer Buy Button ---
function trackFooterBuyButton() {
    const bottomBuyBtn = document.getElementById('footer-buy-btn');
    if (bottomBuyBtn) {
        bottomBuyBtn.addEventListener('click', function() {
            trackEvent('begin_checkout', {
                button_text: this.textContent.trim(),
                button_location: 'footer',
            value: 8.49,
            currency: 'USD',
                provider: 'stripe'
            });
          });
        }
}

// --- Explore Locations Button ---
function trackExploreLocationsButton() {
    const exploreBtn = document.getElementById('hero-preview-btn');
    const locationsSection = document.getElementById('locations-section');
    if (exploreBtn && locationsSection) {
        exploreBtn.addEventListener('click', function() {
            locationsSection.scrollIntoView({behavior: 'smooth'});
            trackEvent('scroll_to_locations', {button_text: this.textContent.trim(), button_location: 'hero_section'});
        });
    }
}

// --- QR Code Tracking ---
function trackQRCode() {
    const qrCode = document.getElementById('qr-code');
    if (qrCode && window.innerWidth >= 1024) {
        trackEvent('qr_displayed', {screen: 'desktop'});

        setTimeout(() => {
            trackEvent('qr_seen', {screen: 'desktop'});
        }, 3000);
    }
}

// --- Footer Links ---
function trackFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('footer_link_click', {
                link_text: this.textContent.trim(),
                link_href: this.getAttribute('href')
            });
        });
    });
}

// --- Location Cards ---
function trackLocationCards() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const locationTitle = card.querySelector('.location-title')?.textContent || 'Unknown';
                    trackEvent('location_card_viewed', {
                        location_name: locationTitle,
                        location_number: index + 1,
                        is_highlight: card.classList.contains('highlight')
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(card);
    });
}

// --- Scroll Depth Tracking ---
let maxScrollDepth = 0;
let scrollTracked = {
    '25': false,
    '50': false,
    '75': false,
    '100': false
};

function trackScrollDepth() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
    
    if (scrollPercent > maxScrollDepth) maxScrollDepth = scrollPercent;

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

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScrollDepth, 100);
});

// ===== LOCATION CAROUSEL =====
let currentLocationSlide = 0;

function nextLocationSlide() {
    const slides = document.querySelectorAll('.location-carousel .carousel-slide');
    const dots = document.querySelectorAll('.location-carousel .carousel-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentLocationSlide].classList.remove('active');
    if (dots[currentLocationSlide]) dots[currentLocationSlide].classList.remove('active');
    
    currentLocationSlide = (currentLocationSlide + 1) % slides.length;
    
    slides[currentLocationSlide].classList.add('active');
    if (dots[currentLocationSlide]) dots[currentLocationSlide].classList.add('active');
    
    trackEvent('carousel_interaction', {
        action: 'next',
        carousel_type: 'location_photos',
        slide_index: currentLocationSlide
    });
}

function prevLocationSlide() {
    const slides = document.querySelectorAll('.location-carousel .carousel-slide');
    const dots = document.querySelectorAll('.location-carousel .carousel-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentLocationSlide].classList.remove('active');
    if (dots[currentLocationSlide]) dots[currentLocationSlide].classList.remove('active');
    
    currentLocationSlide = (currentLocationSlide - 1 + slides.length) % slides.length;
    
    slides[currentLocationSlide].classList.add('active');
    if (dots[currentLocationSlide]) dots[currentLocationSlide].classList.add('active');
    
    trackEvent('carousel_interaction', {
        action: 'previous',
        carousel_type: 'location_photos',
        slide_index: currentLocationSlide
    });
}

function goToLocationSlide(index) {
    const slides = document.querySelectorAll('.location-carousel .carousel-slide');
    const dots = document.querySelectorAll('.location-carousel .carousel-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentLocationSlide].classList.remove('active');
    if (dots[currentLocationSlide]) dots[currentLocationSlide].classList.remove('active');
    
    currentLocationSlide = index;
    
    slides[currentLocationSlide].classList.add('active');
    if (dots[currentLocationSlide]) dots[currentLocationSlide].classList.add('active');
    
    trackEvent('carousel_interaction', {
        action: 'dot_click',
        carousel_type: 'location_photos',
        slide_index: currentLocationSlide
    });
}

// ===== MODAL WINDOW =====
function openModal() {
    const modal = document.getElementById('read-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        trackEvent('read_story_opened', {
            story_name: 'Starcourt Mall'
        });
    }
}

function closeModal() {
    const modal = document.getElementById('read-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openIntroModal() {
    const modal = document.getElementById('intro-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        trackEvent('read_story_opened', {
            story_name: 'Introduction'
        });
    }
}

function closeIntroModal() {
    const modal = document.getElementById('intro-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeIntroModal();
    }
});

// ===== AUDIO PLAYERS =====
function initializeAudioPlayers() {
    // Introduction Audio
    const introBtn = document.getElementById('intro-audio-btn');
    const introAudio = document.getElementById('intro-audio');
    
    if (introBtn && introAudio) {
        introBtn.addEventListener('click', function() {
            const playIcon = this.querySelector('.play-icon');
            const pauseIcon = this.querySelector('.pause-icon');
            
            if (introAudio.paused) {
                introAudio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                this.classList.add('playing');
                
                trackEvent('audio_play', {
                    audio_type: 'guide_introduction',
                    audio_name: 'Stranger Things Introduction'
                });
            } else {
                introAudio.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                this.classList.remove('playing');
                
                trackEvent('audio_pause', {
                    audio_type: 'guide_introduction',
                    current_time: Math.round(introAudio.currentTime)
                });
            }
        });
        
        introAudio.addEventListener('ended', function() {
            const playIcon = introBtn.querySelector('.play-icon');
            const pauseIcon = introBtn.querySelector('.pause-icon');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            introBtn.classList.remove('playing');
            
            trackEvent('audio_complete', {
                audio_type: 'guide_introduction'
            });
        });
    }
    
    // Mall Location Audio
    const mallBtn = document.getElementById('mall-audio-btn');
    const mallAudio = document.getElementById('mall-audio');
    
    if (mallBtn && mallAudio) {
        mallBtn.addEventListener('click', function() {
            const playIcon = this.querySelector('.play-icon');
            const pauseIcon = this.querySelector('.pause-icon');
            
            if (mallAudio.paused) {
                mallAudio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                this.classList.add('playing');
                
                trackEvent('audio_play', {
                    audio_type: 'location',
                    audio_name: 'Starcourt Mall',
                    location_name: 'Gwinnett Place Mall'
                });
            } else {
                mallAudio.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                this.classList.remove('playing');
                
                trackEvent('audio_pause', {
                    audio_type: 'location',
                    location_name: 'Gwinnett Place Mall',
                    current_time: Math.round(mallAudio.currentTime)
                });
            }
        });
        
        mallAudio.addEventListener('ended', function() {
            const playIcon = mallBtn.querySelector('.play-icon');
            const pauseIcon = mallBtn.querySelector('.pause-icon');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            mallBtn.classList.remove('playing');
            
            trackEvent('audio_complete', {
                audio_type: 'location',
                location_name: 'Gwinnett Place Mall'
            });
        });
    }
}

// Initialize Read Button
function initializeReadButton() {
    const readBtn = document.getElementById('read-btn');
    if (readBtn) {
        readBtn.addEventListener('click', openModal);
    }
    
    const readIntroBtn = document.getElementById('read-intro-btn');
    if (readIntroBtn) {
        readIntroBtn.addEventListener('click', openIntroModal);
    }
}

// --- Smooth Scroll for Anchors ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
});

// --- Intersection Observer for Section Animations ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

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

// --- Console Easter Egg ---
console.log('%c🔴 Welcome to the Upside Down...', 'color: #ff0000; font-size: 20px; font-weight: bold;');
console.log('%cHawkins Horror Day - A Stranger Things Fan Experience', 'color: #999; font-size: 12px;');

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeAnalytics();
        initializeEventTracking();
        initializeAudioPlayers();
        initializeReadButton();
    }, 500);
});
