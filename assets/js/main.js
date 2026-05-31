/**
 * Alpha Web Infrastructure - Master JS Controller
 */
document.addEventListener("DOMContentLoaded", function() {
    
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        fetch("/components/header.html")
            .then(response => response.text())
            .then(data => { headerContainer.innerHTML = data; })
            .catch(err => console.error("Error cargando la barra Alpha:", err));
    }

    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("/components/footer.html")
            .then(response => response.text())
            .then(data => { footerContainer.innerHTML = data; })
            .catch(err => console.error("Error cargando el footer Alpha:", err));
    }
});

function navigateToHome() {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = "/index.html";
    }
}

function navigateToAuditForm() {
    const formSection = document.getElementById("lead-form-container");
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = "/index.html#lead-form-container";
    }
}

function toggleFullscreenMenu() {
    const menuOverlay = document.getElementById("fullscreen-menu-overlay");
    if (menuOverlay) {
        menuOverlay.classList.toggle("hidden");
    }
}