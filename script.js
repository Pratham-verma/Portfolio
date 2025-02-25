// Function to toggle the mobile menu
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
    console.log('Menu toggled');
    
}

function sendMail(event) {
    event.preventDefault();
    
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_c25kzvj";
    const templateID = "template_s12gdlp";

    const submitButton = event.target.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your message sent successfully!!");
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        })
        .catch(err => {
            console.log(err);
            alert("Error sending message. Please try again.");
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });

    return false; 
}

// Function to handle responsiveness for navigation
function handleMobileNav() {
    const desktopNav = document.getElementById('desktop-nav');
    const hamburgerNav = document.getElementById('hamburger-nav');
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
