package com.tienda.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Celular extends Producto {

    private String marca;
    private int almacenamiento;
    private boolean liberado;

    protected Celular() {}

    public Celular(String nombre, double precio, int stock,
                   String marca, int almacenamiento, boolean liberado) {
        super(nombre, precio, stock);
        this.marca = marca;
        this.almacenamiento = almacenamiento;
        this.liberado = liberado;
    }

    @Override
    public double calcularPrecioFinal() {
        double total = getPrecio() * 1.5;
        if (almacenamiento >= 128) total += 200;
        if (!liberado) total += 150;
        return total;
    }
}
