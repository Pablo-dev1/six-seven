document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('formMessage');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section[id]');

    // Constantes para valores mágicos
    const SCROLL_REVEAL_OFFSET = 80; // Offset para quando o elemento deve aparecer na tela
    const HEADER_OFFSET_FOR_ACTIVE_LINK = 140; // Altura do cabeçalho ou offset para links ativos

    // Mapeia os links de navegação para seus IDs de seção correspondentes para otimização
    const navLinksMap = {};
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            navLinksMap[href.substring(1)] = link;
        }
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - SCROLL_REVEAL_OFFSET) {
                element.classList.add('visible');
            }
        });
        // Para uma performance otimizada em muitos elementos, considere usar IntersectionObserver.
    };

    const setActiveLink = () => {
        const scrollPosition = window.scrollY + HEADER_OFFSET_FOR_ACTIVE_LINK;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const link = navLinksMap[section.id]; // Usa o mapa pré-criado para encontrar o link

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
            // Nota: Este formulário é processado apenas no lado do cliente. Para envio real, um backend é necessário.
            formMessage.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso.';
            formMessage.style.color = '#9df6e4';
            contactForm.reset();
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }
});