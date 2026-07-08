// =========================================
// FinanceMind Landing Page
// =========================================

// Inicializa ícones Lucide (caso existam)
if (typeof lucide !== "undefined") {
    lucide.createIcons();
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

    if(window.scrollY > 50){

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";
        header.style.background = "rgba(255,255,255,.97)";

    }else{

        header.style.boxShadow = "none";
        header.style.background = "rgba(255,255,255,.85)";

    }

});

// =========================================
// Fade ao aparecer na tela
// =========================================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(".card,.benefit,.offer,.faq-item,.money,.screens img")
.forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

// =========================================
// Scroll suave
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const destino=document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({

            behavior:"smooth"

        });

    });

});

// =========================================
// Hover do botão
// =========================================

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="translateY(-5px) scale(1.02)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="translateY(0px)";

    });

});

// =========================================
// Contador animado (Gatilho Financeiro)
// =========================================

const money = document.querySelector(".money");

let animated = false;

function animateMoney(){

    if(animated) return;

    if(!money) return;

    const pos = money.getBoundingClientRect().top;

    if(pos < window.innerHeight - 150){

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

        const interval = setInterval(()=>{

            money.innerHTML += valores[i] + "<br>";

            i++;

            if(i >= valores.length){

                clearInterval(interval);

            }

        },350);

    }

}

window.addEventListener("scroll",animateMoney);

animateMoney();

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

`;

document.head.appendChild(style);

// =========================================
// Ano automático no footer
// =========================================

const footer = document.querySelector("footer p");

if(footer){

    footer.innerHTML = "© " + new Date().getFullYear() + " FinanceMind. Todos os direitos reservados.";

}

console.log("FinanceMind Landing Page carregada com sucesso 🚀");