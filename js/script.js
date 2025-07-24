const contactForm = document.getElementById('contactForm');
const result = document.getElementById('result');

// Load hCaptcha script dynamically
const script = document.createElement('script');
script.src = 'https://web3forms.com/client/script.js';
script.async = true;
script.defer = true;
document.head.appendChild(script);

// Form submission handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Additional parameters
    formData.append('website', window.location.href);
    formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    
    // Submit to Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(async (response) => {
        const json = await response.json();
        
        if (json.success) {
            result.innerHTML = "Thank you for your message! I'll get back to you soon.";
            result.classList.add('success');
            contactForm.reset();
            
            // Redirect if specified
            if (contactForm.querySelector('input[name="redirect"]').value) {
                window.location.href = contactForm.querySelector('input[name="redirect"]').value;
            }
        } else {
            console.log(json);
            result.innerHTML = json.message || "Something went wrong. Please try again.";
            result.classList.add('error');
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong. Please try again.";
        result.classList.add('error');
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            result.innerHTML = '';
            result.classList.remove('success', 'error');
        }, 5000);
    });
});




// Dark/Light Mode Toggle
        const modeToggle = document.getElementById('modeToggle');
        const body = document.body;
        const icon = modeToggle.querySelector('i');

        // Check for saved user preference or use system preference
        const savedMode = localStorage.getItem('mode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('mode', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('mode', 'light');
            }
        });

        // Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Project filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        
        // Animation on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .tool-item');

            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;

                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        window.addEventListener("scroll", () => {
            const backgroundText = document.querySelector(".background");
            const scrollY = window.scrollY;
            backgroundText.style.transform = `translateY(${20 + scrollY * 0.2}px)`;
        });

        // Set initial state for animated elements
        document.querySelectorAll('.timeline-item, .project-card, .skill-item, .tool-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        // Trigger once on page load
        animateOnScroll();