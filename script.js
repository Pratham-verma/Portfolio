
// Existing toggleMenu function
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Slider functions
function slideProjects(direction) {
    const slider = document.getElementById('projectsSlider');
    const cardWidth = slider.querySelector('.project-card').offsetWidth + 32; // 32 is the gap
    slider.scrollLeft += cardWidth * direction;
}

function slideBlogs(direction) {
    const slider = document.getElementById('blogsSlider');
    const cardWidth = slider.querySelector('.blog-card').offsetWidth + 32;
    slider.scrollLeft += cardWidth * direction;
}

// Auto-sliding functionality
function autoSlide() {
    const projectsSlider = document.getElementById('projectsSlider');
    const blogsSlider = document.getElementById('blogsSlider');
    
    setInterval(() => {
        if (projectsSlider.scrollLeft >= projectsSlider.scrollWidth - projectsSlider.clientWidth) {
            projectsSlider.scrollLeft = 0;
        } else {
            projectsSlider.scrollLeft += projectsSlider.querySelector('.project-card').offsetWidth + 32;
        }
    }, 3000);

    setInterval(() => {
        if (blogsSlider.scrollLeft >= blogsSlider.scrollWidth - blogsSlider.clientWidth) {
            blogsSlider.scrollLeft = 0;
        } else {
            blogsSlider.scrollLeft += blogsSlider.querySelector('.blog-card').offsetWidth + 32;
        }
    }, 3000);
}

// Initialize auto-sliding
document.addEventListener('DOMContentLoaded', autoSlide);
