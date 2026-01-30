document.addEventListener("DOMContentLoaded", cargarCarrito);

function cargarCarrito() {
    const body = document.getElementById("carritoBody");
    const totalTxt = document.getElementById("total");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    body.innerHTML = "";
    let total = 0;

    carrito.forEach((p, index) => {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;

        body.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>S/ ${p.precio}</td>
        <td>
          <button onclick="cambiarCantidad(${index}, -1)">-</button>
          ${p.cantidad}
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
        </td>
        <td>S/ ${subtotal}</td>
        <td>
          <button class="danger" onclick="eliminar(${index})">X</button>
        </td>
      </tr>
    `;
    });

    totalTxt.innerText = `Total a pagar: S/ ${total}`;
}

function cambiarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function eliminar(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}
