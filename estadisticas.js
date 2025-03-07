// URL de tu servidor en Render
const API_URL = "https://servidor-estadisticas.onrender.com/obtener-estadisticas";

// Función para obtener estadísticas desde el backend
async function fetchEstadisticas() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener estadísticas");
        const estadisticas = await response.json();
        llenarTabla(estadisticas);
    } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        alert("No se pudo cargar las estadísticas. Inténtalo más tarde.");
    }
}

// Función para llenar la tabla con las estadísticas
function llenarTabla(estadisticas) {
    const tableBody = document.getElementById("estadisticas-table").querySelector("tbody");
    tableBody.innerHTML = ""; // Limpiar contenido anterior

    estadisticas.forEach(est => {
        const row = document.createElement("tr");

        // Formatear la lista de productos
        const productos = est.compras && est.compras.length > 0
            ? est.compras.map(item => `${item.producto} (x${item.cantidad})`).join(", ")
            : "N/A";

        // Formatear el precio total de la compra
        const precioTotal = est.precio_compra_total
            ? `$${parseFloat(est.precio_compra_total).toFixed(2)}`
            : "$0.00";

        row.innerHTML = `
            <td>${est.ip || "Desconocido"}</td>
            <td>${est.pais || "Desconocido"}</td>
            <td>${est.fecha_hora_entrada || "N/A"}</td>
            <td>${est.duracion_sesion_segundos || 0}</td>
            <td>${est.afiliado || "Ninguno"}</td>
            <td>${est.nombre_comprador || "N/A"}</td>
            <td>${est.telefono_comprador || "N/A"}</td>
            <td>${est.correo_comprador || "N/A"}</td>
            <td>${productos}</td>
            <td>${precioTotal}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Agregar evento al botón de recarga
document.getElementById("reload-button").addEventListener("click", fetchEstadisticas);

// Cargar estadísticas al cargar la página
window.addEventListener("load", fetchEstadisticas);
