package com.tienda.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Laptop extends Producto {

    private String marca;
    private int ram;

    protected Laptop() {}

    public Laptop(String nombre, double precio, int stock,
                  String marca, int ram) {
        super(nombre, precio, stock);
        this.marca = marca;
        this.ram = ram;
    }

    @Override
    public double calcularPrecioFinal() {
        return getPrecio() * 1.18;
    }
}
