package com.tienda.backend.service;

import com.tienda.backend.dto.ItemVentaRequest;
import com.tienda.backend.dto.VentaRequest;
import com.tienda.backend.exception.VentaInvalidaException;
import com.tienda.backend.model.ItemVenta;
import com.tienda.backend.model.Producto;
import com.tienda.backend.model.Venta;
import com.tienda.backend.repository.ProductoRepository;
import com.tienda.backend.repository.VentaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepo;
    private final ProductoRepository productoRepo;

    public VentaService(VentaRepository ventaRepo, ProductoRepository productoRepo) {
        this.ventaRepo = ventaRepo;
        this.productoRepo = productoRepo;
    }

    @Transactional
    public Venta registrarVenta(VentaRequest request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new VentaInvalidaException("La venta no tiene productos");
        }

        List<ItemVenta> items = new ArrayList<>();

        for (ItemVentaRequest itemReq : request.getItems()) {

            Producto producto = productoRepo.findById(itemReq.getProductoId())
                    .orElseThrow(() ->
                            new VentaInvalidaException("Producto no encontrado"));

            items.add(new ItemVenta(producto, itemReq.getCantidad()));
        }
        Venta venta = new Venta(items, request.getCajero());
        venta.finalizarVenta();
        return ventaRepo.save(venta);

    }
}

