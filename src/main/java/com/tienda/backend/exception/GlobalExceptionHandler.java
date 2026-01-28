package com.tienda.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(StockInsuficienteException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String manejarStock(StockInsuficienteException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(VentaInvalidaException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String manejarVenta(VentaInvalidaException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(PermisoDenegadoException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String manejarPermiso(PermisoDenegadoException ex) {
        return ex.getMessage();
    }
}
