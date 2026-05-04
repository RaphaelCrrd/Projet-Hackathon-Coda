document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-links > li');

    navItems.forEach(li => {
        let timer;
        const dropdown = li.querySelector('.dropdown');

        // On ne met des écouteurs que si un menu déroulant existe dans ce li
        if (dropdown) {
            li.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                dropdown.classList.add('open');
            });

            li.addEventListener('mouseleave', () => {
                // Petit délai pour éviter que le menu se ferme si on bouge vite la souris
                timer = setTimeout(() => {
                    dropdown.classList.remove('open');
                }, 150);
            });
        }
    });

    // Optionnel : Gestion du menu burger pour le mobile
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active'); // Assure-toi d'avoir .active dans ton CSS
        });
    }
});