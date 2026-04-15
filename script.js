document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('formMessage');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section[id]');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                element.classList.add('visible');
            }
        });
    };

    const setActiveLink = () => {
        const scrollPosition = window.scrollY + 140;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const link = document.querySelector(`nav ul li a[href="#${section.id}"]`);

            if (link) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    };

    revealOnScroll();
    setActiveLink();

    window.addEventListener('scroll', () => {
        revealOnScroll();
        setActiveLink();
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            formMessage.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso.';
            formMessage.style.color = '#9df6e4';
            contactForm.reset();
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }
});