/* 
  ALPHA ROOFING & GUTTERS | MASTER LOGIC CONTROLLER
  STRATEGIST: IM + Alpha AI
  VERSION: 16.7.5 (Global absolute pathing & Bilingual Sync)
  TIMESTAMP: 2026-06-02 13:00 CST
*/
document.addEventListener("DOMContentLoaded", function() {
    console.log("[Alpha Shield] v16.7.5 Online");

    // Detección de idioma por ruta para inyección modular
    const isEnglish = window.location.pathname.includes('/en/');
    const headerPath = isEnglish ? "/components/header-en.html" : "/components/header.html";

    // Inyección con rutas absolutas desde la raíz para evitar fallas en subdirectorios
    injectComponent("header-container", headerPath);
    injectComponent("zoho-form-embed", "/components/lead-form.html");

    // Inicialización automática si no existe el selector (Nodo EN o Selección previa)
    if (!document.getElementById('language-selector')) {
        initAlphaNavigation();
    } else if (window.location.hash) {
        initAlphaNavigation();
    }
});

function injectComponent(containerId, path) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(path)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.text();
            })
            .then(data => {
                container.innerHTML = data;
            })
            .catch(err => console.error(`[Alpha Error] Fallo en inyección de ${containerId}:`, err));
    }
}

function initAlphaNavigation() {
    if (!history.state) {
        const currentHash = window.location.hash.replace('#', '') || 'hero-section';
        history.replaceState({ sectionId: currentHash }, 'Home', `#${currentHash}`);
        showSection(currentHash, true);
    }
}

function showSection(sectionId, isBack = false) {
    const sections = document.querySelectorAll('.view-section');
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        sections.forEach(s => s.classList.remove('active'));
        targetSection.classList.add('active');
        window.scrollTo(0, 0);

        if (sectionId !== 'lead-form-container') {
            const hub = document.getElementById('hub-options');
            const zoho = document.getElementById('zoho-form-container');
            if (hub) hub.classList.remove('hidden');
            if (zoho) zoho.classList.add('hidden');
        }

        if (!isBack) {
            history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
        }
    }
}

function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            setTimeout(() => menu.classList.add('active'), 10);
        } else {
            menu.classList.remove('active');
            setTimeout(() => menu.classList.add('hidden'), 400);
        }
    }
}

function showZohoForm() {
    const hubContent = document.getElementById('hub-options');
    const formContent = document.getElementById('zoho-form-container');
    if (hubContent && formContent) {
        hubContent.classList.add('hidden');
        formContent.classList.remove('hidden');
        history.pushState({ sectionId: 'lead-form-container', subView: 'zoho' }, '', '#form-entry');
    }
}

function hideZohoForm() {
    const hubContent = document.getElementById('hub-options');
    const formContent = document.getElementById('zoho-form-container');
    if (hubContent && formContent) {
        formContent.classList.add('hidden');
        hubContent.classList.remove('hidden');
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

function navigateToHome() { showSection('hero-section'); }
function navigateToAuditForm() { showSection('lead-form-container'); }