function crearProducto() {
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: Number(document.getElementById('precio').value),
        stock: Number(document.getElementById('stock').value),
        imagenUrl: document.getElementById('imagenUrl').value
    };

    fetch('/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
        .then(res => {
            if (!res.ok) throw new Error();
            alert("Producto creado");
            cargarProductos();
        })
        .catch(() => alert("Error al crear producto"));
}

function cargarProductos() {
    fetch('/productos')
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('listaProductos');
            lista.innerHTML = '';

            data.forEach(p => {
                lista.innerHTML += `
                    <div class="item">
                        ${p.nombre} - S/ ${p.precio} - Stock: ${p.stock}
                    </div>
                `;
            });
        });
}

cargarProductos();
