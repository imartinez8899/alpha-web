// ALPHA WEB DIGITAL ARCHITECTURE - SCRIPT DE INYECCIÓN MODULAR CORREGIDO
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Inyectar el Menú de Navegación (Header)
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        // Quitamos /alpha-web/ para que busque directo en tu dominio
        fetch("components/header.html")
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
        // Quitamos /alpha-web/ para que busque directo en tu dominio
        fetch("components/footer.html")
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