// Function to handle menu toggle
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Function to handle project slides
function slideProjects(direction) {
    const slider = document.getElementById('projectsSlider');
    if (!slider) return;
    
    const cardWidth = slider.querySelector('.project-card').offsetWidth + 32; // Width + gap
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
        behavior: 'smooth'
    });
}

// Function to handle blog slides
function slideBlogs(direction) {
    const slider = document.getElementById('blogsSlider');
    if (!slider) return;
    
    const cardWidth = slider.querySelector('.blog-card').offsetWidth + 32; // Width + gap
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
        behavior: 'smooth'
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get slider elements
    const projectsSlider = document.getElementById('projectsSlider');
    const blogsSlider = document.getElementById('blogsSlider');
    
    // Set up arrow click handlers for projects section
    document.querySelectorAll('#projects .slide-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const direction = arrow.classList.contains('prev-arrow') ? -1 : 1;
            slideProjects(direction);
        });
    });
    
    // Set up arrow click handlers for blogs section
    document.querySelectorAll('#blogs .slide-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const direction = arrow.classList.contains('prev-arrow') ? -1 : 1;
            slideBlogs(direction);
        });
    });
    
    // Set up hover handlers for both sliders
    if (projectsSlider) {
        projectsSlider.addEventListener('mouseenter', stopAutoSlide);
        projectsSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    if (blogsSlider) {
        blogsSlider.addEventListener('mouseenter', stopAutoSlide);
        blogsSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
});