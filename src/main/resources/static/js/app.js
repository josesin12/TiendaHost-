const API_URL = "https://tiendahost-production-2383.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ app.js cargado");
    cargarProductos();
});

function cargarProductos() {
    console.log("📡 Llamando a:", `${API_URL}/productos`);

    fetch(`${API_URL}/productos`)
        .then(res => {
            console.log("📥 status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("📦 productos recibidos:", data);
            mostrarProductos(data);
        })
        .catch(err => console.error("❌ Error fetch:", err));
}

function mostrarProductos(productos) {
    const grid = document.getElementById("listaProductos");

    if (!grid) {
        console.error("❌ No existe #listaProductos en el HTML");
        return;
    }

    grid.innerHTML = "";

    if (productos.length === 0) {
        grid.innerHTML = "<p>No hay productos disponibles</p>";
        return;
    }

    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
      <img src="${p.imagen || '/img/default.jpg'}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>Precio: S/ ${p.precio}</p>
      <p>Stock: ${p.stock}</p>
      <button onclick="agregarCarrito(${p.id})">Agregar al carrito</button>
    `;

        grid.appendChild(card);
    });
}

/* ===== CARRITO ===== */

function agregarCarrito(idProducto) {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Debes iniciar sesión para comprar");
        window.location.href = "login.html";
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find(p => p.id === idProducto);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ id: idProducto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}


