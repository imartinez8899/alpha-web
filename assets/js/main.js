/**
 * Alpha Roofing & Gutters - Logic Controller
 */
document.addEventListener("DOMContentLoaded", function() {
    // Inyección de componentes
    injectComponent("header-container", "/components/header.html");
    injectComponent("footer-container", "/components/footer.html");
    injectComponent("zoho-form-container", "/components/lead-form.html");
});

function injectComponent(containerId, path) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(path)
            .then(res => res.text())
            .then(data => container.innerHTML = data)
            .catch(err => console.error(`Error Alpha ${containerId}:`, err));
    }
}

// Navegación entre Secciones (Fade)
function showSection(sectionId) {
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
}

// Lógica del Formulario Zoho
function showZohoForm() {
    const hubContent = document.getElementById('hub-options');
    const formContent = document.getElementById('zoho-form-container');
    
    if (hubContent && formContent) {
        hubContent.classList.add('hidden');
        formContent.classList.remove('hidden');
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

function navigateToHome() { showSection('hero-section'); }
function navigateToAuditForm() { showSection('lead-form-container'); }
function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) menu.classList.toggle("hidden");
}