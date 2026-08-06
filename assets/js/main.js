/**
 * ALPHA ROOFING & GUTTERS | MASTER LOGIC CONTROLLER
 * ESTRATEGA: IM + Alpha AI | FILOSOFÍA: "La belleza es la estructura hecha visible"
 * VERSION: 22.4.0 (Full Integration: Smart Scroll + Bilingual Sync + All Engines)
 */


document.addEventListener("DOMContentLoaded", function() {
    console.log("[Alpha Core] System Synchronized v22.4.0 | Full Stack Active");


    // 1. DETECCIÓN AXIAL DE IDIOMA Y RUTAS [Source: 1515, 1516]
    const lang = window.location.pathname.includes('/en/') ? 'en' : 'es';
    const headerPath = (lang === 'en') ? "/en/components/header-en.html" : "/components/header.html";
    const formPath   = (lang === 'en') ? "/en/components/lead-form.html" : "/components/lead-form.html";


    // 2. INYECCIÓN MODULAR SINCRONIZADA [Source: 1524, 1629]
    // El tercer parámetro 'true' activa el Smart Scroll tras confirmar la inyección del header
    injectComponent("header-container", headerPath, true);
    injectComponent("zoho-form-embed", formPath, false);


    // 3. INICIALIZACIÓN DE NAVEGACIÓN WEBAPP (SPA Logic) [Source: 1522]
    if (!document.getElementById('language-selector')) {
        initAlphaNavigation();
    } else if (window.location.hash) {
        initAlphaNavigation();
    }


    // 4. ACTIVACIÓN DE MOTORES DINÁMICOS [Source: 1517, 1530]
    const flipTarget = document.getElementById('flip-word-target');
    if (flipTarget) { setInterval(rotateCity, 2200); }
   
    if (document.querySelector('.q-item')) {
        setInterval(rotateQuestions, 2200);
    }


    // 5. INICIALIZACIÓN DEL MOTOR DE EVIDENCIA (TESTIMONIALES) [Source: 1547]
    if (document.getElementById('legacy')) {
        updateLegacyUI();
        startLegacyAutoplay();
    }
    // 🚩 RESTAURACIÓN DE TELEMETRÍA: SCROLLSPY PARA SERVICE 1
    if (document.querySelector('.sticky-subnav')) {
        initServiceScrollSpy();
    }
});


/**
 * MOTOR DE INYECCIÓN ALFA: Garantiza la existencia del DOM y herencia de transiciones
 */
function injectComponent(containerId, path, activateScroll = false) {
    const container = document.getElementById(containerId);
    if (!container) return;


    fetch(path)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            return res.text();
        })
        .then(data => {
            container.innerHTML = data;
            console.log(`[Alpha UI] Componente ${containerId} inyectado.`);
           
            // Soldadura de curvas de movimiento a elementos fijos [Source: 1554]
            const fixedElements = container.querySelectorAll('.fixed');
            fixedElements.forEach(el => {
                el.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            });


            if (activateScroll) { initSmartScroll(); }
        })
        .catch(err => console.error(`[Alpha Error] Fallo en ${containerId}:`, err));
}


/**
 * SMART SCROLL ENGINE: Gestión de visibilidad axial (WebApp Optimized) [Source: 1605, 1629]
 */
function initSmartScroll() {
    let lastScrollY = 0;
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;


    // Escuchamos el evento en modo captura para detectar scroll en secciones internas (WebApp style)
    window.addEventListener('scroll', (e) => {
        const currentScrollY = e.target.scrollTop || window.scrollY;
        const fixedElements = headerContainer.querySelectorAll('.fixed');


        if (currentScrollY > lastScrollY && currentScrollY > 60) {
            // SCROLL DOWN: Ocultar navegación
            fixedElements.forEach(el => {
                if (el.classList.contains('top-0')) el.style.transform = 'translateY(-100%)';
                if (el.classList.contains('bottom-0')) el.style.transform = 'translateY(100%)';
            });
        } else {
            // SCROLL UP: Devolver navegación
            fixedElements.forEach(el => { el.style.transform = 'translateY(0)'; });
        }
        lastScrollY = currentScrollY;
    }, true);
}


/**
 * CONTROLADOR DE IDIOMA GLOBAL [Source: 1327, 1556]
 */
window.setLanguage = function(lang) {
    const overlay = document.getElementById('language-selector');
    if (overlay) {
        overlay.classList.add('inactive');
        setTimeout(() => {
            if (lang === 'en') window.location.href = '/en/index.html';
            else {
                overlay.style.display = 'none';
                initAlphaNavigation();
            }
        }, 700);
    }
};


/**
 * NAVEGACIÓN SEMÁNTICA (SPA Architecture) [Source: 1522-1524]
 */
function initAlphaNavigation() {
    const currentHash = window.location.hash.replace('#', '') || 'hero-section';
    history.replaceState({ sectionId: currentHash }, 'Home', `#${currentHash}`);
    showSection(currentHash, true);
}


function showSection(sectionId, isBack = false) {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    // Solo cambiamos de "Pantalla" si el objetivo tiene la clase .view-section
    if (targetSection.classList.contains('view-section')) {
        const sections = document.querySelectorAll('.view-section');
        sections.forEach(s => s.classList.remove('active'));
        targetSection.classList.add('active');
        
        if (targetSection.classList.contains('scrollable')) { 
            targetSection.scrollTop = 0; 
        }
        if (sectionId !== 'lead-form-container') { hideZohoForm(); }
        if (!isBack) { 
            history.pushState({ sectionId: sectionId }, '', `#${sectionId}`); 
        }
    } else {
        // Si no es una pantalla principal, es un ancla interna. Solo hacemos scroll.
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}


function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) { menu.classList.toggle('hidden'); }
}


function showZohoForm() {
    const hub = document.getElementById('hub-options');
    const zoho = document.getElementById('zoho-form-container');
    if (hub && zoho) {
        hub.classList.add('hidden');
        zoho.classList.remove('hidden');
        history.pushState({ sectionId: 'lead-form-container', subView: 'zoho' }, '', '#form-entry');
    }
}


function hideZohoForm() {
    const hub = document.getElementById('hub-options');
    const zoho = document.getElementById('zoho-form-container');
    if (hub && zoho) {
        zoho.classList.add('hidden');
        hub.classList.remove('hidden');
    }
}


window.onpopstate = function(event) {
    const currentHash = window.location.hash.replace('#', '');
    const targetElement = document.getElementById(currentHash);

    if (event.state && event.state.sectionId) {
        // Si el destino es el formulario de Zoho, manejamos la transición interna
        if (event.state.sectionId === 'lead-form-container' && !event.state.subView) {
            hideZohoForm();
        }
        showSection(event.state.sectionId, true);
    } 
    // 🚩 CORRECCIÓN CRÍTICA: Si el hash es una sub-sección interna (#diagnosis, etc.)
    // NO regresamos al inicio, permitimos que el navegador haga el scroll.
    else if (currentHash && targetElement && !targetElement.classList.contains('view-section')) {
        console.log("[Alpha Core] Detectada navegación interna hacia:", currentHash);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    else {
        showSection('hero-section', true); // Fallback de seguridad [6]
    }
};


function navigateToHome(event) { if (event) event.preventDefault(); showSection('hero-section'); }
function navigateToAuditForm(event) { if (event) event.preventDefault(); showSection('lead-form-container'); }


/**
 * ENGINE: FLIP-WORDS (COBERTURA REGIONAL) [Source: 1518, 1521]
 */
const alphaCities = ["THE WOODLANDS, TX", "SPRING, TX", "CONROE, TX", "TOMBALL, TX", "MAGNOLIA, TX", "KATY, TX", "CYPRESS, TX", "PEARLAND, TX", "PASADENA, TX", "SUGAR LAND, TX", "BAYTOWN, TX", "CLEAR LAKE, TX"];
let cityIdx = 0;


function rotateCity() {
    const target = document.getElementById('flip-word-target');
    if (!target) return;
    const current = target.querySelector('.word-wrapper');
    if (current) {
        current.classList.remove('active');
        current.classList.add('exit');
        setTimeout(() => current.remove(), 800);
    }
    const nextCity = alphaCities[cityIdx];
    const wrapper = document.createElement('span');
    wrapper.className = 'word-wrapper';
    wrapper.innerHTML = `<span class="inline-block whitespace-nowrap">${nextCity.split('').map((c, i) => `<span class="letter" style="transition-delay: ${i * 0.03}s">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</span>`;
    target.appendChild(wrapper);
    wrapper.offsetHeight;
    wrapper.classList.add('active');
    cityIdx = (cityIdx + 1) % alphaCities.length;
}


/**
 * ENGINE: QUESTIONS ROTATION [Source: 1530]
 */
let qIdx = 0;
function rotateQuestions() {
    const items = document.querySelectorAll('.q-item');
    if (items.length === 0) return;
    items[qIdx].classList.remove('active');
    items[qIdx].classList.add('exit');
    qIdx = (qIdx + 1) % items.length;
    items[qIdx].classList.remove('exit');
    items[qIdx].offsetHeight;
    items[qIdx].classList.add('active');
    setTimeout(() => { items.forEach((item, i) => { if (i !== qIdx) item.classList.remove('exit'); }); }, 800);
}


/**
 * ENGINE: BILINGUAL TESTIMONIALS (9 PURIFIED ITEMS) [Source: 1534-1540]
 */
const testimonialData = {
    es: [
        { name: "Ramon Hernandez", location: "Houston, TX", service: "Reemplazo de Techo", quote: "Alpha se encargó de absolutamente todo con el seguro. Me dio mucha tranquilidad ver cómo recuperaron mi hogar con tanta profesionalidad.", rotation: -3 },
        { name: "Samantha Harris", location: "Cypress, TX", service: "Restauración por Tormenta", quote: "Tras el tornado, Alpha peleó mi caso con el seguro. Lograron la aprobación total del techo completo.", rotation: 2 },
        { name: "Steve Ramirez", location: "Sugar Land, TX", service: "Reemplazo de Techo", quote: "Un proceso increíblemente rápido. La aseguranza pagó a la primera y la instalación quedó impecable.", rotation: -2 },
        { name: "Armando Silva", location: "The Woodlands, TX", service: "Reemplazo de Techo", quote: "Mi casa quedó como nueva. El equipo cuidó cada detalle y el resultado final realmente elevó el valor de mi patrimonio.", rotation: 3 },
        { name: "John Peters", location: "Katy, TX", service: "Gestión de Seguro", quote: "Excelente gestión. Me hicieron el techo a través de mi aseguranza y no tuve que preocuparme por nada técnico.", rotation: -4 },
        { name: "Miguel Andrade", location: "Pasadena, TX", service: "Reemplazo de Techo", quote: "La calidad es visible. El color y el material del techo son espectaculares.", rotation: 1 },
        { name: "Lisa Smith", location: "Channelview, TX", service: "Gestión de Seguro", quote: "Totalmente satisfecha. Alpha asumió la responsabilidad del proceso sin estrés.", rotation: -2 },
        { name: "James Ordonez", location: "Pearland, TX", service: "Reemplazo de Techo", quote: "Tenía goteras internas persistentes. Alpha detectó el origen y lo solucionó definitivamente.", rotation: 3 },
        { name: "Roberto Martinez", location: "Spring, TX", service: "Proyecto Exterior", quote: "Construyeron un espacio inmaculado. Su metodología es de un nivel técnico superior.", rotation: -1 }
    ],
    en: [
        { name: "Ramon Hernandez", location: "Houston, TX", service: "Roof Replacement", quote: "Alpha handled absolutely everything with the insurance. It gave me great peace of mind.", rotation: -3 },
        { name: "Samantha Harris", location: "Cypress, TX", service: "Storm Restoration", quote: "After the tornado, Alpha fought my case with the insurance. They secured full approval for the entire roof.", rotation: 2 },
        { name: "Steve Ramirez", location: "Sugar Land, TX", service: "Roof Replacement", quote: "An incredibly fast process. The insurance paid on the first attempt, and the installation was flawless.", rotation: -2 },
        { name: "Armando Silva", location: "The Woodlands, TX", service: "Roof Replacement", quote: "My house looks brand new. The final result truly increased my home's equity.", rotation: 3 },
        { name: "John Peters", location: "Katy, TX", service: "Insurance Management", quote: "Excellent management. They replaced my roof through my insurance stress-free.", rotation: -4 },
        { name: "Miguel Andrade", location: "Pasadena, TX", service: "Roof Replacement", quote: "The quality is visible. The color and roofing material are spectacular.", rotation: 1 },
        { name: "Lisa Smith", location: "Channelview, TX", service: "Insurance Management", quote: "Totally satisfied. Alpha took full responsibility, allowing me to enjoy the result.", rotation: -2 },
        { name: "James Ordonez", location: "Pearland, TX", service: "Roof Replacement", quote: "I had persistent internal leaks. Alpha identified the source and solved it permanently.", rotation: 3 },
        { name: "Roberto Martinez", location: "Spring, TX", service: "Outdoor Project", quote: "They built a pristine space. Their work methodology is of a superior technical level.", rotation: -1 }
    ]
};


let legacyIdx = 0;
let legacyInterval;
let legacyPlaying = true;


function updateLegacyUI() {
    const lang = window.location.pathname.includes('/en/') ? 'en' : 'es';
    const currentList = testimonialData[lang];
    const data = currentList[legacyIdx];
    const quoteEl = document.getElementById('client-quote');
    const cards = document.querySelectorAll('#legacy .testimonial-card');
    if (!quoteEl || !data) return;


    document.getElementById('client-name').innerText = data.name;
    document.getElementById('client-location').innerText = data.location;
    document.getElementById('client-service').innerText = data.service;


    cards.forEach((card, i) => {
        card.className = 'testimonial-card';
        if (i === legacyIdx) {
            card.classList.add('active');
            card.style.transform = `rotate(0deg) scale(1)`;
        } else {
            card.classList.add('background');
            const rot = currentList[i]?.rotation || 0;
            card.style.transform = `rotate(${rot}deg) scale(0.95)`;
        }
    });


    quoteEl.innerHTML = '';
    data.quote.split(' ').forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        span.className = 'word';
        quoteEl.appendChild(span);
        setTimeout(() => span.classList.add('visible'), 30 * index);
    });
}


function nextTestimonial() { stopLegacyAutoplay(); legacyIdx = (legacyIdx + 1) % 9; updateLegacyUI(); }
function prevTestimonial() { stopLegacyAutoplay(); legacyIdx = (legacyIdx - 1 + 9) % 9; updateLegacyUI(); }


function startLegacyAutoplay() {
    legacyPlaying = true;
    legacyInterval = setInterval(() => {
        legacyIdx = (legacyIdx + 1) % 9;
        updateLegacyUI();
    }, 2800);
}


function stopLegacyAutoplay() {
    legacyPlaying = false;
    clearInterval(legacyInterval);
}


function toggleAutoplay() { if (legacyPlaying) stopLegacyAutoplay(); else startLegacyAutoplay(); }




/**
 * SERVICE SCROLLSPY v22.4.4: Telemetría de Alta Precisión
 * Calibrada para secciones de gran volumen (Alpha Way) [Source: 1367, 1504]
 */
function initServiceScrollSpy() {
    const sections = document.querySelectorAll("#diagnosis, #alpha-way, #legacy");
    const navItems = document.querySelectorAll(".nav-item");
    const scrollContainer = document.getElementById('service-1-section');

    if (!sections.length || !navItems.length || !scrollContainer) return;

    const observerOptions = {
        root: scrollContainer,
        // 🚩 RECALIBRACIÓN: Umbral de 0.1 para detectar secciones muy altas
        threshold: 0.1, 
        // Margen superior para activar el icono justo antes de que la sección toque el menú
        rootMargin: "-10% 0px -40% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                console.log("[Alpha UI] Sensor activado en hito:", id);
                
                navItems.forEach((item) => {
                    item.classList.remove("active");
                    // Sincronización axial con el href
                    if (item.getAttribute("href") === `#${id}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
}