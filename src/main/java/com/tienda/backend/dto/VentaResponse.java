package com.tienda.backend.dto;

public class VentaResponse {

    private Long id;
    private double total;

    public VentaResponse(Long id, double total) {
        this.id = id;
        this.total = total;
    }

    public Long getId() {
        return id;
    }

    public double getTotal() {
        return total;
    }
}
