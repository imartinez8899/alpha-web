/* 
  ALPHA ROOFING & GUTTERS | MASTER LOGIC CONTROLLER
  STRATEGIST: IM + Alpha AI
  VERSION: 16.8.8 (Logic Extraction & Carousel Master)
  TIMESTAMP: 2026-06-03 18:15 CST
*/
document.addEventListener("DOMContentLoaded", function() {
    console.log("[Alpha Shield] v16.8.8 Online | Controlador Modular Activo");

    // Inyección de componentes
    injectComponent("header-container", "/components/header.html");
    injectComponent("zoho-form-embed", "/components/lead-form.html");

    // Inicialización del carrusel si existe
    const carousel = document.getElementById('services-carousel');
    if (carousel) {
        carousel.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        setTimeout(updateArrows, 500);
    }
});

function injectComponent(containerId, path) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(path)
            .then(res => { if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`); return res.text(); })
            .then(data => { container.innerHTML = data; })
            .catch(err => console.error(`[Alpha Error] Fallo en inyección de ${containerId}:`, err));
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
            const hub = document.getElementById('hub-options');
            const zoho = document.getElementById('zoho-form-container');
            if (hub) hub.classList.remove('hidden');
            if (zoho) zoho.classList.add('hidden');
        }
        if (!isBack) { history.pushState({ sectionId: sectionId }, '', `#${sectionId}`); }
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
    document.getElementById('hub-options').classList.add('hidden');
    document.getElementById('zoho-form-container').classList.remove('hidden');
}

function hideZohoForm() {
    document.getElementById('zoho-form-container').classList.add('hidden');
    document.getElementById('hub-options').classList.remove('hidden');
}

function scrollCarousel(distance) {
    const carousel = document.getElementById('services-carousel');
    if (carousel) carousel.scrollBy({ left: distance, behavior: 'smooth' });
}

function updateArrows() {
    const carousel = document.getElementById('services-carousel');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    if (!carousel || !prevArrow || !nextArrow) return;

    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    if (scrollLeft <= 10) prevArrow.classList.add('disabled');
    else prevArrow.classList.remove('disabled');

    if (scrollLeft >= maxScroll - 10) nextArrow.classList.add('disabled');
    else nextArrow.classList.remove('disabled');
}

function setLanguage(lang) {
    const overlay = document.getElementById('language-selector');
    if (overlay) overlay.classList.add('inactive');
    setTimeout(() => {
        if (lang === 'en') window.location.href = '/en/index.html';
        else console.log("[Alpha Core] Iniciando Navegación Española");
    }, 700);
}

function navigateToHome() { showSection('hero-section'); }
function navigateToAuditForm() { showSection('lead-form-container'); }

window.onpopstate = function(event) {
    if (event.state) showSection(event.state.sectionId, true);
    else showSection('hero-section', true);
};