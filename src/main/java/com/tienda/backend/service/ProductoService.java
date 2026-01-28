package com.tienda.backend.service;

import com.tienda.backend.model.Producto;
import com.tienda.backend.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public Producto guardar(Producto producto) {
        return repo.save(producto);
    }

    public List<Producto> listar() {
        return repo.findAll();
    }
}

