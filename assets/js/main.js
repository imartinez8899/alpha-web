// ALPHA WEB DIGITAL ARCHITECTURE - SCRIPT DE INYECCIÓN MODULAR
document.addEventListener("DOMContentLoaded", function () {
    
    // Inyectar el Menú de Navegación (Header)
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
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

    // Nota: Aquí agregaremos más adelante la lógica del footer
});