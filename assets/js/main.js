/**
 * Alpha Roofing & Gutters - Master Controller [22, 24]
 */
document.addEventListener("DOMContentLoaded", function() {
    // Inyección de Componentes
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

// Navegación Semántica
function navigateToHome() {
    document.getElementById('hero-section').scrollIntoView({ behavior: 'smooth' });
}

function navigateToAuditForm() {
    document.getElementById('lead-form-container').scrollIntoView({ behavior: 'smooth' });
}

function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) menu.classList.toggle("hidden");
}