
document.addEventListener('DOMContentLoaded', function() {
    const compactMenu = document.querySelector('.CompactMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    compactMenu.addEventListener('click', function() {
        compactMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            compactMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const techTrack = document.getElementById('techTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (techTrack && prevBtn && nextBtn) {
        let currentIndex = 0;
        let itemsToShow = getItemsToShow();
        const originalItems = Array.from(techTrack.children);
        const totalItems = originalItems.length;

        function setupInfiniteLoop() {
            
            techTrack.innerHTML = '';
            
            
            for (let i = 0; i < 3; i++) { 
                originalItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    techTrack.appendChild(clone);
                });
            }
            
           
            currentIndex = totalItems;
            updateCarousel(false); 
        }
        
        function getItemsToShow() {
            const width = window.innerWidth;
            if (width >= 1200) return 5;
            if (width >= 992) return 4;
            if (width >= 768) return 3;
            if (width >= 576) return 2;
            return 1;
        }
        
        function updateCarousel(useTransition = true) {
            const itemWidth = 120;
            const gap = 32;
            const offset = currentIndex * (itemWidth + gap);
            
            if (useTransition) {
                techTrack.style.transition = 'transform 0.5s ease';
            } else {
                techTrack.style.transition = 'none';
            }
            
            techTrack.style.transform = `translateX(-${offset}px)`;
            
            if (useTransition) {
                if (window.carouselResetTimeout) {
                    clearTimeout(window.carouselResetTimeout);
                }
                
                window.carouselResetTimeout = setTimeout(() => {
                    if (currentIndex >= totalItems * 2) {
                        currentIndex = totalItems;
                        resetCarouselPosition();
                    } else if (currentIndex <= 0) {
                        currentIndex = totalItems;
                        resetCarouselPosition();
                    }
                }, 520);
            }
        }
        
        function resetCarouselPosition() {
            const itemWidth = 120;
            const gap = 32;
            const offset = currentIndex * (itemWidth + gap);
            
            requestAnimationFrame(() => {
                techTrack.style.transition = 'none';
                techTrack.style.transform = `translateX(-${offset}px)`;
                
                requestAnimationFrame(() => {
                    techTrack.offsetHeight;
                    techTrack.style.transition = 'transform 0.5s ease';
                });
            });
        }
        
        function goToPrev() {
            if (window.carouselResetTimeout) {
                clearTimeout(window.carouselResetTimeout);
            }
            currentIndex--;
            updateCarousel();
        }
        
        function goToNext() {
            if (window.carouselResetTimeout) {
                clearTimeout(window.carouselResetTimeout);
            }
            currentIndex++;
            updateCarousel();
        }
        
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);
        
        window.addEventListener('resize', function() {
            itemsToShow = getItemsToShow();
            updateCarousel();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.target.closest('.technologies')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    goToPrev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    goToNext();
                }
            }
        });
        
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                goToNext();
            }, 4000);
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        const carousel = document.querySelector('.tech-carousel-wrapper');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoScroll);
            carousel.addEventListener('mouseleave', startAutoScroll);
        }
        
        setupInfiniteLoop();
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const linkText = this.textContent.toLowerCase().trim();
        
        if (target) {
            if (linkText === 'about' || linkText === 'joseph kerry') {
                const targetPosition = target.offsetTop - 70;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 250;
                let start = null;
                
                function fastScrollAnimation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easeInOutQuad = progress < 0.5 
                        ? 2 * progress * progress 
                        : -1 + (4 - 2 * progress) * progress;
                    
                    window.scrollTo(0, startPosition + distance * easeInOutQuad);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(fastScrollAnimation);
                    }
                }
                
                requestAnimationFrame(fastScrollAnimation);
            } else {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        }
    });
});

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

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-animate');
    });
    
    handleScrollAnimations();
});

window.addEventListener('scroll', handleScrollAnimations);

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

function typeWriter(element, text, speed = 150) {
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

document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 500);
    }
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

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

document.addEventListener('DOMContentLoaded', handleContactForm);

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

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
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

document.addEventListener('DOMContentLoaded', lazyLoadImages);

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

const debouncedScrollHandler = debounce(function() {
    handleScrollAnimations();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
}

document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_load', {
        url: window.location.href,
        timestamp: new Date().toISOString()
    });
});

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

    const viewMoreBtn = document.getElementById('viewMoreTech');
    const hiddenTech = document.getElementById('hiddenTech');
    
    if (viewMoreBtn && hiddenTech) {
        viewMoreBtn.addEventListener('click', function() {
            // Add slide-out animation to the button
            viewMoreBtn.classList.add('slide-out');
            
            setTimeout(() => {
                viewMoreBtn.style.display = 'none';
                hiddenTech.classList.add('show');
            }, 300);
        });
    }
});

// Scroll Animation Observer
const scrollAnimationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            // Remove animate class when element leaves viewport
            entry.target.classList.remove('animate');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Timeline specific observer with staggered animation
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a small delay for timeline items to create staggered effect
            const timelineItems = entry.target.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 200); // 200ms delay between each item
            });
        } else {
            // Remove animate class from all timeline items when timeline leaves viewport
            const timelineItems = entry.target.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                item.classList.remove('animate');
            });
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.addEventListener('DOMContentLoaded', function() {
    // Observe all scroll animation elements
    document.querySelectorAll('.scroll-animate, .scroll-animate-up, .scroll-animate-left, .scroll-animate-right').forEach(element => {
        scrollAnimationObserver.observe(element);
    });
    
    // Observe timeline container for staggered animation
    const timelineContainer = document.querySelector('.timeline');
    if (timelineContainer) {
        timelineObserver.observe(timelineContainer);
    }
    
    // Also observe individual timeline items as backup
    document.querySelectorAll('.timeline-item').forEach(element => {
        scrollAnimationObserver.observe(element);
    });
});
