package com.tienda.backend.controller;

import com.tienda.backend.model.Producto;
import com.tienda.backend.model.ProductoSimple;
import com.tienda.backend.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoRepository repo;

    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    // ✅ LISTAR PRODUCTOS
    @GetMapping
    public List<Producto> listar() {
        return repo.findAll();
    }

    // ✅ CREAR PRODUCTO
    @PostMapping
    public Producto crear(@RequestBody ProductoSimple producto) {
        return repo.save(producto);
    }

    // ✅ ACTUALIZAR PRODUCTO
    @PutMapping("/{id}")
    public Producto actualizar(
            @PathVariable Long id,
            @RequestBody ProductoSimple producto
    ) {
        Producto existente = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        existente.setNombre(producto.getNombre());
        existente.setPrecio(producto.getPrecio());
        existente.setStock(producto.getStock());
        existente.setImagenUrl(producto.getImagenUrl());

        return repo.save(existente);
    }

    // ✅ ELIMINAR PRODUCTO
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
