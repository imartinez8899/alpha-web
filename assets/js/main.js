/* 
  ALPHA ROOFING & GUTTERS | MASTER LOGIC CONTROLLER
  STRATEGIST: IM + Alpha AI
  VERSION: 16.4.2 (Sub-view Navigation Shield)
  TIMESTAMP: 2026-06-01 16:45 CST
*/

document.addEventListener("DOMContentLoaded", function() {
    console.log("[Alpha Shield] v16.4.2 Online");
    injectComponent("header-container", "/components/header.html");
    // El formulario de Zoho se carga una sola vez en el contenedor oculto
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

        // Si salimos del formulario mediante navegación general, aseguramos que el hub sea visible la próxima vez
        if (sectionId !== 'lead-form-container') {
            document.getElementById('hub-options')?.classList.remove('hidden');
            document.getElementById('zoho-form-container')?.classList.add('hidden');
        }

        if (!isBack) {
            history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
        }
    }
}

/**
 * Lógica del Formulario Zoho (Alternancia de capas en Pantalla 6)
 * Permite que el botón Back regrese al Hub de Opciones
 */
function showZohoForm() {
    const hubContent = document.getElementById('hub-options');
    const formContent = document.getElementById('zoho-form-container');
    if (hubContent && formContent) {
        hubContent.classList.add('hidden');
        formContent.classList.remove('hidden');
        // Inyectamos un estado virtual para que el botón atrás del navegador funcione
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

/**
 * Escucha Maestra de la API de Historia (History API)
 * Sella la fuga de navegación y gestiona el botón "Atrás" de la PC y el Móvil
 */
window.onpopstate = function(event) {
    if (event.state) {
        // Caso especial: Estamos en la Pantalla 6 y el usuario quiere salir del formulario
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

function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) menu.classList.toggle("hidden");
}