package com.tienda.backend.dto;

public class ItemVentaRequest {
    private String cajero;
    private Long productoId;
    private int cantidad;

    public Long getProductoId() {
        return productoId;
    }

    public int getCantidad() {
        return cantidad;
    }

    public String getCajero() {
        return cajero;
    }
}
