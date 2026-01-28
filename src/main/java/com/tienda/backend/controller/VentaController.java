package com.tienda.backend.controller;

import com.tienda.backend.dto.VentaRequest;
import com.tienda.backend.dto.VentaResponse;
import com.tienda.backend.model.Venta;
import com.tienda.backend.service.VentaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ventas")
public class VentaController {

    private final VentaService service;

    public VentaController(VentaService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VentaResponse crearVenta(@RequestBody VentaRequest request) {

        Venta venta = service.registrarVenta(request);
        return new VentaResponse(venta.getId(), venta.getTotal());
    }
}
