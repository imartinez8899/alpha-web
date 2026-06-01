/* 
  ALPHA ROOFING & GUTTERS | LOGIC CONTROLLER
  STRATEGIST: IM + Alpha AI
  VERSION: 16.1.0 (History Shield & Signature Update)
  TIMESTAMP: 2026-06-01 12:45 CST
*/
document.addEventListener("DOMContentLoaded", function() {
    console.log("[Alpha Shield] v16.1.0 | IM + Alpha AI Online");
    injectComponent("header-container", "/components/header.html");
    injectComponent("zoho-form-container", "/components/lead-form.html");

    if (!history.state) {
        history.replaceState({ sectionId: 'hero-section' }, 'Home', '#home');
    }
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

function showSection(sectionId, isBack = false) {
    const sections = document.querySelectorAll('.view-section');
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        sections.forEach(s => s.classList.remove('active'));
        targetSection.classList.add('active');
        window.scrollTo(0, 0);

        if (!isBack) {
            history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
        }
    }
}

window.onpopstate = function(event) {
    if (event.state && event.state.sectionId) {
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