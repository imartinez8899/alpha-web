/* 
  ALPHA ROOFING & GUTTERS | MASTER LOGIC CONTROLLER
  STRATEGIST: IM + Alpha AI
  VERSION: 16.6.0 (Bilingual Component Injection)
  TIMESTAMP: 2026-06-02 11:45 CST
*/
document.addEventListener("DOMContentLoaded", function() {
    console.log("[Alpha Shield] v16.6.0 | IM + Alpha AI Online");

    // Detectar idioma según la URL para inyectar el componente correcto
    const isEnglish = window.location.pathname.includes('/en/');
    const headerFile = isEnglish ? "/components/header-en.html" : "/components/header.html";

    injectComponent("header-container", headerFile);
    injectComponent("zoho-form-embed", "/components/lead-form.html");

    if (window.location.hash) {
        initAlphaNavigation();
    }
});

function initAlphaNavigation() {
    if (!history.state) {
        const currentHash = window.location.hash.replace('#', '') || 'hero-section';
        history.replaceState({ sectionId: currentHash }, 'Home', `#${currentHash}`);
        showSection(currentHash, true);
    }
}

function injectComponent(containerId, path) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(path)
            .then(res => res.text())
            .then(data => container.innerHTML = data)
            .catch(err => console.error(`Error Alpha ${containerId}:`, err));
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
            document.getElementById('hub-options')?.classList.remove('hidden');
            document.getElementById('zoho-form-container')?.classList.add('hidden');
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