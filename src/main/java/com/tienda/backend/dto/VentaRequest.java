package com.tienda.backend.dto;

import java.util.List;

public class VentaRequest {

    private String cajero;
    private List<ItemVentaRequest> items;

    public String getCajero() {
        return cajero;
    }

    public List<ItemVentaRequest> getItems() {
        return items;
    }
}
