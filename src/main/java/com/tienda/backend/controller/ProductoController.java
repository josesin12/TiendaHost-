package com.tienda.backend.controller;

import com.tienda.backend.model.Producto;
import com.tienda.backend.model.ProductoSimple;
import com.tienda.backend.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/productos")
// permite frontend simple
public class ProductoController {

    private final ProductoRepository repo;

    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    // LISTAR PRODUCTOS
    @GetMapping
    public List<Producto> listar() {
        return repo.findAll();
    }

    // CREAR PRODUCTO

    @PostMapping
    public Producto crear(@RequestBody ProductoSimple producto) {
        return repo.save(producto);
    }

}
