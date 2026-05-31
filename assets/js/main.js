/**
 * Alpha Roofing & Gutters - Master logic (Zero-Scroll & Glow Sync)
 */
document.addEventListener("DOMContentLoaded", function() {
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        fetch("/components/header.html")
            .then(res => res.text())
            .then(data => headerContainer.innerHTML = data)
            .catch(err => console.error("Error Alpha Header:", err));
    }
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
}

function navigateToHome() { showSection('hero-section'); }
function navigateToAuditForm() { showSection('lead-form-container'); }
function toggleFullscreenMenu() {
    const menu = document.getElementById("fullscreen-menu-overlay");
    if (menu) menu.classList.toggle("hidden");
}