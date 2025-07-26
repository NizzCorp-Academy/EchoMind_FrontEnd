document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const navLinks = document.querySelector('.hidden.md\\:flex');
    
    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
        navLinks.classList.toggle('flex-col');
        navLinks.classList.toggle('absolute');
        navLinks.classList.toggle('top-16');
        navLinks.classList.toggle('left-0');
        navLinks.classList.toggle('right-0');
        navLinks.classList.toggle('bg-gray-900');
        navLinks.classList.toggle('p-4');
        navLinks.classList.toggle('space-y-4');
        navLinks.classList.toggle('space-x-8');
        navLinks.classList.toggle('border-b');
        navLinks.classList.toggle('border-gray-800');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!navLinks.classList.contains('hidden')) {
                    mobileMenuButton.click();
                }
            }
        });
    });
});