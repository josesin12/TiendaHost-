
let carrito = [];

document.addEventListener("DOMContentLoaded", cargarProductos);

function cargarProductos() {
    fetch('/productos')
        .then(res => res.json())
        .then(data => mostrarProductos(data));
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${p.nombre}</h3>
            <p>Precio: S/ ${p.precio}</p>
            <p>Stock: ${p.stock}</p>
            <button onclick="agregarAlCarrito(${p.id}, '${p.nombre}', ${p.precio})">
                Agregar
            </button>
        `;

        contenedor.appendChild(card);
    });
}

function agregarAlCarrito(id, nombre, precio) {
    carrito.push({ id, nombre, precio });
    renderCarrito();
}

function renderCarrito() {
    const lista = document.getElementById("carrito");
    lista.innerHTML = "";

    carrito.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} - S/ ${p.precio}`;
        lista.appendChild(li);
    });
}

function finalizarCompra() {
    alert("Compra simulada 🎉");
    carrito = [];
    renderCarrito();
}

