// GSAP Animations
gsap.registerPlugin(ScrollTrigger);
    
// Active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Section animations
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
    });
});

// Home animations
gsap.from('.home-section h1', { duration: 1.2, y: 50, opacity: 0, ease: 'power3.out' });
gsap.from('.home-section p', { duration: 1.5, y: 50, opacity: 0, delay: 0.3, ease: 'power3.out' });
gsap.from('.home-section .social-links a', { 
    duration: 1.5, 
    y: 50, 
    opacity: 0, 
    delay: 0.6, 
    ease: 'power3.out',
    stagger: 0.1
});
gsap.from('.home-section .btn', { duration: 1.8, y: 50, opacity: 0, delay: 0.9, ease: 'power3.out' });

// Form handler
const form = document.getElementById('contact-form');
form.addEventListener('submit', async e => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = submitBtn.querySelector('span');
    const submitIcon = submitBtn.querySelector('i');
    
    try {
        submitText.textContent = 'Enviando...';
        submitIcon.className = 'fas fa-spinner fa-spin';
        submitBtn.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulação de envio bem-sucedido
        const successAlert = document.createElement('div');
        successAlert.className = 'form-alert success';
        successAlert.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Mensagem enviada com sucesso!</span>
        `;
        form.appendChild(successAlert);
        
        // Remove o alerta após 3 segundos
        setTimeout(() => {
            successAlert.remove();
        }, 3000);
        
        form.reset();
    } catch (error) {
        const errorAlert = document.createElement('div');
        errorAlert.className = 'form-alert error';
        errorAlert.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>Ocorreu um erro. Tente novamente.</span>
        `;
        form.appendChild(errorAlert);
        
        // Remove o alerta após 3 segundos
        setTimeout(() => {
            errorAlert.remove();
        }, 3000);
    } finally {
        submitText.textContent = 'Enviar Mensagem';
        submitIcon.className = 'fas fa-paper-plane';
        submitBtn.disabled = false;
    }
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Title animation
function initTitleAnimation() {
    const greeting = document.getElementById('greeting');
    const name = document.getElementById('name');
    
    // Initial state
    name.style.opacity = '0';
    name.style.display = 'none';

    setTimeout(() => {
        gsap.to(greeting, {
            duration: 0.5,
            opacity: 0,
            y: -20,
            onComplete: () => {
                greeting.textContent = "Olá, eu sou";
                name.style.display = "inline";
                
                gsap.to(greeting, {
                    duration: 0.5,
                    opacity: 1,
                    y: 0
                });
                
                gsap.fromTo(name, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            }
        });
    }, 1000);
}

// Initialize VanillaTilt (mantido para os cards)
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTitleAnimation();
    
    // Adiciona classe ao carregar para transições suaves
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});