// ALPHA WEB DIGITAL ARCHITECTURE - SCRIPT DE INYECCIÓN MODULAR
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Inyectar el Menues de Navegación (Header)
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        fetch("/alpha-web/components/header.html")
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar el componente header.");
                return response.text();
            })
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(error => console.error("Alpha System Log:", error));
    }

    // 2. Inyectar el Pie de Página Corporativo (Footer)
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("/alpha-web/components/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar el componente footer.");
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error("Alpha Footer Log:", error));
    }
});