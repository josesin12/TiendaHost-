
const API_URL = "https://tiendahost-production-2383.up.railway.app";


document.addEventListener("DOMContentLoaded", () => {
    console.log("app.js cargado");
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
        .catch(err => console.error("Error cargando productos", err));
}

function mostrarProductos(productos) {
    const grid = document.getElementById("productos-grid");

    if (!grid) {
        console.error("No existe #productos-grid");
        return;
    }

    grid.innerHTML = "";

    if (productos.length === 0) {
        grid.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        const sinStock = p.stock <= 0;

        card.innerHTML = `
           
            <img src="${p.imagenUrl || '/img/laptop.jpg'}" alt="${p.nombre}">

            <div class="card-body">
                <h3>${p.nombre}</h3>
                <div class="precio">S/ ${p.precio}</div>
                <div class="stock ${sinStock ? 'no' : 'ok'}">
                    ${sinStock ? 'Sin stock' : 'Stock: ' + p.stock}
                </div>
                <button ${sinStock ? 'disabled' : ''} onclick="comprar()">
                    Comprar
                </button>
            </div>
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
    alert("Producto agregado al carrito (próximamente)");
}
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}


