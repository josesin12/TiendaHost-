package com.tienda.backend.model;

import jakarta.persistence.Entity;

@Entity
public class ProductoSimple extends Producto {

    public ProductoSimple() {}

    @Override
    public double calcularPrecioFinal() {
        return getPrecio();
    }
}
