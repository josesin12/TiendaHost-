document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});


function cargarProductos() {
    fetch("/productos") // MISMA URL DEL BACKEND
        .then(response => {
            if (!response.ok) {
                throw new Error("Error HTTP: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Productos recibidos:", data);
            mostrarProductos(data);
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
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

function agregarAlCarrito(idProducto) {
    alert("Producto agregado al carrito (ID: " + idProducto + ")");
}
