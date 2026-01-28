const API_URL = "https://tiendahost-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

function cargarProductos() {
    fetch(`${API_URL}/productos`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Error HTTP: " + res.status);
            }
            return res.json();
        })
        .then(data => {
            console.log("Productos recibidos:", data);
            mostrarProductos(data);
        })
        .catch(err => {
            console.error("Error:", err);
            alert("No se pudieron cargar los productos");
        });
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos disponibles</p>";
        return;
    }

    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${p.nombre}</h3>
            <p>Precio: S/ ${p.precio}</p>
            <p>Stock: ${p.stock}</p>
            <button onclick="agregarAlCarrito(${p.id})">
                Agregar al carrito
            </button>
        `;

        contenedor.appendChild(card);
    });
}

function agregarAlCarrito(id) {
    alert("Producto agregado (ID: " + id + ")");
}
