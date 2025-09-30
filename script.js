// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVIGATION FUNCTIONALITY ==========
    
    // Get navigation elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ========== TABS FUNCTIONALITY ==========
    
    // Get tab elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // ========== IMAGE MODAL FUNCTIONALITY ==========
    
    // Get modal elements
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeButton = document.getElementById('closeModal');
    
    // Get all clickable images
    const clickableImages = document.querySelectorAll('.clickable-image');

    // Function to open modal
    function openModal(imageSrc, imageAlt) {
        modalImage.src = imageSrc;
        modalCaption.textContent = imageAlt;
        modal.style.display = 'flex';
        
        // Trigger animation by adding show class after a brief delay
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('show');
        
        // Hide modal after animation completes
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore body scroll
        }, 300);
    }

    // Add click event listeners to all clickable images
    clickableImages.forEach(image => {
        image.addEventListener('click', function() {
            openModal(this.src, this.alt);
        });
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // ========== SMOOTH SCROLLING ==========
    
    // Handle smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#kompetensi');
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add animation class when element comes into view
    function handleScrollAnimation() {
        const animatedElements = document.querySelectorAll('.certificate-card, .gallery-img');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }

    // Add scroll event listener for animations
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Trigger initial animation check
    handleScrollAnimation();

    // ========== IMAGE LOADING OPTIMIZATION ==========
    
    // Function to handle image loading
    function handleImageLoad() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.animation = 'none'; // Remove loading animation
            });
            
            // Handle image error
            img.addEventListener('error', function() {
                this.style.animation = 'none';
                this.style.background = '#f0f0f0';
            });
        });
    }

    // Initialize image loading
    handleImageLoad();

    // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
    
    // Function to highlight active navigation item based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100; // Offset for better UX

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Add scroll listener for active navigation
    window.addEventListener('scroll', updateActiveNavigation);

    // ========== TOUCH SUPPORT FOR MOBILE ==========
    
    // Add touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;

    // Handle touch events for better mobile experience
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        // You can add swipe gestures here if needed
    });

    // ========== PERFORMANCE OPTIMIZATION ==========
    
    // Debounce function for scroll events
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

    // Apply debounce to scroll events for better performance
    const debouncedScrollHandler = debounce(function() {
        updateActiveNavigation();
        handleScrollAnimation();
    }, 10);

    // Replace individual scroll listeners with debounced version
    window.removeEventListener('scroll', updateActiveNavigation);
    window.removeEventListener('scroll', handleScrollAnimation);
    window.addEventListener('scroll', debouncedScrollHandler);

    // ========== ACCESSIBILITY ENHANCEMENTS ==========
    
    // Add keyboard navigation for modal
    modal.addEventListener('keydown', function(e) {
        // Tab key handling within modal
        if (e.key === 'Tab') {
            e.preventDefault();
            closeButton.focus();
        }
    });

    // Ensure focus management when modal opens
    clickableImages.forEach(image => {
        image.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(this.src, this.alt);
                // Focus close button when modal opens via keyboard
                setTimeout(() => {
                    closeButton.focus();
                }, 350);
            }
        });
    });

    // Add tabindex to clickable images for keyboard accessibility
    clickableImages.forEach(image => {
        image.setAttribute('tabindex', '0');
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', 'Klik untuk memperbesar gambar: ' + image.alt);
    });

    // ========== PRELOADER (OPTIONAL) ==========
    
    // Simple preloader functionality
    window.addEventListener('load', function() {
        // Remove any loading states
        document.body.classList.add('loaded');
        
        // Initialize any final animations
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'fadeInUp 1s ease';
        }
    });

    // ========== ERROR HANDLING ==========
    
    // Global error handling for images
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.log('Image failed to load:', e.target.src);
            e.target.style.background = '#f0f0f0';
            e.target.style.color = '#999';
        }
    }, true);

    // Console log for debugging (remove in production)
    console.log('Portfolio website initialized successfully!');
    console.log('Modal functionality enabled for', clickableImages.length, 'images');
});

// skill section
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200); // Delay untuk efek animasi
    });
});
