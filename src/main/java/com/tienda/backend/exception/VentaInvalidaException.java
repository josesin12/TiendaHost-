package com.tienda.backend.exception;

public class VentaInvalidaException extends RuntimeException {

    public VentaInvalidaException(String mensaje) {
        super(mensaje);
    }
}
