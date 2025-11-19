// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                const target = document.querySelector('#contact');
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // If on a different page, go to index.html#contact
                    window.location.href = 'index.html#contact';
                }
            }
        });
    });
    
    // Form submission (Contact form)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Fixed scroll effect for navigation
    let prevScrollpos = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Set initial transition
        navbar.style.transition = 'top 0.3s ease, box-shadow 0.3s ease';
        
        window.addEventListener('scroll', function() {
            const currentScrollPos = window.pageYOffset;
            
            // Only hide navbar when scrolling down significantly
            if (prevScrollpos > currentScrollPos || currentScrollPos < 100) {
                navbar.style.top = "0";
            } else if (currentScrollPos > prevScrollpos && currentScrollPos > 100) {
                navbar.style.top = "-100px";
            }
            prevScrollpos = currentScrollPos;
            
            // Add shadow when scrolling
            if (currentScrollPos > 50) {
                navbar.style.boxShadow = "0 2px 20px rgba(0, 212, 255, 0.2)";
            } else {
                navbar.style.boxShadow = "0 2px 10px rgba(0, 212, 255, 0.1)";
            }
        });
    }
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                        entry.target.style.transition = 'width 2s ease-in-out';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.title');
    if (heroTitle && !heroTitle.classList.contains('typed')) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('typed');
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Fix active state for navigation
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href').split('#')[0];
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Add smooth reveal animation for elements
window.addEventListener('load', function() {
    const revealElements = document.querySelectorAll('.info-card, .project-card, .skill-category, .soft-skill-card');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        revealElements.forEach(element => {
            element.classList.add('reveal-element');
            revealObserver.observe(element);
        });
    }
});

// Console Easter Egg
console.log('%c Welcome to my portfolio! ', 'background: #00d4ff; color: #0a0e27; font-size: 20px; padding: 10px;');
console.log('%c Are you interested in cybersecurity? Let\'s connect! ', 'color: #00d4ff; font-size: 14px;');
