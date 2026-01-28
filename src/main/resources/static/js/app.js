

let carrito = [];
let usuarioLogueado = localStorage.getItem("usuario");

document.addEventListener("DOMContentLoaded", () => {
    if (usuarioLogueado) {
        mostrar('tienda');
        mostrarSesion(true);
        cargarProductos();
    } else {
        mostrar('login');
    }
});

function mostrar(vista) {
    document.querySelectorAll('.vista').forEach(v => v.style.display = 'none');
    document.getElementById(vista).style.display = 'block';
}

function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("password").value;

    if (user && pass) {
        localStorage.setItem("usuario", user);
        usuarioLogueado = user;
        mostrarSesion(true);
        mostrar('tienda');
        cargarProductos();
    } else {
        alert("Completa los datos");
    }
}

function logout() {
    localStorage.removeItem("usuario");
    usuarioLogueado = null;
    carrito = [];
    mostrarSesion(false);
    mostrar('login');
}

function mostrarSesion(logueado) {
    document.getElementById("btnLogin").style.display = logueado ? "none" : "inline";
    document.getElementById("btnLogout").style.display = logueado ? "inline" : "none";
}

function cargarProductos() {
    fetch('/productos')
        .then(res => res.json())
        .then(data => {
            const cont = document.getElementById("productos");
            cont.innerHTML = "";
            data.forEach(p => {
                cont.innerHTML += `
                    <div class="card">
                        <h3>${p.nombre}</h3>
                        <p>S/ ${p.precio}</p>
                        <button onclick="agregar(${p.id}, '${p.nombre}', ${p.precio})">
                            Agregar
                        </button>
                    </div>
                `;
            });
        });
}

function agregar(id, nombre, precio) {
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para comprar");
        mostrar('login');
        return;
    }
    carrito.push({ id, nombre, precio });
    renderCarrito();
}

function renderCarrito() {
    const ul = document.getElementById("carrito");
    ul.innerHTML = "";
    carrito.forEach(p => {
        ul.innerHTML += `<li>${p.nombre} - S/ ${p.precio}</li>`;
    });
}

function finalizarCompra() {
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión");
        return;
    }
    alert("Compra realizada 🎉");
    carrito = [];
    renderCarrito();
}
