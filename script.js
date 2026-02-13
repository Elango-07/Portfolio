
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close menu on click
            if (hamburger) hamburger.classList.remove('active');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Validation and Notification
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    const notifTitle = document.getElementById('notification-title');
    const notifMsg = document.getElementById('notification-msg');
    const notifIcon = document.querySelector('.notification-icon i');
    const closeNotif = document.querySelector('.close-notification');

    function showNotification(type, title, message) {
        notification.classList.remove('success', 'error', 'hidden');
        notification.classList.add(type);
        notification.classList.add('active');

        notifTitle.textContent = title;
        notifMsg.textContent = message;

        if (type === 'success') {
            notifIcon.className = 'fa-solid fa-circle-check';
        } else {
            notifIcon.className = 'fa-solid fa-circle-exclamation';
        }

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('active');
        }, 5000);
    }

    if (closeNotif) {
        closeNotif.addEventListener('click', () => {
            notification.classList.remove('active');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email');
            const nameInput = document.getElementById('name');
            const messageInput = document.getElementById('message');

            const email = emailInput.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate Email
            if (!emailRegex.test(email)) {
                showNotification('error', 'Invalid Email', 'Please enter a valid email address.');
                emailInput.focus();
                // Add shake animation to input to indicate error visually
                emailInput.style.borderColor = 'red';
                setTimeout(() => emailInput.style.borderColor = 'rgba(255,255,255,0.2)', 2000);
                return;
            }

            // Success Simulation
            // Ideally, here you would call emailjs.sendForm(...)
            showNotification('success', 'Message Sent!', 'Thanks, ' + nameInput.value + '. I will get back to you soon.');

            // Clear form
            contactForm.reset();
        });
    }
});
