const API_URL = "https://tiendahost-production-2383.up.railway.app";

document.addEventListener("DOMContentLoaded", cargarProductos);

function cargarProductos() {
    fetch(`${API_URL}/productos`)
        .then(res => res.json())
        .then(data => mostrarProductos(data))
        .catch(err => console.error("Error:", err));
}

function mostrarProductos(productos) {
    const grid = document.getElementById("listaProductos");
    grid.innerHTML = "";

    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
      <img src="${p.imagen || 'img/default.jpg'}">
      <h3>${p.nombre}</h3>
      <p>Precio: S/ ${p.precio}</p>
      <button onclick='agregarCarrito(${JSON.stringify(p)})'>
        Agregar al carrito
      </button>
    `;

        grid.appendChild(card);
    });
}

/* ================= CARRITO ================= */

function agregarCarrito(producto) {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Debes iniciar sesión para comprar");
        window.location.href = "login.html";
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existente = carrito.find(p => p.id === producto.id);

    if (existente) {
        existente.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}



