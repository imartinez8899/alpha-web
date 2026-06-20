/**
 * ALPHA ROOFING & GUTTERS | MASTER LOGIC CONTROLLER
 * ESTRATEGA: IM + Alpha AI
 * FILOSOFÍA: "La belleza es la estructura hecha visible"
 * VERSION: 22.2.0 (Consolidated: Navigation, Bilingual Sync & Flip-Words Engine)
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("[Alpha Core] System Synchronized v22.2.0");

    // 1. DETECCIÓN DE IDIOMA Y RUTAS [SSOT 1351]
    const isEnglish = window.location.pathname.includes('/en/');
    const headerPath = isEnglish ? "/components/header-en.html" : "/components/header.html";

    // 2. INYECCIÓN MODULAR DE COMPONENTES [SSOT 1352]
    injectComponent("header-container", headerPath);
    injectComponent("zoho-form-embed", "/components/lead-form.html");

    // 3. INICIALIZACIÓN DE NAVEGACIÓN WEBAPP [SSOT 1352]
    if (!document.getElementById('language-selector')) {
        initAlphaNavigation();
    } else if (window.location.hash) {
        initAlphaNavigation();
    }

    // 4. ACTIVACIÓN DEL MOTOR FLIP-WORDS (SOLO SI EXISTE EL TARGET) [25: 1392]
    const flipTarget = document.getElementById('flip-word-target');
    if (flipTarget) {
        setInterval(rotateCity, 2800); // Cadencia agilizada según protocolo regional
    }
});

/**
 * MOTOR FLIP-WORDS: COBERTURA REGIONAL ALPHA [SSOT: Cobertura 41 Ciudades]
 */
const coreCities = ["THE WOODLANDS, TX", "SPRING, TX"];
const additionalCities = [
    "CONROE, TX", "TOMBALL, TX", "MAGNOLIA, TX", "MONTGOMERY, TX", "KLEIN, TX", 
    "OAK RIDGE NORTH, TX", "SHENANDOAH, TX", "HOUSTON, TX", "BELLAIRE, TX", 
    "WEST UNIVERSITY PLACE, TX", "HUNTERS CREEK VILLAGE, TX", "SPRING VALLEY VILLAGE, TX", 
    "JERSEY VILLAGE, TX", "ALDINE, TX", "HUMBLE, TX", "ATASCOCITA, TX", "KINGWOOD, TX", 
    "KATY, TX", "CYPRESS, TX", "FULSHEAR, TX", "RICHMOND, TX", "ROSENBERG, TX", 
    "SUGAR LAND, TX", "MISSOURI CITY, TX", "STAFFORD, TX", "PEARLAND, TX", 
    "FRIENDSWOOD, TX", "LEAGUE CITY, TX", "GALVESTON, TX", "SANTA FE, TX", 
    "DICKINSON, TX", "PASADENA, TX", "SOUTH HOUSTON, TX", "DEER PARK, TX", 
    "BAYTOWN, TX", "MONT BELVIEU, TX", "CHANNELVIEW, TX", "CLEAR LAKE, TX"
];

function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Lista unificada: Houston es estático en HTML, el script inicia con el resto
const alphaCities = [...coreCities, ...shuffleArray(additionalCities.filter(c => c !== "HOUSTON, TX"))];
let cityIdx = 0;

function buildWordElement(wordStr) {
    const wrapper = document.createElement('span');
    wrapper.className = 'word-wrapper';
    [...wordStr].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'letter';
        span.style.transitionDelay = `${i * 0.03}s`; // Stagger calibrado para fluidez
        wrapper.appendChild(span);
    });
    return wrapper;
}

function rotateCity() {
    const targetContainer = document.getElementById('flip-word-target');
    if (!targetContainer) return;

    const current = targetContainer.querySelector('.word-wrapper');
    if (current) {
        current.classList.remove('active');
        current.classList.add('exit');
        setTimeout(() => current.remove(), 800); // Tiempo de espera para desvanecimiento
    }

    const nextCityStr = alphaCities[cityIdx];
    const newCity = buildWordElement(nextCityStr);
    targetContainer.appendChild(newCity);
    
    newCity.offsetHeight; // Forzado de reflow para disparar animación
    newCity.classList.add('active');
    cityIdx = (cityIdx + 1) % alphaCities.length;
}

/**
 * CONTROLADOR DE NAVEGACIÓN SEMÁNTICA [SSOT 1354]
 */
function initAlphaNavigation() {
    const currentHash = window.location.hash.replace('#', '') || 'hero-section';
    history.replaceState({ sectionId: currentHash }, 'Home', `#${currentHash}`);
    showSection(currentHash, true);
}

function showSection(sectionId, isBack = false) {
    const sections = document.querySelectorAll('.view-section');
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        sections.forEach(s => s.classList.remove('active'));
        targetSection.classList.add('active');
        
        // Reset de scroll interno para secciones con scrollable
        if (targetSection.classList.contains('scrollable')) {
            targetSection.scrollTop = 0;
        }

        // Reset de vista del Hub de Contacto si aplica [5]
        if (sectionId !== 'lead-form-container') {
            hideZohoForm();
        }

        if (!isBack) {
            history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
        }
    }
}

/**
 * COMPONENTES Y BACKEND [SSOT 1353, 1356]
 */
function injectComponent(containerId, path) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(path)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.text();
            })
            .then(data => { container.innerHTML = data; })
            .catch(err => console.error(`[Alpha Error] Fallo en inyección de ${containerId}:`, err));
    }
}

function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) {
        menu.classList.toggle('hidden');
    }
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
    if (event.state) {
        if (event.state.sectionId === 'lead-form-container' && !event.state.subView) {
            hideZohoForm();
        }
        showSection(event.state.sectionId, true);
    } else {
        showSection('hero-section', true);
    }
};

// Accesos Rápidos
function navigateToHome() { showSection('hero-section'); }
function navigateToAuditForm() { showSection('lead-form-container'); }