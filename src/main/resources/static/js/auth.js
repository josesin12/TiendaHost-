const API_URL = "https://tiendahost-production-2383.up.railway.app";

function registrar() {
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;

    if (password !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
    })
        .then(res => res.json())
        .then(() => {
            alert("Registro exitoso");
            window.location.href = "login.html";
        });
}

function login() {
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
    })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(usuario => {
            localStorage.setItem("usuario", JSON.stringify(usuario));
            window.location.href = "index.html";
        })
        .catch(() => alert("Credenciales incorrectas"));
}
