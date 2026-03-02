/* ============================================
   CYBERSECURITY COMMAND CENTER - SCRIPT
   ============================================ */

// --- Typing Animation for Hero Title (Variable Speed - Slow Decryption) ---
const TYPING_ROLES = [
    'Cybersecurity Analyst',
    'Penetration Tester',
    'Security Researcher'
];

// Single constant speed - never changes, same for type and delete
const TYPING_SPEED = 80;

function initTypingAnimation() {
    const typingEl = document.getElementById('typing-text');
    if (!typingEl) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const pauseAfterType = 2500;
    const pauseAfterDelete = 600;

    function type() {
        const currentRole = TYPING_ROLES[roleIndex];

        if (isDeleting) {
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % TYPING_ROLES.length;
                setTimeout(type, pauseAfterDelete);
                return;
            }
            charIndex--;
            typingEl.textContent = currentRole.substring(0, charIndex);
            setTimeout(type, TYPING_SPEED);
        } else {
            typingEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(type, pauseAfterType);
            } else {
                setTimeout(type, TYPING_SPEED);
            }
        }
    }

    type();
}

// --- Matrix / Digital Rain Canvas ---
function initMatrixCanvas() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(8, 8, 8, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00FF41';
        ctx.font = `${fontSize}px JetBrains Mono`;

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// --- Scroll Progress ---
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.transform = `scaleX(${progress / 100})`;
    });
}

// --- Back to Top ---
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- Terminal Logic ---
const TERMINAL_WHOAMI = `Security Analyst specialized in hardening digital frontiers across Web, Android, and API surfaces. Expert in reducing vulnerability footprints for 15+ real-world clients.`;

const TERMINAL_SKILLS_TABLE = `┌──────────────┬────────┐
│ Skill        │ Status │
├──────────────┼────────┤
│ Python 3.13  │   ✓    │
│ Java 8       │   ✓    │
│ MySQL        │   ✓    │
│ Burp Suite   │   ✓    │
│ Nmap         │   ✓    │
│ Wireshark    │   ✓    │
│ OWASP Top 10 │   ✓    │
└──────────────┴────────┘`;

const TERMINAL_PROJECTS_LIST = `┌─────────────────────────────────────────────────────────────────┐
│ Project                                                         │
├─────────────────────────────────────────────────────────────────┤
│ Digital Signature Verification                                  │
│ Blockchain Medical Portal                                        │
│ Web Application Firewall                                         │
│ Chat App                                                         │
│ Phishing URL Detection Using Transformers                       │
└─────────────────────────────────────────────────────────────────┘
Type 'projects' or scroll to #projects section`;

const TERMINAL_COMMANDS = {
    help: `Available commands:
  help     - Show this help
  whoami   - Display bio
  skills   - Print skills table
  projects - List projects
  clear    - Clear terminal`,

    whoami: TERMINAL_WHOAMI,
    skills: TERMINAL_SKILLS_TABLE,
    projects: TERMINAL_PROJECTS_LIST,
    clear: ''
};

/**
 * Sanitizes user input to prevent XSS. Strips HTML/script content.
 * Always use for any user-supplied string before display via textContent.
 */
function sanitizeTerminalInput(str) {
    if (typeof str !== 'string') return '';
    let safe = str.trim().slice(0, 256);
    if (typeof DOMPurify !== 'undefined') {
        safe = DOMPurify.sanitize(safe, { ALLOWED_TAGS: [] });
    } else {
        safe = safe.replace(/<[^>]*>/g, '').replace(/javascript:/gi, '');
    }
    return safe;
}

function typeWriter(element, text, speed = 25, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function processTerminalCommand(input) {
    const rawInput = input.trim();
    const sanitized = sanitizeTerminalInput(rawInput);
    const cmd = sanitized.toLowerCase();
    const output = document.getElementById('terminal-output');
    const promptLine = output.querySelector('.prompt-line');

    if (cmd === 'clear') {
        const lines = output.querySelectorAll('.terminal-line:not(.prompt-line)');
        lines.forEach(el => el.remove());
        promptLine.querySelector('.terminal-input').value = '';
        promptLine.querySelector('.terminal-input').focus();
        return;
    }

    if (!cmd) {
        promptLine.querySelector('.terminal-input').focus();
        return;
    }

    if (TERMINAL_COMMANDS.hasOwnProperty(cmd)) {
        const response = TERMINAL_COMMANDS[cmd];
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.textContent = `$ ${sanitized}`;
        output.insertBefore(cmdLine, promptLine);

        if (cmd === 'projects') scrollToSection('projects');

        if (response) {
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-line';
            if (cmd === 'skills' || cmd === 'projects') {
                responseLine.classList.add('skills-table');
            } else {
                responseLine.classList.add('typed-output');
            }
            responseLine.textContent = response;
            output.insertBefore(responseLine, promptLine);
        }
    } else {
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.textContent = `$ ${sanitized}`;
        output.insertBefore(cmdLine, promptLine);
        const errLine = document.createElement('div');
        errLine.className = 'terminal-line';
        errLine.style.color = 'var(--live-red)';
        errLine.textContent = `Command not found: ${sanitized}. Type 'help' for available commands.`;
        output.insertBefore(errLine, promptLine);
    }

    promptLine.querySelector('.terminal-input').value = '';
    output.scrollTop = output.scrollHeight;
    promptLine.querySelector('.terminal-input').focus();
}

function initTerminal() {
    const terminalInput = document.getElementById('terminal-input');

    document.addEventListener('keydown', (e) => {
        if (e.target.id !== 'terminal-input') return;
        if (e.key === 'Enter') {
            e.preventDefault();
            const input = e.target;
            const value = input.value;
            processTerminalCommand(value);
        }
    });

    if (terminalInput) terminalInput.focus();
}

// --- Swiper Carousel ---
function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    new Swiper('.speaking-swiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        effect: 'slide',
        speed: 600
    });
}

// --- EmailJS / Send Mail ---
function sendMail(event) {
    event.preventDefault();

    const params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const serviceID = 'service_c25kzvj';
    const templateID = 'template_s12gdlp';
    const submitButton = event.target.querySelector('button');
    const btnText = submitButton.querySelector('.btn-text');

    submitButton.disabled = true;
    if (btnText) btnText.textContent = 'Encrypting...';

    emailjs.send(serviceID, templateID, params)
        .then(() => {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            if (btnText) btnText.textContent = 'Transmitted ✓';
            submitButton.disabled = false;
            setTimeout(() => { if (btnText) btnText.textContent = 'Transmit Securely'; }, 2000);
        })
        .catch(() => {
            if (btnText) btnText.textContent = 'Transmit Securely';
            submitButton.disabled = false;
            alert('Transmission failed. Please retry.');
        });

    return false;
}

// --- Hamburger Menu ---
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (menuLinks) menuLinks.classList.toggle('open');
    if (hamburgerIcon) hamburgerIcon.classList.toggle('open');
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initMatrixCanvas();
    initScrollProgress();
    initBackToTop();
    initTerminal();
    initSwiper();

    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', toggleMenu);
    }
});
