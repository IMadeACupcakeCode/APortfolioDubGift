/**
 * CAHDUBS PORTFÓLIO - JavaScript
 * Spy x Family / Yor Forger Theme
 * Interactive & Animated Features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initLightbox();
    initVideoGallery();
    initSmoothScroll();
    initLoader();
});

/**
 * Particle Background System
 * Creates floating particles with Yor-themed colors
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    const colors = ['#E91E63', '#FF4081', '#9B4DCA', '#7B2D8E', '#FFD700'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and timing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color from Yor theme
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Navigation System
 * Handles navbar scroll effects and mobile menu
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar appear animation
    setTimeout(() => {
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
}

/**
 * Scroll Animations (AOS-like)
 * Elements fade in as they enter viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-visible');
                }, delay);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Counter Animation
 * Numbers count up when section is visible
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Lightbox Gallery
 * Full-screen image viewing
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox?.querySelector('.lightbox-image');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');

    if (!galleryItems.length || !lightbox) return;

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && lightboxImage) {
                lightboxImage.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox functions
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/**
 * Video Gallery & Modal
 * Handles video cards and modal functionality
 */
function initVideoGallery() {
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const videoEmbed = document.getElementById('videoEmbed');
    const modalClose = videoModal?.querySelector('.video-modal-close');
    const modalTitle = document.querySelector('.modal-video-title');
    const modalDesc = document.querySelector('.modal-video-description');
    const modalLink = document.querySelector('.modal-video-link');

    if (!videoCards.length || !videoModal) return;

    // Video URLs
    const videoUrls = {
        youtube: {
            'DDK0u-2SHm4': 'https://www.youtube.com/watch?v=DDK0u-2SHm4',
            'F1cY5RcMb5w': 'https://www.youtube.com/watch?v=F1cY5RcMb5w'
        },
        tiktok: {
            '7086342058016771334': 'https://www.tiktok.com/@cahzinha_dubs/video/7086342058016771334',
            '7584517325945113877': 'https://www.tiktok.com/@cahzinha_dubs/video/7584517325945113877'
        }
    };

    // Open modal
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            const platform = this.dataset.platform;
            const title = this.dataset.title;
            const description = this.dataset.description;

            // Set modal content
            if (modalTitle) modalTitle.textContent = title;
            if (modalDesc) modalDesc.textContent = description;
            
            // Generate embed URL
            let embedUrl = '';
            let watchUrl = '';

            if (platform === 'youtube') {
                embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                watchUrl = videoUrls.youtube[videoId] || `https://www.youtube.com/watch?v=${videoId}`;
            } else if (platform === 'tiktok') {
                // TikTok doesn't have direct embed, show message
                embedUrl = '';
                watchUrl = videoUrls.tiktok[videoId] || `https://www.tiktok.com/@cahzinha_dubs/video/${videoId}`;
            }

            // Set embed content
            if (embedUrl && videoEmbed) {
                videoEmbed.innerHTML = `<iframe src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            } else if (videoEmbed) {
                videoEmbed.innerHTML = `
                    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#00f2ea,#ff0050);">
                        <a href="${watchUrl}" target="_blank" style="padding:1rem 2rem;background:white;border-radius:30px;text-decoration:none;color:#000;font-weight:600;display:flex;align-items:center;gap:0.5rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                            Assistir no TikTok
                        </a>
                    </div>
                `;
            }

            // Set link
            if (modalLink) {
                modalLink.href = watchUrl;
            }

            // Show modal
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    const closeModal = () => {
        videoModal.classList.remove('active');
        if (videoEmbed) videoEmbed.innerHTML = '';
        document.body.style.overflow = '';
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on background click
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Smooth Scroll
 * Enhanced scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Page Loader
 * Initial loading animation
 */
function initLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-flower">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10 C30 30, 20 50, 50 90 C80 50, 70 30, 50 10" fill="none" stroke="#E91E63" stroke-width="2"/>
                    <path d="M50 30 C35 40, 30 50, 50 70 C70 50, 65 40, 50 30" fill="none" stroke="#9B4DCA" stroke-width="1"/>
                    <circle cx="50" cy="50" r="5" fill="#FFD700"/>
                </svg>
            </div>
            <div class="loader-text">Carregando...</div>
        </div>
    `;
    
    document.body.appendChild(loader);

    // Hide loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
}

/**
 * Additional Effects
 * Mouse movement parallax (optional enhancement)
 */
document.addEventListener('mousemove', function(e) {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;

    heroContent.style.transform = `translate(${x}px, ${y}px)`;
});

/**
 * Social Card Hover Effects
 * Enhanced interactions for social media links
 */
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/**
 * Gallery Hover Sound Effect (Optional)
 * Uncomment if you want sound effects
 */
// document.querySelectorAll('.gallery-item').forEach(item => {
//     item.addEventListener('mouseenter', function() {
//         // Add your sound effect here
//     });
// });

/**
 * Contact Form Handler (if needed in future)
 */
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add your form handling logic here
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Mensagem Enviada!';
            btn.style.background = '#4CAF50';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
            }, 2000);
        }, 1000);
    });
}

// Export functions for potential module use
window.CahdubsPortfolio = {
    initParticles,
    initNavigation,
    initScrollAnimations,
    initCounterAnimation,
    initLightbox,
    initSmoothScroll,
    initLoader
};
