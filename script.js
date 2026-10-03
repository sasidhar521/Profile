// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // Resume download handler
    window.downloadResume = function() {
        alert('Resume download action triggered.');
    };

    // Contact form submit handler
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Interactive card subtle mouse move tilt/glow effect
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

});