// ⚠️ IMPORTANTE
// API_URL vacío → usa el mismo dominio (Railway o localhost)
const API_URL = "";

document.addEventListener("DOMContentLoaded", () => {
    console.log("app.js cargado correctamente");
    cargarProductos();
});

function cargarProductos() {
    console.log("Cargando productos...");

    fetch(`${API_URL}/productos`)
        .then(res => {
            console.log("STATUS:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("DATA:", data);
            mostrarProductos(data);
        })
        .catch(err => {
            console.error("ERROR FETCH:", err);
        });
}

function mostrarProductos(productos) {
    const grid = document.getElementById("productos-grid");

    if (!grid) {
        console.error("No existe el contenedor #productos-grid");
        return;
    }

    grid.innerHTML = "";

    if (!productos || productos.length === 0) {
        grid.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="/img/laptop.jpg" alt="Producto">
            <h3>${p.nombre}</h3>
            <p>Precio: S/ ${p.precio}</p>
            <p>Stock: ${p.stock}</p>
            <button onclick="comprar()">Comprar</button>
        `;

        grid.appendChild(card);
    });
}

function comprar() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        alert("Debes iniciar sesión para comprar");
        window.location.href = "/login.html";
        return;
    }

    alert("Producto agregado al carrito (simulado)");
}
