/**
 * Portfolio JavaScript - Mbaye Babacar Diane
 * Interactions, animations, menu mobile et formulaires
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. GESTION DU MENU MOBILE (HAMBURGER)
    // ----------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        const toggleMenu = () => {
            const isActive = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        const closeMenu = () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Fermer au clic sur un lien du menu
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Fermer au clic en dehors du menu
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Fermer avec la touche Échap (Escape)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ----------------------------------------------------
    // 2. MISE EN VALEUR DU LIEN DE NAVIGATION ACTIF
    // ----------------------------------------------------
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-links a');

    allNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Correspondance directe ou équivalence home/index/portfolio
        const isHomeMatch = (currentFile === '' || currentFile === 'index.html' || currentFile === 'portfolio.html') &&
                            (href === 'index.html' || href === 'portfolio.html' || href === '#home' || href === './');

        const isPageMatch = href.includes(currentFile) && currentFile !== '';

        if (isHomeMatch || isPageMatch) {
            allNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // ----------------------------------------------------
    // 3. EFFET DE DÉFILEMENT SUR LE HEADER
    // ----------------------------------------------------
    const header = document.querySelector('header.class-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ----------------------------------------------------
    // 4. ANIMATION MACHINE À ÉCRIRE (TYPEWRITER)
    // ----------------------------------------------------
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = [
            "WEB DEVELOPER",
            "SOFTWARE DEVELOPER",
            "FULL-STACK DEVELOPER",
            "MOBILE DEVELOPER",
            "CYBERSECURITY ENTHUSIAST"
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 120;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 60;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 130;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause à la fin du mot complet
                typingSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // ----------------------------------------------------
    // 5. FILTRES DE PROJETS (SUR LA PAGE PROJETS)
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ----------------------------------------------------
    // 6. GESTION DU FORMULAIRE DE CONTACT
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Veuillez remplir tous les champs obligatoires (*).';
                return;
            }

            // Validation email simple
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Veuillez entrer une adresse e-mail valide.';
                return;
            }

            // Simuler l'envoi réussi
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';

            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = '✨ Merci ' + name + ' ! Votre message a bien été envoyé. Je vous répondrai très rapidement.';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Masquer le message après 6 secondes
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status';
                }, 6000);
            }, 1000);
        });
    }

    // ----------------------------------------------------
    // 7. BOUTON RETOUR EN HAUT (BACK TO TOP)
    // ----------------------------------------------------
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
