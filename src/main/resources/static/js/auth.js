/* ===============================
   AUTH.JS – TIENDAHOST
   =============================== */

/* -------- REGISTRO -------- */
function register() {
    const email = document.getElementById("regEmail")?.value.trim();
    const password = document.getElementById("regPassword")?.value;
    const confirm = document.getElementById("regConfirm")?.value;

    if (!email || !password || !confirm) {
        alert("Completa todos los campos");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    if (password !== confirm) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const user = { email };

    localStorage.setItem("usuario", JSON.stringify(user));
    alert("Registro exitoso 🎉");

    window.location.href = "login.html";
}

/* -------- LOGIN -------- */
function login() {
    const email = document.getElementById("loginEmail")?.value.trim();
    const password = document.getElementById("loginPassword")?.value;

    if (!email || !password) {
        alert("Ingresa tu correo y contraseña");
        return;
    }

    // Simulación de autenticación
    const user = { email };

    localStorage.setItem("usuario", JSON.stringify(user));
    alert("Sesión iniciada ✔️");

    window.location.href = "productos.html";
}

/* -------- LOGOUT -------- */
function logout() {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    window.location.href = "index.html";
}

/* -------- VERIFICAR SESIÓN -------- */
function usuarioLogueado() {
    return localStorage.getItem("usuario") !== null;
}

/* -------- PROTEGER COMPRAS -------- */
function requerirLogin() {
    if (!usuarioLogueado()) {
        alert("Debes iniciar sesión para comprar");
        window.location.href = "login.html";
        return false;
    }
    return true;
}

/* -------- MOSTRAR USUARIO EN NAV -------- */
document.addEventListener("DOMContentLoaded", () => {
    const navRight = document.querySelector(".nav-right");

    if (!navRight) return;

    if (usuarioLogueado()) {
        const user = JSON.parse(localStorage.getItem("usuario"));

        navRight.innerHTML = `
      <span style="margin-right:10px;">👤 ${user.email}</span>
      <a href="#" onclick="logout()">Salir</a>
    `;
    }
});
