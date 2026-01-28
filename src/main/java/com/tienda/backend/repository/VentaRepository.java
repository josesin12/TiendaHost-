package com.tienda.backend.repository;

import com.tienda.backend.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepository
        extends JpaRepository<Venta, Long> {
}
