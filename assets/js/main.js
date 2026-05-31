/**
 * Alpha Roofing & Gutters - Master Logic Controller
 */
document.addEventListener("DOMContentLoaded", function() {
    // Inyección de componentes modulares [17, 18]
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    if (headerContainer) {
        fetch("/components/header.html")
            .then(res => res.text())
            .then(data => headerContainer.innerHTML = data)
            .catch(err => console.error("Error Alpha Header:", err));
    }

    if (footerContainer) {
        fetch("/components/footer.html")
            .then(res => res.text())
            .then(data => footerContainer.innerHTML = data)
            .catch(err => console.error("Error Alpha Footer:", err));
    }
});

/**
 * Gestión de Vistas (Fade Transition Logic)
 * Sustituye el scroll por visibilidad de capas
 */
function showSection(sectionId) {
    const sections = document.querySelectorAll('.view-section');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Navegación Semántica (Adaptada al nuevo paradigma)
function navigateToHome() {
    showSection('hero-section');
}

function navigateToAuditForm() {
    showSection('lead-form-container');
}

function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) menu.classList.toggle("hidden");
}