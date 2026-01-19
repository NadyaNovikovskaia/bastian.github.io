// ===== DEMO INTERACTION LOGIC =====

let selectedInterests = [];
let currentStep = 1;
let selectedCity = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeInterestCards();
    initializeTabSwitching();
    initializeCTAButtons();
    initializeWaitlistForm();
});

// ===== INTEREST SELECTION =====
function initializeInterestCards() {
    const interestCards = document.querySelectorAll('.interest-card');
    
    interestCards.forEach(card => {
        card.addEventListener('click', function() {
            const interest = this.getAttribute('data-interest');
            
            // Toggle selection
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedInterests = selectedInterests.filter(i => i !== interest);
            } else {
                this.classList.add('selected');
                selectedInterests.push(interest);
            }
            
            // Auto-advance if all three selected
            if (selectedInterests.length === 3) {
                setTimeout(() => nextStep(2), 500);
            }
        });
    });
}

// ===== STEP NAVIGATION =====
function nextStep(stepNumber) {
    // Hide current step
    const currentStepEl = document.querySelector('.demo-step.active');
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
    }
    
    // Show new step
    const newStepEl = document.getElementById(`step${stepNumber}`);
    if (newStepEl) {
        newStepEl.classList.add('active');
    }
    
    currentStep = stepNumber;
    
    // Scroll to demo section
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== CITY PICKER =====
function showCityPicker() {
    const cityPicker = document.getElementById('cityPicker');
    if (cityPicker) {
        cityPicker.classList.remove('hidden');
    }
}

function selectCity(cityName) {
    selectedCity = cityName;
    
    // Visual feedback
    const cityOptions = document.querySelectorAll('.city-option');
    cityOptions.forEach(option => {
        if (option.textContent === cityName) {
            option.style.background = 'var(--primary-color)';
            option.style.color = 'white';
        }
    });
    
    // Advance to next step after short delay
    setTimeout(() => nextStep(3), 500);
}

// ===== MAP EXPAND/COLLAPSE =====
function expandMap() {
    const mapPreview = document.getElementById('mapPreview');
    const expandBtn = event.target;
    
    if (mapPreview.classList.contains('collapsed')) {
        mapPreview.classList.remove('collapsed');
        mapPreview.classList.add('expanded');
        expandBtn.textContent = 'Collapse Map';
    } else {
        mapPreview.classList.add('collapsed');
        mapPreview.classList.remove('expanded');
        expandBtn.textContent = 'Expand Map';
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
            
            // In a real app, this would filter the title cards
            // For demo purposes, we just show the visual feedback
        });
    });
}

// ===== SCROLL TO CTA =====
function scrollToCTA() {
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== CTA BUTTONS =====
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('#cta-main, .btn-primary-small');
    
    ctaButtons.forEach(button => {
        if (!button.onclick) {
            button.addEventListener('click', scrollToCTA);
        }
    });
}

// ===== WAITLIST FORM =====
function initializeWaitlistForm() {
    const form = document.getElementById('waitlistForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('.email-input');
            const email = emailInput.value;
            
            if (email && validateEmail(email)) {
                // Hide form
                form.style.display = 'none';
                
                // Show success message
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
                
                // In a real app, this would send data to a server
                console.log('Email submitted:', email);
                
                // Optional: Send to analytics or backend
                // trackConversion(email);
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== FEEDBACK BUTTONS IN IMMERSE PAGE =====
document.querySelectorAll('.feedback-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Visual feedback
        this.style.transform = 'scale(1.2)';
        this.style.borderColor = 'var(--primary-color)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // In a real app, this would send feedback to the server
        const feedback = this.textContent;
        console.log('User feedback:', feedback);
    });
});

// ===== ICON BUTTON TOOLTIPS =====
document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const title = this.getAttribute('title');
        if (title) {
            // Create tooltip (simplified version)
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = title;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                white-space: nowrap;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;
            
            this.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.marginBottom = '4px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// ===== TITLE CARD CLICK TRACKING =====
document.querySelectorAll('.title-card').forEach(card => {
    card.addEventListener('click', function() {
        // Only advance to immerse if not clicking on an action button
        if (!event.target.closest('.title-actions')) {
            const titleName = this.querySelector('.title-name').textContent;
            console.log('Clicked title:', titleName);
        }
    });
});

// ===== IMMERSE BUTTON SPECIFIC HANDLER =====
document.querySelectorAll('.immerse-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Immerse button clicked');
    });
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

// ===== ANALYTICS SIMULATION (Replace with real analytics) =====
function trackPageView() {
    console.log('Page view tracked');
    // Example: gtag('event', 'page_view', {...});
}

function trackCTAClick(ctaType) {
    console.log(`CTA clicked: ${ctaType}`);
    // Example: gtag('event', 'cta_click', { cta_type: ctaType });
}

function trackDemoInteraction(step) {
    console.log(`Demo interaction: Step ${step}`);
    // Example: gtag('event', 'demo_interaction', { step: step });
}

function trackConversion(email) {
    console.log(`Conversion: ${email}`);
    // Example: gtag('event', 'conversion', { email: email });
}

// Track initial page view
trackPageView();
