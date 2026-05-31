/**
 * Alpha Web Infrastructure - Master JS Controller (Customer-Centric)
 * Sistema de Inyección Modular de Componentes UI con Enrutamiento Relativo de Raíz
 */
document.addEventListener("DOMContentLoaded", function() {
    // Inyección de la Barra de Navegación Táctil Inferior (Mobile Only)
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        fetch("/components/header.html")
            .then(response => response.text())
            .then(data => { headerContainer.innerHTML = data; })
            .catch(err => console.error("Error cargando la barra inferior Alpha:", err));
    }

    // Inyección del Pie de Página de Cobertura Regional Estática
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("/components/footer.html")
            .then(response => response.text())
            .then(data => { footerContainer.innerHTML = data; })
            .catch(err => console.error("Error cargando el footer Alpha:", err));
    }
});

/**
 * Controlador de Navegación Semántica Basada en Intenciones de Negocio
 */
function navigateToHome() {
    console.log("[Alpha Core] Reseteando flujo. Redirección al Cimiento de Marca.");
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = "/index.html";
    }
}

function navigateToAuditForm() {
    console.log("[Alpha Core] Traccionando salto inmediato hacia Selección de Contacto.");
    const formSection = document.getElementById("lead-form-container");
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = "/index.html#lead-form-container";
    }
}

function toggleFullscreenMenu() {
    console.log("[Alpha UI] Modificando visibilidad de la capa superior del mapa del sitio.");
    const menuOverlay = document.getElementById("fullscreen-menu-overlay");
    if (menuOverlay) {
        menuOverlay.classList.toggle("hidden");
    }
}