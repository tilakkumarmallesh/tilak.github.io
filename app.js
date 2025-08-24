// Salesforce Architect Portfolio - Interactive JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimations();
    initProjectModals();
    initContactForm();
    initMobileMenu();
    addScrollToTop();
    initPreloader();
    initCustomCursor();
    initFocusManagement();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add scroll effect to navigation
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
        updateActiveNavLink();
    });

    // Smooth scroll for navigation links and CTA buttons
    const scrollLinks = document.querySelectorAll('.nav-link, .hero-actions .btn');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply initial theme
    applyTheme(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        
        // Add a visual feedback for theme change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.domain-card, .project-card, .architecture-card, .skill-category, .contact-item');
    
    // Add animation classes to elements
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Skill bar animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                setTimeout(() => {
                    entry.target.style.width = skillLevel + '%';
                }, 200);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Counter animations
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Animation duration control
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 40);
}

// Project modal functionality
function initProjectModals() {
    const projectData = [
        {
            title: "Enterprise Sales Cloud Implementation",
            description: "Led complete Sales Cloud transformation for Fortune 500 company with advanced automation and microservices integration",
            duration: "8 months",
            technologies: ["Sales Cloud", "APEX", "LWC", "Microservices", "REST APIs"],
            achievements: [
                "40% increase in sales productivity",
                "Automated 80% of manual processes",
                "Implemented scalable microservices architecture",
                "Enhanced data accuracy by 95%"
            ],
            details: "This comprehensive project involved redesigning the entire sales process for a Fortune 500 company. We implemented advanced lead scoring algorithms, automated opportunity management workflows, and integrated with multiple external systems through custom REST APIs. The microservices architecture ensures scalability and maintainability."
        },
        {
            title: "Multi-Cloud Integration Platform",
            description: "Designed and implemented seamless integration between Sales, Service, and Commerce clouds with custom Lightning components",
            duration: "6 months",
            technologies: ["Multi-Cloud", "LWC", "Platform Events", "APIs", "Integration"],
            achievements: [
                "Unified customer experience across clouds",
                "Real-time data synchronization",
                "50% reduction in system maintenance",
                "Enhanced security with Lightning Web Security"
            ],
            details: "Built a comprehensive integration platform connecting Sales Cloud, Service Cloud, and Commerce Cloud. Utilized Platform Events for real-time communication and custom Lightning Web Components for unified user interfaces. Implemented robust error handling and monitoring systems."
        },
        {
            title: "Community Cloud Portal with Advanced Security",
            description: "Built secure, scalable customer portal with advanced authentication and role-based access control",
            duration: "4 months",
            technologies: ["Community Cloud", "LWS", "Single Sign-On", "APEX", "Security"],
            achievements: [
                "10,000+ active users",
                "99.9% uptime achievement",
                "Advanced security implementation",
                "Mobile-responsive design"
            ],
            details: "Developed a customer self-service portal with advanced security features including multi-factor authentication, role-based permissions, and Lightning Web Security. The portal handles over 10,000 concurrent users with high performance and reliability."
        },
        {
            title: "eCommerce Platform with Microservices",
            description: "Developed complete B2B eCommerce solution with microservices architecture for scalability and performance",
            duration: "10 months",
            technologies: ["Commerce Cloud", "Microservices", "Payment APIs", "Inventory Management"],
            achievements: [
                "300% increase in order processing speed",
                "Scalable architecture supporting 100k+ products",
                "Seamless payment gateway integration",
                "Real-time inventory management"
            ],
            details: "Created a comprehensive B2B eCommerce platform with microservices architecture. Integrated multiple payment gateways, implemented real-time inventory management, and built custom pricing engines. The platform handles complex B2B scenarios including contract pricing and bulk orders."
        }
    ];

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-project-content');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = modal?.querySelector('.modal-backdrop');

    if (!modal || !modalTitle || !modalContent || !modalClose || !modalBackdrop) {
        console.warn('Modal elements not found');
        return;
    }

    // Add click handlers to project detail buttons
    const projectButtons = document.querySelectorAll('.project-details-btn');
    projectButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (projectData[index]) {
                showProjectModal(projectData[index]);
            }
        });
    });

    function showProjectModal(project) {
        modalTitle.textContent = project.title;
        
        modalContent.innerHTML = `
            <div class="project-modal-content">
                <div class="project-meta">
                    <span class="project-duration-modal" style="display: inline-block; background: var(--color-primary); color: var(--color-btn-primary-text); padding: var(--space-6) var(--space-12); border-radius: var(--radius-full); font-size: var(--font-size-sm); margin-bottom: var(--space-16);">Duration: ${project.duration}</span>
                </div>
                <p class="project-description-modal" style="margin-bottom: var(--space-16); color: var(--color-text-secondary);">${project.description}</p>
                <p class="project-details" style="margin-bottom: var(--space-20); line-height: var(--line-height-normal);">${project.details}</p>
                
                <h4 style="margin-bottom: var(--space-12); color: var(--color-text);">Technologies Used</h4>
                <div class="modal-tech-tags" style="display: flex; flex-wrap: wrap; gap: var(--space-8); margin-bottom: var(--space-20);">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <h4 style="margin-bottom: var(--space-12); color: var(--color-text);">Key Achievements</h4>
                <ul class="modal-achievements">
                    ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        `;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        modalClose.focus();
    }

    function hideProjectModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Close modal handlers
    modalClose.addEventListener('click', hideProjectModal);
    modalBackdrop.addEventListener('click', hideProjectModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            hideProjectModal();
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (!contactForm || !formMessage) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission with realistic delay
        try {
            await simulateFormSubmission();
            showFormMessage('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
        } catch (error) {
            showFormMessage('There was an error sending your message. Please try again or contact me directly via email.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 8000);
    }

    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 95% success rate for demo
                if (Math.random() > 0.05) {
                    resolve();
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 1500);
        });
    }
}

// Add scroll to top functionality
function addScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all var(--duration-normal) var(--ease-standard);
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Preloader functionality
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-background);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    preloader.innerHTML = '<div class="loading" style="width: 40px; height: 40px; border: 3px solid var(--color-secondary); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 800);
    });
}

// Add custom cursor effect for interactive elements
function initCustomCursor() {
    const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .project-card, .domain-card, .contact-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.cursor = 'pointer';
        });
    });
}

// Add focus management for accessibility
function initFocusManagement() {
    const modal = document.getElementById('project-modal');
    
    if (!modal) return;
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !modal.classList.contains('hidden')) {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
}

// Utility functions
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

// Add resize event listener for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
}, 250));

// Performance optimization: Lazy loading for non-critical animations
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--duration-fast', '0ms');
    document.documentElement.style.setProperty('--duration-normal', '0ms');
}

// Add error handling for external resources
window.addEventListener('error', (e) => {
    console.warn('Resource loading error:', e.filename, e.message);
});

// Add smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    const smoothScrollPolyfill = (target) => {
        const startPosition = window.pageYOffset;
        const targetPosition = target.offsetTop - 80;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const ease = easeInOutCubic(progress / duration);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        window.requestAnimationFrame(step);
    };

    // Override smooth scroll behavior
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(options) {
        if (typeof options === 'object' && options.behavior === 'smooth') {
            const target = document.querySelector(`[data-scroll-target="${options.top}"]`) || 
                          document.elementFromPoint(0, options.top);
            if (target) {
                smoothScrollPolyfill(target);
                return;
            }
        }
        originalScrollTo.apply(this, arguments);
    };
}