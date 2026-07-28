// Navbar Scrolled Effect & Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Navigation Link based on Scroll Position
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close Mobile Menu on Click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });
});

// Contact Form EmailJS Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('#submit-btn') || form.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('form-status');

    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    
    if (formStatus) {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_name: 'Ved Patel'
    };

    emailjs.send('service_nrknv98', 'template_1kku7zg', templateParams)
        .then((response) => {
            console.log('EmailJS Success:', response.status, response.text);
            if (formStatus) {
                formStatus.className = 'form-status success';
                formStatus.textContent = `Thank you, ${templateParams.from_name}! Your message has been sent successfully to Ved.`;
            }
            form.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            if (formStatus) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Message sending failed. Please email vedbusiness2403@gmail.com directly.';
            }
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            setTimeout(() => {
                if (formStatus) formStatus.textContent = '';
            }, 8000);
        });
}
