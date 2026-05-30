/**
 * Alpha Roofing & Gutters - Motor de Inyección Modular
 * Carga de Header y Footer dinámicos a través de la raíz del dominio
 */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Inyección de Menú de Navegación (Header)
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        fetch("/components/header.html")
            .then(response => {
                if (!response.ok) throw new Error("Error cargando el componente Header");
                return response.text();
            })
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(error => console.error("Ecosistema Alpha Error:", error));
    }

    // 2. Inyección de Pie de Página Corporativo (Footer)
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("/components/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Error cargando el componente Footer");
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error("Ecosistema Alpha Error:", error));
    }
});