/**
 * Alpha Roofing & Gutters - Master logic (Zero-Scroll & History Shield)
 * Arquitectura de Estados para Blindaje de Navegación
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Inyección de componentes modulares
    injectComponent("header-container", "/components/header.html");
    injectComponent("footer-container", "/components/footer.html");
    injectComponent("zoho-form-container", "/components/lead-form.html");

    // 2. Inicialización del Estado Base (Home)
    // Al cargar por primera vez, fijamos el punto de inicio en la historia
    if (!history.state) {
        history.replaceState({ sectionId: 'hero-section' }, 'Home', '#home');
    }
});

/**
 * Inyección dinámica de fragmentos HTML
 */
function injectComponent(containerId, path) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(path)
            .then(res => res.text())
            .then(data => container.innerHTML = data)
            .catch(err => console.error(`Error Alpha ${containerId}:`, err));
    }
}

/**
 * Gestión de Vistas con Blindaje de Historia (pushState)
 * @param {string} sectionId - El ID de la sección a mostrar
 * @param {boolean} isBack - Indica si la navegación viene del botón atrás
 */
function showSection(sectionId, isBack = false) {
    const sections = document.querySelectorAll('.view-section');
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        // Desactivar todas las vistas
        sections.forEach(s => {
            s.classList.remove('active');
        });

        // Activar la vista seleccionada
        targetSection.classList.add('active');

        // Resetear scroll interno si fuera necesario
        window.scrollTo(0, 0);

        // Si la navegación es hacia adelante, inyectamos el estado en el historial
        if (!isBack) {
            history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
        }
        
        console.log(`[Alpha Navigation] Vista activa: ${sectionId}`);
    }
}

/**
 * Escucha Activa del Botón "Back" del Navegador (popstate)
 * Este es el corazón del blindaje de navegación
 */
window.onpopstate = function(event) {
    if (event.state && event.state.sectionId) {
        // Si hay un estado guardado, navegamos internamente a esa vista
        showSection(event.state.sectionId, true);
    } else {
        // Si no hay más estados internos, el comportamiento por defecto es el Home
        showSection('hero-section', true);
    }
};

/**
 * Navegación Semántica (Enlazada al Árbol de Decisiones)
 */
function navigateToHome() {
    showSection('hero-section');
}

function navigateToAuditForm() {
    showSection('lead-form-container');
}

/**
 * Lógica del Formulario Zoho (Alternancia de capas en Pantalla 6)
 */
function showZohoForm() {
    const hubContent = document.getElementById('hub-options');
    const formContent = document.getElementById('zoho-form-container');
    
    if (hubContent && formContent) {
        hubContent.classList.add('hidden');
        formContent.classList.remove('hidden');
        // También registramos este cambio como un estado para que el back regrese al Hub
        history.pushState({ sectionId: 'lead-form-container-zoho' }, '', '#form');
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

function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) menu.classList.toggle("hidden");
}