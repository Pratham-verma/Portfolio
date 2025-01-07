// Function to toggle the mobile menu
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
}

// Function to handle responsiveness for navigation
function handleMobileNav() {
    const desktopNav = document.getElementById('desktop-nav');
    const hamburgerNav = document.getElementById('hamburger-nav');

    if (window.innerWidth <= 768) {
        desktopNav.style.display = 'none';
        hamburgerNav.style.display = 'flex';
    } else {
        desktopNav.style.display = 'flex';
        hamburgerNav.style.display = 'none';
    }
}

// Function to handle sliders (Projects and Blogs)
function handleSlider(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const card = slider.querySelector('.project-card, .blog-card');
    if (!card) return;

    const cardWidth = card.offsetWidth + 32; // Card width + gap
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    let newScroll = slider.scrollLeft + (cardWidth * direction);

    // Ensure we don't scroll beyond boundaries
    if (direction > 0 && newScroll > maxScroll) {
        newScroll = 0; // Reset to start
    } else if (direction < 0 && newScroll < 0) {
        newScroll = maxScroll; // Go to end
    }

    slider.scrollTo({
        left: newScroll,
        behavior: 'smooth',
    });
}

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        handleSlider('projectsSlider', 1);
        handleSlider('blogsSlider', 1);
    }, 5000); // Slides every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial mobile nav setup
    handleMobileNav();
    window.addEventListener('resize', handleMobileNav);

    // Set up menu toggle
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', toggleMenu);
    }

    // Set up project slider controls
    document.querySelectorAll('#projects .slide-arrow').forEach((arrow) => {
        arrow.addEventListener('click', () => {
            const direction = arrow.classList.contains('prev-arrow') ? -1 : 1;
            handleSlider('projectsSlider', direction);
        });
    });

    // Set up blog slider controls
    document.querySelectorAll('#blogs .slide-arrow').forEach((arrow) => {
        arrow.addEventListener('click', () => {
            const direction = arrow.classList.contains('prev-arrow') ? -1 : 1;
            handleSlider('blogsSlider', direction);
        });
    });

    // Set up hover handlers for sliders to pause auto-slide
    const projectsSlider = document.getElementById('projectsSlider');
    const blogsSlider = document.getElementById('blogsSlider');

    if (projectsSlider) {
        projectsSlider.addEventListener('mouseenter', stopAutoSlide);
        projectsSlider.addEventListener('mouseleave', startAutoSlide);
    }

    if (blogsSlider) {
        blogsSlider.addEventListener('mouseenter', stopAutoSlide);
        blogsSlider.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto-sliding
    startAutoSlide();
});
