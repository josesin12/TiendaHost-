package com.tienda.backend.model;

import com.tienda.backend.exception.VentaInvalidaException;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fecha;

    private double total;
    private String cajero;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemVenta> items;

    protected Venta() {
        this.fecha = LocalDateTime.now();
    }
    public Venta(List<ItemVenta> items, String cajero) {
        this.items = items;
        this.cajero = cajero;
        this.fecha = LocalDateTime.now();
    }



    public void calcularTotal() {
        total = items.stream()
                .mapToDouble(ItemVenta::calcularSubtotal)
                .sum();
    }

    public void finalizarVenta() {

        if (items == null || items.isEmpty()) {
            throw new VentaInvalidaException("No se puede finalizar una venta sin productos");
        }

        calcularTotal();

        for (ItemVenta item : items) {
            item.descontarStock();
        }
    }
    public String getCajero() {
        return cajero;
    }

    public Long getId() {
        return id;
    }

    public double getTotal() {
        return total;
    }
}
