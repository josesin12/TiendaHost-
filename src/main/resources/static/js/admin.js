const API_URL = "https://tiendahost-production-2383.up.railway.app";

const form = document.getElementById("productoForm");
const tabla = document.getElementById("tablaProductos");

document.addEventListener("DOMContentLoaded", cargarProductos);

form.addEventListener("submit", e => {
    e.preventDefault();

    const id = document.getElementById("productoId").value;

    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value),
        imagen: document.getElementById("imagen").value
    };

    if (id) {
        actualizarProducto(id, producto);
    } else {
        crearProducto(producto);
    }
});

/* ================= CRUD ================= */

function cargarProductos() {
    fetch(`${API_URL}/productos`)
        .then(res => res.json())
        .then(data => {
            tabla.innerHTML = "";
            data.forEach(p => {
                tabla.innerHTML += `
          <tr>
            <td>${p.nombre}</td>
            <td>S/ ${p.precio}</td>
            <td>${p.stock}</td>
            <td>
              <button onclick="editarProducto(${p.id}, '${p.nombre}', ${p.precio}, ${p.stock}, '${p.imagen || ""}')">Editar</button>
              <button class="danger" onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
          </tr>
        `;
            });
        });
}

function crearProducto(producto) {
    fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    }).then(() => {
        form.reset();
        cargarProductos();
    });
}

function editarProducto(id, nombre, precio, stock, imagen) {
    document.getElementById("productoId").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    document.getElementById("stock").value = stock;
    document.getElementById("imagen").value = imagen;
}

function actualizarProducto(id, producto) {
    fetch(`${API_URL}/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    }).then(() => {
        form.reset();
        document.getElementById("productoId").value = "";
        cargarProductos();
    });
}

function eliminarProducto(id) {
    if (!confirm("¿Eliminar este producto?")) return;

    fetch(`${API_URL}/productos/${id}`, {
        method: "DELETE"
    }).then(() => cargarProductos());
}
