package com.tienda.backend.model;

import jakarta.persistence.*;

@Entity
public class ItemVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Producto producto;

    private int cantidad;

    protected ItemVenta() {}

    public ItemVenta(Producto producto, int cantidad) {

        if (cantidad <= 0) {
            throw new IllegalArgumentException("Cantidad inválida");
        }

        if (!producto.hayStock(cantidad)) {
            throw new RuntimeException("Stock insuficiente");
        }

        this.producto = producto;
        this.cantidad = cantidad;
    }

    public double calcularSubtotal() {
        return producto.calcularPrecioFinal() * cantidad;
    }

    public void descontarStock() {
        producto.reducirStock(cantidad);
    }
}
