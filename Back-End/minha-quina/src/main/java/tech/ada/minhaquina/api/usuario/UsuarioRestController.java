package tech.ada.minhaquina.api.usuario;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@SecurityRequirement(name = "Admin")
@RestController
@RequestMapping("/minha-quina/api/v1/usuarios")
@Log4j2
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Usuários")
@CrossOrigin(origins = "http://localhost:4200/")
public class UsuarioRestController {

    private final UsuarioService usuarioService;

    public UsuarioRestController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Operation(description = "Lista todos os usuários")
    @GetMapping
    public List<UsuarioResponse> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @Operation(description = "Busca usuário de acordo com seu Id")
    @GetMapping("/{id}")
    public UsuarioResponse getApostaById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id);
    }

    @Operation(description = "Cadastro de um novo usuário/admin")
    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse saveUsuario(@RequestBody @Valid UsuarioRequest usuarioRequest) {
        return usuarioService.saveUsuario(usuarioRequest);
    }

    @Operation(description = "Edição de um usuário/admin pelo Id")
    @PutMapping("/{id}/editar")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioResponse updateUser(@PathVariable Long id, @RequestBody @Valid UsuarioRequest usuarioRequest) {
        return usuarioService.updateUsuario(id, usuarioRequest);
    }

    @Operation(description = "Exclusão de um usuário/admin pelo Id")
    @DeleteMapping("/{id}/deletar")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
    }
}
