function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("password").value;

    if (user && pass) {
        localStorage.setItem("usuario", user);
        window.location.href = "index.html";
    } else {
        alert("Completa los campos");
    }
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}
