// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
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

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add scroll animate class to sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-animate');
    });
    
    // Initial check
    handleScrollAnimations();
});

// Listen for scroll events
window.addEventListener('scroll', handleScrollAnimations);

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(42, 42, 42, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#2a2a2a';
        header.style.backdropFilter = 'none';
    }
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Interactive tech items
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Contact form handling (if needed)
function handleContactForm() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href.includes('mailto:')) {
                // Add analytics or tracking here if needed
                console.log('Email contact clicked');
            }
        });
    });
}

// Initialize contact form handling
document.addEventListener('DOMContentLoaded', handleContactForm);

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Dark mode toggle (bonus feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Copy email to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success message
        const message = document.createElement('div');
        message.textContent = 'Email copied to clipboard!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    });
}

// Add copy functionality to email links
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            copyToClipboard(email);
        });
    });
});

// Lazy loading for images (when added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    handleScrollAnimations();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Add your analytics tracking here
    console.log(`Event: ${eventName}`, eventData);
}

// Track page load
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_load', {
        url: window.location.href,
        timestamp: new Date().toISOString()
    });
});

// Track section views
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', {
                section: entry.target.id,
                timestamp: new Date().toISOString()
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
});

// Xbox Controller Joystick Animation
document.addEventListener('DOMContentLoaded', function() {
    const leftJoystick = document.querySelector('.left-joystick');
    const rightJoystick = document.querySelector('.right-joystick');
    const controller = document.querySelector('.xbox-controller');
    
    if (leftJoystick && rightJoystick && controller) {
        document.addEventListener('mousemove', function(e) {
            const controllerRect = controller.getBoundingClientRect();
            const controllerCenterX = controllerRect.left + controllerRect.width / 2;
            const controllerCenterY = controllerRect.top + controllerRect.height / 2;
            
            // Calculate mouse position relative to controller
            const mouseX = e.clientX - controllerCenterX;
            const mouseY = e.clientY - controllerCenterY;
            
            // Normalize and limit movement (max 8px from center)
            const maxMovement = 8;
            const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            
            let moveX = mouseX;
            let moveY = mouseY;
            
            if (distance > maxMovement) {
                moveX = (mouseX / distance) * maxMovement;
                moveY = (mouseY / distance) * maxMovement;
            }
            
            // Apply movement with slight variation between joysticks
            leftJoystick.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.3}px)`;
            rightJoystick.style.transform = `translate(${moveX * 0.4}px, ${moveY * 0.4}px)`;
        });
        
        // Add subtle controller hover effect
        controller.addEventListener('mouseenter', function() {
            controller.style.transform = 'scale(1.05)';
            controller.style.transition = 'transform 0.3s ease';
        });
        
        controller.addEventListener('mouseleave', function() {
            controller.style.transform = 'scale(1)';
            // Reset joysticks to center when mouse leaves
            leftJoystick.style.transform = 'translate(0, 0)';
            rightJoystick.style.transform = 'translate(0, 0)';
        });
        
        // Add button press animations
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(0.9)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
});