/**
 * ALPHA ROOFING & GUTTERS | LAB MASTER CONTROLLER
 * ESTRATEGA: IM + Alpha AI
 * VERSION: 1.2.0 (Synchronized Bottom-Nav Engine)
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("[Alpha Lab] Iniciando inyección quirúrgica de componentes...");

    const container = document.getElementById("header-container");
    
    if (container) {
        // 🏗️ REFERENCIA AXIAL (Fetch con conversión obligatoria a texto)
        fetch("/components/header.html")
            .then(response => {
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                return response.text(); // 🛡️ BLINDAJE: Conversión obligatoria a texto inmaculado
            })
            .then(html => {
                // Inyectamos la estructura modular en el contenedor
                container.innerHTML = html;
                console.log("[Alpha Lab] Chasis de navegación inyectado con éxito.");

                // ⚡ SOLDADURA DE TRANSICIONES ALFA
                const fixedElements = container.querySelectorAll('.fixed');
                fixedElements.forEach(el => {
                    // Aplicamos curva de movimiento Jony Ive
                    el.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    // Forzamos visibilidad para entorno de pruebas (Removemos ocultamiento de PC si existe)
                    el.classList.remove('md:hidden'); 
                });

                // Inicializamos el motor de scroll solo después de la inyección exitosa
                initSmartScroll();
            })
            .catch(err => {
                console.error("[Alpha Error] Fallo crítico en referencia de archivo:", err);
                container.innerHTML = `<div class="fixed bottom-4 left-4 right-4 bg-red-600 text-white p-4 rounded-xl text-[10px] uppercase font-bold text-center">Error de Carga: Verifica la existencia de /components/header.html</div>`;
            });
    }
});

/**
 * SMART SCROLL ENGINE: Gestión de visibilidad para menús inferiores/superiores
 */
function initSmartScroll() {
    let lastScrollY = window.scrollY;
    const headerContainer = document.getElementById('header-container');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const fixedElements = headerContainer.querySelectorAll('.fixed');

        // Umbral de sensibilidad (80px) para evitar parpadeos visuales
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            // SCROLL DOWN: El usuario consume contenido, escondemos estructura
            fixedElements.forEach(el => {
                // Si el menú está fijo abajo, lo ocultamos hacia abajo
                if (el.classList.contains('bottom-0')) {
                    el.style.transform = 'translateY(100%)';
                }
                // Si el menú está fijo arriba, lo ocultamos hacia arriba
                if (el.classList.contains('top-0')) {
                    el.style.transform = 'translateY(-100%)';
                }
            });
        } else {
            // SCROLL UP: El usuario busca navegación, devolvemos estructura a (0)
            fixedElements.forEach(el => {
                el.style.transform = 'translateY(0)';
            });
        }
        lastScrollY = currentScrollY;
    }, { passive: true });
}
