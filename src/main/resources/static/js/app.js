
const API_URL = "https://tiendahost-production-2383.up.railway.app";

document.addEventListener("DOMContentLoaded", cargarProductos);

function cargarProductos() {
    fetch(`${API_URL}/productos`)
        .then(res => res.json())
        .then(data => mostrarProductos(data))
        .catch(() => console.error("Error cargando productos"));
}

function mostrarProductos(productos) {
    const grid = document.getElementById("productos-grid");
    grid.innerHTML = "";

    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
      <img src="img/laptop.jpg" alt="Producto">
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
        window.location.href = "login.html";
        return;
    }
    alert("Producto agregado al carrito");
}


