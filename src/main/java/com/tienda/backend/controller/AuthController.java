
package com.tienda.backend.controller;
import com.tienda.backend.model.Usuario;
import com.tienda.backend.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepository repo;

    public AuthController(UsuarioRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) {
        usuario.setRol("USER");
        return repo.save(usuario);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario data) {
        return repo.findByCorreo(data.getCorreo())
                .filter(u -> u.getPassword().equals(data.getPassword()))
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
    }
}
