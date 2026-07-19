// =========================================
// FinanceMind Landing Page
// =========================================

// Inicializa ícones Lucide (caso existam)
if (typeof lucide !== "undefined") {
    lucide.createIcons();
}

// =========================================
// Menu mobile (hamburger)
// =========================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

        document.body.classList.toggle("no-scroll", isOpen);

    });

    // Fecha o menu ao clicar em um link (mobile)
    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("no-scroll");

        });

    });

    // Fecha o menu se a tela for redimensionada para desktop
    window.addEventListener("resize", () => {

        if (window.innerWidth > 768 && mainNav.classList.contains("open")) {

            mainNav.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("no-scroll");

        }

    });

}

// =========================================
// FAQ Accordion
// =========================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector("button");

    button.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {
                other.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});

// =========================================
// Navbar ao rolar
// =========================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";
        header.style.background = "rgba(255,255,255,.97)";

    } else {

        header.style.boxShadow = "none";
        header.style.background = "rgba(255,255,255,.85)";

    }

});

// =========================================
// Fade ao aparecer na tela
// =========================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: .15
});

document
    .querySelectorAll(
        ".card,.benefit,.testimonial,.offer,.faq-item,.money,.screens img"
    )
    .forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);

    });

// =========================================
// Scroll suave (com offset do header fixo)
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const destino = document.querySelector(this.getAttribute("href"));

        if (!destino) return;

        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;

        const top =
            destino.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            10;

        window.scrollTo({

            top,
            behavior: "smooth"

        });

    });

});

// =========================================
// Hover / touch do botão
// =========================================

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "translateY(-5px) scale(1.02)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "translateY(0px)";

    });

});

// =========================================
// Contador animado (Gatilho Financeiro)
// =========================================

const money = document.querySelector(".money");

let animated = false;

function animateMoney() {

    if (animated) return;

    if (!money) return;

    const pos = money.getBoundingClientRect().top;

    if (pos < window.innerHeight - 150) {

        animated = true;

        money.innerHTML = "";

        const valores = [

            "R$10 por dia",
            "↓",
            "R$300 por mês",
            "↓",
            "R$3.600 por ano"

        ];

        let i = 0;

        const interval = setInterval(() => {

            money.innerHTML += valores[i] + "<br>";

            i++;

            if (i >= valores.length) {

                clearInterval(interval);

            }

        }, 350);

    }

}

window.addEventListener("scroll", animateMoney);

animateMoney();

// =========================================
// Botão flutuante mobile
// =========================================

const mobileCta = document.querySelector(".mobile-cta");
const heroSection = document.querySelector(".hero");

function toggleMobileCta() {

    if (!mobileCta || !heroSection) return;

    const heroBottom = heroSection.getBoundingClientRect().bottom;

    if (heroBottom < 0) {

        mobileCta.classList.add("show-cta");

    } else {

        mobileCta.classList.remove("show-cta");

    }

}

window.addEventListener("scroll", toggleMobileCta);

toggleMobileCta();

// =========================================
// Classes de animação
// =========================================

const style = document.createElement("style");

style.innerHTML = `

.hidden{

    opacity:0;

    transform:translateY(40px);

    transition:.8s ease;

}

.show{

    opacity:1;

    transform:translateY(0);

}

@media (prefers-reduced-motion: reduce){

    .hidden{

        opacity:1 !important;

        transform:none !important;

        transition:none !important;

    }

}

`;

document.head.appendChild(style);

// =========================================
// Ano automático no footer
// =========================================

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        "© " +
        new Date().getFullYear() +
        " FinanceMind. Todos os direitos reservados.";

}

console.log("FinanceMind Landing Page carregada com sucesso 🚀");

// =========================================
// Carrossel de depoimentos FinanceMind
// =========================================

const testimonialsCarousel =
    document.getElementById("testimonialsCarousel");

const testimonialsTrack =
    document.getElementById("testimonialsTrack");

const testimonialPrev =
    document.getElementById("testimonialPrev");

const testimonialNext =
    document.getElementById("testimonialNext");

const testimonialDots =
    document.getElementById("testimonialDots");

if (
    testimonialsCarousel &&
    testimonialsTrack &&
    testimonialPrev &&
    testimonialNext &&
    testimonialDots
) {

    const originalCards = Array.from(
        testimonialsTrack.querySelectorAll(".testimonial-card")
    );

    let currentIndex = 0;
    let autoPlayInterval;
    let isTransitioning = false;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;

    // Cria os indicadores
    originalCards.forEach((card, index) => {

        const dot = document.createElement("button");

        dot.className = "testimonial-dot";
        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            `Ir para o depoimento ${index + 1}`
        );

        dot.addEventListener("click", () => {

            goToSlide(index);
            restartAutoPlay();

        });

        testimonialDots.appendChild(dot);

    });

    const dots =
        testimonialDots.querySelectorAll(".testimonial-dot");

    // Retorna a largura do card mais o espaço entre os cards
    function getCardWidth() {

        const firstCard =
            testimonialsTrack.querySelector(".testimonial-card");

        if (!firstCard) return 0;

        const trackStyle =
            window.getComputedStyle(testimonialsTrack);

        const gap =
            parseFloat(trackStyle.gap) || 0;

        return firstCard.getBoundingClientRect().width + gap;

    }

    // Calcula quantos cards aparecem ao mesmo tempo
    function getVisibleCards() {

        const carouselWidth =
            testimonialsCarousel.getBoundingClientRect().width;

        const cardWidth =
            getCardWidth();

        if (!cardWidth) return 1;

        return Math.max(
            1,
            Math.floor(carouselWidth / cardWidth)
        );

    }

    // Última posição válida sem deixar espaço vazio
    function getLastValidIndex() {

        const visibleCards =
            getVisibleCards();

        return Math.max(
            0,
            originalCards.length - visibleCards
        );

    }

    // Atualiza os indicadores inferiores
    function updateDots() {

        const lastValidIndex =
            getLastValidIndex();

        dots.forEach((dot, index) => {

            dot.style.display =
                index <= lastValidIndex
                    ? "block"
                    : "none";

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }

    // Move o carrossel
    function updateCarousel(animate = true) {

        if (!animate) {

            testimonialsTrack.style.transition = "none";

        } else {

            testimonialsTrack.style.transition =
                "transform .6s cubic-bezier(.22,.61,.36,1)";

        }

        currentTranslate =
            -(currentIndex * getCardWidth());

        previousTranslate =
            currentTranslate;

        testimonialsTrack.style.transform =
            `translate3d(${currentTranslate}px,0,0)`;

        updateDots();

    }

    // Vai para um slide específico
    function goToSlide(index) {

        if (isTransitioning) return;

        isTransitioning = true;

        const lastValidIndex =
            getLastValidIndex();

        // Ao passar do último slide válido,
        // volta para o começo
        if (index < 0) {

            currentIndex =
                lastValidIndex;

        } else if (index > lastValidIndex) {

            currentIndex = 0;

        } else {

            currentIndex = index;

        }

        updateCarousel(true);

        setTimeout(() => {

            isTransitioning = false;

        }, 620);

    }

    function nextSlide() {

        goToSlide(currentIndex + 1);

    }

    function previousSlide() {

        goToSlide(currentIndex - 1);

    }

    // Inicia o movimento automático
    function startAutoPlay() {

        stopAutoPlay();

        autoPlayInterval = setInterval(() => {

            nextSlide();

        }, 4000);

    }

    // Para o movimento automático
    function stopAutoPlay() {

        if (autoPlayInterval) {

            clearInterval(autoPlayInterval);

            autoPlayInterval = null;

        }

    }

    function restartAutoPlay() {

        stopAutoPlay();

        startAutoPlay();

    }

    // Botão próximo
    testimonialNext.addEventListener("click", () => {

        nextSlide();

        restartAutoPlay();

    });

    // Botão anterior
    testimonialPrev.addEventListener("click", () => {

        previousSlide();

        restartAutoPlay();

    });

    // Pausa quando o mouse fica em cima
    testimonialsCarousel.addEventListener(
        "mouseenter",
        stopAutoPlay
    );

    testimonialsCarousel.addEventListener(
        "mouseleave",
        startAutoPlay
    );

    // =========================================
    // Arrastar com mouse ou toque
    // =========================================

    testimonialsCarousel.addEventListener(
        "pointerdown",
        event => {

            isDragging = true;

            startX = event.clientX;

            previousTranslate =
                -(currentIndex * getCardWidth());

            testimonialsTrack.style.transition = "none";

            testimonialsCarousel.setPointerCapture(
                event.pointerId
            );

            stopAutoPlay();

        }
    );

    testimonialsCarousel.addEventListener(
        "pointermove",
        event => {

            if (!isDragging) return;

            const movement =
                event.clientX - startX;

            currentTranslate =
                previousTranslate + movement;

            testimonialsTrack.style.transform =
                `translate3d(${currentTranslate}px,0,0)`;

        }
    );

    function endDrag(event) {

        if (!isDragging) return;

        isDragging = false;

        const movement =
            event.clientX - startX;

        const minimumMovement = 55;

        if (movement < -minimumMovement) {

            nextSlide();

        } else if (movement > minimumMovement) {

            previousSlide();

        } else {

            updateCarousel(true);

        }

        startAutoPlay();

    }

    testimonialsCarousel.addEventListener(
        "pointerup",
        endDrag
    );

    testimonialsCarousel.addEventListener(
        "pointercancel",
        endDrag
    );

    // =========================================
    // Controle pelo teclado
    // =========================================

    testimonialsCarousel.setAttribute(
        "tabindex",
        "0"
    );

    testimonialsCarousel.addEventListener(
        "keydown",
        event => {

            if (event.key === "ArrowRight") {

                nextSlide();

                restartAutoPlay();

            }

            if (event.key === "ArrowLeft") {

                previousSlide();

                restartAutoPlay();

            }

        }
    );

    // =========================================
    // Ajuste ao redimensionar a tela
    // =========================================

    window.addEventListener("resize", () => {

        const lastValidIndex =
            getLastValidIndex();

        if (currentIndex > lastValidIndex) {

            currentIndex = 0;

        }

        updateCarousel(false);

        requestAnimationFrame(() => {

            testimonialsTrack.style.transition =
                "transform .6s cubic-bezier(.22,.61,.36,1)";

        });

    });

    // =========================================
    // Animação inicial da seção
    // =========================================

    const testimonialsSection =
        document.querySelector(".testimonials-section");

    if (testimonialsSection) {

        testimonialsSection.classList.add(
            "testimonials-hidden"
        );

        const testimonialsObserver =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "testimonials-visible"
                        );

                        testimonialsObserver.unobserve(
                            entry.target
                        );

                    }

                });

            }, {
                threshold: 0.12
            });

        testimonialsObserver.observe(
            testimonialsSection
        );

    }

    // Inicializa o carrossel
    updateCarousel(false);

    startAutoPlay();

}

// =========================================
// MODO CLARO / ESCURO - FINANCEMIND
// =========================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const html = document.documentElement;

    function updateTheme() {

        const dark = html.classList.contains("dark-mode");

        // Salva a preferência
        localStorage.setItem(
            "financemind-theme",
            dark ? "dark" : "light"
        );

        // Atualiza o ícone
        themeToggle.innerHTML = dark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

        // Atualiza os ícones Lucide
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }

    // Carrega o tema salvo
    const savedTheme = localStorage.getItem("financemind-theme");

    if (savedTheme === "dark") {
        html.classList.add("dark-mode");
    }

    updateTheme();

    themeToggle.addEventListener("click", () => {

        html.classList.toggle("dark-mode");

        updateTheme();

    });

}