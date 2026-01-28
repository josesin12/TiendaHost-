package com.tienda.backend.model;

import com.tienda.backend.exception.StockInsuficienteException;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_producto")
public abstract class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private double precio;
    private int stock;

    // 🔹 CONSTRUCTOR VACÍO (OBLIGATORIO PARA JPA + JSON)
    protected Producto() {}

    // 🔹 CONSTRUCTOR DE NEGOCIO
    protected Producto(String nombre, double precio, int stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    // ---------- GETTERS ----------
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public double getPrecio() {
        return precio;
    }

    public int getStock() {
        return stock;
    }

    // ---------- SETTERS (JSON) ----------
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    // ---------- LÓGICA DE NEGOCIO ----------
    public boolean hayStock(int cantidad) {
        return stock >= cantidad;
    }

    public void reducirStock(int cantidad) {
        if (!hayStock(cantidad)) {
            throw new StockInsuficienteException("Stock insuficiente");
        }
        stock -= cantidad;
    }

    // ---------- POLIMORFISMO ----------
    public abstract double calcularPrecioFinal();
}
